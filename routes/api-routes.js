const express = require("express");

const apiControllers = require("../controllers/api-controllers");

const router = express.Router();

router.get('/repos/:user', apiControllers.getPopularRepos);

module.exports = router;