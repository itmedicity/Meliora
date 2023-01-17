import { Box, Paper, IconButton } from '@mui/material'
import React, { useCallback, memo, useState, useMemo } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import { useHistory } from 'react-router-dom'
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
import CustomTextarea from 'src/views/Components/CustomTextarea'
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
import DeptSectionSelect from 'src/views/CommonSelectCode/DeptSectionSelect'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
import ReqRegisterTable from './ReqRegisterTable'
import ReqRegisterComp from './ReqRegisterComp'
import { useEffect } from 'react'

const ReqRegistration = () => {
    /*** Initializing */
    const history = useHistory();
    //state for Actual requirement
    const [actual_require, setActual_require] = useState('')
    const updateactual_require = useCallback((e) => {
        setActual_require(e.target.value)
    }, [])
    //state for Needed
    const [needed, setNeeded] = useState('')
    const updateNeeded = useCallback((e) => {
        setNeeded(e.target.value)
    }, [])
    //state for location
    const [location, setLocation] = useState('')
    const updateLocation = useCallback((e) => {
        setLocation(e.target.value)
    }, [])
    //state for Remarks
    const [remarks, setRemarks] = useState('')
    const updateRemarks = useCallback((e) => {
        setRemarks(e.target.value)
    }, [])

    const [dept, setdept] = useState(0)
    const [deptSec, setdeptSec] = useState(0)
    const [tableDis, setTableDis] = useState(0)
    const [startdate, setStartdate] = useState(new Date())
    const [count, setCount] = useState(0)
    const [value, setValue] = useState(0)
    const [reqSlno, setReqSlno] = useState(0)
    const [patchInserDetl, setPatchInserDetl] = useState(0)
    const [msgShow, setMsgShow] = useState(0)
    //Item details initialization
    const [itemstate, setItemState] = useState({
        item_slno: '',
        item_desc: '',
        item_brand: '',
        item_qty: '',
        item_unit: '',
        item_spec: '',
        approx_cost: ''
    })
    //Destructuring
    const { item_slno, item_desc, item_brand, item_qty, item_unit, item_spec, approx_cost } = itemstate
    const updateItemState = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setItemState({ ...itemstate, [e.target.name]: value })
    }, [itemstate])
    //redux for geting login id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const updateExpectedDate = (e) => {
        setStartdate(e.target.value)
    }
    const [totalApproxCost, setTotalCost] = useState(0)
    //Items store array
    const [dataPost, setdataPost] = useState([])

    const AddItem = () => {
        setTableDis(1)
        const newdata = {
            id: Math.ceil(Math.random() * 1000),
            item_slno: parseInt(item_slno),
            item_desc: item_desc,
            item_brand: item_brand,
            item_unit: item_unit,
            item_qnty: parseInt(item_qty),
            item_specification: item_spec,
            aprox_cost: parseInt(approx_cost),
            item_status: 1
        }
        const datass = [...dataPost, newdata]

        if (datass.length !== 0) {
            setdataPost(datass)

            setTotalCost(totalApproxCost + parseInt(approx_cost))
            const resetarrray = {
                item_slno: '',
                item_desc: '',
                item_brand: '',
                item_qty: '',
                item_unit: '',
                item_spec: '',
                approx_cost: ''
            }
            setItemState(resetarrray)
        }
        else {
            warningNotify("Please Fill all fields")
        }
    }
    //redux for geting login emp secid
    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })
    const postData = useMemo(() => {
        return {
            actual_requirement: actual_require,
            needed: needed,
            request_dept_slno: dept,
            request_deptsec_slno: deptSec,
            location: location,
            create_user: id,
            remarks: remarks,
            total_approx_cost: totalApproxCost,
            expected_date: startdate,
            user_deptsec: empsecid
        }
    }, [actual_require, needed, dept, deptSec, location, id, remarks, startdate, totalApproxCost, empsecid])


    const patchData = useMemo(() => {
        return {
            actual_requirement: actual_require,
            needed: needed,
            request_dept_slno: dept,
            request_deptsec_slno: deptSec,
            location: location,
            remarks: remarks,
            total_approx_cost: totalApproxCost,
            expected_date: startdate,
            user_deptsec: empsecid,
            req_slno: reqSlno,
        }
    }, [actual_require, needed, dept, deptSec, location, remarks, startdate, totalApproxCost, empsecid, reqSlno])

    useEffect(() => {
        if (msgShow !== 0) {
            succesNotify("Update Successfully")
        }
    }, [msgShow])

    useEffect(() => {
        if (dataPost.length !== 0) {
            // const given_score = dataPost.reduce((accumulator, object) => {
            //     return accumulator + object.approx_cost
            // }, 0)

        }


    }, [dataPost])
    /*** usecallback function for form submitting */
    const submitComplaint = useCallback((e) => {
        e.preventDefault();
        //* Reset function
        const reset = () => {
            setActual_require('')
            setNeeded('')
            setLocation('')
            setRemarks('')
            setdept(0)
            setdeptSec(0)
            setTableDis(0)
            setTotalCost(0)
            setStartdate(new Date())
            setCount(0)
            setMsgShow(0)
            const resetdata = {
                item_slno: '',
                item_desc: '',
                item_brand: '',
                item_qty: '',
                item_unit: '',
                item_spec: '',
                approx_cost: ''
            }
            setItemState(resetdata)
            setdataPost([])
        }
        /***    * insert function for use call back     */
        const InsertFun = async (postData) => {
            const result = await axioslogin.post('/requestRegister', postData);
            const { success } = result.data;
            if (success === 1) {
                return result.data
            }
        }
        //** Inset api for detail */
        const InsertFundetl = async (insertid) => {
            if (dataPost.length !== 0) {
                const postdataDetl = dataPost && dataPost.map((val) => {
                    return {
                        req_slno: insertid,
                        item_slno: val.item_slno,
                        item_desc: val.item_desc,
                        item_brand: val.item_brand,
                        item_unit: val.item_unit,
                        item_qnty: val.item_qnty,
                        item_specification: val.item_specification,
                        aprox_cost: val.aprox_cost,
                        item_status: 1,
                        create_user: id
                    }
                })
                const result = await axioslogin.post('/requestRegister/postDetails', postdataDetl);
                const { message, success } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    reset()
                    setCount(count + 1)
                }
                else {
                    infoNotify("Datas Not Inserted")
                }
            }
        }

        //** Inset api for Approval */

        const InsertApproval = async (secid) => {

            const result = await axioslogin.get(`/requestRegister/getAuthorization/${secid}`)
            const { success } = result.data


            if (success === 1) {
                // const hod = data.filter(val => val.auth_post = 1 ? val.emp_id : null)
                // const incharge = data.filter(val => val.auth_post = 2 ? val.emp_id : null)

            }
            else {


            }

        }

        //** Inset api for detail */
        const PatchInsertFundetl = async (insertid) => {
            if (dataPost.length !== 0) {
                const postdataDetl = dataPost && dataPost.map((val) => {
                    return {
                        req_slno: insertid,
                        item_slno: val.item_slno,
                        item_desc: val.item_desc,
                        item_brand: val.item_brand,
                        item_unit: val.item_unit,
                        item_qnty: val.item_qnty,
                        item_specification: val.item_specification,
                        aprox_cost: val.aprox_cost,
                        item_status: 1,
                        create_user: id
                    }
                })
                const result = await axioslogin.post('/requestRegister/postDetails', postdataDetl);
                const { message, success } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    reset()
                    setCount(count + 1)
                }
                else {
                    infoNotify("Datas Not Inserted")
                }
            }
        }

        /***  update function for use call back     */
        const updateFun = async (patchData) => {
            const result = await axioslogin.patch('/requestRegister', patchData);
            const { success, message } = result.data;
            if (success === 2) {
                return result.data
            }
            else {
                infoNotify(message)
            }
        }

        /***  update function for use call back     */
        const updateReqDetl = async (dataPost) => {
            dataPost && dataPost.map((val) => {

                const getdmenu = async () => {

                    const dataaas = {
                        req_slno: val.req_slno,
                        item_slno: val.item_slno,
                        item_desc: val.item_desc,
                        item_brand: val.item_brand,
                        item_unit: val.item_unit,
                        item_qnty: val.item_qnty,
                        item_specification: val.item_specification,
                        aprox_cost: val.aprox_cost,
                        item_status: 1,
                        edit_user: id,
                        req_detl_slno: val.req_detl_slno
                    }

                    const result = await axioslogin.patch('/requestRegister/patchDetails', dataaas);
                    const { success } = result.data;
                    if (success === 2) {
                        setMsgShow(1)
                    }

                }
                getdmenu(val.req_detl_slno)
                return 0
            })


        }
        //** Call insert and detail api by using then. for getting insert id */

        if (value === 0) {
            InsertFun(postData).then((values) => {
                const { message, success, insertid } = values
                if (success === 1) {
                    if (dataPost.length !== 0) {
                        InsertFundetl(insertid);


                    }
                    else {
                        succesNotify(message)
                        setCount(count + 1)
                        reset()
                    }
                    InsertApproval(empsecid)
                }
                else {
                    infoNotify(message)
                    reset()
                }
            })
        }
        else {
            updateFun(patchData).then((values) => {
                const { success } = values
                if (success === 2) {
                    if ((patchInserDetl === 1) && (dataPost.length !== 0)) {
                        PatchInsertFundetl(reqSlno)

                    }
                    else if (dataPost.length !== 0) {
                        updateReqDetl(dataPost)


                    }
                }
                else {

                }

            })

        }
    }, [postData, dataPost, id, count, patchData, reqSlno, patchInserDetl, value, empsecid])


    //Data set for edit
    const rowSelect = useCallback((params) => {
        setValue(1);
        const data = params.api.getSelectedRows()
        const { req_slno, actual_requirement, location, request_dept_slno,
            needed, request_deptsec_slno, remarks, expected_date, total_approx_cost
        } = data[0]

        setActual_require(actual_requirement)
        setNeeded(needed)
        setLocation(location)
        setRemarks(remarks)
        setdept(request_dept_slno)
        setdeptSec(request_deptsec_slno)
        setStartdate(expected_date)
        setTotalCost(total_approx_cost)
        setReqSlno(req_slno)

        const InsertFun = async (req_slno) => {
            const result = await axioslogin.get(`/requestRegister/getItemList/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setdataPost(data)
                setTableDis(1)
            }
            else {
                setTableDis(0)
                setPatchInserDetl(1)
            }
        }
        InsertFun(req_slno)
    }, [])


    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])
    //fn for entire state referesh
    const refreshWindow = useCallback(() => {
        setActual_require('')
        setNeeded('')
        setTotalCost(0)
        setStartdate(new Date())
        setMsgShow(0)
    }, [])

    return (
        <CardMaster
            title="Common Request Form"
            submit={submitComplaint}
            close={backtoSetting}
            refresh={refreshWindow}
        >
            <Box sx={{ width: "100%" }}>
                <Paper square elevation={3} sx={{ p: 1 }}>
                    {/* 1st section starts */}
                    <Paper sx={{
                        width: '100%',
                        mt: 0.8
                    }} variant='outlined'>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', }
                        }}>
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <CustomPaperTitle heading="Actual Requirement" />
                                <Box sx={{
                                    display: 'flex',
                                    p: 0.5,
                                    width: '100%'
                                }} >
                                    <CustomTextarea
                                        required
                                        type="text"
                                        size="sm"
                                        style={{
                                            width: "100%",
                                            height: 70,
                                            boardColor: "#E0E0E0"
                                        }}
                                        value={actual_require}
                                        onchange={updateactual_require}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <CustomPaperTitle heading="Justification for the need" />
                                <Box sx={{
                                    display: 'flex',
                                    p: 0.5,
                                    width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
                                }} >
                                    <CustomTextarea
                                        required
                                        type="text"
                                        size="sm"
                                        style={{
                                            width: "100%",
                                            height: 70,
                                        }}
                                        value={needed}
                                        onchange={updateNeeded}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Paper>


                    {/*2 nd Section Start*/}
                    <Paper sx={{
                        width: '100%',
                        mt: 0.8
                    }} variant='outlined'>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row"
                        }}>
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <CustomPaperTitle heading="Requested Department Details" />
                                <Box sx={{
                                    width: "100%",
                                    p: 1,
                                    display: "flex",
                                    flexDirection: 'row'
                                }}>
                                    <Box sx={{
                                        width: "100%",
                                        pr: 1
                                    }}>
                                        <DepartmentSelect value={dept} setValue={setdept} />
                                    </Box>
                                    <Box sx={{
                                        width: "100%",
                                        pr: 1
                                    }}>
                                        <DeptSectionSelect value={deptSec} setValue={setdeptSec} />
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <CustomPaperTitle heading="Location" />
                                <TextFieldCustom
                                    type="text"
                                    size="sm"
                                    name="location"
                                    value={location}
                                    onchange={updateLocation}
                                />
                            </Box>
                        </Box>
                    </Paper>

                    {/* 3rd section starts */}
                    <Paper sx={{
                        width: '100%',
                        mt: 0.8
                    }} variant='outlined'>

                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <CustomPaperTitle heading="Estimate/Approximate/Requirement Details" />
                            <Box sx={{
                                width: "100%",
                                p: 1,
                                display: "flex",
                                flexDirection: 'row'
                            }}>
                                <Box sx={{
                                    width: "7%",
                                    display: "flex",
                                    flexDirection: "column",
                                    pr: 1
                                }}>
                                    <CustomPaperTitle heading="Item Slno" />
                                    <TextFieldCustom
                                        type="text"
                                        size="sm"
                                        name="item_slno"
                                        value={item_slno}
                                        onchange={updateItemState}
                                    />
                                </Box>

                                <Box sx={{
                                    width: "70%",
                                    display: "flex",
                                    pr: 1,
                                    flexDirection: "column"
                                }}>
                                    <CustomPaperTitle heading="Item Description" />
                                    <TextFieldCustom
                                        type="text"
                                        size="sm"
                                        name="item_desc"
                                        value={item_desc}
                                        onchange={updateItemState}
                                    />
                                </Box>

                                <Box sx={{
                                    width: "50%",
                                    display: "flex",
                                    flexDirection: "column",
                                    pr: 1
                                }}>
                                    <CustomPaperTitle heading="Item Brand" />
                                    <TextFieldCustom
                                        type="text"
                                        size="sm"
                                        name="item_brand"
                                        value={item_brand}
                                        onchange={updateItemState}
                                    />
                                </Box>

                                <Box sx={{
                                    width: "20%",
                                    display: "flex",
                                    flexDirection: "column",
                                    pr: 1
                                }}>
                                    <CustomPaperTitle heading="Unit" />
                                    <TextFieldCustom
                                        type="text"
                                        size="sm"
                                        name="item_unit"
                                        value={item_unit}
                                        onchange={updateItemState}
                                    />
                                </Box>

                                <Box sx={{
                                    width: "7%",
                                    display: "flex",
                                    flexDirection: "column",
                                    pr: 1
                                }}>
                                    <CustomPaperTitle heading="Quantity" />
                                    <TextFieldCustom
                                        type="text"
                                        size="sm"
                                        name="item_qty"
                                        value={item_qty}
                                        onchange={updateItemState}
                                    />
                                </Box>

                                <Box sx={{
                                    width: "70%",
                                    display: "flex",
                                    flexDirection: "column",
                                    pr: 1
                                }}>
                                    <CustomPaperTitle heading="Specification" />
                                    <TextFieldCustom
                                        type="text"
                                        size="sm"
                                        name="item_spec"
                                        value={item_spec}
                                        onchange={updateItemState}
                                    />
                                </Box>
                                <Box sx={{
                                    width: "7%",
                                    display: "flex",
                                    flexDirection: "column",
                                    pr: 1
                                }}>
                                    <CustomPaperTitle heading="Approx.Cost" />
                                    <TextFieldCustom
                                        type="text"
                                        size="sm"
                                        name="approx_cost"
                                        value={approx_cost}
                                        onchange={updateItemState}
                                    />
                                </Box>
                                <Box sx={{
                                    width: "7%",
                                    pt: 2
                                }}>
                                    <IconButton variant="outlined" color="primary" onClick={AddItem}>
                                        <MdOutlineAddCircleOutline size={30} />
                                    </IconButton>
                                </Box>
                            </Box>
                            {tableDis === 1 ?
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', }
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
                                        // flexDirection: 'column'
                                    }} >

                                        <ReqRegisterComp dataPost={dataPost} setdataPost={setdataPost} />

                                    </Box>
                                </Box>

                                : null}

                        </Box>
                    </Paper>

                    {/** 4th Section*/}
                    <Paper sx={{
                        width: '100%',
                        mt: 0.8
                    }} variant='outlined'>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', }
                        }}>
                            <Box sx={{
                                width: "200%",
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <CustomPaperTitle heading="Remarks" />
                                <Box sx={{
                                    display: 'flex',
                                    p: 0.5,
                                    width: '100%'
                                }} >
                                    <CustomTextarea

                                        required
                                        type="text"
                                        size="sm"
                                        style={{
                                            width: "100%",
                                            height: 50,
                                        }}
                                        value={remarks}
                                        onchange={updateRemarks}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{
                                width: "60%",
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <CustomPaperTitle heading="Expected Date" />
                                <Box sx={{
                                    display: 'flex',
                                    p: 0.5,
                                    width: '100%'
                                }} >
                                    <TextFieldCustom
                                        type="date"
                                        size="sm"
                                        min={new Date()}
                                        name="startdate"
                                        value={startdate}
                                        onchange={updateExpectedDate}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{
                                width: "40%",
                                display: "flex",
                                flexDirection: "column",
                                pr: 2, pt: 0.5
                            }}>
                                <CustomPaperTitle heading="Total Approx.Cost" />
                                <TextFieldCustom
                                    type="text"
                                    size="sm"
                                    name="totalApproxCost"
                                    value={totalApproxCost}
                                    disabled={true}
                                />
                            </Box>
                        </Box>
                    </Paper>

                    < Paper square elevation={0} sx={{
                        p: 1, pt: 0
                    }} >
                        <ReqRegisterTable count={count} rowSelect={rowSelect} />
                    </Paper >

                </Paper>
            </Box >
        </CardMaster >
    )
}

export default memo(ReqRegistration)