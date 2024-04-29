import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'

const ItBillsupplierDetailsList = ({ suppliersList, setSuppliersList }) => {
    const suppliersName = useSelector((state) => state?.getSupplierList?.BillSupplierlist)
    const [supplierListX, setsupplierListX] = useState([{ it_supplier_slno: 0, it_supplier_name: '' }])
    const [value, setValue] = useState(supplierListX[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (suppliersName !== 0) {
            let newObj = suppliersName?.find((e) => e.it_supplier_slno === suppliersList)
            setValue(newObj)
        }
    }, [suppliersList, suppliersName])

    const Onclick = useCallback((value) => {
        if (value !== null) {
            setValue(value)
            setSuppliersList(value.it_supplier_slno)
        }
        else {
            setSuppliersList(0)
        }
        return
    }, [setSuppliersList])

    useEffect(() => {
        suppliersName.length > 0 && setsupplierListX(suppliersName)
    }, [suppliersName])
    return (
        <Fragment>
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px",
                    }}
                    value={suppliersList === 0 ? supplierListX : value}
                    placeholder="select bill type"
                    clearOnBlur
                    style={{ minHeight: 30 }}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        Onclick(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    loading={true}
                    loadingText="Loading..."
                    freeSolo
                    isOptionEqualToValue={(option, value) => option.it_supplier_name === value.it_supplier_name}
                    getOptionLabel={option => option.it_supplier_name || ''}
                    options={supplierListX}
                />
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(ItBillsupplierDetailsList)