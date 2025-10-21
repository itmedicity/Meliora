import { useQuery } from '@tanstack/react-query'
import React, { useState, memo } from 'react'
import { getallEmployeDetails } from 'src/api/CommonApi'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import EditButton from 'src/views/Components/EditButton'
const UserCreationTable = ({ rowSelect }) => {
  //state for setting table data
  // const [tabledata, setTabledata] = useState([])
  //column title setting
  const [column] = useState([
    { headerName: 'Sl No', field: 'emp_no' },
    { headerName: 'Name', field: 'em_name', filter: 'true' },
    { headerName: 'User Id', field: 'emp_username', filter: 'true' },
    { headerName: 'Department Section', field: 'sec_name', filter: 'true' },
    { headerName: 'Designation', field: 'desg_name', filter: 'true' },
    {
      headerName: 'Action',
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
    }
  ])


  const {
    data: tabledata,
    isLoading: isCompLoading,
    error: compError
  } = useQuery({
    queryKey: ['getallEmpdetails'],
    queryFn: () => getallEmployeDetails(),
    staleTime: Infinity
  })
  // if (isCompLoading) return <p>Loading...</p>
  // if (compError) return <p>Error Occurred.</p>

  return <CusAgGridForMain columnDefs={column} tableData={tabledata} />
}

export default memo(UserCreationTable)
