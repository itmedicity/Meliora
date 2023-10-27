import React, { useEffect, memo, useState, Fragment } from 'react'
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'
import { axioslogin } from '../Axios/Axios';

const AmModelNumberSelect = ({ modelNumber, setModelNumber }) => {
    const [tabledata, setTabledata] = useState([])
    const [grps, setGrps] = useState([{ item_creation_slno: 0, item_model_num: '' }])
    const [value, setValue] = useState(grps[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const getModelNo = async () => {
            const result = await axioslogin.get('/amSelectComponent/modelNoSelect');
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data);
            }
            else {
                setTabledata([])
            }
        }
        getModelNo()
    }, [])



    useEffect(() => {
        if (value !== null) {
            setValue(value)
            setModelNumber(value.item_model_num)
        } else {
            setModelNumber('')
        }
        return
    }, [value, setModelNumber])


    useEffect(() => {
        tabledata.length > 0 && setGrps(tabledata)
    }, [tabledata])


    return (
        <Fragment >
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px"
                    }}
                    value={modelNumber === 0 ? grps : value}
                    placeholder="Select Model No"
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
                    isOptionEqualToValue={(option, value) => option.item_model_num === value.item_model_num}
                    getOptionLabel={option => option.item_model_num || ''}
                    options={grps}
                />
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(AmModelNumberSelect)