import React, { useEffect, useState, memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const DietdetlTable = ({ count, rowSelect }) => {
  //state for table data set
  const [tabledata, setTabledata] = useState([])
  //column title setting
  const [column] = useState([
    { headerName: 'SlNo', field: 'diet_dtslno' },
    { headerName: 'Diet ', field: 'diet_name' },
    { headerName: 'Diet type', field: 'type_desc' },
    { headerName: 'Diet start', field: 'dietstart' },
    { headerName: 'Diet end', field: 'dietend' },
    { headerName: 'Status', field: 'dietdetlstatus' },
    {
      headerName: 'Action',
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
    }
  ])
  //get all data
  useEffect(() => {
    const getdietdetl = async () => {
      const result = await axioslogin.get('/dietdetl/getdietdetl')
      const { success, data } = result.data
      if (success === 1) {
        setTabledata(data)
      } else {
        warningNotify('Error occured contact EDP')
      }
    }
    getdietdetl()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} onClick={rowSelect} />
}

export default memo(DietdetlTable)
