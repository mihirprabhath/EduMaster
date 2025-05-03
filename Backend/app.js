const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./Routes/UserRoutes");
const authRouter = require("./Routes/AuthRoutes");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/users", userRouter);
app.use("/auth", authRouter);

mongoose.connect("mongodb+srv://lakshithaprebath56:YSK04WyVOeDwXY2e@cluster0.1gfynqf.mongodb.net/")
    .then(() => console.log("Connected to MongoDB"))
    .then(() => {
        app.listen(5000, () => console.log("Server running on port 5000"));
    })
    .catch((err) => console.log(err));