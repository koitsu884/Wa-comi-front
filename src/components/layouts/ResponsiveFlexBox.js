import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: props => ({
        display: 'flex',
        [theme.breakpoints.down(props.breakPoint)]: {
            flexDirection: 'column'
        },
    })
}));

const ResponsiveFlexBox = ({children, breakPoint = 'xs'}) => {
    const classes = useStyles({breakPoint});

    return (
        <Box className={classes.root}>
            {children}
        </Box>
    )
}

ResponsiveFlexBox.propTypes = {
    breakPoint: PropTypes.string
}

export default ResponsiveFlexBox
