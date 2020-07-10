import React, { useEffect, useState } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { Box, Button, FormHelperText, FormControl } from '@material-ui/core';
import { TextField } from '../form/TextField';
import TextAreaField from '../form/TextAreaField';
import FormErrors from '../common/FormErrors';
import AreaField from '../form/AreaField';
import GroupCategoryField from '../form/GroupCategoryField';
import slugUniqueCheck from '../../utils/slugUniqueCheck';

const GroupEditForm = ({ editMode = false, initialData = null, onSubmit }) => {
    const methods = useForm();
    const { setValue, handleSubmit, register } = methods;
    const [slugError, setSlugError] = useState(null);

    useEffect(() => {
        if (initialData) {
            setValue('slug', initialData.slug);
            setValue('name', initialData.name);
            setValue('description', initialData.description);
            setValue('group_category_id', initialData.group_category_id?.toString());
            setValue('area_id', initialData.area_id?.toString());
            setValue('homepage', initialData.homepage);
            setValue('facebook', initialData.facebook);
            setValue('twitter', initialData.twitter);
            setValue('instagram', initialData.instagram);
        }
    }, [setValue, initialData])

    const onBlurSlug = async (e) => {
        console.log("abeshi");
        let value = e.target.value;
        let currentSlug = initialData?.slug;

        if (value === currentSlug || await slugUniqueCheck(value)) {
            setSlugError(null);
        } else {
            setSlugError("そのIDは既に使用されています");
        };
    }

    const SlugError = () => {
        return slugError ? <FormControl error={true}>
            <FormHelperText>{slugError}</FormHelperText>
        </FormControl>
            : null
    }

    return (
        <FormContext {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box p={2} flexGrow={1} minWidth={600}>
                    <TextField
                        fullWidth
                        inputRef={register({ required: true, minLength: 2, maxLength: 100 })}
                        required
                        id="name"
                        label="グループ名"
                        name="name"
                        type="text"
                        margin="normal"
                        defaultValue={editMode ? 'loading...' : null}
                    />
                    <TextField
                        fullWidth
                        inputRef={register({
                            required: true,
                            maxLength: 100,
                            minLength: 2,
                            pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                        })}
                        required
                        onBlur={onBlurSlug}
                        id="slug"
                        label="グループID"
                        placeholder="my-group"
                        info="使用可能文字：半角英小文字、数字、ハイフン (※ただしハイフンは先頭、末尾には使えません。）"
                        name="slug"
                        type="text"
                        margin="normal"
                        defaultValue={editMode ? 'loading...' : null}
                    />
                    <SlugError />
                    <TextAreaField
                        fullWidth
                        inputRef={register({ required: true, minLength: 10, maxLength: 5000 })}
                        required
                        id="description"
                        label="グループ詳細"
                        name="description"
                        margin="normal"
                        defaultValue={editMode ? 'loading...' : null}
                        rows={10}
                    />
                    <GroupCategoryField
                        name="group_category_id"
                        label="タイプ"
                        defaultValue=''
                    />
                    <AreaField
                        name="area_id"
                        defaultValue=""
                        label="エリア"
                    />
                    <TextField
                        inputRef={register({ maxLength: 200 })}
                        id="homepage"
                        label="ホームページ"
                        name="homepage"
                        type="url"
                        margin="normal"
                        defaultValue={editMode ? 'loading...' : null}
                    />
                    <TextField
                        inputRef={register({ maxLength: 200 })}
                        id="facebook"
                        label="Facebook"
                        name="facebook"
                        type="url"
                        margin="normal"
                        defaultValue={editMode ? 'loading...' : null}
                    />
                    <TextField
                        inputRef={register({ maxLength: 200 })}
                        id="twitter"
                        label="Twitter"
                        name="twitter"
                        type="url"
                        margin="normal"
                        defaultValue={editMode ? 'loading...' : null}
                    />
                    <TextField
                        inputRef={register({ maxLength: 200 })}
                        id="instagram"
                        label="Instagram"
                        name="instagram"
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
                        {editMode ? "変更を保存する" : "投稿する"}
                    </Button>
                </Box>
            </form>
        </FormContext>
    )
}

export default GroupEditForm;
