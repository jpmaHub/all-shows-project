export const fetchShowsFromApi = async () => {
  try {
    const response = await fetch("http://localhost:3001/shows/all-shows");
    if (!response.ok) {
      throw new Error(`Failed to fetch shows: status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch shows: ${error.message}`);
  }
};
