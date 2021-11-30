import React from "react";
import {Button, Stack, TextField} from "@mui/material";

export default () => {
    return (
        <div className={'container'}>
            <form action="">
                <Stack spacing={2}>
                    <TextField
                        label="Size"
                        id="outlined-size-small"
                        defaultValue="Small"
                        size="small"
                    />
                    <Button size="small" variant={'contained'}>Create</Button>
                </Stack>
            </form>
        </div>
    )
}