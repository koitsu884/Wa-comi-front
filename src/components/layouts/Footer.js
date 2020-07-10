import React from 'react'
import { Box, makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        minHeight: '10rem'
    }
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <Box component="footer" pt={5} textAlign="center" className={classes.root}>
            <Container  >
                <small>© 2020 Wa-comi</small>
            </Container>
        </Box>
    )
}

export default Footer
