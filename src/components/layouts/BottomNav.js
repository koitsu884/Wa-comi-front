import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, makeStyles, BottomNavigationAction, AppBar } from '@material-ui/core';
import { Group, EventAvailable, EmojiEmotions, Home } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        // '& .MuiBottomNavigationAction-label': {
        //     fontSize: '1rem',
        // }
    },
});

const BottomNav = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    return (
        <AppBar position="fixed" style={{ top: "auto", bottom: 0 }}>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction component={Link} to='/' label="ホーム" icon={<Home />} />
                <BottomNavigationAction component={Link} to='/group' label="グループ" icon={<Group />} />
                <BottomNavigationAction component={Link} to='/event' label="イベント" icon={<EventAvailable />} />
                <BottomNavigationAction component={Link} to='/post' label="友達募集" icon={<EmojiEmotions />} />
            </BottomNavigation>
        </AppBar>
    )
}

export default BottomNav
