import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { FormControlLabel, Typography } from '@mui/material';
import CustomTextarea from 'src/views/Components/CustomTextarea';
import { errorNotify, infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import { Avatar, Box, Button, Checkbox, Chip, CssVarsProvider, Dropdown, Input, Menu, MenuButton, MenuItem, Modal, ModalClose, ModalDialog, Tooltip } from '@mui/joy';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Done from '@mui/icons-material/Done';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import ArrowDropUpSharpIcon from '@mui/icons-material/ArrowDropUpSharp';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import BuildIcon from '@mui/icons-material/Build';
import AssetSpareModal from '../../AssetDetailsInCompl/AssetSpareModal';
import CmAssetList from '../../CmComponent/CmAssetList';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import imageCompression from 'browser-image-compression';
import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/Upload';
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import CusIconButton from 'src/views/Components/CusIconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import AmDepartmentSelWOName from 'src/views/CommonSelectCode/AmDepartmentSelWOName';
import AmDeptSecSelectWOName from 'src/views/CommonSelectCode/AmDeptSecSelectWOName';
import AmRoomSelWONameUDepSec from 'src/views/CommonSelectCode/AmRoomSelWONameUDepSec';
import AmSubRmSelWONamURoom from 'src/views/CommonSelectCode/AmSubRmSelWONamURoom';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import StarPurple500RoundedIcon from '@mui/icons-material/StarPurple500Rounded';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getDepartment } from 'src/redux/actions/Department.action';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CmHoldReasonList from '../../CmComponent/CmHoldReasonList';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AssetListUnderCustodian from 'src/views/CommonSelectCode/AssetListUnderCustodian';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

