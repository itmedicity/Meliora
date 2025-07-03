import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const ModuleGroupRightTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])
  const [column] = useState([
    { headerName: 'SlNo', field: 'mod_grp_user_slno' },
    { headerName: 'Employee Name', field: 'em_name', filter: 'true' },
    { headerName: 'Module Group', field: 'mod_grp_name', filter: 'true' },
    { headerName: 'User Group', field: 'user_grp_name', filter: 'true' },
    { headerName: 'Status', field: 'mod_grp_user_status' },
    {
      headerName: 'Action',
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />,
    },
  ])

  /*** get data from module_master table for display */
  useEffect(() => {
    const getmodule = async () => {
      const result = await axioslogin.get('/modulegroupright')
      const { success, data } = result.data
      if (success === 1) {
        setTabledata(data)
      } else {
        warningNotify(' Error occured contact EDP')
      }
    }
    getmodule()
  }, [count])

  return <CusAgGridMast columnDefs={column} tableData={tabledata} onClick={rowSelect} />
}

export default memo(ModuleGroupRightTable)
