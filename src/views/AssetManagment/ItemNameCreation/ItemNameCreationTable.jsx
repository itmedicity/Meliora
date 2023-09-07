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
    {
      headerName: 'Action',
      minWidth: 100,

      cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
    },
    { headerName: 'SlNo', field: 'item_creation_slno', minWidth: 100 },
    { headerName: 'Asset Type', field: 'asset_type_name', minWidth: 200 },
    { headerName: 'Item Type', field: 'item_type_name', minWidth: 200 },
    { headerName: 'Category', field: 'category_name', minWidth: 200 },
    { headerName: 'Sub category', field: 'subcategory_name', minWidth: 200 },
    { headerName: 'Group', field: 'group_name', minWidth: 200 },
    { headerName: 'Sub Group', field: 'sub_group_name', minWidth: 200 },
    { headerName: 'U.O.M', field: 'uom_name', minWidth: 200 },
    { headerName: 'Manufacture', field: 'manufacture_name', minWidth: 200 },
    { headerName: 'Model', field: 'model_name', minWidth: 200 },
    { headerName: 'Sub Model', field: 'submodel_name', minWidth: 200 },
    { headerName: 'Model No.', field: 'item_model_num', minWidth: 200 },
    { headerName: 'Base Name.', field: 'item_base_name', minWidth: 200 },
    { headerName: 'Sepcification 1', field: 'item_specific_one', minWidth: 200 },
    { headerName: 'Sepcification 2', field: 'item_specific_two', minWidth: 200 },

    { headerName: 'Item Name', field: 'item_name', minWidth: 200 },

    { headerName: 'Status', field: 'status', minWidth: 100 },
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
