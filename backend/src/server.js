require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.use("/api/users", require("./routes/user.routes"));
app.use("/api/movies", require("./routes/movie.routes"));
app.use("/api/episodes", require("./routes/episode.routes"));
app.use("/api/genres", require("./routes/genre.routes"));

app.use("/films", express.static(path.join(__dirname, "../public/films")));
app.use("/thumbnails", express.static(path.join(__dirname, "../public/thumbnails")));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Server running on port " + PORT));