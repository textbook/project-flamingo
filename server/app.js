const express = require("express");
const path = require("path");
const expressMongoDb = require("express-mongo-db");

const router = require("./router");
const appFactory = mongoUrl => {
  const app = express();
  const API_ROOT_PATH = "/api";
  app.use(express.json());
  app.use(expressMongoDb(mongoUrl));

  app.use(API_ROOT_PATH, router);

  app.use(express.static(path.join(__dirname, "static")));

  app.get("*", (req, res, next) => {
    if (req.url.startsWith(API_ROOT_PATH)) {
      return next();
    }
    res.sendFile(path.join(__dirname, "static/index.html"));
  });

  return app;
};

module.exports = appFactory;
