import { Box, Paper, Grid, IconButton, Typography } from '@mui/material';
import React, { Fragment, useCallback, useEffect, useMemo, useState, memo } from 'react'
import { useHistory } from 'react-router-dom';
import CardMaster from 'src/views/Components/CardMaster'
import { useDispatch, useSelector } from 'react-redux'
import { getComplaintDept } from 'src/redux/actions/ComplaintDept.action'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { getRequesttype } from 'src/redux/actions/RequestType.action';
import { getComplainttype } from 'src/redux/actions/ComplaintType.action';
import CustomTextarea from 'src/views/Components/CustomTextarea'
import { getHicpolicy } from 'src/redux/actions/HicPolicy.action'
import ComplaintCheckBox from '../ComplaintRegister/ComplaintCheckBox'
import DirectComplaintTable from './DirectComplaintTable';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import { Button, CssVarsProvider, Dropdown, Input, Menu, MenuButton, MenuItem, Tooltip, Typography as Typo } from '@mui/joy'
import CmpRequestTypeCheckBx from '../ComplaintRegister/CmpRequestTypeCheckBx'
import { getReqRegistListByDept } from 'src/redux/actions/ReqRegisterListByDept.action';
import { getCompliantRegTable } from 'src/redux/actions/ComplaintRegTable.action';
import { getComplaintSlno } from 'src/views/Constant/Constant'
import CustomBackDrop from 'src/views/Components/CustomBackDrop'
import CmRoomNameTypeList from 'src/views/CommonSelectCode/CmRoomNameTypeList';
import CmComplaintLocation from 'src/views/CommonSelectCode/CmComplaintLocation';
import { getDeptsection } from 'src/redux/actions/DeptSection.action';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { getRoomsNameNdTypeList } from 'src/redux/actions/CmRoomNameNdTypeList.action';

