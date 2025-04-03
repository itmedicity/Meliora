import { Autocomplete, CssVarsProvider } from '@mui/joy';
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'

const CompanySelect = ({ selectedCompany, setSelectedCompany, companyData }) => {
    const [type, setType] = useState([{ company_slno: 0, company_name: '' }])
    const [value, setValue] = useState(type[0]);
    const [inputValue, setInputValue] = useState('');
    const [flag, setFlag] = useState(0)

    useEffect(() => {
        if ((selectedCompany !== 0) && (flag === 0)) {
            const array = companyData.find((e) => e.company_slno === selectedCompany)
            setValue(array)
        }
    }, [selectedCompany, flag, companyData])
    const onChange = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setValue(value)
            setSelectedCompany(value.company_slno)
        }
        else {
            setSelectedCompany(0)
        }
        return
    }, [setSelectedCompany])
    useEffect(() => {
        companyData.length > 0 && setType(companyData)
    }, [companyData])
    return (
        <Fragment>
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": '35px',
                    }}
                    value={selectedCompany === 0 ? type : value}
                    placeholder="Select Company"
                    clearOnBlur
                    onChange={(event, newValue) => {
                        onChange(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    loading={true}
                    loadingText="Loading..."
                    freeSolo
                    isOptionEqualToValue={(option, value) => option.company_name === value.company_name}
                    getOptionLabel={option => option.company_name || ''}
                    options={type}
                />
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(CompanySelect)