import React, { useEffect, useState, memo } from 'react'
import EditButton from 'src/views/Components/EditButton'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'

const HallMastertabledetl = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])

  const [column] = useState([
    { headerName: 'slno', field: 'hall_slno' },
    { headerName: 'Hall name', field: 'hall_name' },
    { headerName: 'alias', field: 'hall_alias' },
    { headerName: 'Status', field: 'hall_status' },
    {
      headerName: 'Action',
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />,
    },
  ])

  useEffect(() => {
    const gethallTable = async () => {
      const result = await axioslogin.get('/hallmaster/gethall')
      const { success, data } = result.data
      if (success === 1) {
        setTabledata(data)
      } else {
        warningNotify('Error occured contact EDP')
      }
    }
    gethallTable()
  }, [count])

  return <CusAgGridMast tableData={tabledata} columnDefs={column} />
}
export default memo(HallMastertabledetl)
