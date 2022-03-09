const axios = require("axios");

// Instance of axios
const apiMovie = axios.create({
  baseURL: `${process.env.BASE_URL}`,
});

apiMovie.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${process.env.API_MOVIE_KEY}`;
  return req;
});

// Export function
module.exports = apiMovie;
