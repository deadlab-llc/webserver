import dotenv from "dotenv"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
const __DIRNAME = dirname(fileURLToPath(import.meta.url))
dotenv.config({path:join(__DIRNAME,"../../.env")})
import mongoose from "mongoose";
var DeadlabURI = (process.env.NODE_ENV==="production")?"mongodb://host.docker.internal:27017":process.env.MONGO_DEADLAB_URI
var SwoggerslolURI=(process.env.NODE_ENV==="production")?"mongodb://host.docker.internal:27017":process.env.MONGO_SWOGGERSLOL_URI
console.log("process.env.MONGO_SWOGGERSLOL_URI: ",SwoggerslolURI);
console.log("process.env.MONGO_DEADLAB_URI: ",DeadlabURI);
export const SWOGGERSLOL_CONNECTION = mongoose.createConnection(SwoggerslolURI)
export const DEADLAB_CONNECTION = mongoose.createConnection(DeadlabURI)