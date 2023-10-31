import React, { useState, memo } from 'react'
import { useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'
const SubCategoryTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])
  const [column] = useState([
    {
      headerName: 'Action', minWidth: 20,
      cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
    },
    { headerName: 'SlNo', field: 'subcategory_slno', minWidth: 50 },
    { headerName: 'Sub Category', field: 'subcategory_name', minWidth: 50 },
    { headerName: 'Category', field: 'category_name', minWidth: 50 },
    { headerName: 'Status', field: 'status', minWidth: 50 },

  ])
  useEffect(() => {
    const getSubCategory = async () => {
      const result = await axioslogin.get('subcategory/view')
      const { success, data } = result.data
      if (success === 2) {
        setTabledata(data)
      } else {
        warningNotify('error occured')
      }
    }
    getSubCategory()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} />
}

export default memo(SubCategoryTable)
