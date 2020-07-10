import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPostSearchCategories } from '../../../actions/postSearchActions';
import { Box, makeStyles } from '@material-ui/core';
import { CategorySelector } from '../../common/CategorySelector';


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 250,
        // backgroundColor: theme.palette.secondary.light
        // border: '1px solid ' + theme.palette.grey.500,
    },
}));
var timer;

const PostFilter = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const postCategories = useSelector(state => state.common.postCategories);
    // const selectedCategories = useSelector(state => state.postSearch.selectedCategories);
    const [selectedCategories, setCategories] = useState([]);

    const handleSelectedCategoriesChange = (newValues) => {
        setCategories(newValues);
        clearTimeout(timer);
        timer = setTimeout(() => {
            dispatch(setPostSearchCategories(newValues));
        }, 1000);
    }

    return (
        <Box border={1} boxShadow={1} p={2} borderColor="grey.500" className={classes.root}>
            <h5>フィルター</h5>
            <CategorySelector categoryList={postCategories} values={selectedCategories} onChange={handleSelectedCategoriesChange} />
        </Box>
    )
}

export default PostFilter
