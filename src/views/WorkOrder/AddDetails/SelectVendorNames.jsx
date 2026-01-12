import React, { memo, useEffect, useState } from 'react'
import Autocomplete from '@mui/joy/Autocomplete'
import { axioslogin } from 'src/views/Axios/Axios'

const SelectVendorNames = ({ vendorList, SetVendorList }) => {
    const [options, setOptions] = useState([])

    const handleChange = (event, newValue) => {
        SetVendorList(newValue)
    }

    useEffect(() => {
        const getVendors = async () => {
            try {
                const result = await axioslogin.get('/ItBillSuppDetails/view')
                const { success, data } = result.data
                if (success === 2) {
                    setOptions(data)
                }
            } catch (error) {
                console.error(error)
            }
        }
        getVendors()
    }, [])

    return (
        <Autocomplete
            sx={{
                width: '100%',
                minHeight: 40,
                bgcolor: 'transparent',
                '--Input-radius': '0px',
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
                borderBottom: '2px solid',
                borderColor: 'neutral.outlinedBorder',
                '&:hover': {
                    borderColor: 'neutral.outlinedHoverBorder'
                },
                '&::before': {
                    border: '1px solid var(--Input-focusedHighlight)',
                    transform: 'scaleX(0)',
                    left: 0,
                    right: 0,
                    bottom: '-2px',
                    top: 'unset',
                    transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                    borderRadius: 0
                },
                '&:focus-within::before': {
                    transform: 'scaleX(1)'
                }
            }}
            placeholder="Select Vendor"
            value={vendorList}
            options={options}
            onChange={handleChange}
            isOptionEqualToValue={(option, value) =>
                option?.it_supplier_slno === value?.it_supplier_slno
            }
            getOptionLabel={(option) => option?.it_supplier_name || ''}
        />
    )
}

export default memo(SelectVendorNames)
