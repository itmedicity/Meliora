import React, { Fragment, useState, useCallback, useMemo, memo } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box, IconButton, } from '@mui/material'
import { CssVarsProvider, Typography } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import imageCompression from 'browser-image-compression';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux'

const YearlyBillEdits = ({ open, handleClose, getarry, yearCount, setYearCount }) => {
  const [selectFile, setSelectFile] = useState([]);
  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })
  const { device_type_name, dept_name, reciver_name, bill_due_date, providername, amount, bill_date, bill_amount,
    bill_entered_date, bill_number, yearly_slno, device_name
  } = getarry
  const [billEditModal, setbillEditModal] = useState({
    billAmount: bill_amount !== null ? bill_amount : '',
    billDate: bill_date !== null ? bill_date : '',
    billDueDate: bill_due_date !== null ? bill_due_date : '',
    billNo: bill_number !== null ? bill_number : '',
    billPayedDate: bill_entered_date !== null ? bill_entered_date : '',
    payed_status: false,
  })
  const { billAmount, billDate, billDueDate, billNo, billPayedDate, } = billEditModal
  const billEditModalUpdate = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setbillEditModal({ ...billEditModal, [e.target.name]: value })
    },
    [billEditModal],
  )
  const reset = () => {
    const formdata = {
      bill_amount: '',
      bill_date: '',
      bill_due_date: '',
      bill_number: '',
      bill_entered_date: '',
      file_upload_status: false,
      payed_status: false,
    }
    setbillEditModal(formdata)
  }
  const patchdata = useMemo(() => {
    return {
      yearly_slno: yearly_slno,
      bill_amount: billAmount,
      bill_date: billDate,
      bill_due_date: billDueDate,
      bill_number: billNo,
      bill_entered_date: billPayedDate === '' ? null : billPayedDate,
      payed_status: billPayedDate === '' ? 0 : 1,
      edit_user: id
    }
  }, [yearly_slno, billDate, billAmount, billDueDate, billNo, billPayedDate, id])
  const handleFileChange = useCallback((e) => {
    const newFiles = [...selectFile]
    newFiles.push(e.target.files[0])
    setSelectFile(newFiles)
  }, [selectFile, setSelectFile])
  const handleImageUpload = useCallback(async (imageFile) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }
    const compressedFile = await imageCompression(imageFile, options)
    return compressedFile
  }, []);
  const submitModal = useCallback(
    (e) => {
      e.preventDefault()
      const UpdateTariffModal = async (patchdata) => {
        const result = await axioslogin.patch('/tarrifDetails/updateYearlybillModal', patchdata)
        return result.data
      }
      const InsertFile = async (selectFile) => {
        try {
          const formData = new FormData();
          formData.append('id', yearly_slno);
          for (const file of selectFile) {
            if (file.type.startsWith('image')) {
              const compressedFile = await handleImageUpload(file);
              formData.append('files', compressedFile, compressedFile.name);
            } else {
              formData.append('files', file, file.name);
            }
          }
          // Use the Axios instance and endpoint that matches your server setup
          const uploadResult = await axioslogin.post('/ItImageUpload/uploadFile/Yearly', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          const { success, message } = uploadResult.data;
          if (success === 1) {
            succesNotify(message);
            setYearCount(yearCount + 1);
            reset();
          } else {
            warningNotify(message);
          }
        } catch (error) {
          warningNotify('An error occurred during file upload.');
        }
      };
      if (bill_amount !== '' && bill_date !== '' && bill_due_date !== '' && bill_number !== '') {
        UpdateTariffModal(patchdata)
          .then((val) => {
            const { message, success } = val;
            if (success === 2) {
              if (selectFile.length !== 0) {
                // Call the handleUpload function to upload files
                InsertFile(selectFile);
                setYearCount(yearCount + 1)
                reset();
              }
              succesNotify(message);
              handleClose()
              setYearCount(yearCount + 1)
              reset();
            }
            else if (success === 0) {
              infoNotify(message);
            } else {
              infoNotify(message);
            }
          });
      }
      else {
        if (bill_amount === '') {
          infoNotify("Please enter bill amount");
        }
        else if (bill_date === '') {
          infoNotify("Please enter the bill date");
        }
        else if (bill_due_date === '') {
          infoNotify("Please enter the bill due date");
        }
        else if (bill_number === '') {
          infoNotify("Please enter the bill number");
        }
      }
    },
    [patchdata, handleClose, bill_amount, bill_date, bill_due_date, bill_number, yearCount, yearly_slno, setYearCount, selectFile, handleImageUpload],
  )
  const handleRemoveFile = (index) => {
    setSelectFile((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1); // Remove the file at the specified index
      return updatedFiles;
    });
  };
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
          }}
        >
          <Box sx={{
            width: '100%',
          }}>
            <Box id="alert-dialog-slide-descriptiona"
              sx={{ fontWeight: 'bold', height: '50px', pt: 2, color: '#0074B7', textAlign: 'center', }}>
              Edit Yearly Bill Details
            </Box>
            <Box sx={{
              width: '100%',
              height: '92%',
              borderRadius: 1,
            }}>
              <Box sx={{
                width: '100%',
                height: '30%',
                border: .5, borderColor: '#BBC8DE', borderRadius: 1.5,
                ml: 4,
                margin: 'auto',
              }}>
                <Box
                  sx={{ pt: .5, display: 'flex', }}>
                  <Box sx={{ flex: .3, pl: 1 }}>
                    <CssVarsProvider>
                      <Typography sx={{ fontSize: 15 }}>Device name</Typography>
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{
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
                  sx={{ pt: .5, display: 'flex', }}>
                  <Box sx={{ flex: .3, pl: 1 }}>
                    <CssVarsProvider>
                      <Typography sx={{ fontSize: 15 }}>Device type</Typography>
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{
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
                  sx={{ pt: .5, display: 'flex', }}>
                  <Box sx={{ flex: .3, pl: 1 }}>
                    <CssVarsProvider>
                      <Typography sx={{ fontSize: 15 }}>Department</Typography>
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{
                    flex: 1
                  }}>
                    <CssVarsProvider>
                      <Typography sx={{ fontSize: 15 }}>:&nbsp;{dept_name}
                      </Typography>
                    </CssVarsProvider>
                  </Box>
                </Box>
                <Box
                  sx={{ pt: .5, display: 'flex', }}>
                  <Box sx={{ flex: .3, pl: 1 }}>
                    <CssVarsProvider>
                      <Typography sx={{ fontSize: 15 }}>Receiver Name</Typography>
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{
                    flex: 1
                  }}>
                    <CssVarsProvider>
                      <Typography sx={{ fontSize: 15 }}>:&nbsp;{reciver_name}
                      </Typography>
                    </CssVarsProvider>
                  </Box>
                </Box>
                <Box
                  sx={{ pt: .5, display: 'flex', }}>
                  <Box sx={{ flex: .3, pl: 1 }}>
                    <CssVarsProvider>
                      <Typography sx={{ fontSize: 15 }}>Sim Operator</Typography>
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{
                    flex: 1
                  }}>
                    <CssVarsProvider>
                      <Typography sx={{ fontSize: 15 }}>:&nbsp;{providername}
                      </Typography>
                    </CssVarsProvider>
                  </Box>
                </Box>
                <Box
                  sx={{ pt: .5, display: 'flex', }}>
                  <Box sx={{ flex: .3, pl: 1 }}>
                    <CssVarsProvider>
                      <Typography sx={{ fontSize: 15 }}>Amount</Typography>
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{
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
                border: .5, borderColor: '#BBC8DE', borderRadius: 1.5,
                mt: .5,
              }}>
                <Box sx={{
                  width: "100%",
                  display: "flex",
                  pt: 1
                }}>
                  <Box
                    sx={{
                      flex: .3,
                      pt: .8,
                      ml: 1
                    }}>
                    <CssVarsProvider>
                      <Typography sx={{ fontSize: 15, }}>Bill Amount</Typography>
                    </CssVarsProvider>
                  </Box>
                  <Box
                    sx={{
                      height: '25%',
                      flex: 1,
                      pr: 1
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
                  margin: 'auto',
                  pt: .5
                }}>
                  <Box
                    sx={{
                      pt: 1,
                      flex: .3,
                      ml: 1,
                    }}>
                    <CssVarsProvider>
                      <Typography sx={{ fontSize: 15, }}>Bill Date</Typography>
                    </CssVarsProvider>
                  </Box>
                  <Box
                    sx={{
                      height: '25%',
                      flex: 1,
                      pr: 1
                    }}>
                    <TextFieldCustom
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
                  margin: 'auto',
                  pt: .5
                }}>
                  <Box
                    sx={{
                      pt: .8,
                      flex: .3,
                      ml: 1,
                    }}>
                    <CssVarsProvider>
                      <Typography sx={{ fontSize: 15 }}>Bill Due Date</Typography>
                    </CssVarsProvider>
                  </Box>
                  <Box
                    sx={{
                      height: '25%',
                      flex: 1,
                      pr: 1
                    }}>
                    <TextFieldCustom
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
                  margin: 'auto',
                  pt: .5
                }}>
                  <Box
                    sx={{
                      pt: .5,
                      flex: .3,
                      ml: 1,
                    }}>
                    <CssVarsProvider>
                      <Typography sx={{ fontSize: 15, }}>Bill No.</Typography>
                    </CssVarsProvider>
                  </Box>
                  <Box
                    sx={{
                      height: '25%',
                      flex: 1,
                      pr: 1,
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
                  margin: 'auto',
                }}>
                  <Box
                    sx={{
                      pt: 1,
                      flex: .3,
                      ml: 1,
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
                      pt: .5
                    }}>
                    <TextFieldCustom
                      type="date"
                      size="sm"
                      name="billPayedDate"
                      value={billPayedDate}
                      onchange={billEditModalUpdate}
                    ></TextFieldCustom>
                  </Box>
                </Box>
                <Box sx={{ flex: 2, m: 1, height: 45, border: 1.5, borderStyle: 'dashed', borderColor: '#BBC8DE', pl: 1, }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CssVarsProvider>
                      <Typography   >upload bill</Typography>
                    </CssVarsProvider>
                    <label htmlFor="file-input">
                      <CustomeToolTip title="upload">
                        <IconButton color="primary" aria-label="upload file" component="span">
                          <DriveFolderUploadIcon sx={{ color: '#145DA0', size: 'lg', width: 30, height: 30 }} />
                        </IconButton>
                      </CustomeToolTip>
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      accept=".jpg, .jpeg, .png, .pdf"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                      name="file"
                      multiple // Add this attribute to allow multiple file selections
                    />
                    {selectFile && selectFile.map((file, index) => (
                      <Box sx={{ display: "flex", flexDirection: "row", ml: 2, backgroundColor: '#D6E2E8' }} key={index} >
                        <Box >{file.name}</Box>
                        <Box sx={{ ml: .3 }}><CloseIcon sx={{ height: '18px', width: '20px', cursor: 'pointer' }}
                          onClick={() => handleRemoveFile(index)} /></Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box sx={{
                  display: 'flex',
                  height: 50,
                  width: 300,
                  pt: 1,
                  pl: 7,
                  margin: 'auto'
                }} >
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={submitModal}
            sx={{ color: "#0074B7", fontWeight: 'bold' }}
          >Save</Button>
          <Button
            sx={{ color: "#0074B7", fontWeight: 'bold' }}
            onClick={handleClose}
          >Cancel</Button>
        </DialogActions>
      </Dialog>
    </Fragment >
  )
}
export default memo(YearlyBillEdits)