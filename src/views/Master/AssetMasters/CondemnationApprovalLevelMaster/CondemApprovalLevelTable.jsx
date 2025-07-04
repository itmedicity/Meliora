import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const CondemApprovalLevelTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])
  const [column] = useState([
    { headerName: 'Level ', field: 'level_slno', width: 30 },
    { headerName: 'Level Name', field: 'level_name', filter: 'true' },
    { headerName: 'Status', field: 'status', width: 30 },
    {
      headerName: 'Action',
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />,
      width: 30
    }
  ])

  useEffect(() => {
    const getlevelsinCondemnation = async () => {
      const result = await axioslogin.get('condemApprovalLevel/viewCondemnationLevel')
      const { success, data } = result.data
      if (success === 2) {
        setTabledata(data)
      } else {
        warningNotify('error occured')
      }
    }
    getlevelsinCondemnation()
  }, [count])

  return <CusAgGridMast columnDefs={column} tableData={tabledata} onClick={rowSelect} />
}

export default memo(CondemApprovalLevelTable)
