// Import functions
const apiMovie = require("./api_movie");
const {
  filterFilmsNowPlaying,
  getMovieDetails,
  movieCard,
  params,
  actorCard,
} = require("../functions/other_functions");

// Function get many request
const moviesPromise = async (url) => {
  try {
    let endpoints = url;
    const response = await Promise.all(
      endpoints.map((endpoint) => apiMovie.get(endpoint, params()))
    );

    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Function return nowplaying and popular movies for home page
const getMoviesHome = async (url) => {
  try {
    const [nowplaying, popular] = await moviesPromise(url);

    return [
      filterFilmsNowPlaying(nowplaying.data.results),
      movieCard(popular.data.results),
    ];
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Function paginate movies pages
const moviesPagination = async (url, query) => {
  try {
    const options = { params: query };
    const response = await apiMovie.get(url, params(options));
    const { results, total_pages, page } = response.data;
    const pages = total_pages > 500 ? 500 : total_pages; // request error => "page must be less than or equal to 500"

    return {
      results: movieCard(results),
      page,
      total_pages: pages,
      ...(page > 1 && { previous_page: page - 1 }),
      ...(page < pages && { next_page: page + 1 }),
    };
  } catch (error) {
    console.log(error);
    return {};
  }
};

// Function get movie details
const details = async (url) => {
  try {
    const [details, actors] = await moviesPromise(url);

    return [getMovieDetails(details.data), actorCard(actors.data.cast)];
  } catch (error) {
    console.log(error);
    return [];
  }
};

// All export functions
exports.getMoviesHome = getMoviesHome;
exports.moviesPagination = moviesPagination;
exports.details = details;
