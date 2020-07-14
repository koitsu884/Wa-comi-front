import React, { useEffect } from 'react'
import { useForm, FormContext } from 'react-hook-form';
import { Box, TextField, Button } from '@material-ui/core';
import TextAreaField from '../form/TextAreaField';
import FormErrors from '../common/FormErrors';

const GroupPostEditForm = ({ editMode = false, initialData = null, onSubmit }) => {
    const methods = useForm();
    const { setValue, handleSubmit, register } = methods;

    useEffect(() => {
        if (initialData) {
            setValue('title', initialData.title);
            setValue('content', initialData.content);
            setValue('youtube', initialData.youtube);
        }
    }, [setValue, initialData])

    return (
        <FormContext {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box p={2} flexGrow={1} minWidth={600}>
                    <TextField
                        fullWidth
                        inputRef={register({ required: true, maxLength: 200 })}
                        required
                        id="title"
                        label="タイトル"
                        name="title"
                        type="text"
                        margin="normal"
                        defaultValue={editMode ? 'loading...' : null}
                    />
                    <TextAreaField
                        fullWidth
                        inputRef={register({ required: true, maxLength: 5000 })}
                        required
                        id="content"
                        label="投稿内容"
                        name="content"
                        margin="normal"
                        defaultValue={editMode ? 'loading...' : null}
                        rows={10}
                    />
                    <TextField
                        fullWidth
                        inputRef={register({ maxLength: 200 })}
                        id="youtube"
                        label="Youtube リンク"
                        info="※動画単体のリンクのみ設定可能です。（チャンネルは不可）"
                        name="youtube"
                        type="url"
                        margin="normal"
                        defaultValue={editMode ? 'loading...' : null}
                    />
                </Box>
                <FormErrors />
                <Box textAlign={'center'} margin={5}>
                    <Button
                        type="submit"
                        margin="auto"
                        size="large"
                        variant="contained"
                        color="primary"
                    >
                        {initialData ? "変更を保存する" : "投稿する"}
                    </Button>
                </Box>
            </form>
        </FormContext>
    )
}

export default GroupPostEditForm
