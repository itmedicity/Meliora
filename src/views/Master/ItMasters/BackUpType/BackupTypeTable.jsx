import React, { memo, useState, useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const BackupTypeTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])
  const [column] = useState([
    { headerName: 'SlNo', field: 'backup_type_id' },
    { headerName: 'Backup Type', field: 'backup_type_name' },
    { headerName: 'Status', field: 'status' },
    {
      headerName: 'Action',
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
    }
  ])
  useEffect(() => {
    const BackupTypes = async () => {
      const result = await axioslogin.get('/backuptypemast/view')
      const { success, data } = result.data
      if (success === 2) {
        setTabledata(data)
      } else {
        warningNotify('error occured')
      }
    }
    BackupTypes()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} />
}

export default memo(BackupTypeTable)
