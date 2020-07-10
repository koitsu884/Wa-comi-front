import { makeStyles } from "@material-ui/core";
import topImage from '../../assets/img/topImage.jpg';

export const pageStyles = makeStyles((theme) => ({
    home: {
        '& .top-image': {
            width: '100%',
            height: '40rem',
            [theme.breakpoints.down('xs')]: {
                height: '30rem',
            },
            backgroundImage: `url(${topImage})`,
            backgroundSize: 'cover',
        },
        '& .top-title': {
            color: 'white',
            textAlign: 'center',
            fontSize: '3rem',
        },
        '& .top-description': {
            color: 'white',
            fontSize: '2rem',
        },
        '& .top-nav': {
            width: '13rem',
            height: '13rem',
            margin: 'auto',
        }
    },
    test: {
        width: '20rem',
        height: '20rem',
    },
    loginForm: {
        marginTop: theme.spacing(8),
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    userForm: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));