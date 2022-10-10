import express from "express";

import fs from 'fs'
import createError from "http-errors";
import path from "path";
import logger from "morgan";
import cors from "cors";
import http from "http";
// import https from "https";
import dotenv from "dotenv";

import { corsOptions } from "./config";
import api from "./routes/api";
import {wrapperAsync} from "@/utils/functions";
import bodyParser from "body-parser";

dotenv.config();{}

// const options = {
//   key: fs.readFileSync('./.cert/rootca.key'),
//   cert: fs.readFileSync('./.cert/rootca.cr')
// };

const app = express();
const server = http.createServer(app);
// const serverHTTPS = https.createServer(options, app);
const HTTP_PORT = process.env.PORT|| 5000;
const HTTPS_PORT = process.env.HTTPS_PORT|| 5001;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", api);


app.get("/", wrapperAsync(async(req, res, next)=>{
  //redirect HTTPS
  if (req.secure) {
    next();
  } else {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json({message:"server connected"})
    // const to = `https://${req.hostname}:${HTTPS_PORT}${req.url}`;
    // res.redirect(to);
  }
}));

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

server.listen(HTTP_PORT,'0.0.0.0', () => {
  console.log("HTTP listening on port ", HTTP_PORT);
});

// serverHTTPS.listen(HTTPS_PORT, () => {
//   console.log("HTTPS listening on port ", HTTPS_PORT);
// });
