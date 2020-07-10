import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NativeSelect } from '@material-ui/core';

const PostCategorySelector = (props) => {
    const postCategories = useSelector(state => state.common.postCategories);

    const handleChange = event => {
        props.onChange(event.target.value);
    }

    return (
        <NativeSelect
            value={props.value}
            defaultValue={props.defaultValue}
            onChange={handleChange}
        >
            <option value=''>{props.emptyString ? props.emptyString : ''}</option>
            {postCategories ? postCategories.map(category => {
                return <option key={category.id} value={`${category.id}`}>{category.name}</option>
            }) : null}
        </NativeSelect>
    )
}

PostCategorySelector.propTypes = {
    onChange: PropTypes.func,
    emptyString: PropTypes.string,
    value: PropTypes.string,
    classes: PropTypes.object,
}

export default PostCategorySelector
