import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const ComProirityMastTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])

  const convertMinutesToWdhm = totalMinutes => {
    const weeks = Math.floor(totalMinutes / (7 * 24 * 60))
    const days = Math.floor((totalMinutes % (7 * 24 * 60)) / (24 * 60))
    const hours = Math.floor((totalMinutes % (24 * 60)) / 60)
    const minutes = totalMinutes % 60

    const parts = []
    if (weeks) parts.push(`${weeks}w`)
    if (days) parts.push(`${days}d`)
    if (hours) parts.push(`${hours}h`)
    if (minutes) parts.push(`${minutes}m`)

    return parts.length ? parts.join(' ') : '0m'
  }

  const [column] = useState([
    { headerName: 'SlNo', field: 'cm_priority_slno', minWidth: 100 },
    { headerName: 'Priority Name', field: 'cm_priority_desc', filter: 'true', minWidth: 150 },
    { headerName: 'Escalation Min', field: 'escalation_min_dis', filter: 'true', minWidth: 200 },
    { headerName: 'Escalation Max', field: 'escalation_max_dis', filter: 'true', minWidth: 200 },
    { headerName: 'Status', field: 'status', minWidth: 100 },
    {
      headerName: 'Action',
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
    }
  ])

  useEffect(() => {
    const getmodule = async () => {
      const result = await axioslogin.get('/compriority')
      const { success, data } = result.data
      if (success === 1) {
        const formattedData = data.map(row => ({
          ...row,
          escalation_min_dis: convertMinutesToWdhm(row.escalation_min),
          escalation_max_dis: convertMinutesToWdhm(row.escalation_max)
        }))
        setTabledata(formattedData)
      } else {
        warningNotify(' Error occurred, contact EDP')
      }
    }
    getmodule()
  }, [count])

  return <CusAgGridMast columnDefs={column} tableData={tabledata} onClick={rowSelect} />
}

export default memo(ComProirityMastTable)

// import React, { memo, useEffect, useState } from 'react'
// import { axioslogin } from 'src/views/Axios/Axios'
// import { warningNotify } from 'src/views/Common/CommonCode'
// import CusAgGridMast from 'src/views/Components/CusAgGridMast';
// import EditButton from 'src/views/Components/EditButton';

// const ComProirityMastTable = ({ count, rowSelect }) => {

//     const [tabledata, setTabledata] = useState([])
//     const [column] = useState([
//         { headerName: 'SlNo', field: 'cm_priority_slno', minWidth: 100, },
//         { headerName: 'Priority Name', field: 'cm_priority_desc', filter: "true", minWidth: 150, },
//         { headerName: 'Escalation Min', field: 'escalation_min_dis', filter: "true", minWidth: 150, },
//         { headerName: 'Escalation Max', field: 'escalation_max_dis', filter: "true", minWidth: 150, },
//         { headerName: 'Status', field: 'status', minWidth: 100 },
//         { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> },
//     ])

//     /*** get data from module_master table for display */
//     useEffect(() => {
//         const getmodule = async () => {
//             const result = await axioslogin.get('/compriority')
//             const { success, data } = result.data;
//             if (success === 1) {
//                 setTabledata(data);
//             } else {
//                 warningNotify(" Error occured contact EDP")
//             }
//         }
//         getmodule();
//     }, [count])

//     return (
//         <CusAgGridMast
//             columnDefs={column}
//             tableData={tabledata}
//             onClick={rowSelect}
//         />
//     )
// }

// export default memo(ComProirityMastTable)
