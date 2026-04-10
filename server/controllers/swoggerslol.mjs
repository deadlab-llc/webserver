import { Router } from "express";
import dotenv from "dotenv";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __DIRNAME = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__DIRNAME, "../../.env") });
const ROUTES = Router();
import { POSTS } from "../schemas/posts.mjs";
import { readFileSync } from "fs";
const indexFilePath = join(
	__DIRNAME,
	"../../client-swoggerslol/dist",
	"index.html",
);
const cachedHTML = readFileSync(indexFilePath, "utf8");
ROUTES.get("/posts/:post_title", async (req, res) => {
	try {
		const {
			post_title,
		} =
			req.params;
		const post =
			await POSTS.findOne(
				{
					post_title: post_title.replace(
						/-/g,
						" ",
					),
				},
			);
		if (
			!post
		)
			return res
				.status(
					404,
				)
				.send(
					"Post not found",
				);
		const sanitized = (str) => str.replace(/[&<>"'&]/g, (c) => {`&#${c.charCodeAt(0)};`});
		const html =
			cachedHTML.replace(
				"<head>",
				`<head>
            <meta property="og:title" content="${sanitized(post.post_title)}" />
            <meta property="og:description" content="${sanitized(post.preview_text)}" />
            <meta property="og:image" content="/images/mods/${sanitized(post_title)}.webp" />
            <meta property="og:url" content="${sanitized(process.env.SWOGGERSLOL_URI)}/posts/${sanitized(post_title)}"
            `,
			);
		res.send(
			html,
		);
	} catch (error) {
		console.log(error);
		return res.status(500).send("Internal Server Error");
});
ROUTES.post("/update", async (req, res) => {
	try {
		if (
			req
				.body
				.token !=
			process
				.env
				.SECRET
		)
			return res
				.status(
					401,
				)
				.send(
					"invalid credentials",
				);
		if (
			!req
				.body
				.post_title ||
			!req
				.body
				.patch
		)
			return res
				.status(
					400,
				)
				.send(
					"missing params",
				);
		if (typeof req.body.post_title != "string" || typeof req.body.patch != "string")
			return res
				.status(
					400,
				)
				.send(
					"invalid params",
				);
		let {
			post_title,
			patch,
		} =
			req.body;
		const post =
			await POSTS.findOne(
				{
					post_title: post_title,
				},
			);
		if (
			!post
		)
			return res
				.status(
					404,
				)
				.send(
					"missing post",
				);
		post.version_history.unshift(
			patch,
		);
		post.updated_at =
			new Date();
		await post.save();
		console.log(
			post,
		);
		return res
			.status(
				200,
			)
			.send(
				"success",
			);
	} catch (error) {
		return res
			.status(
				500,
			)
			.send(
				"internal server error",
			);
	}
});
ROUTES.get("*", (req, res) => {
	res.send(
		cachedHTML,
	);
});

export { ROUTES };
