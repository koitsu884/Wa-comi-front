import React, { useEffect } from 'react'
import { FormContext, useForm } from 'react-hook-form';
import { Box, Button } from '@material-ui/core';
import { TextField } from '../form/TextField';
import TextAreaField from '../form/TextAreaField';
import FormErrors from '../common/FormErrors';
import PostCategoryField from '../form/PostCategoryField';
import AreaField from '../form/AreaField';

const PostEditForm = ({ editMode = false, initialData = null, onSubmit }) => {
    const methods = useForm();
    const { setValue, handleSubmit, register } = methods;
    useEffect(() => {
        if (initialData) {
            setValue('title', initialData.title);
            setValue('content', initialData.content);
            setValue('post_category_id', initialData.post_category_id?.toString());
            setValue('area_id', initialData.area_id?.toString());
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
                    <PostCategoryField
                        name="post_category_id"
                        label="募集タイプ"
                        defaultValue=''
                    />
                    <AreaField
                        name="area_id"
                        defaultValue=""
                        label="エリア"
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
                        {editMode ? "変更を保存する" : "投稿する"}
                    </Button>
                </Box>
            </form>
        </FormContext>
    )
}

export default React.memo(PostEditForm)
