import Post from "./Posts.json" assert {type:"json"}
import {SWOGGERSLOL_CONNECTION as CONNECTION} from "../config/connection.mjs"
import { POSTS } from "../schemas/index.mjs"
CONNECTION.then(async()=>{
    await POSTS.deleteMany();
    await POSTS.insertMany(Post)
    process.exit(0)
})
