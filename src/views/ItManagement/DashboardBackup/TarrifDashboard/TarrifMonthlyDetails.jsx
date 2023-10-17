
import React, { memo, useCallback, useState } from 'react'
import CardMasterClose from 'src/views/Components/CardMasterClose';
import { Paper, Typography, } from '@mui/material';
import { useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import { CssVarsProvider, Table } from '@mui/joy';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import MonthlyBillView from './MonthlyBillView';
import TarrifModalBillAdds from '../DashBoardTariff/MonthlyTarrif/TarrifModalBillAdds';

const TarrifMonthlyDetails = ({setBackdashboard,setmonthly,}) => {
 
  const [addModalOpen, setaddModalOpen] = useState(false)
  const [AddModalFlag, setAddModalFlag] = useState(0)
  const [monthlyBillTable, setmonthlyBillTable] = useState(0);
  const [count, setCount] = useState(0)
  const [tabledata, setTabledata] = useState([])

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
   
  const [billviewsl,setbillviewSl]=useState(0)
  
  const MonthlyBillTableView = useCallback((val) => {
    
    const {device_slno}=val
    setmonthlyBillTable(1);
    setbillviewSl(device_slno)
 
  },[setbillviewSl])
  

  const backtoSetting = useCallback(() => {
    setBackdashboard(1)
    setmonthly(0)
}, [setBackdashboard,setmonthly])

useEffect(() => {
  const getMonthlyTarrif = async () => {
    const result = await axioslogin.get('tarrifDetails/monthlyview')
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
         }
        return obj
      })
      setTabledata(arr)
    } else {
      warningNotify('error occured')
    }
  }
  getMonthlyTarrif()
}, [
    // count
])

  
  return (
    <Paper>
    {monthlyBillTable === 1 ? (
        <MonthlyBillView
        setmonthly={setmonthly} setmonthlyBillTable={setmonthlyBillTable} billviewsl={billviewsl}
        
        />
    ) : (
    <CardMasterClose
      // title={MonthlyTarriff }
      style={{ overflow: 'hidden' }}
      close={backtoSetting}
    >
{AddModalFlag === 1 ? <TarrifModalBillAdds open={addModalOpen} handleClose={handleClose}
        setCount={setCount}
        count={count}
        getarry={getarry} editFlag={editFlag} /> : null}
<Typography sx={{ fontWeight: 10, fontSize: 28, fontFamily: 'Anton',color:'#003060' }}>Monthly Tarrif Details</Typography>
      {/* <MonthlyTable editForSelect={editForSelect} /> */}
      <CssVarsProvider>
    <Table stickyHeader>
    <thead>
            <tr>
              {/* <th style={{width:'4%'}}>Add</th> */}
              <th style={{width:'5%'}}>Action</th>
                    <th style={{ width: '5%' }} >SlNo</th>
                    <th  style={{width:'9%',}}>Device Name</th>  
              <th >Device Type</th>
              <th>Department</th>
              <th>Reciever Name</th>
              <th>Device/Sim No.</th>
              <th>Sim Network</th>
              <th>Amount</th>
             
                       

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
                {/* <td>
               
                      <PlaylistAddCircleIcon sx={{ cursor: 'pointer' }} size={6}
                          onClick={() => editForSelect(val)}
                      />
                </td> */}
                <td>
                      <ReceiptLongIcon sx={{ cursor: 'pointer' }} size={6}
                          onClick={() => MonthlyBillTableView(val)}
                      />
                </td>
                <td> {index + 1}</td>
                <td>{ val.device_name}</td>
                <td> {val.device_type_name}</td>
                <td> {val.dept_name}</td>
                <td> {val.reciver_name}</td>  
                <td> {val.sim_number}</td>
                <td> {val.providername}</td>               
                <td> {val.amount}</td>            
               
              
  
                </tr>
  
            })}
            
  
            </tbody>
  
  
  
  </Table>
    
    </CssVarsProvider>

          </CardMasterClose>
               )}
               </Paper>
    
  )
}

export default memo(TarrifMonthlyDetails)