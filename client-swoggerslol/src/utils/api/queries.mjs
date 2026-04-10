import { gql, useQuery } from "@apollo/client";
export const hello = gql`
	query hello {
		hello
	}
`;
export const GetAllPosts = gql`
	query GetAllPosts {
		GetAllPosts {
			_id
			post_title
			preview_text
			is_active_project
		}
	}
`;
export const GetPostByPostName = gql`
	query GetPostByPostName($PostName: String!) {
		GetPostByPostName(
			PostName: $PostName
		) {
			_id
			download_url_override
			entry {
				entry_body
				entry_title
				is_underlined
			}
			post_title
			version_history {
				patch_note
				version_number
			}
		}
	}
`;
