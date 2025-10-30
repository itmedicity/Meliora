import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import EditButton from 'src/views/Components/EditButton'
import { Box } from '@mui/joy'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'

const DeptAcessTableView = ({ rowSelect, count }) => {
  const [tabledata, setTabledata] = useState([])
  useEffect(() => {
    const getAccessDetails = async () => {
      const result = await axioslogin.get('/qideptAccess/select')
      const { success, data } = result.data
      if (success === 1) {
        setTabledata(data)
      } else {
      }
    }
    getAccessDetails()
  }, [count])

  const [column] = useState([
    { headerName: 'Sl.No', field: 'access_slno', width: 50, wrapText: true },
    { headerName: 'Emp No.', field: 'em_no', width: 80, wrapText: true },
    { headerName: 'Emp Name', field: 'em_name', width: 100, filter: 'true', wrapText: true },
    { headerName: 'Department', field: 'dpt_access_name', width: 250, filter: 'true' },
    { headerName: 'Status', field: 'status', width: 50 },
    {
      headerName: 'Action',
      width: 60,
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
    }
  ])
  return (
    <Box>
      <CusAgGridMast columnDefs={column} tableData={tabledata} onClick={rowSelect} />
    </Box>
  )
}

export default memo(DeptAcessTableView)
