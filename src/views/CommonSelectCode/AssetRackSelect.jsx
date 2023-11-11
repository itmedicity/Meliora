import React, { useEffect, memo, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'

const AssetRackSelect = ({ rackno, setrackNo, setrackName }) => {
    const dispatch = useDispatch();
    const rackList = useSelector((state) => state.getRackList?.AssetRackList)
    const [racks, setRacks] = useState([{ am_rack_slno: 0, am_rack_name: '' }])
    const [value, setValue] = useState(racks[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (value !== null) {
            setrackNo(value.am_rack_slno)
            setrackName(value.am_rack_name)
        } else {
            setrackNo(0)
            setrackName('')
        }
        return
    }, [value, setrackNo, setrackName, dispatch])

    useEffect(() => {
        rackList.length > 0 && setRacks(rackList)
    }, [rackList])

    return (
        <Fragment >
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px"
                    }}
                    value={rackno === 0 ? racks : value}
                    placeholder="Select Group"
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
                    isOptionEqualToValue={(option, value) => option.am_rack_name === value.am_rack_name}
                    getOptionLabel={option => option.am_rack_name || ''}
                    options={racks}
                />
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(AssetRackSelect)