const DirectComplaintReg = () => {


    const dispatch = useDispatch();
    /*** Initializing */
    const history = useHistory();
    //state for critical checkbox
    const [crical, setCritical] = useState(false)
    //state for complaint priority
    const [priority, setpriority] = useState(0)
    //state for Priority Reson
    const [priorreason, setPriorreason] = useState('')
    //state for table rendering
    const [count, setCount] = useState(0)
    //state for knowing insert or edit to database
    const [edit, setEdit] = useState(0);
    //state for complaintdescription
    const [desc, setdesc] = useState('')
    //state for request type
    const [ReqType, setReqType] = useState(false)
    //state for complaint type
    const [cotype, setcotype] = useState(false)
    //state for complaint department
    const [codept, setcodept] = useState(null)
    //state for dep section select box
    const [depsec, setDepsec] = useState(0)
    // const [locations, setLocation] = useState(0)
    const [locationName, setlocationName] = useState("");
    const [complaint_slno, setComplaint] = useState(0)
    const [roomName, setRoomName] = useState(0)
    const [open, setOpen] = useState(false)
    const [cm_am_assetmap_slno, setcm_am_assetmap_slno] = useState('')
    const [deviceName, setdeviceName] = useState('')
    const [location, setlocation] = useState('')
    const [item_slno, setItem_slno] = useState(0)
    const [assetStatus, setAssetStatus] = useState(0)
    const [selectedAsset, setSelectedAsset] = useState('');
    const [menudata, setMenudata] = useState([])
    const [search, setSearch] = useState(0)
    const [select, setSelect] = useState(0)



    //redux for geting login id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })


    useEffect(() => {
        getComplaintSlno().then((val) => {
            setComplaint(val);
        })
    }, [count])

    const logOut_time = useSelector((state) => {
        return state.LoginUserData.logOut
    })

    useEffect(() => {
        const now = new Date()
        if (now.getTime() < new Date(logOut_time).getTime()) {
            history.push('/Home/DirectComplaint')
        }
        else {
            history.push('/')
        }
    }, [codept, history, logOut_time])

    //dispatching redux data hic,complaintype,requestype,complaintdept
    useEffect(() => {
        dispatch(getHicpolicy());
        dispatch(getComplaintDept());
        dispatch(getRequesttype());
        dispatch(getDeptsection())
        if (codept !== null) {
            dispatch(getComplainttype(codept));
        }
    }, [dispatch, codept])
    // getting redux data state
    const state = useSelector((state) => {
        return {
            complaintdeptdata: state.getComplaintDept.complaintdeptList || 0,
            requesttypedata: state.getRequesttype.requesttypeList || 0,
            complainttype: state.getComplainttype.complainttypeList || 0
            // hicpolicy: state.getHicpolicy.hicpolicyList || 0,
        }
    })
    //destructuring redux data
    const { complaintdeptdata, requesttypedata, complainttype } = state

    //function for complaint description state updation
    const complintdesc = useCallback((e) => {
        setdesc(e.target.value)
    }, [])
    const updatePriorreason = useCallback((e) => {
        setPriorreason(e.target.value)
    }, [])
    /*** Priority seting Check box */
    //fn for critical state updation
    const getCritical = useCallback((e) => {
        if (e.target.checked === true) {
            setCritical(true)
            setpriority(1)
        }
        else {
            setCritical(false)
            setpriority(0)
        }
    }, [])

    //state for hic
    const [checkHic, setChechHic] = useState(false)
    //fn for hic state updation
    const getHicCheck = useCallback((e) => {
        if (e.target.checked === true) {
            setChechHic(true)
        }
        else {
            setChechHic(false)
        }
    }, [])
    //function for reseting states to intial state
    // const reset = () => {
    //     setComplaint(0)
    //     setDepsec(0)
    //     setReqType(false)
    //     setcotype(false)
    //     setChechHic(false)
    //     setpriority(0)
    //     setcodept(null)
    //     setCritical(false)
    //     setdesc('')
    //     setcodept(null)
    //     setlocationName("")
    //     setPriorreason("")
    //     setCount(0)
    //     setEdit(0)
    //     setOpen(false)
    // }
    //Data set for edit
    const rowSelect = useCallback((params) => {
        setEdit(1)
        setSelect(1)
        setSearch(0)
        const data = params.api.getSelectedRows()
        const { complaint_dept_secslno, complaint_hicslno,
            rm_room_slno, priority_reason, complaint_typeslno, priority_check,
            complaint_request_slno, complaint_deptslno, complaint_slno, complaint_desc } = data[0];
        setComplaint(complaint_slno)
        setDepsec(complaint_dept_secslno)
        setReqType(complaint_request_slno)
        setcotype(complaint_typeslno)
        // setLocation(cm_location)
        setRoomName(rm_room_slno)
        setChechHic(complaint_hicslno === 1 ? true : false)
        setpriority(priority_check)
        setcodept(complaint_deptslno)
        setdesc(complaint_desc)
        setPriorreason(priority_check === 1 ? priority_reason : null)
        setCritical(priority_check === 1 ? true : false)

    }, [])
    //update data
    const patchdata = useMemo(() => {
        return {
            complaint_desc: desc,
            complaint_dept_secslno: depsec,
            complaint_request_slno: ReqType,
            complaint_deptslno: codept,
            complaint_typeslno: cotype,
            priority_check: priority,
            complaint_hicslno: checkHic === true ? 1 : 0,
            compalint_status: 0,
            cm_location: depsec,
            edit_user: id,
            priority_reason: priority === 1 ? priorreason : null,
            complaint_slno: complaint_slno,
            rm_room_slno: roomName,
        }
    }, [desc, depsec, ReqType, codept, priorreason, cotype, priority, checkHic, complaint_slno, roomName, id])
    //insert data
    const postdata = useMemo(() => {
        return {
            complaint_slno: complaint_slno,
            complaint_desc: desc,
            complaint_dept_secslno: depsec,
            complaint_request_slno: ReqType,
            complaint_deptslno: codept,
            complaint_typeslno: cotype,
            priority_check: priority,
            complaint_hicslno: checkHic === true ? 1 : 0,
            compalint_status: 0,
            cm_location: depsec,
            create_user: id,
            priority_reason: priority === 1 ? priorreason : null,
            locationName: locationName,
            rm_room_slno: roomName,
            priority: priority === 1 ? "Priority Ticket" : "Normal Ticket"
        }
    }, [desc, depsec, roomName, ReqType, cotype, priority, priorreason, checkHic, complaint_slno, locationName, codept, id])


    useEffect(() => {
        if (edit === 1) {
            const getAssetinComplaint = async (complaint_slno) => {
                const result = await axioslogin.get(`/complaintreg/getAssetinComplaint/${complaint_slno}`);
                return result.data
            }
            const getAssetDetails = async (cm_am_assetmap_slno) => {
                const result = await axioslogin.get(`/ItBillAdd/getAssetDetails/${cm_am_assetmap_slno}`);
                return result.data
            }
            getAssetinComplaint(complaint_slno).then((value) => {
                const { success, data } = value
                if (success === 2) {
                    if (data.length !== 0) {
                        const { cm_am_assetmap_slno } = data[0]
                        getAssetDetails(cm_am_assetmap_slno).then((value) => {
                            const { success, dataa } = value;
                            if (success === 2) {
                                const { item_asset_no_only, item_name } = dataa[0]
                                setSelectedAsset(item_name)
                                setItem_slno(item_asset_no_only)
                            }
                            else {
                                setSelectedAsset('')
                                setItem_slno(0)
                            }
                        })
                    }
                    else {
                        setSelectedAsset('')
                        setItem_slno(0)
                    }
                }
                else {
                    infoNotify("Unable to add asset details")

                }
            })

        }
        else {
            setSelectedAsset('')
            setItem_slno('')
        }
    }, [complaint_slno, edit, cm_am_assetmap_slno])

    const submitComplaint = useCallback((e) => {
        e.preventDefault();
        if (cm_am_assetmap_slno !== '' && assetStatus === 0) {
            infoNotify(
                <>please click &apos;<SubdirectoryArrowRightIcon />&apos; asset to view Asset details</>
            );
        } else {
            setOpen(true)
            const reset = () => {
                setComplaint(0)
                // setsec(0)
                setReqType(false)
                setcotype(false)
                setChechHic(false)
                setpriority(0)
                setcodept(null)
                setCritical(false)
                setdesc('')
                setDepsec(0)
                setcodept(null)
                setPriorreason("")
                setCount(0)
                setEdit(0)
                setOpen(false)
                setdeviceName('')
                setlocation('')
                setItem_slno(0)
                setcm_am_assetmap_slno('')
                setSelectedAsset('')
                setSearch(0)
                setSelect(0)
                setRoomName('')
            }

            const InsertFun = async (postdata) => {
                const result = await axioslogin.post('/directcmreg', postdata);
                return result.data
            }
            const InsertAsset = async (inserAsset) => {
                const result = await axioslogin.post('Rectifycomplit/AssetMappComplaint', inserAsset);
                return result.data
            }
            const updateFun = async (patchdata) => {
                const result = await axioslogin.patch('/directcmreg', patchdata);
                return result.data
            }
            const updateAssets = async (updateAsset) => {
                const result = await axioslogin.patch('complaintreg/UpdateAssetinComplaint', updateAsset);
                return result.data
            }

            if (edit === 1) {
                updateFun(patchdata).then((value) => {
                    const { message, success, Complt_id } = value
                    if (success === 2) {
                        const updateAsset = {
                            cm_complait_slno: Complt_id,
                            cm_am_assetmap_slno: item_slno,
                            edit_user: id
                        }
                        if (cm_am_assetmap_slno !== '' || item_slno !== '') {
                            updateAssets(updateAsset).then((value) => {
                                const { success } = value
                                if (success === 2) {
                                    succesNotify("Complaint Updated Successfully")
                                    setCount(count + 1);
                                    setOpen(false)
                                    reset()
                                }
                                else {
                                    infoNotify("Unable to add asset details")

                                }
                            })
                        }
                        else {
                            succesNotify(message)
                            setCount(count + 1);
                            reset()
                            setOpen(false)
                        }
                    }
                    else {
                        infoNotify(message)
                        setOpen(false)
                    }
                })
                updateFun(patchdata)
            }
            else {
                InsertFun(postdata).then((value) => {
                    const { message, success, insertId } = value
                    if (success === 1) {
                        const inserAsset = {
                            cm_complait_slno: insertId,
                            cm_am_assetmap_slno: item_slno,
                            create_user: id
                        }
                        if (cm_am_assetmap_slno !== '' || item_slno !== '') {
                            InsertAsset(inserAsset).then((value) => {
                                const { success } = value
                                if (success === 1) {
                                    succesNotify("Complaint Registered Successfully")
                                    setCount(count + 1);
                                    reset()
                                    setOpen(false)
                                }
                                else {
                                    infoNotify("Unable to add asset details")
                                }
                            })
                        }
                        else {
                            succesNotify(message)
                            setCount(count + 1);
                            reset()
                            setOpen(false)
                        }
                    }
                    else {
                        infoNotify(message)
                        setOpen(false)
                    }
                })
                InsertFun(postdata)
            }
        }

    }, [postdata, edit, patchdata, count, item_slno, cm_am_assetmap_slno, assetStatus, id])


    //refersh function
    const refreshWindow = useCallback(() => {
        setComplaint(0)
        setDepsec(0)
        setReqType(false)
        setcotype(false)
        setChechHic(false)
        setpriority(0)
        setcodept(null)
        setCritical(false)
        setdesc('')
        setcodept(null)
        // setLocation(0)
        setlocationName("")
        setPriorreason("")
        setCount(0)
        setEdit(0)
        setOpen(false)
        setMenudata([])
    }, [])
    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])

    useEffect(() => {
        if (ReqType === 2) {
            history.push('/Home/RequestRegister')
        }
    }, [ReqType, history])
    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })


    useEffect(() => {
        if (empsecid !== 0) {
            dispatch(getCompliantRegTable(empsecid))
            dispatch(getReqRegistListByDept(empsecid))
        }
    }, [count, empsecid, dispatch])

    useEffect(() => {
        dispatch(getRoomsNameNdTypeList(depsec))
    }, [dispatch, depsec])

    const compallTable = useSelector((state) => {
        return state.setComplaintRegTable.complaintRegTableList
    })
    const reqestTotal = useSelector((state) => {
        return state.setRequestListByDeptSec.RequestListall
    })

    const pendingTckt = compallTable.filter((val) => {
        return val.compalint_status === 0
    })

    const AssignedTckt = compallTable.filter((val) => {
        return val.compalint_status === 1
    })

    const VerificationPendingTckt = compallTable.filter((val) => {
        return val.compalint_status === 2
    })

    const onholdList = compallTable.filter((val) => {
        return val.cm_rectify_status === 'O'

    })
    const reqList = reqestTotal.filter((val) => {
        return val.rm_ndrf === 0
    })

    const reqPending = reqestTotal.filter((val) => {
        return val.req_status === 'P'
    })

    const UpdateAssetNo = useCallback((e) => {
        setcm_am_assetmap_slno(e.target.value.toLocaleUpperCase())
        setlocation('')
        setdeviceName('')
        setAssetStatus(0)
    }, [])

    const searchAssetNo = useCallback((e) => {
        if (cm_am_assetmap_slno === '') {
            infoNotify('Please Enter Asset Number')
        }
        else {
            // const parts = cm_am_assetmap_slno.split('/');
            // const assetno = parts[parts.length - 1];
            // const Custodian = parts[parts.length - 2];
            // const firstname = parts[parts.length - 3];
            // const starts = firstname + '/' + Custodian
            // const asset_number = parseInt(assetno)

            const firstname = 'TMC'
            const Custodian = codept === 1 ? 'BME' : codept === 2 ? 'MAIN' :
                codept === 3 ? 'IT' : codept === 4 ? 'HSK' : codept === 5 ? 'OPE' : ''
            const starts = firstname + '/' + Custodian
            const asset_number = parseInt(cm_am_assetmap_slno)

            const postdata = {
                item_asset_no: starts,
                item_asset_no_only: asset_number
            }
            const getAssetdata = async (postdata) => {
                const result = await axioslogin.post('/PasswordManagementMain/getAssetNo', postdata)
                const { data, success } = result.data
                if (data.length !== 0) {
                    if (success === 1) {
                        const { item_name, sec_name, am_item_map_slno } = data[0]
                        setlocation(sec_name)
                        setdeviceName(item_name)
                        setItem_slno(am_item_map_slno)
                    }
                    return result.data
                }
                else {
                    warningNotify('Asset number not found')
                }
            }
            getAssetdata(postdata)
            setAssetStatus(1)
        }
    }, [cm_am_assetmap_slno])



    useEffect(() => {
        if (depsec !== '') {
            const getAssetItembsedonLocation = async (depsec) => {
                const result = await axioslogin.get(`Rectifycomplit/getlocationbsedAsset/${depsec}`)
                const { success, data } = result.data
                if (success === 1) {
                    setMenudata(data);
                }
                else {
                    setMenudata([])
                }
            }
            getAssetItembsedonLocation(depsec)
        }
        else {
            setMenudata([]);
        }
    }, [depsec])



    const handleAssetSelect = (val) => {
        setSelectedAsset(`${val.item_name} (${val.am_asset_no === null ? '' : val.am_asset_no})`);
        setItem_slno(val.am_item_map_slno)
    };

    const handleClearSelection = () => {
        setItem_slno(0);
        setSelectedAsset('');
    };

    const ClearAssetSelection = () => {
        setItem_slno(0);
        setcm_am_assetmap_slno('')
        setdeviceName('')
        setlocation('')
    };

    const SearchAsset = useCallback((e) => {
        setSearch(1)
        setSelect(0)
        setSelectedAsset('')
    }, [])

    const SelectAsset = useCallback((e) => {
        setSelect(1)
        setSearch(0)
        setcm_am_assetmap_slno('')
        setdeviceName('')
        setlocation('')
    }, [])


    return (
        <Fragment>
            <CardMaster
                title="Direct Complaint Registration"
                submit={submitComplaint}
                close={backtoSetting}
                refresh={refreshWindow}
                contentStyle={{
                    p: 0,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <CustomBackDrop open={open} text="Please Wait" />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%'
                }} >
                    <Box sx={{ display: 'flex', flex: 1, width: '80%', p: 0.5, flexDirection: 'column', }} >
                        <Paper variant='outlined' sx={{ p: 0.5, display: 'flex' }} square>
                            {
                                requesttypedata?.map((value) => {
                                    return <CmpRequestTypeCheckBx
                                        key={value.req_type_slno}
                                        label={value.req_type_name}
                                        name={value.req_type_name}
                                        value={value.req_type_slno}
                                        onChange={setReqType}
                                        checkedValue={ReqType}
                                    />
                                })
                            }
                        </Paper>
                        <Paper variant='outlined' sx={{ p: 0.5 }} square >
                            <Box>
                                <CssVarsProvider>
                                    <Typo level="h2" fontSize="sm" sx={{ mb: 0.5, color: 'neutral.400' }}>
                                        COMPLAINT DEPARTMENT
                                    </Typo>
                                </CssVarsProvider>
                            </Box>
                            {/* complaint department */}
                            <Box sx={{ display: 'flex', flex: 1, p: 1 }} >
                                {
                                    complaintdeptdata && complaintdeptdata.map((val) => {
                                        return <Grid item xs={2} sm={4} md={4} lg={2} xl={3} key={val.complaint_dept_slno} sx={{ width: '100%' }} >
                                            <ComplaintCheckBox
                                                label={val.complaint_dept_name}
                                                name={val.complaint_dept_name}
                                                value={val.complaint_dept_slno}
                                                onChange={setcodept}
                                                checkedValue={codept}
                                                setcm_am_assetmap_slno={setcm_am_assetmap_slno}
                                                setlocation={setlocation}
                                                setdeviceName={setdeviceName}
                                                setSelectedAsset={setSelectedAsset}
                                                setItem_slno={setItem_slno}
                                            />
                                        </Grid>
                                    })
                                }
                            </Box>
                        </Paper>
                        {/* complaint type */}
                        {codept !== null ?
                            <Paper variant='outlined' sx={{ p: 0.5 }} square >
                                <Box>
                                    <CssVarsProvider>
                                        <Typo level="h2" fontSize="sm" sx={{ mb: 0.5, color: 'neutral.400' }}>
                                            COMPLAINT TYPE
                                        </Typo>
                                    </CssVarsProvider>
                                </Box>
                                {/* complaint department */}
                                <Box sx={{ display: 'flex', flex: 1, p: 1 }} >
                                    <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                                        {
                                            complainttype && complainttype.map((val) => {
                                                return <Grid item xs={2} sm={4} md={4} lg={2} xl={3} key={val.complaint_type_slno} sx={{ width: '100%' }}>
                                                    <ComplaintCheckBox
                                                        label={val.complaint_type_name}
                                                        name={val.complaint_type_name}
                                                        value={val.complaint_type_slno}
                                                        onChange={setcotype}
                                                        checkedValue={cotype}
                                                        setcm_am_assetmap_slno={setcm_am_assetmap_slno}
                                                        setlocation={setlocation}
                                                        setdeviceName={setdeviceName}
                                                        setSelectedAsset={setSelectedAsset}
                                                        setItem_slno={setItem_slno}
                                                    />
                                                </Grid>
                                            })
                                        }

                                    </Grid>
                                </Box>
                            </Paper> :
                            // <CircularProgress sx={{ color: 'pink' }} />
                            null
                        }


                        <Paper variant='outlined' square >
                            <Typography sx={{ color: '#9FA6AD', fontWeight: 800, fontSize: 12, pl: .8, py: .5 }} >
                                COMPLAINT LOCATION
                            </Typography>
                            <Box sx={{ px: 0.5, pb: .5, display: 'flex' }}>
                                <Box sx={{ flex: .4, px: .5, pt: .8 }} >
                                    <CmComplaintLocation cmSection={depsec} setCmSection={setDepsec} setCmSectionName={setlocationName} />
                                </Box>
                                <Box sx={{ flex: .6, px: 0.5, pt: .7 }} >
                                    <CmRoomNameTypeList roomName={roomName} setRoomName={setRoomName} />
                                </Box>
                                <Box sx={{ flex: .2, display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 0.8 }} >
                                    <CssVarsProvider>
                                        <Tooltip title="Infection Control Risk Assessment (ICRA) Recommended" size="md" variant="outlined" placement="top">
                                            <Grid item xs={2} sm={4} md={4} lg={2} xl={3} >
                                                <CusCheckBox
                                                    color="danger"
                                                    size="lg"
                                                    name="Hic"
                                                    label="(ICRA)"
                                                    value={checkHic}
                                                    onCheked={getHicCheck}
                                                    checked={checkHic}
                                                />
                                            </Grid>
                                        </Tooltip>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        </Paper>
                        <Box >
                            <Paper variant='outlined' square sx={{ flex: 1, }}>
                                <Box sx={{ flex: 1, flexGrow: 1, p: .8, }}>
                                    <Box sx={{ flex: .8, pr: .5, }}>
                                        <Typography sx={{ color: '#9FA6AD', fontWeight: 800, fontSize: 12, pl: .3, pb: .5 }}>
                                            ASSET DETAILS
                                        </Typography>
                                        <Box sx={{ pt: .5, display: 'flex' }}>
                                            <Box sx={{
                                                bgcolor: search === 1 ? '#F0F4F8' : search === 0 ? 'white' : '#F0F4F8',
                                                boxShadow: search === 1 ? 2 : search === 0 ? 0 : 2,
                                                border: search === 1 ? 1 : search === 0 ? 0 : 1,
                                                borderColor: search === 1 ? '#CDD7E1' : search === 0 ? 'white' : '#CDD7E1',
                                                height: 29,
                                                px: 1, color: 'black', borderRadius: 0, cursor: 'pointer'
                                            }} onClick={SearchAsset}>
                                                search <SearchSharpIcon fontSize='sm' sx={{ color: '#394E6C' }} />
                                            </Box>&nbsp;/&nbsp;
                                            <Box sx={{
                                                bgcolor: select === 1 ? '#F0F4F8' : select === 0 ? 'white' : '#F0F4F8',
                                                boxShadow: select === 1 ? 2 : select === 0 ? 0 : 2,
                                                border: select === 1 ? 1 : select === 0 ? 0 : 1,
                                                borderColor: select === 1 ? '#CDD7E1' : select === 0 ? 'white' : '#CDD7E1',
                                                height: 29, mr: 1,
                                                px: 1, color: 'black', borderRadius: 0, cursor: 'pointer'
                                            }} onClick={SelectAsset}>
                                                select <ArrowDropDownSharpIcon fontSize='sm' sx={{ color: '#394E6C' }} />
                                            </Box>


                                            {select === 1 ?
                                                <Box >
                                                    <CssVarsProvider>
                                                        <Input
                                                            placeholder="Select Asset"
                                                            sx={{
                                                                minHeight: 15,
                                                                borderRadius: 0,
                                                                width: selectedAsset === '' ? 320 : 500,
                                                            }}
                                                            readOnly
                                                            endDecorator={
                                                                <Dropdown >
                                                                    <MenuButton variant='plain' sx={{ p: 0 }}>
                                                                        <ArrowDropDownIcon sx={{ cursor: 'pointer', height: 25, width: 25 }} />
                                                                    </MenuButton>
                                                                    {menudata.length !== 0 ?
                                                                        <Menu sx={{ maxWidth: 450, maxHeight: 370, overflow: 'auto' }}>
                                                                            <MenuItem
                                                                                sx={{ borderBottom: 1, borderColor: '#F0F3F5', fontSize: 14, fontStyle: 'italic' }}
                                                                                onClick={handleClearSelection}
                                                                            >
                                                                                (Clear Selected)
                                                                            </MenuItem>
                                                                            {menudata.map((val, index) => (
                                                                                < MenuItem
                                                                                    sx={{ borderBottom: 1, borderColor: '#F0F3F5' }}
                                                                                    key={index}
                                                                                    onClick={() => handleAssetSelect(val)}
                                                                                >

                                                                                    {val.item_name} ({val.am_asset_no})
                                                                                </MenuItem>
                                                                            ))}
                                                                        </Menu>
                                                                        :
                                                                        <Menu>
                                                                            <MenuItem>
                                                                                No Asset Added Under section
                                                                            </MenuItem>
                                                                        </Menu>}
                                                                </Dropdown>
                                                            }
                                                            name='assetmap_slno'
                                                            value={selectedAsset || ''}
                                                            disabled={cm_am_assetmap_slno !== ''}
                                                        />
                                                    </CssVarsProvider>
                                                </Box>
                                                : null}


                                            {search === 1 ?
                                                <Box sx={{ flex: 1, display: 'flex', }}>
                                                    <Box sx={{ pl: .1, }}>
                                                        <CssVarsProvider>
                                                            <Input
                                                                type='number'
                                                                autoComplete='off'
                                                                startDecorator={
                                                                    <Button variant="soft" color="neutral" >
                                                                        {`TMC/${codept === 1 ? 'BME/' : codept === 2 ? 'MAIN/' :
                                                                            codept === 3 ? 'IT/' : codept === 4 ? 'HSK/' : codept === 5 ? 'OPE/' : ''}`}
                                                                    </Button>
                                                                }
                                                                placeholder="Search Asset Number"
                                                                sx={{ borderRadius: 0, width: 320, minHeight: 15, }}
                                                                endDecorator={
                                                                    <>
                                                                        {cm_am_assetmap_slno !== '' ?
                                                                            <Box
                                                                                sx={{ cursor: 'pointer', fontSize: 13, fontStyle: 'italic', mr: .3 }}
                                                                                onClick={ClearAssetSelection}
                                                                            >
                                                                                (Clear)
                                                                            </Box>
                                                                            :
                                                                            <></>}

                                                                        <Button variant="solid" color="neutral" onClick={searchAssetNo}>
                                                                            <SubdirectoryArrowRightIcon
                                                                                sx={{ cursor: 'pointer' }}
                                                                            />
                                                                        </Button>
                                                                    </>

                                                                }

                                                                name='cm_am_assetmap_slno'
                                                                value={cm_am_assetmap_slno || ''}
                                                                onChange={UpdateAssetNo}
                                                            />
                                                        </CssVarsProvider>
                                                    </Box>
                                                    <Box sx={{ flex: 1, }}>
                                                        {deviceName !== '' ?
                                                            <Box sx={{ display: 'flex', pt: .3 }}>
                                                                <Typography sx={{ fontSize: 14, pl: 1.5, pt: 1 }}>
                                                                    Asset Name :
                                                                </Typography>
                                                                <Box sx={{
                                                                    flex: 1, px: .5, ml: .8, bgcolor: '#E1E1E1', py: .7, color: 'black',
                                                                    border: 1, borderColor: '#E8F0FE'
                                                                }}>
                                                                    {deviceName}
                                                                </Box>
                                                            </Box>
                                                            :
                                                            null}
                                                    </Box>
                                                    <Box sx={{ flex: .6, }}>
                                                        {location !== '' ?
                                                            <Box sx={{ display: 'flex' }}>
                                                                <Typography sx={{ fontSize: 14, pl: 1.5, pt: 1 }}>
                                                                    Location :
                                                                </Typography>
                                                                <Box sx={{
                                                                    flex: 1, px: .5, ml: .8, bgcolor: '#E1E1E1', py: .7, color: 'black',
                                                                    border: 1, borderColor: '#E8F0FE',
                                                                }}>
                                                                    {location}
                                                                </Box>
                                                            </Box>
                                                            :
                                                            null}
                                                    </Box>
                                                </Box> :
                                                null}
                                        </Box>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                        <Paper variant='outlined' sx={{ p: 0.5, display: 'flex', flex: 1 }} square >
                            <Box sx={{ width: '80%' }} >
                                <CustomTextarea
                                    placeholder="complaint descrition"
                                    required
                                    type="text"
                                    size="sm"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    value={desc}
                                    onchange={complintdesc}
                                />
                            </Box>
                            <Box sx={{
                                display: 'flex', flexDirection: 'column',
                                width: '20%', px: 1, pt: 0.5, flex: 1, justifyContent: 'center',
                            }} >
                                <Box sx={{
                                    display: 'flex',
                                    pt: 0.8
                                }} >
                                    <Grid item xs={2} sm={4} md={4} lg={2} xl={3} >
                                        <CusCheckBox
                                            // variant="outlined"
                                            color="danger"
                                            size="lg"
                                            name="crical"
                                            label="Priority"
                                            value={crical}
                                            onCheked={getCritical}
                                            checked={crical}
                                        />
                                    </Grid>
                                </Box>

                                {
                                    crical === true ?
                                        <Box sx={{ width: '100%', pt: 0.5 }} >
                                            <CustomTextarea
                                                style={{ width: 250 }}
                                                minRows={2}
                                                maxRows={2}
                                                required
                                                type="text"
                                                placeholder="Remarks"
                                                name='priorreason'
                                                value={priorreason}
                                                onchange={updatePriorreason}
                                            />
                                        </Box>

                                        : null
                                }
                            </Box>
                        </Paper>
                    </Box>
                    <Box sx={{ display: 'flex', width: '20%', p: 0.5, overflow: 'auto' }} >
                        <Paper variant='outlined'
                            sx={{
                                display: 'flex',
                                flex: 1, p: 1,
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }} >
                            <CssVarsProvider>
                                <Button
                                    startDecorator={<h3>{pendingTckt.length}</h3>}
                                    size="lg"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ my: 0.2, display: 'flex', flex: 1, justifyContent: 'space-between' }}
                                >Pending Ticket</Button>
                                <Button
                                    startDecorator={<h3>{reqList.length}</h3>}
                                    size="lg"
                                    variant="outlined"
                                    fullWidth
                                    color="danger"
                                    sx={{ my: 0.2, display: 'flex', flex: 1, justifyContent: 'space-between' }}
                                >Request Info</Button>
                                <Button
                                    startDecorator={<h3>{AssignedTckt.length}</h3>}
                                    size="lg"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ my: 0.2, display: 'flex', flex: 1, justifyContent: 'space-between' }}
                                >Assigned Ticket</Button>
                                <Button
                                    startDecorator={<h3>{onholdList.length}</h3>}
                                    size="lg"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ my: 0.2, display: 'flex', flex: 1, justifyContent: 'space-between' }}
                                >OnHold Ticket</Button>
                                <Button
                                    startDecorator={<h3>{VerificationPendingTckt.length}</h3>}
                                    size="lg"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ my: 0.2, display: 'flex', flex: 1, justifyContent: 'space-between' }}
                                >Verification Pending</Button>
                                <Button
                                    startDecorator={<h3>{reqPending.length}</h3>}
                                    size="lg"
                                    variant="outlined"
                                    fullWidth
                                    color="danger"
                                    sx={{ my: 0.2, display: 'flex', flex: 1, justifyContent: 'space-between' }}
                                >OnHold/Rejected</Button>
                            </CssVarsProvider>
                        </Paper>
                    </Box>
                </Box>

            </CardMaster >

            < Paper square elevation={0} sx={{
                p: 1, pt: 0
            }} >
                <DirectComplaintTable
                    rowSelect={rowSelect} count={count} setCount={setCount} />
            </Paper >

            <Paper square sx={{
                display: "flex",
                p: 1,
                alignItems: "center",
            }}  >
                <Box sx={{ display: "flex" }}>
                    <IconButton >
                        <CropSquareIcon sx={{ background: '#f44336', pr: 5 }} />
                    </IconButton>
                </Box>
                <Box sx={{ display: "flex", width: "98%", fontWeight: 400, pl: 2 }}>
                    <Typography >
                        Priority Critical
                    </Typography>
                </Box>
            </Paper>
        </Fragment >
    )
}

export default memo(DirectComplaintReg)




