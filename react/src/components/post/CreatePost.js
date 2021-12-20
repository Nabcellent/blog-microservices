import React, { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";

const CreatePost = () => {
    const [data, setData] = useState({
        title: '',
    });

    const onHandleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
        });
    };

    const submit = e => {
        e.preventDefault();

        axios.post('http://posts.com/posts', data).then(() => {
            setData({title: ''})
        })
    };

    return (
        <>
            <form onSubmit={submit}>
                <Stack spacing={2}>
                    <TextField
                        label="Title"
                        id="outlined-size-small"
                        value={data.title}
                        size="small"
                        name={'title'}
                        onChange={onHandleChange}
                    />
                    <Button type={'submit'} size="small" variant={'contained'}>Create</Button>
                </Stack>
            </form>
        </>
    )
}

export default CreatePost