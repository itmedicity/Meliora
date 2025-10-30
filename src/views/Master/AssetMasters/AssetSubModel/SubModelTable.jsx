import React, { useEffect } from 'react'
import { memo } from 'react'
import { useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'
const SubModelTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])

  const [column] = useState([
    {
      headerName: 'Action',
      minWidth: 10,
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
    },
    { headerName: 'SlNo', field: 'submodel_slno', minWidth: 50 },
    { headerName: 'Submodel', field: 'submodel_name', minWidth: 70 },
    { headerName: 'Model', field: 'model_name', minWidth: 70 },
    { headerName: 'Status', field: 'status', minWidth: 50 }
  ])
  useEffect(() => {
    const getModel = async () => {
      const result = await axioslogin.get('submodel/view')
      const { success, data } = result.data
      if (success === 2) {
        setTabledata(data)
      } else {
        warningNotify('error occured')
      }
    }
    getModel()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} />
}

export default memo(SubModelTable)
