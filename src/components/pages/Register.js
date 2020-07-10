import React from 'react'
import { useForm, FormContext } from "react-hook-form";
import { Container, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { register } from '../../actions/authActions';
import { pageStyles } from './style';
import { TextField } from '../form/TextField';

export const Register = () => {
    const classes = pageStyles();
    const methods = useForm();
    const dispatch = useDispatch();

    const onSubmit = data => {
        dispatch(register(data));
    };

    return (
        <Container maxWidth="xs">
            <div className={classes.loginForm}>l
                <Typography component="h1" variant="h5">新規登録</Typography>
                <FormContext {...methods}>
                    <form className={classes.userForm} onSubmit={methods.handleSubmit(onSubmit)}>
                        <TextField
                            fullWidth
                            inputRef={methods.register({ required: true, maxLength: 100 })}
                            required
                            id="name"
                            label="表示名"
                            name="name"
                            type="text"
                            margin="normal"
                        />
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
                        <TextField
                            fullWidth
                            customErrorMessage="パスワードが一致しません"
                            inputRef={methods.register({
                                required: true,
                                validate: (value) => {
                                    return value === methods.watch('password');
                                }
                            })}
                            required
                            id="password_confirmation"
                            label="パスワード確認"
                            name="password_confirmation"
                            type="password"
                            margin="normal"
                            autoComplete="password"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.submit}
                        >
                            新規登録
                        </Button>
                    </form>
                </FormContext>
            </div>
        </Container>
    )
}
