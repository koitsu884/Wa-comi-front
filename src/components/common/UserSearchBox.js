import React, { useState } from 'react';
import client from '../../utils/client';
import { Input, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';

var timer;

const UserSearchBox = ({ onSearch }) => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        let value = e.target.value;
        setSearch(value);
        clearTimeout(timer);
        timer = setTimeout(() => {
            setLoading(true);
            client.get('/users/search/' + value)
                .then(res => {
                    onSearch(res.data.data);
                })
                .catch(error => {
                    onSearch([]);
                })
                .finally(() => {
                    setLoading(false);
                })
        }, 1000);
    }

    return (
        <Input
            id="user-search"
            type="text"
            value={search}
            disabled={loading}
            onChange={handleChange}
            endAdornment={
                <InputAdornment position="end">
                    <Search />
                </InputAdornment>
            }
        />
    )
}

export default UserSearchBox
