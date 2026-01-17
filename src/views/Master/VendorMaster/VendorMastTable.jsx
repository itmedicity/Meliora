import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const VendorMastTable = ({ count, rowSelect }) => {
    const [tabledata, setTabledata] = useState([])

    const [column] = useState([
        { headerName: 'SlNo', field: 'vendor_slno', minWidth: 100 },
        { headerName: 'Vendor Name', field: 'vendor_name', filter: 'true', minWidth: 150 },
        { headerName: 'RegNo', field: 'vendor_regno', filter: 'true', minWidth: 200 },
        { headerName: 'GST', field: 'vendor_gst', filter: 'true', minWidth: 200 },
        { headerName: 'Address', field: 'vendor_address', minWidth: 100 },
        { headerName: 'Mob 1', field: 'vendor_mob_first', filter: 'true', minWidth: 150 },
        { headerName: 'Mob 2', field: 'vendor_mob_second', filter: 'true', minWidth: 150 },
        { headerName: 'Email', field: 'vendor_email', filter: 'true', minWidth: 200 },
        { headerName: 'Status', field: 'status', minWidth: 100 },
        {
            headerName: 'Action',
            cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
        }
    ])
    useEffect(() => {
        const getmodule = async () => {
            try {
                const result = await axioslogin.get('/vendor_master/getVendor')
                const { success, data } = result.data

                if (success === 1) {
                    setTabledata(data)
                } else {
                    warningNotify('Error occurred, contact EDP')
                }
            } catch (error) {
                console.error(error)
                warningNotify('API not reachable')
            }
        }
        getmodule()
    }, [count])

    return <CusAgGridMast columnDefs={column} tableData={tabledata} onClick={rowSelect} />
}

export default memo(VendorMastTable)
