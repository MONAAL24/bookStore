import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"; // ADDED LATER: used for EJS views path resolution
import { fileURLToPath } from "url"; // ADDED LATER: emulate __dirname in ESM

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import demoRoute from "./route/demo.route.js"; // ADDED LATER: demo routes for syllabus items

const app = express();
//middleware

app.use(cors());
app.use(express.json());  

// ADDED LATER: EJS view engine setup (was not in project before)
const __filename = fileURLToPath(import.meta.url); // ADDED LATER
const __dirname = path.dirname(__filename); // ADDED LATER
app.set("view engine", "ejs"); // ADDED LATER
app.set("views", path.join(__dirname, "views")); // ADDED LATER

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// connect to mongoDB
try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}

// defining routes
app.get("/", (req, res) => {
    // ADDED LATER: basic EJS home page route
    res.render("home", { title: "Bookstore App" });
});
app.use("/book", bookRoute);  
app.use("/user", userRoute);
app.use("/demo", demoRoute); // ADDED LATER: mounts demo endpoints

// ADDED LATER: 404 handler middleware 
app.use((req, res, next) => {
    res.status(404).json({ message: "Not Found" });
});

// ADDED LATER: centralized error handler middleware 
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// ADDED LATER: process-level error handlers (were not in project before)
process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION:", err);
});
process.on("unhandledRejection", (reason) => {
    console.error("UNHANDLED REJECTION:", reason);
});