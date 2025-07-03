import React, { useState, memo, useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'
const DietMenuSettingTable = ({ count, rowSelect }) => {
  //state for setting table data
  const [tabledata, setTabledata] = useState([])
  const [column] = useState([
    { headerName: 'SlNo', field: 'dmenu_slno' },
    { headerName: 'Diet', field: 'diet_name' },
    { headerName: 'Diet Type', field: 'type_desc' },
    { headerName: 'Group Name', field: 'group_name' },
    { headerName: 'Item Name', field: 'item_name' },
    { headerName: 'Days', field: 'days1' },
    { headerName: 'Quantity', field: 'qty' },
    { headerName: 'Unit', field: 'unit' },
    { headerName: 'Hospital Rate', field: 'rate_hos' },
    { headerName: 'Canteen Rate', field: 'rate_cant' },
    { headerName: 'Order req', field: 'order_req1' },
    { headerName: 'Status', field: 'status1' },
    {
      headerName: 'Action',
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />,
    },
  ])
  useEffect(() => {
    const getDietType = async () => {
      const result = await axioslogin.get(`/dietmenudtl`)
      const { success, data } = result.data
      if (success === 1) {
        setTabledata(data)
      } else {
        warningNotify('Error occured in EDp')
      }
    }
    getDietType()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} />
}
export default memo(DietMenuSettingTable)
