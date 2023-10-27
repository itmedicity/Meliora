import React, { memo, useCallback, useState,useEffect } from 'react'
import CardMasterClose from 'src/views/Components/CardMasterClose';
import { Paper, Typography, } from '@mui/material';
import { CssVarsProvider, Table } from '@mui/joy';
 import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import TarrifModalBillAdds from './TarrifModalBillAdds';


const MonthlyPendingBill = ({ setBackdashboard, setmonthlyPendingBill,MonthlyPendingData}) => {
  const [addModalOpen, setaddModalOpen] = useState(false)
  const [AddModalFlag, setAddModalFlag] = useState(0)
  const [getarry,setgetarry]=useState([])
  const [editFlag, setEditFalg] = useState(0) 
  const [count, setCount] = useState(0)
  const [tabledata, setTabledata] = useState([]) 

  
  const handleClose = useCallback(() => {
        setAddModalFlag(0)
        setaddModalOpen(false)
      }, [setAddModalFlag, setaddModalOpen]) 
    
  const editForSelect = useCallback((val) => {
      setgetarry(val)
       setEditFalg(1)
       setAddModalFlag(1)
        setaddModalOpen(true)
      }, [])     
   
  const backtoSetting = useCallback(() => {
        setBackdashboard(1)
        setmonthlyPendingBill(0)
  }, [setBackdashboard, setmonthlyPendingBill])
  
  useEffect(() => {           
    if (MonthlyPendingData.length !== 0) {
        const arr = MonthlyPendingData?.map((val) => {
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
              sim_number: val.sim_number,
              provider:val.provider,
              providername:val.provider === 1 ? 'Vodafone Idea' : val.provider === 2 ? 'Airtel' : val.provider === 3 ? 'Jio' : 
                  val.provider === 4 ? 'Bsnl' : val.provider === 5 ? 'Reliance Communications' : val.provider === 6 ? 'Aircel' :
                  val.provider === 7 ? 'Tata Docomo' : val.provider === 8 ? 'BSNL Mobile' : val.provider === 9 ? 'MNTL' : 
                  val.provider === 10 ? 'Tata Teleservices' : val.provider === 11 ? 'Telenor India' :val.provider === 12 ? 'MTS India'  : 'NIL',
              isssued_deligate: val.isssued_deligate,
              issue_date: val.issue_date,
              asset_no: val.asset_no,                
              issue: val.issue,
              tarrif: val.tarrif,              
              tarrifname: val.tarrif === 1 ? 'Monthly' : val.tarrif === 2 ? 'Quarterly' : val.tarrif === 3 ? 'Yearly' : 'NIL',
              amount: val.amount, 
              receiver_emp_id: val.receiver_emp_id,
              sim_mobile_num: val.sim_mobile_num,
              monthly_slno: val.monthly_slno,
              bill_amount: val.bill_amount,
              bill_date: val.bill_date,
              bill_entered_date: val.bill_entered_date,
              file_upload_status: val.file_upload_status,
              payed_status: val.payed_status,
              bill_number: val.bill_number,
              bill_due_date:val.bill_due_date
          }
         
            return obj
        })
    
        setTabledata(arr)
    }
}, [MonthlyPendingData])

     
  return (
      <Paper> 
                  
    <CardMasterClose
      // title={MonthlyTarriff }
      style={{ overflow: 'hidden' }}
      close={backtoSetting}
    >
{AddModalFlag === 1 ? <TarrifModalBillAdds open={addModalOpen} handleClose={handleClose}
        setCount={setCount}
        count={count}
        getarry={getarry} editFlag={editFlag} /> : null}
<Typography sx={{ fontWeight: 10, fontSize: 28, fontFamily: 'Anton',color:'#003060' }}>Add Monthly Pending Bills</Typography>
      {/* <MonthlyTable editForSelect={editForSelect} /> */}
      <CssVarsProvider>
    <Table stickyHeader >
    <thead>
            <tr>
              <th style={{width:'4%'}}>Add</th>
              {/* <th style={{width:'5%'}}>Action</th> */}
              <th style={{ width: '5%' }} >SlNo</th>
              <th style={{width:'9%',}}>Device Name</th>  
              <th >Device Type</th>
              <th>Department</th>
              <th>Reciever Name</th>
              <th>Reciever Emp ID</th>
              <th>Sim Operator</th>
              <th>Tarrif Amount</th>              
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
               
                      <PlaylistAddCircleIcon sx={{ cursor: 'pointer' }} size={6}
                          onClick={() => editForSelect(val)}
                      />
                </td>
                {/* <td>
                      <ReceiptLongIcon sx={{ cursor: 'pointer' }} size={6}
                          onClick={() => MonthlyBillTableView(val)}
                      />
                </td> */}
                <td> {index + 1}</td>
                <td>{ val.device_name}</td>
                <td> {val.device_type_name}</td>
                <td> {val.dept_name}</td>
                <td> {val.reciver_name}</td>  
                <td> {val.receiver_emp_id}</td>
                <td> {val.providername}</td>               
                <td> {val.amount}</td>
              </tr>
  
            })}
            
  
            </tbody>
  
  
  
  </Table>
    
    </CssVarsProvider>

          </CardMasterClose>
            
               </Paper>
    
  )
}

export default memo(MonthlyPendingBill)