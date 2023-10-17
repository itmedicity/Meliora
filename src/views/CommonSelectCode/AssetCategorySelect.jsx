import React, { useEffect, memo, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'
import { getAmSubcategory } from 'src/redux/actions/AmSubcategoryList.action';

const AssetCategorySelect = ({ category, setCategory, setName }) => {
    const dispatch = useDispatch();

    const assetCategory = useSelector((state) => state.getCategory?.AssetCategoryList)
    const [categories, setCategories] = useState([{ category_slno: 0, category_name: '' }])
    const [value, setValue] = useState(categories[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (category !== 0) {
            let newObj = assetCategory?.find((e) => e.category_slno === category)
            dispatch(getAmSubcategory(category))
            setValue(newObj)
        }
    }, [category, assetCategory, dispatch])

    useEffect(() => {
        if (value !== null) {
            dispatch(getAmSubcategory(value.category_slno))
            setCategory(value.category_slno)
            setName(value.category_name)
        } else {
            dispatch(getAmSubcategory(0))
            setCategory(0)
            setName('')
        }
        return
    }, [value, setCategory, dispatch, setName])


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
                        setValue(newValue);
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
export default memo(AssetCategorySelect)
