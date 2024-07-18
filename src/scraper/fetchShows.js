import dotenv from 'dotenv';
dotenv.config();

export const fetchShows = async () => {
  try {
    const response = await fetch(process.env.API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch shows: status ${response.status}`);
    }
    const data = await response.json();
    console.log("Shows data fetched successfully", new Date());
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch network shows: ${error.message}`);
  }
};
