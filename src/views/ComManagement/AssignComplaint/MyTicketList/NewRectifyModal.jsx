import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Typography } from '@mui/material';
import CustomTextarea from 'src/views/Components/CustomTextarea';
import { errorNotify, infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import { Avatar, Box, Button, Checkbox, CssVarsProvider, Input, Modal, Switch, Tooltip } from '@mui/joy';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BuildIcon from '@mui/icons-material/Build';
import AssetSpareModal from '../../AssetDetailsInCompl/AssetSpareModal';
import CmAssetList from '../../CmComponent/CmAssetList';
import imageCompression from 'browser-image-compression';
import UploadIcon from '@mui/icons-material/Upload';
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';
import { getDepartment } from 'src/redux/actions/Department.action';
import CmHoldReasonList from '../../CmComponent/CmHoldReasonList';
import AssetListUnderCustodian from 'src/views/CommonSelectCode/AssetListUnderCustodian';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import { getArrayOfAssetLocationDetails, getCustodianDetails } from 'src/api/AssetApis';
import { useQuery } from 'react-query';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import AttachmentSharpIcon from '@mui/icons-material/AttachmentSharp';
import FileViewSingle from 'src/views/Components/FileViewSingle'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ComplaintAttachFiles from './ComplaintAttachFiles';
import AddBoxIcon from '@mui/icons-material/AddBox';

const NewRectifyModal = ({ rectfyOpen, setrectfyOpen, setrectfyFlag, rectfyDta, count, setCount }) => {

    const { complaint_slno, complaint_desc, compalint_date, rm_roomtype_name, rm_room_name, rm_insidebuildblock_name, complaint_from_dept,
        rm_floor_name, location, complaint_type_name, complaint_dept_secslno, complaint_deptslno, rectify_pending_hold_remarks, cm_hold_reason_slno,
        rm_room_slno,
    } = rectfyDta

    const dispatch = useDispatch();
    const [search, setSearch] = useState(0)
    const [select, setSelect] = useState(1)
    const [assetArray, setAssetArray] = useState([]);
    const [deletedFiles, setDeletedFiles] = useState([]);
    const [newlyAddedAssets, setNewlyAddedAssets] = useState([])
    const [cm_am_asset_no, setcm_am_asset_no] = useState('')
    const [item_slno, setItem_slno] = useState(0)
    const [assetStatus, setAssetStatus] = useState(0)
    const [selectedAsset, setSelectedAsset] = useState('');
    const [codept, setcodept] = useState(0)
    const [pending, setPending] = useState(cm_hold_reason_slno !== undefined ? true : false);
    const [rectified, setRectify] = useState(cm_hold_reason_slno === undefined ? true : false);
    const [pendholdreason, setPendhold] = useState(rectify_pending_hold_remarks !== null ? rectify_pending_hold_remarks : '')
    const [empName, setempname] = useState([])
    const [Employee, setEmployee] = useState([])
    const [assetSpareOpen, setassetSpareOpen] = useState(false)
    const [assetSpareFlag, setassetSpareFlag] = useState(0)
    const [assetSparedetails, setAssetSparedetails] = useState([])
    const [selectEmployeeChk, setSelectEmployeeChk] = useState(0)
    const [assetData, setassetData] = useState(0)
    const [selectFile, setSelectFile] = useState([]);
    const emidsSet = new Set(Employee.map(item => item.emids.toString()));
    const filteredArray = empName.filter(item => !emidsSet.has(item.assigned_emp.toString()));
    const [asset_dept, setasset_dept] = useState('')
    const [holdReason, setHoldReason] = useState(cm_hold_reason_slno !== 0 ? cm_hold_reason_slno : 0)
    const [custAsset, setcustAsset] = useState(0)
    const [uploadBlink, setuploadBlink] = useState(0)
    const [custFirstName, setcustFirstName] = useState('')
    const [custSecName, setcustSecName] = useState('')
    const [previewFile, setPreviewFile] = useState({ url: "", type: "" });
    const [imageShow, setImageShow] = useState(false)
    const [imageShowFlag, setImageShowFlag] = useState(0)
    const [isExpanded, setIsExpanded] = useState(false);
    const [assetDaata, setAssetDaata] = useState({})
    const [serviceUpdateCount, setserviceUpdateCount] = useState(0)

    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const empdept = useSelector((state) => {
        return state.LoginUserData.empdept
    })

    useEffect(() => {
        dispatch(getDepartment())
    }, [dispatch])

    useEffect(() => {
        setcodept(complaint_deptslno);
    }, [complaint_deptslno]);

    const updatePendhold = useCallback((e) => {
        setPendhold(e.target.value)
    }, [])

    const updateSelect = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setSelectEmployeeChk({ ...select, [e.target.name]: value })
    }

    const updateRectified = useCallback((e) => {
        if (e.target.checked === true) {
            setRectify(true)
            setPending(false)
            setPendhold('')
        } else {
            setRectify(false)
        }
    }, [])

    const updateOnHold = useCallback((e) => {
        if (e.target.checked === true) {
            setPending(true)
            setRectify(false)
            setPendhold('')
        } else {
            setPending(false)
        }
    }, [])

    const UpdateAssetNo = useCallback((e) => {
        setcm_am_asset_no(e.target.value.toLocaleUpperCase())
        setAssetStatus(0)
    }, [])

    useEffect(() => {
        const getAssetinComplaint = async (complaint_slno) => {
            const result = await axioslogin.get(`/complaintreg/getAssetinComplaint/${complaint_slno}`)
            const { success, data } = result.data
            if (success === 2) {
                setAssetArray(data)
            }
            else {
                setAssetArray([])
            }
        }
        getAssetinComplaint(complaint_slno)
    }, [complaint_slno, serviceUpdateCount])

    const { data: custodianDetailsVal, isSuccess } = useQuery({
        queryKey: ['getCustodianDetails', empdept],
        enabled: empdept !== 0,
        queryFn: () => getCustodianDetails(empdept),
    });

    const custodianDetails = useMemo(() => custodianDetailsVal, [custodianDetailsVal])

    useEffect(() => {
        if (isSuccess && custodianDetails && custodianDetails.length > 0) {
            const { am_custdn_asset_no_first, am_custdn_asset_no_second } = custodianDetails[0];
            setcustFirstName(am_custdn_asset_no_first);
            setcustSecName(am_custdn_asset_no_second);
        }
    }, [isSuccess, custodianDetails]);

    const searchAssetNo = useCallback((e) => {
        if (cm_am_asset_no === '') {
            infoNotify('Please Enter Asset Number');
        } else {
            const starts = custFirstName + '/' + custSecName;
            const asset_number = parseInt(cm_am_asset_no);
            const postdata = {
                item_asset_no: starts,
                item_asset_no_only: asset_number
            };
            const getAssetdata = async (postdata) => {
                const result = await axioslogin.post('/PasswordManagementMain/getAssetNo', postdata);
                const { data, success } = result.data;
                if (data.length !== 0) {
                    if (success === 1) {
                        const { item_deptsec_slno } = data[0]
                        if (item_deptsec_slno === complaint_dept_secslno) {
                            const { item_name, sec_name, am_item_map_slno, item_asset_no_only, item_asset_no, am_custodian_dept_slno, item_custodian_dept_sec } = data[0];
                            const assetExists = assetArray.some(asset => asset.item_asset_no_only === item_asset_no_only);
                            if (assetExists) {
                                infoNotify("You already added this asset in complaint");
                            } else {
                                const newAsset = { item_name, sec_name, am_item_map_slno, item_asset_no_only, item_asset_no, am_custodian_dept_slno, item_custodian_dept_sec };
                                setAssetArray((prevArray) => [...prevArray, newAsset]);
                                setNewlyAddedAssets((prevAssets) => [...prevAssets, newAsset]);
                                setcm_am_asset_no('');
                                setassetData(0)
                            }
                        } else {
                            infoNotify("Can't find Searched Asset Under Department Section")
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
    }, [cm_am_asset_no, assetArray, custFirstName, custSecName, complaint_dept_secslno]);

    const searchAssetNoinMenu = useCallback((e) => {
        if (item_slno === 0) {
            infoNotify('Please select Asset')
        }
        else {
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
                        const { item_name, sec_name, am_item_map_slno, item_asset_no_only, item_asset_no, am_custodian_dept_slno, item_custodian_dept_sec } = data[0];
                        const assetExists = assetArray.some(asset => asset.item_asset_no_only === item_asset_no_only);
                        if (assetExists) {
                            infoNotify("You already added this asset in complaint");
                        } else {
                            const newAsset = { item_name, sec_name, am_item_map_slno, item_asset_no_only, item_asset_no, am_custodian_dept_slno, item_custodian_dept_sec };

                            setAssetArray((prevArray) => [...prevArray, newAsset]);
                            setNewlyAddedAssets((prevAssets) => [...prevAssets, newAsset]);
                            setSelectedAsset(0)
                            setassetData(0)
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
    }, [item_slno, assetArray, asset_dept])

    useEffect(() => {
        const getEmployeees = async () => {
            const result = await axioslogin.get(`Rectifycomplit/getAssignEmps/${complaint_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setempname(data)
            }
            else {
                setempname([])
            }
        }
        getEmployeees();
    }, [complaint_slno])

    const handleDelete = (indexToDelete) => {
        setAssetArray((prevArray) => {
            const itemToDelete = prevArray[indexToDelete];
            const updatedArray = prevArray.filter((_, index) => index !== indexToDelete);
            setDeletedFiles((prevDeletedFiles) => [...prevDeletedFiles, itemToDelete]);

            return updatedArray;
        });
    };

    const ClearAssetSelection = () => {
        setItem_slno(0);
        setcm_am_asset_no('')
    };

    // const SearchAsset = useCallback((e) => {
    //     setSearch(1)
    //     setSelect(0)
    //     setSelectedAsset('')
    // }, [])

    // const SelectAsset = useCallback((e) => {
    //     setSelect(1)
    //     setSearch(0)
    //     setcm_am_asset_no('')
    // }, [])

    const [isSelect, setIsSelect] = useState(true);
    const handleAssetSelectToggle = () => {
        setIsSelect((prev) => {
            const newValue = !prev;
            if (newValue) {
                setSelect(1);
                setSearch(0);
                setcm_am_asset_no('');
            } else {
                setSearch(1);
                setSelect(0);
                setSelectedAsset('');
            }
            return newValue;
        });
    };


    const Close = useCallback(() => {
        setrectfyFlag(0)
        setrectfyOpen(false)
    }, [setrectfyFlag, setrectfyOpen])

    const AssetSpareDetailsview = useCallback((val) => {
        if (newlyAddedAssets.includes(val)) {
            const InsertAssetx = [{
                cm_complait_slno: complaint_slno,
                cm_am_assetmap_slno: val.item_asset_no_only,
                cm_asset_dept: val.item_asset_no,
                am_item_map_slno: val.am_item_map_slno,
                asset_status: 1,
                create_user: id
            }];
            const InsertAsset = async (InsertAssetx) => {
                const result = await axioslogin.post('/complaintreg/insertAssetArray', InsertAssetx);
                const { success } = result.data;
                if (success === 1) {
                    const updatedAssetsDta = newlyAddedAssets.filter(item => item !== val);
                    setNewlyAddedAssets(updatedAssetsDta);
                }
            };
            InsertAsset(InsertAssetx);
        }
        setAssetSparedetails(val);
        setassetSpareFlag(1);
        setassetSpareOpen(true);
    }, [newlyAddedAssets, complaint_slno, id]);

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
            updatedFiles.splice(index, 1);
            return updatedFiles;
        });
    };

    const servicefunctn = useCallback((val) => {
        const { am_item_map_slno, am_custodian_dept_slno, item_custodian_dept_sec } = val
        if (newlyAddedAssets.includes(val)) {
            const InsertAssetx = [{
                cm_complait_slno: complaint_slno,
                cm_am_assetmap_slno: val.item_asset_no_only,
                cm_asset_dept: val.item_asset_no,
                am_item_map_slno: val.am_item_map_slno,
                asset_status: 1,
                create_user: id
            }];
            const InsertAsset = async (InsertAssetx) => {
                const result = await axioslogin.post('/complaintreg/insertAssetArray', InsertAssetx);
                const { success } = result.data;
                if (success === 1) {
                    const updatedAssetsDta = newlyAddedAssets.filter(item => item !== val);
                    setNewlyAddedAssets(updatedAssetsDta);
                    const patchdata = {
                        item_dept_slno: am_custodian_dept_slno,
                        item_deptsec_slno: item_custodian_dept_sec,
                        am_item_map_slno: am_item_map_slno,
                        am_trans_from_dept: complaint_from_dept,
                        am_trans_from_dept_sec: complaint_dept_secslno,
                        am_trans_from_room: rm_room_slno,
                        am_trans_from_subroom: null,
                        am_custodian_trans_status: 1,
                        asset_item_service_user: id,
                        transfer_user: id
                    }
                    const ServiceUpdate = async (patchdata) => {
                        const result = await axioslogin.patch('/ItemMapDetails/AssetService', patchdata);
                        const { success, message } = result.data
                        if (success === 2) {
                            succesNotify(message)
                            setserviceUpdateCount(serviceUpdateCount + 1)
                        } else {
                            warningNotify(message)
                            setserviceUpdateCount(serviceUpdateCount + 1)
                        }
                    }
                    ServiceUpdate(patchdata)
                }
            };
            InsertAsset(InsertAssetx);
        }
        else {
            const patchdata = {
                item_dept_slno: am_custodian_dept_slno,
                item_deptsec_slno: item_custodian_dept_sec,
                am_item_map_slno: am_item_map_slno,
                am_trans_from_dept: complaint_from_dept,
                am_trans_from_dept_sec: complaint_dept_secslno,
                am_trans_from_room: rm_room_slno,
                am_trans_from_subroom: null,
                am_custodian_trans_status: 1,
                asset_item_service_user: id,
                transfer_user: id
            }
            const ServiceUpdate = async (patchdata) => {
                const result = await axioslogin.patch('/ItemMapDetails/AssetService', patchdata);
                const { success, message } = result.data
                if (success === 2) {
                    succesNotify(message)
                    setserviceUpdateCount(serviceUpdateCount + 1)
                } else {
                    warningNotify(message)
                    setserviceUpdateCount(serviceUpdateCount + 1)
                }
            }
            ServiceUpdate(patchdata)
        }
    }, [id, setserviceUpdateCount, serviceUpdateCount, newlyAddedAssets, complaint_dept_secslno, complaint_from_dept, complaint_slno, rm_room_slno])

    const reset = useCallback(() => {
        setcodept(null)
        setCount(0)
        setItem_slno(0)
        setSearch(0)
        setSelect(0)
        setcm_am_asset_no('')
        setSelectedAsset('')
        setAssetArray([])
        setNewlyAddedAssets([])
        setDeletedFiles([])
        setserviceUpdateCount(0)
        setassetTransCount(0)
    }, [setCount])

    const UploadFile = useCallback(async () => {
        const InsertFile = async (selectFile, complaint_slno) => {
            try {
                const formData = new FormData();
                formData.append('id', complaint_slno);
                for (const file of selectFile) {
                    if (file.type.startsWith('image')) {
                        const compressedFile = await handleImageUpload(file);
                        formData.append('files', compressedFile, compressedFile.name);
                    } else {
                        formData.append('files', file, file.name);
                    }
                }
                const uploadResult = await axioslogin.post('/complaintFileUpload/uploadFile/Complaint', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const { success } = uploadResult.data;
                if (success === 1) {
                    succesNotify("File Uploaded Successfully")
                    setSelectFile([])
                    setuploadBlink(0)
                }
                // return uploadResult.data;
            } catch (error) {
                errorNotify('An error occurred during file upload:', error);
            }
        };
        await InsertFile(selectFile, complaint_slno);
    }, [complaint_slno, selectFile, handleImageUpload, setuploadBlink]);

    const buttonStyle = {
        fontSize: 16,
        color: '#523A28',
        cursor: 'pointer',
        boxShadow: 5,
        border: 'none',
        transition: 'transform 0.2s, bgcolor 0.2s',
        '&:hover': {
            bgcolor: 'white',
            color: '#523A28',
            transform: 'scale(1.1)',
        },
        '&:active': {
            transform: 'scale(0.95)',
        },
    }

    const patchData = Employee && Employee.map((val) => {
        return {
            compalint_status: rectified === true ? 2 : 1, // when we click on rectifi status become 2 other wise status is 1
            cm_rectify_status: rectified === true ? 'R' : pending === true ? 'O' : null,
            cm_rectify_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            rectify_pending_hold_remarks: pending === true ? pendholdreason : rectified === true ? pendholdreason : null,
            pending_onhold_time: pending === true ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : null,
            pending_onhold_user: id,
            assigned_emp: val.emids,
            verify_spervsr: 0,
            cm_hold_reason_slno: holdReason,
            complaint_slno: complaint_slno,

        }
    })
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

    const inactiveEployee = filteredArray && filteredArray.map((value) => {
        return {
            complaint_slno: complaint_slno,
            assigned_emp: value.assigned_emp
        };
    });

    const rectifycmplt = useCallback((e) => {
        e.preventDefault();
        if (selectFile.length !== 0) {
            infoNotify("Click on fileUpload to upLoad file")
            setuploadBlink(1)
        }
        else {
            if (Employee.length === 0) {
                infoNotify("Please Select Employees Worked UnderComplaint")
            }
            else {
                if (pendholdreason === '') {
                    infoNotify("Please Add Remarks")
                }
                else {
                    if ((cm_am_asset_no !== '' && assetStatus === 0) || (selectedAsset !== '' && assetStatus === 0)) {
                        infoNotify(
                            <>please click on  &apos; <AddCircleIcon /> &apos;  to add Asset details</>
                        );
                    } else {
                        const updateAsset = async (updateAssetz) => {
                            const result = await axioslogin.post('/complaintreg/insertAssetArray', updateAssetz);
                            return result.data
                        }
                        const updateFun = async (patchData) => {
                            const result = await axioslogin.patch(`/Rectifycomplit/updatecmp`, patchData);
                            return result.data
                        }
                        const inactiveAsset = async (assetinactive) => {
                            const result = await axioslogin.patch('/complaintreg/assetinactive', assetinactive);
                            return result.data
                        }
                        const Inactiveemp = async (inactiveEployee) => {
                            const result = await axioslogin.post(`/complaintassign/employeeTrans/Inactive`, inactiveEployee);
                            return result.data
                        }

                        updateFun(patchData).then((value) => {
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
                                                    if (filteredArray.length !== 0) {
                                                        Inactiveemp(inactiveEployee).then((response) => {
                                                            const { succes, message } = response;
                                                            if (succes === 1) {
                                                                succesNotify("Complaint Updated Successfully");
                                                                setCount(count + 1);
                                                                reset();
                                                                Close();

                                                            } else {
                                                                infoNotify(message);
                                                            }
                                                        }).catch((error) => {
                                                            infoNotify("An error occurred while updating the complaint.");
                                                        });
                                                    } else {
                                                        succesNotify("Complaint Updated Successfully");
                                                        setCount(count + 1);
                                                        reset();
                                                        Close();

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
                                                if (filteredArray.length !== 0) {
                                                    Inactiveemp(inactiveEployee).then((response) => {
                                                        const { succes, message } = response;
                                                        if (succes === 1) {
                                                            succesNotify("Complaint Updated Successfully");
                                                            setCount(count + 1);
                                                            reset();
                                                            Close();

                                                        } else {
                                                            infoNotify(message);
                                                        }
                                                    }).catch((error) => {
                                                        infoNotify("An error occurred while updating the complaint.");
                                                    });
                                                } else {
                                                    succesNotify("Complaint Updated Successfully");
                                                    setCount(count + 1);
                                                    reset();
                                                    Close();

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
                                                if (filteredArray.length !== 0) {
                                                    Inactiveemp(inactiveEployee).then((response) => {
                                                        const { succes, message } = response;
                                                        if (succes === 1) {
                                                            succesNotify("Complaint Updated Successfully");
                                                            setCount(count + 1);
                                                            reset();
                                                            Close();

                                                        } else {
                                                            infoNotify(message);
                                                        }
                                                    }).catch((error) => {
                                                        infoNotify("An error occurred while updating the complaint.");
                                                    });
                                                } else {
                                                    succesNotify("Complaint Updated Successfully");
                                                    setCount(count + 1);
                                                    reset();
                                                    Close();

                                                }
                                            }
                                            else {

                                                infoNotify("Unable to delete asset details")
                                            }
                                        })
                                    }
                                    else {
                                        if (filteredArray.length !== 0) {
                                            Inactiveemp(inactiveEployee).then((response) => {
                                                const { succes, message } = response;
                                                if (succes === 1) {
                                                    succesNotify("Complaint Updated Successfully");
                                                    setCount(count + 1);
                                                    reset();
                                                    Close();

                                                } else {
                                                    infoNotify(message);
                                                }
                                            }).catch((error) => {
                                                infoNotify("An error occurred while updating the complaint.");
                                            });
                                        } else {
                                            succesNotify("Complaint Updated Successfully");
                                            setCount(count + 1);
                                            reset();
                                            Close();

                                        }

                                    }
                                }
                            }
                            else {
                                infoNotify(message)

                            }
                        })
                        updateFun(patchData)
                    }
                }
            }
        }

    }, [patchData, count, Employee, cm_am_asset_no, assetStatus, updateAssetz, Close, assetinactive, deletedFiles, pendholdreason,
        newlyAddedAssets, selectedAsset, setCount, inactiveEployee, filteredArray.length, reset, selectFile.length])

    const getemp = (e, v) => {
        if (e === true) {
            const obj = {
                emids: v
            }
            setEmployee([...Employee, obj])
        }
        else {
            const obj = {
                emids: v
            }
            const newarry = Employee.filter((val) => {
                return val.emids !== obj.emids
            })
            setEmployee(newarry)
        }
    }

    const [assetTransCount, setassetTransCount] = useState(0)
    const [selectedAssets, setSelectedAssets] = useState([])

    const postArrayOfAssetNo = useMemo(() => {
        return {
            AssetItemMapSlno: selectedAssets?.map((assetSlno) => assetSlno.am_item_map_slno)
        };
    }, [selectedAssets])

    const { data: dataTransFer, } = useQuery({
        queryKey: ['getArrayOfAssetLocationDetails', postArrayOfAssetNo],
        queryFn: () => getArrayOfAssetLocationDetails(postArrayOfAssetNo),
    });

    const dataTrans = useMemo(() => dataTransFer, [dataTransFer])
    const patchDeptTransfer = useMemo(() => {
        return dataTrans?.map((asset) => ({
            item_dept_slno: complaint_from_dept,
            item_deptsec_slno: complaint_dept_secslno,
            item_room_slno: rm_room_slno !== 0 ? rm_room_slno : null,
            item_subroom_slno: null !== 0 ? null : null,
            am_custodian_trans_status: 1,
            am_trans_from_dept: asset.item_dept_slno || null,
            am_trans_from_dept_sec: asset.item_deptsec_slno || null,
            am_trans_from_room: asset.item_room_slno || null,
            am_trans_from_subroom: asset.item_subroom_slno || null,
            transfer_user: id,
            am_item_map_slno: asset.am_item_map_slno
        }));
    }, [dataTrans, complaint_from_dept, complaint_dept_secslno, rm_room_slno, id])

    const updateDeptTransfer = useCallback(() => {
        if (custAsset !== 0) {
            infoNotify(
                <>
                    Click on <AddCircleIcon /> to add asset to the Transfer List.
                </>
            )
        } else {
            const patchDeptTrans = async (patchDeptTransfer) => {
                const result = await axioslogin.patch('/assetDeptTransfer/AssetTransfer', patchDeptTransfer)
                const { success, message } = result.data
                if (success === 1) {
                    succesNotify(message)
                    setassetTransCount(assetTransCount + 1)
                    setSelectedAssets([])
                } else {
                    warningNotify(message)
                    setSelectedAssets([])
                }
            }
            patchDeptTrans(patchDeptTransfer)
        }
    }, [patchDeptTransfer, setSelectedAssets, custAsset, setassetTransCount, assetTransCount])

    const handleToggle = () => {
        setIsExpanded((prev) => !prev);
    };

    const ViewImage = useCallback((file) => {
        const fileType = file.url
            ? file.url.endsWith(".pdf")
                ? "pdf"
                : "image"
            : file.type.includes("application/pdf")
                ? "pdf"
                : "image";

        const fileUrl = file.url || URL.createObjectURL(file);
        setPreviewFile({ url: fileUrl, type: fileType });
        setImageShow(true)
        setImageShowFlag(1)
    }, [])

    const CloseFile = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])

    const handleAddAsset = () => {
        if (assetDaata) {
            const isDuplicate = selectedAssets.some(
                (asset) => asset.am_item_map_slno === assetDaata.am_item_map_slno
            );
            if (isDuplicate) {
                infoNotify("Selected asset is already added.");
            } else {
                setSelectedAssets((prev) => [...prev, assetDaata]);
                setcustAsset(0);
            }
        }
    };

    const removeSlected = useCallback((indexToRemove) => {
        setSelectedAssets((prev) => prev.filter((_, index) => index !== indexToRemove));
    }, []);

    return (
        <Box>
            {imageShowFlag === 1 ?
                < Box >
                    <FileViewSingle previewFile={previewFile} imageShow={imageShow} CloseFile={CloseFile} />
                </Box> : null
            }

            {assetSpareFlag === 1 ?
                <AssetSpareModal
                    openSpare={assetSpareOpen}
                    setOpenSpare={setassetSpareOpen}
                    setassetSpareFlag={setassetSpareFlag}
                    assetSparedetails={assetSparedetails}
                    complaint_slno={complaint_slno}
                /> :
                null}
            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={rectfyOpen}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
                    <Box
                        sx={{
                            width: '80vw',
                            height: '95vh',
                            bgcolor: 'background.body',
                            borderRadius: 'md',
                            boxShadow: 'lg',
                            display: 'flex',
                            flexDirection: 'column',
                            py: 2, px: 3
                        }}
                    >
                        <Box sx={{ mb: 2, flexShrink: 0, }}>
                            <Box sx={{ flex: 1, color: 'grey', pl: .5 }}>
                                Rectify Complaint / Service Report
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', bgcolor: '#ECEDEF', py: 1, px: .5, mt: 1 }}>
                                <Box sx={{ flex: 1, pl: .5 }}>
                                    <Typography sx={{ pl: .5, fontWeight: 600, color: 'Black', fontSize: 18 }}>Ticket No.{complaint_slno}</Typography>
                                    <Typography sx={{ pl: .5, fontSize: 14, color: 'Black', }}>
                                        {complaint_desc}
                                    </Typography>
                                    <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', py: .5 }}>
                                        Complaint Type: {complaint_type_name}
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: .8, textAlign: 'right', pr: 1.5 }}>
                                    <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', }}>
                                        {location}
                                    </Typography>
                                    {rm_room_name !== null ?
                                        <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', }}>
                                            {rm_room_name}
                                            {rm_roomtype_name || rm_insidebuildblock_name || rm_floor_name ?
                                                ` (${rm_roomtype_name ? rm_roomtype_name : ''}${rm_roomtype_name && rm_insidebuildblock_name ? ' - ' : ''}${rm_insidebuildblock_name ? rm_insidebuildblock_name : ''}${(rm_insidebuildblock_name && rm_floor_name) ? ' - ' : ''}${rm_floor_name ? rm_floor_name : ''})`
                                                : "Not Updated"}
                                        </Typography> : null}
                                    <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', }}>
                                        {compalint_date
                                            ? format(new Date(compalint_date), 'dd MMM yyyy,  hh:mm a')
                                            : 'Invalid Date'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                flexGrow: 1,
                                overflowY: 'auto',
                                ml: 1
                            }}
                        >

                            <Box sx={{ display: 'flex', gap: .5, cursor: 'pointer' }} onClick={handleToggle}>
                                <Typography sx={{ fontWeight: 600, color: 'Black', fontSize: 17, pt: .2 }}>
                                    Asset Details
                                </Typography>
                                {isExpanded || assetArray.length !== 0 ? <ArrowDropUpOutlinedIcon sx={{ width: 30, height: 25 }} />
                                    : <ArrowDropDownOutlinedIcon sx={{ width: 30, height: 25 }} />}
                            </Box>
                            {isExpanded || assetArray.length !== 0 ?
                                <Box>
                                    <Typography sx={{ fontWeight: 600, color: '#394E6C', fontSize: 15, pt: 1.5 }}>
                                        Add Assets to this Ticket
                                    </Typography>
                                    <Typography sx={{ fontStyle: 'italic', color: '#394E6C', }}>
                                        [you can add assets to this ticket from the ticket raised location]
                                    </Typography>
                                    <Box sx={{ pt: 1, display: 'flex', }}>
                                        <Switch
                                            checked={isSelect}
                                            color="neutral"
                                            onChange={handleAssetSelectToggle}
                                            slotProps={{
                                                track: {
                                                    children: (
                                                        <>
                                                            {isSelect ? <Typography sx={{ ml: '15px', mr: '10px', fontSize: 13 }}>
                                                                Select
                                                            </Typography>
                                                                : <Typography sx={{ ml: '30px', mr: '10px', fontSize: 13 }}>
                                                                    Search
                                                                </Typography>}
                                                        </>
                                                    ),
                                                },
                                            }}
                                            sx={{
                                                '--Switch-thumbSize': '19px',
                                                '--Switch-trackWidth': '90px',
                                                '--Switch-trackHeight': '29px',
                                                '& .MuiSwitch-thumb': {
                                                    borderRadius: '3px',
                                                },
                                                '& .MuiSwitch-track': {
                                                    borderRadius: '3px',
                                                },
                                            }}

                                        />
                                        {select === 1 && (
                                            <Box sx={{ flex: 1, display: 'flex', mr: 5, mt: .1 }}>
                                                <CssVarsProvider>
                                                    <Box sx={{ flex: 1, ml: 1 }}>
                                                        <CmAssetList assetz={assetData} setAssetz={setassetData} complaint_dept_secslno={complaint_dept_secslno}
                                                            setSelectedAsset={setSelectedAsset} setItem_slno={setItem_slno} setasset_dept={setasset_dept}
                                                            codept={codept} assetTransCount={assetTransCount} />
                                                    </Box>
                                                    <Box sx={{ ml: 1, }}>
                                                        <Tooltip title={'Add More Asset'}>
                                                            <AddBoxIcon
                                                                sx={{
                                                                    p: .1,
                                                                    color: 'black', cursor: 'pointer',
                                                                    bgcolor: '#BDC4C9', borderRadius: 3,
                                                                    '&:hover': { color: '#636B74' },
                                                                    height: 30, width: 29,
                                                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                                                                }}
                                                                onClick={searchAssetNoinMenu}
                                                            />
                                                        </Tooltip>
                                                    </Box>
                                                </CssVarsProvider>
                                            </Box>
                                        )}
                                        {search === 1 && (
                                            <Box sx={{ flex: 1, display: 'flex', mr: 5 }}>
                                                <CssVarsProvider>
                                                    <Box sx={{ flex: 1, ml: 1 }}>
                                                        <Input
                                                            placeholder=" Asset Number"
                                                            sx={{
                                                                borderRadius: 0,
                                                                minHeight: 15,
                                                            }}
                                                            type='number'
                                                            autoComplete='off'
                                                            startDecorator={
                                                                <Button variant="soft" color="neutral" >
                                                                    {`${custFirstName}/ ${custSecName}`}
                                                                </Button>
                                                            }
                                                            endDecorator={
                                                                <>
                                                                    {cm_am_asset_no !== '' ?
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

                                                            name='cm_am_asset_no'
                                                            value={cm_am_asset_no || ''}
                                                            onChange={UpdateAssetNo}
                                                        />
                                                    </Box>
                                                    <Box sx={{ ml: 1, }}>
                                                        <Tooltip title={'Add More Asset'}>
                                                            <AddBoxIcon
                                                                sx={{
                                                                    p: .1,
                                                                    color: 'black', cursor: 'pointer',
                                                                    bgcolor: '#BDC4C9', borderRadius: 3,
                                                                    '&:hover': { color: '#636B74' },
                                                                    height: 30, width: 29,
                                                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                                                                }}
                                                                onClick={searchAssetNo}
                                                            />
                                                        </Tooltip>
                                                    </Box>
                                                </CssVarsProvider>
                                            </Box>
                                        )}
                                    </Box>

                                    {assetArray.length !== 0 && (
                                        <Box sx={{ flex: 1, mr: 4, mt: 1, display: 'flex', bgcolor: '#BDC4C9' }}>
                                            <Box sx={{ flex: .8, textAlign: 'center', fontSize: 15, fontWeight: 600 }}>#</Box>
                                            <Box sx={{ flex: 2.5, fontSize: 14, fontWeight: 600 }}>Asset Number</Box>
                                            <Box sx={{ flex: 9, fontSize: 14, fontWeight: 600 }}>Asset Name</Box>
                                            <Box sx={{ flex: 3, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>Spare Parts Details</Box>
                                            <Box sx={{ flex: 2, textAlign: 'center', fontSize: 14, fontWeight: 600, pr: .5 }}>For Service</Box>
                                            <Box sx={{ flex: 1, textAlign: 'center', fontSize: 14, fontWeight: 600, pr: .3 }}>Action</Box>
                                        </Box>
                                    )}

                                    {assetArray.map((val, index) => {
                                        const formattedSlno = val.item_asset_no_only === 0 ? 0 : val.item_asset_no_only === undefined ? 0 : val.item_asset_no_only === null ? 0
                                            : val.item_asset_no_only.toString().padStart(6, '0');
                                        return (
                                            <Box key={index} sx={{ flex: 1, mr: 4, display: 'flex', borderBottom: 1, borderColor: 'lightgrey', pt: .8 }}>
                                                <Box sx={{ flex: .8, textAlign: 'center', fontSize: 13 }}>{index + 1}</Box>
                                                <Box sx={{ flex: 2.5, fontSize: 13 }}>{val.item_asset_no}/{formattedSlno}</Box>
                                                <Box sx={{ flex: 9, fontSize: 13, minHeight: 28 }}>{val.item_name}</Box>
                                                <Box sx={{ flex: 3, textAlign: 'center', fontSize: 13, }}>
                                                    {val.asset_item_service === 1 || val.asset_item_service === 2 ?
                                                        <BuildIcon sx={{ color: 'lightgrey', cursor: 'pointer', p: .3 }} /> :
                                                        <Tooltip title={'Click here for Spare Change'}
                                                            sx={{ width: 200, }} placement='top'>
                                                            <BuildIcon sx={{ color: '#488BA3', cursor: 'pointer', p: .3 }} onClick={() => AssetSpareDetailsview(val)} />
                                                        </Tooltip>
                                                    }
                                                </Box>
                                                <Box sx={{ flex: 2, textAlign: 'center', fontSize: 13, pr: .5, cursor: 'pointer' }}>
                                                    {val.asset_item_service === 0 ?
                                                        <Tooltip title={'Click Here for Service this Asset (this will be transfered to the service list) '}
                                                            sx={{ width: 200, }} placement='top'>
                                                            <ManageAccountsSharpIcon sx={{
                                                                color: '#603A70', cursor: 'pointer', p: .1,
                                                                '&:hover': { color: '#0000FF' },
                                                            }}
                                                                onClick={() => servicefunctn(val)}
                                                            />
                                                        </Tooltip>
                                                        :
                                                        val.asset_item_service === undefined ?
                                                            <Tooltip title={'Asset will be Transfer to Service List by clicking'}
                                                                sx={{ width: 200, }} color='warning' placement='top'>
                                                                <ManageAccountsSharpIcon sx={{
                                                                    color: '#603A70', cursor: 'pointer', p: .1,
                                                                    '&:hover': { color: '#0000FF' },
                                                                }}
                                                                    onClick={() => servicefunctn(val)}
                                                                />
                                                            </Tooltip>
                                                            :
                                                            val.asset_item_service === 1 ?
                                                                <Tooltip title={'Asset Already added to service'}
                                                                    sx={{ width: 215, bgcolor: 'grey' }} placement='top'>
                                                                    <ManageAccountsSharpIcon sx={{
                                                                        color: 'lightgrey', cursor: 'pointer', p: .1,
                                                                    }}
                                                                    />
                                                                </Tooltip> :
                                                                val.asset_item_service === 2 ?
                                                                    <Tooltip title={'Asset  added to  Condem List'}
                                                                        sx={{ width: 215, bgcolor: 'grey' }} placement='top'>
                                                                        <DeleteIcon sx={{
                                                                            color: 'lightgrey', cursor: 'pointer', p: .1,
                                                                        }}
                                                                        />
                                                                    </Tooltip> : null

                                                    }
                                                </Box>
                                                <Box sx={{ flex: 1, textAlign: 'center', fontSize: 13 }}>
                                                    {newlyAddedAssets.includes(val) ? (
                                                        <DeleteForeverIcon sx={{ color: 'darkred', cursor: 'pointer' }} onClick={() => handleDelete(index)} />
                                                    ) : (
                                                        <DeleteForeverIcon sx={{ color: 'lightgrey', cursor: 'pointer' }} />
                                                    )}
                                                </Box>
                                            </Box>
                                        );
                                    })}

                                    <Box sx={{ flex: 1, pt: 1.5, }}>
                                        <Typography sx={{ fontWeight: 600, color: '#394E6C', fontSize: 15, pt: .5 }}>
                                            Asset Transfer
                                        </Typography>
                                        <Typography sx={{ fontStyle: 'italic', color: '#394E6C', }}>
                                            [you can transfer new assets to the ticket raised department for temporary allocation / permanent transfer]
                                        </Typography>
                                        <Box sx={{ display: 'flex', pr: 3.9, pt: .5, gap: 1 }}>
                                            <AssetListUnderCustodian
                                                custAsset={custAsset}
                                                setcustAsset={setcustAsset}
                                                setassetData={setAssetDaata}
                                                assetTransCount={assetTransCount}
                                            />
                                            <Box>
                                                <Tooltip title={'Add More Asset'}>
                                                    <Avatar size='sm' sx={{ bgcolor: 'lightgrey' }}>
                                                        <AddCircleIcon
                                                            sx={{ p: .1, color: '#523A28', cursor: 'pointer', '&:hover': { color: '#34323E' }, height: 30, width: 30 }}
                                                            onClick={handleAddAsset}
                                                        />
                                                    </Avatar>
                                                </Tooltip>
                                            </Box>

                                        </Box>

                                    </Box>
                                    <Box
                                        sx={{
                                            maxHeight: '50vh',
                                            overflowY: 'auto',

                                        }}
                                    >
                                        {selectedAssets.length !== 0 ?
                                            <>
                                                <Box sx={{
                                                    flex: 1,
                                                    mt: 1.5,
                                                    border: 1,
                                                    mr: 3.6,
                                                    borderColor: '#BDC4C9'
                                                }}>
                                                    <Box sx={{ flex: 1, display: 'flex', bgcolor: '#BDC4C9' }}>
                                                        <Box sx={{ flex: .5, pl: 3, color: 'black', fontWeight: 600, fontSize: 14 }}>
                                                            #
                                                        </Box>
                                                        <Box sx={{ flex: 2, color: 'black', fontWeight: 600, fontSize: 14 }}>
                                                            Asset No.
                                                        </Box>
                                                        <Box sx={{ flex: 8, color: 'black', fontWeight: 600, fontSize: 14 }}>
                                                            Asset Name
                                                        </Box>
                                                        <Box sx={{ flex: 1, color: 'black', fontWeight: 600, fontSize: 14 }}>
                                                            Remove
                                                        </Box>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            maxHeight: '50vh',
                                                            overflowY: 'auto'
                                                        }}
                                                    >
                                                        {selectedAssets?.map((val, index) => (
                                                            <Box
                                                                key={index}
                                                                sx={{
                                                                    flex: 1,
                                                                    display: 'flex',
                                                                    borderTop: 1,
                                                                    borderColor: 'lightgrey',
                                                                }}
                                                            >
                                                                <Box sx={{ flex: 0.5, pl: 3, color: 'black', py: 0.5, fontSize: 14 }}>
                                                                    {index + 1}
                                                                </Box>
                                                                <Box sx={{ flex: 2, color: 'black', py: 0.5, fontSize: 14 }}>
                                                                    {val.item_asset_no}/{val.item_asset_no_only.toString().padStart(6, '0')}
                                                                </Box>
                                                                <Box sx={{ flex: 8, color: 'black', py: 0.5, fontSize: 14 }}>
                                                                    {val.item_name}
                                                                </Box>
                                                                <Box sx={{ flex: 1, color: 'black', py: 0.2, fontSize: 14 }}>
                                                                    <DeleteOutlineIcon onClick={() => removeSlected(index)} sx={{ cursor: 'pointer' }} />
                                                                </Box>
                                                            </Box>
                                                        ))}
                                                    </Box>


                                                </Box>
                                                <Box sx={{ flex: 1, mt: .5 }}>
                                                    <Box
                                                        onClick={updateDeptTransfer}
                                                        sx={{
                                                            width: 160, bgcolor: '#8A9299', margin: 'auto', textAlign: 'center', cursor: 'pointer',
                                                            fontWeight: 500, color: 'white', border: 1, borderColor: '#5A5F63', boxShadow: 20
                                                        }}> Trasfer Asset</Box>
                                                </Box>
                                            </>
                                            : null}
                                    </Box>
                                </Box>
                                : null}

                            <Box sx={{ pl: .4, pt: 2, display: 'flex', gap: .5 }}>
                                <Typography sx={{ fontWeight: 600, color: 'Black', fontSize: 16, pt: .2 }}>
                                    Employees Worked Under Ticket
                                </Typography>
                            </Box>
                            <Box sx={{ flex: 1, pt: 1, pl: .5 }}>
                                {empName?.map((val, index) => {
                                    return (
                                        <Box key={index} sx={{ flex: 1, display: 'flex', }}>
                                            <Checkbox
                                                label={val.em_name}
                                                value={val.assigned_emp}
                                                name={val.em_name}
                                                onChange={(e) => {
                                                    updateSelect(e)
                                                    getemp(e.target.checked, e.target.value)
                                                }}
                                                checked={val.check === 1 ? true : selectEmployeeChk.check}
                                                color="success"
                                                sx={{ mr: 1, pt: .5 }}
                                            />
                                        </Box>
                                    )
                                })}
                            </Box>
                            <Box sx={{
                                flex: 1,
                                display: "flex",
                                justifyContent: 'center',
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                pt: 1, gap: 3, mt: 2.5, pb: 1
                            }}>

                                <CusCheckBox
                                    label="Rectified"
                                    color="success"
                                    size="md"
                                    name="rectified"
                                    value={rectified}
                                    checked={rectified}
                                    onCheked={updateRectified}
                                />
                                <CusCheckBox
                                    label="On Hold"
                                    color="neutral"
                                    size="md"
                                    name="pending"
                                    value={pending}
                                    checked={pending}
                                    onCheked={updateOnHold}
                                />

                            </Box>
                            {pending === true ?
                                <Box sx={{ mr: 2, my: 1 }}>
                                    <CmHoldReasonList holdReason={holdReason} setHoldReason={setHoldReason} />
                                </Box> : null}
                            <Box sx={{ mr: 2 }}>
                                <CustomTextarea
                                    style={{ width: "100%" }}
                                    minRows={3}
                                    placeholder="Remarks"
                                    onchange={updatePendhold}
                                    value={pendholdreason === null ? '' : pendholdreason}
                                />
                            </Box>
                            <Box sx={{ flex: 1, border: 1, borderRadius: 1, borderColor: 'lightgrey', mb: .5, mr: 1 }}>
                                <Typography sx={{ fontWeight: 600, color: 'Black', fontSize: 16, pt: .5, pl: .8 }}>
                                    Attachment
                                </Typography>
                                <ComplaintAttachFiles complaint_slno={complaint_slno} />
                            </Box>
                            <Box sx={{ flex: 1, border: 1, borderRadius: 1, display: 'flex', borderColor: 'lightgrey', mb: 2, mr: 1 }}>
                                <Box sx={{ margin: "auto" }} >
                                    <label htmlFor="file-input">
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                bgcolor: '#ECEFF7',
                                                '&:hover': { bgcolor: '#E1E8F0' },
                                                px: 1,
                                                py: 0.5,
                                                cursor: 'pointer',
                                                textAlign: 'center',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                my: 0.9,
                                                ml: 0.5,
                                                height: 50,
                                            }}
                                        >
                                            <AttachmentSharpIcon sx={{ color: '#0B6BCB', mr: 0.5 }} />
                                            <Typography sx={{ color: '#0B6BCB', fontSize: 13 }}>Attach File</Typography>
                                        </Box>

                                    </label>
                                    <input
                                        id="file-input"
                                        type="file"
                                        accept=".jpg, .jpeg, .png, .pdf"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        name="file"
                                        multiple
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flex: 1, mx: .5, overflow: 'auto' }}>
                                    {selectFile.length !== 0 &&
                                        selectFile.map((file, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    my: 1,
                                                    border: "1px solid #e0e0e0",
                                                    borderRadius: "4px",
                                                    p: 0.5, mr: .5
                                                }}
                                            >
                                                {file.type.includes("image") ? (
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt={file.name}
                                                        style={{
                                                            width: "40px",
                                                            height: "40px",
                                                            objectFit: "cover",
                                                            borderRadius: "4px",
                                                            marginRight: "8px",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => ViewImage(file)}
                                                    />
                                                ) : file.type === "application/pdf" ? (
                                                    <PictureAsPdfIcon
                                                        sx={{
                                                            width: "40px",
                                                            height: "40px",
                                                            color: "#e53935",
                                                            marginRight: "8px",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => ViewImage(file)}
                                                    />
                                                ) : (
                                                    <InsertDriveFileIcon
                                                        sx={{
                                                            width: "40px",
                                                            height: "40px",
                                                            color: "#9e9e9e",
                                                            marginRight: "8px",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => ViewImage(file)}
                                                    />
                                                )}
                                                <Box sx={{ fontSize: 14, cursor: "pointer", flexGrow: 1 }}>{file.name}</Box>
                                                <ClearSharpIcon
                                                    sx={{
                                                        pl: .3, pb: .3, height: 20, width: 20, cursor: 'pointer', color: '#4D0011', mx: .5,
                                                        '&:hover': { color: '#BA0F30' },
                                                    }}
                                                    onClick={() => handleRemoveFile(index)}
                                                />
                                            </Box>
                                        ))
                                    }
                                </Box>
                                <Box sx={{ margin: "auto", }} >
                                    {uploadBlink === 1 ?
                                        <Box
                                            sx={{
                                                bgcolor: '#0B6BCB', '&:hover': { bgcolor: '#7391C8' }, my: 0.5, mr: 1, display: 'flex', pr: 1.5, pl: 0.5, pt: .3,
                                                borderRadius: 4, cursor: 'pointer',
                                                textAlign: 'center',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                animation: 'blinkAnimation 1s infinite',
                                                height: 48,
                                                '@keyframes blinkAnimation': {
                                                    '0%': { opacity: 1 },
                                                    '50%': { opacity: 0 },
                                                    '100%': { opacity: 1 },
                                                },
                                            }}
                                            onClick={UploadFile}
                                        >
                                            <UploadIcon sx={{ p: 0.1, color: 'white', height: 20, }} />
                                            <Typography sx={{ fontSize: 13, color: 'white', mt: 0.1 }}>
                                                Upload
                                            </Typography>
                                        </Box> : <Box
                                            sx={{
                                                bgcolor: '#0B6BCB', '&:hover': { bgcolor: '#7391C8' }, display: 'flex',
                                                borderRadius: 4, cursor: 'pointer',
                                                textAlign: 'center',
                                                justifyContent: 'center',
                                                alignItems: 'center', pr: 2, pl: .5, py: .5, mr: .5, my: .5,
                                                height: 48,
                                            }}
                                            onClick={UploadFile}
                                        >
                                            <UploadIcon sx={{ p: 0.1, color: 'white', height: 20, }} />
                                            <Typography sx={{ fontSize: 13, color: 'white', mt: 0.1 }}>
                                                Upload
                                            </Typography>
                                        </Box>
                                    }

                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ mt: .5, flexShrink: 0, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant='plain'
                                sx={buttonStyle}
                                onClick={rectifycmplt}
                            >Save</Button>
                            <Button
                                variant='plain'
                                sx={buttonStyle}
                                onClick={Close}
                            >Cancel</Button>
                        </Box>
                    </Box>
                </Modal>
            </CssVarsProvider>
        </Box >
    )
}

export default memo(NewRectifyModal)