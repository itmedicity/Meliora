import { Autocomplete, CssVarsProvider } from '@mui/joy';
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const QITypeSelect = ({ qiType, setQiType }) => {

    const qiTypeList = useSelector((state) => state.getQIDeptType.qiTypeList)
    const [type, setType] = useState([{ qi_list_type: 0, qi_list_type_name: '' }])
    const [value, setValue] = useState(type[0]);
    const [inputValue, setInputValue] = useState('');
    const [flag, setFlag] = useState(0)

    useEffect(() => {
        if ((qiType !== 0) && (flag === 0)) {
            const array = qiTypeList.find((e) => e.qi_list_type === qiType)
            setValue(array)
        }
    }, [qiType, flag, qiTypeList])
    const Onclick = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setValue(value)
            setQiType(value.qi_list_type)
        }
        else {
            setQiType(0)
        }
        return
    }, [setQiType])
    useEffect(() => {
        qiTypeList.length > 0 && setType(qiTypeList)
    }, [qiTypeList])
    return (
        <Fragment>
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": '35px',
                    }}
                    value={qiType === 0 ? type : value}
                    placeholder="Select QI Type"
                    clearOnBlur
                    onChange={(event, newValue) => {
                        Onclick(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    loading={true}
                    loadingText="Loading..."
                    freeSolo
                    isOptionEqualToValue={(option, value) => option.qi_list_type_name === value.qi_list_type_name}
                    getOptionLabel={option => option.qi_list_type_name || ''}
                    options={type}
                />
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(QITypeSelect)