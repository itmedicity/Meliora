import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const StoreMasterTable = ({
  count,
  rowSelect,
  setCount,
  setSubStoreList,
  setDept,
  setDeptsec,
  setEmpname,
  setCrsList
}) => {
  const [tabledata, setTabledata] = useState([])

  const [column] = useState([
    { headerName: 'Employee Name', field: 'em_name', filter: 'true', width: 300 },
    { headerName: 'Department', field: 'dept_name', filter: 'true', width: 300 },
    { headerName: 'Department Section', field: 'sec_name', filter: 'true', width: 300 },
    { headerName: 'Store', field: 'store_names', width: 300 },
    { headerName: 'Sub Store', field: 'sub_store_names', minwidth: 300 },
    {
      headerName: 'Action',
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
    }
  ])

  /*** get data from module_master table for display */
  useEffect(() => {
    const getmodule = async () => {
      const result = await axioslogin.get('/newCRFRegister/GetStoreMaster')
      const { success, data } = result.data
      if (success === 1) {
        setTabledata(data)
        setCount(0)
        setSubStoreList([])
        setDept(0)
        setDeptsec(0)
        setEmpname(0)
        setCrsList([])
      } else {
        warningNotify(' Error occured contact EDP')
      }
    }
    getmodule()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} onClick={rowSelect} />
}

export default memo(StoreMasterTable)
