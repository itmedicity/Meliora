import { Box, Table, Typography } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import PersonIcon from '@mui/icons-material/Person';

const EmployeeTask = () => {

  const [allEmpTask, setallEmpTask] = useState([])
  const empDept = useSelector((state) => state.LoginUserData.empdept);

  useEffect(() => {
    const getAllEmployeeTask = async () => {
      const result = await axioslogin.get(`/TmTableView/viewAllEmployeeTask/${empDept}`);
      const { success, data } = result.data;
      if (success === 2) {
        setallEmpTask(data)
      }
    }
    getAllEmployeeTask(empDept)
  }, [empDept])

  return (
    <Box sx={{ flexGrow: 1, px: 1, pt: .5, height: '70vh', overflow: 'auto', mb: 1 }}>
      <Table
        borderAxis="bothBetween"
        hoverRow
        stickyHeader
        variant="outlined"
        sx={{
          bgcolor: 'white',
          height: '60vh',
          overflow: 'auto',
        }}
      >
        <thead>
          <tr>
            <th style={{ width: '5%', textAlign: 'center' }}>#</th>
            <th style={{ width: '55%' }}>Employee Name</th>
            <th style={{ width: '20%', textAlign: 'center' }}>Completed Task</th>
            <th style={{ width: '20%', textAlign: 'center' }}>Total Task</th>
          </tr>
        </thead>
        <tbody>
          {allEmpTask?.map((val, index) => (
            <tr key={index}>
              <td style={{ textAlign: 'center', color: 'grey', fontWeight: 600 }}>
                {index + 1}
              </td>

              <td
                style={{
                  color: 'grey',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  cursor: 'pointer',
                }}
              >
                <PersonIcon sx={{ color: '#6A4973', fontSize: 18 }} />
                <Typography level="body-sm">{val.empname}</Typography>
              </td>

              <td style={{ color: 'green', textAlign: 'center', fontWeight: 600 }}>
                [{val.TC || '0'}]
              </td>

              <td style={{ color: '#3B0404', textAlign: 'center', fontWeight: 600 }}>
                [{val.TT || '0'}]
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  )
}

export default memo(EmployeeTask)