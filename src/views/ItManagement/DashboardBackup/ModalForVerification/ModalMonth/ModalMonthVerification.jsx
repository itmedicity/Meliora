
import { endOfMonth, startOfMonth } from 'date-fns'
import moment from 'moment'
import React from 'react'
import { useMemo } from 'react'
import { useCallback } from 'react'
import { useState, useEffect, memo } from 'react'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import CustomTextarea from 'src/views/Components/CustomTextarea'
import { Box, CssVarsProvider, Modal, ModalDialog, Option, Select, Typography } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CloseIcon from '@mui/icons-material/Close';

const ModalMonthVerification = ({ open, handleClose, rowSelect, count, setCount }) => {
    const [backupTakenTime, setBackupTakenTime] = useState(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
    const [verifyStatus, setVerifyStatus] = useState(false)
    const [notverify, setNotverify] = useState(false)
    const [remarks, setRemarks] = useState('')
    const [empname, setEmpname] = useState(0)
    const [vslno, setVslno] = useState(0)
    const [beforekb, setBeforekb] = useState(0)
    const [afterkb, setAfterkb] = useState(0)
    const [beforebytes, setBeforebytes] = useState(0)
    const [afterbytes, setAfterbytes] = useState(0)
    const [backupPath, setbackupPath] = useState('')
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const employeelist = useSelector((state) => state?.getEmployeeBackup.empList)
    const BackupTimeChange = useCallback((e) => {
        setBackupTakenTime(e.target.value)
    }, [])
    const checkVerifyStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setVerifyStatus(true)
            setNotverify(false)
        }
        else {
            setVerifyStatus(false)
            setNotverify(false)
        }
    }, [])
    const checkNotVerifyStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setNotverify(true)
            setVerifyStatus(false)
        }
        else {
            setNotverify(false)
            setVerifyStatus(false)
        }
    }, [])
    const BeforeKBOnChange = useCallback((e) => {
        const containsOnlyDigits = (value) => /^\d+$/.test(value);
        const inputBytes = (e.target.value);
        if (inputBytes !== '' && !containsOnlyDigits(inputBytes)) {
            infoNotify("Please enter BackupSize with digits only");
            return;
        }
        else {
            setBeforebytes(inputBytes);
            const kbValue = (inputBytes / 1024).toFixed(2);
            setBeforekb(kbValue);
        }
    }, [])
    const AfterKBOnChange = useCallback((e) => {
        const containsOnlyDigits = (value) => /^\d+$/.test(value);
        const inputBytes = (e.target.value);
        if (inputBytes !== '' && !containsOnlyDigits(inputBytes)) {
            infoNotify("Please enter BackupSize with digits only");
            return;
        }
        else {
            setAfterbytes(inputBytes);
            const kbValue = (inputBytes / 1024).toFixed(2);
            setAfterkb(kbValue);
        }
    }, [])
    const RemarksOnchange = useCallback((e) => {
        setRemarks(e.target.value)
    }, [])
    const PathonChangeOnchange = useCallback((e) => {
        setbackupPath(e.target.value)
    }, [])
    const [viewdata, setViewdata] = useState({
        backup_type_name: '',
        backup_name: '',
        dept_name: '',
        backup_device_ip: '',
        backup_device_name: '',
        backup_device_location: '',
        transferred_device_ip: '',
        transferred_device_name: '',
        transferred_device_location: '',
        schedule_type_name: '',
    })
    const {
        backup_type_name,
        backup_name,
        dept_name,
        backup_device_ip,
        backup_device_name,
        backup_device_location,
        transferred_device_ip,
        transferred_device_name,
        transferred_device_location,
        schedule_type_name,

    } = viewdata
    useEffect(() => {
        if (Object.keys(rowSelect).length !== 0) {
            const {
                monthly_slno,
                backup_type,
                backup_type_name,
                backup_name,
                dept_name,
                backup_device_ip,
                backup_device_name,
                backup_device_location,
                transferred_device_ip,
                transferred_device_name,
                transferred_device_location,
                schedule_type_name,
                backup_schedule_time,
                schedule_time_name

            } = rowSelect
            const frmdata = {
                backup_type: (backup_type === 1) ? 'IIS Backup' : (backup_type === 2) ? 'Database Backup' : (backup_type === 3) ? 'Share Folder Backup' : (backup_type === 4) ? 'Scanned File Backup' : 'Configuration Backup',
                backup_type_name: backup_type_name,
                backup_name: backup_name,
                dept_name: dept_name,
                backup_device_ip: backup_device_ip,
                backup_device_name: backup_device_name,
                backup_device_location: backup_device_location,
                transferred_device_ip: transferred_device_ip,
                transferred_device_name: transferred_device_name,
                transferred_device_location: transferred_device_location,
                schedule_type_name: schedule_type_name,
                backup_schedule_time: backup_schedule_time,
                schedule_time_name: schedule_time_name,
            }
            setViewdata(frmdata)
            setVslno(monthly_slno)
        }
        else {
            setViewdata([])
        }
    }, [rowSelect])
    const reset = useCallback(() => {
        const frmdata = {
            backup_type_name: '',
            backup_name: '',
            dept_name: '',
            backup_device_ip: '',
            backup_device_name: '',
            backup_device_location: '',
            transferred_device_ip: '',
            transferred_device_name: '',
            transferred_device_location: '',
            schedule_type_name: '',
            schedule_time_name: '',
        }
        setViewdata(frmdata)
        setBeforekb(0)
        setAfterkb(0)
        setBeforebytes(0)
        setAfterbytes(0)
        setVslno(0)
        setEmpname(0)
        setVerifyStatus(false)
        setNotverify(false)
        setRemarks('')
        setbackupPath('')
        handleClose()
    }, [handleClose])


    const patchdata = useMemo(() => {
        return {
            monthly_slno: vslno,
            backup_date_time: moment(backupTakenTime).format('YYYY-MM-DD HH:mm:ss'),
            backup_path: backupPath,
            backup_size_before: beforebytes,
            backup_size_after: afterbytes,
            em_id: empname,
            verify_status: verifyStatus === true ? 1 : notverify === true ? 2 : 0,
            remarks: remarks,
            edit_user: id
        }
    }, [vslno, backupTakenTime, beforebytes, afterbytes, empname, verifyStatus, notverify, remarks, backupPath, id])

    const SaveVerification = useCallback((e) => {
        if (empname === 0) {
            infoNotify("Enter Employee Name")
        }
        else if (verifyStatus === false && notverify === false) {
            infoNotify("Enter BackupStatus")
        }
        else {
            e.preventDefault();
            const UpdateDetails = async (patchdata) => {
                const result = await axioslogin.patch('/verification/updatemonth', patchdata);
                const { message, success } = result.data;
                if (success === 2) {
                    succesNotify(message)
                    setCount(count + 1);
                    reset()
                } else if (success === 0) {
                    infoNotify(message);
                }
                else {
                    infoNotify(message)
                }
            }
            UpdateDetails(patchdata)
        }
    }, [patchdata, empname, count, reset, setCount, verifyStatus, notverify])
    return (
        // <Fragment>
        //     <ToastContainer />
        //     <Dialog
        //         open={open}
        //         keepMounted
        //         aria-describedby="alert-dialog-slide-descriptiona"
        //         maxWidth='lg'
        //         overflow='hidden'
        //     >
        //         <DialogContent id="alert-dialog-slide-descriptiona" overflow="hidden" >
        //             <Box sx={{
        //                 width: '100%', height: '100%', borderRadius: 1, border: '0.1px solid #454545', overflow: 'hidden',
        //             }}>
        //                 <Box id="alert-dialog-slide-descriptiona" sx={{ textAlign: 'center', height: '50px', pt: 1 }}>
        //                     <Typography style={{ textDecorationLine: 'underline', fontSize: 17 }} > Backup Verification</Typography>
        //                 </Box>
        //                 <Box
        //                     sx={{
        //                         width: 650,
        //                         height: 550,
        //                     }}
        //                 >
        //                     <Box sx={{ display: "flex", flexDirection: 'column', justifyContent: "center", width: "100%", pt: 1 }}>
        //                         <Box sx={{ display: 'flex', }}>
        //                             <Box sx={{ flex: 1.5, pl: 1 }}>
        //                                 <Typography sx={{ fontSize: 14, color: '#274472' }}>Backup Type </Typography>
        //                             </Box>
        //                             <Box sx={{ flex: 4 }}>
        //                                 <Typography sx={{ fontSize: 14, color: '#274472' }}>:&nbsp; {backup_type_name} </Typography>

        //                             </Box>
        //                         </Box>
        //                         <Box sx={{ display: 'flex', }}>
        //                             <Box sx={{ flex: 1.5, pl: 1 }}>
        //                                 <Typography sx={{ fontSize: 14, color: '#274472' }}>Backup Location </Typography>
        //                             </Box>
        //                             <Box sx={{ flex: 4 }}>
        //                                 <Typography sx={{ fontSize: 14, color: '#274472' }}>:&nbsp; {dept_name} </Typography>

        //                             </Box>
        //                         </Box>
        //                         <Box sx={{ display: 'flex', }}>
        //                             <Box sx={{ flex: 1.5, pl: 1 }}>
        //                                 <Typography sx={{ fontSize: 14, color: '#274472' }}> Backup Name  </Typography>
        //                             </Box>
        //                             <Box sx={{ flex: 4 }}>
        //                                 <Typography sx={{ fontSize: 14, color: '#274472' }}>:&nbsp; {backup_name} </Typography>

        //                             </Box>
        //                         </Box>
        //                         <Box sx={{ display: 'flex' }}>
        //                             <Box sx={{ flex: 1.5, pl: 1 }}>
        //                                 <Typography sx={{ fontSize: 14, color: '#274472' }}> Backup Schedule   </Typography>
        //                             </Box>
        //                             <Box sx={{ flex: 4, display: 'flex', flexDirection: 'row' }}>
        //                                 <Typography style={{ fontSize: 14, color: '#274472' }}>:&nbsp; {schedule_type_name}</Typography>
        //                             </Box>
        //                         </Box>
        //                         <Box>
        //                             <Box sx={{ pl: 1 }}>
        //                                 <Typography sx={{ fontSize: 16 }}> Backup Device Details  </Typography>
        //                             </Box>
        //                             <Box sx={{ display: 'flex', }}>
        //                                 <Box sx={{ flex: 1.5, pl: 1 }}>
        //                                     <Typography sx={{ fontSize: 14, color: '#274472' }}> IP Address</Typography>
        //                                 </Box>
        //                                 <Box sx={{ flex: 4 }}>
        //                                     <Typography sx={{ fontSize: 14, color: '#274472' }}>:&nbsp; {backup_device_ip} </Typography>
        //                                 </Box>
        //                             </Box>
        //                             <Box sx={{ display: 'flex', }}>
        //                                 <Box sx={{ flex: 1.5, pl: 1 }}>
        //                                     <Typography sx={{ fontSize: 14, color: '#274472' }}> Computer Name </Typography>
        //                                 </Box>
        //                                 <Box sx={{ flex: 4 }}>
        //                                     <Typography sx={{ fontSize: 14, color: '#274472' }}>:&nbsp; {backup_device_name} </Typography>
        //                                 </Box>
        //                             </Box>
        //                             <Box sx={{ display: 'flex', }}>
        //                                 <Box sx={{ flex: 1.5, pl: 1 }}>
        //                                     <Typography sx={{ fontSize: 14, color: '#274472' }}> Physical Location</Typography>
        //                                 </Box>
        //                                 <Box sx={{ flex: 4 }}>
        //                                     <Typography sx={{ fontSize: 14, color: '#274472' }}>:&nbsp; {backup_device_location} </Typography>
        //                                 </Box>
        //                             </Box>
        //                         </Box>
        //                         <Box>
        //                             <Box sx={{ pl: 1 }}>
        //                                 <Typography sx={{ fontSize: 16 }}> Backup Transfered Device  </Typography>
        //                             </Box>
        //                             <Box sx={{ display: 'flex', }}>
        //                                 <Box sx={{ flex: 1.5, pl: 1 }}>
        //                                     <Typography sx={{ fontSize: 14, color: '#274472' }}> IP Address</Typography>
        //                                 </Box>
        //                                 <Box sx={{ flex: 4 }}>
        //                                     <Typography sx={{ fontSize: 14, color: '#274472' }}>:&nbsp; {transferred_device_ip} </Typography>
        //                                 </Box>
        //                             </Box>
        //                             <Box sx={{ display: 'flex', }}>
        //                                 <Box sx={{ flex: 1.5, pl: 1 }}>
        //                                     <Typography sx={{ fontSize: 14, color: '#274472' }}> Computer Name </Typography>
        //                                 </Box>
        //                                 <Box sx={{ flex: 4 }}>
        //                                     <Typography sx={{ fontSize: 14, color: '#274472' }}>:&nbsp; {transferred_device_name} </Typography>
        //                                 </Box>
        //                             </Box>
        //                             <Box sx={{ display: 'flex', }}>
        //                                 <Box sx={{ flex: 1.5, pl: 1 }}>
        //                                     <Typography sx={{ fontSize: 14, color: '#274472' }}> Physical Location</Typography>
        //                                 </Box>
        //                                 <Box sx={{ flex: 4 }}>
        //                                     <Typography sx={{ fontSize: 14, color: '#274472' }}>:&nbsp; {transferred_device_location} </Typography>
        //                                 </Box>
        //                             </Box>
        //                         </Box>
        //                     </Box>
        //                     <Box sx={{ display: "flex", flexDirection: 'column', pt: 1 }}>
        //                         <Divider flexItem sx={{ borderBlockColor: 'black' }}></Divider>
        //                     </Box>
        //                     <Box sx={{ display: "flex", flexDirection: 'column', pt: 1 }}>
        //                         <Box sx={{ display: 'flex', pt: 0.5 }}>
        //                             <Box sx={{ flex: 1, pl: 1, pt: 0.5 }}>
        //                                 <Typography > Backup Date & Time</Typography>
        //                             </Box>
        //                             <Box sx={{ flex: 1.5 }}>
        //                                 <TextFieldCustom
        //                                     slotProps={{
        //                                         input: {
        //                                             min: moment(startOfMonth(new Date())).format('YYYY-MM-DD HH:mm:ss'),
        //                                             max: moment(endOfMonth(new Date())).format('YYYY-MM-DD HH:mm:ss'),
        //                                         },
        //                                     }}
        //                                     style={{ width: 372 }}
        //                                     size="sm"
        //                                     type="datetime-local"
        //                                     name="backupTakenTime"
        //                                     value={backupTakenTime}
        //                                     onchange={BackupTimeChange}
        //                                 />
        //                             </Box>
        //                         </Box>

        //                         <Box sx={{ display: 'flex', pt: 0.5, flexDirection: 'row' }}>
        //                             <Box sx={{ flex: 1, pl: 1, pt: 0.7 }}>
        //                                 <Typography > Backup Size Before Compression</Typography>
        //                             </Box>
        //                             <Box sx={{ flex: 0.7 }}>
        //                                 <TextFieldCustom
        //                                     placeholder="In Bytes"
        //                                     style={{ width: 179 }}
        //                                     type="text"
        //                                     size="sm"
        //                                     name="beforebytes"
        //                                     value={beforebytes}
        //                                     onchange={BeforeKBOnChange}
        //                                     endDecorator={"Bytes"}
        //                                 />
        //                             </Box>
        //                             <Box sx={{ flex: 0.55 }}>
        //                                 <TextFieldCustom
        //                                     disabled
        //                                     placeholder="In KB"
        //                                     style={{ width: 140 }}
        //                                     type="text"
        //                                     size="sm"
        //                                     name="beforekb"
        //                                     value={beforekb}
        //                                     endDecorator={"KB"}
        //                                 />
        //                             </Box>

        //                         </Box>
        //                         <Box sx={{ display: 'flex', pt: 0.5, flexDirection: 'row' }}>
        //                             <Box sx={{ flex: 1, pl: 1, pt: 0.7 }}>
        //                                 <Typography> Backup Size After Compression</Typography>
        //                             </Box>
        //                             <Box sx={{ flex: 0.7 }}>
        //                                 <TextFieldCustom
        //                                     style={{ width: 179 }}
        //                                     placeholder="In Bytes"
        //                                     type="text"
        //                                     size="sm"
        //                                     name="afterbytes"
        //                                     value={afterbytes}
        //                                     onchange={AfterKBOnChange}
        //                                     endDecorator={"Bytes"}
        //                                 />
        //                             </Box>

        //                             <Box sx={{ flex: 0.55 }}>
        //                                 <TextFieldCustom
        //                                     disabled
        //                                     placeholder="In KB"
        //                                     style={{ width: 140 }}
        //                                     type="text"
        //                                     size="sm"
        //                                     name="afterkb"
        //                                     value={afterkb}
        //                                     endDecorator={"KB"}
        //                                 />
        //                             </Box>
        //                         </Box>

        //                         <Box sx={{ display: 'flex', pt: 1 }}>
        //                             <Box sx={{ flex: 1, pl: 1 }}>
        //                                 <Typography > Backup Location</Typography>
        //                             </Box>
        //                             <Box sx={{ flex: 1.5, pr: 1 }}>
        //                                 <TextFieldCustom
        //                                     placeholder="Folder Path"
        //                                     type="text"
        //                                     size="sm"
        //                                     name="backupPath"
        //                                     value={backupPath}
        //                                     onchange={PathonChangeOnchange}
        //                                 />
        //                             </Box>
        //                         </Box>
        //                         <Box sx={{ display: 'flex', pt: 1 }}>
        //                             <Box sx={{ flex: 1, pl: 1 }}>
        //                                 <Typography > Employee Name</Typography>
        //                             </Box>
        //                             <Box sx={{ flex: 1.5 }}>
        //                                 <FormControl fullWidth >
        //                                     <Select
        //                                         labelId="demo-multiple-name-label"
        //                                         id="demo-multiple-name"
        //                                         size="small"
        //                                         value={empname}
        //                                         onChange={(e) => setEmpname(e.target.value)}
        //                                         variant='outlined'
        //                                         sx={{ height: 26, p: 0, m: 0, lineHeight: 1.200, width: 372 }}
        //                                     >
        //                                         <MenuItem value={0} disabled >Employee Name</MenuItem>
        //                                         {
        //                                             employeelist && employeelist.map((val) => {
        //                                                 return (
        //                                                     <MenuItem
        //                                                         key={val.em_id}
        //                                                         value={val.em_id}
        //                                                     >
        //                                                         {val.em_name}
        //                                                     </MenuItem>
        //                                                 );
        //                                             })}
        //                                     </Select>
        //                                 </FormControl>
        //                             </Box>
        //                         </Box>
        //                         <Box sx={{ display: 'flex', pt: 1 }}>
        //                             <Box sx={{ flex: 1, pl: 1, }}>
        //                                 <Typography> Backup Status</Typography>
        //                             </Box>
        //                             <Box sx={{ flex: 1.5, display: 'flex', flexDirection: 'row' }}>
        //                                 <Box sx={{ pt: 0.3 }}>
        //                                     <CusCheckBox
        //                                         color="primary"
        //                                         size="md"
        //                                         name="verifyStatus"
        //                                         value={verifyStatus}
        //                                         checked={verifyStatus}
        //                                         onCheked={checkVerifyStatus}
        //                                     >
        //                                     </CusCheckBox>
        //                                 </Box>
        //                                 <Box sx={{ pl: 1 }}>
        //                                     <Typography>Successfull</Typography>
        //                                 </Box>
        //                                 <Box sx={{ pl: 4, pt: 0.3 }}>
        //                                     <CusCheckBox
        //                                         color="primary"
        //                                         size="md"
        //                                         name="notverify"
        //                                         value={notverify}
        //                                         checked={notverify}
        //                                         onCheked={checkNotVerifyStatus}
        //                                     >
        //                                     </CusCheckBox>
        //                                 </Box>
        //                                 <Box sx={{ pl: 1 }}>
        //                                     <Typography>Not Successfull</Typography>
        //                                 </Box>
        //                             </Box>
        //                         </Box>
        //                         <Box sx={{ justifyContent: 'center', px: 10, pt: 1 }}>
        //                             <Box >
        //                                 <CustomTextarea
        //                                     style={{
        //                                         width: 500,
        //                                         height: 70
        //                                     }}
        //                                     placeholder="Remarks"
        //                                     required
        //                                     type="text"
        //                                     maxRows={3}
        //                                     size="sm"
        //                                     name="remarks"
        //                                     value={remarks}
        //                                     onchange={RemarksOnchange}
        //                                 />
        //                             </Box>
        //                         </Box>
        //                     </Box>
        //                 </Box>
        //             </Box>
        //             <>
        //                 <DialogActions>
        //                     <Button color="secondary" onClick={SaveVerification} >Save</Button>
        //                     <Button color="secondary" onClick={handleClose}>Cancel</Button>
        //                 </DialogActions>
        //             </>
        //         </DialogContent>
        //     </Dialog>
        // </Fragment >
        <CssVarsProvider>
            <Modal aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ModalDialog variant="outlined" sx={{ p: 2, width: 800, }}>
                    <Box sx={{ flex: 1, display: 'flex' }}>
                        <ExitToAppIcon sx={{ width: 30, height: 30, border: 1, borderColor: 'lightgrey' }} />
                        <Typography sx={{ fontSize: 19, pl: .5, flex: 1 }} > Backup Verification</Typography>
                        <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
                    </Box>
                    <Box sx={{
                        height: '72vh', overflow: 'auto', pr: 2
                    }}>

                        <Box sx={{ flex: 1, display: "flex", pt: 1, pl: .5 }}>
                            <Box sx={{ width: 220, color: '#274472', fontSize: 15, }}>
                                Backup Type
                            </Box>
                            <Typography sx={{ fontSize: 14, color: '#274472' }}>:&nbsp;{backup_type_name} </Typography>
                        </Box>
                        <Box sx={{ flex: 1, display: "flex", pl: .5 }}>
                            <Box sx={{ width: 220, color: '#274472', fontSize: 15, }}>
                                Backup Location
                            </Box>
                            <Typography sx={{ fontSize: 14, color: '#274472' }}>:&nbsp;{dept_name} </Typography>
                        </Box>
                        <Box sx={{ flex: 1, display: "flex", pl: .5 }}>
                            <Box sx={{ width: 220, color: '#274472', fontSize: 15, }}>
                                Backup Name
                            </Box>
                            <Typography sx={{ fontSize: 14, color: '#274472' }}>:&nbsp;{backup_name} </Typography>
                        </Box>
                        <Box sx={{ flex: 1, display: "flex", pl: .5 }}>
                            <Box sx={{ width: 220, color: '#274472', fontSize: 15, }}>
                                Backup Schedule
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                                <Typography style={{ fontSize: 14, color: '#274472' }}>:&nbsp;{schedule_type_name}</Typography>
                            </Box>
                        </Box>

                        <Typography sx={{ fontSize: 16, pl: .5, pt: .5 }}> Backup Device Details  </Typography>


                        <Box sx={{ flex: 1, display: "flex", pl: .5 }}>
                            <Box sx={{ width: 220, color: '#274472', fontSize: 15, }}>
                                IP Address
                            </Box>
                            <Typography sx={{ fontSize: 14, color: '#274472' }}>:&nbsp;{backup_device_ip} </Typography>
                        </Box>
                        <Box sx={{ flex: 1, display: "flex", pl: .5 }}>
                            <Box sx={{ width: 220, color: '#274472', fontSize: 15, }}>
                                Computer Name
                            </Box>
                            <Typography sx={{ fontSize: 14, color: '#274472' }}>:&nbsp;{backup_device_name} </Typography>
                        </Box>
                        <Box sx={{ flex: 1, display: "flex", pl: .5 }}>
                            <Box sx={{ width: 220, color: '#274472', fontSize: 15, }}>
                                Physical Location
                            </Box>
                            <Typography sx={{ fontSize: 14, color: '#274472' }}>:&nbsp;{backup_device_location} </Typography>
                        </Box>

                        <Typography sx={{ fontSize: 16, pl: .5, pt: .5 }}> Backup Transfered Device  </Typography>

                        <Box sx={{ flex: 1, display: "flex", pl: .5 }}>
                            <Box sx={{ width: 220, color: '#274472', fontSize: 15, }}>
                                IP Address
                            </Box>
                            <Typography sx={{ fontSize: 14, color: '#274472' }}>:&nbsp;{transferred_device_ip} </Typography>
                        </Box>
                        <Box sx={{ flex: 1, display: "flex", pl: .5 }}>
                            <Box sx={{ width: 220, color: '#274472', fontSize: 15, }}>
                                Computer Name
                            </Box>
                            <Typography sx={{ fontSize: 14, color: '#274472' }}>:&nbsp;{transferred_device_name} </Typography>
                        </Box>
                        <Box sx={{ flex: 1, display: "flex", pl: .5 }}>
                            <Box sx={{ width: 220, color: '#274472', fontSize: 15, }}>
                                Physical Location
                            </Box>
                            <Typography sx={{ fontSize: 14, color: '#274472' }}>:&nbsp;{transferred_device_location} </Typography>
                        </Box>


                        <Box sx={{ flex: 1, display: 'flex', pt: 2, pl: .5, gap: 3 }}>
                            <Box sx={{ flex: 1, }}>
                                <Typography sx={{ pl: .5, fontWeight: 500, fontSize: 14 }} > Backup Date & Time</Typography>
                                <TextFieldCustom
                                    slotProps={{
                                        input: {
                                            min: moment(startOfMonth(new Date())).format('YYYY-MM-DD HH:mm:ss'),
                                            max: moment(endOfMonth(new Date())).format('YYYY-MM-DD HH:mm:ss'),
                                        },
                                    }}
                                    size="sm"
                                    type="datetime-local"
                                    name="backupTakenTime"
                                    value={backupTakenTime}
                                    onchange={BackupTimeChange}
                                />
                            </Box>

                            <Box sx={{ flex: 1, }}>
                                <Typography sx={{ pl: .5, fontWeight: 500, fontSize: 14 }} >Employee Name</Typography>
                                <Box sx={{ flex: 1, }}>
                                    <Select
                                        size="sm"
                                        value={empname}
                                        onChange={(e, newValue) => setEmpname(newValue)}
                                        sx={{ height: 27, p: 1, m: 0, lineHeight: 1.2 }}
                                    >
                                        <Option value={0} disabled>Employee Name</Option>
                                        {employeelist?.map((val) => (
                                            <Option key={val.em_id} value={val.em_id}>
                                                {val.em_name}
                                            </Option>
                                        ))}
                                    </Select>

                                </Box>
                            </Box>

                        </Box>

                        <Box sx={{ flex: 1, display: 'flex', pt: 2, pl: .5, gap: 3 }}>
                            <Box sx={{ flex: 1, }}>
                                <Typography sx={{ pl: .5, fontWeight: 500, fontSize: 14 }} >  Backup Size Before Compression</Typography>
                                <Box sx={{ display: 'flex', flex: 1, gap: .5 }}>
                                    <TextFieldCustom
                                        placeholder="In Bytes"
                                        type="text"
                                        size="sm"
                                        name="beforebytes"
                                        value={beforebytes}
                                        onchange={BeforeKBOnChange}
                                        endDecorator={"Bytes"}
                                    />

                                    <TextFieldCustom
                                        disabled
                                        placeholder="In KB"
                                        style={{ width: 140 }}
                                        type="text"
                                        size="sm"
                                        name="beforekb"
                                        value={beforekb}
                                        endDecorator={"KB"}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ flex: 1, }}>
                                <Typography sx={{ pl: .5, fontWeight: 500, fontSize: 14 }} >  Backup Size After Compression</Typography>
                                <Box sx={{ display: 'flex', flex: 1, gap: .5 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <TextFieldCustom
                                            placeholder="In Bytes"
                                            type="text"
                                            size="sm"
                                            name="afterbytes"
                                            value={afterbytes}
                                            onchange={AfterKBOnChange}
                                            endDecorator={"Bytes"}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1, }}>
                                        <TextFieldCustom
                                            disabled
                                            style={{ width: 137 }}
                                            placeholder="In KB"
                                            type="text"
                                            size="sm"
                                            name="afterkb"
                                            value={afterkb}
                                            endDecorator={"KB"}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, pt: 1.5 }}>
                            <Typography sx={{ pl: .5, fontWeight: 500, fontSize: 14 }} > Backup Path</Typography>
                            <TextFieldCustom
                                placeholder="Folder Path"
                                type="text"
                                size="sm"
                                name="backupPath"
                                value={backupPath}
                                onchange={PathonChangeOnchange}
                            />
                        </Box>

                        <Box sx={{ flex: 1, pt: 2 }}>
                            <Typography sx={{ pl: .5, fontWeight: 500, fontSize: 14 }} > Backup Status & Remarks</Typography>
                            <Box sx={{ flex: 1, }}>
                                <Box sx={{ display: 'flex', pt: 1, pb: .5, justifyContent: 'center', gap: 3 }}>
                                    <CusCheckBox
                                        color="primary"
                                        label={"Successfull"}
                                        size="md"
                                        name="verifyStatus"
                                        value={verifyStatus}
                                        checked={verifyStatus}
                                        onCheked={checkVerifyStatus}
                                    >
                                    </CusCheckBox>
                                    <CusCheckBox
                                        color="primary"
                                        label={" Not Successfull"}
                                        size="md"
                                        name="notverify"
                                        value={notverify}
                                        checked={notverify}
                                        onCheked={checkNotVerifyStatus}
                                    >
                                    </CusCheckBox>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <CustomTextarea
                                        style={{
                                            height: 70,
                                            width: '100%'
                                        }}
                                        placeholder="Remarks"
                                        required
                                        type="text"
                                        maxRows={3}
                                        size="sm"
                                        name="remarks"
                                        value={remarks}
                                        onchange={RemarksOnchange}
                                    />
                                </Box>

                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', pt: 1, gap: 1 }}>
                        <Box onClick={SaveVerification} sx={{ cursor: 'pointer', fontWeight: 600, color: '#594002' }}>Save</Box>
                        <Box onClick={handleClose} sx={{ cursor: 'pointer', fontWeight: 600, color: '#594002' }}>Cancel</Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </CssVarsProvider>
    )
}
export default memo(ModalMonthVerification)