import { SWOGGERSLOL_CONNECTION } from "../config/connection.mjs";
import { Schema } from "mongoose";

const POSTS_SCHEMA = new Schema(
	{
		//The preview image WILL be MODNAME
		post_title: {
			type: String,
			required: true,
		},
		preview_text: String,
		is_active_project: Boolean,
		download_url_override: String,
		entry: [
			{
				entry_title: {
					type: String,
					required: true,
				},
				entry_body: {
					type: String,
					required: true,
				},
				is_underlined: Boolean,
				_id: false,
			},
		],
		version_history: [
			{
				version_number: {
					type: String,
					required: true,
				},
				patch_note: {
					type: String,
					required: true,
				},
				_id: false,
			},
		],
		updated_at: {
			type: Date,
			default: Date.now,
		},
	},
	{
		versionKey: false,
	},
);
export const POSTS = SWOGGERSLOL_CONNECTION.model("posts", POSTS_SCHEMA);
