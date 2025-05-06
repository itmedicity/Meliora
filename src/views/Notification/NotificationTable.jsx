import React, { useState, memo } from 'react'
import { useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const NotificationTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])
  const [column] = useState([
    {
      headerName: 'Action', width: 10,
      cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
    },
    { headerName: 'SlNo', field: 'notification_slno', width:10 },
    { headerName: 'Heading', field: 'notification_heading', width: 80 },
    { headerName: 'Remarks', field: 'notification_remarks', flex:1},
    { headerName: 'Status', field: 'status', width: 30 },

  ])
  useEffect(() => {
    const getAssetType = async () => {
      const result = await axioslogin.get('notificationMenu/view')
      const { success, data } = result.data
      if (success === 2) {
        setTabledata(data)
      } else {
        warningNotify('error occured')
      }
    }
    getAssetType()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} />
}
export default NotificationTable