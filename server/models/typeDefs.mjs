export const typeDefs = `#graphql
type entries{
    entry_title:String
    entry_body:String,
    is_underlined:Boolean
}
type version_histories{
    version_number:String
    patch_note:String
}
type Post{
    _id:ID
    post_title:String
    preview_text:String
    download_url_override:String
    is_active_project:Boolean
    entry:[entries]
    version_history:[version_histories]
}
type Query{
    hello: String
    GetAllPosts:[Post]
    GetPostByPostName(PostName:String!):Post
}
`;
