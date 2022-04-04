// Import functions
const express = require("express");
const app = express();
const { getMoviesHome } = require("../moviesfunctions/calls_movies");

app.get("/movies_home", async (req, res) => {
  try {
    const response = await getMoviesHome([
      "/movie/now_playing",
      "/movie/popular",
    ]);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

// Export route
module.exports = app;
