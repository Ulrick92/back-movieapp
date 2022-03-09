// Import functions
const express = require("express");
const app = express();
const { details } = require("../moviesfunctions/calls_movies");

// Route movies details
app.get("/details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // const response = await details(`/movie/${id}`);
    const response = await details([`/movie/${id}`, `/movie/${id}/credits`]);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

// Export route
module.exports = app;
