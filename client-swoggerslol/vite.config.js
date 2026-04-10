import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import sitemap from "vite-plugin-sitemap";
import Posts from "../server/seeds/Posts.json" with { type: "json" };
// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		sitemap(
			{
				hostname: "http://swoggerslol.com",
				dynamicRoutes: Posts.map(
					(
						p,
					) =>
						`/posts/${p.post_title.replace(/ /g, "-")}`,
				),
			},
		),
	],
	server: {
		proxy: {
			"/graphql": "http://localhost:3000",
		},
	},
});
