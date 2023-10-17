import { CssVarsProvider, Table, Typography } from '@mui/joy';
import React, { useCallback, useEffect, useState ,memo} from 'react'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import EditIcon from '@mui/icons-material/Edit';
import QuaterlyBillEditModal from './QuaterlyBillEditModal'
import { Paper } from '@mui/material';

const QuaterlyTariffView = ({ quaterlydata, setBackdashboard, setquarterly }) => {
    const [tabledata, setTabledata] = useState([])
    const [addModalOpen, setaddModalOpen] = useState(false)
    const [AddModalFlag, setAddModalFlag] = useState(0)
    const [count, setCount] = useState(0)
    const [getarry,setgetarry]=useState([])
    const [editFlag, setEditFalg] = useState(0) 
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
    
    useEffect(() => {        
        if (quaterlydata.length !== 0) {
            const arr = quaterlydata?.map((val) => {
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
                  // ima: val.ima,
                  sim_number: val.sim_number,
                  provider:val.provider,
                  providername:val.provider === 1 ? 'Vodafone Idea' : val.provider === 2 ? 'Airtel' : val.provider === 3 ? 'Jio' : 
                   val.provider === 4 ? 'Bsnl' : val.provider === 5 ? 'Reliance Communications' : val.provider === 6 ? 'Aircel' :
                   val.provider === 7 ? 'Tata Docomo' : val.provider === 8 ? 'BSNL Mobile' : val.provider === 9 ? 'MNTL' : 
                   val.provider === 10 ? 'Tata Teleservices' : val.provider === 11 ? 'Telenor India' :val.provider === 12 ? 'MTS India'  : 'NIL',
                  isssued_deligate: val.isssued_deligate,
                  issue_date: val.issue_date,
                  asset_no: val.asset_no,
                    // sim: val.sim,
                    // issue: val.issue,
                  tarrif: val.tarrif,
                  sim_status: val.sim_status,
                  issue_status:val.issue_status,
                  tarrifname: val.tarrif === 1 ? 'Monthly' : val.tarrif === 2 ? 'Quarterly' : val.tarrif === 3 ? 'Yearly' : 'NIL',
                  amount: val.amount, 
                  receiver_emp_id: val.receiver_emp_id,
                  sim_mobile_num: val.sim_mobile_num,
                  quaterly_slno: val.quaterly_slno,
                  bill_amount: val.bill_amount,
                  bill_date: val.bill_date,
                  bill_entered_date: val.bill_entered_date,
                  file_upload_status: val.file_upload_status,
                  payed_status: val.payed_status,
                  bill_number: val.bill_number,
                  bill_due_date: val.bill_due_date,
                  payed: val.payed,
                 }
                return obj
              })
          setTabledata(arr)
        }
    }, [quaterlydata])   

    
    const backtoSetting = useCallback(() => {       
        setBackdashboard(1)    
        setquarterly(0)
    }, [setBackdashboard,setquarterly])
    return (
        <CardMasterClose close={backtoSetting}>    
        {AddModalFlag === 1 ? <QuaterlyBillEditModal open={addModalOpen} handleClose={handleClose}
         setCount={setCount}
         count={count}
         getarry={getarry} editFlag={editFlag} /> : null}
           <CssVarsProvider>
           <Typography sx={{ fontWeight: 10, fontSize: 28, fontFamily: 'Anton',color:'#003060' }}>Quaterly Tarrif </Typography>
           <Paper variant="outlined" sx={{ maxHeight: 720,maxWidth:'100%', overflow: 'auto' }}>
                        <CssVarsProvider>
            <Table padding={"none"} stickyHeader
            hoverRow>
           <thead>
             <tr>             
             <th style={{width:70}}>Action</th>
              <th style={{ width: 50 }} >SlNo</th>
              <th  style={{width:150,}}>Device Name</th>  
              <th  style={{width:150,}} >Device Type</th>
              <th  style={{width:150,}}>Department</th>
              <th  style={{width:150,}}>Reciever Emp ID</th>
              <th  style={{width:150,}}>Reciever Name</th>
              <th  style={{width:150,}}>Sim Operator</th>
              <th  style={{width:150,}}>Sim Mobile No</th>                          
                    <th style={{ width: 150, }}>Tarrif Amount</th>
                    <th style={{ width: 150, }}>Bill Payed</th>
              <th  style={{width:150,}}>Bill Amount</th>
              <th  style={{width:150,}} >Bill Date</th>
              <th  style={{width:150,}} >Bill Due Date</th>
               <th style={{ width: 150, }}>Bill Number</th>
              
             </tr>
           </thead>          
           <tbody>  
                  {
                     tabledata.map((val, index) => {            
                      return <tr key={index}
                      style={{ height: 8, background: val.payed_status ===null ? '#ffebee' : 'transparent' }}>
               
                 <td><EditIcon sx={{ cursor: 'pointer',color:'#055C9D' }} size={6}  onClick={() => editForSelect(val)} /></td>
                 <td> {index + 1}</td>
                <td>{ val.device_name}</td>
                <td> {val.device_type_name}</td>
                <td> {val.dept_name}</td>
                <td> {val.receiver_emp_id}</td>
                <td> {val.reciver_name}</td> 
                <td> {val.providername}</td> 
                <td> {val.sim_mobile_num}</td>  
                 <td> {val.amount}</td>
                 <td> {val.payed}</td> 
                <td>{ val.bill_amount}</td>
                <td>{val.bill_date}</td>
                <td>{val.bill_due_date}</td>
                <td>{val.bill_number}</td>
               
                 </tr>
             })}
            </tbody>
            
            </Table>
                        </CssVarsProvider>
                    </Paper>
          

               </CssVarsProvider>
           </CardMasterClose>
    )
  }
export default memo(QuaterlyTariffView)