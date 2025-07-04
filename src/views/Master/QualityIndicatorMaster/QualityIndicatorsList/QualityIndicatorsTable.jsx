import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
const QualityIndicatorsTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])
  useEffect(() => {
    const getqualityindicators = async () => {
      const result = await axioslogin.get('/qualityindicator/select')
      const { success, data } = result.data
      if (success === 2) {
        setTabledata(data)
      } else {
      }
    }
    getqualityindicators()
  }, [count])
  const [column] = useState([
    { headerName: 'SlNo', field: 'qi_slno', width: 30 },
    { headerName: 'Quality Indicator', field: 'qi_name', width: 300, filter: 'true' },
    { headerName: 'Department', field: 'qi_dept_name', width: 100, filter: 'true' },
    { headerName: 'Status', field: 'status', width: 50 },
    {
      headerName: 'Action',
      width: 50,
      cellRenderer: params => (
        <EditOutlinedIcon sx={{ color: 'blue', cursor: 'pointer' }} onClick={() => rowSelect(params)} />
      )
    }
  ])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} onClick={rowSelect} />
}
export default memo(QualityIndicatorsTable)
