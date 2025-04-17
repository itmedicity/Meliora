import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';

const DashBoardTable = ({ count, rowSelect, setCount, setDept, setDeptsec, setEmpname, }) => {
    const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        { headerName: 'Employee Name', field: 'em_name', filter: "true", width: 100 },
        { headerName: 'Department', field: 'dept_name', filter: "true", width: 100 },
        { headerName: 'Department Section', field: 'sec_name', filter: "true", width: 100 },
        {
            headerName: 'DashBoard',
            field: 'dash_view',
            valueGetter: params => {
                const viewMap = {
                    1: 'CRF Status',
                    2: 'CRF Purchase Status',
                    3: 'CRF Store Status'

                };

                let parsed = [];
                try {
                    parsed = JSON.parse(params.data?.dash_view || '[]');
                } catch (e) {
                    console.error('Invalid JSON in dash_view:', params.data?.dash_view);
                }

                return parsed.map(v => viewMap[v] || `Unknown (${v})`).join(' ,  ');
            },
            width: 200
        },
        { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> },
    ])

    /*** get data from module_master table for display */
    useEffect(() => {
        const getmodule = async () => {
            const result = await axioslogin.get('/newCRFRegister/GetDashBoardMaster')
            const { success, data } = result.data;
            if (success === 1) {
                setTabledata(data);
                setCount(0)
                // setSubStoreList([])
                setDept(0)
                setDeptsec(0)
                setEmpname(0)
                // setCrsList([])
            } else {
                warningNotify("No Data found")
            }
        }
        getmodule();
    }, [count])
    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}
            onClick={rowSelect}
        />
    )
}

export default memo(DashBoardTable)