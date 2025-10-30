
import { useQuery } from '@tanstack/react-query'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton'

const CondemApprovalLevelTable = ({ rowSelect }) => {


  const [tabledata, setTabledata] = useState([]);
  const [column] = useState([
    { headerName: "Level  No.", field: "level_slno", width: 150 },
    { headerName: "Level Name", field: "level_name", filter: "true" },
    { headerName: "Employee", field: "em_name", },
    { headerName: "View After Levels Approved", field: "approved_for_view_names", },
    { headerName: "Approved For Levels Approved", field: "approved_for_approve_names", },
    { headerName: "Status", field: "status", width: 100 },
    { headerName: 'Action', width: 100, cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />, },
  ])


  const { data: AllCondemnationLevel = [] } = useQuery(
    ['getAllCondemnationLevel'],
    async () => {
      const result = await axioslogin.get('condemApprovalLevel/viewCondemnationLevel');
      return result.data?.data || [];
    }
  );

  useEffect(() => {
    setTabledata(AllCondemnationLevel);
  }, [AllCondemnationLevel]);



  return (
    <CusAgGridMast
      columnDefs={column}
      tableData={tabledata}
      onClick={rowSelect}

    />
  )
}

export default memo(CondemApprovalLevelTable)