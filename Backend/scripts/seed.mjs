// ADDED LATER: simple CLI seeder (run with: npm run cli:seed)
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Book from "../model/book.model.js";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    const uri = process.env.MongoDBURI;
    if (!uri) {
        console.error("Missing MongoDBURI in environment");
        process.exit(1);
    }
    await mongoose.connect(uri);
    const count = await Book.countDocuments();
    if (count === 0) {
        await Book.create({
            name: "Demo Book",
            title: "Intro to Node",
            category: "Programming",
            image: "",
            oldPrice: 0,
            newPrice: 0,
        });
        console.log("Seeded a demo book.");
    } else {
        console.log("Books already exist, skipping seed.");
    }
    await mongoose.disconnect();
}

main().catch((err) => {
    console.error("Seeder failed:", err);
    process.exit(1);
});


