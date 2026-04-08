import dotenv from "dotenv"
dotenv.config({path:"../.env"})
import express from "express"
import { default as rateLimit } from "express-rate-limit"
// const  {default:ApolloServer} =require("@apollo/server")
import { ApolloServer } from "@apollo/server"
// import { expressMiddleware } from "@apollo/server/express4"
import { join,dirname } from "path"
import { fileURLToPath } from "url"
import {resolvers,typeDefs} from "./models/index.mjs"
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl"
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled'
// import {default as cors} from "cors"
import {DEADLAB_CONNECTION, SWOGGERSLOL_CONNECTION} from "./config/connection.mjs"
import {default as ApplyMiddleware} from "./config/middleware.mjs"
import {ROUTES} from "./controllers/index.mjs"
const APP = express()
const PORT = process.env.PORT||3000;
const LIMITER = rateLimit({
    windowMs:15*60*1000, //15 mins
    max: 1000, //Limit each IP to 100 requests per windowMs
    message:"Too many requests, please try again later.",
    skip:(req)=>req.path.startsWith("data")||req.path.startsWith("images")||req.path.startsWith("videos")
})
const __DIRNAME = dirname(fileURLToPath(import.meta.url))
const APOLLO = new ApolloServer({
    typeDefs,
    resolvers,
    // csrfPrevention:true,
    introspection:process.env.NODE_ENV!=="production",
    playground: false,
    cache:"bounded",
    plugins:[ApolloServerPluginCacheControl({defaultMaxAge:3600}),ApolloServerPluginLandingPageDisabled()]//Default cache is 1hr long
})

async function AttemptConnections(){
    //Connect to DB first
    try {
        await DEADLAB_CONNECTION
        console.log(`Connection to DB established on ${process.env.MONGO_DEADLAB_URI}`);
        await SWOGGERSLOL_CONNECTION
        console.log(`Connection to DB established on ${process.env.MONGO_SWOGGERSLOL_URI}`);
        //connect apollo
        await APOLLO.start();
        console.log(`Connection to APOLLO established on http://localhost:${PORT}/graphql`)
        //connect middleware
        ApplyMiddleware(APP,APOLLO,__DIRNAME)
        //connect routes
        APP.use(LIMITER)
        APP.use(ROUTES)
        if(process.env.NODE_ENV=="production"){
            APP.get("/graphql", (req, res) => {
                res.sendFile(join(__DIRNAME, "../client/dist", "index.html"));
            });
        }        
        //connect express
        APP.listen(PORT,()=>console.log(`Connection to Express established on http://localhost:${PORT}`))
    } catch (error) {
        console.error(error);
    }
} 
AttemptConnections()