const NewRectifyModal = ({ rectfyOpen, setrectfyOpen, setrectfyFlag, rectfyDta, count, setCount }) => {

    const { complaint_slno, complaint_desc, compalint_date, rm_roomtype_name, rm_room_name, rm_insidebuildblock_name, em_department,
        rm_floor_name, location, complaint_type_name, complaint_dept_secslno, complaint_deptslno, rectify_pending_hold_remarks, cm_hold_reason_slno } = rectfyDta


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
    const [isOpen, setIsOpen] = useState(false);
    const [pending, setPending] = useState(cm_hold_reason_slno !== 0 ? true : false);
    const [rectified, setRectify] = useState(false);
    const [pendholdreason, setPendhold] = useState(rectify_pending_hold_remarks !== null ? rectify_pending_hold_remarks : '')
    const [empName, setempname] = useState([])
    const [Employee, setEmployee] = useState([])
    const [assetSpareOpen, setassetSpareOpen] = useState(false)
    const [assetSpareFlag, setassetSpareFlag] = useState(0)
    const [assetSparedetails, setAssetSparedetails] = useState([])
    const [selectEmployeeChk, setSelectEmployeeChk] = useState(0)
    const [assetData, setassetData] = useState(0)
    const [selectFile, setSelectFile] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const emidsSet = new Set(Employee.map(item => item.emids.toString()));
    const filteredArray = empName.filter(item => !emidsSet.has(item.assigned_emp.toString()));
    const [assetNo, setAssetNo] = useState('')
    const [transDept, setTransDept] = useState(0)
    const [transDeptSec, setTransDeptSec] = useState(0)
    const [roomNo, setRoomNo] = useState(0)
    const [subRoomNo, setSubRoomNo] = useState(0)
    const [markAnAssetUnderCompFlag, setmarkAnAssetUnderCompFlag] = useState(0)
    const [addAssetUnderSecFlag, setaddAssetUnderSecFlag] = useState(0)
    const [serachFlag, setSerachFlag] = useState(0)
    const [asset_dept, setasset_dept] = useState('')
    const [holdReason, setHoldReason] = useState(cm_hold_reason_slno !== 0 ? cm_hold_reason_slno : 0)
    const [custAsset, setcustAsset] = useState(0)
    const [asset, setAsset] = useState({});
    const [openDropdown, setOpenDropdown] = useState(false);



    console.log("newlyAddedAssets", newlyAddedAssets);



    const handleDropdownToggle = () => {
        setOpenDropdown(!openDropdown); // Toggle dropdown on input click
    };

    const [transferData, setTransferData] = useState({
        am_item_map_slno: 0,
        item_name: '',
        department: '',
        dept_sec: '',
        custodian_dept: ''
    })

    const { am_item_map_slno, item_name, department, dept_sec, custodian_dept } = transferData


    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    useEffect(() => {
        dispatch(getDepartment())
    }, [dispatch])

    useEffect(() => {
        setcodept(complaint_deptslno);
    }, [complaint_deptslno]);

    const handleCheckboxChange = (value) => {
        setcodept(value);
    };

    const updatePendhold = useCallback((e) => {
        setPendhold(e.target.value)
    }, [])

    const updateAssetNo = useCallback((e) => {
        setAssetNo(e.target.value.toLocaleUpperCase())
    }, [])

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };



    const updateSelect = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setSelectEmployeeChk({ ...select, [e.target.name]: value })
    }

    const updateRectified = useCallback((e) => {
        if (e.target.checked === true) {
            setRectify(true)
            setPending(false)
        } else {
            setRectify(false)
        }
    }, [])

    const updateOnHold = useCallback((e) => {
        if (e.target.checked === true) {
            setPending(true)
            setRectify(false)
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
    }, [complaint_slno, count])





    const searchAssetNo = useCallback((e) => {
        if (cm_am_asset_no === '') {
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
                        const { item_name, sec_name, am_item_map_slno, item_asset_no_only, item_asset_no, item_custodian_dept, item_custodian_dept_sec } = data[0];
                        // Check if the asset already exists in the array
                        const assetExists = assetArray.some(asset => asset.item_asset_no_only === item_asset_no_only);
                        if (assetExists) {
                            infoNotify("You already added this asset in complaint");
                        } else {
                            const newAsset = { item_name, sec_name, am_item_map_slno, item_asset_no_only, item_asset_no, item_custodian_dept, item_custodian_dept_sec };
                            setAssetArray((prevArray) => [...prevArray, newAsset]);
                            setNewlyAddedAssets((prevAssets) => [...prevAssets, newAsset]);
                            setcm_am_asset_no('');
                            setassetData(0)
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
    }, [cm_am_asset_no, codept, assetArray,]);

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
                        const { item_name, sec_name, am_item_map_slno, item_asset_no_only, item_asset_no, item_custodian_dept, item_custodian_dept_sec } = data[0];
                        // Check if the asset already exists in the array
                        const assetExists = assetArray.some(asset => asset.item_asset_no_only === item_asset_no_only);
                        if (assetExists) {
                            infoNotify("You already added this asset in complaint");
                        } else {
                            const newAsset = { item_name, sec_name, am_item_map_slno, item_asset_no_only, item_asset_no, item_custodian_dept, item_custodian_dept_sec };

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
    }, [item_slno, codept, assetArray])

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

    const SearchAsset = useCallback((e) => {
        setSearch(1)
        setSelect(0)
        setSelectedAsset('')
    }, [])

    const SelectAsset = useCallback((e) => {
        setSelect(1)
        setSearch(0)
        setcm_am_asset_no('')
    }, [])

    const Close = useCallback(() => {
        setrectfyFlag(0)
        setrectfyOpen(false)
        setmarkAnAssetUnderCompFlag(0)
    }, [setrectfyFlag, setmarkAnAssetUnderCompFlag, setrectfyOpen])


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
            updatedFiles.splice(index, 1); // Remove the file at the specified index
            return updatedFiles;
        });
    };



    const servicefunctn = useCallback((val) => {
        const { am_item_map_slno, item_custodian_dept, item_custodian_dept_sec } = val

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
                        asset_item_service_user: id,
                        item_dept_slno: item_custodian_dept,
                        item_deptsec_slno: item_custodian_dept_sec,
                        am_item_map_slno: am_item_map_slno,
                    }

                    const ServiceUpdate = async (patchdata) => {
                        const result = await axioslogin.patch('/ItemMapDetails/AssetService', patchdata);
                        const { success, message } = result.data
                        if (success === 2) {
                            succesNotify(message)
                            setCount(count + 1)
                        } else {
                            warningNotify(message)
                            setCount(count + 1)
                        }
                    }
                    ServiceUpdate(patchdata)
                }
            };
            InsertAsset(InsertAssetx);
        }
        else {
            const patchdata = {
                asset_item_service_user: id,
                item_dept_slno: item_custodian_dept,
                item_deptsec_slno: item_custodian_dept_sec,
                am_item_map_slno: am_item_map_slno,
            }

            const ServiceUpdate = async (patchdata) => {
                const result = await axioslogin.patch('/ItemMapDetails/AssetService', patchdata);
                const { success, message } = result.data
                if (success === 2) {
                    succesNotify(message)
                    setCount(count + 1)
                } else {
                    warningNotify(message)
                    setCount(count + 1)
                }
            }
            ServiceUpdate(patchdata)
        }
    }, [id, setCount, count, newlyAddedAssets])




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
                }
                // return uploadResult.data;
            } catch (error) {
                console.error('An error occurred during file upload:', error);
            }
        };
        await InsertFile(selectFile, complaint_slno);
    }, [complaint_slno, selectFile, handleImageUpload]);





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

        if (Employee.length === 0) {
            infoNotify("Please Select Employees Worked UnderComplaint")
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
                                        // succesNotify("Complaint Updated Successfully")
                                        // setCount(count + 1);
                                        // reset()
                                        // Close()
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


    }, [patchData, count, Employee, cm_am_asset_no, assetStatus, updateAssetz, Close, assetinactive, deletedFiles,
        newlyAddedAssets, selectedAsset, setCount, inactiveEployee, filteredArray.length, reset])

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

    const refreshAssetTrans = useCallback(() => {
        setAsset({});
        setcustAsset(0)
    }, [])



    const patchDeptTransfer = useMemo(() => {
        return {
            item_dept_slno: em_department,
            item_deptsec_slno: complaint_dept_secslno,
            item_room_slno: roomNo !== 0 ? roomNo : null,
            item_subroom_slno: subRoomNo !== 0 ? subRoomNo : null,
            am_item_map_slno: custAsset
        }
    }, [em_department, complaint_dept_secslno, roomNo, subRoomNo, custAsset])






    // const updateDeptTransfer = useCallback(() => {
    //     const patchDeptTrans = async (patchDeptTransfer) => {
    //         const result = await axioslogin.patch('/assetDeptTransfer/transferDepartment', patchDeptTransfer)
    //         const { success, message } = result.data
    //         if (success === 1) {
    //             succesNotify("Asset Substituted Under Section")
    //             refreshAssetTrans()

    //         } else {
    //             warningNotify(message)
    //         }
    //     }
    //     if (em_department !== 0 && complaint_dept_secslno !== 0) {
    //         patchDeptTrans(patchDeptTransfer)
    //     } else {
    //         warningNotify("Select Transfering  Department and Department Section")
    //     }
    // }, [patchDeptTransfer, em_department, complaint_dept_secslno, refreshAssetTrans])

    const updateDeptTransfer = useCallback(() => {
        const patchDeptTrans = async (patchDeptTransfer) => {
            try {
                const result = await axioslogin.patch('/assetDeptTransfer/transferDepartment', patchDeptTransfer)
                const { success, message } = result.data
                if (success === 1) {
                    succesNotify("Asset Substituted Under Section")
                    refreshAssetTrans()
                } else {
                    errorNotify(message)
                }
            } catch (error) {
                errorNotify("An error occurred while updating the department transfer.", error)
            }
        }

        if (em_department !== 0 && complaint_dept_secslno !== 0 && custAsset !== 0) {
            patchDeptTrans(patchDeptTransfer)
        } else {
            warningNotify("Select Transferring Department and Department Section")
        }
    }, [patchDeptTransfer, em_department, complaint_dept_secslno, refreshAssetTrans])


    const markAnAssetUnderTicket = useCallback(() => {
        setmarkAnAssetUnderCompFlag(prevFlag => prevFlag === 1 ? 0 : 1);
    }, [])


    const AssetAddUnderSec = useCallback(() => {
        setaddAssetUnderSecFlag(prevFlag => prevFlag === 1 ? 0 : 1);
    }, [])




    return (
        <Box>
            {assetSpareFlag === 1 ?
                <AssetSpareModal
                    openSpare={assetSpareOpen}
                    setOpenSpare={setassetSpareOpen}
                    setassetSpareFlag={setassetSpareFlag}
                    assetSparedetails={assetSparedetails}
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
                            <Box sx={{ flex: 1, display: 'flex', bgcolor: '#ECEDEF', py: .5, px: .3, mt: 1 }}>
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
                                        {compalint_date}
                                    </Typography>
                                </Box>
                            </Box>

                        </Box>

                        <Box
                            sx={{
                                flexGrow: 1,
                                overflowY: 'auto',

                            }}
                        >
                            {/* <Typography sx={{ pl: .5, fontWeight: 600, color: 'Black', fontSize: 18 }}>Service Report</Typography> */}
                            <Box sx={{ pl: .5, pt: 1, display: 'flex', gap: .5 }} >

                                {markAnAssetUnderCompFlag === 1 ?
                                    (<CheckBoxOutlineBlankIcon sx={{ cursor: 'pointer', color: 'black', height: 30, width: 30 }} onClick={markAnAssetUnderTicket} />)
                                    :
                                    (<CheckBoxIcon sx={{ cursor: 'pointer', color: 'black', height: 30, width: 30 }} onClick={markAnAssetUnderTicket} />)
                                }
                                <Typography sx={{ fontWeight: 600, color: 'Black', fontSize: 16, pt: .4 }}>
                                    Mark an Asset Under the Ticket
                                </Typography>
                            </Box>
                            {markAnAssetUnderCompFlag === 0 ?
                                <>
                                    <Box sx={{
                                        flex: 1,
                                        display: 'flex',
                                        gap: 3, pt: 1, ml: 2
                                    }}>

                                        {/* <Typography sx={{ color: 'grey', fontWeight: 600, fontSize: 13, pt: .2, pl: 3 }}>
                                            Asset From :
                                        </Typography> */}
                                        {/* {complaint_deptslno === 1 ?
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={codept === 1}
                                                        onChange={() => handleCheckboxChange(1)}
                                                        color="neutral"
                                                        sx={{ mr: .5 }}
                                                        size='sm'

                                                    />

                                                }
                                                label="Biomedical"
                                            /> : null}
                                        {complaint_deptslno === 2 ?
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={codept === 2}
                                                        onChange={() => handleCheckboxChange(2)}
                                                        color="neutral"
                                                        sx={{ mr: .5 }}
                                                        size='sm'
                                                    />
                                                }
                                                label="Maintainance"
                                            /> : null}
                                        {complaint_deptslno === 3 ?
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={codept === 3}
                                                        onChange={() => handleCheckboxChange(3)}
                                                        color="neutral"
                                                        sx={{ mr: .5 }}
                                                        size='sm'
                                                    />
                                                }
                                                label="IT"
                                            /> : null}
                                        {complaint_deptslno === 4 ?
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={codept === 4}
                                                        onChange={() => handleCheckboxChange(4)}
                                                        color="neutral"
                                                        sx={{ mr: .5 }}
                                                        size='sm'
                                                    />
                                                }
                                                label="House Keeping"
                                            /> : null}
                                        {complaint_deptslno === 5 ?
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={codept === 5}
                                                        onChange={() => handleCheckboxChange(5)}
                                                        color="neutral"
                                                        sx={{ mr: .5 }}
                                                        size='sm'
                                                    />
                                                }
                                                label="Operations"
                                            /> : null} */}
                                    </Box>


                                    <Box sx={{ pt: .1, display: 'flex', ml: 3.8, pb: 1, }}>
                                        <Box
                                            sx={{
                                                cursor: 'pointer',
                                                display: 'flex', mx: .5, pt: .5
                                            }}
                                            onClick={SearchAsset}
                                        >
                                            {search === 1 ?
                                                (<CheckCircleOutlineIcon sx={{ cursor: 'pointer', color: '#394E6C' }} />)
                                                :
                                                (<RadioButtonUncheckedIcon sx={{ cursor: 'pointer', color: '#394E6C' }} />)
                                            }
                                            <Typography sx={{ pt: .2, color: 'black', fontWeight: 600, fontSize: 14 }}>
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
                                                (<CheckCircleOutlineIcon sx={{ cursor: 'pointer', color: '#394E6C' }} />)
                                                :
                                                (<RadioButtonUncheckedIcon sx={{ cursor: 'pointer', color: '#394E6C' }} />)
                                            }
                                            <Typography sx={{ pt: .2, color: 'black', fontWeight: 600, fontSize: 14 }}>
                                                Select
                                            </Typography>
                                        </Box>

                                        {select === 1 && (
                                            <Box sx={{ flex: 1, display: 'flex', ml: 1, mr: 5 }}>
                                                <CssVarsProvider>
                                                    <Box sx={{ flex: 1 }}>
                                                        <CmAssetList assetz={assetData} setAssetz={setassetData} complaint_dept_secslno={complaint_dept_secslno}
                                                            setSelectedAsset={setSelectedAsset} setItem_slno={setItem_slno} setasset_dept={setasset_dept} />
                                                    </Box>
                                                    <Box sx={{ ml: 1, }}>
                                                        <Tooltip title={'Add More Asset'}>
                                                            <Avatar size='sm' sx={{ bgcolor: 'lightgrey' }}>
                                                                <AddCircleIcon
                                                                    sx={{ p: .1, color: '#523A28', cursor: 'pointer', '&:hover': { color: '#34323E' }, height: 30, width: 30 }}
                                                                    onClick={searchAssetNoinMenu}
                                                                />
                                                            </Avatar>
                                                        </Tooltip>
                                                    </Box>
                                                </CssVarsProvider>
                                            </Box>
                                        )}

                                        {search === 1 && (
                                            <Box sx={{ flex: 1, display: 'flex', ml: 1, mr: 5 }}>
                                                <CssVarsProvider>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Input
                                                            placeholder=" Asset Number"
                                                            sx={{ borderRadius: 0, minHeight: 15 }}
                                                            type='number'
                                                            autoComplete='off'
                                                            startDecorator={
                                                                <Button variant="soft" color="neutral">
                                                                    {`TMC/${codept === 1 ? 'BME/' : codept === 2 ? 'MAIN/' : codept === 3 ? 'IT/' : codept === 4 ? 'HSK/' : codept === 5 ? 'OPE/' : ''}`}
                                                                </Button>
                                                            }
                                                            endDecorator={
                                                                <>
                                                                    {cm_am_asset_no !== '' ? (
                                                                        <Box
                                                                            sx={{ cursor: 'pointer', fontSize: 13, fontStyle: 'italic', mr: .3 }}
                                                                            onClick={ClearAssetSelection}
                                                                        >
                                                                            (Clear)
                                                                        </Box>
                                                                    ) : (
                                                                        <></>
                                                                    )}
                                                                </>
                                                            }
                                                            name='cm_am_asset_no'
                                                            value={cm_am_asset_no || ''}
                                                            onChange={UpdateAssetNo}
                                                        />
                                                    </Box>

                                                    <Box sx={{ ml: 1, }}>
                                                        <Tooltip title={'Add More Asset'}>
                                                            <Avatar size='sm' sx={{ bgcolor: 'lightgrey' }}>
                                                                <AddCircleIcon
                                                                    sx={{ p: .1, color: '#523A28', cursor: 'pointer', '&:hover': { color: '#34323E' }, height: 30, width: 30 }}
                                                                    onClick={searchAssetNo}
                                                                />
                                                            </Avatar>
                                                        </Tooltip>
                                                    </Box>
                                                </CssVarsProvider>
                                            </Box>
                                        )}
                                    </Box>
                                </> : null}

                            {assetArray.length !== 0 && (
                                <Box sx={{ flex: 1, mr: 4, ml: 4.8, mt: 1.5, display: 'flex', bgcolor: 'lightgrey' }}>
                                    <Box sx={{ flex: .8, textAlign: 'center', fontSize: 15, fontWeight: 600 }}>#</Box>
                                    <Box sx={{ flex: 2.5, fontSize: 14, fontWeight: 600 }}>Asset Number</Box>
                                    <Box sx={{ flex: 9, fontSize: 14, fontWeight: 600 }}>Asset Name</Box>
                                    <Box sx={{ flex: 3, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>Spare Change / Details</Box>
                                    <Box sx={{ flex: 1, textAlign: 'center', fontSize: 14, fontWeight: 600, pr: .5 }}>Service</Box>
                                    <Box sx={{ flex: 1, textAlign: 'center', fontSize: 14, fontWeight: 600, pr: .3 }}>Action</Box>
                                </Box>
                            )}

                            {assetArray.map((val, index) => {
                                const formattedSlno = val.item_asset_no_only.toString().padStart(6, '0');
                                return (
                                    <Box key={index} sx={{ flex: 1, mr: 4, ml: 4.8, display: 'flex', borderBottom: 1, borderColor: 'lightgrey', pt: .8 }}>
                                        <Box sx={{ flex: .8, textAlign: 'center', fontSize: 13 }}>{index + 1}</Box>
                                        <Box sx={{ flex: 2.5, fontSize: 13 }}>{val.item_asset_no}/{formattedSlno}</Box>
                                        <Box sx={{ flex: 9, fontSize: 13 }}>{val.item_name}</Box>
                                        <Box sx={{ flex: 3, textAlign: 'center', fontSize: 13, }}>
                                            <BuildIcon sx={{ color: '#488BA3', cursor: 'pointer', p: .3 }} onClick={() => AssetSpareDetailsview(val)} />
                                        </Box>
                                        <Box sx={{ flex: 1, textAlign: 'center', fontSize: 13, pr: .5, cursor: 'pointer' }}>
                                            {val.asset_item_service === 0 ?
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


                            <Box sx={{ pl: .4, pt: 2.5, display: 'flex', gap: .5 }}>
                                {addAssetUnderSecFlag === 1 ?
                                    (<CheckBoxOutlineBlankIcon sx={{ cursor: 'pointer', color: 'black', height: 30, width: 30 }} onClick={AssetAddUnderSec} />)
                                    :
                                    (<CheckBoxIcon sx={{ cursor: 'pointer', color: 'black', height: 30, width: 30 }} onClick={AssetAddUnderSec} />)
                                }
                                <Typography sx={{ fontWeight: 600, color: 'Black', fontSize: 16, pt: .5 }}>
                                    Substitute Asset Under the Section
                                </Typography>
                            </Box>
                            {/* <Input
                                placeholder="Select Asset "
                                sx={{
                                    borderRadius: 0,
                                    // minWidth: selectedAsset === '' ? 320 : 500,
                                    minHeight: 15,
                                }}
                                readOnly
                                endDecorator={
                                    <Dropdown>
                                        <MenuButton variant='plain' sx={{ p: 0 }}>
                                            <ArrowDropDownIcon sx={{ cursor: 'pointer', height: 25, width: 25 }} />
                                        </MenuButton>
                                        {assetArray.length !== 0 ?
                                            <Menu sx={{ maxWidth: 500, maxHeight: 370, overflow: 'auto', zIndex: 1400, }}>
                                                <MenuItem
                                                    sx={{ borderBottom: 1, borderColor: '#F0F3F5', fontSize: 14, fontStyle: 'italic' }}
                                                // onClick={handleClearSelection}
                                                >
                                                    (Clear Selected)
                                                </MenuItem>
                                                {assetArray.map((val, index) => (
                                                    <MenuItem
                                                        sx={{ borderBottom: 1, borderColor: '#F0F3F5' }}
                                                        key={index}
                                                    // onClick={() => handleAssetSelect(val)}
                                                    >
                                                        {val.item_name}({val.item_asset_no}/{val.item_asset_no_only.toString().padStart(6, '0')})
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
                            // disabled={cm_am_assetmap_slno !== ''}
                            /> */}
                            <Box sx={{ pl: 5, pr: 3.9, pt: 1, display: 'flex', gap: 1 }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ fontSize: 14, pl: .5 }}>
                                        Department section
                                    </Typography>
                                    <Input
                                        readOnly
                                        value={location}
                                    />

                                </Box>
                                <Box sx={{ flex: 1, mr: 1.1 }}>
                                    <Typography sx={{ fontSize: 14, pl: .5 }}>
                                        Location
                                    </Typography>
                                    <Input
                                        readOnly
                                        sx={{ fontSize: 14 }}
                                        value={rm_roomtype_name || rm_insidebuildblock_name || rm_floor_name ?
                                            ` ${rm_roomtype_name ? rm_roomtype_name : ''}${rm_roomtype_name && rm_insidebuildblock_name ? ' - ' : ''}${rm_insidebuildblock_name ? rm_insidebuildblock_name : ''}${(rm_insidebuildblock_name && rm_floor_name) ? ' - ' : ''}${rm_floor_name ? rm_floor_name : ''}`
                                            : "Not Updated"}
                                    />

                                </Box>
                                <Box sx={{ flex: 2.1 }}>
                                </Box>

                            </Box>

                            <Box sx={{ display: 'flex', pl: 5, pr: 3.9, pt: 1.5, gap: 1 }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ fontSize: 14, pl: .5 }}>
                                        Select Asset Under Service
                                    </Typography>
                                    <Input
                                        placeholder="Select Asset"
                                        readOnly
                                        onClick={handleDropdownToggle} // Trigger dropdown when clicking on Input
                                        endDecorator={
                                            <Dropdown open={openDropdown} onClose={() => setOpenDropdown(false)}> {/* Control dropdown visibility */}
                                                <MenuButton variant='plain' sx={{ p: 0 }}>
                                                    <ArrowDropDownIcon sx={{ cursor: 'pointer', height: 25, width: 25 }} />
                                                </MenuButton>
                                                {assetArray.length !== 0 ? (
                                                    <Menu sx={{ maxWidth: 500, maxHeight: 370, overflow: 'auto', zIndex: 1400 }}>
                                                        <MenuItem
                                                            sx={{ borderBottom: 1, borderColor: '#F0F3F5', fontSize: 14, fontStyle: 'italic' }}
                                                            onClick={() => setAsset({})} // Clear selection
                                                        >
                                                            (Clear)
                                                        </MenuItem>
                                                        {assetArray.map((val, index) => (
                                                            <MenuItem
                                                                sx={{ borderBottom: 1, borderColor: '#F0F3F5' }}
                                                                key={index}
                                                                onClick={() => setAsset(val)} // Update selection on click
                                                            >
                                                                {val.item_name} ({val.item_asset_no}/{val.item_asset_no_only.toString().padStart(6, '0')})
                                                            </MenuItem>
                                                        ))}
                                                    </Menu>
                                                ) : (
                                                    <Menu>
                                                        <MenuItem>No Asset Added Under Section</MenuItem>
                                                    </Menu>
                                                )}
                                            </Dropdown>
                                        }
                                        name='assetmap_slno'
                                        value={
                                            asset.item_name
                                                ? `${asset.item_asset_no}/${asset.item_asset_no_only.toString().padStart(6, '0')} - ${asset.item_name}`
                                                : ''
                                        }
                                    />

                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ fontSize: 14, pl: .5 }}>
                                        Substitute Asset
                                    </Typography>
                                    <AssetListUnderCustodian custAsset={custAsset} setcustAsset={setcustAsset} />
                                </Box>
                                <Box sx={{ pt: 3 }}>
                                    <Tooltip title={'Add More Asset'}>
                                        <Avatar size='sm' sx={{ bgcolor: 'lightgrey' }}>
                                            <AddCircleIcon
                                                sx={{ p: .1, color: '#523A28', cursor: 'pointer', '&:hover': { color: '#34323E' }, height: 30, width: 30 }}
                                                onClick={updateDeptTransfer}
                                            />
                                        </Avatar>
                                    </Tooltip>
                                </Box>
                            </Box>

                            {/* {addAssetUnderSecFlag === 0 ?
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ color: 'black', fontWeight: 600, fontSize: 13, pt: 1, pl: 5 }}>
                                        Asset Number :
                                    </Typography>

                                    <Box sx={{ flex: 1, display: 'flex', ml: 4.8 }}>
                                        <Box>
                                            <Input
                                                autoComplete="off"
                                                type="text"
                                                size="sm"
                                                name="assetNo"
                                                value={assetNo}
                                                onChange={updateAssetNo} />
                                        </Box>
                                        <Box sx={{ pl: 1, }}>
                                            <CusIconButton size="sm" variant="outlined" clickable="true" onClick={searchAssetForTrans} >
                                                <SearchOutlinedIcon fontSize='small' sx={{ color: '#41729F' }} />
                                            </CusIconButton>
                                        </Box>
                                        <Box sx={{ pl: .5 }}>
                                            <CusIconButton size="sm" variant="outlined" clickable="true"
                                                onClick={refreshAssetTrans}
                                            >
                                                <RefreshIcon fontSize='small' sx={{ color: '#41729F' }} />
                                            </CusIconButton>
                                        </Box>
                                    </Box>

                                    {serachFlag === 1 ?
                                        <Box sx={{ ml: 4.8, mr: 3 }}>
                                            <Box sx={{ flex: 1, display: 'flex', gap: 1, mr: 1, mt: 1 }}>
                                                <Box sx={{ flex: 1, }} >
                                                    <Typography sx={{ fontFamily: 'sans-serif', color: 'black', fontWeight: 600, fontSize: 13, pl: .5 }} >Department</Typography>
                                                    <Box>
                                                        <TextFieldCustom
                                                            type="text"
                                                            size="sm"
                                                            name="department"
                                                            value={department}
                                                            disabled={true}
                                                        ></TextFieldCustom>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ flex: 1, }} >
                                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', color: 'black', fontWeight: 600, fontSize: 13, pl: .5 }} >Department Section</Typography>
                                                    <Box>
                                                        <TextFieldCustom
                                                            type="text"
                                                            size="sm"
                                                            name="dept_sec"
                                                            value={dept_sec}
                                                            disabled={true}
                                                        ></TextFieldCustom>
                                                    </Box>
                                                </Box>                                <Box sx={{ flex: 1, }} >
                                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', color: 'black', fontWeight: 600, fontSize: 13, pl: .5 }} >Custodian Department</Typography>
                                                    <Box>
                                                        <TextFieldCustom
                                                            type="text"
                                                            size="sm"
                                                            name="custodian_dept"
                                                            value={custodian_dept}
                                                            disabled={true}
                                                        ></TextFieldCustom>
                                                    </Box>
                                                </Box>
                                            </Box>

                                            <Box sx={{ flex: 1, mt: 1, mr: 1 }} >
                                                <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', color: 'black', fontWeight: 600, fontSize: 13, pl: .5 }} >Asset Name</Typography>
                                                <Box>
                                                    <TextFieldCustom
                                                        type="text"
                                                        size="sm"
                                                        name="item_name"
                                                        value={item_name}
                                                        disabled={true}
                                                    ></TextFieldCustom>
                                                </Box>
                                            </Box>

                                            <Box sx={{
                                                display: 'flex',
                                                flex: 1, gap: 1, mr: 1, mt: 1
                                            }} >
                                                <Box sx={{ flex: 1 }} >
                                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', color: 'black', fontWeight: 600, fontSize: 13, pl: .5 }} >Transfer to Department</Typography>
                                                    <Box>
                                                        <AmDepartmentSelWOName
                                                            department={transDept}
                                                            setDepartment={setTransDept}
                                                        />
                                                    </Box>
                                                </Box>
                                                <Box sx={{ flex: 1 }} >
                                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', color: 'black', fontWeight: 600, fontSize: 13, pl: .5 }} > Transfer to Department Section</Typography>
                                                    <Box>
                                                        <AmDeptSecSelectWOName
                                                            deptsec={transDeptSec}
                                                            setDeptSec={setTransDeptSec}
                                                        />
                                                    </Box>
                                                </Box>
                                                <Box sx={{ flex: 1 }} >
                                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', color: 'black', fontWeight: 600, fontSize: 13, pl: .5 }} >Transfer to Room</Typography>
                                                    <Box>
                                                        <AmRoomSelWONameUDepSec
                                                            roomNo={roomNo}
                                                            setRoomNo={setRoomNo} />
                                                    </Box>
                                                </Box>
                                                <Box sx={{ flex: 1 }} >
                                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', color: 'black', fontWeight: 600, fontSize: 13, pl: .5 }} >Transfer to Sub Room</Typography>
                                                    <Box>
                                                        <AmSubRmSelWONamURoom
                                                            subRoomNo={subRoomNo}
                                                            setSubRoomNo={setSubRoomNo}
                                                        />
                                                    </Box>
                                                </Box>
                                                <Box sx={{ flex: .1, mt: 2.3 }}>
                                                    <CusIconButton size="sm" variant="outlined" clickable="true" color="primary"
                                                        onClick={updateDeptTransfer}
                                                    >
                                                        <LibraryAddIcon fontSize='small' />
                                                    </CusIconButton>
                                                </Box>
                                            </Box>
                                        </Box> : null}


                                </Box> : null} */}


                            <Box sx={{ pl: .4, pt: 2.5, display: 'flex', gap: .5 }}>
                                <CheckBoxIcon sx={{ cursor: 'pointer', color: 'black', height: 30, width: 30 }} />
                                <Typography sx={{ fontWeight: 600, color: 'Black', fontSize: 16, pt: .2 }}>
                                    Employees Worked Under Ticket
                                </Typography>
                            </Box>
                            <Box sx={{ flex: 1, pl: 4.8, pt: 1 }}>
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
                                pt: 2, gap: 3, mt: 2.5, pb: 1
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
                                <Box sx={{ mx: 2, my: 1 }}>
                                    <CmHoldReasonList holdReason={holdReason} setHoldReason={setHoldReason} />
                                </Box> : null}
                            <Box sx={{ mx: 2 }}>
                                <CustomTextarea
                                    style={{ width: "100%" }}
                                    minRows={3}
                                    placeholder="Remarks"
                                    onchange={updatePendhold}
                                    value={pendholdreason === null ? '' : pendholdreason}
                                />
                            </Box>
                            <Box sx={{ flex: 1, border: 1, borderRadius: 1, display: 'flex', borderColor: '#D3D3D3', mt: 1, mx: 2, mb: 3 }}>
                                <label htmlFor="file-input">
                                    <Box sx={{ display: 'flex', bgcolor: '#ECEFF7', '&:hover': { bgcolor: '#E1E8F0' }, m: 0.5, px: 0.5, borderRadius: 5, cursor: 'pointer' }}>
                                        <FileCopyIcon sx={{ p: 0.3, color: '#0B6BCB' }} />
                                        <Typography sx={{ color: '#0B6BCB', fontSize: 13, px: 0.3, pt: 0.3 }}>
                                            Attach File Under Ticket
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
                                    multiple
                                />
                                <Box sx={{ display: 'flex', flex: 1, mx: 0.5, mt: 0.5, overflow: 'auto' }}>
                                    {selectFile && selectFile.map((file, index) => (
                                        <Box key={index}>
                                            <CssVarsProvider>
                                                <Chip sx={{ bgcolor: '#BDC6D9', width: '100%', ml: 0.5 }}>
                                                    {file.name}
                                                    <CloseIcon
                                                        sx={{
                                                            pl: 0.3, pb: 0.3, height: 20, width: 20, cursor: 'pointer', color: '#4D0011',
                                                            '&:hover': { color: '#BA0F30' },
                                                        }}
                                                        onClick={() => handleRemoveFile(index)}
                                                    />
                                                </Chip>
                                            </CssVarsProvider>
                                        </Box>
                                    ))}
                                </Box>
                                <Box
                                    sx={{
                                        bgcolor: '#0B6BCB', '&:hover': { bgcolor: '#7391C8' }, my: 0.5, mr: 1, display: 'flex', pr: 1.5, pl: 0.5, pt: .3,
                                        borderRadius: 4, cursor: 'pointer',
                                    }}
                                    onClick={UploadFile}
                                >
                                    <UploadIcon sx={{ p: 0.1, color: 'white', height: 20, }} />
                                    <Typography sx={{ fontSize: 13, color: 'white', mt: 0.1 }}>
                                        Upload
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* Fixed Footer */}
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