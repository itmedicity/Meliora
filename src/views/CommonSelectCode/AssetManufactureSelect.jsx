import React, { memo, useState, useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux';
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'

const AssetManufactureSelect = ({ manufacture, setManufacture, setName }) => {

    const assetManufacture = useSelector((state) => state.getAmManufacture.ManufactureList)
    const [manufactures, setManufactures] = useState([{ manufacture_slno: 0, manufacture_name: '' }])
    const [value, setValue] = useState(manufactures[0]);
    const [inputValue, setInputValue] = useState('');


    useEffect(() => {
        if (manufacture !== 0) {
            let newObj = assetManufacture?.find((e) => e.manufacture_slno === manufacture)
            setValue(newObj)
        }
    }, [manufacture, assetManufacture])


    useEffect(() => {
        if (value !== null) {
            setManufacture(value.manufacture_slno)
            setName(value.manufacture_name)
        } else {
            setManufacture(0)
            setName('')
        }
        return
    }, [value, setManufacture, setName])


    useEffect(() => {
        assetManufacture.length > 0 && setManufactures(assetManufacture)
    }, [assetManufacture])

    return (
        <Fragment >
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px"
                    }}
                    value={manufacture === 0 ? manufactures : value}
                    placeholder="Select Manufacture"
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
                    isOptionEqualToValue={(option, value) => option.manufacture_name === value.manufacture_name}
                    getOptionLabel={option => option.manufacture_name || ''}
                    options={manufactures}
                />
            </CssVarsProvider>
        </Fragment>
    );
}

export default memo(AssetManufactureSelect)


