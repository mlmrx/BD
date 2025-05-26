const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/metrics',
});

async function upsertSnapshot(assetId, ts, data) {
  await pool.query(
    `INSERT INTO asset_snapshots (asset_id, ts, data)
     VALUES ($1, $2, $3)
     ON CONFLICT (asset_id, ts) DO UPDATE SET data = EXCLUDED.data`,
    [assetId, ts, data]
  );
}

module.exports = { pool, upsertSnapshot };
