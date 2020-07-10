import React from 'react'
import { Modal, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    modal: {
        width: '100wh',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        position: 'absolute',
        minWidth: 500,
        textAlign: 'center',
        fontSize: '1.6rem',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const ModalMessage = ({ open = false, message = '' }) => {
    const classes = useStyles();

    return (
        <Modal
            open={open}
        >
            <div className={classes.modal}>
                <div className={classes.paper}>
                    {message}
                </div>
            </div>
        </Modal>
    )
}

export default ModalMessage
