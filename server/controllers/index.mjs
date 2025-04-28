import {Router} from "express"
const ROUTES = Router();
import { join,dirname,resolve } from "path"
import { fileURLToPath } from "url"
import { POSTS } from "../schemas/posts.mjs";
import { readFileSync } from "fs";
const __DIRNAME =  resolve(dirname(fileURLToPath(import.meta.url)),"..")
const indexFilePath = join(__DIRNAME,"../client/dist", "index.html")
console.log(indexFilePath);

const cachedHTML = readFileSync(indexFilePath,"utf8")
ROUTES.get("/posts/:post_title",async(req,res)=>{
    try {
        const {post_title} = req.params
        const post = await POSTS.findOne({post_title:post_title.replace(/-/g," ")})
        if(!post)return res.status(404).send("Post not found");
        const html = cachedHTML.replace("<head>",
            `<head>
            <meta property="og:title" content="${post.post_title}" />
            <meta property="og:description" content="${post.preview_text}" />
            <meta property="og:image" content="/images/mods/${post_title}.webp" />
            <meta property="og:url" content="https://www.swoggerslol.com/posts/${post_title}"
            `
        )
        res.send(html)
    } catch (error) {
        return res.status(500).send(error)
    }
})

export {ROUTES}