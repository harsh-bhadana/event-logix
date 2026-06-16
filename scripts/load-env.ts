import dotenv from "dotenv";
import path from "path";

// Load .env.local from the project root directory
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });
