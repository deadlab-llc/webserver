import { POSTS } from "../schemas/index.mjs";
let POST_CACHE = null;
async function getPosts() {
	if (!POST_CACHE) POST_CACHE = await POSTS.find();
	return POST_CACHE;
}
export const resolvers = {
	Query: {
		hello: () => {
			console.log(
				"queried!",
			);

			return "world";
		},
		GetAllPosts: async () => {
			try {
				return await getPosts();
			} catch (error) {
				console.log(
					new Error(),
					error,
				);
				return error;
			}
		},
		GetPostByPostName: async (
			parent,
			{
				PostName,
			},
		) => {
			try {
				const posts =
					await getPosts();
				return (
					posts.find(
						(
							p,
						) =>
							p.post_title ===
							PostName,
					) ||
					null
				);
			} catch (error) {
				console.log(
					new Error(),
					error,
				);
				return error;
			}
		},
	},
};
