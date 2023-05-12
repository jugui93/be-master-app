const express = require("express");

const apiControllers = require("../controllers/api-controllers");

const router = express.Router();

router.get('/repos/:user', apiControllers.getPopularRepos);

router.get('/nomenclatura', apiControllers.getFunction);

router.get('/logica/:num', apiControllers.getArray)

module.exports = router;