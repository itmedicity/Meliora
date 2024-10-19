
import { Box, Paper, IconButton, Input, Tooltip, Typography } from '@mui/material'
import React, { useCallback, memo, useState, Fragment, useMemo, useEffect } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import { useHistory } from 'react-router-dom'
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
import CustomTextarea from 'src/views/Components/CustomTextarea'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { axioslogin } from 'src/views/Axios/Axios'
import { useDispatch, useSelector } from 'react-redux'
import { editicon } from 'src/color/Color'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { format } from 'date-fns'
import _ from 'underscore'
import imageCompression from 'browser-image-compression';
import CloseIcon from '@mui/icons-material/Close';
import AssetUOMSelect from 'src/views/CommonSelectCode/AssetUOMSelect'
import CrmEmergencySelect from 'src/views/CommonSelectCode/CrmEmergencySelect'
import { getUOM } from 'src/redux/actions/AmUOMList.action'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import CrfReqstTableView from './CrfReqstTableView'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ImageDisplayModal from './ImageDisplayModal'
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CustomBackDrop from 'src/views/Components/CustomBackDrop'
import { CssVarsProvider, Table, Textarea } from '@mui/joy'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
const CrfRequestMaster = () => {
    /*** Initializing */
    const history = useHistory();
    const dispatch = useDispatch();

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
    const [category, setCategory] = useState('')
    const updateCategory = useCallback((e) => {
        setCategory(e.target.value)
    }, [])
    //state for location
    const [location, setLocation] = useState('')
    const updateLocation = useCallback((e) => {
        setLocation(e.target.value)
    }, [])
    //state for Remarks
    const [remarks, setRemarks] = useState('')
    // const updateRemarks = useCallback((e) => {
    //     setRemarks(e.target.value)
    // }, [])
    // Intializing variables
    // const [dept, setdept] = useState(0)
    const [deptSec, setdeptSec] = useState(0)
    const [startdate, setStartdate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [count, setCount] = useState(0)
    const [edit, setEdit] = useState(0)
    const [reqSlno, setReqSlno] = useState(0)
    const [selectFile, setSelectFile] = useState([])
    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imageshow, setImageShow] = useState(false)
    const [imgFlag, setImgFlag] = useState(0)
    const [imagearray, setImageArry] = useState([])
    //Items store array
    const [emergency, setEmergency] = useState(false)
    const [emerType, setEmerType] = useState(0)
    const [detailDataDis, setDetailDataDis] = useState([])
    const [reqDetalSlno, setReqDetalSlno] = useState(0)
    const [authorizeDeptSec, setAuthorizDeptSec] = useState([])
    const [editIndex, setEditIndex] = useState(null);
    const [item_qty, setItem_qty] = useState(0)
    const [uom, setUOM] = useState(0)
    const [uomName, setUomName] = useState('')
    const [unitprice, setUnitPrice] = useState(0)
    const [approx_cost, setapprox_cost] = useState(0)
    const [levelOne, setLevelOne] = useState(0)
    const [levelTwo, setLevelTwo] = useState(0)
    const [deptType, setDeptType] = useState(0)
    const [open, setOpen] = useState(false)

    const updateEmergency = (e) => {
        if (e.target.checked === true) {
            setEmergency(true)
        } else {
            setEmergency(false)
        }
    }
    const updateExpectedDate = (e) => {
        setStartdate(e.target.value)
    }
    //Item details initialization
    const [item_desc, setItem_desc] = useState('')
    const [itemstate, setItemState] = useState({
        item_brand: '',
        item_spec: '',
    })
    //Destructuring
    const { item_brand, item_spec } = itemstate
    const updateItemState = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setItemState({ ...itemstate, [e.target.name]: value })
    }, [itemstate])
    //redux for geting login id
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const empdeptsec = useSelector((state) => state.LoginUserData.empsecid, _.isEqual)
    const deptsecName = useSelector((state) => state.LoginUserData.empdeptsec, _.isEqual)

    const OnchangeQty = useCallback((e) => {
        setItem_qty(e.target.value)
        if (unitprice !== '' || unitprice !== 0) {
            setapprox_cost(unitprice * e.target.value)
        }
    }, [unitprice])

    const onChangeItem = useCallback((e) => {
        setItem_desc(e.target.value)
    }, [])

    const updateUnitPrice = useCallback((e) => {
        if (item_qty !== 0) {
            setUnitPrice(e.target.value)
            setapprox_cost(item_qty * e.target.value)
        }
        else {
            warningNotify("Please Enter quantity before enter unit price")
        }
    }, [item_qty])

    useEffect(() => {
        dispatch(getUOM())
        const InchHodDeptsec = async (deptSec) => {
            const result = await axioslogin.get(`/newCRFRegister/InHodExist/${deptSec}`)
            const { success, data } = result.data
            if (success === 1) {
                const { level_one, level_two, dept_type } = data[0]
                setLevelOne(level_one)
                setLevelTwo(level_two)
                setDeptType(dept_type)
            }
            else {
                setLevelOne(0)
                setLevelTwo(0)
                setDeptType(0)
            }
        }
        const DeptsecBasedOnAssign = async (id) => {
            const result = await axioslogin.get(`/InchHODAuthorization/getDeptSeconId/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                setAuthorizDeptSec(data)
            }
            else {
                setAuthorizDeptSec([])
                setdeptSec(empdeptsec)
            }
        }
        InchHodDeptsec(deptSec)
        DeptsecBasedOnAssign(id)
    }, [dispatch, deptSec, id, count, empdeptsec])

    const AddItem = useCallback(() => {
        if (item_desc !== '' && item_qty > 0 && unitprice >= 0) {
            const newdata = {
                item_desc: item_desc,
                item_brand: item_brand,
                item_qty: parseInt(item_qty),
                item_unit: uom,
                uomName: uomName,
                item_spec: item_spec,
                item_unitprice: unitprice,
                approx_cost: parseInt(approx_cost),
                req_detl_slno: reqDetalSlno,
            }
            if (edit === 0) {
                const isDuplicate = detailDataDis?.some(
                    (val, index) => val.item_desc === item_desc && index !== editIndex
                );
                if (isDuplicate) {
                    warningNotify("Item Details Already Exists!");
                    return;
                }
                if (editIndex !== null) {
                    const updatedData = detailDataDis.map((val, index) =>
                        index === editIndex ? newdata : val
                    );
                    const datas = updatedData?.map((val, index) => {
                        const obj = {
                            item_slno: index + 1,
                            item_brand: val.item_brand,
                            item_desc: val.item_desc,
                            item_qty: val.item_qty,
                            item_spec: val.item_spec,
                            item_unit: val.item_unit,
                            item_unitprice: val.item_unitprice,
                            uomName: val.uomName,
                            approx_cost: val.approx_cost,
                            req_detl_slno: val.req_detl_slno
                        }
                        return obj
                    })
                    setDetailDataDis(datas);
                    setEditIndex(null);
                } else {
                    const newArray = [...detailDataDis, newdata]
                    const datas = newArray?.map((val, index) => {
                        const obj = {
                            item_slno: index + 1,
                            item_brand: val.item_brand,
                            item_desc: val.item_desc,
                            item_qty: val.item_qty,
                            item_spec: val.item_spec,
                            item_unit: val.item_unit,
                            item_unitprice: val.item_unitprice,
                            uomName: val.uomName,
                            approx_cost: val.approx_cost,
                            req_detl_slno: val.req_detl_slno
                        }
                        return obj
                    })
                    setDetailDataDis(datas);
                }
                const resetarrray = {
                    item_brand: '',
                    item_spec: ''
                }
                setItem_qty(0)
                setItem_desc('')
                setItemState(resetarrray)
                setUnitPrice(0)
                setapprox_cost(0)
                setUOM(0)
                setReqDetalSlno(0)
            }
            // When edit saved details
            else {
                const isDuplicate = detailDataDis?.some(
                    (val, index) => val.item_desc === item_desc && index !== editIndex
                );
                if (isDuplicate) {
                    warningNotify("Item Details Already Exists!");
                    return;
                }
                if (editIndex !== null) {
                    const updatedData = detailDataDis.map((val, index) =>
                        index === editIndex ? newdata : val
                    );
                    const datas = updatedData?.map((val, index) => {
                        const obj = {
                            item_slno: index + 1,
                            item_brand: val.item_brand,
                            item_desc: val.item_desc,
                            item_qty: val.item_qty,
                            item_spec: val.item_spec,
                            item_unit: val.item_unit,
                            item_unitprice: val.item_unitprice,
                            uomName: val.uomName,
                            approx_cost: val.approx_cost,
                            req_detl_slno: val.req_detl_slno
                        }
                        return obj
                    })
                    setDetailDataDis(datas);
                    setEditIndex(null);
                } else {
                    const newArray = [...detailDataDis, newdata]
                    const datas = newArray?.map((val, index) => {
                        const obj = {
                            item_slno: index + 1,
                            item_brand: val.item_brand,
                            item_desc: val.item_desc,
                            item_qty: val.item_qty,
                            item_spec: val.item_spec,
                            item_unit: val.item_unit,
                            item_unitprice: val.item_unitprice,
                            uomName: val.uomName,
                            approx_cost: val.approx_cost,
                            req_detl_slno: val.req_detl_slno
                        }
                        return obj
                    })
                    setDetailDataDis(datas);
                }
                const resetarrray = {
                    item_brand: '',
                    item_spec: ''
                }
                setItem_qty(0)
                setItem_desc('')
                setItemState(resetarrray)
                setUnitPrice(0)
                setapprox_cost(0)
                setUOM(0)
                setReqDetalSlno(0)
            }
        }
        else {
            warningNotify("Item Description and Quantity are mandatory and Quantity and unit price are not negative")
        }
    }, [edit, item_desc, item_brand, item_qty, uom, uomName, item_spec, unitprice, approx_cost, editIndex,
        reqDetalSlno, detailDataDis])

    const editSelect = useCallback((val, index) => {
        const { req_detl_slno, item_desc, item_brand, item_unit, item_qty, item_spec, approx_cost, item_unitprice } = val
        setItem_desc(item_desc)

        const editData = {
            item_brand: item_brand,
            item_spec: item_spec
        }
        setItem_qty(item_qty)
        setItemState(editData)
        setUnitPrice(item_unitprice)
        setapprox_cost(approx_cost)
        setUOM(item_unit)
        setReqDetalSlno(req_detl_slno)
        setEditIndex(index);
    }, [])

    const deleteSelect = useCallback((val) => {
        if (detailDataDis.length !== 0) {
            if (edit === 1) {
                const { req_detl_slno } = val
                const deleteData = {
                    // item_slno: Math.ceil(Math.random() * 1000),
                    item_slno: 0,
                    delete_user: id,
                    req_slno: reqSlno,
                    req_detl_slno: req_detl_slno
                }
                const deleteItemDetails = async (deleteData) => {
                    const result = await axioslogin.patch('/newCRFRegister/deleteItemList', deleteData);
                    return result.data
                }
                deleteItemDetails(deleteData).then((val) => {
                    const { success } = val
                    if (success === 1) {
                        succesNotify("Selected Record Deleted")
                    } else {

                    }
                })
            } else {

            }
            const array = detailDataDis?.filter((value) => value.item_slno !== val.item_slno)
            setDetailDataDis(array)
        }
    }, [detailDataDis, edit, reqSlno, id])

    const uploadFile = useCallback(async (e) => {
        if (e.target.files[0].type === "application/pdf" ||
            e.target.files[0].type === "image/png" ||
            e.target.files[0].type === "image/jpeg" ||
            e.target.files[0].type === "image/jpg"

        ) {
            if ((e.target.files[0].size) > 26214400) {
                warningNotify("File Size Is to Large")
            } else {
                const newFiles = [...selectFile]
                newFiles.push(e.target.files[0])
                setSelectFile(newFiles)
            }

        } else {
            warningNotify("Only .png, .jpeg, and .pdf File format allowed!")
        }

    }, [selectFile, setSelectFile])

    const handleImageUpload = useCallback(async (imageFile) => {
        const options = {
            maxSizeMB: 25,
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

    const ViewImage = useCallback(() => {
        setImageShowFlag(1)
        setImageShow(true)
    }, [])

    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])

    const reqDataPost = useMemo(() => {
        return {
            //     request_dept_slno: dept,
            request_deptsec_slno: deptSec,
            actual_requirement: actual_require !== '' ? actual_require : null,
            needed: needed !== '' ? needed : null,
            category: category !== '' ? category : null,
            location: location !== '' ? location : null,
            expected_date: format(new Date(startdate), 'yyyy-MM-dd 23:59:59'),
            emergency_flag: emergency === true ? 1 : 0,
            emer_slno: emerType !== 0 ? emerType : null,
            emergeny_remarks: remarks !== '' ? remarks : null,
            // total_approx_cost: totalApproxCost,
            user_deptsec: empdeptsec,
            create_user: id
        }

    }, [deptSec, actual_require, needed, category, location, startdate,
        emergency, remarks, empdeptsec, id, emerType])


    const reqDataPatch = useMemo(() => {
        return {
            //  request_dept_slno: dept,
            request_deptsec_slno: deptSec,
            actual_requirement: actual_require !== '' ? actual_require : null,
            needed: needed !== '' ? needed : null,
            category: category !== '' ? category : null,
            location: location !== '' ? location : null,
            expected_date: format(new Date(startdate), 'yyyy-MM-dd 23:59:59'),
            emergency_flag: emergency === true ? 1 : 0,
            emer_slno: emerType !== 0 ? emerType : null,
            emergeny_remarks: remarks !== '' ? remarks : null,
            // total_approx_cost: totalApproxCost,
            user_deptsec: empdeptsec,
            edit_user: id,
            req_slno: reqSlno
        }

    }, [deptSec, actual_require, needed, category, location, startdate,
        emergency, remarks, empdeptsec, id, emerType, reqSlno])

    //* Reset function
    const reset = useCallback(() => {
        setActual_require('')
        setNeeded('')
        setCategory('')
        setLocation('')
        setRemarks('')
        setdeptSec(0)
        setStartdate(format(new Date(), "yyyy-MM-dd"))
        setCount(0)
        setEdit(0)
        setReqSlno(0)
        setSelectFile([])
        setImageShowFlag(0)
        setImageShow(false)
        setImgFlag(0)
        setImageArry([])
        setDetailDataDis([])
        setEmergency(false)
        setEmerType(0)
        const resetdata = {
            item_brand: '',
            item_spec: ''
        }
        setItem_qty(0)
        setItemState(resetdata)
        setItem_desc('')
        setUOM(0)
        setUomName('')
        setUnitPrice(0)
        setapprox_cost(0)
        setLevelOne(0)
        setLevelTwo(0)
        setDeptType(0)
    }, [])

    const submitRequest = useCallback((e) => {
        if (detailDataDis.length !== 0) {
            e.preventDefault();

            /**** insert function for Request Register  */
            const ReqMasterInsert = async (reqDataPost) => {
                const result = await axioslogin.post('/newCRFRegister/InsertRegMast', reqDataPost);
                return result.data
            }

            /**** insert function for Request Approval*/
            const ReqApprovalInsert = async (insertid) => {
                const approvalData = {
                    req_slno: insertid,
                    incharge_req: levelOne === 1 ? 1 : 0,
                    incharge_approve: levelOne === 1 ? null : 1,
                    hod_req: levelTwo === 1 ? 1 : 0,
                    dms_req: deptType === 1 ? 1 : 0,
                    ms_approve_req: deptType === 1 ? 1 : 0,
                    manag_operation_req: 1,
                    senior_manage_req: 1,
                    gm_approve_req: 1,
                    ed_approve_req: 1,
                    md_approve_req: 1
                }
                const result = await axioslogin.post('/newCRFRegister/postReqApproval', approvalData);
                return result.data
            }

            //** Inset api for detail */
            const ReqDetailInsert = async (insertid) => {
                const postdataDetl = detailDataDis && detailDataDis.map((val) => {
                    return {
                        req_slno: insertid,
                        item_slno: val.item_slno,
                        item_desc: val.item_desc,
                        approve_item_desc: val.item_desc,
                        item_brand: val.item_brand,
                        approve_item_brand: val.item_brand,
                        item_unit: val.item_unit,
                        approve_item_unit: val.item_unit,
                        item_qnty: val.item_qty,
                        item_qnty_approved: val.item_qty,
                        item_specification: val.item_spec,
                        approve_item_specification: val.item_spec,
                        item_unit_price: val.item_unitprice,
                        approve_item_unit_price: val.item_unitprice,
                        aprox_cost: val.approx_cost,
                        approve_aprox_cost: val.approx_cost,
                        item_status: 1,
                        item_status_approved: 1,
                        approve_item_status: 1,
                        create_user: id
                    }
                })
                const result = await axioslogin.post('/newCRFRegister/postDetails', postdataDetl);
                return result.data
            }

            const itemNot = detailDataDis?.filter((val) => val.req_detl_slno === 0)
            const itemUpdate = detailDataDis?.filter((val) => val.req_detl_slno !== 0)

            const FileInsert = async (selectFile, insetid) => {
                try {
                    const formData = new FormData();
                    formData.append('id', insetid);
                    for (const file of selectFile) {
                        if (file.type.startsWith('image')) {
                            const compressedFile = await handleImageUpload(file);
                            formData.append('files', compressedFile, compressedFile.name);
                        } else {
                            formData.append('files', file, file.name);
                        }
                    }
                    // Use the Axios instance and endpoint that matches your server setup
                    const result = await axioslogin.post('/newCRFRegisterImages/InsertRegisterImage', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    return result.data
                } catch (error) {
                    warningNotify('An error occurred during file upload.');

                }
            }
            /**** insert function for Request Register  */
            const ReqMasterUpdate = async (reqDataPatch) => {
                const result = await axioslogin.patch('/newCRFRegister/UpdateReqMaster', reqDataPatch);
                return result.data
            }
            //** Call insert and detail api by using then. for getting insert id */

            if (edit === 0) {
                if (item_desc === '' && item_brand === '' && item_qty === 0 && uom === 0
                    && item_spec === '' && unitprice === 0 && approx_cost === 0) {

                    if ((emergency === true && emerType !== 0 && remarks !== '') || (emergency === false)) {
                        if (deptSec !== 0 && (category !== '' || needed !== '' || actual_require !== '' || location !== '')) {
                            setOpen(true)
                            ReqMasterInsert(reqDataPost).then((value) => {
                                const { success, message, insertid } = value
                                if (success === 1) {
                                    // setReqSlno(insertid)
                                    ReqApprovalInsert(insertid).then((val) => {
                                        const { success, message } = val
                                        if (success === 1) {
                                            if (detailDataDis.length !== 0) {
                                                ReqDetailInsert(insertid).then((values) => {
                                                    const { success, message } = values
                                                    if (success === 1) {
                                                        if (selectFile.length !== 0) {
                                                            FileInsert(selectFile, insertid).then((val) => {
                                                                const { success, message } = val
                                                                if (success === 1) {
                                                                    setOpen(false)
                                                                    succesNotify("Request Registred successfully and also File uploaded")
                                                                    reset()
                                                                    setCount(count + 1)
                                                                } else {
                                                                    warningNotify(message)
                                                                }
                                                            })
                                                        } else {
                                                            setOpen(false)
                                                            succesNotify("Request Registred successfully ")
                                                            reset()
                                                            setCount(count + 1)
                                                        }
                                                    } else {
                                                        setOpen(false)
                                                        warningNotify(message)
                                                    }
                                                })
                                            } else {
                                                if (selectFile.length !== 0) {
                                                    FileInsert(selectFile, insertid).then((val) => {
                                                        const { success, message } = val
                                                        if (success === 1) {
                                                            setOpen(false)
                                                            succesNotify("Request Registred successfully and also File uploaded")
                                                            reset()
                                                            setCount(count + 1)
                                                        } else {
                                                            setOpen(false)
                                                            warningNotify(message)
                                                        }
                                                    })
                                                } else {
                                                    setOpen(false)
                                                    succesNotify("Request Registred successfully ")
                                                    reset()
                                                    setCount(count + 1)
                                                }
                                            }
                                        } else {
                                            setOpen(false)
                                            warningNotify(message)
                                        }
                                    })
                                } else {
                                    setOpen(false)
                                    warningNotify(message)
                                }
                            })
                        } else {
                            setOpen(false)
                            warningNotify("Please select Department and Department Section")
                        }
                    } else {
                        setOpen(false)
                        warningNotify("If Emergeny please mention emergenct Type and Remarks")
                    }

                } else {
                    setOpen(false)
                    warningNotify("Are you want to save items please add items first then click Save Button")

                }
            } else {
                if ((emergency === true && emerType !== 0 && remarks !== '') || (emergency === false)) {
                    if (deptSec !== 0 && (category !== '' || needed !== '' || actual_require !== '' || location !== '')) {
                        setOpen(true)
                        ReqMasterUpdate(reqDataPatch).then((val) => {
                            const { success, message } = val
                            if (success === 2) {
                                if (itemNot.length !== 0) {
                                    const newItem = itemNot?.map((val) => {
                                        return {
                                            req_slno: reqSlno,
                                            item_slno: val.item_slno,
                                            item_desc: val.item_desc,
                                            item_brand: val.item_brand,
                                            item_unit: val.item_unit,
                                            item_qnty: val.item_qty,
                                            item_specification: val.item_spec,
                                            item_unit_price: val.item_unitprice,
                                            aprox_cost: val.approx_cost,
                                            approve_item_desc: val.item_desc,
                                            approve_item_brand: val.item_brand,
                                            approve_item_unit: val.item_unit,
                                            item_qnty_approved: val.item_qty,
                                            approve_item_specification: val.item_spec,
                                            approve_item_unit_price: val.item_unitprice,
                                            approve_aprox_cost: val.approx_cost,
                                            item_status: 1,
                                            item_status_approved: 1,
                                            approve_item_status: 1,
                                            create_user: id
                                        }
                                    })
                                    const insertNewItems = async (newItem) => {
                                        const result = await axioslogin.post('/newCRFRegister/postDetails', newItem)
                                        const { success } = result.data
                                        if (success === 1) {
                                        }
                                    }
                                    insertNewItems(newItem)
                                }

                                if (itemUpdate.length !== 0) {
                                    const updateItem = itemUpdate?.map((val) => {
                                        return {
                                            item_slno: val.item_slno,
                                            item_desc: val.item_desc,
                                            item_brand: val.item_brand,
                                            item_unit: val.item_unit,
                                            item_qnty: val.item_qty,
                                            item_specification: val.item_spec,
                                            item_unit_price: val.item_unitprice,
                                            aprox_cost: val.approx_cost,
                                            approve_item_desc: val.item_desc,
                                            approve_item_brand: val.item_brand,
                                            approve_item_unit: val.item_unit,
                                            item_qnty_approved: val.item_qty,
                                            approve_item_specification: val.item_spec,
                                            approve_item_unit_price: val.item_unitprice,
                                            approve_aprox_cost: val.approx_cost,
                                            edit_user: id,
                                            delete_user: null,
                                            item_status: 1,
                                            approve_item_status: 1,
                                            req_detl_slno: val.req_detl_slno,
                                            req_slno: reqSlno
                                        }
                                    })
                                    const updateItems = async (updateItem) => {
                                        const result = await axioslogin.post('/newCRFRegister/editItemList', updateItem)
                                        const { success } = result.data
                                        if (success === 1) {
                                        }
                                    }
                                    updateItems(updateItem)
                                }
                                if (selectFile.length !== 0) {
                                    FileInsert(selectFile, reqSlno).then((val) => {
                                        const { success, message } = val
                                        if (success === 1) {
                                            setOpen(false)
                                            succesNotify("Request Updated successfully and also File uploaded")
                                            reset()
                                            setCount(count + 1)
                                        } else {
                                            setOpen(false)
                                            warningNotify(message)
                                        }
                                    })
                                } else {
                                    setOpen(false)
                                    succesNotify("Request Updated successfully ")
                                    reset()
                                    setCount(count + 1)
                                }
                            }
                            else {
                                setOpen(false)
                                warningNotify(message)
                            }
                        })
                    } else {
                        setOpen(false)
                        warningNotify("Please select Department and Department Section")
                    }
                } else {
                    setOpen(false)
                    warningNotify("If Emergeny please mention emergenct Type and Remarks")
                }
            }
        }
        else {
            setOpen(false)
            infoNotify("Add Item Details Before Save Details ")
        }
    }, [edit, emergency, emerType, remarks, deptSec, reqDataPost, selectFile, detailDataDis, levelOne,
        levelTwo, deptType, setCount, count, id, handleImageUpload, reset, reqDataPatch, reqSlno, item_desc,
        item_brand, item_qty, uom, item_spec, unitprice, approx_cost, actual_require, needed, category, location
    ])

    //Data set for edit
    const rowSelect = useCallback((val) => {
        setEdit(1);
        const { req_slno, actual_requirement, location, category, image_status,
            needed, request_deptsec_slno, expected_date, emergency_flag,
            emer_slno, emergeny_remarks
        } = val

        setActual_require(actual_requirement === null ? '' : actual_requirement)
        setNeeded(needed === null ? '' : needed)
        setCategory(category)
        setLocation(location)
        setRemarks(emergeny_remarks)
        // setdept(request_dept_slno)
        setdeptSec(request_deptsec_slno)
        setStartdate(format(new Date(expected_date), "yyyy-MM-dd"))
        setReqSlno(req_slno)
        setImgFlag(image_status)
        setEmergency(emergency_flag === 1 ? true : false)
        setEmerType(emer_slno)
        setDetailDataDis([])
        setImageShowFlag(0)
        setImageShow(false)
        setImageArry([])
        setItem_desc('')
        const resetdata = {
            item_brand: '',
            item_spec: ''
        }
        setItem_qty(0)
        setItemState(resetdata)
        setUOM(0)
        setUomName('')
        setUnitPrice(0)
        setapprox_cost(0)
        setLevelOne(0)
        setLevelTwo(0)
        setDeptType(0)
        setCategory(category)
        setReqSlno(req_slno)

        const InsertFun = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegister/getDetailItemList/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const datas = data?.map((val) => {
                    const obj = {
                        item_slno: val.item_slno,
                        item_desc: val.item_desc,
                        item_brand: val.item_brand,
                        item_qty: val.item_qnty,
                        item_unit: val.item_unit,
                        item_spec: val.item_specification,
                        item_unitprice: val.item_unit_price,
                        uomName: val.uom_name,
                        approx_cost: val.aprox_cost,
                        req_detl_slno: val.req_detl_slno
                    }
                    return obj
                })
                setDetailDataDis(datas);
            }
            else {

            }
        }

        const getImage = async (req_slno) => {
            const result = await axioslogin.get(`/CrfImageUpload/crfRegimageGet/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                });
                setImageArry(fileUrls);
            }
        }
        InsertFun(req_slno)
        getImage(req_slno)
    }, [])

    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])

    //fn for entire state referesh
    const refreshWindow = useCallback(() => {
        reset()
    }, [reset])

    return (
        <Fragment>
            <CustomBackDrop open={open} text="Please Wait" />
            <Box sx={{ height: window.innerHeight - 220 }}>
                <CardMaster
                    title="Common Request Form"
                    submit={submitRequest}
                    close={backtoSetting}
                    refresh={refreshWindow}
                >
                    {imageshowFlag === 1 ? <ImageDisplayModal open={imageshow} handleClose={handleClose}
                        images={imagearray} /> : null}
                    <Box sx={{ width: "100%" }}>

                        {/* 1st row */}
                        <Paper sx={{
                            width: '100%', mt: 0.8
                        }} variant='outlined'>
                            <Box sx={{
                                width: "100%", display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', }
                            }}>
                                <Box sx={{
                                    width: "100%", display: "flex", flexDirection: "column"
                                }}>
                                    <CustomPaperTitle heading="Requested Department Details" />
                                    <Box sx={{
                                        width: "100%", p: 1, display: "flex", flexDirection: 'row'
                                    }}>
                                        {authorizeDeptSec.length !== 0 ?
                                            <Box sx={{
                                                width: "100%", pr: 1
                                            }}>
                                                <FormControl fullWidth size="small"  >
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={deptSec}
                                                        onChange={(e) => setdeptSec(e.target.value)}
                                                        size="small"
                                                        fullWidth
                                                        variant='outlined'
                                                        sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                                                    >
                                                        <MenuItem value={0} disabled >Select Department Section</MenuItem>
                                                        {
                                                            authorizeDeptSec && authorizeDeptSec.map((val, index) => {
                                                                return <MenuItem key={index} value={val.dept_section}>{val.auth_deptsec}</MenuItem>
                                                            })
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Box> :
                                            <Box sx={{
                                                width: "100%", pr: 1
                                            }}>
                                                <TextFieldCustom
                                                    type="text"
                                                    size="sm"
                                                    name="deptsecName"
                                                    value={deptsecName}
                                                    disabled={true}
                                                />
                                            </Box>
                                        }

                                    </Box>
                                </Box>
                                <Box sx={{
                                    width: "60%", display: "flex", flexDirection: "column"
                                }}>
                                    <CustomPaperTitle heading="Category" />
                                    <TextFieldCustom
                                        type="text"
                                        size="sm"
                                        name="category"
                                        value={category}
                                        onchange={updateCategory}
                                    />
                                </Box>
                                <Box sx={{
                                    width: "100%", display: "flex", flexDirection: "column", pl: 1, pr: 1
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

                        {/* 2nd Row */}
                        <Paper sx={{
                            width: '100%', mt: 0.8
                        }} variant='outlined'>

                            <Box sx={{
                                width: "100%", display: "flex", flexDirection: "column"
                            }}>
                                <CustomPaperTitle heading="Estimate/Approximate/Requirement Details" />
                                <Box sx={{
                                    width: "100%", p: 1, display: "flex", flexDirection: 'row'
                                }}>
                                    <Box sx={{
                                        width: "55%", display: "flex", pr: 1, flexDirection: "column"
                                    }}>
                                        <CustomPaperTitle heading="Item Description" mandtry={1} />
                                        <TextFieldCustom
                                            type="text"
                                            size="sm"
                                            name="item_desc"
                                            value={item_desc}
                                            onchange={onChangeItem}
                                        />
                                    </Box>

                                    <Box sx={{
                                        width: "45%", display: "flex", flexDirection: "column",
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
                                        width: "7%", display: "flex", flexDirection: "column",
                                        pr: 1
                                    }}>
                                        <CustomPaperTitle heading="Quantity" mandtry={1} />
                                        <TextFieldCustom
                                            type="number"
                                            size="sm"
                                            name="item_qty"
                                            value={item_qty}
                                            onchange={OnchangeQty}
                                        />
                                    </Box>
                                    <Box sx={{
                                        width: "13%", display: "flex", flexDirection: "column",
                                        pr: 1
                                    }}>
                                        <CustomPaperTitle heading="Unit" />
                                        {/* <TextFieldCustom
                                            type="text"
                                            size="sm"
                                            name="item_unit"
                                            value={item_unit}
                                            onchange={updateItemState}
                                        /> */}
                                        <AssetUOMSelect
                                            uom={uom}
                                            setUOM={setUOM}
                                            setName={setUomName}
                                            uomName={uomName} />
                                    </Box>
                                    <Box sx={{
                                        width: "60%", display: "flex", flexDirection: "column",
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
                                        width: "13%", display: "flex", flexDirection: "column",
                                        pr: 1
                                    }}>

                                        <CustomPaperTitle heading="Unit Price" />
                                        <TextFieldCustom
                                            type="number"
                                            size="sm"
                                            name="unitprice"
                                            value={unitprice}
                                            onchange={updateUnitPrice}
                                        />

                                    </Box>
                                    <Box sx={{
                                        width: "7%", display: "flex", flexDirection: "column",
                                        pr: 1
                                    }}>
                                        <CustomPaperTitle heading="Approx.Cost" />
                                        <TextFieldCustom
                                            type="number"
                                            size="sm"
                                            name="approx_cost"
                                            value={approx_cost}
                                            disabled={true}
                                        />
                                    </Box>
                                    <Box sx={{
                                        width: "7%",
                                        pt: 2
                                    }}>
                                        <Tooltip title="Add Item" placement='bottom'>
                                            <IconButton variant="outlined" color="primary" onClick={AddItem}>
                                                <MdOutlineAddCircleOutline size={30} />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Box>
                            </Box>
                            {detailDataDis.length !== 0 ?
                                <Box variant="outlined" sx={{ maxHeight: '50vh', overflow: 'auto', '&::-webkit-scrollbar': { height: 8 } }}>
                                    <CssVarsProvider>
                                        <Table aria-label="table with sticky header" padding={"none"} stickyHeader size='sm' stickyFooter>
                                            <thead style={{ alignItems: 'center' }}>
                                                <tr style={{ height: 0.5 }}>
                                                    <th size='sm' style={{ width: 60, fontSize: 14, textAlign: 'center' }}>&nbsp; Sl.No</th>
                                                    <th size='sm' style={{ width: 150, fontSize: 14 }}>&nbsp;Description</th>
                                                    <th size='sm' style={{ width: 100, fontSize: 14 }}>&nbsp;Brand</th>
                                                    <th size='sm' style={{ width: 100, fontSize: 14, textAlign: 'center' }}>&nbsp;Quantity</th>
                                                    <th size='sm' style={{ width: 80, fontSize: 14, textAlign: 'center' }}>&nbsp;Unit </th>
                                                    <th size='sm' style={{ width: 200, fontSize: 14 }}>&nbsp;Specification</th>
                                                    <th size='sm' style={{ width: 100, fontSize: 14, textAlign: 'center' }}>&nbsp;Unit Price</th>
                                                    <th size='sm' style={{ width: 100, fontSize: 14, textAlign: 'center' }}>&nbsp;Approximate Cost</th>
                                                    <th size='sm' style={{ width: 30, }}></th>
                                                    <th size='sm' style={{ width: 30, }}></th>
                                                </tr>
                                            </thead>
                                            <tbody size='small'>
                                                {detailDataDis?.map((val, index) => (
                                                    <tr key={index} size='small' style={{ maxHeight: 2, cursor: 'pointer' }}>
                                                        <td size='sm' style={{ fontSize: 12, textAlign: 'center' }}>{index + 1}</td>
                                                        <td size='sm' style={{ fontSize: 12, }}>&nbsp;{val.item_desc}</td>
                                                        <td size='sm' style={{ fontSize: 12, }}>&nbsp;{val.item_brand}</td>
                                                        <td size='sm' style={{ fontSize: 12, textAlign: 'center' }}>&nbsp;{val.item_qty}</td>
                                                        <td size='sm' style={{ fontSize: 12, textAlign: 'center' }}>&nbsp;{val.uomName}</td>
                                                        <td size='sm' style={{ fontSize: 12, }}>&nbsp;{val.item_spec}</td>
                                                        <td size='sm' style={{ fontSize: 12, textAlign: 'center' }}>&nbsp;{val.item_unitprice}</td>
                                                        <td size='sm' style={{ fontSize: 12, textAlign: 'center' }}>&nbsp;{val.approx_cost}</td>
                                                        <td size='sm' style={{ fontSize: 12, }}>
                                                            <EditIcon
                                                                sx={{
                                                                    color: editicon,
                                                                    ":hover": {
                                                                        color: '#1565c0'
                                                                    }
                                                                }}
                                                                onClick={(e) => editSelect(val, index)}
                                                            />
                                                        </td>
                                                        <td size='sm' style={{ textAlign: 'center', height: 5 }}>
                                                            <DeleteIcon
                                                                sx={{
                                                                    color: '#DC4731',
                                                                    ":hover": {
                                                                        color: '#B95C50',
                                                                    }
                                                                }}
                                                                onClick={(e) => deleteSelect(val, index)}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </CssVarsProvider>
                                </Box>
                                : null}
                        </Paper>

                        {/* 3rd Row */}
                        <Paper sx={{
                            width: '100%', mt: 0.8
                        }} variant='outlined'>
                            <Box sx={{
                                width: "100%", display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', }
                            }}>
                                <Box sx={{
                                    width: "100%", display: "flex", flexDirection: "column"
                                }}>
                                    <CustomPaperTitle heading="Purpose" />
                                    <Box sx={{
                                        display: 'flex', p: 0.5, width: '100%'
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
                                    width: "100%", display: "flex", flexDirection: "column"
                                }}>
                                    <CustomPaperTitle heading="Justification for the need" />
                                    <Box sx={{
                                        display: 'flex', p: 0.5,
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

                        {/* 4th Row */}


                        <Paper sx={{ mt: 0.8 }} variant='outlined'>
                            <Box sx={{ py: 0.5, display: "flex", flex: 1, flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' } }}>
                                <Box sx={{ flex: 0.5 }} >
                                    <CustomPaperTitle heading="Expected Date" />
                                    <Box sx={{ px: 0.5 }} >
                                        <TextFieldCustom
                                            type="date"
                                            size="sm"
                                            min={format(new Date(), "dd-MM-yyyy")}
                                            name="startdate"
                                            value={startdate}
                                            onchange={updateExpectedDate}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: "row", pl: 1, flex: 2 }}>
                                    <Box sx={{ pt: 4, flex: 0.3 }}>
                                        <CusCheckBox
                                            variant="outlined"
                                            color="danger"
                                            size="md"
                                            name="estimate"
                                            label="Emergency"
                                            value={emergency}
                                            onCheked={updateEmergency}
                                            checked={emergency}
                                        />
                                    </Box>
                                    {emergency === true ?
                                        <Box sx={{ flex: 0.7, pt: 2.5 }}>
                                            {/* <CustomPaperTitle heading="Emergency Type" /> */}
                                            <CrmEmergencySelect value={emerType} setValue={setEmerType} />
                                        </Box> : null
                                    }
                                    {emergency === true ?
                                        <Box sx={{ flex: 1, pt: 2.5 }}>
                                            {/* <CustomPaperTitle heading="Remarks" /> */}
                                            <Box sx={{ px: 0.5, }} >
                                                <CssVarsProvider>
                                                    <Textarea
                                                        style={{
                                                            width: "100%",
                                                            height: 35,
                                                        }}
                                                        maxRows={1}
                                                        placeholder='Remarks'
                                                        type="text"
                                                        size="sm"
                                                        name="remarks"
                                                        value={remarks}
                                                        onChange={(e) => setRemarks(e.target.value)}
                                                    />
                                                </CssVarsProvider>
                                            </Box>
                                        </Box> : null
                                    }

                                </Box>
                                <Box sx={{ display: 'flex', flex: 0.6 }}>
                                    {imgFlag === 1 ?
                                        <Box sx={{ display: "flex", pt: 2.8, flex: 0.3, px: 1 }}>
                                            <Tooltip title="View Files" placement='bottom' >
                                                <IconButton sx={{
                                                    fontSize: 12, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                                    color: 'primary.main', bgcolor: 'white', width: '45px',
                                                    '&:hover': {
                                                        bgcolor: '#F0F4F8',
                                                    },
                                                    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 2,
                                                }}
                                                    onClick={ViewImage} >
                                                    <AttachFileIcon fontSize='small' sx={{ color: '#311b92', width: 35, height: 25 }} />
                                                </IconButton>
                                            </Tooltip>
                                        </Box> : null
                                    }
                                    <Box sx={{ display: "flex", pr: 2, flex: 1 }}>
                                        <Box sx={{ pt: 2.8 }}>
                                            <label htmlFor="file-input">
                                                <Tooltip title="Upload File" placement='bottom' >
                                                    <IconButton aria-label="upload file" component="span"
                                                        sx={{
                                                            fontSize: 12, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                                            color: 'primary.main', bgcolor: 'white', width: '200px',
                                                            '&:hover': {
                                                                bgcolor: '#F0F4F8',
                                                            },
                                                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 2,
                                                        }}
                                                    >
                                                        <CloudUploadTwoToneIcon fontSize='small' sx={{ color: '#3949ab', width: 35, height: 25 }} />
                                                        <Typography sx={{ color: '#3949ab', fontSize: 12 }}>Maximum Size 25MB</Typography>
                                                    </IconButton>
                                                </Tooltip>
                                            </label>
                                            <Input
                                                id="file-input"
                                                type="file"
                                                accept=".jpg, .jpeg, .png, .pdf"
                                                style={{ display: 'none' }}
                                                onChange={uploadFile}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>

                        {selectFile.length !== 0 ?
                            < Paper sx={{
                                width: '100%'
                            }} variant='outlined'>
                                <Box sx={{
                                    width: "100%", display: "flex", flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', }
                                }}>
                                    {
                                        selectFile && selectFile.map((val, index) => {
                                            return <Box sx={{ display: "flex", flexDirection: "row", m: 1 }}
                                                key={index} >
                                                <Box sx={{ fontSize: 14, pt: 0.2, cursor: 'pointer' }} >{val.name}</Box>
                                                <Box sx={{ pl: 0.5 }}><CloseIcon sx={{ height: '16px', width: '16px', cursor: 'pointer', color: 'red' }}
                                                    onClick={() => handleRemoveFile(index)}
                                                /></Box>

                                            </Box>
                                        }
                                        )}
                                </Box>
                            </Paper> : null
                        }

                    </Box>
                </CardMaster>
                < Paper square elevation={0} sx={{ p: 1, pt: 0, overflow: 'auto' }} >
                    <CrfReqstTableView count={count} setCount={setCount} rowSelect={rowSelect} />
                </Paper >
            </Box >
        </Fragment >
    )
}

export default memo(CrfRequestMaster)