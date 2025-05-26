const { fetchMarketSlice } = require('./lib/coinmarketcap');
const { fetchAssetDeep } = require('./lib/coingecko');
const { reconcile } = require('./lib/reconcile');
const { upsertSnapshot } = require('./lib/db');

async function run() {
  const apiKey = process.env.CMC_API_KEY || '';
  const slice = await fetchMarketSlice(apiKey);

  for (const asset of slice) {
    const cg = await fetchAssetDeep(asset.id);
    const discrepancies = reconcile(cg, asset);
    const record = { ...asset, ...cg, discrepancies };
    await upsertSnapshot(asset.id, new Date().toISOString(), record);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
