
import { Box, Paper, IconButton, Input, Button } from '@mui/material'
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
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import { format } from 'date-fns'
import _ from 'underscore'
import imageCompression from 'browser-image-compression';
import UploadFileIcon from '@mui/icons-material/UploadFile'
import CloseIcon from '@mui/icons-material/Close';
import CrfReqDetailCmpnt from './CrfReqDetailCmpnt'
import AssetUOMSelect from 'src/views/CommonSelectCode/AssetUOMSelect'
import CrmEmergencySelect from 'src/views/CommonSelectCode/CrmEmergencySelect'
import { getUOM } from 'src/redux/actions/AmUOMList.action'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import CrfReqstTableView from './CrfReqstTableView'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ImageDisplayModal from './ImageDisplayModal'
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CustomBackDrop from 'src/views/Components/CustomBackDrop'



const CrfRequestMaster = () => {

    /*** Initializing */
    const history = useHistory();
    const dispatch = useDispatch();

    //state for Actual requirement
    const [actual_require, setActual_require] = useState('')
    // const [selectFile, setSelectFile] = useState([])
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
    const updateRemarks = useCallback((e) => {
        setRemarks(e.target.value)
    }, [])
    // Intializing variables
    // const [dept, setdept] = useState(0)
    const [deptSec, setdeptSec] = useState(0)
    const [tableDis, setTableDis] = useState(0)
    const [startdate, setStartdate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [count, setCount] = useState(0)
    const [value, setValue] = useState(0)
    const [reqSlno, setReqSlno] = useState(0)
    const [selectFile, setSelectFile] = useState([])
    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imageshow, setImageShow] = useState(false)
    const [imgFlag, setImgFlag] = useState(0)
    const [imagearray, setImageArry] = useState([])
    //Items store array
    const [dataPost, setdataPost] = useState([])
    const [arrayupdate, setArryUpdate] = useState(0)
    const [editdata, setEditdata] = useState([])
    // const [totalApproxCost, setTotalCost] = useState(0)
    const [emergency, setEmergency] = useState(false)
    const [emerType, setEmerType] = useState(0)
    const [detailDataDis, setDetailDataDis] = useState([])
    const [reqDetalSlno, setReqDetalSlno] = useState(0)
    const [authorizeDeptSec, setAuthorizDeptSec] = useState([])
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
    const [itemstate, setItemState] = useState({
        item_desc: '',
        item_brand: '',
        item_qty: 0,
        item_spec: '',
    })
    //Destructuring
    const { item_desc, item_brand, item_qty, item_spec } = itemstate
    const updateItemState = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setItemState({ ...itemstate, [e.target.name]: value })
    }, [itemstate])
    //redux for geting login id
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const deptsec = useSelector((state) => state.LoginUserData.empsecid, _.isEqual)
    const deptsecName = useSelector((state) => state.LoginUserData.empdeptsec, _.isEqual)

    const [uom, setUOM] = useState(0)
    const [uomName, setUomName] = useState('')
    const [unitprice, setUnitPrice] = useState(0)
    const [approx_cost, setapprox_cost] = useState(0)
    const [deletedata, setDelete] = useState([])

    const updateUnitPrice = useCallback((e) => {

        if (item_qty !== 0) {
            setUnitPrice(e.target.value)
            setapprox_cost(item_qty * e.target.value)
        }
        else {
            warningNotify("Please Enter quantity before enter unit price")
        }

    }, [item_qty])

    const [levelOne, setLevelOne] = useState(0)
    const [levelTwo, setLevelTwo] = useState(0)
    const [deptType, setDeptType] = useState(0)

    const [rowdetailData, setRowDetailData] = useState([])
    // const [upInsertNewdtl, setUpInsertNewDetail] = useState([])
    // const [newTabDis, setNewTabDis] = useState(0)
    // const [upInsertNewdtlDis, setUpInsertNewDetailDis] = useState([])
    const [userAcknoldge, setuserAcknoldge] = useState(false)

    const updateuserAcknoldge = useCallback((e) => {
        if (e.target.checked === true) {
            setuserAcknoldge(true)
        }
        else {
            setuserAcknoldge(false)
        }
    }, [])

    useEffect(() => {
        dispatch(getUOM())
        const InchHodDeptsec = async (deptsec) => {
            const result = await axioslogin.get(`/newCRFRegister/InHodExist/${deptsec}`)
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
                setdeptSec(deptsec)
            }
        }

        InchHodDeptsec(deptsec)
        DeptsecBasedOnAssign(id)


    }, [dispatch, deptsec, id])

    const AddItem = useCallback(() => {

        if (item_desc !== '' && item_qty > 0 && unitprice >= 0) {
            if (value === 0) {
                setTableDis(1)
                if (arrayupdate === 0) {
                    const newdata = {
                        id: Math.ceil(Math.random() * 1000),
                        item_desc: item_desc,
                        item_brand: item_brand,
                        item_qty: parseInt(item_qty),
                        item_unit: uom,
                        uomName: uomName,
                        item_spec: item_spec,
                        item_unitprice: unitprice,
                        approx_cost: parseInt(approx_cost)
                    }
                    const datass = [...dataPost, newdata]
                    setdataPost(datass)
                    const resetarrray = {
                        item_desc: '',
                        item_brand: '',
                        item_qty: 0,
                        item_spec: ''
                    }
                    setItemState(resetarrray)
                    setUnitPrice(0)
                    setapprox_cost(0)
                    setUOM(0)
                }
                else {
                    const newdata = {
                        id: Math.ceil(Math.random() * 1000),
                        item_desc: item_desc,
                        item_brand: item_brand,
                        item_qty: parseInt(item_qty),
                        item_unit: uom,
                        uomName: uomName,
                        item_spec: item_spec,
                        item_unitprice: unitprice,
                        approx_cost: parseInt(approx_cost)
                    }
                    const datass = [...dataPost, newdata]
                    setdataPost(datass)
                    const resetarrray = {
                        item_desc: '',
                        item_brand: '',
                        item_qty: 0,
                        item_spec: ''
                    }
                    setItemState(resetarrray)
                    setUnitPrice(0)
                    setapprox_cost(0)
                    setUOM(0)
                    setEditdata([])
                }
            }
            else {

                if (arrayupdate === 1) {
                    const patchdata = {
                        item_desc: item_desc,
                        item_brand: item_brand,
                        item_unit: uom,
                        item_qnty: parseInt(item_qty),
                        item_specification: item_spec,
                        item_unit_price: unitprice,
                        aprox_cost: parseInt(approx_cost),
                        edit_user: id,
                        req_detl_slno: reqDetalSlno

                    }
                    const deleteItem = async (patchdata) => {
                        const result = await axioslogin.patch('/newCRFRegister/EditItemList', patchdata);
                        const { success, message } = result.data
                        if (success === 1) {
                            const result1 = await axioslogin.get(`/newCRFRegister/getDetailItemList/${reqSlno}`)
                            const { success, data } = result1.data
                            if (success === 1) {
                                setRowDetailData(data)
                                setTableDis(1)
                                setArryUpdate(0)
                                succesNotify(message)
                                const resetarrray = {
                                    item_desc: '',
                                    item_brand: '',
                                    item_qty: 0,
                                    item_spec: ''
                                }
                                setItemState(resetarrray)
                                setUnitPrice(0)
                                setapprox_cost(0)
                                setUOM(0)
                                setEditdata([])
                            } else {
                                setTableDis(0)
                            }
                        }
                    }
                    deleteItem(patchdata)
                }
                else {
                    const newdata = {
                        id: Math.ceil(Math.random() * 1000),
                        item_desc: item_desc,
                        item_brand: item_brand,
                        item_qty: parseInt(item_qty),
                        item_unit: uom,
                        uomName: uomName,
                        item_spec: item_spec,
                        item_unitprice: unitprice,
                        approx_cost: parseInt(approx_cost)
                    }
                    const datass = [...dataPost, newdata]
                    setdataPost(datass)

                    // const datass = [...upInsertNewdtl, newdata]
                    // setUpInsertNewDetail(datass)
                    // setNewTabDis(1)
                    const resetarrray = {
                        item_desc: '',
                        item_brand: '',
                        item_qty: 0,
                        item_spec: ''
                    }
                    setItemState(resetarrray)
                    setUnitPrice(0)
                    setapprox_cost(0)
                    setUOM(0)

                }
            }
        }
        else {
            warningNotify("Item Description and Quantity are mandatory and Quantity and unit price are not negative")
        }
    }, [value, item_desc, item_brand, item_qty, uom, uomName, item_spec, unitprice, approx_cost,
        dataPost, arrayupdate, setdataPost, reqSlno, reqDetalSlno, id,])


    const [columnReqDetails] = useState([
        { headerName: "Item Slno", field: "item_slno" },
        { headerName: "Description", field: "item_desc", autoHeight: true, wrapText: true, width: 250, filter: "true" },
        { headerName: "Brand", field: "item_brand", autoHeight: true, wrapText: true, width: 250, filter: "true" },
        { headerName: "Unit", field: "uomName" },
        { headerName: "Quantity", field: "item_qty" },
        { headerName: "Specification", field: "item_spec" },
        { headerName: "Unit Price", field: "item_unitprice" },
        { headerName: "Approximate Cost", field: "approx_cost" },
        {
            headerName: 'Edit', width: 100, cellRenderer: params =>
                <IconButton onClick={() => editSelect(params)}
                    sx={{ color: editicon, pt: 0 }} >
                    <CustomeToolTip title="Edit">
                        <EditIcon size={15} />
                    </CustomeToolTip>
                </IconButton>
        },
        {
            headerName: 'Delete', width: 100, cellRenderer: params =>
                <IconButton onClick={() => deleteSelect(params)}
                    sx={{ color: editicon, pt: 0 }} >
                    <CustomeToolTip title="Delete">
                        <DeleteIcon size={15} />
                    </CustomeToolTip>
                </IconButton>
        },
    ])

    // const [columnReqDetailsNew] = useState([
    //     { headerName: "Item Slno", field: "item_slno" },
    //     { headerName: "Description", field: "item_desc", autoHeight: true, wrapText: true, width: 250, filter: "true" },
    //     { headerName: "Brand", field: "item_brand", autoHeight: true, wrapText: true, width: 250, filter: "true" },
    //     { headerName: "Unit", field: "uomName" },
    //     { headerName: "Quantity", field: "item_qty" },
    //     { headerName: "Specification", field: "item_spec" },
    //     { headerName: "Unit Price", field: "item_unitprice" },
    //     { headerName: "Approximate Cost", field: "approx_cost" },

    // ])

    useEffect(() => {
        if (dataPost.length !== 0) {
            const datas = dataPost.map((val, index) => {
                const obj = {
                    item_slno: index + 1,
                    id: val.id,
                    item_brand: val.item_brand,
                    item_desc: val.item_desc,
                    item_qty: val.item_qty,
                    item_spec: val.item_spec,
                    item_unit: val.item_unit,
                    item_unitprice: val.item_unitprice,
                    uomName: val.uomName,
                    approx_cost: val.approx_cost,
                    req_detl_slno: 0
                }
                return obj
            })
            setDetailDataDis(datas)
        }
        if (rowdetailData.length !== 0) {
            const datas = rowdetailData.map((val, index) => {
                const obj = {
                    item_slno: index + 1,
                    id: val.item_slno,
                    item_brand: val.item_brand,
                    item_desc: val.item_desc,
                    item_qty: val.item_qnty,
                    item_spec: val.item_specification,
                    item_unit: val.item_unit,
                    item_unitprice: val.item_unit_price,
                    uomName: val.uom_name,
                    approx_cost: val.aprox_cost,
                    item_status: val.item_status,
                    req_detl_slno: val.req_detl_slno,
                    req_slno: val.req_slno
                }
                return obj
            })
            setDetailDataDis(datas)

        }

        // if (upInsertNewdtl.length !== 0) {
        //     const datas = upInsertNewdtl.map((val, index) => {
        //         const obj = {
        //             item_slno: index + 1,
        //             id: val.item_slno,
        //             item_brand: val.item_brand,
        //             item_desc: val.item_desc,
        //             item_qty: val.item_qnty,
        //             item_spec: val.item_specification,
        //             item_unit: val.item_unit,
        //             item_unitprice: val.item_unit_price,
        //             uomName: val.uom_name,
        //             approx_cost: val.aprox_cost,
        //             item_status: val.item_status,
        //             req_detl_slno: val.req_detl_slno,
        //             req_slno: val.req_slno
        //         }
        //         return obj
        //     })
        //     setUpInsertNewDetailDis(datas)
        // }

    }, [dataPost, rowdetailData,])


    //First Time delete
    useEffect(() => {
        if (Object.keys(deletedata).length > 0) {
            if (value === 0) {
                const { item_slno } = deletedata[0]
                const newdata = detailDataDis.filter((val) => {
                    return val.item_slno !== item_slno
                })
                setdataPost(newdata)
                setDetailDataDis(newdata)
            } else {
                const { req_detl_slno, req_slno } = deletedata[0]
                const patchdata = {
                    req_detl_slno: req_detl_slno,
                    delete_user: id
                }
                const deleteItem = async (patchdata) => {
                    const result = await axioslogin.patch('/newCRFRegister/DeleteItemList', patchdata);
                    const { success, message } = result.data
                    if (success === 1) {
                        const result1 = await axioslogin.get(`/newCRFRegister/getDetailItemList/${req_slno}`)
                        const { success, data } = result1.data
                        if (success === 1) {
                            setRowDetailData(data)
                            setTableDis(1)
                            succesNotify(message)
                        } else {
                            setTableDis(0)
                        }
                    }
                }
                deleteItem(patchdata)
            }
        }
        //if datapost add as dependancy redendering happen
    }, [deletedata, id, value])


    const deleteSelect = useCallback((params) => {
        const data = params.api.getSelectedRows()
        setDelete(data)
    }, [])


    const editSelect = useCallback((params) => {
        const data = params.api.getSelectedRows()
        const { req_detl_slno, req_slno } = data[0]
        if (req_detl_slno === 0) {
            setDelete(data)
            setEditdata(data)
            setArryUpdate(1)
        } else {
            setArryUpdate(1)
            setEditdata(data)
            setReqSlno(req_slno)
            setReqDetalSlno(req_detl_slno)
        }
    }, [])

    useEffect(() => {
        if (Object.keys(editdata).length > 0) {
            const { item_desc, item_brand, item_unit, item_qty, item_spec, approx_cost, item_unitprice } = editdata[0]
            const resetarrray = {
                item_desc: item_desc,
                item_brand: item_brand,
                item_qty: item_qty,
                item_spec: item_spec
            }

            setItemState(resetarrray)
            setUnitPrice(item_unitprice)
            setapprox_cost(approx_cost)
            setUOM(item_unit)

        }
    }, [editdata, dataPost])

    const uploadFile = useCallback(async (e) => {
        if (e.target.files[0].type === "application/pdf") {
            if ((e.target.files[0].size) > 2000000) {
                warningNotify("File Size Is to Large")
            } else {
                const newFiles = [...selectFile]
                newFiles.push(e.target.files[0])
                setSelectFile(newFiles)
            }

        } else {
            const newFiles = [...selectFile]
            newFiles.push(e.target.files[0])
            setSelectFile(newFiles)
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
            expected_date: startdate,
            emergency_flag: emergency === true ? 1 : 0,
            emer_slno: emerType !== 0 ? emerType : null,
            emergeny_remarks: remarks !== '' ? remarks : null,
            // total_approx_cost: totalApproxCost,
            user_deptsec: deptsec,
            create_user: id
        }

    }, [deptSec, actual_require, needed, category, location, startdate,
        emergency, remarks, deptsec, id, emerType])


    const reqDataPatch = useMemo(() => {
        return {
            //  request_dept_slno: dept,
            request_deptsec_slno: deptSec,
            actual_requirement: actual_require !== '' ? actual_require : null,
            needed: needed !== '' ? needed : null,
            category: category !== '' ? category : null,
            location: location !== '' ? location : null,
            expected_date: startdate,
            emergency_flag: emergency === true ? 1 : 0,
            emer_slno: emerType !== 0 ? emerType : null,
            emergeny_remarks: remarks !== '' ? remarks : null,
            // total_approx_cost: totalApproxCost,
            user_deptsec: deptsec,
            edit_user: id,
            req_slno: reqSlno
        }

    }, [deptSec, actual_require, needed, category, location, startdate,
        emergency, remarks, deptsec, id, emerType, reqSlno])

    //* Reset function
    const reset = useCallback(() => {
        setActual_require('')
        setNeeded('')
        setCategory('')
        setLocation('')
        setRemarks('')
        // setdept(0)
        setdeptSec(0)
        setTableDis(0)
        setStartdate(format(new Date(), "yyyy-MM-dd"))
        setCount(0)
        setValue(0)
        setReqSlno(0)
        setSelectFile([])
        setImageShowFlag(0)
        setImageShow(false)
        setImgFlag(0)
        setImageArry([])
        setdataPost([])
        setArryUpdate(0)
        setEditdata([])
        setEmergency(false)
        setEmerType(0)
        const resetdata = {
            item_desc: '',
            item_brand: '',
            item_qty: '',
            item_spec: ''
        }
        setItemState(resetdata)
        setUOM(0)
        setUomName('')
        setUnitPrice(0)
        setapprox_cost(0)
        setDelete([])
        setLevelOne(0)
        setLevelTwo(0)
        setDeptType(0)


    }, [])

    const submitRequest = useCallback((e) => {
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
        if (value === 0) {
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
                warningNotify("Are you want to save items plaese add items first then click Save Button")

            }
        } else {
            if ((emergency === true && emerType !== 0 && remarks !== '') || (emergency === false)) {
                if (deptSec !== 0 && (category !== '' || needed !== '' || actual_require !== '' || location !== '')) {
                    setOpen(true)
                    ReqMasterUpdate(reqDataPatch).then((val) => {
                        const { success, message } = val
                        if (success === 2) {
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


    }, [value, emergency, emerType, remarks, deptSec, reqDataPost, selectFile,
        detailDataDis, levelOne, levelTwo, deptType, setCount, count, id,
        handleImageUpload, reset, reqDataPatch, reqSlno, item_desc, item_brand, item_qty,
        uom, item_spec, unitprice, approx_cost, actual_require, needed, category, location
    ])

    //Data set for edit
    const rowSelect = useCallback((params) => {
        setValue(1);
        const data = params.api.getSelectedRows()
        const { req_slno, actual_requirement, location, category, image_status,
            needed, request_deptsec_slno, expected_date, emergency_flag,
            emer_slno, emergeny_remarks
        } = data[0]

        setActual_require(actual_requirement)
        setNeeded(needed)
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

        setImageShowFlag(0)
        setImageShow(false)
        setImageArry([])
        setdataPost([])
        setArryUpdate(0)
        setEditdata([])


        const resetdata = {
            item_desc: '',
            item_brand: '',
            item_qty: '',
            item_spec: ''
        }
        setItemState(resetdata)
        setUOM(0)
        setUomName('')
        setUnitPrice(0)
        setapprox_cost(0)
        setDelete([])
        setLevelOne(0)
        setLevelTwo(0)
        setDeptType(0)

        setCategory(category)
        setReqSlno(req_slno)

        const InsertFun = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegister/getDetailItemList/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setRowDetailData(data)
                setdataPost(data)
                setTableDis(1)
                // setEstimate(true)
                // setDisEstimate(1)
                // const yy = data.map((val) => val.item_slno)
                // let maximum = Math.max(...yy)
                // setAlreadyItem(maximum + 1);
            }
            else {
                setTableDis(0)
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
        // reset()
    }, [])





    return (
        <Fragment>
            <CustomBackDrop open={open} text="Please Wait" />
            <Box sx={{ height: window.innerHeight - 85, overflow: 'auto' }}>
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
                                        {/* <Box sx={{
                                            width: "100%", pr: 1
                                        }}>
                                            <DepartmentSelect value={dept} setValue={setdept} />
                                        </Box> */}

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
                                            onchange={updateItemState}
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
                                            onchange={updateItemState}
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
                                        <IconButton variant="outlined" color="primary" onClick={AddItem}>
                                            <MdOutlineAddCircleOutline size={30} />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                            {tableDis === 1 ? <Box sx={{
                                width: "100%", display: "flex", flexDirection: "column", p: 1
                            }}>

                                <CrfReqDetailCmpnt
                                    columnDefs={columnReqDetails}
                                    tableData={detailDataDis}
                                />
                            </Box> : null}


                            {/* {newTabDis === 1 ?
                                <Box sx={{ width: "100%", display: "flex", flexDirection: "column", pl: 1, pb: 1, pr: 1 }}>
                                    <CustomPaperTitle heading="Newly Added Items" />

                                    <CrfReqDetailCmpnt
                                        columnDefs={columnReqDetailsNew}
                                        tableData={upInsertNewdtl}
                                    />


                                </Box> : null

                            } */}
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


                        <Paper sx={{
                            width: '100%', mt: 0.8
                        }} variant='outlined'>
                            <Box sx={{
                                width: "100%", display: "flex", flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', }
                            }}>
                                <Box sx={{
                                    width: "20%", display: "flex", flexDirection: "column",
                                }}>
                                    <CustomPaperTitle heading="Expected Date" />
                                    <Box sx={{
                                        width: '100%', p: 0.5
                                    }} >
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
                                {/* <Box sx={{
                                    width: "10%", display: "flex", flexDirection: "column",
                                }}>
                                    <CustomPaperTitle heading="Total Approx.Cost" />
                                    <Box sx={{ width: '100%', p: 0.5 }} >
                                        <TextFieldCustom
                                            type="text"
                                            size="sm"
                                            name="totalApproxCost"
                                            value={totalApproxCost}
                                        />
                                    </Box>
                                </Box> */}

                                <Box sx={{
                                    width: "50%", display: "flex", flexDirection: "row", pl: 1,
                                }}>
                                    <Box sx={{
                                        width: "17%", pt: 4
                                    }}>
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
                                        <Box sx={{ width: "30%", pt: 4, }}>
                                            <CrmEmergencySelect value={emerType} setValue={setEmerType} />
                                        </Box> : null
                                    }

                                    {emergency === true ?
                                        <Box sx={{ width: "50%", }}>
                                            <Box sx={{ width: "100%", flexDirection: "column" }}>
                                                <CustomPaperTitle heading="Remarks" />
                                                <Box sx={{
                                                    display: 'flex', p: 0.5, width: '100%'
                                                }} >
                                                    <CustomTextarea
                                                        required
                                                        type="text"
                                                        size="md"
                                                        style={{
                                                            width: "100%",
                                                            height: 30,
                                                        }}
                                                        maxRows={1}

                                                        value={remarks}
                                                        onchange={updateRemarks}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box> : null
                                    }

                                </Box>

                                <Box sx={{
                                    width: "30%", display: "flex", flexDirection: "row", pl: 1,
                                }}>
                                    <Box sx={{ display: 'flex', width: '300px', pt: 4 }}>
                                        <Box >
                                            <label htmlFor="file-input">
                                                <CustomeToolTip title="upload">
                                                    <IconButton color="primary" aria-label="upload file" component="span">
                                                        <UploadFileIcon />
                                                        <CustomPaperTitle heading="Maximum Size 25MB" />
                                                    </IconButton>
                                                </CustomeToolTip>
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
                                    {
                                        imgFlag === 1 ?
                                            <Box sx={{ display: 'flex', width: "15%", height: 70, pt: 3 }}>
                                                <Button onClick={ViewImage} variant="contained"
                                                    size="small" color="primary">View Image</Button>
                                            </Box> : null
                                    }




                                </Box>
                            </Box>
                        </Paper>
                        {selectFile.length !== 0 ?
                            < Paper sx={{
                                width: '100%', mt: 0.8
                            }} variant='outlined'>
                                <Box sx={{
                                    width: "100%", display: "flex", flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', }
                                }}>
                                    {
                                        selectFile && selectFile.map((val, index) => {
                                            return <Box sx={{ display: "flex", flexDirection: "row", ml: 2, pt: 2 }}
                                                key={index} >
                                                <Box >{val.name}</Box>
                                                <Box sx={{ ml: .3 }}><CloseIcon sx={{ height: '18px', width: '20px', cursor: 'pointer' }}
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
                < Paper square elevation={0} sx={{
                    p: 1, pt: 0
                }} >
                    <Box sx={{ width: "30%", mt: 1 }}>
                        <CusCheckBox
                            label="Acknowledgement pending"
                            color="danger"
                            size="md"
                            name="userAcknoldge"
                            value={userAcknoldge}
                            checked={userAcknoldge}
                            onCheked={updateuserAcknoldge}
                        />
                    </Box>

                    <CrfReqstTableView count={count} rowSelect={rowSelect} userAcknoldge={userAcknoldge} />
                </Paper >
            </Box >
        </Fragment >
    )
}

export default memo(CrfRequestMaster)