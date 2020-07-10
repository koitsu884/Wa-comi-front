import React from 'react';
import { FormControlLabel, FormControl, FormGroup, Checkbox } from '@material-ui/core';

export const CategorySelector = ({ categoryList, onChange, values = [] }) => {
    const handleChange = id => {
        let newCategoryList;
        if (values.includes(id)) {
            newCategoryList = values.filter(selectedId => selectedId !== id);
        } else {
            newCategoryList = [...values, id];
        }
        onChange(newCategoryList);
    }

    return (
        <FormControl component="fieldset">
            <FormGroup>
                {
                    categoryList.map((category) => {
                        let checked = values.includes(category.id);
                        return (
                            <FormControlLabel
                                key={category.id}
                                control={
                                    <Checkbox
                                        checked={checked}
                                        name={'category_' + category.id}
                                        onChange={() => handleChange(category.id)}
                                    />
                                }
                                label={category.name}
                            />
                        )
                    })
                }
            </FormGroup>
        </FormControl>
    );
}