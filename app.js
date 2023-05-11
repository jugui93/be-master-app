const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const apiRoutes = require('./routes/api-routes');
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/', (req, res, next) => {
    res.send('Welcome to Be Master API')
} )
app.use('/api',apiRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
    if (res.headSent) {
        return next(error)
    }

    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error ocurred!'})
});

app.listen(5000, console.log("Server running in port 5000"))