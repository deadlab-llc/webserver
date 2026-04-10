import express from "express";
import { default as cors } from "cors";
import dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __DIRNAME = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__DIRNAME, "../../.env") });
import { default as rateLimit } from "express-rate-limit";
import { expressMiddleware } from "@apollo/server/express4";
const LIMITER = rateLimit({
	windowMs:
		15 *
		60 *
		1000, //15 mins
	max: 100, //Limit each IP to 100 requests per windowMs
	message: "Too many requests, please try again later.",
});
export default function ApplyMiddleware(APP, APOLLO, __DIRNAME) {
	APP.use(
		express.json(),
	);
	APP.use(
		cors(
			{
				origin: [
					"http://localhost" +
						":5173", //vite dev
					"http://localhost" +
						process
							.env
							.PORT, //express dev
					process
						.env
						.DEADLAB_URI, //deadlab production
					process
						.env
						.SWOGGERSLOL_URI, //ugly fuck ass swoggerslol production fr
				],
			},
		),
	);
	APP.use(
		LIMITER,
	);
	APP.set(
		"view engine",
		"ejs",
	);
	APP.set(
		"views",
		"./views/html",
	);

	APP.use(
		"/graphql",
		expressMiddleware(
			APOLLO,
		),
	);
	APP.use(
		express.static(
			join(
				__DIRNAME,
				"../client-swoggerslol/dist",
			),
			{
				index: false,
			},
		),
	);
	APP.use(
		express.static(
			join(
				__DIRNAME,
				"../client-swoggerslol/public",
			),
			{
				index: false,
			},
		),
	);
	APP.use(
		express.static(
			join(
				__DIRNAME,
				"../client-deadlab/dist",
			),
			{
				index: false,
			},
		),
	);
	APP.use(
		express.static(
			join(
				__DIRNAME,
				"../client-deadlab/public",
			),
			{
				index: false,
			},
		),
	);
}
