const fetch = require('node-fetch');

async function fetchAssetDeep(id) {
  const url = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&developer_data=true`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`CoinGecko request failed: ${res.status}`);
  }
  const data = await res.json();
  const dev = data.developer_data || {};
  const community = data.community_data || {};
  return {
    id: data.id,
    symbol: data.symbol,
    name: data.name,
    commits_4_weeks: dev.commit_count_4_weeks,
    pull_request_contributors: dev.pull_request_contributors,
    active_addresses: community.active_addresses,
  };
}

module.exports = { fetchAssetDeep };
