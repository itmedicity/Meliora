import { CssVarsProvider, Table } from '@mui/joy';
import {  Typography } from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import CardMasterClose from 'src/views/Components/CardMasterClose'
import EditIcon from '@mui/icons-material/Edit';
import TarrifModalBillEdits from '../DashBoardTariff/MonthlyTarrif/TarrifModalBillEdits';

const MonthlyBillView = ({ setmonthly, setmonthlyBillTable,  billviewsl }) => {


  const [tabledata, setTabledata] = useState([])
  
  const [addModalOpen, setaddModalOpen] = useState(false)
  const [AddModalFlag, setAddModalFlag] = useState(0)
  const [count, setCount] = useState(0)

  const handleClose = useCallback(() => {
    setAddModalFlag(0)
    setaddModalOpen(false)
  }, [setAddModalFlag, setaddModalOpen]) 

 const [getarry,setgetarry]=useState([])
  const [editFlag, setEditFalg] = useState(0) 
  
    const editForSelect = useCallback((val) => {
    setgetarry(val)
     setEditFalg(1)
     setAddModalFlag(1)
     setaddModalOpen(true)
    }, [])
  
 



  const backtoSetting = useCallback(() => {
    
    setmonthly(1)
    setmonthlyBillTable(0)
  }, [setmonthly, setmonthlyBillTable])
  
  useEffect(() => {
    const getCommunicationDevice = async (billviewsl) => {
      const result = await axioslogin.get(`/tarrifDetails/BillMonthlyViewId/${billviewsl}`)
      const { success, data } = result.data
      if (success === 2) {

        const arr = data?.map((val) => {
          const obj = {
            device_slno: val.device_slno,
            device_name:val.device_name,
            device_type_name: val.device_type_name,
            device_type_slno:val.device_type_slno,
            dept_name: val.dept_name,
            department: val.department,
            location:val.location,
            sec_name: val.sec_name,
            reciver_name: val.reciver_name,
            receiver_emp_id:val.receiver_emp_id,
            contact_no: val.contact_no,
            ima: val.ima,
            sim_number: val.sim_number,
            provider:val.provider,
            providername:val.provider === 1 ? 'Vodafone Idea' : val.provider === 2 ? 'Airtel' : val.provider === 3 ? 'Jio' : 
              val.provider === 4 ? 'Bsnl' : val.provider === 5 ? 'Reliance Communications' : val.provider === 6 ? 'Aircel' :
              val.provider === 7 ? 'Tata Docomo' : val.provider === 8 ? 'BSNL Mobile' : val.provider === 9 ? 'MNTL' : 
              val.provider === 10 ? 'Tata Teleservices' : val.provider === 11 ? 'Telenor India' :val.provider === 12 ? 'MTS India'  : 'NIL',
            isssued_deligate: val.isssued_deligate,
            issue_date: val.issue_date,
            asset_no: val.asset_no,
            sim: val.sim,
            issue: val.issue,
            tarrif: val.tarrif,
            sim_status: val.sim_status,
            issue_status:val.issue_status,
            tarrifname: val.tarrif === 1 ? 'Monthly' : val.tarrif === 2 ? 'Quarterly' : val.tarrif === 3 ? 'Yearly' : 'NIL',
            amount: val.amount,
            bill_amount: val.bill_amount,
            bill_date: val.bill_date,
            bill_due_date:val.bill_due_date,
            bill_number: val.bill_number,          
            bill_entered_date: val.bill_entered_date,
            fileStatus: val.fileStatus,
            file_upload_status: val.file_upload_status,                   
            payed: val.payed,
            payed_status: val.payed_status,           
            sl_no_monthly: val.sl_no_monthly,
           
           
          }
          return obj
        })



        setTabledata(arr)
      } else {
        warningNotify('error occured')
      }
    }
    getCommunicationDevice(billviewsl)
  }, [count,billviewsl])
  return (
    <CardMasterClose
    close={backtoSetting}
    >
      {AddModalFlag === 1 ? <TarrifModalBillEdits open={addModalOpen} handleClose={handleClose}
        setCount={setCount}
        count={count}
        getarry={getarry} editFlag={editFlag} /> : null}
       <Typography sx={{ fontWeight: 10, fontSize: 28, fontFamily: 'Anton',color:'#003060'  }}>Bill Details</Typography>
     <CssVarsProvider>
  <Table stickyHeader >
  <thead>
          <tr>
                           <th style={{ width: '4%', }}>Action</th>           
                           <th  style={{width:'9%',}}>Device Name</th>      
                             <th  style={{width:'9%',}}>Device Type</th>
                             <th   style={{width:'9%',}}>Department</th>                          
                            <th  >Receiver Name</th> 
                            <th  >Tarrif Amount</th>
                           <th  >Bill Amount</th>              
                           <th  >Bill Date</th>
                            <th  >Bill Due Date</th>
                            <th  >Bill No.</th>
                             <th   >Bill Payed Date</th>
                            <th  >File Uploaded</th>
                            <th  >Bill Payed</th>
                          
                        </tr>
        </thead>
        
        <tbody>

          {tabledata.map((val,index) => {
           




            return <tr
            key={index}
            sx={{
                '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                minHeight: 5
            }}
            >
                <td>
                                    <EditIcon sx={{ cursor: 'pointer' }} size={6}
                          onClick={() => editForSelect(val)} />
              </td>
              <td>{ val.device_name}</td>
              <td> {val.device_type_name}</td>              
              <td> {val.dept_name}</td> 
              <td> {val.reciver_name}</td>
              <td> {val.amount}</td>              
              <td> {val.bill_amount}</td>
              <td> {val.bill_date}</td>
              <td> {val.bill_due_date}</td>
              <td> {val.bill_number}</td>
              <td> {val.bill_entered_date}</td>           
              <td> {val.fileStatus}</td>
              <td> {val.payed}</td>
            
             

              </tr>

          })}
          

          </tbody>



</Table>
  
  </CssVarsProvider>

      </CardMasterClose>
  )
}

export default memo(MonthlyBillView)