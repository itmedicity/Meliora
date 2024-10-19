import { Box, Paper, Grid, Typography } from '@mui/material';
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
import { Avatar, Button, Chip, CssVarsProvider, Input, Tooltip, Typography as Typo } from '@mui/joy'
import { getReqRegistListByDept } from 'src/redux/actions/ReqRegisterListByDept.action';
import { getCompliantRegTable } from 'src/redux/actions/ComplaintRegTable.action';
import { getComplaintSlno } from 'src/views/Constant/Constant'
import CustomBackDrop from 'src/views/Components/CustomBackDrop'
import CmRoomNameTypeList from 'src/views/CommonSelectCode/CmRoomNameTypeList';
import CmComplaintLocation from 'src/views/CommonSelectCode/CmComplaintLocation';
import { getDeptsection } from 'src/redux/actions/DeptSection.action';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import { getRoomsNameNdTypeList } from 'src/redux/actions/CmRoomNameNdTypeList.action';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Done from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import SquareIcon from '@mui/icons-material/Square';
import CommentIcon from '@mui/icons-material/Comment';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import EngineeringIcon from '@mui/icons-material/Engineering';
import imageCompression from 'browser-image-compression';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CloseIcon from '@mui/icons-material/Close';
import CmAssetList from '../CmComponent/CmAssetList';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


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

    const [locationName, setlocationName] = useState("");
    const [complaint_slno, setComplaint] = useState(0)
    const [roomName, setRoomName] = useState(null)
    const [open, setOpen] = useState(false)
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

    //Data set for edit
    const rowSelect = useCallback((val) => {
        setEdit(1)
        setSelect(1)
        setSearch(0)
        // const data = params.api.getSelectedRows()
        const { complaint_dept_secslno, complaint_hicslno,
            rm_room_slno, priority_reason, complaint_typeslno, priority_check,
            complaint_request_slno, complaint_deptslno, complaint_slno, complaint_desc } = val
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
            rm_room_slno: roomName === '' ? null : roomName,
        }
    }, [desc, depsec, codept, priorreason, cotype, priority, checkHic, complaint_slno, roomName, id])
    //insert data
    const postdata = useMemo(() => {
        return {
            complaint_slno: complaint_slno,
            complaint_desc: desc,
            complaint_dept_secslno: depsec,
            complaint_request_slno: 1,
            complaint_deptslno: codept,
            complaint_typeslno: cotype,
            priority_check: priority,
            complaint_hicslno: checkHic === true ? 1 : 0,
            compalint_status: 0,
            cm_location: depsec,
            create_user: id,
            priority_reason: priority === 1 ? priorreason : null,
            locationName: locationName,
            priority: priority === 1 ? "Priority Ticket" : "Normal Ticket",
            rm_room_slno: roomName === '' ? null : roomName,
        }
    }, [desc, depsec, roomName, cotype, priority, priorreason, checkHic, complaint_slno, locationName, codept, id])



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


    const submitComplaint = useCallback((e) => {
        e.preventDefault();
        if (codept === null && cotype === false) {
            infoNotify("Please Select Complaint Department and Complaint type")
        }
        else {
            if (depsec === 0) {
                infoNotify("Please Select Department Section")
            }
            else {
                if ((cm_am_assetmap_slno !== '' && assetStatus === 0) || (selectedAsset !== '' && assetStatus === 0)) {
                    infoNotify(
                        <>please click on  &apos; <AddCircleIcon /> &apos;  to add Asset details</>
                    );
                } else {
                    setOpen(true)
                    const InsertFun = async (postdata) => {
                        const result = await axioslogin.post('/directcmreg', postdata);
                        return result.data
                    }
                    const InsertAsset = async (inserAsset) => {
                        const result = await axioslogin.post('/complaintreg/insertAssetArray', inserAsset);
                        return result.data
                    }
                    const updateFun = async (patchdata) => {
                        const result = await axioslogin.patch('/directcmreg', patchdata);
                        return result.data
                    }
                    const updateAsset = async (updateAssetz) => {
                        const result = await axioslogin.post('/complaintreg/insertAssetArray', updateAssetz);
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
                                                    // succesNotify("Complaint Updated Successfully")
                                                    // setCount(count + 1);
                                                    // setOpen(false)
                                                    // reset()
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
                                                // succesNotify("Complaint Updated Successfully")
                                                // setCount(count + 1);
                                                // setOpen(false)
                                                // reset()
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
                                                // succesNotify("Complaint Updated Successfully")
                                                // setCount(count + 1);
                                                // setOpen(false)
                                                // reset()
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
                                        // succesNotify(message)
                                        // setCount(count + 1);
                                        // reset()
                                        // setOpen(false)
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
                                            // succesNotify("Complaint Registered Successfully")
                                            // setCount(count + 1);
                                            // reset()
                                            // setOpen(false)
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
                                                // succesNotify("Complaint Updated Successfully")
                                                // setCount(count + 1);
                                                // setOpen(false)
                                                // reset()
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
                                            infoNotify("Unable to add asset details")
                                        }
                                    })
                                }
                                else {
                                    // succesNotify(message)
                                    // setCount(count + 1);
                                    // reset()
                                    // setOpen(false)
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
                        })
                        InsertFun(postdata)
                    }
                }
            }

        }
    }, [postdata, edit, patchdata, count, cm_am_assetmap_slno, assetStatus, updateAssetz, assetArray, cotype, assetinactive, codept, deletedFiles.length,
        depsec, handleImageUpload, insertId, newlyAddedAssets.length, reset, selectFile, selectedAsset, id])



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
        setlocationName("")
        setPriorreason("")
        setCount(0)
        setEdit(0)
        setOpen(false)
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
        setAssetStatus(0)
    }, [])

    // const searchAssetNo = useCallback((e) => {
    //     if (cm_am_assetmap_slno === '') {
    //         infoNotify('Please Enter Asset Number')
    //     }
    //     else {
    //         // const parts = cm_am_assetmap_slno.split('/');
    //         // const assetno = parts[parts.length - 1];
    //         // const Custodian = parts[parts.length - 2];
    //         // const firstname = parts[parts.length - 3];
    //         // const starts = firstname + '/' + Custodian
    //         // const asset_number = parseInt(assetno)

    //         const firstname = 'TMC'
    //         const Custodian = codept === 1 ? 'BME' : codept === 2 ? 'MAIN' :
    //             codept === 3 ? 'IT' : codept === 4 ? 'HSK' : codept === 5 ? 'OPE' : ''
    //         const starts = firstname + '/' + Custodian
    //         const asset_number = parseInt(cm_am_assetmap_slno)

    //         const postdata = {
    //             item_asset_no: starts,
    //             item_asset_no_only: asset_number
    //         }
    //         const getAssetdata = async (postdata) => {
    //             const result = await axioslogin.post('/PasswordManagementMain/getAssetNo', postdata)
    //             const { data, success } = result.data
    //             if (data.length !== 0) {
    //                 if (success === 1) {
    //                     const { item_name, sec_name, am_item_map_slno } = data[0]
    //                     setlocation(sec_name)
    //                     setdeviceName(item_name)
    //                     setItem_slno(am_item_map_slno)
    //                 }
    //                 return result.data
    //             }
    //             else {
    //                 warningNotify('Asset number not found')
    //             }
    //         }
    //         getAssetdata(postdata)
    //         setAssetStatus(1)
    //     }
    // }, [cm_am_assetmap_slno])

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
    }, [cm_am_assetmap_slno, codept, assetArray, edit]);


    // const searchAssetNo = useCallback((e) => {
    //     if (cm_am_assetmap_slno === '') {
    //         infoNotify('Please Enter Asset Number');

    //     } else {
    //         const firstname = 'TMC';
    //         const Custodian = codept === 1 ? 'BME' : codept === 2 ? 'MAIN' :
    //             codept === 3 ? 'IT' : codept === 4 ? 'HSK' : codept === 5 ? 'OPE' : '';
    //         const starts = firstname + '/' + Custodian;
    //         const asset_number = parseInt(cm_am_assetmap_slno);
    //         const postdata = {
    //             item_asset_no: starts,
    //             item_asset_no_only: asset_number
    //         };

    //         const getAssetdata = async (postdata) => {
    //             const result = await axioslogin.post('/PasswordManagementMain/getAssetNo', postdata);
    //             const { data, success } = result.data;
    //             if (data.length !== 0) {
    //                 if (success === 1) {
    //                     const { item_name, sec_name, am_item_map_slno, item_asset_no } = data[0];
    //                     // Check if the asset already exists in the array
    //                     const assetExists = assetArray.some(asset => asset.am_item_map_slno === am_item_map_slno);
    //                     if (assetExists) {
    //                         infoNotify("You already added this asset in complaint");
    //                     } else {
    //                         setAssetArray((prevArray) => [
    //                             ...prevArray,
    //                             { item_name, sec_name, am_item_map_slno, item_asset_no },
    //                         ]);
    //                         setcm_am_assetmap_slno('')
    //                     }

    //                 }
    //                 return result.data;
    //             } else {
    //                 warningNotify('Asset number not found');
    //             }
    //         };
    //         getAssetdata(postdata);
    //         setAssetStatus(1);
    //     }
    // }, [cm_am_assetmap_slno, assetArray]);

    console.log("assetdata", assetData);


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
                    warningNotify('Asset  not found')

                }
            }
            getAssetdata(postdata)
            setAssetStatus(1)
        }
    }, [item_slno, assetArray, codept, edit])

    // useEffect(() => {
    //     if (depsec !== '') {
    //         const getAssetItembsedonLocation = async (depsec) => {
    //             const result = await axioslogin.get(`Rectifycomplit/getlocationbsedAsset/${depsec}`)
    //             const { success, data } = result.data
    //             if (success === 1) {
    //                 setMenudata(data);
    //             }
    //             else {
    //                 setMenudata([])
    //             }
    //         }
    //         getAssetItembsedonLocation(depsec)
    //     }
    //     else {
    //         setMenudata([]);
    //     }
    // }, [depsec])





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

    // const handleDelete = (indexToDelete) => {
    //     setAssetArray((prevArray) => prevArray.filter((_, index) => index !== indexToDelete));
    // };

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
                    <Box sx={{ display: 'flex', flex: 1, width: '80%', p: 0.5, flexDirection: 'column', }}>
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
                        <Box>

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
                                        size="sm"
                                        minRows={4}
                                        maxRows={10}
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
                                    width: '20%', px: 1, flex: 1, justifyContent: 'center',
                                }} >
                                    <Box sx={{
                                        display: 'flex',

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
                <DirectComplaintTable
                    rowSelect={rowSelect} count={count} setCount={setCount} />
            </Paper >

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

export default memo(DirectComplaintReg)




