import React, {useEffect, useState} from "react";
import {Box, Grid, Paper} from "@mui/material";
import {styled} from '@mui/material/styles';
import axios from "axios";
import CreateComment from "../comment/CreateComment";
import ListComments from "../comment/ListComments";

const Item = styled(Paper)(() => ({
    padding: '1rem',
}));

const ListPosts = () => {
    const [posts, setPosts] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:4002/posts`).then(response => {
            setPosts(response.data)
        })
    }, [])

    const renderedPosts = Object.values(posts).map(post => {
        return (
            <Item key={post.id} elevation={6}>
                <h5 className={'text-uppercase mb-3'}>{post.title}</h5>
                <ListComments comments={post.comments}/>
                <CreateComment postId={post.id}/>
            </Item>
        )
    })

    return (
        <Grid container className={'justify-content-center'} spacing={2}>
            <Grid item xs={10}>
                <Box
                    sx={{
                        p: 2,
                        bgcolor: 'background.default',
                        display: 'grid',
                        gridTemplateColumns: {md: '1fr 1fr 1fr'},
                        gap: 2,
                    }}
                >
                    {renderedPosts}
                </Box>
            </Grid>
        </Grid>
    )
}

export default ListPosts