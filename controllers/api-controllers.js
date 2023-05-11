const axios = require("axios");
const HttpError = require("../models/http-error");


const getPopularRepos= async function (req, res, next) {
    const user = req.params.user;
    const options = {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        params: {
            sort: 'stars',
            per_page: 10,
          },
      },
    };
    const URL=`https://api.github.com/users/${user}/repos`;
    try {
        const { data } = await axios.get(URL, options);
        console.log(data);
    } catch (err) {
        const error = new HttpError(
            err.message,
            500
          );
          return next(error);
    }
    
    res.status(200).json(data);
}

module.exports = { getPopularRepos }