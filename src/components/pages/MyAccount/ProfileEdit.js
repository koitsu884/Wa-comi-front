import React, { useEffect } from 'react'
import { FormContext, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button } from '@material-ui/core';

import { getCurrentUser } from '../../../actions/authActions';
import { addAvatar, deleteAvatar } from '../../../actions/userActions';
import { setLoading } from '../../../actions/commonActions';
import client from '../../../utils/client';
import Alert from '../../../utils/alert';
import { TextField } from '../../form/TextField';
import TextAreaField from '../../form/TextAreaField';
import FormErrors from '../../common/FormErrors';
import SingleImageUploader from '../../common/SingleImageUploader';

const AVATAR_IMAGE_SIZE_LIMIT = 400;

const ProfileEdit = () => {
    const methods = useForm();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.user);
    const avatar = useSelector(state => state.user.avatar);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            methods.setValue('name', currentUser.name);
            methods.setValue('introduction', currentUser.introduction);
            methods.setValue('twitter', currentUser.twitter);
            methods.setValue('facebook', currentUser.facebook);
            methods.setValue('instagram', currentUser.instagram);
        }
    }, [currentUser, methods])

    const handleChangeAvatar = fd => {
        console.log(fd);
        dispatch(addAvatar(currentUser.id, fd));
    }

    const handleDeleteAvatar = () => {
        Alert.confirm("現在設定されている画像を削除しますか？")
            .then((result) => {
                if (result.value) {
                    dispatch(deleteAvatar(currentUser.id));
                }
            })
    }

    const onSubmit = async submitedData => {
        dispatch(setLoading(true));

        let fd = new FormData();
        fd.append('_method', 'PATCH');

        for (var dataKey in submitedData) {
            let data = submitedData[dataKey];
            switch (dataKey) {
                default:
                    fd.append(dataKey, data ? data : ''); //TODO: in some reason, 'NULL' is set for empty field...?
            }
        }

        let url = `users/${currentUser.id}`;
        // let result;

        try {
            await client.post(url, fd, {
                headers: { 'content-type': 'multipart/form-data' }
            });
            dispatch(getCurrentUser());
            Alert.success("更新しました");

            dispatch(setLoading(false));
        }
        catch (error) {
            let formErrors = error.response.data.errors;
            if (formErrors) {
                // console.log(formErrors);
                // dispatch({
                //     type: SET_ERRORS,
                //     payload: formErrors
                // })
            }
            dispatch(setLoading(false));
            return;
        }

        // history.push('/mypage');
    }

    return (
        <Box>
            <h2>プロフィール編集</h2>
            <FormContext {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Box p={2}>
                        <h3>メイン画像</h3>
                        <SingleImageUploader
                            onFileChange={handleChangeAvatar}
                            onDelete={handleDeleteAvatar}
                            maxSize={AVATAR_IMAGE_SIZE_LIMIT}
                            initialImage={avatar}
                        />
                    </Box>
                    <Box >
                        <h3>ユーザープロフィール</h3>
                        <TextField
                            fullWidth
                            variant="outlined"
                            inputRef={methods.register({ required: true, maxLength: 100 })}
                            required
                            id="name"
                            label="表示名"
                            name="name" ƒ
                            type="text"
                            margin="normal"
                        />
                        <TextAreaField
                            fullWidth
                            variant="outlined"
                            inputRef={methods.register({ maxLength: 5000 })}
                            id="introduction"
                            label="自己紹介文"
                            name="introduction"
                            margin="normal"
                            rows={10}
                        />

                        <TextField
                            fullWidth
                            variant="outlined"
                            inputRef={methods.register({ maxLength: 100 })}
                            id="twitter"
                            label="Twitter アドレス"
                            name="twitter"
                            type="url"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            inputRef={methods.register({ maxLength: 100 })}
                            id="facebook"
                            label="Facebook アドレス"
                            name="facebook"
                            type="url"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            inputRef={methods.register({ maxLength: 100 })}
                            id="instagram"
                            name="instagram"
                            type="url"
                            margin="normal"
                        />
                    </Box>

                    <FormErrors />
                    <Button
                        type="submit"
                        margin="auto"
                        variant="contained"
                        color="primary"
                    >
                        変更を保存する
                        </Button>
                </form>
            </FormContext>
        </Box>
    )
}

export default ProfileEdit
