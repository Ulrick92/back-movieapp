// Function truncate text
const truncatedText = (text, number) => {
  const dots = text.length > number ? "..." : "";
  return `${text.substring(0, number)}${dots}`;
};

// Function format the date to stirng
const formatDate = (date) => {
  const event = new Date(date);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (result = event.toLocaleDateString("fr-FR", options));
};

// Function format "release_date" and "vote_average" keys and return the rest keys
const movieDetails = ({ release_date, vote_average, vote_count, ...rest }) => {
  return {
    release_date: formatDate(release_date),
    vote_average: `${vote_average} / 10 | ${vote_count} vote(s)`,
    ...rest, // to avoid having a key named "rest"
  };
};

// Function return other actor keys
const actorDetails = ({
  biography,
  birthday,
  deathday,
  id,
  name,
  profile_path,
}) => {
  return {
    biography,
    birthday: formatDate(birthday),
    ...(deathday !== null && { deathday: formatDate(deathday) }),
    id,
    name,
    profile_path,
  };
};

// Function return 3 keys for movie Cards
const movieCardMap = ({ title, poster_path, id }) => {
  return {
    title,
    poster_path,
    id,
  };
};

// Function return 4 keys for actor Cards
const actorCardMap = ({ original_name, profile_path, character, id }) => {
  return {
    original_name,
    profile_path,
    character,
    id,
  };
};

// Function return the best movies now playing between 10 and 7 vote average
const filterFilmsNowPlaying = (movies) => {
  return movies
    .filter(
      ({ vote_average, overview }) =>
        vote_average <= 10 && vote_average >= 7 && overview
    )
    .map(
      ({
        title,
        backdrop_path,
        id,
        overview,
        release_date,
        vote_average,
        genre_ids,
      }) => ({
        title,
        backdrop_path,
        id,
        overview: truncatedText(overview, 420),
        release_date: formatDate(release_date),
        vote_average,
        genre_ids,
      })
    )
    .sort((a, b) => b.vote_average - a.vote_average);
};

// Function return actor details
const getActorDestails = (actor) => actorDetails(actor);

// Function return movie details
const getMovieDetails = (movie) => movieDetails(movie);

// Function map to return a movies cards array
const movieCard = (movies) => (moviesArray = movies.map(movieCardMap));

// Function map to return an actors cards array
const actorCard = (peoples) =>
  (actorsArray = peoples
    .filter((p) => p.known_for_department === "Acting")
    .map(actorCardMap));

// Function return value query "page"
const getQuery = (req = {}) => {
  let page;
  if (req.query.page) {
    page = req.query.page;
  } else {
    page = 1;
  }
  let query;
  if (req.query.query) {
    query = encodeURI(req.query.query); // Encode for accent ex : "Amélie poulain"
  }
  return req.query;
};

// Function return "object params" for axios request
const params = (options = {}) => {
  const { params = {} } = options;
  return {
    params: {
      language: "fr-FR",
      ...params,
    },
  };
};

// All export funcions
exports.truncatedText = truncatedText;
exports.formatDate = formatDate;
exports.filterFilmsNowPlaying = filterFilmsNowPlaying;
exports.getMovieDetails = getMovieDetails;
exports.movieCard = movieCard;
exports.getQuery = getQuery;
exports.params = params;
exports.actorCard = actorCard;
exports.getActorDestails = getActorDestails;
