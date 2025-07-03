import React, { useEffect, useState, memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'
const DeptSectionMastTable = ({ count, rowSelect }) => {
  //state for table data set
  const [tabledata, setTabledata] = useState([])
  //column title setting
  const [column] = useState([
    {
      headerName: 'Action',
      minWidth: 50,
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />,
    },
    { headerName: 'SlNo', field: 'sec_id', minWidth: 60 },
    {
      headerName: 'Department Section',
      field: 'sec_name',
      autoHeight: true,
      wrapText: true,
      minWidth: 250,
      filter: 'true',
    },
    {
      headerName: 'Department Name',
      field: 'dept_name',
      autoHeight: true,
      wrapText: true,
      minWidth: 250,
      filter: 'true',
    },
    { headerName: 'Outlet', field: 'ouc_desc', minWidth: 250, filter: 'true' },
    { headerName: 'Status', field: 'status' },
  ])
  //get all data
  useEffect(() => {
    const getDepartsection = async () => {
      const result = await axioslogin.get('/deptsecmaster')
      const { success, data } = result.data
      if (success === 1) {
        setTabledata(data)
      } else {
        warningNotify('Error occured contact EDP')
      }
    }
    getDepartsection()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} onClick={rowSelect} />
}
export default memo(DeptSectionMastTable)
