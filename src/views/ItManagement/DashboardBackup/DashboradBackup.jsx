import React, { useCallback, useState,useEffect } from 'react'
import { Box, Button, Grid, Typography, CssVarsProvider } from '@mui/joy'
import { Paper } from '@mui/material'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TarrifMonthlyDetails from './TarrifDashboard/TarrifMonthlyDetails'
import ViewListIcon from '@mui/icons-material/ViewList';
import TarrifQuaterlyDetails from './TarrifDashboard/TarrifQuaterlyDetails'
import TarrifYearlyDetails from './TarrifDashboard/TarrifYearlyDetails'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import MonthlyPendingBill from './DashBoardTariff/MonthlyTarrif/MonthlyPendingBill';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import QuaterlyPendingBill from './DashBoardTariff/QuaterlyTarrif/QuaterlyPendingBill';
import YearlyPendingBillView from './DashBoardTariff/YearlyTarrif/YearlyPendingBillView';
// import { startOfMonth } from 'date-fns';
// import { format } from 'date-fns'
const DashboradBackup = () => {
  const [monthly, setmonthly] = useState(0);
  const [quaterly, setquarterly] = useState(0);
  const [yearly, setyearly] = useState(0);
  const [monthlyPendingBill, setmonthlyPendingBill] = useState(0);
  const [quaterlyPendingBill, setquaterlyPendingBill] = useState(0);
  const [yearlyPendingBill, setyearlyPendingBill] = useState(0);
  const history = useHistory()
  const [backtoDashboard, setBackdashboard] = useState(1)
  const [monlhlycount, setmonthlyCount] = useState([])
  const [quaterlycount, setquaterlycount] = useState([])
  const [yearlycount, setyearlycount] = useState([])
  const [count, setCount] = useState(0)
  

  const ViewMonthlyList = useCallback((e) => {
    setmonthly(1);
    setquarterly(0);
    setyearly(0);
    setmonthlyPendingBill(0);
    setquaterlyPendingBill(0);
    setyearlyPendingBill(0);

  }, [])
  const ViewQuaterlyList = useCallback((e) => {
    setquarterly(1);
    setmonthly(0);
    setyearly(0);
    setmonthlyPendingBill(0);
    setquaterlyPendingBill(0);
    setyearlyPendingBill(0);

  }, [])
  const ViewYearlyList = useCallback((e) => {
    setyearly(1);
    setmonthly(0);
    setquarterly(0);
    setmonthlyPendingBill(0);
    setquaterlyPendingBill(0);
    setyearlyPendingBill(0);
  }, [])

  const MonthlyPendingBillList = useCallback((e) => {
    setyearly(0);
    setmonthly(0);
    setquarterly(0);
    setmonthlyPendingBill(1);
    setquaterlyPendingBill(0);
    setyearlyPendingBill(0);
  }, [])
  const QuaterlyPendingBillList = useCallback((e) => {
  
    setyearly(0);
    setmonthly(0);
    setquarterly(0);
    setquaterlyPendingBill(1)
    setmonthlyPendingBill(0)
    setyearlyPendingBill(0)
  }, [])
  const YearlyPendingBillList = useCallback((e) => {
    
    setyearly(0);
    setmonthly(0);
    setquarterly(0);
    setquaterlyPendingBill(0)
    setmonthlyPendingBill(0)
    setyearlyPendingBill(1)
        
  }, [])
    
  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])
    

 




  useEffect(() => {
          
    const getMonthlyTarrif = async () => {
        const result = await axioslogin.get('tarrifDetails/MonthlyPendingBillView')
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
           }
            return obj
          })
          setmonthlyCount(arr)
        } else {
          warningNotify('error occured')
        }
      }
      const getQuaterlyTarrif = async () => {
        const result = await axioslogin.get('tarrifDetails/quaterlyPendingBillView')
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
           }
            return obj
          })
          setquaterlycount(arr)
        } else {
          warningNotify('error occured')
        }
      }
      const getYearlyTarrif = async () => {
        const result = await axioslogin.get('tarrifDetails/yearlyPendingBillView')
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
           }
            return obj
          })
          setyearlycount(arr)
        } else {
          warningNotify('error occured')
        }
    }
      getMonthlyTarrif() 
      getQuaterlyTarrif()
      getYearlyTarrif()
  }, [count])
    
    
  return (                         
                       
      <Paper>
          
          {
              monthly === 1 ? <TarrifMonthlyDetails setBackdashboard={setBackdashboard} setmonthly={setmonthly} />:                  
              quaterly === 1 ? <TarrifQuaterlyDetails setBackdashboard={setBackdashboard} setquarterly={setquarterly} /> :
              yearly === 1 ? <TarrifYearlyDetails setBackdashboard={setBackdashboard} setyearly={setyearly} /> :
              monthlyPendingBill === 1 ? <MonthlyPendingBill setBackdashboard={setBackdashboard}
                             setmonthlyPendingBill={setmonthlyPendingBill} monlhlycount={monlhlycount}                
                              setCount={setCount}
                              count={count} /> :
              quaterlyPendingBill === 1 ? <QuaterlyPendingBill setBackdashboard={setBackdashboard}
                              setquaterlyPendingBill={setquaterlyPendingBill} quaterlycount={quaterlycount}
                              setCount={setCount}
                              count={count} /> :
              yearlyPendingBill === 1 ? <YearlyPendingBillView setBackdashboard={setBackdashboard}
                              setyearlyPendingBill={setyearlyPendingBill} yearlycount={yearlycount}
                              setCount={setCount}
                              count={count} /> :
              backtoDashboard===1?                        
                <CardMasterClose title={'DashBoard'}
                 close={backtoSetting}>
              
           
  
       <Box sx={{ display: 'flex' ,flex:1}}>
       <Grid sx={{ p: 1 }} container spacing={2}>                                        
           <Grid sx={{width:400 ,}}>           
             <Paper                                                   
                variant="outlined"
                sx={{
                display: 'flex',
                flexDirection: 'column',
                 p: 1,
                 width: '100%',
                 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                     <Box
                     sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#BBC8DE',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0.7,
                    }}>
                   <CalendarMonthIcon/>                                                        
                    </Box>
                    <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    }}>
                   <Box
                    sx={{
                    padding: '4px',
                    borderRadius: '8px',
                    marginRight: 'auto',
                    }}>
                    <Typography sx={{ fontSize: 20 ,color:'#055C9D'}}>Monthly Tarrif</Typography>
                    </Box>
                    </Box>
                    <Box><CssVarsProvider>
                    <Button variant="outlined"
                    sx={{ fontWeight: 'bold', fontSize: 18, color: '#D01110', cursor: 'pointer' }}
                    onClick={(e) => {
                    MonthlyPendingBillList(e)
                    }}>
                    {monlhlycount.length}
                    </Button>
                    </CssVarsProvider></Box>
                    </Box> 
                    <Box
                    sx={{
                    display: 'flex',
                    borderTop: 2,
                    borderColor: '#BBC8DE',
                    marginTop: 3,
                    alignItems: 'center',
                    cursor: 'pointer',                                                           
                    }}
                    onClick={(e) => {
                    ViewMonthlyList(e)
                    }}>
                    <Box sx={{ p: 1, mt: 1 ,display:'flex'}}>
                    <Typography sx={{ color: '#04425B' }}>view</Typography>
                    <ViewListIcon sx={{color:'#055C9D'}} />
                    </Box>
                    <Box sx={{ ml: 1, mt: 1 }}></Box>
                </Box>
                </Paper>
            </Grid>                                         
        </Grid>
        <Grid sx={{ p: 1 }} container spacing={2}>                                         
           <Grid sx={{width:400,ml:5}}>
           
                                     <Paper
                                                     // key={index}
                                                     variant="outlined"
                                                     sx={{
                                                         display: 'flex',
                                                         flexDirection: 'column',
                                                         p: 1,
                                                         width: '100%',
                                                     }}
                                                 >
                                                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                         <Box
                                                             sx={{
                                                                 width: 40,
                                                                 height: 40,
                                                                 backgroundColor: '#BBC8DE',
                                                                 borderRadius: '50%',
                                                                 display: 'flex',
                                                                 justifyContent: 'center',
                                                                 alignItems: 'center',
                                                                 opacity: 0.7,
                                                             }}
                 >
                   <CalendarMonthIcon/>
                                                            
                                                         </Box>
                                                         <Box
                                                             sx={{
                                                                 display: 'flex',
                                                                 flexDirection: 'row',
                                                                 alignItems: 'center',
                                                                 flex: 1,
                                                             }}
                                                         >
                                                             <Box
                                                                 sx={{
                                                                     padding: '4px',
                                                                     borderRadius: '8px',
                                                                     marginRight: 'auto',
                                                                 }}
                                                             >
                     <Typography sx={{ fontSize: 20 ,color:'#055C9D'}}>
                   Quarterly Tarrif
                     </Typography>
                                                             </Box>
                                                         </Box>
                                                         <Box
                                                       
                                                       >
                                                      
                                                            <CssVarsProvider>
                                                            <Button variant="outlined"
                                                            sx={{ fontWeight: 'bold', fontSize: 18, color: '#D01110', cursor: 'pointer' }}
                                                            onClick={(e) => {
                                                              QuaterlyPendingBillList(e)
                                                              }}>
                                                              {quaterlycount.length}
                                                                </Button>
                                                                </CssVarsProvider>
                                                       </Box>
                                                     </Box>
 
                                                     <Box
                                                         sx={{
                                                             display: 'flex',
                                                             borderTop: 2,
                                                             borderColor: '#BBC8DE',
                                                             marginTop: 3,
                                                             alignItems: 'center',
                                                           cursor: 'pointer',
                                                             // backgroundColor:'red'
                                                         }}
                                                         onClick={(e) => {
                                                             ViewQuaterlyList(e)
                                                         }}
                                                     >
                                                         <Box sx={{ p: 1, mt: 1 ,display:'flex'}}>
                       <Typography sx={{ color: '#04425B' }}>view</Typography>
                     <ViewListIcon  sx={{color:'#055C9D'}} />
                                                         </Box>
                                                         <Box sx={{ ml: 1, mt: 1 }}>
                                                            
                                                         </Box>
                                                     </Box>
                                                 </Paper>
                                             </Grid>
                                         {/* ))} */}
                                     </Grid>
                                     <Grid sx={{ p: 1 }} container spacing={2}>
                                        
           <Grid sx={{width:400,ml:5}}
             
           >
           
                                     <Paper
                                                     // key={index}
                                                     variant="outlined"
                                                     sx={{
                                                         display: 'flex',
                                                         flexDirection: 'column',
                                                         p: 1,
                                                         width: '100%',
                                                     }}
                                                 >
                                                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                         <Box
                                                             sx={{
                                                                 width: 40,
                                                                 height: 40,
                                                                 backgroundColor: '#BBC8DE',
                                                                 borderRadius: '50%',
                                                                 display: 'flex',
                                                                 justifyContent: 'center',
                                                                 alignItems: 'center',
                                                                 opacity: 0.7,
                                                             }}
                 >
                   <CalendarMonthIcon/>
                                                            
                                                         </Box>
                                                         <Box
                                                             sx={{
                                                                 display: 'flex',
                                                                 flexDirection: 'row',
                                                                 alignItems: 'center',
                                                                 flex: 1,
                                                             }}
                                                         >
                                                             <Box
                                                                 sx={{
                                                                     padding: '4px',
                                                                     borderRadius: '8px',
                                                                     marginRight: 'auto',
                                                                 }}
                                                             >
                     <Typography sx={{ fontSize: 20 ,color:'#055C9D'}}>
                    Yearly Tarrif
                     </Typography>
                                                             </Box>
                                                         </Box>
                                                         <Box
                                                       
                                                       >
                                                      
                                                            <CssVarsProvider>
                                                            <Button variant="outlined"
                                                            sx={{ fontWeight: 'bold', fontSize: 18, color: '#D01110', cursor: 'pointer' }}
                                                            onClick={(e) => {
                                                              YearlyPendingBillList(e)
                                                                }}>
                                                                {yearlycount.length}

                                                                </Button>
                                                                </CssVarsProvider>
                                                       </Box>
                                                     </Box>
 
                                                     <Box
                                                         sx={{
                                                             display: 'flex',
                                                             borderTop: 2,
                                                             borderColor: '#BBC8DE',
                                                             marginTop: 3,
                                                             alignItems: 'center',
                                              cursor: 'pointer',
                                                             // backgroundColor:'red'
                                                         }}
                                                         onClick={(e) => {
                                                             ViewYearlyList(e)
                                                         }}
                                                     >
                                                         <Box sx={{ p: 1, mt: 1 ,display:'flex'}}>
                       <Typography sx={{ color: '#04425B' }}>view</Typography>
                     <ViewListIcon sx={{color:'#055C9D'}} />
                                                         </Box>
                                                         <Box sx={{ ml: 1, mt: 1 }}>
                                                             {/* <IconButton size="small" color="success">
                                                                 <ArrowRightAltIcon />
                                                             </IconButton> */}
                                                         </Box>
                                                     </Box>
                                                 </Paper>
                                             </Grid>
                                         {/* ))} */}
                                     </Grid>
      
      
        
         </Box>
       
           
             
         </CardMasterClose>         
                      
             :null     
          }
          



        </Paper>
    
  )
}

export default DashboradBackup