const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const { initSocket } = require("./socket/index");

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};


const app = express();
app.use(cors(corsOptions));
require("dotenv").config();

console.log("Ankit--->", process.env.CLIENT_URL);
console.log("Prashant--->", process.env.MONGO_URI);

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "https://chatt-ap.netlify.app");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   if (req.method === "OPTIONS") {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SIGNATURE));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hi there!");
});

app.get("/data", (req, res)=>{
  res.send(200).json("This is Ankit" );
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connection Success"))
  .catch((err) => console.log("DB connection Error", err.message));

const server = app.listen(process.env.PORT, () => {
  console.log(`App is listening to port ${process.env.PORT}`);
});

// socket.io
initSocket(server, corsOptions);

module.exports = app;
