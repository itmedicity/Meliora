import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton';

const NSWiseMappingTable = ({ count, rowSelect }) => {


    const [tabledata, setTableData] = useState([])

    const [column] = useState([
        { headerName: "slno", field: "map_slno" },
        { headerName: "Department", field: "dept_name" },
        { headerName: "Dept.Section", field: "sec_name" },
        { headerName: "Emp.Name", field: "em_name" },
        { headerName: "nusing station", field: "co_nurse_desc", width: 300 },
        { headerName: "Building", field: "build_name" },
        { headerName: "Floor", field: "floor_desc" },
        { headerName: "Status", field: "map_status" },
        { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> },
    ])


    useEffect(() => {
        const getWeEmpMapping = async () => {
            const result = await axioslogin.get('/weEmpMap/get')
            //    console.log(result);
            const { success, data } = result.data
            //   console.log(success);
            if (success === 1) {

                setTableData(data)

            } else {
                warningNotify("Error occured contact EDP")
            }
        }
        getWeEmpMapping();
    }, [count])


    return (

        <CusAgGridMast
            tableData={tabledata}
            columnDefs={column} />
    )
}

export default NSWiseMappingTable