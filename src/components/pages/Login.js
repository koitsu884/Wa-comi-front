import React from 'react'
import { useForm, FormContext } from "react-hook-form";
import { Container, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { signin } from '../../actions/authActions';
import { pageStyles } from './style';
import { TextField } from '../form/TextField';


export const Login = () => {
    const classes = pageStyles();
    const methods = useForm();
    const dispatch = useDispatch();
    const onSubmit = data => {
        dispatch(signin(data));
    };

    return (
        <Container maxWidth="xs">
            <div className={classes.loginForm}>
                <Typography component="h1" variant="h5">ログイン</Typography>
                <FormContext {...methods}>
                    <form className={classes.userForm} onSubmit={methods.handleSubmit(onSubmit)}>
                        <TextField
                            fullWidth
                            inputRef={methods.register({ required: true, maxLength: 200 })}
                            required
                            id="email"
                            label="メールアドレス"
                            name="email"
                            type="email"
                            margin="normal"
                            autoComplete="email"
                        />
                        <TextField
                            fullWidth
                            inputRef={methods.register({ required: true, maxLength: 100 })}
                            required
                            id="password"
                            label="パスワード"
                            name="password"
                            type="password"
                            margin="normal"
                            autoComplete="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            ログイン
                    </Button>
                    </form>
                </FormContext>
            </div>
        </Container>
    )
}
