import { Box, Paper, IconButton, } from '@mui/material'
import React, { useCallback, memo, useState, useMemo, useEffect, Fragment } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import { useHistory } from 'react-router-dom'
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
import CustomTextarea from 'src/views/Components/CustomTextarea'
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { useDispatch, useSelector } from 'react-redux'
import ReqRegisterTable from './ReqRegisterTable'
import { getInchargeHodData } from 'src/redux/actions/InchargeHodChecks.action'
import ReqRegistItemCmpt from './ReqRegistItemCmpt'
import { editicon } from 'src/color/Color'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CusCheckBox from 'src/views/Components/CusCheckBox'
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import { format } from 'date-fns'
import _ from 'underscore'
import DeptSecUnderDept from 'src/views/CommonSelectCode/DeptSecUnderDept'
import { getDeptSecInchHod } from 'src/redux/actions/DeptSecInchHod.action'

// import imageCompression from 'browser-image-compression';
// import UploadFileIcon from '@mui/icons-material/UploadFile'
// import CloseIcon from '@mui/icons-material/Close';
// import ReqImageDisplayModal from './ReqImageDisplayModal'
// import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';

const ReqRegistration = () => {
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
    const [dept, setdept] = useState(0)
    const [deptSec, setdeptSec] = useState(0)
    const [tableDis, setTableDis] = useState(0)
    const [startdate, setStartdate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [count, setCount] = useState(0)
    const [value, setValue] = useState(0)
    const [reqSlno, setReqSlno] = useState(0)
    const [patchInserDetl, setPatchInserDetl] = useState(0)
    const [msgShow, setMsgShow] = useState(0)
    const [estimate, setEstimate] = useState(false)
    //Item details initialization
    const [itemstate, setItemState] = useState({
        item_desc: '',
        item_brand: '',
        item_qty: '',
        item_unit: '',
        item_spec: '',
        approx_cost: 0
    })
    //Destructuring
    const { item_desc, item_brand, item_qty, item_unit, item_spec, approx_cost } = itemstate
    const updateItemState = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setItemState({ ...itemstate, [e.target.name]: value })
    }, [itemstate])
    //redux for geting login id
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const deptsec = useSelector((state) => state.LoginUserData.empsecid, _.isEqual)
    const empdept = useSelector((state) => state.LoginUserData.empdept, _.isEqual)


    const [detldept, setDetldept] = useState(0)

    const [depttype, setDeptType] = useState(0)
    useEffect(() => {
        const deptCheck = async (empdept) => {
            const result = await axioslogin.get(`/common/crfdept/${empdept}`)
            const { success } = result.data
            if (success === 1) {
                setDetldept(1)
            }
            else {
                setDetldept(0)
            }
        }
        const deptTypeget = async (empdept) => {
            const result = await axioslogin.get(`/common/deptType/${empdept}`)
            const { success, data } = result.data
            if (success === 1) {
                const { dept_type } = data
                setDeptType(dept_type)
            }
            else {
                setDeptType(0)
            }
        }
        deptCheck(empdept)
        deptTypeget(empdept)
    }, [empdept])


    //checking login id is hod or incharge
    useEffect(() => {
        dispatch(getInchargeHodData(id))
        dispatch(getDeptSecInchHod(deptsec))
    }, [dispatch, id, deptsec])

    const HodIncharge = useSelector((state) => state.setInchargeHodData.InchargeHoddata, _.isEqual)
    const [isIncharge, setincharge] = useState(0)
    const [ishod, setHod] = useState(0)

    useEffect(() => {
        if (HodIncharge.length !== 0) {
            const { hod, incharge } = HodIncharge[0]
            setincharge(incharge)
            setHod(hod)
        }
    }, [HodIncharge])

    const deptsecHodInch = useSelector((state) => state.setDeptSecInchHod.deptSecInchHodList, _.isEqual)
    //HOD
    const object1 = deptsecHodInch.filter(obj => obj.auth_post === 1 ? obj.emp_id : null);
    //Incharge
    const object2 = deptsecHodInch.filter(obj => obj.auth_post === 2 ? obj.emp_id : null);

    const updateExpectedDate = (e) => {
        setStartdate(e.target.value)
    }
    const [disEstimate, setDisEstimate] = useState(0)
    const [emergency, setEmergency] = useState(false)

    const updateEmergency = (e) => {
        if (e.target.checked === true) {
            setEmergency(true)
        } else {
            setEmergency(false)
        }
    }
    const updateEstimate = (e) => {
        if (e.target.checked === true) {
            setEstimate(true)
            setDisEstimate(1)
        } else {
            setEstimate(false)
            setDisEstimate(0)
        }
    }


    //column title setting
    const [column] = useState([
        { headerName: "Item Slno", field: "item_slno" },
        { headerName: "Description", field: "item_desc", autoHeight: true, wrapText: true, width: 250, filter: "true" },
        { headerName: "Brand", field: "item_brand", autoHeight: true, wrapText: true, width: 250, filter: "true" },
        { headerName: "Unit", field: "item_unit" },
        { headerName: "Quantity", field: "item_qnty" },
        { headerName: "Specification", field: "item_specification" },
        { headerName: "Approximate Cost", field: "aprox_cost" },
        {
            headerName: 'Edit', width: 80, cellRenderer: params =>
                <IconButton onClick={() => editSelect(params)}
                    sx={{ color: editicon, pt: 0 }} >
                    <CustomeToolTip title="Edit">
                        <EditIcon size={15} />
                    </CustomeToolTip>
                </IconButton>
        },
        {
            headerName: 'Delete', width: 80, cellRenderer: params =>
                <IconButton onClick={() => deleteSelect(params)}
                    sx={{ color: editicon, pt: 0 }} >
                    <CustomeToolTip title="Edit">
                        <DeleteIcon size={15} />
                    </CustomeToolTip>
                </IconButton>
        },
    ])


    const [columnDeptDetl] = useState([
        { headerName: "Item Slno", field: "item_slno" },
        { headerName: "Description", field: "item_desc", autoHeight: true, wrapText: true, width: 250, filter: "true" },
        { headerName: "Brand", field: "item_brand", autoHeight: true, wrapText: true, width: 250, filter: "true" },
        { headerName: "Quantity", field: "item_qnty" },
        {
            headerName: 'Edit', width: 80, cellRenderer: params =>
                <IconButton onClick={() => editSelect(params)}
                    sx={{ color: editicon, pt: 0 }} >
                    <CustomeToolTip title="Edit">
                        <EditIcon size={15} />
                    </CustomeToolTip>
                </IconButton>
        },
        {
            headerName: 'Delete', width: 80, cellRenderer: params =>
                <IconButton onClick={() => deleteSelect(params)}
                    sx={{ color: editicon, pt: 0 }} >
                    <CustomeToolTip title="Edit">
                        <DeleteIcon size={15} />
                    </CustomeToolTip>
                </IconButton>
        },
    ])

    const [totalApproxCost, setTotalCost] = useState(0)
    //Items store array
    const [dataPost, setdataPost] = useState([])
    const [arrayupdate, setArryUpdate] = useState(0)
    const [item_slno, setItemSlno] = useState(1)
    const [deletedata, setDelete] = useState([])
    const [editdata, setEditdata] = useState([])
    const [getDataDetl, setGetDataDetl] = useState([])

    // Estimate add button click data store into array
    //When page is taken by users except it,maintenence an d biomedical
    const AddItemUser = () => {
        if (item_desc === '') {
            warningNotify("Please Add Item Desription")
        }
        else {
            setTableDis(1)
            if (arrayupdate === 0) {
                const newdata = {
                    id: Math.ceil(Math.random() * 1000),
                    item_slno: parseInt(item_slno),
                    item_desc: item_desc,
                    item_brand: item_brand !== '' ? item_brand : "Not Given",
                    item_qnty: item_qty !== '' ? parseInt(item_qty) : 0,
                    item_status: 1
                }
                const datass = [...dataPost, newdata]
                if (datass.length !== 0) {
                    setdataPost(datass)
                    const resetarrray = {
                        item_desc: '',
                        item_brand: '',
                        item_qty: '',
                        item_unit: '',
                        item_spec: '',
                        approx_cost: 0
                    }
                    setItemState(resetarrray)
                    setItemSlno(item_slno + 1)
                }
            }

            else {
                const { item_slno } = editdata[0]
                const frmset = {
                    item_slno: item_slno,
                    item_desc: item_desc,
                    item_brand: item_brand,
                    item_unit: item_unit,
                    item_qnty: parseInt(item_qty),
                    item_specification: item_spec,
                    aprox_cost: parseInt(approx_cost),
                }
                setItemState(frmset)
                const result = dataPost.map((val) => val.item_slno === frmset.item_slno ? { ...val, ...frmset } : val);
                setdataPost(result)
                setEditdata([])
                const resetarrray = {
                    item_desc: '',
                    item_brand: '',
                    item_qty: '',
                    item_unit: '',
                    item_spec: '',
                    approx_cost: 0
                }
                setItemState(resetarrray)
            }
        }
    }

    const AddItem = useCallback(() => {
        if (item_desc === '') {
            warningNotify("Please Add Item Desription")
        }
        else {
            setTableDis(1)
            if (arrayupdate === 0) {

                const newdata = {
                    id: Math.ceil(Math.random() * 1000),
                    item_slno: parseInt(item_slno),
                    item_desc: item_desc,
                    item_brand: item_brand !== '' ? item_brand : "Not Given",
                    item_unit: item_unit !== '' ? item_unit : "Not Given",
                    item_qnty: item_qty !== '' ? parseInt(item_qty) : 0,
                    item_specification: item_spec !== '' ? item_spec : "Not Given",
                    aprox_cost: approx_cost !== '' ? parseInt(approx_cost) : 0,
                    item_status: 1
                }
                const datass = [...dataPost, newdata]
                if (datass.length !== 0) {
                    setdataPost(datass)
                    const xx = approx_cost !== 0 ? totalApproxCost + parseInt(approx_cost) : 0
                    setTotalCost(xx)
                    const resetarrray = {
                        item_desc: '',
                        item_brand: '',
                        item_qty: '',
                        item_unit: '',
                        item_spec: '',
                        approx_cost: 0
                    }
                    setItemState(resetarrray)
                    setItemSlno(item_slno + 1)
                    setEditdata([])
                }
                else {
                    warningNotify("Please Fill all fields")
                }
            }
            else {
                const { item_slno } = editdata[0]
                const frmset = {
                    item_slno: item_slno,
                    item_desc: item_desc,
                    item_brand: item_brand,
                    item_unit: item_unit,
                    item_qnty: parseInt(item_qty),
                    item_specification: item_spec,
                    aprox_cost: parseInt(approx_cost),
                }
                setItemState(frmset)
                const result = dataPost.map((val) => val.item_slno === frmset.item_slno ? { ...val, ...frmset } : val);
                setdataPost(result)
                const resetarrray = {
                    item_desc: '',
                    item_brand: '',
                    item_qty: '',
                    item_unit: '',
                    item_spec: '',
                    approx_cost: 0
                }
                setItemState(resetarrray)
                setItemSlno(0)
                setArryUpdate(0)
            }
        }
    }, [totalApproxCost, approx_cost, setArryUpdate, dataPost, arrayupdate, item_brand, item_desc,
        item_unit, item_qty, item_spec, editdata, item_slno])

    //itemm array delete button click item delete
    const deleteSelect = useCallback((params) => {
        const data = params.api.getSelectedRows()
        setDelete(data)
        const { req_detl_slno } = data[0]

        const patchdata = {
            req_detl_slno: req_detl_slno,
            delete_user: id
        }
        const deleteItem = async (patchdata) => {
            const result = await axioslogin.patch('/requestRegister/DeleteItemList', patchdata);
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
            }
        }
        deleteItem(patchdata)
    }, [id])


    //itemm array edit button click item edit and save
    const editSelect = (params) => {
        const data = params.api.getSelectedRows()
        setEditdata(data)
        setArryUpdate(1)
    }
    useEffect(() => {
        if (Object.keys(deletedata).length > 0) {
            const { item_slno } = deletedata[0]
            const newdata = dataPost.filter((val) => {
                return val.item_slno !== item_slno
            })
            setdataPost(newdata)
        }
    }, [deletedata, dataPost])

    useEffect(() => {
        if (Object.keys(editdata).length > 0) {
            const { item_desc, item_brand, item_unit, item_qnty, item_specification, aprox_cost } = editdata[0]
            const frmset = {
                item_desc: item_desc,
                item_brand: item_brand,
                item_unit: item_unit,
                item_qty: item_qnty,
                item_spec: item_specification,
                approx_cost: aprox_cost,
            }
            setItemState(frmset)
        }
    }, [editdata, dataPost])


    //redux for geting login emp secid
    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })


    //Request insertt
    const postData = useMemo(() => {
        return {
            actual_requirement: actual_require,
            needed: needed,
            request_dept_slno: dept,
            request_deptsec_slno: deptSec,
            location: location === '' ? null : location,
            create_user: id,
            remarks: remarks !== '' ? remarks : '',
            total_approx_cost: totalApproxCost,
            expected_date: startdate,
            user_deptsec: empsecid,
            category: category === '' ? null : category,
            emergency: emergency === false ? 0 : 1
        }
    }, [actual_require, needed, dept, deptSec, category, location, id, remarks, startdate,
        totalApproxCost, emergency, empsecid])

    const patchData = useMemo(() => {
        return {
            actual_requirement: actual_require,
            needed: needed,
            request_dept_slno: dept,
            request_deptsec_slno: deptSec,
            location: location,
            remarks: remarks,
            total_approx_cost: totalApproxCost !== '' ? totalApproxCost : 0,
            expected_date: startdate,
            user_deptsec: empsecid,
            category: category,
            req_slno: reqSlno,
            emergency: emergency === false ? 0 : 1
        }
    }, [actual_require, needed, dept, emergency, deptSec, category, location, remarks, startdate,
        totalApproxCost, empsecid, reqSlno])

    useEffect(() => {
        if (msgShow !== 0) {
            succesNotify("Update Successfully")
        }
    }, [msgShow])

    // //* Reset function
    const reset = useCallback(() => {
        setActual_require('')
        setNeeded('')
        setLocation('')
        setRemarks('')
        setdept(0)
        setdeptSec(0)
        setTableDis(0)
        setTotalCost(0)
        setValue(0)
        setReqSlno(0)
        setPatchInserDetl(0)
        setMsgShow(0)
        setStartdate(format(new Date(), "yyyy-MM-dd"))
        setCount(0)
        setItemSlno(1)
        setDisEstimate(0)
        setCategory('')
        setEstimate(false)
        const resetdata = {
            item_desc: '',
            item_brand: '',
            item_qty: '',
            item_unit: '',
            item_spec: '',
            approx_cost: ''
        }
        setItemState(resetdata)
        setdataPost([])
        // setSelectFile([])
        // setImgFlag(0)
    }, [])

    // const uploadFile = useCallback(async (e) => {
    //     const newFiles = [...selectFile]
    //     newFiles.push(e.target.files[0])
    //     setSelectFile(newFiles)
    // }, [selectFile, setSelectFile])

    // const handleImageUpload = useCallback(async (imageFile) => {
    //     const options = {
    //         maxSizeMB: 2,
    //         maxWidthOrHeight: 1920,
    //         useWebWorker: true,
    //     }
    //     const compressedFile = await imageCompression(imageFile, options)
    //     return compressedFile
    // }, []);

    // const handleRemoveFile = (index) => {
    //     setSelectFile((prevFiles) => {
    //         const updatedFiles = [...prevFiles];
    //         updatedFiles.splice(index, 1); // Remove the file at the specified index
    //         return updatedFiles;
    //     });
    // };

    // const ViewImage = useCallback(() => {
    //     setImageShowFlag(1)
    //     setImageShow(true)
    // }, [])

    // const handleClose = useCallback(() => {
    //     setImageShowFlag(0)
    //     setImageShow(false)
    // }, [])

    /*** usecallback function for form submitting */
    const submitComplaint = useCallback((e) => {
        e.preventDefault();

        /**** insert function for use call back     */
        const InsertFun = async (postData) => {
            const result = await axioslogin.post('/requestRegister', postData);
            return result.data
        }
        //** Inset api for detail */
        const InsertFundetl = async (insertid) => {
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
            return result.data
        }

        //** Inset api for Approval */
        const InsertApproval = async (reqno) => {

            //Postdata department have incharge and Hod then check isicharge or ishod
            const ApprovalData = {
                req_slno: reqno,
                incharge_req: 0,
                hod_req: 1,
                dms_req: depttype === 1 ? 1 : 0,
                ms_approve_req: depttype === 1 ? 1 : 0,
                manag_operation_req: 1,
                senior_manage_req: 1,
                cao_approve_req: 1,
                ed_approve_req: null,
                incharge_user: isIncharge === 1 ? id : ishod === 1 ? id : null,
                hod_user: null,
                incharge_approve: isIncharge === 1 ? 1 : ishod === 1 ? 1 : null,
                hod_approve: null,
                incharge_apprv_date: isIncharge === 1 ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : ishod === 1 ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : null,
                hod_approve_date: null,
            }
            //Postdata department have incharge and Hod then check isicharge or ishod
            const ApprovalDataNoInch = {
                req_slno: reqno,
                incharge_req: 1,
                hod_req: 1,
                dms_req: depttype === 1 ? 1 : 0,
                ms_approve_req: depttype === 1 ? 1 : 0,
                manag_operation_req: 1,
                senior_manage_req: 1,
                cao_approve_req: 1,
                ed_approve_req: null,
                incharge_user: object2.length === 0 ? id : null,
                hod_user: object1.length === 0 ? id : null,
                incharge_approve: object2.length === 0 ? 1 : null,
                hod_approve: object1.length === 0 ? 1 : null,
                incharge_apprv_date: object2.length === 0 ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : null,
                hod_approve_date: object1.length === 0 ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : null,
            }
            //Postdata department have incharge and Hod then check isicharge or ishod
            const ApprDataCheckHod = {
                req_slno: reqno,
                incharge_req: 1,
                hod_req: object1.length === 0 ? 0 : 1,
                dms_req: depttype === 1 ? 1 : 0,
                ms_approve_req: depttype === 1 ? 1 : 0,
                manag_operation_req: 1,
                senior_manage_req: 1,
                cao_approve_req: 1,
                ed_approve_req: null,
                incharge_user: null,
                hod_user: ishod === 1 ? id : null,
                incharge_approve: null,
                hod_approve: object1.length === 0 ? 1 : null,
                incharge_apprv_date: null,
                hod_approve_date: null,
            }

            if (isIncharge === 0 && ishod === 0) {

                const result = await axioslogin.post('/requestRegister/postReqApproval', ApprovalDataNoInch);
                return result.data

            }
            else if (isIncharge === 1) {
                const result = await axioslogin.post('/requestRegister/postReqApproval', ApprDataCheckHod);
                return result.data
            }
            else {
                const result = await axioslogin.post('/requestRegister/postReqApproval', ApprovalData);
                return result.data
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
                const result = await axioslogin.post('/requestRegister/dataCollectDetailInsert', postdataDetl);
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
            return result.data
        }

        /***  update function for use call back     */
        const updateReqDetl = async (dataPost) => {
            if (getDataDetl.length === dataPost.length) {
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
        }

        // const FileInsert = async (selectFile, insetid) => {
        //     try {
        //         const formData = new FormData();
        //         formData.append('id', insetid);
        //         for (const file of selectFile) {
        //             if (file.type.startsWith('image')) {
        //                 const compressedFile = await handleImageUpload(file);
        //                 formData.append('files', compressedFile, compressedFile.name);
        //             } else {
        //                 formData.append('files', file, file.name);
        //             }
        //         }
        //         // Use the Axios instance and endpoint that matches your server setup
        //         const result = await axioslogin.post('/CrfImageUpload/crfRegistration', formData, {
        //             headers: {
        //                 'Content-Type': 'multipart/form-data',
        //             },
        //         });

        //         const { success, message } = result.data;
        //         if (success === 1) {
        //             succesNotify(message);
        //             reset();
        //         } else {
        //             warningNotify(message);
        //         }
        //     } catch (error) {
        //         warningNotify('An error occurred during file upload.');

        //     }
        // }


        //** Call insert and detail api by using then. for getting insert id */
        if (value === 0) {
            InsertFun(postData).then((values) => {
                const { success, message, insetid } = values
                if (success === 1) {
                    InsertApproval(insetid).then((value) => {
                        const { success, message } = value
                        if (success === 1) {
                            if (dataPost.length !== 0) {
                                InsertFundetl(insetid).then((valu) => {
                                    const { message, success } = valu;
                                    if (success === 1) {
                                        // if (selectFile.length !== 0) {
                                        //     FileInsert(selectFile, insetid)
                                        // }
                                        succesNotify(message)
                                        reset()
                                        setCount(count + 1)
                                    }
                                    else {
                                        infoNotify("Datas Not Inserted in Detail Table")
                                    }
                                })
                            }

                            else {
                                // if (selectFile.length !== 0) {
                                //     FileInsert(selectFile, insetid)
                                // }
                                succesNotify(message)
                                setCount(count + 1)
                                reset()
                            }
                        }
                        else {
                            infoNotify(message)
                        }
                    })
                }
                else if (success === 2) {
                    infoNotify(message)
                }
                else {
                    infoNotify(message)
                }
            })
        }
        else {
            updateFun(patchData).then((values) => {
                const { success, message } = values
                if (success === 2) {
                    if ((patchInserDetl === 1) && (dataPost.length !== 0)) {
                        PatchInsertFundetl(reqSlno)
                        reset()
                    }
                    else if (dataPost.length !== 0) {
                        updateReqDetl(dataPost)
                        reset()
                    } else {
                        succesNotify(message)
                        setCount(count + 1)
                        reset()
                    }
                }
                else {
                    infoNotify(message)
                    reset()
                }
            })
        }
    }, [postData, dataPost, id, count, object1, object2, patchData, reqSlno, reset,
        patchInserDetl, value, ishod, isIncharge, depttype, getDataDetl])

    // const [imageshowFlag, setImageShowFlag] = useState(0)

    // const [imageshow, setImageShow] = useState(false)

    // const [imgFlag, setImgFlag] = useState(0)

    // const [imagearray, setImageArry] = useState([])

    //Data set for edit
    const rowSelect = useCallback((params) => {
        setValue(1);
        const data = params.api.getSelectedRows()
        const { req_slno, actual_requirement, location, request_dept_slno, category,
            needed, request_deptsec_slno, remarks, expected_date, total_approx_cost,
        } = data[0]
        setActual_require(actual_requirement)
        setNeeded(needed)
        setLocation(location)
        setRemarks(remarks)
        setdept(request_dept_slno)
        setdeptSec(request_deptsec_slno)
        setStartdate(format(new Date(expected_date), "yyyy-MM-dd"))
        setTotalCost(total_approx_cost)
        setCategory(category)
        setReqSlno(req_slno)
        // setImgFlag(image_status)

        const InsertFun = async (req_slno) => {
            const result = await axioslogin.get(`/requestRegister/getItemList/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setdataPost(data)
                setGetDataDetl(data)
                setTableDis(1)
                setEstimate(true)
                setDisEstimate(1)
            }
            else {
                setTableDis(0)
                setPatchInserDetl(1)
            }
        }

        // const getImage = async (req_slno) => {
        //     const result = await axioslogin.get(`/CrfImageUpload/crfRegimageGet/${req_slno}`)
        //     const { success, data } = result.data
        //     if (success === 1) {
        //         const fileNames = data;
        //         const fileUrls = fileNames.map((fileName) => {
        //             return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
        //         });
        //         setImageArry(fileUrls);
        //         setImgFlag(image_status)
        //     }
        // }
        InsertFun(req_slno)
        // getImage(req_slno)
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
            <CardMaster
                title="Common Request Form"
                submit={submitComplaint}
                close={backtoSetting}
                refresh={refreshWindow}
            >
                {/* {imageshowFlag === 1 ? <ReqImageDisplayModal open={imageshow} handleClose={handleClose} images={imagearray} /> : null} */}
                <Box sx={{ width: "100%" }}>
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
                                <CustomPaperTitle heading="Purpose" />
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
                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', }
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
                                        <DeptSecUnderDept value={deptSec} setValue={setdeptSec} dept={dept} />
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{
                                width: "50%",
                                display: "flex",
                                flexDirection: "column"
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
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                pl: 1
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

                            <Box sx={{
                                width: "25%",
                                display: "flex",
                                flexDirection: "column", pt: 3.5, pl: 1
                            }}>

                                <CusCheckBox
                                    variant="outlined"
                                    color="danger"
                                    size="md"
                                    name="estimate"
                                    label="Requirment Details"
                                    value={estimate}
                                    onCheked={updateEstimate}
                                    checked={estimate}
                                />

                            </Box>
                        </Box>
                    </Paper>

                    {/* 3rd section starts */}


                    {
                        disEstimate === 1 ?
                            <Paper sx={{
                                width: '100%',
                                mt: 0.8
                            }} variant='outlined'>
                                {
                                    detldept === 1 ?
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
                                        </Box>
                                        : <Box sx={{
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
                                                    width: "7%",
                                                    pt: 2
                                                }}>
                                                    <IconButton variant="outlined" color="primary" onClick={AddItemUser}>
                                                        <MdOutlineAddCircleOutline size={30} />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </Box>
                                }

                                {tableDis === 1 ?
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}>
                                        {
                                            detldept === 1 ?
                                                <ReqRegistItemCmpt
                                                    columnDefs={column}
                                                    tableData={dataPost}
                                                    detldept={detldept}
                                                /> : <ReqRegistItemCmpt
                                                    columnDefs={columnDeptDetl}
                                                    tableData={dataPost}
                                                    detldept={detldept}
                                                />
                                        }
                                    </Box> : null}
                            </Paper> : null
                    }

                    {/** 4th Section*/}
                    <Paper sx={{
                        width: '100%',
                        mt: 0.8
                    }} variant='outlined'>
                        <Box sx={{
                            width: "80%",
                            display: "flex",
                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', }
                        }}>
                            <Box sx={{
                                width: "20%",
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
                                        name="startdate"
                                        value={startdate}
                                        onchange={updateExpectedDate}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{
                                width: "80%",
                                display: "flex", flex: 1, pl: 2,
                                flexDirection: "row"
                            }}>
                                <Box sx={{
                                    width: "50%",
                                    display: "flex", pl: 2, pt: 4,
                                    flexDirection: "column"
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
                                {
                                    emergency === true ?
                                        <Box sx={{
                                            width: "50%",
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
                                        </Box> : null
                                }

                                {
                                    detldept === 1 ?
                                        <Box sx={{
                                            width: "25%",
                                            display: "flex",
                                            flexDirection: "column",
                                            pr: 1, pt: 0.5
                                        }}>
                                            <CustomPaperTitle heading="Total Approx.Cost" />
                                            <TextFieldCustom
                                                type="text"
                                                size="sm"
                                                name="totalApproxCost"
                                                value={totalApproxCost}
                                                disabled={true}
                                            />

                                        </Box> : null
                                }
                            </Box>
                            {/* <Box sx={{ display: 'flex', width: '200px', pt: 1 }}>
                                <Box sx={{ pt: 1 }}>
                                    <label htmlFor="file-input">
                                        <CustomeToolTip title="upload">
                                            <IconButton color="primary" aria-label="upload file" component="span">
                                                <UploadFileIcon />
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
                            </Box> */}

                            {/* {imgFlag === 1 ? <Box sx={{ display: 'flex', width: "10%", height: 55, pt: 3 }}>
                                <Button onClick={ViewImage} variant="contained"
                                    size="small" color="primary">View Image</Button>

                            </Box> : null} */}
                        </Box>
                    </Paper>
                </Box >
            </CardMaster >
            < Paper square elevation={0} sx={{
                p: 1, pt: 0
            }} >
                <ReqRegisterTable count={count} rowSelect={rowSelect} />
            </Paper >
        </Fragment>
    )
}

export default memo(ReqRegistration)