import React from 'react'
import { useState, memo, useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const ItemNameCreationTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])
  const [displayArry, setDisArry] = useState([])

  useEffect(() => {
    if (tabledata.length !== 0) {
      const arry = tabledata.map((val) => {
        const obj = {
          item_creation_slno: val.item_creation_slno,
          asset_type_name: val.asset_type_name !== null ? val.asset_type_name : "Not Given",
          item_type_name: val.item_type_name !== null ? val.item_type_name : "Not Given",
          category_name: val.category_name !== null ? val.category_name : "Not Given",
          subcategory_name: val.subcategory_name !== null ? val.subcategory_name : "Not Given",
          group_name: val.group_name !== null ? val.group_name : "Not Given",
          sub_group_name: val.sub_group_name !== null ? val.sub_group_name : "Not Given",
          model_name: val.model_name !== null ? val.model_name : "Not Given",
          submodel_name: val.submodel_name !== null ? val.submodel_name : "Not Given",
          uom_name: val.uom_name !== null ? val.uom_name : "Not Given",
          manufacture_name: val.manufacture_name !== null ? val.manufacture_name : "Not Given",
          model_num: val.item_model_num !== null ? val.item_model_num : "Not Given",
          base_name: val.item_base_name !== "" ? val.item_base_name : "Not Given",
          specific_one: val.item_specific_one !== "" ? val.item_specific_one : "Not Given",
          specific_two: val.item_specific_two !== "" ? val.item_specific_two : "Not Given",
          status: val.status,
          item_name: val.item_name,
          assetspare: val.asset_spare === 1 ? "Asset" : val.asset_spare === 2 ? "Spare" : "Not Given",
          item_asset_type_slno: val.item_asset_type_slno,
          item_type_slno: val.item_type_slno,
          item_category_slno: val.item_category_slno,
          item_subcategory_slno: val.item_subcategory_slno,
          item_group_slno: val.item_group_slno,
          item_subgroup_slno: val.item_subgroup_slno,
          item_model_slno: val.item_model_slno,
          item_submodel_slno: val.item_submodel_slno,
          item_manufactures_slno: val.item_manufactures_slno,
          item_uom_slno: val.item_uom_slno,
          item_base_name: val.item_base_name,
          item_specific_one: val.item_specific_one,
          item_specific_two: val.item_specific_two,
          item_model_num: val.item_model_num,
          asset_spare: val.asset_spare,

        }
        return obj

      })
      setDisArry(arry)
    }
  }, [tabledata])



  const [column] = useState([
    {
      headerName: 'Action',
      minWidth: 100,
      cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
    },
    { headerName: 'SlNo', field: 'item_creation_slno', minWidth: 100 },
    { headerName: 'Asset/Spare', field: 'assetspare', minWidth: 200, autoHeight: true, filter: "true", },
    { headerName: 'Item Name', field: 'item_name', minWidth: 300, autoHeight: true, filter: "true", wrapText: true, },
    { headerName: 'Asset Type', field: 'asset_type_name', minWidth: 200, autoHeight: true, filter: "true", wrapText: true, },
    { headerName: 'Item Type', field: 'item_type_name', minWidth: 250, autoHeight: true, filter: "true", wrapText: true, },
    { headerName: 'Category', field: 'category_name', minWidth: 200, autoHeight: true, filter: "true", wrapText: true, },
    { headerName: 'Sub category', field: 'subcategory_name', minWidth: 200, autoHeight: true, filter: "true", wrapText: true, },
    { headerName: 'Group', field: 'group_name', minWidth: 200, autoHeight: true, filter: "true", wrapText: true, },
    { headerName: 'Sub Group', field: 'sub_group_name', minWidth: 200, autoHeight: true, filter: "true", wrapText: true, },
    { headerName: 'U.O.M', field: 'uom_name', minWidth: 200, autoHeight: true, filter: "true", wrapText: true, },
    { headerName: 'Manufacture', field: 'manufacture_name', minWidth: 200, autoHeight: true, filter: "true", wrapText: true, },
    { headerName: 'Model', field: 'model_name', minWidth: 200, autoHeight: true, filter: "true", wrapText: true, },
    { headerName: 'Sub Model', field: 'submodel_name', minWidth: 200, autoHeight: true, filter: "true", wrapText: true, },
    { headerName: 'Model No.', field: 'model_num', minWidth: 200, autoHeight: true, filter: "true", wrapText: true, },
    { headerName: 'Base Name.', field: 'base_name', minWidth: 200, autoHeight: true, filter: "true", wrapText: true, },
    { headerName: 'Sepcification 1', field: 'specific_one', minWidth: 200, wrapText: true, },
    { headerName: 'Sepcification 2', field: 'specific_two', minWidth: 200, wrapText: true, },
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
  return <CusAgGridMast columnDefs={column} tableData={displayArry} />
}

export default memo(ItemNameCreationTable)
