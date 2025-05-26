from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.middleware import SlowAPIMiddleware
from typing import List, Dict
from datetime import datetime, timedelta
import asyncio

limiter = Limiter(key_func=get_remote_address, default_limits=["50/minute"])
app = FastAPI(lifespan=None)

app.add_middleware(CORSMiddleware, allow_origins=["*"])
app.add_middleware(SlowAPIMiddleware)

# mock in-memory storage
_snapshots: List[Dict] = []
_subscribers: List[asyncio.Queue] = []

def get_latest_snapshot(asset_id: str):
    items = [s for s in _snapshots if s["id"] == asset_id]
    items.sort(key=lambda x: x["ts"], reverse=True)
    return items[0] if items else None

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

@app.post("/debug/insert")
async def debug_insert(snapshot: Dict):
    insert_snapshot(snapshot)
    return {"inserted": True}

@app.get("/assets")
@limiter.limit("50/minute")
async def list_assets(limit: int = 10, offset: int = 0, sort: str = "id"):
    latest: Dict[str, Dict] = {}
    for s in _snapshots:
        if s["id"] not in latest or s["ts"] > latest[s["id"]]["ts"]:
            latest[s["id"]] = s
    items = list(latest.values())
    items.sort(key=lambda x: x.get(sort, 0))
    return items[offset: offset + limit]

@app.get("/assets/{asset_id}")
@limiter.limit("50/minute")
async def asset_detail(asset_id: str):
    now = datetime.utcnow()
    spark_start = now - timedelta(days=7)
    data = [s for s in _snapshots if s["id"] == asset_id and s["ts"] >= spark_start]
    data.sort(key=lambda x: x["ts"], reverse=True)
    latest = data[0] if data else None
    sparkline = [d["value"] for d in sorted(data, key=lambda x: x["ts"])]
    dadscore = calculate_dadscore(latest)
    return {"latest": latest, "sparkline": sparkline, "dadscore": dadscore}

@app.websocket("/ws/league")
async def ws_league(ws: WebSocket):
    await ws.accept()
    q: asyncio.Queue = asyncio.Queue()
    _subscribers.append(q)
    try:
        while True:
            msg = await q.get()
            await ws.send_json(msg)
    finally:
        _subscribers.remove(q)

async def publish_snapshot(snapshot: Dict):
    for q in list(_subscribers):
        await q.put(snapshot)

def insert_snapshot(snapshot: Dict):
    _snapshots.append(snapshot)
    asyncio.create_task(publish_snapshot(snapshot))

def calculate_dadscore(snapshot: Dict) -> int:
    if not snapshot:
        return 0
    return int(snapshot.get("value", 0) % 100)
