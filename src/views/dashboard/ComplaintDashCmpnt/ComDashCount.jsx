import React, { Fragment, memo, Suspense, useEffect, useState } from 'react'
import { LinearProgress, TableCell } from '@mui/material'
import { axioslogin } from 'src/views/Axios/Axios'

const ComDashCount = ({ empid }) => {
  const [counts, setCounts] = useState([])

  useEffect(() => {
    const getComplaintsCounts = async () => {
      const result = await axioslogin.get(`/cmdashboard/getComplaintcountEmp/${empid}`)
      const { success, data } = result.data
      if (success === 1) {
        // setemp_id(emid)
        setCounts(data[0])
      } else {
      }
    }
    getComplaintsCounts()
  }, [empid])

  return (
    <Fragment>
      <Suspense fallback={<LinearProgress />}>
        {counts &&
          counts.map((val) => {
            return (
              <TableCell
                align="center"
                text="center"
                key={val.countype}
                style={{ padding: 0, width: '10rem', height: '1rem' }}
              >
                {val.total}
              </TableCell>
            )
          })}
      </Suspense>
    </Fragment>
  )
}

export default memo(ComDashCount)
