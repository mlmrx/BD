import { describe, it, expect, beforeEach } from 'vitest';
import { useWatchlist } from './watchlist';

describe('watchlist store', () => {
  beforeEach(() => {
    useWatchlist.setState({ items: [] });
  });

  it('adds and removes items', () => {
    useWatchlist.getState().add({ id: 'btc', name: 'Bitcoin' });
    expect(useWatchlist.getState().items.length).toBe(1);
    useWatchlist.getState().remove('btc');
    expect(useWatchlist.getState().items.length).toBe(0);
  });
});
