// Import functions
const express = require("express");
const app = express();
const { moviesPagination } = require("../moviesfunctions/calls_movies");
const { getQuery } = require("../functions/other_functions");

// Route best movies now playing
app.get("/nowplaying", async (req, res) => {
  try {
    const response = await moviesPagination(
      "/movie/now_playing",
      getQuery(req)
    );
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

// Export route
module.exports = app;
