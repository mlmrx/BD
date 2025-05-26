import { spawn } from 'child_process';
import supertest from 'supertest';
import { test, after, strict as assert } from 'node:test';
import { chromium } from 'playwright';

const server = spawn('python3', ['-m', 'services.api']);
const api = supertest('http://localhost:8000');

after(() => server.kill());

test('healthz returns 200', async () => {
  await api.get('/healthz').expect(200);
});

test('websocket receives update', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.evaluate(() => {
    window.msg = new Promise(resolve => {
      const ws = new WebSocket('ws://localhost:8000/ws/league');
      ws.onmessage = ev => resolve(JSON.parse(ev.data));
    });
  });
  await api.post('/debug/insert').send({id: 'a', ts: Date.now(), value: 1});
  const msg = await page.evaluate(() => window.msg);
  assert.ok(msg);
  await browser.close();
});
