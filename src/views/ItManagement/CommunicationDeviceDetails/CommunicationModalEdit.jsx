import React, { Fragment, useState,useCallback,useMemo ,memo  } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box,   } from '@mui/material'
import { CssVarsProvider, Typography } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { useSelector } from 'react-redux';

const CommunicationModalEdit = ({ open, handleClose, getarry, count, setCount }) => {
    const id = useSelector((state) => {
        return state.LoginUserData.empid
       })
    const { device_type_name, dept_name, reciver_name,asset_no,device_num,tarrifname,
         providername, amount,  receiver_emp_id,sec_name,sim_number,device_ima,ima,sim_mobile_num,
    device_slno,issue_date,contact_no,issue_status,device_name
    } = getarry
    const [issueEditModal, setissueEditModal] = useState({
       
        recievID: receiver_emp_id,
        recievName: reciver_name,
        recievContact:contact_no,
        issuedDate: issue_date,
        issueStatus:issue_status===1?true:false,      
    })
    
    const { recievID, recievName, recievContact, issuedDate, issueStatus, } = issueEditModal

    const issueEditModalUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setissueEditModal({ ...issueEditModal, [e.target.name]: value })
        },
        [issueEditModal],
    )
    const reset = () => {
  
        const formdata = {
            device_slno: '',
            device_name: '',
            device_type_slno: '',
            department: '',
            location: '',
            reciver_name: '',
            contact_no: '',
            ima: '',
            sim_number: '',
            provider: '',
            issue_date: '', 
            asset_no: '',
            tarrif: '',
            amount: '',
            device_num: '',
            device_ima: '',
            sim_mobile_num:'',
            receiver_emp_id: '',                
            issue_status: false
        
        }
        setissueEditModal(formdata)
    }
    const patchdata = useMemo(() => {
        return {
            device_slno:device_slno,      
            receiver_emp_id: recievID,              
            reciver_name: recievName,
            contact_no: recievContact,
            issue_date: issuedDate,  
            issue_status: issueStatus === true ? 1 : 0,        
            edit_user: id
        }
      }, [
        device_slno,   
             
             id,recievID,recievName,recievContact,issuedDate,issueStatus
    ])
    const submitModal = useCallback(
        (e) => {
            e.preventDefault()
              
            const UpdateIssueModal = async (patchdata) => {
       
      const result = await axioslogin.patch('/communicationDeviceDetails/update', patchdata)
      const { message, success } = result.data
      if (success === 2) {
          succesNotify(message)
          reset()
        handleClose()
        setCount(count + 1)
      } else if (success === 0) {
        infoNotify(message)
      } else {
        infoNotify(message)
      }
        } 
            if (reciver_name !== '') { 
         
              UpdateIssueModal(patchdata)
                    reset()                
                         
            }
            else {
              infoNotify("Please  fill the fields")
          }
           
        },
      [patchdata, handleClose,reciver_name,setCount,count],
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
                width: 630,
                height: 730,
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
        //    pt:1,
        //     pl: 3,
            // backgroundColor:'#F5F5F5'
                }}>
                           
                                                 
                                     
                 
                           <Box sx={{
                            //    flex:1,
                            width: '100%',
                                // height:'30%',
                            // backgroundColor:'lightgrey',
                            border: .5, borderColor: '#9DBED1', borderRadius: 1,
                            // mt:.5,
                            // margin: 'auto',
                           
                    }}>
                            <CssVarsProvider>
                        <Typography sx={{ fontSize: 18 ,pl:1,color:'#274472',pt:1}}>Asseted location</Typography>
                              </CssVarsProvider>
                              <Box
                                  sx={{ pt: .5, display: 'flex',  }}>
                                  <Box sx={{flex:.3,pl:1}}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>Department</Typography>
                                    </CssVarsProvider>
                                    </Box>
                              
                                  <Box sx={{
                                      // backgroundColor: 'red',
                                      flex: 1
                                  }}>
                                    <CssVarsProvider>
                                      <Typography sx={{ fontSize: 15 }}>:&nbsp;
                                          {dept_name}
                                      </Typography>
                                      </CssVarsProvider>
                                      </Box>
                              </Box>  
                              <Box
                                  sx={{ pt: .5, display: 'flex',  }}>
                                  <Box sx={{flex:.3,pl:1}}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>Location</Typography>
                                    </CssVarsProvider>
                                    </Box>
                              
                                  <Box sx={{
                                    //   backgroundColor: 'red',
                                      flex: 1
                                  }}>
                                    <CssVarsProvider>
                                      <Typography sx={{ fontSize: 15 }}>:&nbsp;
                                          {sec_name}
                                      </Typography>
                                      </CssVarsProvider>
                                      </Box>
                              </Box>   
                            <CssVarsProvider>
                        <Typography sx={{ fontSize: 18 ,pl:1,pt:.5,color:'#274472'}}>Device details</Typography>
                              </CssVarsProvider>
                              <Box
                                  sx={{ pt: .5, display: 'flex',  }}>
                                  <Box sx={{flex:.3,pl:1}}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>Device name</Typography>
                                    </CssVarsProvider>
                                    </Box>
                              
                                  <Box sx={{
                                    //   backgroundColor: 'red',
                                      flex: 1
                                  }}>
                                    <CssVarsProvider>
                                      <Typography sx={{ fontSize: 15 }}>:&nbsp;
                                          {device_name}
                                      </Typography>
                                      </CssVarsProvider>
                                      </Box>
                              </Box>   
                              <Box
                                  sx={{ pt: .5, display: 'flex',  }}>
                                  <Box sx={{flex:.3,pl:1}}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>Device type</Typography>
                                    </CssVarsProvider>
                                    </Box>
                              
                                  <Box sx={{
                                    //   backgroundColor: 'red',
                                      flex: 1
                                  }}>
                                    <CssVarsProvider>
                                      <Typography sx={{ fontSize: 15 }}>:&nbsp;
                                          {device_type_name}
                                      </Typography>
                                      </CssVarsProvider>
                                      </Box>
                              </Box>  
                              <Box
                                  sx={{ pt: .5, display: 'flex',  }}>
                                  <Box sx={{flex:.3,pl:1}}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>Device Sl No./IM</Typography>
                                    </CssVarsProvider>
                                    </Box>
                              
                                  <Box sx={{
                                    //   backgroundColor: 'red',
                                      flex: 1
                                  }}>
                                    <CssVarsProvider>
                                      <Typography sx={{ fontSize: 15 }}>:&nbsp;
                                          {device_ima}
                                      </Typography>
                                      </CssVarsProvider>
                                      </Box>
                              </Box>    
                              <Box
                                  sx={{ pt: .5, display: 'flex',  }}>
                                  <Box sx={{flex:.3,pl:1}}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>Device No.</Typography>
                                    </CssVarsProvider>
                                    </Box>
                              
                                  <Box sx={{
                                    //   backgroundColor: 'red',
                                      flex: 1
                                  }}>
                                    <CssVarsProvider>
                                      <Typography sx={{ fontSize: 15 }}>:&nbsp;
                                          {device_num}
                                      </Typography>
                                      </CssVarsProvider>
                                      </Box>
                              </Box>   
                              
                              
                  
                
                            <CssVarsProvider>
                        <Typography sx={{ fontSize: 18 ,pl:1,color:'#274472'}}>Sim details</Typography>
                              </CssVarsProvider>
                              <Box
                                  sx={{ pt: .5, display: 'flex',  }}>
                                  <Box sx={{flex:.3,pl:1}}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>SIM Serial No./IMA</Typography>
                                    </CssVarsProvider>
                                    </Box>
                              
                                  <Box sx={{
                                    //   backgroundColor: 'red',
                                      flex: 1
                                  }}>
                                    <CssVarsProvider>
                                      <Typography sx={{ fontSize: 15 }}>:&nbsp;
                                          {ima}
                                      </Typography>
                                      </CssVarsProvider>
                                      </Box>
                              </Box>    
                              
                              <Box
                                  sx={{ pt: .5, display: 'flex',  }}>
                                  <Box sx={{flex:.3,pl:1}}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>SIM Number</Typography>
                                    </CssVarsProvider>
                                    </Box>
                              
                                  <Box sx={{
                                    //   backgroundColor: 'red',
                                      flex: 1
                                  }}>
                                    <CssVarsProvider>
                                      <Typography sx={{ fontSize: 15 }}>:&nbsp;
                                          {sim_number}
                                      </Typography>
                                      </CssVarsProvider>
                                      </Box>
                              </Box>  
                              
                              <Box
                                  sx={{ pt: .5, display: 'flex',  }}>
                                  <Box sx={{flex:.3,pl:1}}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>SIM Operator</Typography>
                                    </CssVarsProvider>
                                    </Box>
                              
                                  <Box sx={{
                                    //   backgroundColor: 'red',
                                      flex: 1
                                  }}>
                                    <CssVarsProvider>
                                      <Typography sx={{ fontSize: 15 }}>:&nbsp;
                                          {providername}
                                      </Typography>
                                      </CssVarsProvider>
                                      </Box>
                              </Box>     
                              <Box
                                  sx={{ pt: .5, display: 'flex',  }}>
                                  <Box sx={{flex:.3,pl:1}}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>Sim mobile No.</Typography>
                                    </CssVarsProvider>
                                    </Box>
                              
                                  <Box sx={{
                                    //   backgroundColor: 'red',
                                      flex: 1
                                  }}>
                                    <CssVarsProvider>
                                      <Typography sx={{ fontSize: 15 }}>:&nbsp;
                                          {sim_mobile_num}
                                      </Typography>
                                      </CssVarsProvider>
                                      </Box>
                              </Box>    
                              
                      
           
                        <Box sx={{
                width: "100%",
                display: "flex",
                // backgroundColor: 'orange',
                    margin: 'auto',
                // pt:.5
              }}>
                 
                
         
                    
                        </Box>
                        {/* </Box> */}
                  
            
             
                            <CssVarsProvider>
                        <Typography sx={{ fontSize: 18 ,pl:1,color:'#274472'}}>Tarrif details</Typography>
                              </CssVarsProvider>
                              <Box
                                  sx={{ display: 'flex',  }}>
                                  <Box sx={{flex:.3,pl:1}}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>Tarrif</Typography>
                                    </CssVarsProvider>
                                    </Box>
                              
                                  <Box sx={{
                                    //   backgroundColor: 'red',
                                      flex: 1
                                  }}>
                                    <CssVarsProvider>
                                      <Typography sx={{ fontSize: 15 }}>:&nbsp;
                                          {tarrifname}
                                      </Typography>
                                      </CssVarsProvider>
                                      </Box>
                              </Box>    
                              <Box
                                  sx={{  display: 'flex',  }}>
                                  <Box sx={{flex:.3,pl:1}}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>Amount</Typography>
                                    </CssVarsProvider>
                                    </Box>
                              
                                  <Box sx={{
                                    //   backgroundColor: 'red',
                                      flex: 1
                                  }}>
                                    <CssVarsProvider>
                                      <Typography sx={{ fontSize: 15 }}>:&nbsp;
                                          {amount}
                                      </Typography>
                                      </CssVarsProvider>
                                      </Box>
                              </Box>   
     
                    {/* </Box> */}
             
                            <CssVarsProvider>
                        <Typography sx={{ fontSize: 17 ,pl:1,color:'#274472'}}>Asset Number</Typography>
                              </CssVarsProvider>
                              <Box
                                  sx={{  display: 'flex',  }}>
                                  <Box sx={{flex:.3,pl:1}}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>Asset No.</Typography>
                                    </CssVarsProvider>
                                    </Box>
                              
                                  <Box sx={{
                                    //   backgroundColor: 'red',
                                      flex: 1
                                  }}>
                                    <CssVarsProvider>
                                      <Typography sx={{ fontSize: 15 }}>:&nbsp;
                                          {asset_no}
                                      </Typography>
                                      </CssVarsProvider>
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
                        name="recievID"
                        value={recievID}
                        onchange={issueEditModalUpdate}
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
                        name="recievName"
                        value={recievName}
                        onchange={issueEditModalUpdate}
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
                        name="recievContact"
                        value={recievContact}
                        onchange={issueEditModalUpdate}
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
                        name="issuedDate"
                        value={issuedDate}
                        onchange={issueEditModalUpdate}
                            ></TextFieldCustom>
                            </Box>
                            <Box sx={{display:'flex',pl:.5,pt:.5}}>
                    <CusCheckBox
                    color="primary"
                    size="md"
                    name="issueStatus"
                    value={issueStatus}
                    checked={issueStatus}
                    onCheked={issueEditModalUpdate}
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
                onClick={submitModal}
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


export default memo(CommunicationModalEdit)