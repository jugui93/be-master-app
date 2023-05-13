const axios = require("axios");
require('dotenv').config();
const HttpError = require("../models/http-error");


const getPopularRepos= async function (req, res, next) {
    const user = req.params.user;
    const options = {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      params: {
        sort: 'stars',
        per_page: 10,
      },
    };
    
    const URL=`https://api.github.com/users/${user}/repos`;
    let data;
    try {
        data  = await axios.get(URL, options);
    } catch (err) {
        const error = new HttpError(
            err.message,
            500
          );
          return next(error);
    }
    
    res.status(200).json(data.data);
}
const getFunction= function (req, res, next) {
    let data = []
    try {
        data = [{descriptiveFunction:
        `function calcularSeno(coordenadaX, coordenadaY, coordenadaZ) {
            let sum = coordenadaX + coordenadaY;
            let product = sum * CoordenadaZ;
            let seno = Math.sin(product);
            return seno;
           }`},{
        simpleFuction:`function f(x, y, z) {
            let a = x + y;
            let b = a * z;
            let c = Math.sin(b);
            return c;
            }`}];
        
    } catch (err) {
        const error = new HttpError(
            err.message,
            500
          );
          return next(error);
    }
    
    res.status(200).json(data);
}

const getArray = function (req, res, next) {
    let num = req.params.num;
    let data = []
    try {
        let array = [];

        if ( num > 0){
            for (let index = 1; index <= num; index++) {
                if (index % 2 !== 0)
                 array.push(index);
            };
            data=[{array: array}]
        } else {
            const error = new HttpError(
                '¡Ingresa un número valido!',
                500
              );
              return next(error);
        }
        
        
    } catch (err) {
        error = new HttpError(
            err.message,
            500
          );
          return next(error);
    }
    
    res.status(200).json(data);
}
module.exports = { getPopularRepos, getFunction, getArray }