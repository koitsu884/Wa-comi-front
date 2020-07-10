import React from 'react'
import { useSelector } from 'react-redux';
import Pagination from '../../common/Pagination';
import { Box, makeStyles } from '@material-ui/core';
import GroupCard from '../../groups/GroupCard';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    searchResults: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    resultItem: {
        padding: '1rem',
        flexBasis: '33%',
        [theme.breakpoints.down('md')]: {
            flexBasis: '50%',
        },
        [theme.breakpoints.down('sm')]: {
            flexBasis: '100%',
        },
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'row',
            flexBasis: '50%',
        },
    }
}));

const GroupSearchResults = ({ pageSize, onPageChange }) => {
    const searchResults = useSelector(state => state.groupSearch.groupList);
    const total = useSelector(state => state.groupSearch.total);
    const classes = useStyles();

    return (
        <div>
            <Box className={classes.searchResults}>
                {
                    searchResults.map(group =>
                        <div key={group.slug} className={classes.resultItem}>
                            <Link to={`/group/${group.slug}`} style={{ textDecoration: 'none' }}>
                                <GroupCard group={group} />
                            </Link>
                        </div>
                    )
                }
            </Box>
            <div>
                {
                    total >= pageSize ? <Pagination pageSize={pageSize} itemCount={total} onPageChange={onPageChange} /> : null
                }
            </div>
        </div>
    )
}

export default GroupSearchResults
