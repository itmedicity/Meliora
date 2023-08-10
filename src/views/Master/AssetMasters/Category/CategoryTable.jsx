import React, { useState, memo } from 'react'
import { useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'
const CategoryTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])

  const [column] = useState([
    { headerName: 'SlNo', field: 'category_slno' },
    { headerName: 'Category', field: 'category_name' },
    { headerName: 'Status', field: 'status' },
    {
      headerName: 'Action',
      cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
    },
  ])
  useEffect(() => {
    const getCategory = async () => {
      const result = await axioslogin.get('amcategory/view')
      const { success, data } = result.data
      if (success === 2) {
        setTabledata(data)
      } else {
        warningNotify('error occured')
      }
    }
    getCategory()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} />
}

export default memo(CategoryTable)
