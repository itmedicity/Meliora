import { Box } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import PersonIcon from '@mui/icons-material/Person'

const EmployeeTask = () => {
  const [allEmpTask, setallEmpTask] = useState([])
  const empsecid = useSelector(state => {
    return state.LoginUserData.empsecid
  })

  useEffect(() => {
    const getAllEmployeeTask = async () => {
      const result = await axioslogin.get(`/TmTableView/viewAllEmployeeTask/${empsecid}`)
      const { success, data } = result.data
      if (success === 2) {
        setallEmpTask(data)
      }
    }
    getAllEmployeeTask(empsecid)
  }, [empsecid])

  return (
    <Box sx={{ flex: 1 }}>
      <Box
        sx={{
          height: 45,
          mt: 0.5,
          mx: 1.5,
          display: 'flex',
          borderBottom: 1,
          borderTop: 1,
          borderColor: 'lightgray',
          pt: 1.5,
          bgcolor: 'white'
        }}
      >
        <Box sx={{ flex: 0.5, pl: 1.7, fontWeight: 600, color: '#444444', fontSize: 12 }}>#</Box>
        <Box sx={{ flex: 1, fontWeight: 600, color: '#444444', fontSize: 12 }}>Employee Id</Box>
        <Box sx={{ flex: 5, fontWeight: 600, color: '#444444', fontSize: 12 }}>Employee Name</Box>
        <Box sx={{ flex: 1, fontWeight: 600, color: '#444444', fontSize: 12 }}>Complted Task</Box>
        <Box sx={{ flex: 1, fontWeight: 600, color: '#444444', fontSize: 12 }}>Total Task</Box>
      </Box>
      <Box sx={{ height: '60vh', overflow: 'auto' }}>
        {allEmpTask?.map((val, index) => {
          return (
            <Box
              key={index}
              sx={{
                flex: 1,
                display: 'flex',
                mt: 0.3,
                borderBottom: 2,
                mx: 1.5,
                borderColor: 'lightgrey',
                minHeight: 30,
                maxHeight: 80,
                background: 'white',
                pt: 0.5
              }}
            >
              <Box sx={{ flex: 0.5, pl: 1.7, fontWeight: 600, color: 'grey', fontSize: 12 }}>{index + 1}</Box>
              <Box sx={{ flex: 1, fontWeight: 600, color: 'grey', fontSize: 12 }}>{val.emslno}</Box>
              <Box sx={{ flex: 5, fontWeight: 600, color: 'grey', fontSize: 12, cursor: 'pointer' }}>
                &nbsp;
                <PersonIcon sx={{ color: '#6A4973' }} /> {val.empname}
              </Box>
              <Box sx={{ flex: 1, color: 'green', pl: 4 }}>[{val.TC || '0'}]</Box>
              <Box sx={{ flex: 1, fontWeight: 600, color: '#3B0404', fontSize: 12 }}>[{val.TT || '0'}]</Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default memo(EmployeeTask)
