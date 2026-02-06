import express from "express";
import { fsDemo, fetchDemo, modulesDemo } from "../controller/demo.controller.js"; // ADDED LATER: demo controller

const router = express.Router();

// ADDED LATER: endpoints for syllabus demonstrations
router.get("/fs", fsDemo);
router.get("/fetch", fetchDemo);
router.get("/modules", modulesDemo);

export default router;


