module.exports = {
  REACT_APP_BACKEND_ENDPOINT: JSON.stringify(
    process.env.REACT_APP_BACKEND_ENDPOINT,
  ),
  REACT_APP_GA_KEY: JSON.stringify(process.env.REACT_APP_GA_KEY),
  G_SEARCH_CONTENT: process.env.G_SEARCH_CONTENT
};
