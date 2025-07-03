import React, { useState, memo, useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'
const SubroomTable = ({ count, rowSelect }) => {
  //state for setting table data
  const [tabledata, setTabledata] = useState([])
  const [column] = useState([
    { headerName: 'SlNo', field: 'subrm_slno' },
    { headerName: 'Subroom Name', field: 'subrm_desc' },
    { headerName: 'Room', field: 'rmc_name' },
    { headerName: 'Room Type', field: 'rmc_desc' },
    { headerName: 'Status', field: 'status' },
    {
      headerName: 'Actions',
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />,
    },
  ])
  // get all data
  useEffect(() => {
    const getRoomcreation = async () => {
      const result = await axioslogin.get('/subroomcreation')
      const { success, data } = result.data
      if (success === 1) {
        setTabledata(data)
      } else {
        warningNotify('No Sub Room Created')
      }
    }
    getRoomcreation()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} />
}
export default memo(SubroomTable)
