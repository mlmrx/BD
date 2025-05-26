const { pool, upsertSnapshot } = require('../../src/lib/db');

async function run() {
  await pool.query(`CREATE TABLE IF NOT EXISTS asset_snapshots (
    asset_id text,
    ts timestamptz,
    data jsonb,
    PRIMARY KEY(asset_id, ts)
  );`);

  await upsertSnapshot('btc', new Date().toISOString(), { ok: true });
  const { rows } = await pool.query('SELECT * FROM asset_snapshots');
  console.log(rows);
  await pool.end();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
