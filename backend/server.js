const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/utilisateur");
const postRoutes = require("./routes/post");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkUser, getToken } = require("./middleware/authMiddleware");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const path = require("path");
app.use(helmet());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  allowHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  prefLightContinue: false,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//fais appel a l'authentification du token pour chaque routes

app.get("*", checkUser);
app.get("/jwtid", getToken);

//routes
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
app.use(
  "/public/images",
  express.static(path.join(__dirname, "public/images"))
);

//server
app.listen(process.env.PORT, () => {
  console.log(` Listening on port ${process.env.PORT} `);
});
