import { fetchShowsFromApi } from './api';

describe('fetchShowsFromApi', () => {
  beforeEach(() => {
    global.fetch = vi.fn(); 
  });

  afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  it('should fetch shows successfully', async () => {
    const mockData = [{ id: 1, name: 'Show 1' }, { id: 2, name: 'Show 2' }];
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const data = await fetchShowsFromApi();
    
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:3001/shows/all-shows");
    expect(data).toEqual(mockData);
  });

  it('should handle fetch error', async () => {
    const errorMessage = 'Failed to fetch shows: Network error';
    global.fetch.mockRejectedValue(new Error(errorMessage));

    await expect(fetchShowsFromApi()).rejects.toThrowError(errorMessage);
  });

  it('should handle non-ok response', async () => {
    const errorStatus = 404;
    const errorMessage = `Failed to fetch shows: status ${errorStatus}`;
    global.fetch.mockResolvedValue({
      ok: false,
      status: errorStatus,
    });

    await expect(fetchShowsFromApi()).rejects.toThrowError(errorMessage);
  });
});
