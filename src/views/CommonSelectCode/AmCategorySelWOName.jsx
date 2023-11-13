import React, { useEffect, memo, useState, Fragment, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'
import { getAmSubcategory } from 'src/redux/actions/AmSubcategoryList.action';


const AmCategorySelWOName = ({ category, setCategory }) => {
    const dispatch = useDispatch();
    const assetCategory = useSelector((state) => state.getCategory?.AssetCategoryList)
    const [categories, setCategories] = useState([{ category_slno: 0, category_name: '' }])
    const [value, setValue] = useState(categories[0]);
    const [inputValue, setInputValue] = useState('');

    const ClickFunction = useCallback((value) => {
        if (value !== null) {
            setValue(value);
            dispatch(getAmSubcategory(value.category_slno))
            setCategory(value.category_slno)
        } else {
            setCategory(0)
        }
    }, [setCategory, dispatch])

    useEffect(() => {
        assetCategory.length > 0 && setCategories(assetCategory)
    }, [assetCategory])

    return (
        <Fragment >
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px"
                    }}
                    value={category === 0 ? categories : value}
                    placeholder="Select Category"
                    clearOnBlur
                    onChange={(event, newValue) => {
                        ClickFunction(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    loading={true}
                    loadingText="Loading..."
                    freeSolo
                    // renderInput={(params) => (<Input size="sm" placeholder="Small"  {...params} />)}
                    isOptionEqualToValue={(option, value) => option.category_name === value.category_name}
                    getOptionLabel={option => option.category_name || ''}
                    options={categories}
                />
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(AmCategorySelWOName)