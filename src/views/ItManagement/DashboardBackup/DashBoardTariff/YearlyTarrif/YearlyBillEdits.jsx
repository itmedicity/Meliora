import React, { Fragment, useState,useCallback,useMemo ,memo  } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box,   } from '@mui/material'
import { CssVarsProvider, Typography } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';

const YearlyBillEdits = ({ open, handleClose, getarry, count, setCount, }) => {
    const {device_type_name, dept_name, reciver_name, bill_due_date, providername, amount, bill_date, bill_amount,
        bill_entered_date, file_upload_status, bill_number, yearly_slno, payed_status, device_name
    } = getarry
  

    const [billEditModal, setbillEditModal] = useState({
       
        billAmount: bill_amount,
        billDate: bill_date,
        billDueDate: bill_due_date,
        billNo:bill_number ,
        billPayedDate:bill_entered_date,
        fileUploadStatus:file_upload_status===1?true:false,
        billPayedStatus:payed_status===1?true:false,     
         
      })
   
       const {billAmount,billDate,billDueDate,billNo,billPayedDate,fileUploadStatus,billPayedStatus,}=billEditModal  
        
       const billEditModalUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setbillEditModal({ ...billEditModal, [e.target.name]: value })
        },
        [billEditModal],
    )
      
    const reset = () => {
        const formdata = {
          yearly_slno:'',
          bill_amount: '',
          bill_date: '',
          bill_due_date: '',
          bill_number:'' ,
          bill_entered_date: '',
          file_upload_status: false,
          payed_status:false,    
        }
        setbillEditModal(formdata)
    }

    const patchdata = useMemo(() => {
         
        return {
            yearly_slno:yearly_slno,
            bill_amount:billAmount,
            bill_date:billDate,
            bill_due_date: billDueDate,
            bill_number:billNo,
            bill_entered_date:billPayedDate,
            file_upload_status:fileUploadStatus === true ? 1 : 0,
            payed_status:billPayedStatus === true ? 1 : 0,  
       
      }
    }, [yearly_slno,billDate,billAmount,billDueDate,billNo,billPayedDate,fileUploadStatus,billPayedStatus])
    
    const submitModal = useCallback(
        (e) => {
            e.preventDefault()
              
         const UpdateTarrifModal = async (patchdata) => {
       
      const result = await axioslogin.patch('/tarrifDetails/updateYearlybillModal', patchdata)
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
            if (bill_amount !== '') { 
             
                UpdateTarrifModal(patchdata)
                setCount(count + 1)
                    reset()                
                         
            }
            else {
              infoNotify("Please  fill the fields")
          }
           
        },
      [patchdata, handleClose,bill_amount,setCount,count],
      )
  
  return (
    <Fragment  >
         
            <Dialog
                open={open}
                onClose={handleClose}            
                maxWidth="lg"           
                   >
                < DialogContent
                    sx={{
                        width: 600,
                        height: 590,
                        // backgroundColor: ' pink',             
                        
                    }} 
                    >                 
                                          
                    <Box sx={{
                        width: '100%', 
                        // borderRadius: 1, border: '0.1px solid #454545'
                    }}>
                    <Box id="alert-dialog-slide-descriptiona"
                        sx={{ fontWeight: 'bold', height: '50px', pt: 2, color: '#0074B7', textAlign: 'center', }}>
                                  Edit Yearly Bill Details
                    </Box>  
                  
                <Box sx={{
                    width: '100%',
                    height: '92%',                  
                    borderRadius: 1,
                    // backgroundColor:'pink',
                    // pt: 1, 
                    
                        }}>  
                         
                            {/* //////////////// */}
                            
                         <Box sx={{
                                //    flex:1,
                                width: '100%',
                                    height:'30%',
                                // backgroundColor:'lightgrey',
                                border: .5, borderColor: '#BBC8DE', borderRadius: 1.5,
                                ml:4,
                                margin: 'auto',
                               
                            }}>   
                      
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
                                <Typography sx={{ fontSize: 15 }}>Department</Typography>
                                    </CssVarsProvider>
                                    </Box>
                              
                                  <Box sx={{
                                    //   backgroundColor: 'red',
                                      flex: 1
                                  }}>
                                    <CssVarsProvider>
                                      <Typography sx={{ fontSize: 15 }}>:&nbsp;{dept_name}                                     
                                      </Typography>
                                      </CssVarsProvider>
                                      </Box>
                                </Box> 
                                <Box
                                  sx={{ pt: .5, display: 'flex',  }}>
                                  <Box sx={{flex:.3,pl:1}}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>Receiver Name</Typography>
                                    </CssVarsProvider>
                                    </Box>
                              
                                  <Box sx={{
                                    //   backgroundColor: 'red',
                                      flex: 1
                                  }}>
                                    <CssVarsProvider>
                                      <Typography sx={{ fontSize: 15 }}>:&nbsp;{reciver_name}                                     
                                      </Typography>
                                      </CssVarsProvider>
                                      </Box>
                                </Box> 
                                <Box
                                  sx={{ pt: .5, display: 'flex',  }}>
                                  <Box sx={{flex:.3,pl:1}}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>Sim Operator</Typography>
                                    </CssVarsProvider>
                                    </Box>
                              
                                  <Box sx={{
                                    //   backgroundColor: 'red',
                                      flex: 1
                                  }}>
                                    <CssVarsProvider>
                                      <Typography sx={{ fontSize: 15 }}>:&nbsp;{providername}                                     
                                      </Typography>
                                      </CssVarsProvider>
                                      </Box>
                                </Box>  
                                <Box
                                  sx={{ pt: .5, display: 'flex',  }}>
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
                                      <Typography sx={{ fontSize: 15 }}>:&nbsp;{amount}                                     
                                      </Typography>
                                      </CssVarsProvider>
                                      </Box>
                                </Box> 
                         
                               
                        
                         
                             
                                </Box>  
                                
                           
                                <Box sx={{
                                width: '100%',
                                height: '70%',
                                // backgroundColor:'red'
                                border: .5, borderColor: '#BBC8DE', borderRadius: 1.5,
                                // pt:2,
                                // margin: 'auto',
                                mt:.5,
                            }}> 
                  
                            <Box sx={{
                        width: "100%",
                        display: "flex",
                        // backgroundColor: 'orange',
                            // margin: 'auto',
                        pt:1
                      }}>
                         <Box
                        sx={{
                                      
                                            flex: .3,
                                            pt:.8,
                                            // backgroundColor: 'blue',
                                        ml:1
                                    }}>
                            <CssVarsProvider>
                                <Typography sx={{  fontSize: 15,  }}>Bill Amount</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box
                                  sx={{
                                    height: '25%', 
                                    flex: 1,
                                    pr:1
                                // pl:.2
                                // backgroundColor: 'red'
                                    }}>
                             <TextFieldCustom
                                placeholder="Bill Amount"
                                type="text"
                                size="sm"
                                name="billAmount"
                                value={billAmount}
                                onchange={billEditModalUpdate}
                            ></TextFieldCustom> 
                            </Box>                       
                            </Box>
                            <Box sx={{
                        width: "100%",
                        display: "flex",
                        // backgroundColor: 'orange',
                            margin: 'auto',
                        pt:.5
                      }}>
                         <Box
                        sx={{
                                       pt:1,
                                       flex: .3,
                                       ml:1,
                                                   // backgroundColor: 'blue'
                                    }}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15, }}>Bill Date</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box
                                    sx={{
                                        height: '25%', 
                                        flex: 1,
                                        pr:1
                                    // pl:.2
                                    // backgroundColor: 'red''
                                    }}>
                             <TextFieldCustom
                                // placeholder="Device No./Sim No."
                                type="date"
                                size="sm"
                                name="billDate"
                                value={billDate}
                                onchange={billEditModalUpdate}
                            ></TextFieldCustom> 
                            </Box>                       
                                </Box>
                                <Box sx={{
                        width: "100%",
                        display: "flex",
                        // backgroundColor: 'orange',
                            margin: 'auto',
                        pt:.5
                      }}>
                         <Box
                        sx={{
                                         pt:.8,
                                         flex: .3,
                                         ml:1,
                                                     // backgroundColor: 'blue'
                                    }}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>Bill Due Date</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box
                                    sx={{
                                        height: '25%', 
                                        flex: 1,
                                        pr:1
                                    // pl:.2
                                    // backgroundColor: 'red'
                                    }}>
                             <TextFieldCustom
                                // placeholder="Device No./Sim No."
                                type="date"
                                size="sm"
                                name="billDueDate"
                                value={billDueDate}
                                onchange={billEditModalUpdate}
                            ></TextFieldCustom> 
                            </Box>                       
                            </Box>
                        
                            <Box sx={{
                        width: "100%",
                        display: "flex",
                        // backgroundColor: 'orange',
                            margin: 'auto',
                        pt:.5
                      }}>
                         <Box
                        sx={{
                                       pt:.5,
                                       flex: .3,
                                       ml:1,
                                                   // backgroundColor: 'blue'
                                    }}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15, }}>Bill No.</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box
                                    sx={{
                                        height: '25%', 
                                        flex: 1,
                                        pr:1,
                                    // pt:.5
                                    // backgroundColor: 'red'
                                    }}>
                             <TextFieldCustom
                                placeholder="Bill Number"
                                type="text"
                                size="sm"
                                name="billNo"
                                value={billNo}
                                onchange={billEditModalUpdate}
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
                                        pt:1,
                                        flex: .3,
                                        ml:1,
                                                    // backgroundColor: 'blue'
                                    }}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15, }}>Bill Payed Date</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box
                                    sx={{
                                        height: '25%', 
                                            flex: 1,
                                            pr:1,
                                        pt:.5
                                        // backgroundColor: 'red'
                                    }}>
                             <TextFieldCustom
                                // placeholder="Device No./Sim No."
                                type="date"
                                size="sm"
                                name="billPayedDate"
                                value={billPayedDate}
                                onchange={billEditModalUpdate}
                            ></TextFieldCustom> 
                            </Box>                       
                        </Box>
                       
                        <Box sx={{flex:2,ml:1 ,mt:1,height:45,border:1,borderStyle:'dashed',borderColor:'#BBC8DE',pl:3,pt:1,mr:1}}>
      
                                 <Typography >
                                 <DriveFolderUploadIcon sx={{ color: '#145DA0', size: 'lg', width: 30, height: 30 }} />&nbsp;upload file </Typography>
                                                
                                            </Box>
                    
                        <Box sx={{
                            
                            // backgroundColor: 'lightgrey',
                            display: 'flex',
                            height: 30, width: 300,
                            pt: 1,                                    
                            pl:7,
                            margin: 'auto'
                                }} >
                            <Box sx={{ }} >
                            <CusCheckBox
                            color="primary"
                            size="md"
                            name="fileUploadStatus"
                            value={fileUploadStatus}
                            checked={fileUploadStatus}
                            onCheked={billEditModalUpdate}
                        ></CusCheckBox>
                                    </Box>
                                    &nbsp;
                                    <Box sx={{ flex: .7 }}>
                                
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>File Upload Status</Typography>
                            </CssVarsProvider>
                            </Box>
                            </Box>
                                  
                         
                       
                        
                               
                                  <Box sx={{
                            // backgroundColor: 'lightgrey',
                                    display: 'flex',
                                    height: 50,
                                    width: 300,
                                    pt: 1,
                                     pl:7,
                                    margin: 'auto'
                            
                                }} >
                            <Box >
                            <CusCheckBox
                           color="primary"
                            size="md"
                            name="billPayedStatus"
                            value={billPayedStatus}
                            checked={billPayedStatus}
                            onCheked={billEditModalUpdate}
                            ></CusCheckBox>
                               &nbsp;
                            </Box>
                            <Box  sx={{flex:.4,}}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15 }}>Payed Status</Typography>
                            </CssVarsProvider>
                            </Box>
                       
                        
                        </Box>
    
                       </Box>
                  
                    </Box>
                    
    
                </Box>
                
                </DialogContent>
                <DialogActions>
                        <Button 
                        onClick={submitModal}
                        sx={{color:"#0074B7",fontWeight:'bold'}}
                        >Save</Button>
                    <Button 
                        sx={{color:"#0074B7",fontWeight:'bold'}}
                        onClick={handleClose}
                        
                        >Cancel</Button>
                    </DialogActions>
            </Dialog>
        </Fragment >
  )
}

export default memo(YearlyBillEdits)