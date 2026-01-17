import React, { memo, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import { Box } from '@mui/system'
import { Grid } from '@mui/material'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
import VendorMastTable from './VendorMastTable'
const VendorMaster = () => {
    //for routing
    const history = useNavigate()
    //state for table render
    const [count, setCount] = useState(0)
    //state for edit
    const [edit, setEdit] = useState(0)
    //intializing
    const [request, setRequest] = useState({
        vendor_name: '',
        vendor_status: false,
        vendor_slno: '',
        vendor_regno: '',
        vendor_address: '',
        vendor_mob1: '',
        vendor_mob2: '',
        vendor_gst: '',
        vendor_email: ''
    })
    //destructuring
    const { vendor_name, vendor_status, vendor_slno, vendor_regno, vendor_address, vendor_mob1, vendor_mob2, vendor_gst, vendor_email } = request
    const updateRequesttype = useCallback(
        e => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setRequest({ ...request, [e.target.name]: value })
        },
        [request]
    )
    // Get login user emp_id
    const id = useSelector(state => {
        return state.LoginUserData.empid
    })
    //data for insert
    const postdata = useMemo(() => {
        return {
            vendor_name: vendor_name,
            vendor_status: vendor_status === true ? 1 : 0,
            create_user: id,
            vendor_regno: vendor_regno,
            vendor_address: vendor_address,
            vendor_mob1: vendor_mob1,
            vendor_mob2: vendor_mob2,
            vendor_gst: vendor_gst,
            vendor_email: vendor_email
        }
    }, [vendor_name, vendor_status, id, vendor_regno, vendor_address, vendor_mob1, vendor_mob2, vendor_gst, vendor_email])
    //data set for edit
    const rowSelect = useCallback(params => {
        setEdit(1)
        const data = params.api.getSelectedRows()

        const { vendor_slno, vendor_name, vendor_gst, vendor_regno, vendor_address, vendor_mob_first, vendor_mob_second, vendor_email, status } = data[0]
        const frmdata = {
            vendor_name: vendor_name,
            vendor_status: status === 'Yes' ? true : false,
            vendor_slno: vendor_slno,
            vendor_regno: vendor_regno,
            vendor_address: vendor_address,
            vendor_mob1: vendor_mob_first,
            vendor_mob2: vendor_mob_second,
            vendor_gst: vendor_gst,
            vendor_email: vendor_email
        }
        setRequest(frmdata)
    }, [])
    //data for update
    const patchdata = useMemo(() => {
        return {
            vendor_name: vendor_name,
            vendor_status: vendor_status === true ? 1 : 0,
            edit_user: id,
            vendor_slno: vendor_slno,
            vendor_regno: vendor_regno,
            vendor_address: vendor_address,
            vendor_mob1: vendor_mob1,
            vendor_mob2: vendor_mob2,
            vendor_gst: vendor_gst,
            vendor_email: vendor_email
        }
    }, [vendor_name, vendor_status, vendor_slno, id, vendor_regno, vendor_address, vendor_mob1, vendor_mob2, vendor_gst, vendor_email])
    /*** usecallback function for form submitting */

    const mobileRegex = /^[6-9]\d{9}$/; // Indian mobile
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;


    const submitRequestType = useCallback(
        e => {
            e.preventDefault()

            if (!vendor_name || !vendor_regno) {
                infoNotify('Vendor name and RegNo are required');
                return;
            }

            // 📱 Mobile validation
            if (vendor_mob1 && !mobileRegex.test(vendor_mob1)) {
                infoNotify('Enter a valid 10-digit mobile number');
                return;
            }

            if (vendor_mob2 && !mobileRegex.test(vendor_mob2)) {
                infoNotify('Enter a valid 10-digit alternate mobile number');
                return;
            }

            // 📧 Email (Gmail only)
            if (vendor_email && !emailRegex.test(vendor_email)) {
                infoNotify('Enter a valid Gmail address');
                return;
            }


            const formreset = {
                req_type_name: '',
                vendor_status: false,
                vendor_slno: '',
                vendor_regno: '',
                vendor_address: '',
                vendor_mob1: '',
                vendor_mob2: '',
                vendor_gst: '',
                vendor_email: ''
            }

            /***  * insert function for use call back     */
            const InsertFun = async postdata => {
                const result = await axioslogin.post('/vendor_master/insert', postdata)
                const { message, success } = result.data
                if (success === 1) {
                    succesNotify(message)
                    setCount(count + 1)
                    setRequest(formreset)
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            /***  * update function for use call back     */
            const updateFun = async patchdata => {
                const result = await axioslogin.patch('/vendor_master', patchdata)
                const { message, success } = result.data
                if (success === 2) {
                    succesNotify(message)
                    setCount(count + 1)
                    setRequest(formreset)
                    setEdit(0)
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            /*** edit=0 insert api call work else update call
             * edit initialy '0' when edit button click value changes to '1'
             */
            if (edit === 0) {
                InsertFun(postdata)
            } else {
                updateFun(patchdata)
            }
        },
        [edit, postdata, patchdata, count, mobileRegex, emailRegex]
    )
    // close button function
    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])
    //refresh
    const refreshWindow = useCallback(() => {
        const formreset = {
            vendor_name: '',
            vendor_status: false,
            vendor_slno: '',
            vendor_regno: '',
            vendor_address: '',
            vendor_mob1: '',
            vendor_mob2: '',
            vendor_gst: '',
            vendor_email: ''
        }
        setRequest(formreset)
        setEdit(0)
    }, [setRequest])
    return (
        <CardMaster title="Vendor Master" close={backtoSetting} submit={submitRequestType} refresh={refreshWindow}>
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xl={4} lg={4}>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Enter Vendor Name"
                                    type="text"
                                    size="sm"
                                    name="vendor_name"
                                    value={vendor_name}
                                    onchange={updateRequesttype}
                                />
                            </Grid>

                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Enter Vendor RegNo"
                                    type="text"
                                    size="sm"
                                    name="vendor_regno"
                                    value={vendor_regno}
                                    onchange={updateRequesttype}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Enter Vendor Address"
                                    type="text"
                                    size="sm"
                                    name="vendor_address"
                                    value={vendor_address}
                                    onchange={updateRequesttype}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Enter Vendor mob1"
                                    type="tel"
                                    inputProps={{ maxLength: 10 }}
                                    name="vendor_mob1"
                                    value={vendor_mob1}
                                    onchange={updateRequesttype}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Enter Vendor mob2"
                                    type="tel"
                                    inputProps={{ maxLength: 10 }}
                                    name="vendor_mob2"
                                    value={vendor_mob2}
                                    onchange={updateRequesttype}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Enter Vendor GST Number"
                                    type="text"
                                    size="sm"
                                    name="vendor_gst"
                                    value={vendor_gst}
                                    onchange={updateRequesttype}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Enter Vendor Email"
                                    type="email"
                                    name="vendor_email"
                                    value={vendor_email}
                                    onchange={updateRequesttype}
                                />
                            </Grid>

                            <Grid item lg={2} xl={2}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="vendor_status"
                                    value={vendor_status}
                                    checked={vendor_status}
                                    onCheked={updateRequesttype}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8}>
                        <VendorMastTable count={count} rowSelect={rowSelect} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}

export default memo(VendorMaster) 