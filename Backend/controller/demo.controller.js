import * as path from "path"; // ADDED LATER
import { fileURLToPath } from "url"; // ADDED LATER
import { promises as fs } from "fs"; // ADDED LATER: file handling
import fetch from "node-fetch"; // ADDED LATER: external API calls

// ADDED LATER: ESM util
import { greet } from "../utils/esmUtil.js";
// ADDED LATER: CommonJS util via dynamic import to interop in ESM
const loadCommonJsUtil = async () => (await import("../utils/cjsUtil.cjs")).default;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const fsDemo = async (req, res, next) => {
    try {
        // ADDED LATER: write & read a temp file using fs/promises
        const demoDir = path.join(__dirname, "..", "tmp");
        const demoFile = path.join(demoDir, "example.txt");
        await fs.mkdir(demoDir, { recursive: true });
        const content = `Hello from fsDemo at ${new Date().toISOString()}\n`;
        await fs.writeFile(demoFile, content, "utf8");
        const readBack = await fs.readFile(demoFile, "utf8");
        res.status(200).json({ message: "fs demo ok", readBack });
    } catch (err) {
        next(err);
    }
};

export const fetchDemo = async (req, res, next) => {
    try {
        // ADDED LATER: call a public API
        const response = await fetch("https://api.github.com/repos/nodejs/node");
        if (!response.ok) {
            throw new Error(`Upstream API failed: ${response.status}`);
        }
        const data = await response.json();
        res.status(200).json({ name: data.name, stargazers_count: data.stargazers_count });
    } catch (err) {
        next(err);
    }
};

export const modulesDemo = async (req, res, next) => {
    try {
        // ADDED LATER: demonstrate ESM + CommonJS interop
        const cjs = await loadCommonJsUtil();
        const esmGreeting = greet("ESM");
        const cjsGreeting = cjs.greet("CommonJS");
        res.status(200).json({ esmGreeting, cjsGreeting });
    } catch (err) {
        next(err);
    }
};


