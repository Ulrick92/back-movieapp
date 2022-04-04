// Import functions
const express = require("express");
const app = express();
const { actor } = require("../moviesfunctions/calls_movies");

app.get("/actor/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await actor([
      `/person/${id}`,
      `/person/${id}/movie_credits`,
    ]);

    return res.json(response);
  } catch (error) {
    res.json(error);
  }
});

// Export route
module.exports = app;
