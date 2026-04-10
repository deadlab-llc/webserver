import Post from "./Posts.json" assert { type: "json" };
import { SWOGGERSLOL_CONNECTION } from "../config/connection.mjs";
import { POSTS } from "../schemas/index.mjs";
if (SWOGGERSLOL_CONNECTION.readyState !== 1) {
	await new Promise(
		(
			resolve,
			reject,
		) => {
			SWOGGERSLOL_CONNECTION.once(
				"open",
				resolve,
			);
			SWOGGERSLOL_CONNECTION.once(
				"error",
				reject,
			);
		},
	);
}
await POSTS.deleteMany();
await POSTS.insertMany(Post);
console.log("Seeded successfully");
process.exit(0);
