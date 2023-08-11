import React from 'react'
import { useEffect, memo } from 'react'
import { useState } from 'react'
import EditButton from 'src/views/Components/EditButton'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'

const CampusTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])

  const [column] = useState([
    { headerName: 'SlNo', field: 'rm_campus_slno' },
    { headerName: 'Campus name', field: 'rm_campus_name' },
    { headerName: 'Campus alias', field: 'rm_campus_alias' },
    { headerName: 'Campus number', field: 'rm_campus_no' },
    { headerName: 'Status', field: 'status' },
    {
      headerName: 'Action',
      cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
    },
  ])
  useEffect(() => {
    const getCampus = async () => {
      const result = await axioslogin.get('campus/view')
      const { success, data } = result.data
      if (success === 2) {
        setTabledata(data)
      } else {
        warningNotify('error occured')
      }
    }
    getCampus()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} />
}

export default memo(CampusTable)
