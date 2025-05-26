const fetch = require('node-fetch');

const API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

async function fetchMarketSlice(apiKey) {
  const res = await fetch(`${API_URL}?limit=500`, {
    headers: {
      'X-CMC_PRO_API_KEY': apiKey,
    },
  });
  if (!res.ok) {
    throw new Error(`CMC request failed: ${res.status}`);
  }
  const data = await res.json();
  return data.data
    .filter((asset) => asset.cmc_rank > 20 && asset.quote && asset.quote.USD && asset.quote.USD.market_cap >= 1e9)
    .map((asset) => ({
      id: asset.id,
      symbol: asset.symbol,
      name: asset.name,
      price: asset.quote.USD.price,
      market_cap: asset.quote.USD.market_cap,
      volume_24h: asset.quote.USD.volume_24h,
    }));
}

module.exports = { fetchMarketSlice };
