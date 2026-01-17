import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const StoreReportsRightsTable = ({ count, rowSelect, setCount, setDept, setDeptsec, setEmpname, setStatus }) => {
    const [tabledata, setTabledata] = useState([])
    const [column] = useState([

        { headerName: 'S No', field: 'slno', filter: 'true', width: 100 },
        { headerName: 'Employee Name', field: 'em_name', filter: 'true', width: 180 },
        { headerName: 'Department', field: 'dept_name', filter: 'true', width: 250 },
        { headerName: 'Department Section', field: 'sec_name', filter: 'true', width: 200 },
        {
            headerName: 'Store Report Rights',
            field: 'store_report_view',
            valueGetter: params => {
                const viewMap = {
                    1: 'Purchase Report',
                    2: 'GRN Report',
                    3: 'Rate Variation Report',
                    4: 'Rate Variation Updation'
                }
                let parsed = []
                try {
                    parsed = JSON.parse(params.data?.store_report_view || '[]')
                } catch (e) {
                    console.error('Invalid JSON in store_report_view:', params.data?.store_report_view)
                }

                return parsed.map(v => viewMap[v] || `Unknown (${v})`).join(' ,  ')
            },
            width: 200
        },
        { headerName: 'Status', field: 'rights_status', filter: 'true', width: 100 },

        {
            headerName: 'Action',
            cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
        }
    ])

    /*** get data from module_master table for display */
    useEffect(() => {
        const getmodule = async () => {
            const result = await axioslogin.get('/store_master/getStoreReportViewRights')
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
                setCount(0)
                // setSubStoreList([])
                setDept(0)
                setDeptsec(0)
                setEmpname(0)
                setStatus(false)
                // setCrsList([])
            } else {
                warningNotify('No Data found')
            }
        }
        getmodule()
    }, [count])
    return <CusAgGridMast columnDefs={column} tableData={tabledata} onClick={rowSelect} />
}

export default memo(StoreReportsRightsTable) 