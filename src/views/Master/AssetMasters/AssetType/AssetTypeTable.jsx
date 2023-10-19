import React, { useState, memo } from 'react'
import { useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'
const AssetTypeTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])
  const [column] = useState([
    {
      headerName: 'Action', minWidth: 10,
      cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
    },
    { headerName: 'SlNo', field: 'asset_type_slno', minWidth: 20 },
    { headerName: 'Asset Type', field: 'asset_type_name', minWidth: 50 },
    { headerName: 'Status', field: 'status', minWidth: 50 },

  ])
  useEffect(() => {
    const getAssetType = async () => {
      const result = await axioslogin.get('assettypee/view')
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
export default memo(AssetTypeTable)
