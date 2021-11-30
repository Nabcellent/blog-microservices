import React, {useState} from "react";
import {Button, Stack, TextField} from "@mui/material";
import axios from "axios";

const CreateComment = ({postId}) => {
    const [data, setData] = useState({
        content: '',
    });

    const onHandleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
        });
    };

    const submit = e => {
        e.preventDefault();

        axios.post(`http://localhost:4001/posts/${postId}/comments`, data).then(() => {
            setData({content: ''})
        })
    };

    return (
        <>
            <form onSubmit={submit}>
                <Stack spacing={2}>
                    <TextField
                        label="New comment"
                        id="outlined-size-small"
                        value={data.content}
                        size="small"
                        name={'content'}
                        variant={'filled'}
                        onChange={onHandleChange}
                    />
                    <Button type={'submit'} size="small" variant={'outlined'}>Comment</Button>
                </Stack>
            </form>
        </>
    )
}

export default CreateComment