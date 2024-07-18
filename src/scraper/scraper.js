import { fetchShows } from "./fetchShows.js";
import { saveShowsToFile } from "./saveShowsToFile.js";

const scraper = async () => {
  try {
    const shows = await fetchShows();
    saveShowsToFile(shows, "src/scraper/shows.json");
  } catch (error) {
    console.error(error.message);
  }
};

setInterval(scraper, 5 * 60 * 1000);
