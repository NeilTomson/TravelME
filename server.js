const express = require("express");
const mongoose = require("mongoose");

const app = express();
const methodOverride = require("method-override");
const Travel = require("./models/travel");
const travelRouter = require("./routers/travel");

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

require("dotenv").config();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
app.get("/main", async (req, res) => {
  const travels = await Travel.find().sort({ createdAt: "desc" });
  const travelsLength = travels.length;
  let LatLng = [];
  for (let i = 0; i < travelsLength; i++) {
    let coord = {
      lat: travels[i].lat,
      lng: travels[i].lng,
    };
    LatLng.push(coord);
  }

  res.json(LatLng);
});

app.get("/", async (req, res) => {
  const travels = await Travel.find().sort({ createdAt: "desc" });
  res.render("travel/index", { travels: travels });
});

app.use("/travel", travelRouter);

app.listen(5000, () => {
  console.log("the server is runing on port localhost:5000");
});
