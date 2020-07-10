import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Select, MenuItem, FormControl, InputBase, withStyles } from '@material-ui/core';

// const CustomInput = withStyles((theme) => ({
//     root: {
//         'label + &': {
//             marginTop: theme.spacing(3),
//         },
//     },
//     input: {
//         borderRadius: 4,
//         backgroundColor: theme.palette.background.paper,
//         padding: '10px 26px 10px 12px',
//         '&:focus': {
//             borderRadius: 4,
//             borderColor: '#80bdff',
//             boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
//             backgroundColor: theme.palette.background.paper,
//         },
//     },
// }))(InputBase);

const AreaSelector = (props) => {
    const areaList = useSelector(state => state.common.areaList);

    const handleChange = event => {
        props.onChange(event.target.value);
    }

    return (
        <FormControl variant="outlined">
            <Select
                value={props.value}
                onChange={handleChange}
                displayEmpty
            // input={<CustomInput />}
            >
                <MenuItem value=''>{props.emptyString ? props.emptyString : 'hage'}</MenuItem>
                {areaList ? areaList.map(area => {
                    return <MenuItem key={area.id} value={`${area.id}`}>{area.name}</MenuItem>
                }) : null}
            </Select>
        </FormControl>
    )
}

AreaSelector.propTypes = {
    onChange: PropTypes.func,
    emptyString: PropTypes.string,
    value: PropTypes.string,
    classes: PropTypes.object,
}

export default AreaSelector
