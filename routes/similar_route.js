// Import functions
const express = require("express");
const app = express();
const { moviesPagination } = require("../moviesfunctions/calls_movies");
const { getQuery } = require("../functions/other_functions");

// Route similar movies
app.get("/similar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await moviesPagination(
      `/movie/${id}/similar`,
      getQuery(req)
    );
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

// Export route
module.exports = app;
