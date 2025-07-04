import React, { useState, memo, useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'
const BuildingTable = ({ count, rowSelect }) => {
  //state for setting table data
  const [tabledata, setTabledata] = useState([])
  //column title setting
  const [column] = useState([
    { headerName: 'SlNo', field: 'build_code' },
    { headerName: 'Building Name', field: 'build_name' },
    { headerName: 'Building Alias', field: 'build_alias' },
    { headerName: 'Building Number', field: 'build_no' },
    { headerName: 'Status', field: 'status' },
    {
      headerName: 'Actions',
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
    }
  ])
  // get all data
  useEffect(() => {
    const getBuliding = async () => {
      const result = await axioslogin.get('/building')
      const { success, data } = result.data
      if (success === 1) {
        setTabledata(data)
      } else {
        warningNotify('Error occured contact EDP')
      }
    }
    getBuliding()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} />
}
export default memo(BuildingTable)
