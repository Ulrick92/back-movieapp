// Import function
const express = require("express");
// "Cross-Origin Resource Sharing" is a mechanism to allow requests from a different
// requests from a different domain name Here, we allow the API
// to respond to AJAX requests from other servers
const cors = require("cors");
// The "dotenv" package allows to define environment variables in the ".env" file.
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

// Import routes from "routes" file
const moviesHome = require("./routes/moviesHome_route");
app.use(moviesHome);

const nowplaying = require("./routes/nowPlaying_route");
app.use(nowplaying);

const popular = require("./routes/popular_route");
app.use(popular);

const details = require("./routes/details_route");
app.use(details);

const search = require("./routes/search_route");
app.use(search);

const similar = require("./routes/similar_route");
app.use(similar);

// Not found route
app.all("*", (req, res) => {
  res.status(404).send("Page introuvable");
});

// Listen server port
app.listen(process.env.PORT, () => {
  console.log("Server start");
});

// Export all routes
module.exports = app;
