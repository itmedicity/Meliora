import React, { Fragment, memo, useEffect,useState,useCallback,useMemo } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/material'
import { CssVarsProvider, Typography } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import ItCommunicationDeviceTypeSelect from 'src/views/CommonSelectCode/ItCommunicationDeviceTypeSelect';
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect';
import DeptSecUnderDept from 'src/views/CommonSelectCode/DeptSecUnderDept';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import TarrifDropDown from './TarrifDropDown';
import ProviderDropDown from './ProviderDropDown';
import { useSelector } from 'react-redux';




const ModalCommunicationDevice = ({ open, count, setCount, handleClose, getarry, editFlag 
     }) => {

     const id = useSelector((state) => {
        return state.LoginUserData.empid
       })
    const [deviceType, setDeviceType] = useState(0)
    const [department, setDepartment] = useState(0)
    const [location, setLocation] = useState(0)
    const [tarrif, setTarrif] = useState(0)
    const [provider,setProvider]=useState(0)



    const [communicationDeviceModal, setcommunicationDeviceModal] = useState({
      device_slno:'',
      reciver_name: '',
      contact_no: '',
      ima: '',
      sim_number: '', 
    //   isssued_deligate: '',
      issue_date: '',
      asset_no: '',    
        amount: '',
        device_ima:'',
        device_num: '',
        sim_mobile_num: '',
        receiver_emp_id: '',
        // issuerr_emp_id: '',
        device_name:'',
        issue_status: false,
        sim_status: false,
       
  })
    const { reciver_name, contact_no, ima, sim_number,   issue_date, asset_no, amount,
        issue_status, sim_status,device_ima,device_num,sim_mobile_num ,receiver_emp_id,device_name} = communicationDeviceModal
  
    
    
    
    useEffect(() => {

        if (getarry.length !== 0) {
            
            const { device_slno, device_type_slno, department, location, reciver_name, contact_no, ima, sim_number, provider,
                // isssued_deligate,
                issue_date, asset_no, tarrif, amount, issue_status, sim_status, device_ima, device_num, sim_mobile_num,
                receiver_emp_id,device_name } = getarry
                
                const frmdata = {
                    device_slno: device_slno,
                    reciver_name: reciver_name,
                    contact_no: contact_no,
                    ima: ima,
                    sim_number: sim_number,
                    // provider: provider,
                    // isssued_deligate: isssued_deligate,
                    issue_date: issue_date,
                    asset_no: asset_no,
                    // tarrif: tarrif,
                    amount: amount,
                    device_ima:device_ima,
                    device_num: device_num,
                    sim_mobile_num: sim_mobile_num,
                    receiver_emp_id: receiver_emp_id,
                    // issuerr_emp_id: issuerr_emp_id,
                    device_name:device_name,
                    issue_status:issue_status=== 1 ? true : false,
                    sim_status: sim_status === 1 ? true : false,
            }
            setcommunicationDeviceModal(frmdata)
            setDeviceType(device_type_slno)
            setDepartment(department) 
            setLocation(location)
            setTarrif(tarrif)
            setProvider(provider)

        }
        
    },[getarry,setDepartment,setDeviceType,setLocation])
  const DeviceTypeUpdate = useCallback(
      (e) => {
          const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
          setcommunicationDeviceModal({ ...communicationDeviceModal, [e.target.name]: value })
      },
      [communicationDeviceModal],
  )
  
    const reset = () => {
     
      const formdata = {
        device_slno: '',
        device_name: '',
        device_type_slno: '',
        department: '',
        location:'',         
        reciver_name: '',    
        contact_no: '',
        ima: '',
        sim_number: '',
        provider: '',
        issue_date:'',
        asset_no: '',
        tarrif: '',  
        amount: '',
        device_ima:'',
        device_num: '',
        sim_mobile_num: '',
        receiver_emp_id: '',
        issue_status: false,
        sim_status:false,
      }
      setcommunicationDeviceModal(formdata)
  }
  
    const postdata = useMemo(() => {
  
      return {
        
        reciver_name: reciver_name,
        contact_no: contact_no,
        ima:ima ,
        sim_number:sim_number,
        provider: provider,
        // isssued_deligate:isssued_deligate,
        issue_date: issue_date===null?new Date():issue_date,
        asset_no: asset_no,  
        tarrif: tarrif,
        amount:amount,
        device_type_slno: deviceType,
        department: department,
        location: location,
          device_ima:device_ima,
          device_num: device_num,
          sim_mobile_num:sim_mobile_num,
          receiver_emp_id:receiver_emp_id,
        //   issuerr_emp_id:issuerr_emp_id,
          device_name:device_name,
          issue_status: issue_status === true ? 1 : 0,
          sim_status: sim_status === true ? 1 : 0,
          create_user: id,
          edit_user:issue_status===1? id:null, 
      }
    }, [reciver_name, contact_no, ima, sim_number, provider,
        // isssued_deligate,
        issue_date, asset_no,
        tarrif, amount, deviceType, issue_status, sim_status, department, location,
        device_ima, device_num, sim_mobile_num, receiver_emp_id,  device_name,id])
    
  
    const submitDeviceType = useCallback(
  
      (e) => {
          e.preventDefault()
            const InsertDeviceType = async (postdata) => {
              
           
              const result = await axioslogin.post('/communicationDeviceDetails/insert', postdata)
              const { message, success } = result.data
              if (success === 1) {
                  succesNotify(message)
                  setCount(count + 1)
                 
                  handleClose()
                  reset()
               

              } else if (success === 0) {
                  infoNotify(message)
              } else {
                  infoNotify(message)
              }
          }
 
          

          if (device_name !== '') {            
              InsertDeviceType(postdata)
                  reset()           
              }                     
                   else {
              infoNotify("please enter the device name")
          }
            
         
      },
    [count,postdata, handleClose, device_name,setCount],
    )

    return (
    
    <Fragment  >
        {/* <ToastContainer />                */}
        <Dialog
            open={open}
            onClose={handleClose}            
            maxWidth="lg"
          
               >
            < DialogContent
                sx={{
                    width: 750,
                    height: 700,
                    // backgroundColor: ' pink',             
                    
                }}  
                >

                    
                    
                    
                <Box sx={{
                    width: '100%',
                    // height: '100%',
                    // borderRadius: 1, border: '0.1px solid #454545'
                }}>
                <Box id="alert-dialog-slide-descriptiona"
                    sx={{ fontWeight: 'bold', height: '50px', pt: 2, color: '#004F76', textAlign: 'center', }}>
                       Add Communication Device Details
                </Box>  
              
            <Box sx={{
                width: '100%',
                    height: '92%',
                    
                        borderRadius:1,
               pt:1,
            //     pl: 3,
                // backgroundColor:'#F5F5F5'
                    }}>
                                            
                                         
                      
                        <Box sx={{
                                //    flex:1,
                                width: '100%',
                                    height:'30%',
                                // backgroundColor:'lightgrey',
                                border: .5, borderColor: '#9DBED1', borderRadius: 1,
                            mt: .5,
                               
                                // margin: 'auto',
                               
                        }}>
                                <CssVarsProvider>
                            <Typography sx={{ fontSize: 17 ,pl:1,color:'#274472',}}>Asseted location</Typography>
                        </CssVarsProvider>
                    <Box sx={{
                    width: "100%",
                    display: "flex",
                    // backgroundColor: 'orange',
                        margin: 'auto',
                    pt:1
                  }}>
                    
                         
                    <Box
                                sx={{
                                height: '25%', 
                                flex: 1,
                                        pl: .5,
                                        pt: .5,
                                        pb:.5
                                        // pb:.5
                                    
                                    // backgroundColor: 'red'
                                }}>
                        <DepartmentSelect  value={department} setValue={setDepartment}/>
                        </Box>
                        <Box
                                sx={{
                                height: '25%', 
                                flex: 1,
                                 px: .5,
                                    pt:.5
                                    // backgroundColor: 'red'
                                }}>
                   <DeptSecUnderDept dept={department} value={location} setValue={setLocation}/>
                                </Box>
                        
                            </Box>
                        </Box>
                        <Box sx={{
                                //    flex:1,
                                width: '100%',
                                    // height:'30%',
                                // backgroundColor:'lightgrey',
                                border: .5, borderColor: '#9DBED1', borderRadius: 1,
                                mt:.5,
                                // margin: 'auto',
                               
                        }}>
                                <CssVarsProvider>
                            <Typography sx={{ fontSize: 17 ,pl:1,color:'#274472'}}>Device details</Typography>
                            </CssVarsProvider>
                          
                    <Box sx={{
                    width: "100%",
                    display: "flex",
                    // backgroundColor: 'orange',
                        margin: 'auto',
                    pt:1
                  }}>
                  
                                        <Box
                                sx={{
                                height: '25%', 
                                flex: 1,
                                        pl: .5,
                                    pb:.5
                                    // backgroundColor: 'red'
                                }}>
                     <TextFieldCustom
                            placeholder="Device Name"
                            type="text"
                            size="sm"
                            name="device_name"
                            value={device_name}
                            onchange={DeviceTypeUpdate}
                        ></TextFieldCustom>
                            </Box>
                    <Box
                                sx={{
                                height: '25%', 
                                flex: 1,
                                        px: .5,
                                    pt:1
                                    // backgroundColor: 'red'
                                }}>
                         <ItCommunicationDeviceTypeSelect value={deviceType} setValue={setDeviceType}/>
                        </Box>
                     
                        
                            </Box>
                            <Box sx={{
                    width: "100%",
                    display: "flex",
                    // backgroundColor: 'orange',
                        margin: 'auto',
                    // pt:.5
                  }}>
                    
                                        <Box
                                sx={{
                                height: '25%', 
                                flex: 1,
                                        pl: .5,
                                    pb:.5
                                    // backgroundColor: 'red'
                                }}>
                     <TextFieldCustom
                            placeholder="Device Sl No./IMA"
                            type="text"
                            size="sm"
                            name="device_ima"
                            value={device_ima}
                            onchange={DeviceTypeUpdate}
                        ></TextFieldCustom>
                            </Box>
                  
                        <Box
                                sx={{
                                height: '25%', 
                                flex: 1,
                                        px: .5,
                                    // pr:.5
                                    // backgroundColor: 'red'
                                }}>
                     <TextFieldCustom
                            placeholder="Device No."
                            type="text"
                            size="sm"
                            name="device_num"
                            value={device_num}
                            onchange={DeviceTypeUpdate}
                        ></TextFieldCustom>
                                </Box>
                        
                            </Box>
                            </Box>
                        <Box sx={{
                                //    flex:1,
                                width: '100%',
                                    // height:'30%',
                                // backgroundColor:'lightgrey',
                                border: .5, borderColor: '#9DBED1', borderRadius: 1,
                                mt:.5,
                                // margin: 'auto',
                               
                        }}>
                                <CssVarsProvider>
                            <Typography sx={{ fontSize: 17 ,pl:1,color:'#274472'}}>Sim details</Typography>
                            </CssVarsProvider>
                          
                    <Box sx={{
                    width: "100%",
                    display: "flex",
                    // backgroundColor: 'orange',
                        margin: 'auto',
                    pt:1
                  }}>
                    
                                        <Box
                                sx={{
                                height: '25%', 
                                flex: 1,
                                        pl: .5,
                                        pb: .5,
                                 
                                    // backgroundColor: 'red'
                                }}>
                     <TextFieldCustom
                            placeholder="SIM Serial No./IMA"
                            type="text"
                            size="sm"
                            name="ima"
                            value={ima}
                            onchange={DeviceTypeUpdate}
                        ></TextFieldCustom>
                            </Box>
                    <Box
                                sx={{
                                height: '25%', 
                                flex: 1,
                                    px:.5,
                                    // backgroundColor: 'red'
                                }}>
                        <TextFieldCustom
                            placeholder=" SIM Number"
                            type="text"
                            size="sm"
                            name="sim_number"
                            value={sim_number}
                            onchange={DeviceTypeUpdate}
                        ></TextFieldCustom> 
                        </Box>
                     
                        
                            </Box>
                            <Box sx={{
                    width: "100%",
                    display: "flex",
                    // backgroundColor: 'orange',
                        margin: 'auto',
                    // pt:.5
                  }}>
                     
                                        <Box
                                sx={{
                                height: '25%', 
                                flex: 1,
                                        pl: .5,
                                        pt:.5,
                                    pb:.5
                                    // backgroundColor: 'red'
                                }}>
                       <ProviderDropDown
                                value={provider}
                                setValue={setProvider}/>
                            </Box>
                  
                        <Box
                                sx={{
                                height: '25%', 
                                flex: 1,
                                        px: .5,
                                    // pr:.5
                                    // backgroundColor: 'red'
                                }}>
                     <TextFieldCustom
                            placeholder="SIM mobile No."
                            type="text"
                            size="sm"
                            name="sim_mobile_num"
                            value={sim_mobile_num}
                            onchange={DeviceTypeUpdate}
                        ></TextFieldCustom>
                                </Box>
                        
                            </Box>
                            </Box>
                       {/* ///////// */}
                  
                        {/* ///////////// */}
                
                      
                        <Box sx={{
                                //    flex:1,
                                width: '100%',
                                    height:'30%',
                                // backgroundColor:'lightgrey',
                                border: .5, borderColor: '#9DBED1', borderRadius: 1,
                                mt:.5,
                                // margin: 'auto',
                               
                        }}>
                                <CssVarsProvider>
                            <Typography sx={{ fontSize: 16 ,pl:1,color:'#274472'}}>Tarrif details</Typography>
                        </CssVarsProvider>
                    <Box sx={{
                    width: "100%",
                    display: "flex",
                    // backgroundColor: 'orange',
                        margin: 'auto',
                    pt:1
                  }}>
                    
                         
                    <Box
                                sx={{
                                height: '25%', 
                                flex: 1,
                                        pl: .5,
                                        pt: 1.5,
                                        // pb:.5
                                        // pb:.5
                                    
                                    // backgroundColor: 'red'
                                }}>
                          
                          <TarrifDropDown value={tarrif} setValue={setTarrif}/>
                        </Box>
                        <Box
                                sx={{
                                height: '25%', 
                                flex: 1,
                                 px: .5,
                                py: .5
                                    
                                    // backgroundColor: 'red'
                                }}>
                  <TextFieldCustom
                            placeholder=" Amount. Rs."
                            type="text"
                            size="sm"
                            name="amount"
                            value={amount}
                            onchange={DeviceTypeUpdate}
                        ></TextFieldCustom>
                                </Box>
                        
                            </Box>
                        </Box>
                 
                        <Box sx={{
                                //    flex:1,
                                width: '100%',
                                    height:'30%',
                                // backgroundColor:'lightgrey',
                                border: .5, borderColor: '#9DBED1', borderRadius: 1,
                                mt:.5,
                                // margin: 'auto',
                               
                        }}>
                                <CssVarsProvider>
                            <Typography sx={{ fontSize: 17 ,pl:1,color:'#274472'}}>Asset Number</Typography>
                        </CssVarsProvider>
                    <Box sx={{
                    width: "100%",
                    display: "flex",
                    // backgroundColor: 'orange',
                        margin: 'auto',
                    pt:1
                  }}>                    
                         
                  
                        <Box
                                sx={{
                                height: '25%', 
                                flex: 1,
                                 px: .5,
                                        pb: .8
                                    
                                    // backgroundColor: 'red'
                                }}>
 <TextFieldCustom
                            placeholder="Asset No."
                            type="text"
                            size="sm"
                            name="asset_no"
                            value={asset_no}
                            onchange={DeviceTypeUpdate}
                        ></TextFieldCustom>
                                </Box>
                        
                            </Box>
                        </Box>
                   
                        <Box sx={{
                                //    flex:1,
                                width: '100%',
                                    // height:'30%',
                                // backgroundColor:'lightgrey',
                                border: .5, borderColor: '#9DBED1', borderRadius: 1,
                                mt:.5,
                                // margin: 'auto',
                               
                        }}>
                                <CssVarsProvider>
                            <Typography sx={{ fontSize: 17 ,pl:1,color:'#274472'}}>Recievers details</Typography>
                        </CssVarsProvider>
                    <Box sx={{
                    width: "100%",
                    display: "flex",
                    // backgroundColor: 'orange',
                        margin: 'auto',
                    pt:1
                  }}>
                     
                                        <Box
                                sx={{
                                height: '25%', 
                                flex: .5,
                                        pl: .5,
                                    pb:.5
                                    // backgroundColor: 'red'
                                }}>
                     <TextFieldCustom
                            placeholder="Emp.ID"
                            type="text"
                            size="sm"
                            name="receiver_emp_id"
                            value={receiver_emp_id}
                            onchange={DeviceTypeUpdate}
                        ></TextFieldCustom>
                            </Box>
                    <Box
                                sx={{
                                height: '25%', 
                                flex: 1,
                                    pl:.5,
                                    // backgroundColor: 'red'
                                }}>
                        <TextFieldCustom
                            placeholder=" Name"
                            type="text"
                            size="sm"
                            name="reciver_name"
                            value={reciver_name}
                            onchange={DeviceTypeUpdate}
                        ></TextFieldCustom> 
                        </Box>
                        <Box
                                sx={{
                                height: '25%', 
                                flex: 1,
                                        px: .5,
                                    // pr:.5
                                    // backgroundColor: 'red'
                                }}>
                     <TextFieldCustom
                            placeholder="Contact No"
                            type="text"
                            size="sm"
                            name="contact_no"
                            value={contact_no}
                            onchange={DeviceTypeUpdate}
                        ></TextFieldCustom>
                                </Box>
                        
                            </Box>
                        </Box>
                        <Box sx={{
                                //    flex:1,
                                width: '100%',
                                    // height:'30%',
                                // backgroundColor:'lightgrey',
                                border: .5, borderColor: '#9DBED1', borderRadius: 1,
                                mt:.5,
                                // margin: 'auto',
                               
                        }}>
                                <CssVarsProvider>
                            <Typography sx={{ fontSize: 17,pl:1,color:'#274472'}}>Issued details</Typography>
                        </CssVarsProvider>
                    <Box sx={{
                    width: "100%",
                    display: "flex",
                    // backgroundColor: 'orange',
                        margin: 'auto',
                    pt:1
                  }}>
                
                                
                        <Box
                                sx={{
                                height: '25%', 
                                flex: 1,
                                        px: .5,
                                    pb:.5
                                    // backgroundColor: 'red'
                                }}>
                            <TextFieldCustom
                            // placeholder="Contact No."
                            type="date"
                            size="sm"
                            name="issue_date"
                            value={issue_date}
                            onchange={DeviceTypeUpdate}
                                ></TextFieldCustom>
                                </Box>
                                <Box sx={{display:'flex',pl:.5,pt:.5}}>
                        <CusCheckBox
                        color="primary"
                        size="md"
                        name="issue_status"
                        value={issue_status}
                        checked={issue_status}
                        onCheked={DeviceTypeUpdate}
                    ></CusCheckBox>
                        </Box>
                                <Box sx={{ flex: .9,pl:.5 }}>
                                    
                        <CssVarsProvider>
                            <Typography sx={{ fontSize: 15 }}>Issued Status</Typography>
                        </CssVarsProvider>
                        </Box>
                       


                        
                            </Box>
                        </Box>
          
                    {/* <Box sx={{
                        // backgroundColor: 'orange',
                        display: 'flex', height: 50, width: 400,
                        pt:1,
                        margin: 'auto'
                    }} >
                        <Box sx={{ flex: .3 ,}}>
                            
                        <CssVarsProvider>
                            <Typography sx={{ fontSize: 15 }}>Sim Status</Typography>
                        </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: .4 ,}} >
                        <CusCheckBox
                        color="primary"
                        size="md"
                        name="sim_status"
                        value={sim_status}
                        checked={sim_status}
                        onCheked={DeviceTypeUpdate}
                    ></CusCheckBox>
                        </Box>
                        <Box  sx={{flex:.3,}}>
                        <CssVarsProvider>
                            <Typography sx={{ fontSize: 15 }}>Issued Status</Typography>
                        </CssVarsProvider>
                        </Box>
                        <Box sx={{flex:.3}}>
                        <CusCheckBox
                        color="primary"
                        size="md"
                        name="issue_status"
                        value={issue_status}
                        checked={issue_status}
                        onCheked={DeviceTypeUpdate}
                    ></CusCheckBox>
                        </Box>
                    
                    </Box> */}

                   </Box>
              
                
                

                    </Box>
            </DialogContent>
            <DialogActions>
                    <Button 
                    onClick={submitDeviceType}
                    sx={{color:"#004F76",fontWeight:'bold'}}
                    >Save</Button>
                <Button 
                    sx={{color:"#004F76",fontWeight:'bold'}}
                    onClick={handleClose}
                    
                    >Cancel</Button>
                </DialogActions>
        </Dialog>
    </Fragment >
)
}

export default memo(ModalCommunicationDevice)