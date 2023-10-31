import React, { useState, memo } from 'react'
import { useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'
const ItemTypeTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])
  const [column] = useState([
    {
      headerName: 'Action', minWidth: 20,
      cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
    },
    { headerName: 'SlNo', field: 'item_type_slno', minWidth: 50 },
    { headerName: 'Item Type', field: 'item_type_name', minWidth: 50 },
    { headerName: 'Status', field: 'status', minWidth: 50 },

  ])
  useEffect(() => {
    const getAssetType = async () => {
      const result = await axioslogin.get('itemtype/view')
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
export default memo(ItemTypeTable)
