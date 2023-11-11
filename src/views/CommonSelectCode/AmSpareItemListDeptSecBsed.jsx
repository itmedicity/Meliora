import React, { useEffect, memo, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'
import { useDispatch } from 'react-redux'

const AmSpareItemListDeptSecBsed = ({ item, setItem }) => {

    const dispatch = useDispatch();
    const AssetItemList = useSelector((state) => state.getSpareItemBasedSection?.SpareItemBasedSectionList)
    const [models, setModels] = useState([{ item_creatspare_creation_slnoion_slno: 0, item_name: 'Select Item name' }])
    const [value, setValue] = useState(models[0]);
    const [inputValue, setInputValue] = useState('');
    console.log(AssetItemList);
    useEffect(() => {
        if (value !== null) {
            setValue(value)
            setItem(value.spare_creation_slno
            )
        } else {
            setItem(0)
        }
        return
    }, [value, setItem, dispatch])

    useEffect(() => {

        AssetItemList.length > 0 && setModels(AssetItemList)
        AssetItemList.length === 0 && setModels(AssetItemList)
        AssetItemList.length === 0 && setValue([{ spare_creation_slno: 0, item_name: 'Select Item name' }])
        AssetItemList.length === 0 && setInputValue('')

    }, [AssetItemList])


    return (
        <Fragment >
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px"
                    }}
                    value={item === 0 ? models : value}
                    placeholder="Select Item name"
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
                    isOptionEqualToValue={(option, value) => option.item_name === value.item_name}
                    getOptionLabel={option => option.item_name || ''}
                    options={models}
                />
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(AmSpareItemListDeptSecBsed)