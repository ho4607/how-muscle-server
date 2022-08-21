import express from "express";

import createError from "http-errors";
import path from "path";
import logger from "morgan";
import cors from "cors";
import http from "http";

import { corsOptions } from "./config";
import api from "./routes/api";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT|| 5000;

app.use(logger("dev"));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", api);

app.get("/", function (req, res) {
  res.json({message :"server connected"});
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // send error message
  res.status(err.status || 500);
  res.json({
    errMsg: err.stack,
  });
});

server.listen(PORT , () => {
  console.log("listening on port ", PORT);
});
