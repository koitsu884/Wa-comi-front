import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NativeSelect } from '@material-ui/core';

const AreaFieldSelector = (props) => {
    const areaList = useSelector(state => state.common.areaList);

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
            {areaList ? areaList.map(area => {
                return <option key={area.id} value={`${area.id}`}>{area.name}</option>
            }) : null}
        </NativeSelect>
    )
}

AreaFieldSelector.propTypes = {
    onChange: PropTypes.func,
    emptyString: PropTypes.string,
    value: PropTypes.string,
    classes: PropTypes.object,
}

export default AreaFieldSelector;
