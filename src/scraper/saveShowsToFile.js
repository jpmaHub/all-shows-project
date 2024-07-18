import { promises as fs } from 'fs';

export const saveShowsToFile = async (showsData, filePath) => {
  const jsonData = JSON.stringify(showsData, null, 2);

  try {
    await fs.writeFile(filePath, jsonData);
    console.log(`Data written to ${filePath} successfully`,  new Date());
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
  }
};
