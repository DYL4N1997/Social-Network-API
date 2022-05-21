// require dependencies
const express = require("express");
const mongoose = require("mongoose");

// initialise express
const app = express();
const PORT = process.env.PORT || 3008;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes"));

// connection to mongoDB database
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/social-network-api",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// mongo log
mongoose.set("debug", true);

// listen to server
app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));

