import React, { useEffect, memo, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'

const AmAssetTypeSelect = ({ assettype, setAssetType, setName }) => {
    const assetTypes = useSelector((state) => state.getAmAssetType?.AssetTypeList)
    const [types, setType] = useState([{ asset_type_slno: 0, asset_type_name: '' }])
    const [value, setValue] = useState(types[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (assettype !== 0) {
            let newObj = assetTypes?.find((e) => e.asset_type_slno === assettype)
            setValue(newObj)
        }
    }, [assettype, assetTypes])


    useEffect(() => {
        if (value !== null) {
            setAssetType(value.asset_type_slno)
            setName(value.asset_type_name)
        } else {
            setAssetType(0)
            setName('')
        }
        return
    }, [value, setAssetType, setName])


    useEffect(() => {
        assetTypes.length > 0 && setType(assetTypes)
    }, [assetTypes])


    return (
        <Fragment >
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px"
                    }}
                    value={assettype === 0 ? types : value}
                    placeholder="Select Asset type"
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
                    isOptionEqualToValue={(option, value) => option.asset_type_name === value.asset_type_name}
                    getOptionLabel={option => option.asset_type_name || ''}
                    options={types}
                />
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(AmAssetTypeSelect)