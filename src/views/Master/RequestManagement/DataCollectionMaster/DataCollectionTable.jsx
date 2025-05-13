import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';

const DataCollectionTable = ({ rowSelect, count, setDept, setDeptsec, setEmpname, setCount, SetViewStatus }) => {
    const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        { headerName: 'Employee Name', field: 'em_name', filter: "true", width: 100 },
        { headerName: 'Department', field: 'dept_name', filter: "true", width: 100 },
        { headerName: 'Department Section', field: 'sec_name', filter: "true", width: 100 },
        { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> },
    ])

    useEffect(() => {
        const getmodule = async () => {
            const result = await axioslogin.get('/newCRFRegister/Getdatacollection')
            const { success, data } = result.data;
            if (success === 1) {
                setTabledata(data);
                setCount(0)
                // setSubStoreList([])
                setDept(0)
                setDeptsec(0)
                setEmpname(0)
                // setCrsList([])
                SetViewStatus(false)
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
        />)
}

export default memo(DataCollectionTable)