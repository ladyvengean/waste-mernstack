import express from "express";
import axios from "axios";

const router = express.Router();

// Notice the route path is just "/" instead of "/papers" since you're already mounting at "/api/v1/papers"
router.get("/", async (req, res) => {
  try {
    // Extract query parameters from the user's request
    const { topic = "ai", max_results = 5, start = 0 } = req.query;
    
    // Fetch papers from arXiv based on query parameters
    const response = await axios.get(
      `http://export.arxiv.org/api/query?search_query=all:${topic}&start=${start}&max_results=${max_results}`
    );
    
    // Send the raw XML response back
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching papers");
  }
});

export default router;
