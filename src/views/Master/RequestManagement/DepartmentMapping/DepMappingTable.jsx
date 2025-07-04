import React, { memo, useEffect, useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import { axioslogin } from 'src/views/Axios/Axios'

const DepMappingTable = ({ setCount, count }) => {
  const [tabledata, setTabledata] = useState([])
  const [column] = useState([
    { headerName: 'Department Section', field: 'sec_name', filter: 'true', width: 100 },
    {
      headerName: 'Incharge Tmc',
      field: 'incharge_name',
      filter: 'true',
      width: 100,
      valueGetter: params => params.data?.incharge_name ?? 'No Incharge'
    },
    {
      headerName: 'HOD Tmc',
      field: 'hod_name',
      filter: 'true',
      width: 100,
      valueGetter: params => params.data?.hod_name ?? 'No Hod'
    },
    { headerName: 'Incharge ID Kmc', field: 'kmc_incharge', filter: 'true', width: 100 },
    { headerName: 'Hod ID', field: 'kmc_hod', filter: 'true', width: 100 }
  ])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axioslogin.get('/newCRFRegister/DepartmentmappingGet')
        const { success, data } = result.data
        if (success === 1 && data.length > 0) {
          setTabledata(data)
          setCount(0)
        } else {
          setTabledata([])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [count])
  return (
    <CusAgGridMast
      columnDefs={column}
      tableData={tabledata}
      // onClick={rowSelect}
    />
  )
}

export default memo(DepMappingTable)
