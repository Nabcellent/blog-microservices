import React from "react";
import CreatePost from "./components/post/CreatePost";
import ListPosts from "./components/post/ListPosts";

const App = () => {
    return (
        <div className={'container'}>
            <h1>Create Post</h1>
            <CreatePost/>
            <hr/>
            <h2>Posts</h2>
            <ListPosts/>
        </div>
    )
}

export default App