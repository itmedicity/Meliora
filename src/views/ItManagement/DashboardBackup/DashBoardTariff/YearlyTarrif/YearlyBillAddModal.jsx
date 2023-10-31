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

const YearlyBillAddModal = ({ open, handleClose, getarry, count, setCount, }) => {
    const { device_type_name, dept_name, reciver_name,providername, amount,device_name,yearly_slno}=getarry
        const [billAddModal, setbillAddModal] = useState({
            yearly_slno:'',    
            bill_amount: '',
            bill_date: '',
            bill_due_date: '',
            bill_number:'' ,
            bill_entered_date: '',
            file_upload_status: false,
            payed_status:false,  
     
         
      })
    const { bill_amount,bill_date,bill_due_date,bill_number,bill_entered_date,file_upload_status,payed_status
          } = billAddModal
      
       
      const billAddModalUpdate = useCallback(
          (e) => {
              const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
              setbillAddModal({ ...billAddModal, [e.target.name]: value })
          },
          [billAddModal],
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
          setbillAddModal(formdata)
      }
      
      const patchdata = useMemo(() => {
         
        return {
            yearly_slno:yearly_slno,
            bill_amount: bill_amount,
            bill_date: bill_date,
            bill_due_date: bill_due_date,
            bill_number:bill_number ,
            bill_entered_date: bill_entered_date,
            file_upload_status: file_upload_status === true ? 1 : 0,
            payed_status:payed_status === true ? 1 : 0,  
       
      }
    }, [yearly_slno,  bill_date,bill_due_date,bill_number,bill_entered_date,file_upload_status,payed_status,bill_amount])
    
       const submitModal = useCallback(
        (e) => {
            e.preventDefault()
              
            const InsertTarrifModal = async (patchdata) => {
     
      const result = await axioslogin.patch('/tarrifDetails/updateYearlybillModal', patchdata)
      const { message, success } = result.data
      if (success === 2) {
          succesNotify(message)
          reset()
        handleClose()
        setCount(count - 1)
      } else if (success === 0) {
        infoNotify(message)
      } else {
        infoNotify(message)
      }
        } 
            if (bill_amount !== '') { 
             
              InsertTarrifModal(patchdata)
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
                height: 550,
                // backgroundColor: ' pink',             
                
            }}  
            >                 
                                  
            <Box sx={{
                width: '100%', 
                // borderRadius: 1, border: '0.1px solid #454545'
            }}>
            <Box id="alert-dialog-slide-descriptiona"
                sx={{ fontWeight: 'bold', height: '50px', pt: 2, color: '#0074B7', textAlign: 'center', }}>
                          Add Yearly Bill Details
            </Box>  
          
        <Box sx={{
            width: '100%',
            height: '92%',                  
            borderRadius: 1,
            // backgroundColor:'pink',
            // pt: 1, 
            
                }}>  
                 
                    
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
                        <Typography sx={{ fontSize: 15,  }}>Bill Amount </Typography>
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
                        name="bill_amount"
                        value={bill_amount}
                        onchange={billAddModalUpdate}
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
                        <Typography sx={{ fontSize: 15, }}>Bill Date</Typography>
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
                        name="bill_date"
                        value={bill_date}
                        onchange={billAddModalUpdate}
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
                        <Typography sx={{ fontSize: 15}}>Bill Due Date</Typography>
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
                        name="bill_due_date"
                        value={bill_due_date}
                        onchange={billAddModalUpdate}
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
                        <Typography sx={{ fontSize: 15, }}>Bill No.</Typography>
                    </CssVarsProvider>
                </Box>
                <Box
                            sx={{
                                height: '25%', 
                                flex: 1,
                                pr:1
                                // backgroundColor: 'red'
                            }}>
                     <TextFieldCustom
                        placeholder="Bill Number"
                        type="text"
                        size="sm"
                        name="bill_number"
                        value={bill_number}
                        onchange={billAddModalUpdate}
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
                                    ml: 1,
                                           
                                                    //    backgroundColor: 'blue'
                            }}>
                    <CssVarsProvider>
                        <Typography sx={{ fontSize: 15, }}>Bill Payed Date</Typography>
                    </CssVarsProvider>
                </Box>
                <Box
                            sx={{
                                height: '25%', 
                                flex: 1,
                                    pr: 1,
                                pt:.5
                            }}>
                     <TextFieldCustom
                        // placeholder="Device No./Sim No."
                        type="date"
                        size="sm"
                        name="bill_entered_date"
                        value={bill_entered_date}
                        onchange={billAddModalUpdate}
                    ></TextFieldCustom> 
                    </Box>                       
                </Box>
               
                    <Box sx={{flex:2,ml:1 ,mt:1,height:45,border:1.5,borderStyle:'dashed',borderColor:'#BBC8DE',pl:3,pt:1,mr:1}}>
                         
                    
                               
                            
                          
                                
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
                    <Box  >
                    <CusCheckBox
                    color="primary"
                    size="md"
                    name="file_upload_status"
                    value={file_upload_status}
                    checked={file_upload_status}
                    onCheked={billAddModalUpdate}
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
                    name="payed_status"
                    value={payed_status}
                    checked={payed_status}
                    onCheked={billAddModalUpdate}
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

export default memo(YearlyBillAddModal)