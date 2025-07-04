import React, { useEffect } from 'react'
import { memo } from 'react'
import { useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const CustodianDeptTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])

  const [column] = useState([
    {
      headerName: 'Action',
      minWidth: 100,
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
    },
    { headerName: 'SlNo', field: 'am_custodian_slno', minWidth: 100 },
    { headerName: 'Custodian Name', field: 'am_custodian_name', minWidth: 200 },
    { headerName: 'Department', field: 'dept_name', minWidth: 250 },
    { headerName: 'Custodian Employee', field: 'em_name', minWidth: 200 },
    { headerName: 'First ', field: 'am_custdn_asset_no_first', minWidth: 100 },
    { headerName: 'Second ', field: 'am_custdn_asset_no_second', minWidth: 100 },
    { headerName: 'Status', field: 'statuss', minWidth: 200 }
  ])
  useEffect(() => {
    const getModel = async () => {
      const result = await axioslogin.get('CustodianDeptMast/view')
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

export default memo(CustodianDeptTable)
