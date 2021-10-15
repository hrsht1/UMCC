const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const events = require("./routes/api/events");
const homepageData = require("./routes/api/homepageData");
const app = express();
var cors = require("cors");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json({ limit: "30mb",extended:true}));

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.use(cors({ origin: true, credentials: true }));

// Routes
app.use("/api/users", users);
app.use("/api/events", events);
app.use("/api/homepageData",homepageData);

//checking if server is working
app.get("/", (req, res) => res.send("Hello world!"));

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

app.listen(port, () => console.log(`Server up and running ... ${port} !`));
