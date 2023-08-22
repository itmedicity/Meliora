import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const ItemNameCreationTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])

  const [column] = useState([
    { headerName: 'SlNo', field: 'item_creation_slno' },
    { headerName: 'Asset Type', field: 'asset_type_name' },
    { headerName: 'Item Type', field: 'item_type_name' },
    { headerName: 'Category', field: 'category_name' },
    { headerName: 'Sub category', field: 'subcategory_name' },
    { headerName: 'Group', field: 'group_name' },
    { headerName: 'Sub Group', field: 'sub_group_name' },
    { headerName: 'Manufacture', field: 'manufacture_name' },
    { headerName: 'Item Name', field: 'item_name' },
    { headerName: 'Status', field: 'status' },
    {
      headerName: 'Action',
      cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
    },
  ])
  useEffect(() => {
    const getItemCreation = async () => {
      const result = await axioslogin.get('itemNameCreation/view')
      const { success, data } = result.data
      if (success === 2) {
        setTabledata(data)
      } else {
        warningNotify('error occured')
      }
    }
    getItemCreation()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} />
}

export default memo(ItemNameCreationTable)
