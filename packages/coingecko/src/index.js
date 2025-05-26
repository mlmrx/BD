const COINGECKO_URL = 'https://api.coingecko.com/api/v3/coins/markets';

function mapCoin(coin) {
  return {
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    rank: coin.market_cap_rank,
    marketCap: coin.market_cap,
  };
}

async function fetchTopCoins() {
  const params = new URLSearchParams({
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: '250',
    page: '1',
    sparkline: 'false',
  });

  const response = await fetch(`${COINGECKO_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data
    .filter(
      (c) => c.market_cap_rank > 20 && c.market_cap >= 1_000_000_000
    )
    .map(mapCoin);
}

module.exports = { fetchTopCoins, mapCoin };
