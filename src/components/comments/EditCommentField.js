import React, { useState } from 'react'
import { makeStyles, Button, Box, TextField, colors } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        margin: '1rem',
        padding: '1rem',
        borderRadius: '5px',
        backgroundColor: colors.yellow[50]
    }
})

const EditCommentField = ({ onSubmit }) => {
    const [value, setValue] = useState('');
    const classes = useStyles();

    const handleSubmit = () => {
        onSubmit(value);
        setValue('');
    }

    const handleCancel = () => {
        setValue('');
    }

    const handleChange = event => {
        setValue(event.target.value);
    }

    return (
        <div className={classes.root}>
            <TextField
                multiline
                fullWidth
                rows={2}
                rowsMax={4}
                variant="outlined"
                maxLength="1000"
                onChange={handleChange}
                value={value}
            />
            {/* <textarea maxLength="1000" onChange={handleChange} value={value} /> */}
            <Box mt={1}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>送信</Button>
                <Button variant="contained" ml={1} color="secondary" onClick={handleCancel}>クリア</Button>
            </Box>
        </div>
    )
}

export default EditCommentField
