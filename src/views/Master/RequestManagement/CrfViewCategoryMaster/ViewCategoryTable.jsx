import React, { memo, useEffect, useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';
import { getAmItemType } from 'src/redux/actions/AmItemTypeList.actions'
import { useDispatch } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios';

const ViewCategoryTable = ({ count, rowSelect, setCount, }) => {
    const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        { headerName: 'Employee Name', field: 'em_name', filter: "true", width: 100 },
        { headerName: 'Department', field: 'dept_name', filter: "true", width: 100 },
        { headerName: 'Department Section', field: 'sec_name', filter: "true", width: 100 },
        { headerName: 'Category', field: 'category_names', width: 200 },
        { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> },
    ])
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(getAmItemType()); // Ensure this dispatch is correct and handled
                const result = await axioslogin.post('/newCRFRegister/CommonMasterGet');
                const { success, data } = result.data;
                if (success === 1 && data.length > 0) {
                    setCount(0)
                    setTabledata(data)

                } else {
                    setTabledata([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [count]);
    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}
            onClick={rowSelect}
        />)
}

export default memo(ViewCategoryTable)