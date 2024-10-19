import { Box, Grid, Paper, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState, useMemo, Fragment } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getComplaintDept } from 'src/redux/actions/ComplaintDept.action'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { getRequesttype } from 'src/redux/actions/RequestType.action';
import { getComplainttype } from 'src/redux/actions/ComplaintType.action';
import CustomTextarea from 'src/views/Components/CustomTextarea'
import { getHicpolicy } from 'src/redux/actions/HicPolicy.action'
import ComplaintRegTable from './ComplaintRegTable'
import { setLoginProfileData } from 'src/redux/actions/LoginProfile.action'
import ComplaintCheckBox from './ComplaintCheckBox'
import EngineeringIcon from '@mui/icons-material/Engineering';
import {
    Avatar,
    Button, Chip, CssVarsProvider, Input,
    Tooltip,
    Typography as Typo
} from '@mui/joy'
import { memo } from 'react'
import { getCompliantRegTable } from 'src/redux/actions/ComplaintRegTable.action'
import { getReqRegistListByDept } from 'src/redux/actions/ReqRegisterListByDept.action'
import ComDeptCheckBox from './ComDeptCheckBox'
import { getComplaintSlno } from 'src/views/Constant/Constant'
import CustomBackDrop from 'src/views/Components/CustomBackDrop'
import CmRoomNameTypeList from 'src/views/CommonSelectCode/CmRoomNameTypeList'
import { getRoomsNameNdTypeList } from 'src/redux/actions/CmRoomNameNdTypeList.action'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Done from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import SquareIcon from '@mui/icons-material/Square';
import CommentIcon from '@mui/icons-material/Comment';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import imageCompression from 'browser-image-compression';
import CloseIcon from '@mui/icons-material/Close';
import CmAssetList from '../CmComponent/CmAssetList'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ComplaintRegistrMast = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [crical, setCritical] = useState(false)
    const [priority, setpriority] = useState(0)
    const [count, setCount] = useState(0)
    const [edit, setEdit] = useState(0)
    const [desc, setdesc] = useState('')
    const [priorreason, setPriorreason] = useState('')
    const [ReqType, setReqType] = useState(false)
    const [cotype, setcotype] = useState(false)
    const [codept, setcodept] = useState(null)
    const [depsec, setDepsec] = useState(0)
    const [roomName, setRoomName] = useState(null)
    const [open, setOpen] = useState(false)
    const [complaint_slno, setComplaint] = useState(0)
    const [cm_am_assetmap_slno, setcm_am_assetmap_slno] = useState('')
    const [item_slno, setItem_slno] = useState(0)
    const [assetStatus, setAssetStatus] = useState(0)
    const [selectedAsset, setSelectedAsset] = useState('');
    const [search, setSearch] = useState(0)
    const [select, setSelect] = useState(1)
    const [assetArray, setAssetArray] = useState([]);
    const [deletedFiles, setDeletedFiles] = useState([]);
    const [newlyAddedAssets, setNewlyAddedAssets] = useState([])
    const [selectFile, setSelectFile] = useState([]);
    const [insertId, setinsertId] = useState(complaint_slno)
    const [assetData, setassetData] = useState(0)
    const [asset_dept, setasset_dept] = useState('')


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
            history.push('/Home/ComplaintRegister')
        }
        else {
            history.push('/')
        }

    }, [codept, history, logOut_time])

    //redux for geting login id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const secName = useSelector((state) => {
        return state.LoginUserData.empdeptsec
    })
    // const deptsec = useSelector((state) => {
    //     return state.getLoginProfileData.loginProfiledata
    // })
    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })

    useEffect(() => {
        dispatch(getRoomsNameNdTypeList(empsecid))
    }, [dispatch, empsecid])

    //dispatching redux data hic,complaintype,requestype,complaintdept
    useEffect(() => {
        dispatch(getHicpolicy());
        dispatch(getComplaintDept());
        dispatch(getRequesttype());
        if (codept !== null) {
            dispatch(getComplainttype(codept));
        }
        dispatch(setLoginProfileData(id))
    }, [dispatch, id, codept,])

    // getting redux data state
    const state = useSelector((state) => {
        return {
            complaintdeptdata: state.getComplaintDept.complaintdeptList || 0,
            requesttypedata: state.getRequesttype.requesttypeList || 0,
            complainttype: state.getComplainttype.complainttypeList || 0,
            hicpolicy: state.getHicpolicy.hicpolicyList || 0,
        }
    })
    //destructuring redux data
    const { complaintdeptdata, complainttype } = state

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

    const [checkHic, setChechHic] = useState(false)
    const getHicCheck = useCallback((e) => {
        if (e.target.checked === true) {
            setChechHic(true)
        }
        else {
            setChechHic(false)
        }
    }, [])

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

    const handleRemoveFile = (index) => {
        setSelectFile((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1); // Remove the file at the specified index
            return updatedFiles;
        });
    };

    //insert data
    const postdata = useMemo(() => {
        return {
            complaint_slno: complaint_slno,
            complaint_desc: desc,
            complaint_dept_secslno: empsecid,
            complaint_request_slno: 1,
            complaint_deptslno: codept,
            complaint_typeslno: cotype,
            priority_check: priority,
            complaint_hicslno: checkHic === true ? 1 : 0,
            compalint_status: 0,
            cm_location: empsecid,
            create_user: id,
            priority_reason: priority === 1 ? priorreason : null,
            locationName: secName,
            priority: priority === 1 ? "Priority Ticket" : "Normal Ticket",
            rm_room_slno: roomName === '' ? null : roomName
        }
    }, [desc, empsecid, cotype, priorreason, priority, codept, id, secName, complaint_slno, roomName, checkHic])




    //Data set for edit
    const rowSelect = useCallback((val) => {
        setEdit(1);
        setSelect(1)
        setSearch(0)
        const { complaint_typeslno, complaint_hicslno,
            cm_location, priority_reason, complaint_request_slno, complaint_deptslno, complaint_slno,
            complaint_desc, priority_check, rm_room_slno } = val;
        setDepsec(cm_location)
        setComplaint(complaint_slno)
        setReqType(complaint_request_slno)
        setcotype(complaint_typeslno)
        setChechHic(complaint_hicslno === 1 ? true : false)
        setpriority(priority_check)
        setcodept(complaint_deptslno)
        setdesc(complaint_desc)
        setPriorreason(priority_reason)
        setCritical(priority_check === 1 ? true : false)
        setRoomName(rm_room_slno)
    }, [])
    //update data
    const patchdata = useMemo(() => {
        return {
            complaint_desc: desc,
            complaint_dept_secslno: empsecid,
            complaint_request_slno: 1,
            complaint_deptslno: codept,
            complaint_typeslno: cotype,
            priority_check: priority,
            complaint_hicslno: checkHic === true ? 1 : 0,
            compalint_status: 0,
            cm_location: depsec,
            edit_user: id,
            priority_reason: priority === 1 ? priorreason : null,
            complaint_slno: complaint_slno,
            rm_room_slno: roomName === '' ? null : roomName
        }
    }, [desc, empsecid, depsec, codept, cotype, priority, priorreason, complaint_slno, id, roomName, checkHic])



    useEffect(() => {
        if (edit === 1) {
            const getAssetinComplaint = async (complaint_slno) => {
                const result = await axioslogin.get(`/complaintreg/getAssetinComplaint/${complaint_slno}`);
                const { success, data } = result.data;
                if (success === 2) {
                    setAssetArray(data)
                }
                else {
                    setAssetArray([])
                }

            }
            getAssetinComplaint(complaint_slno)
        }
        else {
        }
    }, [complaint_slno, edit])


    /*** usecallback function for form submitting */
    const updateAssetz = newlyAddedAssets && newlyAddedAssets.map((val) => {
        return {
            cm_complait_slno: complaint_slno,
            cm_am_assetmap_slno: val.item_asset_no_only,
            cm_asset_dept: val.item_asset_no,
            am_item_map_slno: val.am_item_map_slno,
            asset_status: 1,
            create_user: id
        }
    })

    const assetinactive = deletedFiles && deletedFiles.map((val) => {
        return {
            comasset_mapping_slno: val.comasset_mapping_slno,
            asset_status: 0,
            edit_user: id
        }
    })

    const reset = useCallback(() => {
        setComplaint(0)
        setReqType(false)
        setcotype(false)
        setChechHic(false)
        setpriority(0)
        setcodept(null)
        setCritical(false)
        setdesc('')
        setDepsec(0)
        setPriorreason("")
        setCount(0)
        setEdit(0)
        setOpen(false)
        setItem_slno(0)
        setSearch(0)
        setSelect(0)
        setcm_am_assetmap_slno('')
        setSelectedAsset('')
        setRoomName(null)
        setAssetArray([])
        setNewlyAddedAssets([])
        setDeletedFiles([])
        setSelectFile([])
    }, [])



    const submitComplaint = useCallback((e) => {
        e.preventDefault();
        if (codept === null && cotype === false) {
            infoNotify("Please Select Complaint Department and Complaint type")
        }
        else {
            if ((cm_am_assetmap_slno !== '' && assetStatus === 0) || (selectedAsset !== '' && assetStatus === 0)) {
                infoNotify(
                    <>please click on  &apos; <AddCircleIcon /> &apos;  to add Asset details</>
                );
            } else {
                setOpen(true)
                const InsertFun = async (postdata) => {
                    const result = await axioslogin.post('/complaintreg', postdata);
                    return result.data
                }
                const InsertAsset = async (inserAsset) => {
                    const result = await axioslogin.post('/complaintreg/insertAssetArray', inserAsset);
                    return result.data
                }
                const updateAsset = async (updateAssetz) => {
                    const result = await axioslogin.post('/complaintreg/insertAssetArray', updateAssetz);
                    return result.data
                }
                const updateFun = async (patchdata) => {
                    const result = await axioslogin.patch('/complaintreg', patchdata);
                    return result.data
                }
                const inactiveAsset = async (assetinactive) => {
                    const result = await axioslogin.patch('/complaintreg/assetinactive', assetinactive);
                    return result.data
                }
                const InsertFile = async (selectFile, insertId) => {
                    try {
                        const formData = new FormData();
                        formData.append('id', insertId);
                        for (const file of selectFile) {
                            if (file.type.startsWith('image')) {
                                const compressedFile = await handleImageUpload(file);
                                formData.append('files', compressedFile, compressedFile.name);
                            } else {
                                formData.append('files', file, file.name);
                            }
                        }
                        // Use the Axios instance and endpoint that matches your server setup
                        const uploadResult = await axioslogin.post('/complaintFileUpload/uploadFile/Complaint', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        });
                        return uploadResult.data;
                    } catch (error) {
                        warningNotify('An error occurred during file upload.');
                    }
                };
                if (edit === 1) {
                    updateFun(patchdata).then((value) => {
                        const { message, success } = value
                        if (success === 2) {
                            if (newlyAddedAssets.length !== 0) {
                                if (deletedFiles.length !== 0) {
                                    inactiveAsset(assetinactive).then((value) => {
                                        const { success } = value
                                        if (success === 1) {
                                            updateAsset(updateAssetz)
                                            const { success } = value
                                            if (success === 1) {
                                                if (selectFile.length !== 0) {
                                                    InsertFile(selectFile, insertId).then((value) => {
                                                        const { success, message } = value
                                                        if (success === 1) {
                                                            succesNotify("Complaint Updated Successfully")
                                                            setCount(count + 1);
                                                            setOpen(false)
                                                            reset()
                                                        }
                                                        else {
                                                            warningNotify(message)
                                                        }
                                                    })
                                                }
                                                else {
                                                    succesNotify("Complaint Updated Successfully")
                                                    setCount(count + 1);
                                                    setOpen(false)
                                                    reset()
                                                }

                                            }
                                            else {
                                                infoNotify("Unable to add asset details")

                                            }
                                        }
                                    })
                                }
                                else {
                                    updateAsset(updateAssetz).then((value) => {
                                        const { success } = value
                                        if (success === 1) {
                                            if (selectFile.length !== 0) {
                                                InsertFile(selectFile, insertId).then((value) => {
                                                    const { success, message } = value
                                                    if (success === 1) {
                                                        succesNotify("Complaint Updated Successfully")
                                                        setCount(count + 1);
                                                        setOpen(false)
                                                        reset()
                                                    }
                                                    else {
                                                        warningNotify(message)
                                                    }
                                                })
                                            }
                                            else {
                                                succesNotify("Complaint Updated Successfully")
                                                setCount(count + 1);
                                                setOpen(false)
                                                reset()
                                            }
                                        }
                                        else {
                                            infoNotify("Unable to add asset details")

                                        }
                                    })
                                }
                            }
                            else {
                                if (deletedFiles.length !== 0) {
                                    inactiveAsset(assetinactive).then((value) => {
                                        const { success } = value
                                        if (success === 1) {
                                            if (selectFile.length !== 0) {
                                                InsertFile(selectFile, insertId).then((value) => {
                                                    const { success, message } = value
                                                    if (success === 1) {
                                                        succesNotify("Complaint Updated Successfully")
                                                        setCount(count + 1);
                                                        setOpen(false)
                                                        reset()
                                                    }
                                                    else {
                                                        warningNotify(message)
                                                    }
                                                })
                                            }
                                            else {
                                                succesNotify("Complaint Updated Successfully")
                                                setCount(count + 1);
                                                setOpen(false)
                                                reset()
                                            }
                                        }
                                        else {

                                            infoNotify("Unable to delete asset details")
                                        }
                                    })
                                }
                                else {
                                    if (selectFile.length !== 0) {
                                        InsertFile(selectFile, insertId).then((value) => {
                                            const { success, message } = value
                                            if (success === 1) {
                                                succesNotify("Complaint Updated Successfully")
                                                setCount(count + 1);
                                                setOpen(false)
                                                reset()
                                            }
                                            else {
                                                warningNotify(message)
                                            }
                                        })
                                    }
                                    else {
                                        succesNotify("Complaint Updated Successfully")
                                        setCount(count + 1);
                                        setOpen(false)
                                        reset()
                                    }
                                }

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
                        setinsertId(insertId)
                        if (success === 1) {
                            if (assetArray.length !== 0) {
                                const inserAsset = assetArray && assetArray.map((val) => {
                                    console.log("assetArray hghgh", assetArray);

                                    return {
                                        cm_complait_slno: insertId,
                                        cm_am_assetmap_slno: val.item_asset_no_only,
                                        cm_asset_dept: val.item_asset_no,
                                        am_item_map_slno: val.am_item_map_slno,
                                        asset_status: 1,
                                        create_user: id
                                    }
                                })
                                InsertAsset(inserAsset).then((value) => {
                                    const { success } = value
                                    if (success === 1) {
                                        if (selectFile.length !== 0) {
                                            InsertFile(selectFile, insertId).then((value) => {
                                                const { success, message } = value
                                                if (success === 1) {
                                                    succesNotify("Complaint Updated Successfully")
                                                    setCount(count + 1);
                                                    setOpen(false)
                                                    reset()
                                                }
                                                else {
                                                    warningNotify(message)
                                                }
                                            })
                                        }
                                        else {
                                            succesNotify("Complaint Updated Successfully")
                                            setCount(count + 1);
                                            setOpen(false)
                                            reset()
                                        }
                                    }
                                    else {
                                        infoNotify("Unable to add asset details")
                                    }
                                })

                            }
                            else {

                                if (selectFile.length !== 0) {
                                    InsertFile(selectFile, insertId).then((value) => {
                                        const { success, message } = value
                                        if (success === 1) {
                                            succesNotify("Complaint Updated Successfully")
                                            setCount(count + 1);
                                            setOpen(false)
                                            reset()
                                        }
                                        else {
                                            warningNotify(message)
                                        }
                                    })
                                }
                                else {
                                    succesNotify("Complaint Updated Successfully")
                                    setCount(count + 1);
                                    setOpen(false)
                                    reset()
                                }
                            }
                        }
                        else {
                            infoNotify(message)
                            setOpen(false)
                        }
                    }).catch()
                    InsertFun(postdata)
                }
            }

        }

    }, [postdata, edit, assetArray, patchdata, assetinactive, insertId, count, cm_am_assetmap_slno, assetStatus, updateAssetz, handleImageUpload,
        cotype, selectFile, codept, deletedFiles.length, newlyAddedAssets.length, reset, selectedAsset, id])



    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])



    const refreshWindow = useCallback(() => {
        setComplaint(0)
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
        setItem_slno(0)
        setcm_am_assetmap_slno('')
        setSelectedAsset('')
        setSearch(0)
        setSelect(0)
        setRoomName(null)
        setAssetArray([])
        setNewlyAddedAssets([])
        setDeletedFiles([])
        setSelectFile([])

    }, [])
    useEffect(() => {
        if (ReqType === 2) {
            history.push('/Home/RequestRegister')
        }
    }, [ReqType, history])


    useEffect(() => {
        if (empsecid !== 0) {
            dispatch(getCompliantRegTable(empsecid))
            dispatch(getReqRegistListByDept(empsecid))
        }
    }, [count, empsecid, dispatch])

    const compallTable = useSelector((state) => {
        return state.setComplaintRegTable.complaintRegTableList
    })
    const reqestTotal = useSelector((state) => {
        return state.setRequestListByDeptSec.RequestListall
    })

    const pendingTckt = compallTable?.filter((val) => {
        return val.compalint_status === 0
    })

    const AssignedTckt = compallTable?.filter((val) => {
        return val.compalint_status === 1
    })

    const VerificationPendingTckt = compallTable?.filter((val) => {
        return val.compalint_status === 2 && val.verify_spervsr === 1
    })

    const onholdList = compallTable?.filter((val) => {
        return val.cm_rectify_status === 'O' || val.cm_rectify_status === 'P'

    })
    const reqList = reqestTotal?.filter((val) => {
        return val.rm_ndrf === 0
    })

    const reqPending = reqestTotal?.filter((val) => {
        return val.req_status === 'P'
    })

    const UpdateAssetNo = useCallback((e) => {
        setcm_am_assetmap_slno(e.target.value.toLocaleUpperCase())
        setAssetStatus(0)
    }, [])


    const searchAssetNo = useCallback((e) => {
        if (cm_am_assetmap_slno === '') {
            infoNotify('Please Enter Asset Number');
        } else {
            const firstname = 'TMC';
            const Custodian =
                codept === 1 ? 'BME' :
                    codept === 2 ? 'MAIN' :
                        codept === 3 ? 'IT' :
                            codept === 4 ? 'HSK' :
                                codept === 5 ? 'OPE' : '';
            const starts = firstname + '/' + Custodian;
            const asset_number = parseInt(cm_am_assetmap_slno);
            const postdata = {
                item_asset_no: starts,
                item_asset_no_only: asset_number
            };

            const getAssetdata = async (postdata) => {
                const result = await axioslogin.post('/PasswordManagementMain/getAssetNo', postdata);
                const { data, success } = result.data;
                if (data.length !== 0) {
                    if (success === 1) {
                        setassetData(0)
                        const { item_name, sec_name, am_item_map_slno, item_asset_no, item_asset_no_only } = data[0];
                        const assetExists = assetArray.some(asset => asset.item_asset_no_only === item_asset_no_only);
                        if (assetExists) {
                            infoNotify("You already added this asset in complaint");
                        } else {
                            const newAsset = { item_name, sec_name, am_item_map_slno, item_asset_no_only, item_asset_no };
                            setAssetArray((prevArray) => [...prevArray, newAsset]);
                            if (edit === 1) {
                                setNewlyAddedAssets((prevAssets) => [...prevAssets, newAsset]);
                            }
                            setcm_am_assetmap_slno('');

                        }
                    }
                    return result.data;
                } else {
                    warningNotify('Asset number not found');
                }
            };
            getAssetdata(postdata);
            setAssetStatus(1);
        }
    }, [cm_am_assetmap_slno, assetArray, codept, edit]);

    console.log("codept", codept);


    const searchAssetNoinMenu = useCallback((e) => {
        if (item_slno === 0) {
            infoNotify('Please select Asset')
        }
        else {

            // const firstname = 'TMC'
            // const Custodian = codept === 1 ? 'BME' : codept === 2 ? 'MAIN' :
            //     codept === 3 ? 'IT' : codept === 4 ? 'HSK' : codept === 5 ? 'OPE' : ''
            // const starts = firstname + '/' + Custodian

            const asset_number = parseInt(item_slno)
            const postdata = {
                item_asset_no: asset_dept,
                item_asset_no_only: asset_number
            }

            console.log("postdata sss", postdata);

            const getAssetdata = async (postdata) => {
                const result = await axioslogin.post('/PasswordManagementMain/getAssetNo', postdata)
                const { data, success } = result.data
                if (data.length !== 0) {
                    if (success === 1) {
                        setassetData(0)
                        const { item_name, sec_name, am_item_map_slno, item_asset_no_only, item_asset_no } = data[0];
                        // Check if the asset already exists in the array
                        const assetExists = assetArray.some(asset => asset.item_asset_no_only === item_asset_no_only);
                        if (assetExists) {
                            infoNotify("You already added this asset in complaint");
                        } else {
                            const newAsset = { item_name, sec_name, am_item_map_slno, item_asset_no_only, item_asset_no };
                            setAssetArray((prevArray) => [...prevArray, newAsset]);
                            // Condition to add to newly added assets only if edit is 1
                            if (edit === 1) {
                                setNewlyAddedAssets((prevAssets) => [...prevAssets, newAsset]);
                            }
                            setSelectedAsset(0)
                        }

                    }
                    return result.data
                }
                else {
                    warningNotify('Select Asset Under Complaint Department')

                }
            }
            getAssetdata(postdata)
            setAssetStatus(1)
        }
    }, [item_slno, assetArray, codept, edit])


    const ClearAssetSelection = () => {
        setItem_slno(0);
        setcm_am_assetmap_slno('')
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
    }, [])

    const handleDelete = (indexToDelete) => {
        setAssetArray((prevArray) => {
            const itemToDelete = prevArray[indexToDelete];
            const updatedArray = prevArray.filter((_, index) => index !== indexToDelete);
            if (edit === 1) {
                setDeletedFiles((prevDeletedFiles) => [...prevDeletedFiles, itemToDelete]);
            }
            return updatedArray;
        });
    };

    return (
        <Fragment>
            <CardMaster
                title="Ticket Registration"
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
                        <Paper variant='outlined' sx={{ p: 0.5 }} square >
                            <Box>
                                <CssVarsProvider>
                                    <Typo sx={{ color: '#9FA6AD', fontWeight: 800, fontSize: 13, pl: .3, pb: .5 }}>
                                        COMPLAINT DEPARTMENT
                                    </Typo>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: 'flex', flex: 1, p: 1, }} >
                                {
                                    complaintdeptdata && complaintdeptdata.map((val) => {
                                        return <Grid item xs={2} sm={4} md={4} lg={2} xl={3} key={val.complaint_dept_slno} sx={{ width: '100%' }} >
                                            <ComDeptCheckBox
                                                label={val.complaint_dept_name}
                                                name={val.complaint_dept_name}
                                                value={val.complaint_dept_slno}
                                                onChange={setcodept}
                                                checkedValue={codept}
                                                cm_am_assetmap_slno={cm_am_assetmap_slno}
                                                setcm_am_assetmap_slno={setcm_am_assetmap_slno}
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
                                        <Typo sx={{ color: '#9FA6AD', fontWeight: 800, fontSize: 13, pl: .3, pb: .5 }}>
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
                                                        setSelectedAsset={setSelectedAsset}
                                                        setItem_slno={setItem_slno}
                                                    />
                                                </Grid>
                                            })
                                        }

                                    </Grid>
                                </Box>
                            </Paper> :
                            null
                        }
                        <Paper variant='outlined' square >
                            <Typography sx={{ color: '#9FA6AD', fontWeight: 800, fontSize: 12, pl: .8, py: .5 }} >
                                COMPLAINT LOCATION
                            </Typography>
                            <Box sx={{ px: 0.5, pb: .5, display: 'flex' }}>
                                <Box sx={{ flex: .4, px: .5, pt: .8 }} >
                                    {/* <LocationSelect value={depsec} setValue={setDepsec} setName={setlocationName} /> */}
                                    <CssVarsProvider>
                                        <Input
                                            sx={{ borderRadius: 0 }}
                                            disabled
                                            value={secName}
                                            name='secName'
                                        >

                                        </Input>
                                    </CssVarsProvider>
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
                                                    label="(ICRA) "
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
                                        <Box sx={{ pt: .5, display: 'flex', ml: .5 }}>
                                            {codept !== null ?
                                                <>
                                                    <Box
                                                        sx={{
                                                            cursor: 'pointer',
                                                            display: 'flex', mx: .5, pt: .5
                                                        }}
                                                        onClick={SearchAsset}
                                                    >
                                                        {search === 1 ?
                                                            (<CheckCircleIcon sx={{ cursor: 'pointer', color: '#523A28' }} />)
                                                            :
                                                            (<RadioButtonUncheckedIcon sx={{ cursor: 'pointer', color: '#523A28' }} />)
                                                        }
                                                        <Typography sx={{ pt: .3, color: 'black', fontWeight: 600, fontSize: 14 }}>
                                                            Search
                                                        </Typography>
                                                    </Box>
                                                    <Typography sx={{ pt: .5, px: .5 }}>(or)</Typography>
                                                    <Box
                                                        sx={{
                                                            cursor: 'pointer',
                                                            display: 'flex', mx: .5, pt: .5
                                                        }}
                                                        onClick={SelectAsset}
                                                    >
                                                        {select === 1 ?
                                                            (<CheckCircleIcon sx={{ cursor: 'pointer', color: '#523A28' }} />)
                                                            :
                                                            (<RadioButtonUncheckedIcon sx={{ cursor: 'pointer', color: '#523A28' }} />)
                                                        }
                                                        <Typography sx={{ pt: .3, color: 'black', fontWeight: 600, fontSize: 14 }}>
                                                            Select
                                                        </Typography>
                                                    </Box>

                                                    {select === 1 ?
                                                        <Box sx={{ flex: 1, display: 'flex', ml: 1 }}>
                                                            <CssVarsProvider>
                                                                <Box sx={{ flex: 1, }}>
                                                                    <CmAssetList assetz={assetData} setAssetz={setassetData} complaint_dept_secslno={empsecid}
                                                                        setSelectedAsset={setSelectedAsset} setItem_slno={setItem_slno} setasset_dept={setasset_dept}
                                                                    />
                                                                </Box>
                                                                <Box sx={{ ml: 1, mr: 3 }}>
                                                                    <Tooltip title={'Add More Asset'}>
                                                                        <Avatar size='sm' sx={{ bgcolor: '#E4D4C8', }} >
                                                                            <AddCircleIcon sx={{ p: .1, color: '#523A28', cursor: 'pointer', '&:hover': { color: '#34323E' }, height: 30, width: 30 }}
                                                                                onClick={searchAssetNoinMenu}
                                                                            />
                                                                        </Avatar>
                                                                    </Tooltip>
                                                                </Box>
                                                            </CssVarsProvider>
                                                        </Box>
                                                        : null}


                                                    {search === 1 ?
                                                        <Box sx={{ flex: 1, display: 'flex', ml: 1 }}>
                                                            <CssVarsProvider>
                                                                <Box sx={{ flex: 1, }}>
                                                                    <Input
                                                                        placeholder=" Asset Number"
                                                                        sx={{
                                                                            borderRadius: 0,
                                                                            // width: 320,
                                                                            minHeight: 15,
                                                                        }}
                                                                        type='number'
                                                                        autoComplete='off'
                                                                        startDecorator={
                                                                            <Button variant="soft" color="neutral" >
                                                                                {`TMC/${codept === 1 ? 'BME/' : codept === 2 ? 'MAIN/' :
                                                                                    codept === 3 ? 'IT/' : codept === 4 ? 'HSK/' : codept === 5 ? 'OPE/' : ''}`}
                                                                            </Button>
                                                                        }
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
                                                                            </>

                                                                        }

                                                                        name='cm_am_assetmap_slno'
                                                                        value={cm_am_assetmap_slno || ''}
                                                                        onChange={UpdateAssetNo}
                                                                    />

                                                                </Box>
                                                                <Box sx={{ ml: 1, mr: 3 }}>
                                                                    <Tooltip title={'Add More Asset'}>
                                                                        <Avatar size='sm' sx={{ bgcolor: '#E4D4C8', }} >
                                                                            <AddCircleIcon sx={{ p: .1, color: '#523A28', cursor: 'pointer', '&:hover': { color: '#34323E' }, height: 30, width: 30 }}
                                                                                onClick={searchAssetNo}
                                                                            />
                                                                        </Avatar>
                                                                    </Tooltip>
                                                                </Box>
                                                            </CssVarsProvider>
                                                        </Box> :
                                                        null}
                                                </> : null}
                                        </Box>
                                    </Box>
                                    {assetArray.length !== 0 ?
                                        <Box sx={{ flex: 1, mx: 1.5, mt: 1.5, display: 'flex', bgcolor: '#F2ECE5' }}>
                                            <Box sx={{ flex: 1, textAlign: 'center' }}>
                                                #
                                            </Box>
                                            <Box sx={{ flex: 3 }}>
                                                Asset Number
                                            </Box>
                                            <Box sx={{ flex: 10 }}>
                                                Asset Name
                                            </Box>

                                            <Box sx={{ flex: 1, textAlign: 'center' }}>
                                                Action
                                            </Box>
                                        </Box> :
                                        null}

                                    {assetArray?.map((val, index) => {
                                        const formattedSlno = val.item_asset_no_only.toString().padStart(6, '0');
                                        return <Box
                                            key={index} sx={{ flex: 1, mx: 1.5, display: 'flex', borderBottom: 1, borderColor: 'lightgrey', pt: .8 }}>
                                            <Box sx={{ flex: 1, textAlign: 'center', fontSize: 13 }}>
                                                {index + 1}
                                            </Box>
                                            <Box sx={{ flex: 3, fontSize: 13 }}>
                                                {val.item_asset_no}/{formattedSlno}
                                            </Box>
                                            <Box sx={{ flex: 10, fontSize: 13 }}>
                                                {val.item_name}
                                            </Box>
                                            <Box sx={{ flex: 1, textAlign: 'center', fontSize: 13 }}>
                                                <DeleteIcon sx={{ color: 'darkred', cursor: 'pointer' }} onClick={() => handleDelete(index)} />
                                            </Box>
                                        </Box>
                                    })}
                                </Box>
                            </Paper>
                        </Box>
                        <Paper variant='outlined' square >
                            <Box sx={{ px: 0.5, pt: .5, display: 'flex', flex: 1 }}>
                                <Box sx={{ width: '80%' }} >
                                    <CustomTextarea
                                        placeholder="complaint descrition"
                                        required
                                        type="text"
                                        minRows={4}
                                        maxRows={10}
                                        size="sm"
                                        style={{
                                            width: "100%",
                                            // height: "100%",
                                        }}
                                        value={desc}
                                        onchange={complintdesc}
                                    />
                                </Box>
                                <Box sx={{
                                    display: 'flex', flexDirection: 'column',
                                    px: 1, flex: 1,
                                }} >
                                    <Box sx={{
                                        display: 'flex',
                                        pt: 2
                                    }} >
                                        <Grid item xs={2} sm={4} md={4} lg={2} xl={3} >
                                            <CusCheckBox
                                                // variant="outlined"
                                                color="danger"
                                                size="lg"
                                                name="Hic"
                                                label="Priority"
                                                value={crical}
                                                onCheked={getCritical}
                                                checked={crical}
                                            />
                                        </Grid>
                                    </Box>

                                    {
                                        crical === true ?
                                            <Box sx={{ width: '100%', }} >
                                                <CustomTextarea
                                                    style={{ width: "100%" }}
                                                    minRows={2}
                                                    maxRows={3}
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
                            </Box>
                            <Box sx={{ flex: 1, border: 1, mx: .5, borderRadius: 1, display: 'flex', borderColor: '#5A4159' }}>
                                <label htmlFor="file-input">
                                    <Box sx={{ display: 'flex', bgcolor: '#ECEFF7', '&:hover': { bgcolor: '#E1E8F0', }, m: .5, px: .5, borderRadius: 5, cursor: 'pointer' }}>
                                        <FileCopyIcon sx={{ p: .3, color: '#5A4159', }} />
                                        <Typography sx={{ color: '#5A4159', fontSize: 13, px: .3, pt: .3 }}>
                                            file Upload
                                        </Typography>
                                    </Box>
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
                                <Box sx={{ display: 'flex', flex: 1, mx: .5, mt: .5, overflow: 'auto' }}>
                                    {selectFile && selectFile.map((file, index) => (
                                        <Box key={index}>
                                            <CssVarsProvider>
                                                <Chip sx={{ bgcolor: '#C0B5CF', width: '100%', ml: .5 }}>
                                                    {file.name}
                                                    <CloseIcon sx={{
                                                        pl: .3, pb: .3, height: 20, width: 20, cursor: 'pointer', color: '#4D0011',
                                                        '&:hover': { color: '#BA0F30' },
                                                    }}
                                                        onClick={() => handleRemoveFile(index)} />
                                                </Chip>
                                            </CssVarsProvider>
                                        </Box>
                                    ))}
                                </Box>
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
                <ComplaintRegTable
                    rowSelect={rowSelect} sec={empsecid} count={count} setCount={setCount} />
            </Paper>
            <Paper square sx={{
                display: "flex",
                p: 1,
                alignItems: "center",
            }} >
                <SquareIcon sx={{ color: '#B7CFDC' }} />
                <Typography sx={{ pl: .5, pr: 2, fontSize: 13 }}>
                    Priority Critical
                </Typography>
                < EngineeringIcon sx={{ color: '#B68D40' }} />
                <Typography sx={{ pl: .5, pr: 2, fontSize: 13 }}>
                    Asssinged by Employee
                </Typography>
                <CommentIcon sx={{ color: '#2B82BF', }} />
                <Typography sx={{ pl: .5, pr: 2, fontSize: 13 }}>
                    Message Sent
                </Typography>
                <MarkUnreadChatAltIcon sx={{ color: '#BF4A32', }} />
                <Typography sx={{ pl: .5, pr: 2, fontSize: 13 }}>
                    New Message
                </Typography>
            </Paper>
        </Fragment >
    )
}
export default memo(ComplaintRegistrMast)
