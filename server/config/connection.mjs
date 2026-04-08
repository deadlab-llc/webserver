import dotenv from "dotenv"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
const __DIRNAME = dirname(fileURLToPath(import.meta.url))
dotenv.config({path:join(__DIRNAME,"../../.env")})
import mongoose from "mongoose";
console.log("process.env.MONGO_SWOGGERSLOL_URI: ",process.env.MONGO_SWOGGERSLOL_URI);
console.log("process.env.MONGO_DEADLAB_URI: ",process.env.MONGO_DEADLAB_URI);
export const SWOGGERSLOL_CONNECTION = mongoose.createConnection((process.env.NODE_ENV==="production")?"mongodb://host.docker.internal:27017":process.env.MONGO_SWOGGERSLOL_URI)
export const DEADLAB_CONNECTION = mongoose.createConnection((process.env.NODE_ENV==="production")?"mongodb://host.docker.internal:27017":process.env.MONGO_DEADLAB_URI)