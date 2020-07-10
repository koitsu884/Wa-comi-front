import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NativeSelect } from '@material-ui/core';

const GroupCategorySelector = (props) => {
    const groupCategories = useSelector(state => state.common.groupCategories);

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
            {groupCategories ? groupCategories.map(category => {
                return <option key={category.id} value={`${category.id}`}>{category.name}</option>
            }) : null}
        </NativeSelect>
    )
}

GroupCategorySelector.propTypes = {
    onChange: PropTypes.func,
    emptyString: PropTypes.string,
    value: PropTypes.string,
    classes: PropTypes.object,
}

export default GroupCategorySelector
