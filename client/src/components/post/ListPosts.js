import React, {useEffect, useState} from "react";
import {Box, Grid, Paper} from "@mui/material";
import {styled} from '@mui/material/styles';
import axios from "axios";

const Item = styled(Paper)(() => ({
    textAlign: 'center',
    height: 60,
    lineHeight: '60px',
}));

const ListPosts = () => {
    const [posts, setPosts] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:4000/posts`).then(response => {
            setPosts(response.data)
        })
    }, [])

    const renderedPosts = Object.values(posts).map(post => {
        return <Item key={post.id} elevation={6}>
            {post.title}
        </Item>
    })

    return (
        <Grid container className={'justify-content-center'} spacing={2}>
            <Grid item xs={9}>
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