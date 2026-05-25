import React, { memo, useEffect, useState } from 'react'
import Autocomplete from '@mui/joy/Autocomplete'
import { axioslogin } from 'src/views/Axios/Axios'

const SelectVendorNames = ({ value, onChange }) => {
    const [options, setOptions] = useState([])
    useEffect(() => {
        const getVendors = async () => {
            try {
                const result = await axioslogin.get('/ItBillSuppDetails/view')
                const { success, data } = result.data
                if (success === 2) setOptions(data)
            } catch (error) {
                console.error('Vendor fetch error:', error)
            }
        }
        getVendors()
    }, [])

    return (
        <Autocomplete
            options={options}
            placeholder="Select Vendor"
            value={
                options.find(
                    (opt) => opt.it_supplier_slno === value
                ) || null
            }
            onChange={(event, newValue) => {
                onChange(newValue || null)   // ✅ send full object
            }}
            isOptionEqualToValue={(option, value) =>
                option.it_supplier_slno === value.it_supplier_slno
            }
            getOptionLabel={(option) => option.it_supplier_name || ''}
        />
        //     <Autocomplete
        //         options={options}
        //         placeholder="Select Vendor"
        //         value={
        //             options.find(
        //                 (opt) => opt.it_supplier_slno === value
        //             ) || null
        //         }
        //          onChange={( newValue) => {
        //     onChange(newValue || null)   // ✅ send full object
        // }}
        //         // onChange={(event, newValue) => {
        //         //     onChange(newValue ? newValue.it_supplier_slno : null)
        //         // }}
        //         isOptionEqualToValue={(option, value) =>
        //             option.it_supplier_slno === value.it_supplier_slno
        //         }
        //         getOptionLabel={(option) => option.it_supplier_name || ''}
        //     />
    )
}

export default memo(SelectVendorNames)
