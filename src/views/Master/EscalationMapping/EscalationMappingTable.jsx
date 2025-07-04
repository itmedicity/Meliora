import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
const EscalationMappingTable = ({ count }) => {
  //state for table data set
  const [tabledata, setTabledata] = useState([])
  //column title setting
  const [column] = useState([
    { headerName: 'SlNo', field: 'esc_mapping_slno' },
    { headerName: 'Escalation Name', field: 'esc_activity', width: 250, filter: 'true' },
    { headerName: ' Complaint Dept', field: 'complaint_dept_name' }
  ])
  //get all data
  useEffect(() => {
    const getEscalationMaping = async () => {
      const result = await axioslogin.get('/escalationmaping')
      const { success, data } = result.data
      if (success === 1) {
        setTabledata(data)
      } else {
        warningNotify('Error occured contact EDP')
      }
    }
    getEscalationMaping()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} />
}
export default memo(EscalationMappingTable)
