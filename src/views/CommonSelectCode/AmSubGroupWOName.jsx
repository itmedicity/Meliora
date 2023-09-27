import React, { memo, useState, useEffect, useCallback, Fragment } from 'react'
import { useSelector } from 'react-redux';
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'

const AmSubGroupWOName = ({ subgroup, setSubGroup }) => {

    const assetSUbgrp = useSelector((state) => state.getAmSubGroupList?.SubGroupList)
    const [subGrps, setsubGrps] = useState([{ subgroup_slno: 0, sub_group_name: '' }])
    const [value, setValue] = useState(subGrps[0]);
    const [inputValue, setInputValue] = useState('');


    const ClickFunction = useCallback((e, newValue) => {
        e.preventDefault()
        if (newValue !== null) {
            setValue(newValue)
            setSubGroup(newValue.subgroup_slno)
        }
        else {
            setSubGroup(0)
        }
    }, [setSubGroup])


    useEffect(() => {
        assetSUbgrp.length > 0 && setsubGrps(assetSUbgrp)
    }, [assetSUbgrp])


    return (

        <Fragment >
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px"
                    }}
                    value={subgroup === 0 ? subGrps : value}
                    placeholder="Select Subgroup"
                    clearOnBlur
                    onChange={(event, newValue) => {
                        ClickFunction(event, newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    loading={true}
                    loadingText="Loading..."
                    freeSolo
                    // renderInput={(params) => (<Input size="sm" placeholder="Small"  {...params} />)}
                    isOptionEqualToValue={(option, value) => option.sub_group_name === value.sub_group_name}
                    getOptionLabel={option => option.sub_group_name || ''}
                    options={subGrps}
                />
            </CssVarsProvider>
        </Fragment>
    )

}

export default memo(AmSubGroupWOName)