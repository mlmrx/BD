const { reconcile } = require('../src/lib/reconcile');

const cg = { price: 10, market_cap: 200, volume_24h: 50 };
const cmc = { price: 10.7, market_cap: 180, volume_24h: 49 };

const result = reconcile(cg, cmc);
console.log(JSON.stringify(result, null, 2));
