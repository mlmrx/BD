const { fetchTopCoins } = require('..');

describe('fetchTopCoins', () => {
  const sampleData = [
    { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', market_cap_rank: 1, market_cap: 850000000000 },
    { id: 'ethereum', symbol: 'eth', name: 'Ethereum', market_cap_rank: 2, market_cap: 350000000000 },
    { id: 'dogecoin', symbol: 'doge', name: 'Dogecoin', market_cap_rank: 9, market_cap: 12000000000 },
    { id: 'anothercoin', symbol: 'anc', name: 'AnotherCoin', market_cap_rank: 30, market_cap: 2500000000 },
    { id: 'vechain', symbol: 'vet', name: 'VeChain', market_cap_rank: 35, market_cap: 2500000000 },
    { id: 'filecoin', symbol: 'fil', name: 'Filecoin', market_cap_rank: 45, market_cap: 1500000000 },
    { id: 'smallcoin', symbol: 'smc', name: 'SmallCoin', market_cap_rank: 25, market_cap: 800000000 }
  ];

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(sampleData)
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('filters and maps data', async () => {
    const coins = await fetchTopCoins();
    expect(coins.slice(0, 3)).toMatchSnapshot();
  });
});
