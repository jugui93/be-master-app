const constants = require("./constants");

const generateOptions = (_path) => {
  return (options = {
    path: 'api.github.com' + _path,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
  });
};

module.exports = { generateOptions };
