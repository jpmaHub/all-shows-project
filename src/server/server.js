import express from "express";
import { promises as fs } from "fs";
import cors from "cors";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET",
  exposedHeaders: "Authorization,authorization",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/shows/all-shows", async (req, res) => {
  const filePath = "./src/scraper/shows.json";
  try {
    const data = await fs.readFile(filePath, { encoding: "utf8" });
    const showsData = JSON.parse(data);
    res.json(showsData);
  } catch (err) {
    console.error("Error reading JSON file:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;
