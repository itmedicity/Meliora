import React, { Fragment, useState, useEffect, memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import { CssVarsProvider } from '@mui/joy/'
import Table from '@mui/joy/Table';
import EditIcon from '@mui/icons-material/Edit'
import { Box, Paper } from '@mui/material'

const CommunicationDeviceTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])
  useEffect(() => {
    const getCommunicationDevice = async () => {
      const result = await axioslogin.get('communicationDeviceDetails/view')
      const { success, data } = result.data

      if (success === 2) {
        const arr = data?.map((val) => {
          const obj = {
            device_slno: val.device_slno,
            device_name: val.device_name,
            device_type_name: val.device_type_name,
            device_type_slno: val.device_type_slno,
            dept_name: val.dept_name,
            department: val.department,
            location: val.location,
            sec_name: val.sec_name,
            reciver_name: val.reciver_name,
            contact_no: val.contact_no,
            ima: val.ima,
            sim_number: val.sim_number,
            provider: val.provider,
            providername: val.provider === 1 ? 'Vodafone Idea' : val.provider === 2 ? 'Airtel' : val.provider === 3 ? 'Jio' :
              val.provider === 4 ? 'Bsnl' : val.provider === 5 ? 'Reliance Communications' : val.provider === 6 ? 'Aircel' :
                val.provider === 7 ? 'Tata Docomo' : val.provider === 8 ? 'BSNL Mobile' : val.provider === 9 ? 'MNTL' :
                  val.provider === 10 ? 'Tata Teleservices' : val.provider === 11 ? 'Telenor India' : val.provider === 12 ? 'MTS India' : 'NIL',
            issue_date: val.issue_date,
            asset_no: val.asset_no,
            sim: val.sim,
            issue: val.issue,
            tarrif: val.tarrif,
            issue_status: val.issue_status,
            tarrifname: val.tarrif === 1 ? 'Monthly' : val.tarrif === 2 ? 'Quarterly' : val.tarrif === 3 ? 'Yearly' : 'NIL',
            amount: val.amount,
            device_ima: val.device_ima,
            device_num: val.device_num,
            sim_mobile_num: val.sim_mobile_num,
            receiver_emp_id: val.receiver_emp_id
          }
          return obj
        })
        setTabledata(arr)
      } else {
        warningNotify('error occured')
      }
    }
    getCommunicationDevice()
  }, [count])

  return (
    <Fragment>
      {tabledata.length !== 0 ?
        <Paper variant="outlined" sx={{ maxHeight: 700, maxWidth: '100%', overflow: 'auto', }}>

          <CssVarsProvider>
            <Table padding={"none"} stickyHeader
              hoverRow>
              <thead>
                <tr >
                  <th style={{ width: 60 }} >Action</th>
                  <th style={{ width: 60 }}>SlNo</th>
                  <th style={{ width: 150 }}>Department</th>
                  <th style={{ width: 150 }}>Location</th>
                  <th style={{ width: 150 }}> Device name</th>
                  <th style={{ width: 150 }}>Device Type</th>
                  <th style={{ width: 150 }}>Device SlNo./IMA</th>
                  <th style={{ width: 150 }}>Device No.</th>
                  <th style={{ width: 150 }}>SIM SlNo./IMA</th>
                  <th style={{ width: 150 }}>SIM No.</th>
                  <th style={{ width: 150 }}>Operator</th>
                  <th style={{ width: 150 }}>Sim Mob No.</th>
                  <th style={{ width: 150 }}>Receiver EmpID</th>
                  <th style={{ width: 150 }}>Receiver Name</th>
                  <th style={{ width: 150 }} >Contact No.</th>
                  <th style={{ width: 150 }}>Issued Date</th>
                  <th style={{ width: 150 }}>Tarrif</th>
                  <th style={{ width: 100 }}>Amount</th>
                  <th style={{ width: 180 }}>Asset No.</th>
                  <th style={{ width: 150 }}>Issued Status</th>
                </tr>
              </thead>
              <tbody>
                {tabledata.map((val, index) => {
                  return <tr
                    key={index}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                      minHeight: 5
                    }}
                  >
                    <td>
                      <EditIcon sx={{ cursor: 'pointer' }} size={6} onClick={() => rowSelect(val)} />
                    </td>
                    <td> {val.device_slno || 'Not given'}</td>
                    <td> {val.dept_name || 'Not given'}</td>
                    <td> {val.sec_name || 'Not given'}</td>
                    <td> {val.device_name || 'Not given'}</td>
                    <td> {val.device_type_name || 'Not given'}</td>
                    <td> {val.device_ima || 'Not given'}</td>
                    <td> {val.device_num || 'Not given'}</td>
                    <td> {val.ima || 'Not given'}</td>
                    <td> {val.sim_number || 'Not given'}</td>
                    <td> {val.providername || 'Not given'}</td>
                    <td> {val.sim_mobile_num || 'Not given'}</td>
                    <td> {val.receiver_emp_id || 'Not given'}</td>
                    <td> {val.reciver_name || 'Not given'}</td>
                    <td> {val.contact_no || 'Not given'}</td>
                    <td> {val.issue_date || 'Not given'}</td>
                    <td> {val.tarrifname || 'Not given'}</td>
                    <td> {val.amount || 'Not given'}</td>
                    <td> {val.asset_no || 'Not given'}</td>
                    <td> {val.issue || 'Not given'} </td>
                  </tr>
                })}
              </tbody>
            </Table>
          </CssVarsProvider>

        </Paper>
        : <Box sx={{ textAlign: 'center', mt: 15, fontWeight: 700, fontSize: 30, color: '#C7C8CB' }}>
          No data found

        </Box>}
    </Fragment>
  )
}
export default memo(CommunicationDeviceTable)
