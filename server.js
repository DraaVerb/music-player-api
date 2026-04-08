const express = require("express");
const mongoose = require("mongoose");
const songRoutes = require("./routes/songRoutes");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/musicplayer")
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

app.use("/api", songRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});