import { React, memo, useState, useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const ModelTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])
  const [column] = useState([
    {
      headerName: 'Action', minWidth: 10,
      cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
    },
    { headerName: 'SlNo', field: 'model_slno', minWidth: 70 },
    { headerName: 'Model', field: 'model_name', minWidth: 70 },
    { headerName: 'Status', field: 'status', minWidth: 70 },

  ])
  useEffect(() => {
    const setModel = async () => {
      const result = await axioslogin.get('model/view')
      const { success, data } = result.data
      if (success === 2) {
        setTabledata(data)
      } else {
        warningNotify('error occured')
      }
    }
    setModel()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} />
}

export default memo(ModelTable)
