import { makeStyles } from "@material-ui/core";

export const appBarStyles = makeStyles((theme) => ({
    appBar: {
        '& .logo a': {
            color: 'white',
            fontWeight: 'bold',
        },
    },
}));