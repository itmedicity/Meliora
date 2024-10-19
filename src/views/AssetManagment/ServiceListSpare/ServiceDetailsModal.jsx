import { Box, Button, Checkbox, Chip, CssVarsProvider, Input, Modal, Textarea, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import { axioslogin } from 'src/views/Axios/Axios';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action';
import SupplierDetailsAutoComplte from '../ItemDetailEnter/SupplierDetailsAutoComplte';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import ComFileView from 'src/views/ComManagement/CmFileView/ComFileView';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import EmployeeSelectJoyAutoComp from 'src/views/CommonSelectCode/EmployeeSelectJoyAutoComp';
import imageCompression from 'browser-image-compression';
import CloseIcon from '@mui/icons-material/Close';
import ServiceFileAttach from './ServiceFileAttach';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CmSpareList from 'src/views/ComManagement/CmComponent/CmSpareList';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { addDays, format } from 'date-fns';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ItemQrDisplayModel from '../ItemListView/ItemQrDisplayModel';
import AmServiceStatus from 'src/views/CommonSelectCode/AmServiceStatus';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import DeveloperBoardOutlinedIcon from '@mui/icons-material/DeveloperBoardOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import serviceFold from '../../../../src/assets/images/assetservice/serviceFold.png'
import ServiceDocumentModal from './ServiceDocumentModal';



const ServiceDetailsModal = ({ open, setOpen, setFlag, serviceDetails, count, setCount }) => {


    const dispatch = useDispatch();
    const [complDetails, setcomplDetails] = useState([])
    const [empName, setempname] = useState([])
    const [supplierSelect, setsupplierSelect] = useState(0)
    const [SupplierDetails, setSupplierDetails] = useState([])
    const [spareDetails, setSpareDetails] = useState([])
    const [serviceHoldFlag, setServiceHoldFlag] = useState(1)
    const [addToStockFlag, setaddToStockFlag] = useState(0)
    const [transfrToCondmflag, settransfrToCondmflag] = useState(0)
    const [image, setimage] = useState(0)
    const [fileDetails, setfileDetails] = useState([])
    const [imageUrls, setImageUrls] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageViewOpen, setimageViewOpen] = useState(false)
    const [alldetailsService, setAlldetailsService] = useState([])
    const [spareCheckEmp, setspareCheckEmp] = useState(0)
    const [selectFile, setSelectFile] = useState([]);
    const [imageServiceFlag, setimageServiceFlag] = useState(0)
    const [imageServiceUrls, setImageServiceUrls] = useState([]);
    const [serviceimageViewOpen, setServiceimageViewOpen] = useState(false)
    const [servicefileDetails, setServicefileDetails] = useState([])
    const [deptServiceSlno, setDeptServiceSlno] = useState([])
    const [deptServDetailsData, setDeptServDetailsData] = useState([])
    const [editFlag, setEditFlag] = useState(0)
    const [sparez, setSparez] = useState(0)
    const [spareName, setSpareName] = useState('')
    const [spareData, setSpareData] = useState([])
    const [warrentyOrGuaranteeDetl, setwarrentyOrGuaranteeDetl] = useState([])
    const [selected, setSelected] = useState('');
    const [amcCmcDetails, setAmcCmcDetails] = useState([])
    const [amcCmcSelected, setAmcCmcSelected] = useState('');
    const [dueDate, setDueDate] = useState('')
    const [dueDateCount, setdueDateCount] = useState(0)
    const [instalationDate, setinstalationDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [pmInsercheckFlag, setpmInsercheckFlag] = useState(0)
    const [pmFlag, setPmFlag] = useState(0)
    const [qrFlag, setQrFlag] = useState(0)
    const [selectedData, setSelectedData] = useState([])
    const [daysEnable, setdaysEnable] = useState(0)
    const [qrOpen, setqrOpen] = useState(false)
    const [cmc_status, setcmc_status] = useState(0)
    const [amc_status, setamc_status] = useState(0)
    const [amc_slno, setamc_slno] = useState(null)
    const [serviceStatus, setServiceStatus] = useState(0)
    const currentDateAndTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const [ticketsServicedDetails, setTicketsServicedDetails] = useState([])
    const [checked, setChecked] = useState(supplierSelect !== 0 ? 1 : 0);
    const [serviceCheck, setserviceCheck] = useState(0)
    const [notserviceCheck, setnotserviceCheck] = useState(0)
    const [deptservicecheck, setdeptservicecheck] = useState(1)
    const [serviceStatusCheck, setserviceStatusCheck] = useState(1)
    const [billdetailsView, setBilldetailsView] = useState([]);
    const [amcCmcDocuments, setamcCmcDocuments] = useState([])
    const [leaseDocuments, setleaseDocuments] = useState([])
    const [deptServiceempList, setdeptServiceempList] = useState({});

    const { item_name, category_name, spare_asset_no, spare_asset_no_only, item_asset_no, item_asset_no_only, asset_spare_slno, item_custodian_dept,
        item_custodian_dept_sec, am_item_map_slno, spare_custodian_dept, spare_custodian_dept_sec, am_spare_item_map_slno, amccmc_slno, am_lease_mast_slno,
        am_bill_mastslno, am_bill_no, am_bill_date, am_bill_amount, bill_supplier_name, address, ph_two, ph_one, troll_free, wargar_to_date, wargar_from_date,
        lease_suppliername, lease_amount, lease_todate, amc_cmc_suppliername, to_date, from_date, lease_fromdate, guarenty_status, warrenty_status } = serviceDetails
    const formattedItemNo = spare_asset_no_only !== undefined ? spare_asset_no_only : item_asset_no_only !== undefined ? item_asset_no_only : 0;
    const ItemPrefix = spare_asset_no !== undefined ? spare_asset_no : item_asset_no !== undefined ? item_asset_no : 0;


    console.log("serviceDetails :: serviceDetails", serviceDetails);


    const handleChange = (event) => {
        setChecked(event.target.checked ? 1 : 0);
    };

    const handleServiceChange = (event) => {
        setserviceCheck(event.target.checked ? 1 : 0);
    };

    const handleNotServiceChange = (event) => {
        setnotserviceCheck(event.target.checked ? 1 : 0);
    };
    const handleDeptServiceChange = (event) => {
        setdeptservicecheck(event.target.checked ? 1 : 0);
    };
    const handleServiceStatusChange = (event) => {
        setserviceStatusCheck(event.target.checked ? 1 : 0);
    };

    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const [servicee, SetService] = useState({
        am_service_details_slno: '',
        dept_service_date: '',
        expcted_service_date: '',
        expcted_service_remarks: '',
        service_on_hold_reason: '',
        service_done_status: '',
        condm_transfr_status: '',
        condm_transfr_emp: '',
        condm_transf_remarks: '',
        add_to_store_date: '',
        add_to_store_user: '',
        service_close_status: '',
        suppl_serviced_date: '',
        suppl_serviced_remarks: '',
        suppl_concted_emp: '',
        create_user: '',
        edit_user: ''
    })
    const { am_service_details_slno, service_asset_spare, complaint_slno, dept_service_date,
        supplier_slno, expcted_service_date, expcted_service_remarks, service_on_hold_reason, service_done_status, condm_transfr_status,
        condm_transfr_emp, condm_transf_remarks, add_to_store_user, add_to_store_date, service_close_status, suppl_serviced_date, suppl_serviced_remarks, suppl_concted_emp,
        create_user, edit_user } = servicee

    const [supplContctEmp, setsupplContctEmp] = useState(suppl_concted_emp === null ? 0 : suppl_concted_emp)
    const [callSupplierFlag, setcallSupplierFlag] = useState(supplContctEmp === null ? 0 : 1)
    const [insertId, setinsertId] = useState(am_service_details_slno)

    const [deptServiceDetails, setdeptServiceDetails] = useState({
        serviced_emp_detail_slno: '',
        serviced_emp: '',
        serviced_date: '',
        service_issues_identified: '',
        serviced_issue_remarks: '',
        serviced_create_user: '',
        serviced_edit_user: ''
    })
    const { serviced_emp_detail_slno, serviced_emp, serviced_date, service_issues_identified, serviced_issue_remarks, serviced_create_user,
        serviced_edit_user } = deptServiceDetails

    const Reset = useCallback(() => {
        const frmdata = {
            serviced_emp_detail_slno: '',
            serviced_date: '',
            service_issues_identified: '',
            serviced_issue_remarks: '',

        }
        setdeptServiceDetails(frmdata)
        setspareCheckEmp(0)
    }, [])

    const UpdateinstalationDate = useCallback((e) => {
        setinstalationDate(e.target.value)
        setPmFlag(0)
    }, [])

    const handleCheckboxChange = (type) => {
        setSelected(type); // Only one checkbox should be selected at a time
    };
    const handleAmcCmcCheckboxChange = (type) => {
        setAmcCmcSelected(type); // Only one checkbox should be selected at a time
    };
    const UpdateServiceDeptDetails = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setdeptServiceDetails({ ...deptServiceDetails, [e.target.name]: value })
        },
        [deptServiceDetails],
    )

    const Close = useCallback(() => {
        setOpen(false)
        setFlag(0)
        const frmdata = {
            am_service_details_slno: '',
            dept_service_date: '',
            expcted_service_date: '',
            expcted_service_remarks: '',
            service_on_hold_reason: '',
            service_done_status: '',
            condm_transfr_status: '',
            condm_transfr_emp: '',
            condm_transf_remarks: '',
            add_to_store_user: '',
            add_to_store_date: '',
            service_close_status: '',
            suppl_serviced_date: '',
            suppl_serviced_remarks: '',
            suppl_concted_emp: '',
            create_user: '',
            edit_user: ''
        }
        SetService(frmdata)
        setcomplDetails([])
        setempname([])
        setsupplierSelect(0)
        setSupplierDetails([])
        setSpareDetails([])
        setServiceHoldFlag(0)
        setaddToStockFlag(0)
        settransfrToCondmflag(0)
        setimage(0)
        setfileDetails([])
        setImageUrls([])
        setSelectedImages([])
        setimageViewOpen(0)
        setAlldetailsService([])
    }, [setFlag, setOpen])

    const UpdateServicedtl = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            SetService({ ...servicee, [e.target.name]: value })
        },
        [servicee],
    )

    const callSupplier = useCallback(() => {
        setcallSupplierFlag(prevFlag => (prevFlag === 1 ? 0 : 1));
    }, []);

    // const holdService = useCallback(() => {
    //     setServiceHoldFlag(prevFlag => (prevFlag === 1 ? 0 : 1));
    // }, []);

    // const DoneService = useCallback(() => {
    //     setServiceDoneFlag(prevFlag => (prevFlag === 1 ? 0 : 1));
    // }, []);

    // const ServiceByEmp = useCallback(() => {
    //     setservicedByEmp(prevFlag => (prevFlag === 1 ? 0 : 1));
    // }, []);


    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })

    useEffect(() => {
        dispatch(getDepartSecemployee(empsecid))
    }, [dispatch, empsecid])


    const SpareData = useMemo(() => {
        return {
            am_spare_item_map_slno: spare_asset_no_only
        }
    }, [spare_asset_no_only])

    const AssetData = useMemo(() => {
        return {
            item_asset_no: item_asset_no,
            item_asset_no_only: item_asset_no_only

        }
    }, [item_asset_no, item_asset_no_only])



    useEffect(() => {
        if (supplierSelect !== 0) {
            const getSelectedSupplierDetails = async () => {
                const result = await axioslogin.get(`ItBillType/getSupplierData/${supplierSelect}`);
                const { success, data } = result.data
                if (success === 1) {
                    setSupplierDetails(data)
                } else {
                    setSupplierDetails([])
                }
            }
            getSelectedSupplierDetails()
        }
        else {
            setSupplierDetails([])
        }
    }, [supplierSelect])

    useEffect(() => {
        if (am_item_map_slno !== 0) {
            const getWarrentyOrGuaranteeDetl = async () => {
                const result = await axioslogin.get(`/ItemMapDetails/WarentGarantInsertOrNot/${am_item_map_slno}`);
                const { success, data } = result.data
                if (success === 1) {
                    const { warrenty_status, guarenty_status } = data[0]
                    if (warrenty_status === 1) {
                        setSelected('warranty');
                    } else if (guarenty_status === 1) {
                        setSelected('guarantee');
                    }
                    setwarrentyOrGuaranteeDetl(data)
                } else {
                    setwarrentyOrGuaranteeDetl([])
                }
            }
            getWarrentyOrGuaranteeDetl()
        }
        else {
            setwarrentyOrGuaranteeDetl([])
        }
    }, [am_item_map_slno,])

    useEffect(() => {
        const AmcCmcDetails = async () => {
            const result = await axioslogin.get(`/ItemMapDetails/AmcPmInsertOrNot/${am_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                const { amc_status, instalation_date, due_date, cmc_status, amc_slno } = data[0]
                if (amc_status === 1) {
                    setAmcCmcSelected('Amc');
                } else if (cmc_status === 1) {
                    setAmcCmcSelected('Cmc');
                }
                setAmcCmcDetails(data)
                setinstalationDate(instalation_date)
                setDueDate(due_date)
                setpmInsercheckFlag(1)
                setcmc_status(cmc_status)
                setamc_status(amc_status)
                setamc_slno(amc_slno)
            }
            else {
                setAmcCmcDetails([])
            }
        }
        AmcCmcDetails()
    }, [am_item_map_slno])





    useEffect(() => {
        if (am_item_map_slno !== undefined) {
            const getAllSpare = async (am_item_map_slno) => {
                const result = await axioslogin.get(`/complaintreg/SpareDetailsUndercomplaint/${am_item_map_slno}`);
                const { success, data } = result.data
                if (success === 1) {
                    setSpareDetails(data)
                }
                else {
                    setSpareDetails([])
                }
            }
            getAllSpare(am_item_map_slno)
        } else {
            setSpareDetails([])
        }
    }, [am_item_map_slno, count])





    useEffect(() => {
        const getcomplaintDetails = async () => {
            try {
                const result = await axioslogin.post('/assetSpareDetails/getcomplaintDetails', SpareData)
                const { success, data } = result.data
                const DataofIndex = data[0]
                if (success === 2) {
                    setcomplDetails([DataofIndex]);
                    const resultEmployees = await axioslogin.get(`Rectifycomplit/getAssignEmps/${data[0].cm_complait_slno}`)
                    const { success: empSuccess, data: empData } = resultEmployees.data
                    if (empSuccess === 1) {
                        setempname(empData)
                    } else {
                        setempname([])
                    }
                } else {
                    setcomplDetails([])
                }
            } catch (error) {
            }
        }

        const getAsssetcomplaintDetails = async () => {
            try {
                const result = await axioslogin.post('/assetSpareDetails/getAssetcomplaintDetails', AssetData)
                const { success, data } = result.data
                const DataofIndex = data[0]
                if (success === 2) {
                    setcomplDetails([DataofIndex]);
                    const resultEmployees = await axioslogin.get(`Rectifycomplit/getAssignEmps/${data[0].cm_complait_slno}`)
                    const { success: empSuccess, data: empData } = resultEmployees.data
                    if (empSuccess === 1) {
                        setempname(empData)
                    } else {
                        setempname([])
                    }
                } else {
                    setcomplDetails([])
                }
            } catch (error) {
            }
        }
        if (spare_asset_no_only !== undefined) {
            if (SpareData) {
                getcomplaintDetails()
            }
        }
        else {
            if (AssetData) {
                getAsssetcomplaintDetails()
            }
        }
    }, [SpareData, AssetData])



    useEffect(() => {
        if (alldetailsService.length !== 0) {
            const getAssignedEmployees = async () => {
                const updatedEmployees = {};
                for (let complaint of alldetailsService) {
                    const result = await axioslogin.get(`Rectifycomplit/getAssignEmps/${complaint.complaint_slno}`);
                    const { success, data } = result.data;
                    if (success === 1) {
                        updatedEmployees[complaint.complaint_slno] = data;
                    } else {
                        updatedEmployees[complaint.complaint_slno] = [];
                    }
                }
                setTicketsServicedDetails(updatedEmployees);
            };
            getAssignedEmployees();
        } else {

        }
    }, [alldetailsService]);




    const serviceSparee = useCallback((val) => {
        const { am_spare_item_map_slno, asset_spare_slno } = val
        const patchdata = {
            delete_user: id,
            asset_spare_slno: asset_spare_slno,
            am_spare_item_map_slno: am_spare_item_map_slno
        }
        const ServiceSpareUpdate = async (patchdata) => {
            const result = await axioslogin.patch('/ItemMapDetails/spareService', patchdata);
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
            } else {
                warningNotify(message)
                setCount(count + 1)
            }
        }
        ServiceSpareUpdate(patchdata)
    }, [id, setCount, count])

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

    const PostData = useMemo(() => {
        return {
            service_item_slno: formattedItemNo,
            service_asset_spare: ItemPrefix,
            complaint_slno: complDetails?.[0]?.complaint_slno || null,
            serviced_emp_details_slno: deptServiceSlno.length === 0 ? null : deptServiceSlno,
            supplier_slno: supplierSelect === 0 ? null : supplierSelect,
            expcted_service_date: expcted_service_date === '' ? null : expcted_service_date,
            expcted_service_remarks: expcted_service_remarks === '' ? null : expcted_service_remarks,
            service_on_hold_reason: service_on_hold_reason === '' ? null : service_on_hold_reason,
            service_hold: serviceStatus === '' ? null : serviceStatus,
            service_done_status: addToStockFlag === 1 ? 1 : 0,
            condm_transfr_status: transfrToCondmflag === 1 ? 1 : 0,
            condm_transfr_emp: transfrToCondmflag === 1 ? id : null,
            condm_transf_remarks: condm_transf_remarks !== '' ? condm_transf_remarks : null,
            add_to_store_user: addToStockFlag === 1 ? id : null,
            add_to_store_date: addToStockFlag === 1 ? currentDateAndTime : null,
            service_close_status: 0,
            suppl_serviced_date: suppl_serviced_date === '' ? null : suppl_serviced_date,
            suppl_serviced_remarks: suppl_serviced_remarks === '' ? null : suppl_serviced_remarks,
            suppl_concted_emp: supplContctEmp === 0 ? null : supplContctEmp,
            create_user: id
        }
    }, [formattedItemNo, ItemPrefix, service_on_hold_reason, transfrToCondmflag, addToStockFlag, expcted_service_date, expcted_service_remarks,
        supplierSelect, suppl_serviced_date, suppl_serviced_remarks, supplContctEmp, serviceStatus, currentDateAndTime, deptServiceSlno, condm_transf_remarks, id])

    const PatchData = useMemo(() => {
        return {
            am_service_details_slno: am_service_details_slno,
            service_item_slno: formattedItemNo,
            service_asset_spare: ItemPrefix,
            complaint_slno: complDetails?.[0]?.complaint_slno || null,
            serviced_emp_details_slno: deptServiceSlno.length === 0 ? null : deptServiceSlno === 0 ? null : deptServiceSlno,
            supplier_slno: supplierSelect === 0 ? null : supplierSelect,
            expcted_service_date: expcted_service_date === '' ? null : expcted_service_date,
            expcted_service_remarks: expcted_service_remarks === '' ? null : expcted_service_remarks,
            service_on_hold_reason: service_on_hold_reason === '' ? null : service_on_hold_reason,
            service_hold: serviceStatus === '' ? null : serviceStatus,
            service_done_status: addToStockFlag === 1 ? 1 : 0,
            condm_transfr_status: transfrToCondmflag === 1 ? 1 : 0,
            condm_transfr_emp: transfrToCondmflag === 1 ? id : null,
            condm_transf_remarks: condm_transf_remarks === '' ? null : condm_transf_remarks,
            add_to_store_user: addToStockFlag === 1 ? id : null,
            add_to_store_date: addToStockFlag === 1 ? currentDateAndTime : null,
            service_close_status: 0,
            suppl_serviced_date: suppl_serviced_date === '' ? null : suppl_serviced_date,
            suppl_serviced_remarks: suppl_serviced_remarks === '' ? null : suppl_serviced_remarks,
            suppl_concted_emp: supplContctEmp === 0 ? null : supplContctEmp,
            edit_user: id
        }
    }, [am_service_details_slno, formattedItemNo, ItemPrefix, spareCheckEmp, dept_service_date, service_on_hold_reason, condm_transf_remarks,
        transfrToCondmflag, supplierSelect, addToStockFlag, expcted_service_date, expcted_service_remarks, suppl_serviced_date, suppl_serviced_remarks,
        supplContctEmp, serviceStatus, currentDateAndTime, deptServiceSlno, complDetails?.[0]?.complaint_slno, id]);

    const PostDeptServiceDetails = useMemo(() => {
        return {
            serviced_emp: spareCheckEmp === 0 ? null : spareCheckEmp,
            serviced_date: serviced_date === '' ? null : serviced_date,
            service_issues_identified: service_issues_identified === '' ? null : service_issues_identified,
            serviced_issue_remarks: serviced_issue_remarks === '' ? null : serviced_issue_remarks,
            serviced_create_user: id
        }
    }, [spareCheckEmp, serviced_date, service_issues_identified, serviced_issue_remarks, id,]);


    const PatchDeptServiceDetails = useMemo(() => {
        return {
            serviced_emp_detail_slno: serviced_emp_detail_slno,
            serviced_emp: spareCheckEmp === 0 ? null : spareCheckEmp,
            serviced_date: serviced_date === '' ? null : serviced_date,
            service_issues_identified: service_issues_identified === '' ? null : service_issues_identified,
            serviced_issue_remarks: serviced_issue_remarks === '' ? null : serviced_issue_remarks,
            serviced_edit_user: id
        }
    }, [serviced_emp_detail_slno, spareCheckEmp, serviced_date, service_issues_identified, serviced_issue_remarks, id,]);

    const AddDeptServiceDetails = useCallback(async (e) => {
        e.preventDefault();
        if (editFlag === 1 && serviced_emp_detail_slno !== '') {
            const UpdateDeptServiceDetails = async (PatchDeptServiceDetails) => {
                const result = await axioslogin.patch(`/assetSpareDetails/servicedEmpDetailsUpdate`, PatchDeptServiceDetails);
                const { message, success } = result.data;
                if (success === 2) {
                    succesNotify(message)
                    setCount(count + 1)
                    setEditFlag(0)
                    Reset()
                }
            }
            UpdateDeptServiceDetails(PatchDeptServiceDetails)
        }
        else {
            const AddDetailsEmp = async () => {
                try {
                    const result = await axioslogin.post(`/assetSpareDetails/servicedEmpDetailsInsert`, PostDeptServiceDetails);
                    return result.data;
                } catch (error) {
                    return { success: 0, message: "Failed to insert service employee details" };
                }
            };
            const UpdateServiceDetails = async (newServicedEmpId) => {
                // Use the deptServiceSlno state directly
                let currentServicedEmpIdSlno = deptServiceSlno || []; // Use state directly

                // Ensure currentServicedEmpIdSlno is an array
                if (typeof currentServicedEmpIdSlno === 'string') {
                    currentServicedEmpIdSlno = JSON.parse(currentServicedEmpIdSlno);
                }

                // Check if it's still not an array, initialize as an empty array
                // if (!Array.isArray(currentServicedEmpIdSlno)) {
                //     currentServicedEmpIdSlno = [];
                // }
                if (!Array.isArray(currentServicedEmpIdSlno)) {
                    currentServicedEmpIdSlno = [currentServicedEmpIdSlno];  // Wrap in array if not already
                }

                currentServicedEmpIdSlno.push(newServicedEmpId);

                const updatedServiceDetails = {
                    ...PatchData,
                    serviced_emp_details_slno: JSON.stringify(currentServicedEmpIdSlno),
                };
                try {
                    const result = await axioslogin.patch(`/assetSpareDetails/serviceDetailsUpdate`, updatedServiceDetails);
                    return result.data;
                } catch (error) {
                    return { success: 0, message: "Failed to update service details" };
                }
            };
            const AddDetails = async (insertId) => {
                const PostServiceDetails = {
                    ...PostData,
                    // serviced_emp_details_slno: insertId === 0 ? null : [insertId],
                    serviced_emp_details_slno: insertId === 0 ? null : JSON.stringify([insertId])
                };

                try {
                    const result = await axioslogin.post(`/assetSpareDetails/serviceDetailsInsert`, PostServiceDetails);
                    return result.data;
                } catch (error) {
                    return { success: 0, message: "Failed to insert service details" };
                }
            };
            const empInsertResult = await AddDetailsEmp();
            const { success: empSuccess, insertId: newEmpIdSlno } = empInsertResult;

            if (empSuccess === 1) {
                if (am_service_details_slno !== '') {
                    const serviceUpdateResult = await UpdateServiceDetails(newEmpIdSlno);
                    const { success: updateSuccess, message: updateMessage } = serviceUpdateResult;
                    if (updateSuccess === 2) {
                        succesNotify("Department Service Details Added Successfully");
                        setCount(count + 1);
                        setEditFlag(0)
                        Reset()

                    } else {
                        warningNotify(updateMessage);
                    }
                } else {
                    // Handle case when am_service_details_slno is empty
                    const serviceInsertResult = await AddDetails(newEmpIdSlno);
                    const { success: serviceSuccess, message: serviceMessage } = serviceInsertResult;

                    if (serviceSuccess === 1) {
                        succesNotify("Department Service Details Added Successfully");
                        setCount(count + 1);
                        setEditFlag(0)
                        Reset()

                    } else {
                        warningNotify(serviceMessage);
                    }
                }
            } else {
                warningNotify("Failed to insert service employee details.");
            }

        }
    }, [PostDeptServiceDetails, PostData, PatchData, count, am_service_details_slno, editFlag, serviced_emp_detail_slno, Reset, deptServiceSlno]);

    const searchDeptServiceData = useMemo(() => {
        return {
            serviced_emp_detail_slno: deptServiceSlno,
        }
    }, [deptServiceSlno])

    useEffect(() => {
        if (deptServiceSlno.length !== 0) {
            const getDeptServDetailsData = async () => {
                const result = await axioslogin.post(`assetSpareDetails/getDeptServiceDetailsData`, searchDeptServiceData);
                const { success, data, message } = result.data;
                if (success === 1) {
                    setDeptServDetailsData(data);
                } else {
                    setDeptServDetailsData([]);
                }
            };
            getDeptServDetailsData();
        } else {
            setDeptServDetailsData([]);
        }
    }, [deptServiceSlno, searchDeptServiceData, count]);



    useEffect(() => {
        if (alldetailsService.length !== 0) {
            const getServEmployees = async () => {
                const updatedServEmployees = {};
                for (let deptServiceemp of alldetailsService) {
                    // Create the searchDeptServiceData object for each iteration
                    const searchDeptServiceData = {
                        serviced_emp_detail_slno: deptServiceemp.serviced_emp_details_slno, // Use the current service employee slno
                    };
                    try {
                        const result = await axioslogin.post(`assetSpareDetails/getDeptServiceDetailsData`, searchDeptServiceData);
                        const { success, data } = result.data;
                        if (success === 1) {
                            updatedServEmployees[deptServiceemp.serviced_emp_details_slno] = data;
                        } else {
                            updatedServEmployees[deptServiceemp.serviced_emp_details_slno] = [];
                        }
                    } catch (error) {
                        updatedServEmployees[deptServiceemp.serviced_emp_details_slno] = [];
                        console.error("Error fetching employee details:", error);
                    }
                }
                setdeptServiceempList(updatedServEmployees); // Set the updated list after all requests
            };
            getServEmployees();
        }
    }, [alldetailsService]);


    const rowSelect = useCallback((val) => {
        setEditFlag(1)
        const {
            serviced_emp_detail_slno,
            serviced_emp,
            serviced_date,
            service_issues_identified,
            serviced_issue_remarks
        } = val

        const frmdata = {
            serviced_emp_detail_slno: serviced_emp_detail_slno,
            serviced_date: serviced_date,
            service_issues_identified: service_issues_identified,
            serviced_issue_remarks: serviced_issue_remarks,

        }
        setdeptServiceDetails(frmdata)
        setspareCheckEmp(serviced_emp === null ? '' : serviced_emp)
    }, [])

    const AddServiceDetails = useCallback((e) => {
        e.preventDefault();
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
                const uploadResult = await axioslogin.post('/AmServiceFileUpload/uploadFile/UploadAssetService', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return uploadResult.data;
            } catch (error) {
                warningNotify('An error occurred during file upload.');
            }
        };

        const AddDetails = async (PostData) => {
            const result = await axioslogin.post(`/assetSpareDetails/serviceDetailsInsert`, PostData);
            return result.data
        }

        const UpdateDetails = async (PatchData) => {
            const result = await axioslogin.patch(`/assetSpareDetails/serviceDetailsUpdate`, PatchData);
            return result.data
        }
        if (am_service_details_slno !== '') {
            UpdateDetails(PatchData).then((value) => {
                const { success, message } = value;
                if (success === 2) {
                    if (selectFile.length !== 0) {
                        InsertFile(selectFile, insertId).then((value) => {
                            const { success, message } = value
                            if (success === 1) {
                                succesNotify("Service Details Added With File Attach Successfully")
                                setCount(count + 1);
                                Close()
                            }
                            else {
                                warningNotify(message)
                            }
                        })
                    }
                    else {
                        succesNotify(message)
                        setCount(count + 1);
                        Close()
                    }
                }
                else {

                }
            })
        }
        else {
            AddDetails(PostData).then((value) => {
                const { success, insertId, message } = value;
                if (success === 1) {
                    if (selectFile.length !== 0) {
                        InsertFile(selectFile, insertId).then((value) => {
                            const { success, message } = value
                            if (success === 1) {
                                succesNotify("Service Details Added With File Attach Successfully")
                                setCount(count + 1);
                                Close()
                            }
                            else {
                                warningNotify(message)
                            }
                        })
                    }
                    else {
                        succesNotify(message)
                        setCount(count + 1);
                        Close()
                    }
                }
                else {



                }
            })
        }
    }, [PatchData, PostData, insertId, selectFile, am_service_details_slno])

    // const AddServiceDetails = useCallback(async (e) => {
    //     e.preventDefault();
    //     const InsertFile = async (selectFile, insertId) => {
    //         try {
    //             const formData = new FormData();
    //             formData.append('id', insertId);
    //             for (const file of selectFile) {
    //                 if (file.type.startsWith('image')) {
    //                     const compressedFile = await handleImageUpload(file);
    //                     formData.append('files', compressedFile, compressedFile.name);
    //                 } else {
    //                     formData.append('files', file, file.name);
    //                 }
    //             }
    //             const uploadResult = await axioslogin.post('/AmServiceFileUpload/uploadFile/UploadAssetService', formData, {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //             });
    //             return uploadResult.data;
    //         } catch (error) {
    //             warningNotify('An error occurred during file upload.');
    //             return { success: 0, message: 'File upload failed' }; // Returning a failure response in case of error
    //         }
    //     };

    //     const AddDetails = async (PostData) => {
    //         try {
    //             const result = await axioslogin.post(`/assetSpareDetails/serviceDetailsInsert`, PostData);
    //             return result.data;
    //         } catch (error) {
    //             warningNotify('An error occurred while adding service details.');
    //             return { success: 0, message: 'Service details insertion failed' };
    //         }
    //     };

    //     const UpdateDetails = async (PatchData) => {
    //         try {
    //             const result = await axioslogin.patch(`/assetSpareDetails/serviceDetailsUpdate`, PatchData);
    //             return result.data;
    //         } catch (error) {
    //             warningNotify('An error occurred while updating service details.');
    //             return { success: 0, message: 'Service details update failed' };
    //         }
    //     };

    //     try {
    //         if (am_service_details_slno !== '') {
    //             const updateResult = await UpdateDetails(PatchData);
    //             const { success, message } = updateResult;
    //             if (success === 2) {
    //                 if (selectFile.length !== 0) {
    //                     const fileResult = await InsertFile(selectFile, insertId);
    //                     const { success, message } = fileResult;
    //                     if (success === 1) {
    //                         succesNotify("Service Details Added With File Attach Successfully");
    //                         setCount(count + 1);
    //                         Close();
    //                     } else {
    //                         warningNotify(message);
    //                     }
    //                 } else {
    //                     succesNotify(message);
    //                     setCount(count + 1);
    //                     Close();
    //                 }
    //             } else {
    //                 warningNotify(message);
    //             }
    //         } else {
    //             const addResult = await AddDetails(PostData);
    //             const { success, insertId, message } = addResult;
    //             if (success === 1) {
    //                 if (selectFile.length !== 0) {
    //                     const fileResult = await InsertFile(selectFile, insertId);
    //                     const { success, message } = fileResult;
    //                     if (success === 1) {
    //                         succesNotify("Service Details Added With File Attach Successfully");
    //                         setCount(count + 1);
    //                         Close();
    //                     } else {
    //                         warningNotify(message);
    //                     }
    //                 } else {
    //                     succesNotify(message);
    //                     setCount(count + 1);
    //                     Close();
    //                 }
    //             } else {
    //                 warningNotify(message);
    //             }
    //         }
    //     } catch (error) {
    //         warningNotify('An error occurred while processing the service details.', error);
    //     }
    // }, [PatchData, PostData, insertId, selectFile, am_service_details_slno, count, setCount, Close]);



    const searchData = useMemo(() => {
        return {
            service_item_slno: formattedItemNo,
            service_asset_spare: ItemPrefix
        }
    }, [formattedItemNo, ItemPrefix]);

    useEffect(() => {
        const getallServiceDetails = async () => {
            try {
                const result = await axioslogin.post('/assetSpareDetails/getserviceDetails', searchData);
                const { success, data } = result.data;
                if (success === 2) {
                    if (data.length > 0) {
                        const {
                            am_service_details_slno,
                            serviced_emp_details_slno,
                            service_item_slno,
                            expcted_service_date,
                            service_asset_spare,
                            complaint_slno,
                            condm_transfr_status,
                            service_close_status,
                            service_done_status,
                            service_on_hold_reason,
                            service_hold,
                            expcted_service_remarks,
                            condm_transfr_emp,
                            condm_transf_remarks,
                            add_to_store_user,
                            suppl_concted_emp,
                            suppl_serviced_date,
                            suppl_serviced_remarks,
                            create_user,
                            edit_user,
                            supplier_slno
                        } = data[0];
                        const frmdata = {
                            am_service_details_slno: am_service_details_slno,
                            dept_service_date: dept_service_date,
                            service_item_slno: service_item_slno,
                            expcted_service_date: expcted_service_date,
                            service_asset_spare: service_asset_spare,
                            complaint_slno: complaint_slno,
                            condm_transfr_status: condm_transfr_status,
                            service_close_status: service_close_status,
                            service_done_status: service_done_status,
                            service_on_hold_reason: service_on_hold_reason,
                            expcted_service_remarks: expcted_service_remarks,
                            condm_transfr_emp: condm_transfr_emp,
                            condm_transf_remarks: condm_transf_remarks,
                            add_to_store_user: add_to_store_user,
                            suppl_serviced_date: suppl_serviced_date,
                            suppl_serviced_remarks: suppl_serviced_remarks,
                            create_user: create_user,
                            edit_user: edit_user
                        }
                        SetService(frmdata)
                        setsupplierSelect(supplier_slno)
                        setsupplContctEmp(suppl_concted_emp)
                        setinsertId(am_service_details_slno)
                        setDeptServiceSlno(serviced_emp_details_slno === null ? 0 : serviced_emp_details_slno)
                        setServiceStatus(service_hold)

                    } else {
                    }
                } else {
                }
            } catch (error) {
            }
        };
        getallServiceDetails();
    }, [searchData, count]);

    useEffect(() => {
        const getServiceDetailsAll = async () => {
            const result = await axioslogin.post('/assetSpareDetails/getAllserviceDetails', searchData);
            const { success, data } = result.data;
            if (success === 2) {
                if (data.length > 0) {
                    setAlldetailsService(data)
                }
                else {
                    setAlldetailsService([])
                }
            }
            else {
                setAlldetailsService([])
            }
        }
        getServiceDetailsAll()
    }, [searchData, count])


    const fileView = async (val) => {
        const { complaint_slno } = val;
        setimage(1);
        setimageViewOpen(true);
        setfileDetails(val);
        try {
            const result = await axioslogin.get(`/complaintFileUpload/uploadFile/getComplaintFile/${complaint_slno}`);
            const { success } = result.data;
            if (success === 1) {
                const data = result.data;
                const fileNames = data.data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/ComplaintManagement/${complaint_slno}/${fileName}`;
                });
                setImageUrls(fileUrls);
                // Open the modal only if there are files
                if (fileUrls.length > 0) {
                    setSelectedImages(val);
                } else {
                    warningNotify("No Image attached");
                }
            } else {
                warningNotify("No Image Attached");
            }
        } catch (error) {
            warningNotify('Error in fetching files:', error);
        }
    }

    const fileViewAssetService = async (val) => {
        const { am_service_details_slno } = val;
        setServicefileDetails(val);
        try {
            const result = await axioslogin.get(`/AmServiceFileUpload/uploadFile/getAssetServiceFile/${am_service_details_slno}`);
            const { success } = result.data;
            if (success === 1) {
                const data = result.data;
                const fileNames = data.data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/AssetService/${am_service_details_slno}/${fileName}`;
                });
                setImageServiceUrls(fileUrls);
                // Open the modal only if there are files
                if (fileUrls.length > 0) {
                    setSelectedImages(val);
                    setimageServiceFlag(1);
                    setServiceimageViewOpen(true);

                } else {
                    warningNotify("No Files attached");
                }
            } else {
                warningNotify("No Files Attached");
            }
        } catch (error) {
            warningNotify('Error in fetching files:', error);
        }
    }


    useEffect(() => {
        const getamcCmcDocuments = async () => {
            try {
                if (amccmc_slno) {
                    const result = await axioslogin.get(`/AssetFileUpload/AmcCmcImageView/${amccmc_slno}`)
                    const { success, data } = result.data;
                    if (success === 1 && data && Array.isArray(data)) {
                        const fileNames = data;
                        const fileUrls = fileNames.map((fileName) => {
                            return `${PUBLIC_NAS_FOLDER}/Asset/AMCCMC/${amccmc_slno}/${fileName}`;
                        });
                        setamcCmcDocuments(fileUrls);
                    } else {
                        setamcCmcDocuments([]);
                    }
                }
            } catch (error) {
                warningNotify(error);
                setamcCmcDocuments([]);
            }
        };

        getamcCmcDocuments();
    }, [amccmc_slno]);


    useEffect(() => {
        const getleaseDocuments = async () => {
            try {
                if (am_lease_mast_slno) {
                    const result = await axioslogin.get(`/AssetFileUpload/LeaseMasterImageView/${am_lease_mast_slno}`);
                    const { success, data } = result.data;
                    if (success === 1 && data && Array.isArray(data)) {
                        const fileNames = data;
                        const fileUrls = fileNames.map((fileName) => {
                            return `${PUBLIC_NAS_FOLDER}/Asset/LeaseMaster/${am_lease_mast_slno}/${fileName}`;
                        });
                        setleaseDocuments(fileUrls);
                    } else {
                        setleaseDocuments([]);
                    }
                }
            } catch (error) {
                warningNotify(error);
                setleaseDocuments([]);
            }
        };
        getleaseDocuments();
    }, [am_lease_mast_slno]);

    useEffect(() => {
        const getDocumentViewBill = async () => {
            try {
                if (am_bill_mastslno) {
                    const result = await axioslogin.get(`/AssetFileUpload/BillMasterImageView/${am_bill_mastslno}`);
                    const { success, data } = result.data;
                    if (success === 1 && data && Array.isArray(data)) {
                        const fileNames = data;
                        const fileUrls = fileNames.map((fileName) => {
                            return `${PUBLIC_NAS_FOLDER}/Asset/BillMaster/${am_bill_mastslno}/${fileName}`;
                        });
                        setBilldetailsView(fileUrls);
                    } else {
                        setBilldetailsView([]);
                    }
                } else {

                }
            } catch (error) {
                warningNotify(error);
                setBilldetailsView([]);
            }
        };

        getDocumentViewBill();
    }, [am_bill_mastslno]);



    const AddTostock = useCallback((e) => {
        e.preventDefault();
        setaddToStockFlag(1);
        const updatedPatchData = {
            ...PatchData,
            service_done_status: 1,
            service_close_status: 1,
            add_to_store_user: id,
            add_to_store_date: currentDateAndTime
        };

        const updatedPostData = {
            ...PostData,
            service_done_status: 1,
            service_close_status: 1,
            add_to_store_user: id,
            add_to_store_date: currentDateAndTime
        };

        const servicespareUpdate = {
            spare_status: 0,
            asset_spare_slno: asset_spare_slno,

        };

        const AddtoStockSpare = {
            spare_dept_slno: spare_custodian_dept,
            spare_deptsec_slno: spare_custodian_dept_sec,
            spare_room_slno: null,
            spare_subroom_slno: null,
            spare_rack_slno: null,
            spare_service: 0,
            spare_service_hold: null,
            am_spare_item_map_slno: am_spare_item_map_slno,
        };
        const AddtoStockAsset = {
            item_dept_slno: item_custodian_dept,
            item_deptsec_slno: item_custodian_dept_sec,
            item_room_slno: null,
            item_subroom_slno: null,
            item_rack_slno: null,
            asset_item_service: 0,
            asset_item_condmnation: 0,
            asset_item_condm_user: null,
            asset_item_service_hold: null,
            am_item_map_slno: am_item_map_slno,
        };

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
                const uploadResult = await axioslogin.post('/AmServiceFileUpload/uploadFile/UploadAssetService', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return uploadResult.data;
            } catch (error) {
                warningNotify('An error occurred during file upload.');
            }
        };

        const AddtoStockSpareUpdate = async (AddtoStockSpare) => {
            const result = await axioslogin.patch('/assetSpareDetails/SpareDetailsUpdate', AddtoStockSpare);
            return result.data
        }

        const AddDetails = async (PostData) => {
            const result = await axioslogin.post(`/assetSpareDetails/serviceDetailsInsert`, PostData);
            return result.data
        }

        const UpdateDetails = async (PatchData) => {
            const result = await axioslogin.patch(`/assetSpareDetails/serviceDetailsUpdate`, PatchData);
            return result.data
        }

        const AddtoStockAssetUpdate = async (AddtoStockAsset) => {
            const result = await axioslogin.patch('/assetSpareDetails/AssetDetailsUpdate', AddtoStockAsset);
            return result.data
        }
        const serviceSpareUpdate = async (servicespareUpdate) => {
            const result = await axioslogin.patch('/assetSpareDetails/spareServiceUpdate', servicespareUpdate);
            return result.data
        }

        // if (servicedByEmp === 1 && spareCheckEmp !== 0 && dept_service_date !== ' ' && dept_service_remarks !== '' && issue_details !== '') {

        // if (serviceDoneFlag === 1 && suppl_serviced_date !== '' && suppl_serviced_remarks !== '') {

        if (spare_asset_no_only !== undefined) {
            AddtoStockSpareUpdate(AddtoStockSpare).then((value) => {
                const { success } = value;
                if (success === 2) {
                    serviceSpareUpdate(servicespareUpdate).then((response) => {
                        const { success } = response;
                        if (success === 2) {
                            if (am_service_details_slno !== '') {
                                UpdateDetails(updatedPatchData).then((response) => {
                                    const { success } = response;
                                    if (success === 2) {
                                        if (selectFile.length !== 0) {
                                            InsertFile(selectFile, insertId).then((value) => {
                                                const { success, message } = value
                                                if (success === 1) {
                                                    succesNotify("Item added to stock list With File Attach Successfully")
                                                    setCount(count + 1);
                                                    Close()
                                                }
                                                else {
                                                    warningNotify(message)
                                                }
                                            })
                                        }
                                        else {
                                            succesNotify("Item added to stock list")
                                            setCount(count + 1);
                                            Close()
                                        }
                                    } else {
                                        console.error('Failed to update service details.');
                                    }
                                });
                            } else {
                                AddDetails(updatedPostData).then((response) => {
                                    const { success } = response;
                                    if (success === 1) {
                                        if (selectFile.length !== 0) {
                                            InsertFile(selectFile, insertId).then((value) => {
                                                const { success, message } = value
                                                if (success === 1) {
                                                    succesNotify("Item added to stock list With File Attach Successfully")
                                                    setCount(count + 1);
                                                    Close()
                                                }
                                                else {
                                                    warningNotify(message)
                                                }
                                            })
                                        }
                                        else {
                                            succesNotify("Item added to stock list")
                                            setCount(count + 1);
                                            Close()
                                        }
                                    } else {
                                        console.error('Failed to add service details.');
                                    }
                                });
                            }

                        } else {
                            console.error('Failed to update service status.');
                        }
                    })


                } else {
                    console.error('Failed to add to stock.');
                }
            }).catch((error) => {
                console.error('Error during add to stock:', error);
            });

        }
        else if (item_asset_no_only !== undefined) {
            AddtoStockAssetUpdate(AddtoStockAsset).then((value) => {
                const { success } = value;
                if (success === 2) {
                    if (am_service_details_slno !== '') {
                        UpdateDetails(updatedPatchData).then((response) => {
                            const { success } = response;
                            if (success === 2) {
                                if (selectFile.length !== 0) {
                                    InsertFile(selectFile, insertId).then((value) => {
                                        const { success, message } = value
                                        if (success === 1) {
                                            succesNotify("Item transferred to condemnation list  With File Attach Successfully")
                                            setCount(count + 1);
                                            Close()
                                        }
                                        else {
                                            warningNotify(message)
                                        }
                                    })
                                }
                                else {
                                    succesNotify("Item transferred to condemnation list")
                                    setCount(count + 1);
                                    Close()
                                }
                            } else {
                                console.error('Failed to update service details.');
                            }
                        });
                    } else {
                        AddDetails(updatedPostData).then((response) => {
                            const { success } = response;
                            if (success === 1) {
                                if (selectFile.length !== 0) {
                                    InsertFile(selectFile, insertId).then((value) => {
                                        const { success, message } = value
                                        if (success === 1) {
                                            succesNotify("Item transferred to condemnation list With File Attach Successfully")
                                            setCount(count + 1);
                                            Close()
                                        }
                                        else {
                                            warningNotify(message)
                                        }
                                    })
                                }
                                else {
                                    succesNotify("Item transferred to condemnation list")
                                    setCount(count + 1);
                                    Close()
                                }
                            } else {
                                console.error('Failed to add service details.');
                            }
                        });
                    }
                } else {
                    console.error('Failed to update contamination.');
                }
            }).catch((error) => {
                console.error('Error during contamination update:', error);
            });
        }
        else {

        }
        // }
        // else {
        //     infoNotify("please Fill the Supplier Serviced date Services they performed")
        // }
        // }
        // else {
        //     infoNotify("Please Fill Serviced Employee, Serviced Date, Service Remarks and the Issues You Identified")
        // }



    }, [PatchData, PostData, asset_spare_slno, item_asset_no_only, formattedItemNo, selectFile, am_service_details_slno, id, count, setCount,
        settransfrToCondmflag]);

    const TransferToCondmination = useCallback((e) => {
        e.preventDefault();
        settransfrToCondmflag(1);

        const updatedPatchData = {
            ...PatchData,
            condm_transfr_status: 1,
            service_close_status: 1,
            condm_transfr_emp: id,
            condm_transf_remarks: condm_transf_remarks,
        };

        const updatedPostData = {
            ...PostData,
            condm_transfr_status: 1,
            service_close_status: 1,
            condm_transfr_emp: id,
            condm_transf_remarks: condm_transf_remarks,
        };

        const CondmtransfrSpare = {
            delete_user: id,
            asset_spare_slno: asset_spare_slno,
            am_spare_item_map_slno: formattedItemNo,
        };
        const CondmtransfrAsset = {
            item_dept_slno: item_custodian_dept,
            item_deptsec_slno: item_custodian_dept_sec,
            item_room_slno: null,
            item_subroom_slno: null,
            item_rack_slno: null,
            asset_item_service: 2,
            am_item_map_slno: am_item_map_slno,
            asset_item_condmnation: 1,
            asset_item_condm_user: id,
        };
        console.log("CondmtransfrAsset", CondmtransfrAsset);


        const servicespareUpdate = {
            spare_status: 0,
            asset_spare_slno: asset_spare_slno,

        };


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
                const uploadResult = await axioslogin.post('/AmServiceFileUpload/uploadFile/UploadAssetService', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return uploadResult.data;
            } catch (error) {
                warningNotify('An error occurred during file upload.');
            }
        };

        const CondmtransfrSpareUpdate = async (CondmtransfrSpare) => {
            const result = await axioslogin.patch('/ItemMapDetails/spareContamination', CondmtransfrSpare);
            return result.data
        }

        const AddDetails = async (PostData) => {
            const result = await axioslogin.post(`/assetSpareDetails/serviceDetailsInsert`, PostData);
            return result.data
        }

        const UpdateDetails = async (PatchData) => {
            const result = await axioslogin.patch(`/assetSpareDetails/serviceDetailsUpdate`, PatchData);
            return result.data
        }

        const CondmtransfrAssetUpdate = async (CondmtransfrAsset) => {
            const result = await axioslogin.patch('/assetSpareDetails/AssetDetailsUpdate', CondmtransfrAsset);
            return result.data
        }
        const serviceSpareUpdate = async (servicespareUpdate) => {
            const result = await axioslogin.patch('/assetSpareDetails/spareServiceUpdate', servicespareUpdate);
            return result.data
        }
        if (condm_transf_remarks !== '') {

            if (spare_asset_no_only !== undefined) {
                CondmtransfrSpareUpdate(CondmtransfrSpare).then((value) => {
                    const { success } = value;
                    if (success === 1) {
                        serviceSpareUpdate(servicespareUpdate).then((response) => {
                            const { success } = response;
                            if (success === 2) {
                                if (am_service_details_slno !== '') {
                                    UpdateDetails(updatedPatchData).then((response) => {
                                        const { success } = response;
                                        if (success === 2) {
                                            if (selectFile.length !== 0) {
                                                InsertFile(selectFile, insertId).then((value) => {
                                                    const { success, message } = value
                                                    if (success === 1) {
                                                        succesNotify("Item transferred to condemnation list With File Attach Successfully")
                                                        setCount(count + 1);
                                                        Close()
                                                    }
                                                    else {
                                                        warningNotify(message)
                                                    }
                                                })
                                            }
                                            else {
                                                succesNotify("Item transferred to condemnation list")
                                                setCount(count + 1);
                                                Close()
                                            }
                                        } else {
                                            console.error('Failed to update service details.');
                                        }
                                    });
                                } else {
                                    AddDetails(updatedPostData).then((response) => {
                                        const { success } = response;
                                        if (success === 1) {
                                            if (selectFile.length !== 0) {
                                                InsertFile(selectFile, insertId).then((value) => {
                                                    const { success, message } = value
                                                    if (success === 1) {
                                                        succesNotify("Item transferred to condemnation list With File Attach Successfully")
                                                        setCount(count + 1);
                                                        Close()
                                                    }
                                                    else {
                                                        warningNotify(message)
                                                    }
                                                })
                                            }
                                            else {
                                                succesNotify("Item transferred to condemnation list")
                                                setCount(count + 1);
                                                Close()
                                            }
                                        } else {
                                            console.error('Failed to add service details.');
                                        }
                                    });
                                }
                            } else {

                            }
                        })


                    } else {
                        console.error('Failed to update contamination.');
                    }
                }).catch((error) => {
                    console.error('Error during contamination update:', error);
                });

            }
            else if (item_asset_no_only !== undefined) {
                console.log("inside function");

                CondmtransfrAssetUpdate(CondmtransfrAsset).then((value) => {
                    const { success } = value;
                    console.log("value", value);
                    if (success === 2) {

                        if (am_service_details_slno !== '') {
                            UpdateDetails(updatedPatchData).then((response) => {
                                const { success } = response;
                                console.log("response", response);

                                if (success === 2) {
                                    if (selectFile.length !== 0) {
                                        InsertFile(selectFile, insertId).then((value) => {
                                            const { success, message } = value
                                            if (success === 1) {
                                                succesNotify("Item transferred to condemnation list  With File Attach Successfully")
                                                setCount(count + 1);
                                                Close()
                                            }
                                            else {
                                                warningNotify(message)
                                            }
                                        })
                                    }
                                    else {
                                        succesNotify("Item transferred to condemnation list")
                                        setCount(count + 1);
                                        Close()
                                    }
                                } else {
                                    console.error('Failed to update service details.');
                                }
                            });
                        } else {
                            AddDetails(updatedPostData).then((response) => {
                                const { success } = response;
                                if (success === 1) {
                                    if (selectFile.length !== 0) {
                                        InsertFile(selectFile, insertId).then((value) => {
                                            const { success, message } = value
                                            if (success === 1) {
                                                succesNotify("Item transferred to condemnation list With File Attach Successfully")
                                                setCount(count + 1);
                                                Close()
                                            }
                                            else {
                                                warningNotify(message)
                                            }
                                        })
                                    }
                                    else {
                                        succesNotify("Item transferred to condemnation list")
                                        setCount(count + 1);
                                        Close()
                                    }
                                } else {
                                    console.error('Failed to add service details.');
                                }
                            });
                        }
                    } else {
                        console.error('Failed to update contamination.');
                    }
                }).catch((error) => {
                    console.error('Error during contamination update:', error);
                });
            }
            else {

            }
        }
        else {
            infoNotify("Enter remarks for the condemnation transfer.")
        }



    }, [PatchData, PostData, asset_spare_slno, item_asset_no_only, formattedItemNo, selectFile, am_service_details_slno, id, count, setCount, settransfrToCondmflag]);

    const AddNewSpare = useCallback((e) => {
        if (sparez === 0) {
            infoNotify('Please select Spare');
        } else {
            const isAlreadyAdded = spareData.some(item => item.spare_asset_no_only === sparez);
            if (isAlreadyAdded) {
                infoNotify('Spare already added');
                setSparez(0)
            } else {
                const newdata = {
                    am_item_map_slno: am_item_map_slno,
                    spare_asset_no_only: sparez,
                    spare_status: 1,
                    name: spareName,
                    create_user: id
                };
                const datass = [...spareData, newdata];
                setSpareData(datass);
                setSparez(0)
            }
        }
    }, [am_item_map_slno, am_item_map_slno, spareData, sparez, spareName, id]);
    const handleDelete = (indexToDelete) => {
        setSpareData((prevArray) => {
            const updatedArray = prevArray.filter((_, index) => index !== indexToDelete);
            return updatedArray;
        });
    };
    const SparepostData = spareData && spareData.map((val) => {
        return {
            am_item_map_slno: val.am_item_map_slno,
            am_spare_item_map_slno: val.spare_asset_no_only,
            spare_status: 1,
            create_user: val.create_user,
        }
    })

    const AddNewSpareUnderAsset = useCallback((e) => {
        const SparedetailInsert = async (SparepostData) => {
            const result = await axioslogin.post(`/ItemMapDetails/SpareDetailsInsert`, SparepostData);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify("New Spare Added Under Asset")
                setCount(count + 1)
                setSpareData([])
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        SparedetailInsert(SparepostData)
    }, [SparepostData, count])

    const pmpostdata = useMemo(() => {
        return {
            am_item_map_slno: am_item_map_slno,
            amc_status: amc_status === null ? 0 : 1,
            cmc_status: cmc_status === null ? 0 : 1,
            instalation_date: instalationDate,
            due_date: dueDate === '' ? new Date() : dueDate,
            pm_status: 1,
            create_user: id,
            amc_slno: amc_slno === null ? null : amc_slno
        }
    }, [am_item_map_slno, instalationDate, dueDate, amc_slno, amc_slno, cmc_status, amc_status,
        id])

    const pmpatchData = useMemo(() => {
        return {
            am_item_map_slno: am_item_map_slno,
            amc_status: amc_status === null ? 0 : 1,
            cmc_status: cmc_status === null ? 0 : 1,
            instalation_date: instalationDate,
            due_date: dueDate === '' ? new Date() : dueDate,
            pm_status: 1,
            create_user: id,
            amc_slno: amc_slno === null ? null : amc_slno
        }
    }, [am_item_map_slno, instalationDate, dueDate, amc_slno, cmc_status, amc_status,
        id])

    const SavePMDetails = useCallback((e) => {
        e.preventDefault()
        setPmFlag(1)
        const InsertAMCPMDetail = async (pmpostdata) => {
            const result = await axioslogin.post('/ItemMapDetails/AmcPmInsert', pmpostdata)
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                setdueDateCount(0)
            } else {
                infoNotify(message)
            }
        }
        const updateAMCPMDetails = async (pmpatchData) => {
            const result = await axioslogin.patch('/ItemMapDetails/AmcPmUpdate', pmpatchData);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
                setdueDateCount(0)
            }
        }

        if (pmInsercheckFlag === 1) {
            updateAMCPMDetails(pmpatchData);
        } else {
            InsertAMCPMDetail(pmpostdata);
        }
    }, [pmpostdata, pmpatchData, pmInsercheckFlag])

    const UpdatedueDateCount = useCallback((e) => {
        setdueDateCount(e.target.value)
        const Due = addDays(new Date(instalationDate), e.target.value)
        setDueDate(format(new Date(Due), "yyyy-MM-dd"))
        setPmFlag(0)
        setdaysEnable(1)

    }, [instalationDate])

    const qrCodeOpen = useCallback(() => {
        setSelectedData({
            am_item_map_slno: am_item_map_slno,
            am_spare_item_map_slno: am_spare_item_map_slno,
            assetno: item_asset_no + '/' + am_item_map_slno.toString().padStart(6, '0'),
        })
        setQrFlag(1)
        setqrOpen(true)
    }, [am_item_map_slno, am_spare_item_map_slno, item_asset_no])

    const handleClose = useCallback(() => {
        setqrOpen(false)
        setQrFlag(0)
    }, [setqrOpen, setQrFlag])


    const patchDataServiceHoldAssset = useMemo(() => {
        return {
            asset_item_service_hold: serviceStatus,
            am_item_map_slno: am_item_map_slno,
        }
    }, [serviceStatus, am_item_map_slno])

    const patchDataServiceHoldSpare = useMemo(() => {
        return {
            spare_service_hold: serviceStatus,
            am_spare_item_map_slno: am_spare_item_map_slno,
        }
    }, [serviceStatus, am_spare_item_map_slno])


    const ServiceStatus = useCallback(() => {

        const updateServiceHoldAsset = async (patchDataServiceHoldAssset) => {
            const result = await axioslogin.patch(`/assetSpareDetails/AssetServiceHoldUpdate`, patchDataServiceHoldAssset);
            return result.data
        }
        const updateServiceHoldSpare = async (patchDataServiceHoldSpare) => {
            const result = await axioslogin.patch(`/assetSpareDetails/SpareServiceHoldUpdate`, patchDataServiceHoldSpare);
            return result.data
        }

        const AddServiceDetils = async (PostData) => {
            const result = await axioslogin.post(`/assetSpareDetails/serviceDetailsInsert`, PostData);
            return result.data
        }

        const UpdateServiceDetils = async (PatchData) => {
            const result = await axioslogin.patch(`/assetSpareDetails/serviceDetailsUpdate`, PatchData);
            return result.data
        }

        if (am_service_details_slno !== '') {
            UpdateServiceDetils(PatchData).then((value) => {
                const { success, message } = value;
                if (success === 2) {
                    if (item_asset_no_only !== undefined) {
                        updateServiceHoldAsset(patchDataServiceHoldAssset).then((value) => {
                            const { success } = value
                            if (success === 2) {
                                succesNotify("Service Status Updated Successfully")
                                setCount(count + 1);
                            }
                            else {
                                // warningNotify(message)
                            }
                        })
                    }
                    else if (spare_asset_no_only !== undefined) {

                        updateServiceHoldSpare(patchDataServiceHoldSpare).then((value) => {
                            const { success } = value
                            if (success === 2) {
                                succesNotify("Service Status Updated Successfully")
                                setCount(count + 1);
                            }
                            else {
                                // warningNotify(message)
                            }
                        })
                    }
                    else {

                    }


                }
                else {

                }
            })
        }
        else {
            AddServiceDetils(PostData).then((value) => {
                const { success, message } = value;
                if (success === 1) {
                    if (item_asset_no_only !== undefined) {
                        updateServiceHoldAsset(patchDataServiceHoldAssset).then((value) => {
                            const { success } = value
                            if (success === 2) {
                                succesNotify("Service Status Updated Successfully")
                                setCount(count + 1);
                            }
                            else {
                                // warningNotify(message)
                            }
                        })
                    }
                    else if (spare_asset_no_only !== undefined) {
                        updateServiceHoldSpare(patchDataServiceHoldSpare).then((value) => {
                            const { success } = value
                            if (success === 2) {
                                succesNotify("Service Status Updated Successfully")
                                setCount(count + 1);
                            }
                            else {
                                // warningNotify(message)
                            }
                        })
                    }
                }
                else {

                }
            })
        }
    }, [PatchData, PostData, patchDataServiceHoldSpare, patchDataServiceHoldAssset, am_service_details_slno])
    // const ServiceStatus = useCallback(async () => {
    //     try {
    //         const updateServiceHoldAsset = async (patchDataServiceHoldAssset) => {
    //             const result = await axioslogin.patch(`/assetSpareDetails/AssetServiceHoldUpdate`, patchDataServiceHoldAssset);
    //             return result.data;
    //         };
    //         const updateServiceHoldSpare = async (patchDataServiceHoldSpare) => {
    //             const result = await axioslogin.patch(`/assetSpareDetails/SpareServiceHoldUpdate`, patchDataServiceHoldSpare);
    //             return result.data;
    //         };
    //         const AddServiceDetils = async (PostData) => {
    //             const result = await axioslogin.post(`/assetSpareDetails/serviceDetailsInsert`, PostData);
    //             return result.data;
    //         };
    //         const UpdateServiceDetils = async (PatchData) => {
    //             const result = await axioslogin.patch(`/assetSpareDetails/serviceDetailsUpdate`, PatchData);
    //             return result.data;
    //         };
    //         if (am_service_details_slno !== '') {
    //             const updateResponse = await UpdateServiceDetils(PatchData);
    //             const { success, message } = updateResponse;
    //             if (success === 2) {
    //                 if (item_asset_no_only !== undefined) {
    //                     const holdAssetResponse = await updateServiceHoldAsset(patchDataServiceHoldAssset);
    //                     const { success } = holdAssetResponse;
    //                     if (success === 2) {
    //                         succesNotify("Service Status Updated Successfully");
    //                         setCount(count + 1);
    //                     } else {
    //                         warningNotify(message);
    //                     }
    //                 }
    //                 else if (spare_asset_no_only !== undefined) {
    //                     const holdSpareResponse = await updateServiceHoldSpare(patchDataServiceHoldSpare);
    //                     const { success } = holdSpareResponse;
    //                     if (success === 2) {
    //                         succesNotify("Service Status Updated Successfully");
    //                         setCount(count + 1);
    //                     } else {
    //                         warningNotify(message);
    //                     }
    //                 }
    //             } else {
    //                 warningNotify(message);
    //             }
    //         }
    //         else {
    //             const addResponse = await AddServiceDetils(PostData);
    //             const { success, message } = addResponse;
    //             if (success === 1) {
    //                 if (item_asset_no_only !== undefined) {
    //                     const holdAssetResponse = await updateServiceHoldAsset(patchDataServiceHoldAssset);
    //                     const { success } = holdAssetResponse;
    //                     if (success === 2) {
    //                         succesNotify("Service Status Updated Successfully");
    //                         setCount(count + 1);
    //                     } else {
    //                         warningNotify(message);
    //                     }
    //                 } else if (spare_asset_no_only !== undefined) {
    //                     const holdSpareResponse = await updateServiceHoldSpare(patchDataServiceHoldSpare);
    //                     const { success } = holdSpareResponse;

    //                     if (success === 2) {
    //                         succesNotify("Service Status Updated Successfully");
    //                         setCount(count + 1);
    //                     } else {
    //                         warningNotify(message);
    //                     }
    //                 }
    //             } else {
    //                 warningNotify(message);
    //             }
    //         }
    //     } catch (error) {
    //         errorNotify("An error occurred while updating service status");
    //     }
    // }, [PatchData, PostData, patchDataServiceHoldSpare, patchDataServiceHoldAssset, am_service_details_slno, item_asset_no_only, spare_asset_no_only, count]);

    const [openDocuments, setopenDocuments] = useState(0)
    const [documetOpenCheck, setdocumetOpenCheck] = useState(false)

    const OpenDocument = useCallback(() => {
        if (billdetailsView.length !== 0) {
            setopenDocuments(1)
            setdocumetOpenCheck(true)
        }
        else {
            infoNotify("No Bills Attached")
        }
    }, [billdetailsView])

    const OpenLeaseDocument = useCallback(() => {
        if (leaseDocuments.length !== 0) {
            setopenDocuments(2)
            setdocumetOpenCheck(true)
        }
        else {
            infoNotify("No Documents Attached")
        }
    }, [leaseDocuments])
    const OpenAMCCMCDocument = useCallback(() => {
        if (amcCmcDocuments.length !== 0) {
            setopenDocuments(3)
            setdocumetOpenCheck(true)
        }
        else {
            infoNotify("No Documents Attached")
        }
    }, [amcCmcDocuments])


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


    return (
        <Box>
            {qrFlag === 1 ? <ItemQrDisplayModel open={qrOpen} handleClose={handleClose} selectedData={selectedData}
            /> : null}

            {openDocuments === 1 ?
                <ServiceDocumentModal setopenDocuments={setopenDocuments} open={documetOpenCheck} setdocumetOpenCheck={setdocumetOpenCheck}
                    DocumentView={billdetailsView} />
                :
                openDocuments === 2 ?
                    <ServiceDocumentModal setopenDocuments={setopenDocuments} open={documetOpenCheck} setdocumetOpenCheck={setdocumetOpenCheck}
                        DocumentView={leaseDocuments} />
                    :
                    openDocuments === 3 ?
                        <ServiceDocumentModal setopenDocuments={setopenDocuments} open={documetOpenCheck} setdocumetOpenCheck={setdocumetOpenCheck}
                            DocumentView={amcCmcDocuments} />
                        : null
            }
            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
                    <Box
                        sx={{
                            width: '90vw',
                            height: '98vh',
                            bgcolor: 'background.body',
                            borderRadius: 'md',
                            boxShadow: 'lg',
                            display: 'flex',
                            flexDirection: 'column',
                            py: 2, px: 2,

                        }}
                    >
                        <Box sx={{ flexShrink: 0 }}>
                            <Box sx={{ flex: 1, display: 'flex', p: 1, }}>
                                <Box sx={{ flex: 1, color: 'grey', fontWeight: 500, pl: 1.4, pt: .8 }}>
                                    Service Details
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                    <CancelIcon
                                        sx={{ color: 'grey', cursor: 'pointer', height: 30, width: 30 }}
                                        onClick={Close}
                                    />
                                </Box>
                            </Box>
                            {image === 1 ?
                                <ComFileView
                                    imageUrls={imageUrls}
                                    imageViewOpen={imageViewOpen}
                                    selectedImages={selectedImages}
                                    fileDetails={fileDetails}
                                    setimage={setimage}
                                    setimageViewOpen={setimageViewOpen}
                                /> : null}

                            {imageServiceFlag === 1 ?
                                <ServiceFileAttach
                                    imageServiceUrls={imageServiceUrls}
                                    serviceimageViewOpen={serviceimageViewOpen}
                                    servicefileDetails={servicefileDetails}
                                    setimageServiceFlag={setimageServiceFlag}
                                    setServiceimageViewOpen={setServiceimageViewOpen}
                                    item_name={item_name}
                                    category_name={category_name}
                                /> : null}
                            <Box sx={{ flex: 1, bgcolor: '#FBFCFE', border: 1, mx: 1.5, borderRadius: 5, py: .5, borderColor: '#EFEFEF' }}>
                                <Typography
                                    sx={{
                                        pl: 2, fontWeight: 600, fontSize: 18,
                                    }}
                                >
                                    Item Under Service
                                </Typography>
                                <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                                    <Typography sx={{ flex: .4, pl: 2, pt: .4, fontWeight: 400, fontSize: 14 }}>
                                        Item Number
                                    </Typography>
                                    <Box sx={{ flex: 3, }}>
                                        <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500, fontSize: 15 }}>
                                            {ItemPrefix}/{formattedItemNo.toString().padStart(6, '0')}
                                        </Chip>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                                    <Typography sx={{ flex: .4, pl: 2, fontWeight: 400, pt: .4, fontSize: 14 }}>
                                        Category
                                    </Typography>
                                    <Box sx={{ flex: 3, fontWeight: 500 }}>
                                        <Chip sx={{ bgcolor: '#EBEFFB' }}>{category_name}</Chip>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', my: .5 }}>
                                    <Typography sx={{ flex: .4, pl: 2, fontWeight: 400, pt: .4, fontSize: 14 }}>
                                        Item Name
                                    </Typography>
                                    <Box sx={{ flex: 3, fontWeight: 500 }}>
                                        <Chip sx={{ bgcolor: '#EBEFFB' }}>{item_name}</Chip>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Tabs
                                // defaultValue={0}
                                size="sm"
                                sx={{
                                    display: 'flex',
                                    mx: 2,
                                    bgcolor: 'white',
                                    mt: .5
                                }}
                            >
                                <TabList
                                    sx={{
                                        pt: 1,
                                        justifyContent: 'center',
                                        [`&& .${tabClasses.root}`]: {
                                            flex: 'initial',
                                            bgcolor: 'white',
                                            '&:hover': {
                                                bgcolor: 'white',
                                            },
                                            [`&.${tabClasses.selected}`]: {
                                                color: 'primary.plainColor',
                                                borderBottom: 1.5,
                                                '&::after': {
                                                    height: 20,
                                                    borderTopLeftRadius: 3,
                                                    borderTopRightRadius: 3,
                                                    bgcolor: 'primary.500',
                                                },
                                            },
                                        },
                                    }}
                                >
                                    <Box sx={{ display: 'flex', flex: 1, mb: 0 }} >
                                        <Box sx={{ flex: 1, display: 'flex', gap: 2 }}>
                                            {complDetails.length !== 0 ?
                                                <Tab value={0} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, p: 0, }}>
                                                    <InfoOutlinedIcon />&nbsp;Service Request
                                                </Tab> : null}
                                            {spare_asset_no === undefined ?
                                                <Tab value={1} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, p: 0, }}>
                                                    <UnarchiveOutlinedIcon />&nbsp;Asset Upgrade
                                                </Tab> : null}
                                            <Tab value={2} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, p: 0 }}>
                                                <SettingsOutlinedIcon />&nbsp;Service Information
                                            </Tab>
                                            {spare_asset_no === undefined ?
                                                <Tab value={3} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, p: 0 }}>
                                                    <DeveloperBoardOutlinedIcon />&nbsp;PM Details
                                                </Tab> : null}
                                            <Tab value={4} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, p: 0 }}>
                                                <LayersOutlinedIcon />&nbsp;Breakdown Details
                                            </Tab>
                                            <Tab value={5} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, p: 0 }}>
                                                <TextSnippetOutlinedIcon />&nbsp;Documents
                                            </Tab>
                                        </Box>
                                    </Box>
                                </TabList>

                                {complDetails.length !== 0 ?
                                    <TabPanel
                                        value={0} sx={{
                                            p: 0,
                                            flexGrow: 1,
                                            overflowY: 'auto',
                                            maxHeight: 'calc(90vh - 230px)',
                                        }}>
                                        <Box
                                            sx={{
                                                flexGrow: 1,
                                                overflowY: 'auto',
                                                maxHeight: '100%',
                                                m: 0,
                                                pt: 2
                                            }}>

                                            {complDetails.length !== 0 ?
                                                <Box sx={{ mb: 2 }}>
                                                    <Typography
                                                        sx={{
                                                            pl: 1,
                                                            flex: 1,
                                                            fontWeight: 500,
                                                            color: '#1974CE',
                                                        }}
                                                    >
                                                        Ticket Details
                                                    </Typography>

                                                    {complDetails?.map((val, index) => {
                                                        return (
                                                            <Box key={index} sx={{ flex: 1, py: .5 }}>
                                                                <Box sx={{ pl: 1, flex: 1, display: 'flex' }}>
                                                                    <Typography sx={{ fontSize: 14, flex: .8, }}>
                                                                        Ticket No.
                                                                    </Typography>
                                                                    <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 15, }}>
                                                                        : {val.complaint_slno}
                                                                    </Typography>
                                                                </Box>
                                                                <Box sx={{ pl: 1, flex: 1, display: 'flex' }}>
                                                                    <Typography sx={{ flex: .8, fontSize: 14, }}>
                                                                        Complaint Type
                                                                    </Typography>
                                                                    <Typography sx={{ flex: 4, fontWeight: 400, color: 'Black', fontSize: 13, }}>
                                                                        : {val.complaint_type_name}
                                                                    </Typography>
                                                                </Box>
                                                                <Box sx={{ pl: 1, flex: 1, display: 'flex' }}>
                                                                    <Typography sx={{ flex: .8, fontSize: 14, }}>
                                                                        Complaint Desc
                                                                    </Typography>
                                                                    <Typography sx={{ flex: 4, fontWeight: 400, color: 'Black', fontSize: 14, }}>
                                                                        : {val.complaint_desc}
                                                                    </Typography>
                                                                </Box>
                                                                <Box sx={{ pl: 1, flex: 1, display: 'flex' }}>
                                                                    <Typography sx={{ flex: .8, fontSize: 14, }}>
                                                                        Department Section
                                                                    </Typography>
                                                                    <Typography sx={{ flex: 4, fontWeight: 400, color: 'Black', fontSize: 13, }}>
                                                                        : {val.location}
                                                                    </Typography>
                                                                </Box>
                                                                {val.rm_room_name !== null ?
                                                                    <Box sx={{ pl: 1, flex: 1, display: 'flex' }}>
                                                                        <Typography sx={{ flex: .8, fontSize: 14, }}>
                                                                            Location
                                                                        </Typography>
                                                                        <Typography sx={{ flex: 4, fontWeight: 400, color: 'Black', fontSize: 14, }}>
                                                                            : {val.rm_room_name}
                                                                            {val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name ?
                                                                                ` (${val.rm_roomtype_name ? val.rm_roomtype_name : ''}${val.rm_roomtype_name &&
                                                                                    val.rm_insidebuildblock_name ? ' - ' : ''}
                                                                ${val.rm_insidebuildblock_name ? val.rm_insidebuildblock_name : ''}${(val.rm_insidebuildblock_name &&
                                                                                    val.rm_floor_name) ? ' - ' : ''}
                                                                ${val.rm_floor_name ? val.rm_floor_name : ''})`
                                                                                : "Not Updated"}
                                                                        </Typography>
                                                                    </Box> : null}
                                                                <Box sx={{ pl: 1, flex: 1, display: 'flex' }}>
                                                                    <Typography sx={{ flex: .8, fontSize: 14, }}>
                                                                        Registered Date
                                                                    </Typography>
                                                                    <Typography sx={{ flex: 4, fontWeight: 400, color: 'Black', fontSize: 14, }}>
                                                                        : {val.compalint_date}
                                                                    </Typography>
                                                                </Box>
                                                                <Box sx={{ pl: 1, flex: 1, display: 'flex' }}>
                                                                    <Typography sx={{ flex: .8, fontSize: 14, }}>
                                                                        Assingees
                                                                    </Typography>
                                                                    <Box sx={{ flex: 4, fontWeight: 400, color: 'Black', fontSize: 13, }}>
                                                                        :                                         {empName?.map((val, index) => {
                                                                            return (
                                                                                <Chip
                                                                                    key={index}
                                                                                    size="sm"
                                                                                    variant="outlined"
                                                                                    sx={{ bgcolor: '#D3C7A1' }}>
                                                                                    {val.em_name}
                                                                                </Chip>
                                                                            )
                                                                        })}
                                                                    </Box>
                                                                </Box>
                                                                <Box sx={{ pl: 1, flex: 1, display: 'flex', mt: .5 }}>
                                                                    <Typography sx={{ flex: .8, fontSize: 14, }}>
                                                                        Attachments
                                                                    </Typography>
                                                                    <Box sx={{ flex: 4, fontSize: 13, pl: 1 }}>
                                                                        <Box
                                                                            onClick={() => fileView(val)}
                                                                            sx={{ bgcolor: '#41729F', color: 'white', width: 85, pl: 1, borderRadius: 10, cursor: 'pointer' }}
                                                                        >
                                                                            <FilePresentRoundedIcon sx={{
                                                                                color: 'white',
                                                                                cursor: 'pointer',
                                                                                height: 20, width: 18, pb: .1
                                                                            }} />file view
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        )
                                                    })}
                                                </Box> : null}
                                            {/* {spareDetails.length !== 0 ?
                                            <Box sx={{ flex: 1, mb: 2 }}>
                                                <Typography
                                                    sx={{
                                                        flex: 1, pl: 1,
                                                        fontWeight: 700,
                                                        background: `linear-gradient(
                                                             to right,
                                                             #334DA1, #2A59A9, #2863AF, #286FB3, #277BBA, #2884BF, #268DC5, #23A0CE, #21B9DC,#22C7E1,#1DDEEE
                                                                 )`,
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                        display: 'inline',
                                                    }}
                                                >
                                                    Asset Include spares
                                                </Typography>
                                                {spareDetails.length !== 0 && (
                                                    <Box sx={{ flex: 1, mx: 1, mt: 1, display: 'flex', bgcolor: '#E6E4F5' }}>
                                                        <Box sx={{ flex: 1, textAlign: 'center', fontSize: 15, fontWeight: 600 }}>#</Box>
                                                        <Box sx={{ flex: 2.5, fontSize: 14, fontWeight: 600 }}>Spare Number</Box>
                                                        <Box sx={{ flex: 10, fontSize: 14, fontWeight: 600 }}>Spare Name</Box>
                                                        <Box sx={{ flex: 1.5, textAlign: 'center', fontSize: 14, fontWeight: 600, }}>Service</Box>
                                                    </Box>
                                                )}
                                                {spareDetails.map((val, index) => {
                                                    const formattedSlno = val.spare_asset_no_only.toString().padStart(6, '0');
                                                    return (
                                                        <Box key={index} sx={{ flex: 1, mx: 1, display: 'flex', borderBottom: 1, borderColor: 'lightgrey', pt: .8 }}>
                                                            <Box sx={{ flex: 1, textAlign: 'center', fontSize: 13, fontWeight: 500 }}>{index + 1}</Box>
                                                            <Box sx={{ flex: 2.5, fontSize: 13, fontWeight: 500 }}>{val.spare_asset_no}/{formattedSlno}</Box>
                                                            <Box sx={{ flex: 10, fontSize: 13, fontWeight: 500 }}>{val.item_name}</Box>

                                                            <Tooltip title={'Spare will be Transfer to Service List by clicking'}
                                                                sx={{ width: 200, }} color='warning' placement='top'>
                                                                <Box sx={{ flex: 1.2, textAlign: 'center', fontSize: 13, pr: .5, cursor: 'pointer' }}>
                                                                    <ManageAccountsSharpIcon sx={{
                                                                        color: '#603A70', cursor: 'pointer', p: .1,
                                                                        '&:hover': { color: '#0000FF' },
                                                                    }}
                                                                        onClick={() => serviceSparee(val)}
                                                                    />
                                                                </Box>
                                                            </Tooltip>
                                                        </Box>
                                                    );
                                                })}
                                            </Box> : null} */}
                                            {/* {item_asset_no_only !== undefined ?
                                            <Box sx={{ mb: 2 }}>
                                                <Typography
                                                    sx={{
                                                        flex: 1, pl: 1,
                                                        fontWeight: 700,
                                                        background: `linear-gradient(
                                                             to right,
                                                             #334DA1, #2A59A9, #2863AF, #286FB3, #277BBA, #2884BF, #268DC5, #23A0CE, #21B9DC,#22C7E1,#1DDEEE
                                                                 )`,
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                        display: 'inline',
                                                    }}
                                                >
                                                    Substitute Spares Under Asset
                                                </Typography>
                                                <Typography sx={{ flex: 1, fontSize: 16, fontWeight: 600, ml: 1.3, mt: .5 }}>
                                                    <u>Add New Spare</u>
                                                </Typography>
                                                <Box sx={{ display: 'flex', flex: 1 }}>
                                                    <Box sx={{ ml: 1, flex: 1, mt: .5 }}>
                                                        <CmSpareList sparez={sparez} setSparez={setSparez}
                                                            item_custodian_dept={item_custodian_dept}
                                                            setSpareName={setSpareName} />
                                                    </Box>
                                                    <Box sx={{ ml: 1, mr: 5, pt: 1, }}>
                                                        <AddCircleIcon sx={{ height: 28, width: 28, cursor: 'pointer' }} onClick={AddNewSpare} />
                                                    </Box>
                                                </Box>
                                                {spareData.length !== 0 ?
                                                    <>
                                                        <Box sx={{ flex: 1, mx: 1, display: 'flex', bgcolor: '#2C54AD', mt: 1 }}>
                                                            <Box sx={{ flex: .5, textAlign: 'center', fontSize: 15, fontWeight: 600, color: 'white', }}>#</Box>
                                                            <Box sx={{ flex: 10, fontSize: 14, fontWeight: 600, color: 'white', }}>Spare Name</Box>
                                                            <Box sx={{ flex: 1, textAlign: 'center', fontSize: 14, fontWeight: 600, pr: .3, color: 'white', }}>Action</Box>
                                                        </Box>

                                                        {spareData.map((val, index) => {
                                                            return (
                                                                <Box key={index} sx={{
                                                                    flex: 1, mx: 1, display: 'flex', borderBottom: 1, borderColor: 'white',
                                                                    bgcolor: '#E6F0F9',
                                                                }}>
                                                                    <Box sx={{ flex: .5, textAlign: 'center', fontSize: 13 }}>{index + 1}</Box>
                                                                    <Box sx={{ flex: 10, fontSize: 13 }}>{val.name}</Box>
                                                                    <Tooltip title={'Spare will be removed  by clicking'}
                                                                        color='neutral' placement='left'>
                                                                        <Box sx={{ flex: 1, textAlign: 'center', fontSize: 13, pr: .5, cursor: 'pointer' }}>
                                                                            <DeleteForeverIcon sx={{
                                                                                color: '#4B443C', cursor: 'pointer', p: .1,
                                                                                '&:hover': { color: 'darkred' },
                                                                            }}
                                                                                onClick={() => handleDelete(index)}
                                                                            />

                                                                        </Box>
                                                                    </Tooltip>
                                                                </Box>
                                                            );
                                                        })}

                                                        <Box sx={{ flex: 1, }}>
                                                            <Box sx={{
                                                                bgcolor: '#2C54AD', width: 100, textAlign: 'center', margin: 'auto', borderRadius: 5, color: 'white',
                                                                fontWeight: 600, cursor: 'pointer', mt: 1
                                                            }}
                                                                onClick={AddNewSpareUnderAsset}>
                                                                Add
                                                            </Box>
                                                        </Box>
                                                    </> : null}
                                            </Box> : null} */}
                                            {/* <Box sx={{ mb: 2 }}>
                                            <Typography
                                                sx={{
                                                    bgcolor: 'yellow', pl: 1,
                                                    flex: 1,
                                                    fontWeight: 700,
                                                    background: `linear-gradient(
                                                             to right,
                                                             #334DA1, #2A59A9, #2863AF, #286FB3, #277BBA, #2884BF, #268DC5, #23A0CE, #21B9DC,#22C7E1,#1DDEEE
                                                                 )`,
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    display: 'inline',
                                                }}
                                            >
                                                Department Service Details
                                            </Typography>
                                            <Box sx={{ flex: 1, display: 'flex', mt: .5, gap: .8, ml: 1, mr: 2.5 }}>
                                                <Box sx={{ flex: 1.5 }}>
                                                    <Typography sx={{ pl: .5, fontWeight: 600 }}>
                                                        Serviced by
                                                    </Typography>
                                                    <EmployeeSelectJoyAutoComp employee={spareCheckEmp} setEmployee={setspareCheckEmp} />
                                                </Box>
                                                <Box sx={{ flex: .5 }}>
                                                    <Typography sx={{ pl: .5, fontWeight: 600 }}>
                                                        Serviced Date
                                                    </Typography>
                                                    <Input
                                                        type="datetime-local"
                                                        name="serviced_date"
                                                        value={serviced_date}
                                                        onChange={UpdateServiceDeptDetails}
                                                    />
                                                </Box>
                                                <Box sx={{ flex: 2.5 }}>
                                                    <Typography sx={{ pl: .5, fontWeight: 600 }}>
                                                        Issues Identified
                                                    </Typography>
                                                    <Textarea
                                                        placeholder='type here...'
                                                        name="service_issues_identified"
                                                        value={service_issues_identified}
                                                        onChange={UpdateServiceDeptDetails}
                                                    >
                                                    </Textarea>
                                                </Box>
                                                <Box sx={{ flex: 2.5 }}>
                                                    <Typography sx={{ pl: .5, fontWeight: 600 }}>
                                                        Remarks
                                                    </Typography>
                                                    <Textarea
                                                        placeholder='type here...'
                                                        name="serviced_issue_remarks"
                                                        value={serviced_issue_remarks}
                                                        onChange={UpdateServiceDeptDetails}
                                                    >
                                                    </Textarea>
                                                </Box>
                                                <Box sx={{ pt: 3.3 }}>
                                                    <AddCircleIcon sx={{ height: 30, width: 30, cursor: 'pointer' }} onClick={AddDeptServiceDetails} />
                                                </Box>
                                            </Box>
                                            {deptServDetailsData.length !== 0 ?
                                                <Box>
                                                    <Box sx={{ flex: 1, display: 'flex', ml: 1, mr: 2, bgcolor: '#EBEFFB', mt: 1 }}>
                                                        <Box sx={{ flex: .2, pl: 3 }} >
                                                            #
                                                        </Box>
                                                        <Box sx={{ flex: .3 }} >
                                                            Edit
                                                        </Box>
                                                        <Box sx={{ flex: 1 }} >
                                                            Attended by
                                                        </Box>
                                                        <Box sx={{ flex: 1 }} >
                                                            Serviced Date
                                                        </Box>
                                                        <Box sx={{ flex: 3 }} >
                                                            Issues Identified
                                                        </Box>
                                                        <Box sx={{ flex: 3 }} >
                                                            Remarks
                                                        </Box>
                                                    </Box>
                                                    {deptServDetailsData?.map((val, index) => {
                                                        return (
                                                            <Box key={val.serviced_emp_detail_slno} sx={{
                                                                flex: 1, display: 'flex', ml: 1, mr: 2, borderBottom: 2,
                                                                borderColor: '#E0E1E3', mt: .5
                                                            }}>
                                                                <Box sx={{ flex: .2, pl: 3 }} >
                                                                    {index + 1}
                                                                </Box>
                                                                <Box sx={{ flex: .3 }} >
                                                                    <ModeEditIcon sx={{ cursor: 'pointer' }} onClick={() => rowSelect(val)} />
                                                                </Box>
                                                                <Box sx={{ flex: 1 }} >
                                                                    {val.em_name}
                                                                </Box>
                                                                <Box sx={{ flex: 1 }} >
                                                                    {val.serviced_date}
                                                                </Box>
                                                                <Box sx={{ flex: 3 }} >
                                                                    {val.service_issues_identified}
                                                                </Box>
                                                                <Box sx={{ flex: 3 }} >
                                                                    {val.serviced_issue_remarks}
                                                                </Box>

                                                            </Box>

                                                        )
                                                    })}
                                                </Box> : null}
                                            <Box sx={{ flex: 1, border: 1, ml: 1, mr: 1.5, borderRadius: 4, mt: .8, display: 'flex', borderColor: '#CDD7E1' }}>
                                                <label htmlFor="file-input">
                                                    <Box sx={{
                                                        display: 'flex', bgcolor: '#4A7212', px: 1, borderRadius: 10, cursor: 'pointer',
                                                        '&:hover': { bgcolor: '#59981A', }, m: .5,
                                                    }}>
                                                        <AttachmentOutlinedIcon sx={{ p: .3, color: 'white', }} />
                                                        <Typography sx={{ color: 'white', fontSize: 13, px: .3, pt: .3 }}>
                                                            Upload File
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
                                                <Box sx={{ display: 'flex', flex: 1, mx: .5, mt: .5, overflow: 'auto' }}>
                                                    {selectFile && selectFile.map((file, index) => (
                                                        <Box key={index}>
                                                            <CssVarsProvider>
                                                                <Chip sx={{ bgcolor: '#E0EBE5', width: '100%', ml: .5 }}>
                                                                    {file.name}
                                                                    <CloseIcon sx={{
                                                                        pl: .3, pb: .3, height: 20, width: 20, cursor: 'pointer', color: '#4D0011',
                                                                        '&:hover': { color: '#BA0F30' },
                                                                    }}
                                                                        onClick={() => handleRemoveFile(index)}
                                                                    />
                                                                </Chip>
                                                            </CssVarsProvider>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </Box>
                                            <Box sx={{ mt: 2, flex: 1, }}>
                                                <Box sx={{ display: 'flex', gap: .5, flex: 1, ml: 1, }}>
                                                    <Box sx={{ mt: .4 }} onClick={holdService}>
                                                        {serviceHoldFlag === 1 ? (
                                                            <TimelapseIcon sx={{ cursor: 'pointer', color: '#B23D36', height: 26, width: 26, }} />
                                                        ) : (
                                                            <RadioButtonUncheckedIcon sx={{ cursor: 'pointer', color: '#B23D36', height: 26, width: 26, }} />
                                                        )}
                                                    </Box>
                                                    <Typography sx={{ color: '#B23D36', pt: 0.3, fontWeight: 600 }}>
                                                        Service Status
                                                    </Typography>
                                                </Box>

                                                <Box sx={{ flex: 1, display: 'flex', mr: 2, pl: 4 }}>
                                                    {serviceHoldFlag === 1 ?
                                                        <Box sx={{ flex: .8 }}>
                                                            <AmServiceStatus holdReason={serviceStatus} setHoldReason={setServiceStatus} />
                                                        </Box> : null}
                                                    {serviceHoldFlag === 1 ?
                                                        <>
                                                            <Textarea minRows={1} placeholder='status remarks...' sx={{ ml: 1, flex: 2, }}
                                                                name="service_on_hold_reason"
                                                                value={service_on_hold_reason}
                                                                onChange={UpdateServicedtl}
                                                            />
                                                            <Box sx={{ pl: 1, pt: .5 }}>
                                                                <AddCircleIcon sx={{ height: 30, width: 30, cursor: 'pointer' }} onClick={ServiceStatus} />
                                                            </Box>
                                                        </> : null}
                                                </Box>



                                            </Box>
                                        </Box> */}
                                            {/* <Box sx={{ display: 'flex', gap: .5, flex: 1, ml: 1, mt: 2 }}>
                                            <Box sx={{ mt: .4 }} onClick={ServiceByEmp}>
                                                {servicedByEmp === 1 ? (
                                                    <CheckCircleIcon sx={{ cursor: 'pointer', color: '#394060' }} />
                                                ) : (
                                                    <RadioButtonUncheckedIcon sx={{ cursor: 'pointer', color: '#394060' }} />
                                                )}
                                            </Box>
                                            <Typography sx={{ color: '#394060', pt: 0.3, fontWeight: 600 }}>
                                                Service Done
                                            </Typography>



                                        </Box> */}
                                            {/* 
                                        {servicedByEmp === 1 ?
                                            <Box>
                                                <Box
                                                    sx={{ flex: 1, display: 'flex', ml: 3, mt: 1.5 }}
                                                >
                                                    <Box >
                                                        <Typography sx={{ flex: 1, fontSize: 15, fontWeight: 700, pl: 1 }}>
                                                            <u>PM Details</u>
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', ml: .5, mt: 1 }}>
                                                            <Typography sx={{ fontWeight: 500, fontSize: 14, width: 130 }}>
                                                                Installation Date
                                                            </Typography>
                                                            :
                                                            <Input
                                                                size="sm"
                                                                type='date'
                                                                sx={{
                                                                    minHeight: 25,
                                                                    maxHeight: 25,
                                                                    lineHeight: 1,
                                                                    borderRadius: 20,
                                                                    ml: 1.8,
                                                                    borderColor: '#E6E4F5',
                                                                    width: 130,
                                                                    fontSize: 14, fontWeight: 500
                                                                }}
                                                                name="instalationDate"
                                                                value={instalationDate}
                                                                onChange={UpdateinstalationDate}
                                                            />
                                                        </Box>
                                                        <Box sx={{ display: 'flex', ml: .5, mt: .3 }}>
                                                            <Typography sx={{ fontWeight: 500, fontSize: 14, width: 130 }}>
                                                                Next PM with in
                                                            </Typography>
                                                            :
                                                            <Input
                                                                size="sm"
                                                                type='number'
                                                                sx={{
                                                                    minHeight: 25,
                                                                    maxHeight: 25,
                                                                    lineHeight: 1,
                                                                    borderRadius: 20,
                                                                    ml: 1.8,
                                                                    borderColor: '#E6E4F5',
                                                                    width: 130,
                                                                    fontSize: 14, fontWeight: 500
                                                                }}

                                                                name="dueDateCount"
                                                                value={dueDateCount}
                                                                onChange={UpdatedueDateCount}
                                                                endDecorator={<Box>Days</Box>}
                                                            />
                                                        </Box>
                                                        <Box sx={{ display: 'flex', ml: .5, mt: .3 }}>
                                                            <Typography sx={{ fontWeight: 500, fontSize: 14, width: 130 }}>
                                                                Next PM Dates
                                                            </Typography>
                                                            :
                                                            <Input
                                                                size="sm"
                                                                type='date'
                                                                sx={{
                                                                    minHeight: 25,
                                                                    maxHeight: 25,
                                                                    lineHeight: 1,
                                                                    borderRadius: 20,
                                                                    ml: 1.8,
                                                                    borderColor: '#E6E4F5',
                                                                    width: 130,
                                                                    fontSize: 14, fontWeight: 500
                                                                }}
                                                                name="dueDate"
                                                                value={dueDate}
                                                                disabled={true}
                                                            />
                                                        </Box>
                                                    </Box>

                                                    <Box sx={{ flex: 1, pt: 6, pl: 3, display: 'flex' }}>
                                                        <Tooltip title={'PM details will be added by clicking'} color='neutral' placement='top'>
                                                            <Box onClick={SavePMDetails} sx={{ display: "flex", cursor: 'pointer', pt: 1 }} >
                                                                {daysEnable === 1 ? <>
                                                                    {pmFlag === 1 ? <CheckBoxIcon sx={{ height: 28, width: 28, color: '#394060', border: 1, }} /> :
                                                                        <CheckBoxOutlineBlankIcon sx={{ height: 28, width: 28, color: '#394060', border: 1, }} />}
                                                                    <Typography sx={{ fontSize: 14, color: '#394060', pt: .5, ml: .5, fontWeight: 500 }}>
                                                                        PM Changed
                                                                    </Typography>   </> : null}
                                                            </Box>
                                                        </Tooltip>
                                                        {pmFlag === 1 ?
                                                            <Box sx={{ display: 'flex', cursor: 'pointer', pt: 1 }} onClick={qrCodeOpen} >
                                                                <QrCode2Icon sx={{ color: 'black', border: 1, height: 30, width: 30, p: .3, borderRadius: 0, ml: 5 }} />
                                                                <Typography sx={{ ml: .5, fontSize: 14, color: 'black', pt: .5, fontWeight: 500 }}>
                                                                    Print QR
                                                                </Typography>
                                                            </Box> : null}
                                                    </Box>

                                                </Box>

                                                <Box sx={{ display: 'flex', mb: 2 }}
                                                >
                                                    <Box sx={{
                                                        width: 200, borderRadius: 5, gap: .5, py: .5, bgcolor: '#1B669D',
                                                        boxShadow: '1px 2px 4px', cursor: 'pointer', ml: 1.5, color: 'white', mt: 1.5, display: 'flex', justifyContent: 'center',
                                                        '&:hover': { bgcolor: '#7391C8', color: 'white' },

                                                    }} onClick={AddTostock}>
                                                        Restore
                                                    </Box>
                                                    <Box sx={{
                                                        width: 210, px: 1, borderRadius: 5, gap: .5, py: .5, bgcolor: '#8B0000',
                                                        boxShadow: '1px 2px 3px', cursor: 'pointer', mt: 1.5, color: 'white', ml: 1,
                                                        '&:hover': { bgcolor: '#E44650', color: 'white' },
                                                    }} onClick={TransferToCondmination}>
                                                        Transfer to Condemnation List
                                                    </Box>

                                                </Box>
                                            </Box>
                                            : null} */}
                                        </Box>
                                    </TabPanel> : null}

                                {spare_asset_no === undefined ?
                                    <TabPanel value={1} sx={{
                                        p: 0,
                                        flexGrow: 1,
                                        overflowY: 'auto',
                                        maxHeight: 'calc(90vh - 230px)',
                                    }}>
                                        <Box
                                            sx={{
                                                flexGrow: 1,
                                                overflowY: 'auto',
                                                maxHeight: '100%',
                                                m: 0,
                                                pt: 2
                                            }}>
                                            {spareDetails.length !== 0 ?
                                                <Box sx={{ flex: 1, mb: 3 }}>
                                                    <Typography
                                                        sx={{
                                                            flex: 1, pl: 1,
                                                            fontWeight: 700,
                                                            color: '#334DA1',

                                                        }}
                                                    >
                                                        Asset Include Spares
                                                    </Typography>
                                                    {spareDetails.length !== 0 && (
                                                        <Box sx={{ flex: 1, mx: 1, mt: 1, display: 'flex', bgcolor: '#E6E4F5' }}>
                                                            <Box sx={{ flex: 1, textAlign: 'center', fontSize: 15, fontWeight: 600 }}>#</Box>
                                                            <Box sx={{ flex: 2, fontSize: 14, fontWeight: 600 }}>Spare Number</Box>
                                                            <Box sx={{ flex: 10, fontSize: 14, fontWeight: 600 }}>Spare Name</Box>
                                                            <Box sx={{ flex: 1.5, textAlign: 'center', fontSize: 14, fontWeight: 600, }}>Service</Box>
                                                        </Box>
                                                    )}
                                                    {spareDetails.map((val, index) => {
                                                        const formattedSlno = val.spare_asset_no_only.toString().padStart(6, '0');
                                                        return (
                                                            <Box key={index} sx={{ flex: 1, mx: 1, display: 'flex', borderBottom: 1, borderColor: 'lightgrey', pt: .8 }}>
                                                                <Box sx={{ flex: 1, textAlign: 'center', fontSize: 13, fontWeight: 500 }}>{index + 1}</Box>
                                                                <Box sx={{ flex: 2, fontSize: 13, fontWeight: 500 }}>{val.spare_asset_no}/{formattedSlno}</Box>
                                                                <Box sx={{ flex: 10, fontSize: 13, fontWeight: 500 }}>{val.item_name}</Box>

                                                                <Tooltip title={'Spare will be Transfer to Service List by clicking'}
                                                                    sx={{ width: 200, }} color='warning' placement='top'>
                                                                    <Box sx={{ flex: 1.2, textAlign: 'center', fontSize: 13, pr: .5, cursor: 'pointer' }}>
                                                                        <ManageAccountsSharpIcon sx={{
                                                                            color: '#603A70', cursor: 'pointer', p: .1,
                                                                            '&:hover': { color: '#0000FF' },
                                                                        }}
                                                                            onClick={() => serviceSparee(val)}
                                                                        />
                                                                    </Box>
                                                                </Tooltip>
                                                            </Box>
                                                        );
                                                    })}
                                                </Box> : null}
                                            {item_asset_no_only !== undefined ?
                                                <Box sx={{ mb: 2 }}>
                                                    <Typography
                                                        sx={{
                                                            flex: 1, pl: 1,
                                                            fontWeight: 700,
                                                            color: '#334DA1',

                                                        }}
                                                    >
                                                        Spare Replace - From Asset
                                                    </Typography>
                                                    <Typography sx={{ flex: 1, fontSize: 15, fontWeight: 600, ml: 1.3, mt: .5 }}>
                                                        <u>Add new spare</u>
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', flex: 1 }}>
                                                        <Box sx={{ ml: 1, flex: 1, }}>
                                                            <CmSpareList sparez={sparez} setSparez={setSparez}
                                                                item_custodian_dept={item_custodian_dept}
                                                                setSpareName={setSpareName} />
                                                        </Box>
                                                        <Box sx={{ ml: 1, mr: 5, pt: 1, }}>
                                                            <AddCircleIcon sx={{ height: 28, width: 28, cursor: 'pointer' }} onClick={AddNewSpare} />
                                                        </Box>
                                                    </Box>
                                                    {spareData.length !== 0 ?
                                                        <>
                                                            <Box sx={{ flex: 1, mx: 1, display: 'flex', bgcolor: '#D4D0F1   ', mt: 1 }}>
                                                                <Box sx={{ flex: .5, textAlign: 'center', fontSize: 15, fontWeight: 600, color: 'black', }}>#</Box>
                                                                <Box sx={{ flex: 10, fontSize: 14, fontWeight: 600, color: 'black', }}>Spare Name</Box>
                                                                <Box sx={{ flex: 1, textAlign: 'center', fontSize: 14, fontWeight: 600, pr: .3, color: 'black', }}>Action</Box>
                                                            </Box>
                                                            {spareData.map((val, index) => {
                                                                return (
                                                                    <Box key={index} sx={{
                                                                        flex: 1, mx: 1, display: 'flex', borderBottom: 1, borderColor: 'lightgrey', py: .5
                                                                    }}>
                                                                        <Box sx={{ flex: .5, textAlign: 'center', fontSize: 13 }}>{index + 1}</Box>
                                                                        <Box sx={{ flex: 10, fontSize: 13 }}>{val.name}</Box>
                                                                        <Tooltip title={'Spare will be removed  by clicking'}
                                                                            color='neutral' placement='left'>
                                                                            <Box sx={{ flex: 1, textAlign: 'center', fontSize: 13, pr: .5, cursor: 'pointer' }}>
                                                                                <DeleteForeverIcon sx={{
                                                                                    color: 'darkred', cursor: 'pointer', p: .1,
                                                                                    '&:hover': { color: 'red' },
                                                                                }}
                                                                                    onClick={() => handleDelete(index)}
                                                                                />

                                                                            </Box>
                                                                        </Tooltip>
                                                                    </Box>
                                                                );
                                                            })}

                                                            <Box sx={{ flex: 1, }}>
                                                                <Box sx={{
                                                                    bgcolor: '#D4D0F1', width: 100, textAlign: 'center', margin: 'auto', borderRadius: 5, color: 'Black',
                                                                    fontWeight: 600, cursor: 'pointer', mt: 1
                                                                }}
                                                                    onClick={AddNewSpareUnderAsset}>
                                                                    Add
                                                                </Box>
                                                            </Box>
                                                        </> : null}
                                                </Box> : null}
                                        </Box>
                                    </TabPanel> : null}
                                <TabPanel value={2} sx={{
                                    p: 0,
                                    flexGrow: 1,
                                    overflowY: 'auto',
                                    maxHeight: 'calc(90vh - 230px)',
                                    mt: 2
                                }}>
                                    <Box
                                        sx={{
                                            flexGrow: 1,
                                            overflowY: 'auto',
                                            maxHeight: '100%',
                                            m: 0,
                                            pl: 1,
                                            py: 2
                                        }}
                                    >
                                        <Box sx={{ mb: 2 }}>
                                            <Box sx={{ display: 'flex', }}>
                                                <Checkbox
                                                    size="lg"
                                                    color='primary'
                                                    checked={deptservicecheck === 1}
                                                    onChange={handleDeptServiceChange}
                                                />
                                                <Typography
                                                    sx={{
                                                        pl: 1,
                                                        flex: 1,
                                                        fontWeight: 600,
                                                        color: '#394060',
                                                    }}
                                                >
                                                    Department Service Details
                                                </Typography>
                                            </Box>
                                            {deptservicecheck === 1 ? <Box>
                                                <Box sx={{ flex: 1, display: 'flex', mt: 1, gap: .8, pl: 4, pr: 2 }}>
                                                    <Box sx={{ flex: 1.3 }}>
                                                        <Typography sx={{ pl: .5, fontWeight: 400 }}>
                                                            Serviced by
                                                        </Typography>
                                                        <EmployeeSelectJoyAutoComp employee={spareCheckEmp} setEmployee={setspareCheckEmp} />
                                                    </Box>
                                                    <Box sx={{ flex: .5 }}>
                                                        <Typography sx={{ pl: .5, fontWeight: 400 }}>
                                                            Serviced Date
                                                        </Typography>
                                                        <Input
                                                            type="datetime-local"
                                                            name="serviced_date"
                                                            value={serviced_date}
                                                            onChange={UpdateServiceDeptDetails}
                                                        />
                                                    </Box>
                                                    <Box sx={{ flex: 2.5 }}>
                                                        <Typography sx={{ pl: .5, fontWeight: 400 }}>
                                                            Issues Identified
                                                        </Typography>
                                                        <Textarea
                                                            placeholder='type here...'
                                                            name="service_issues_identified"
                                                            value={service_issues_identified}
                                                            onChange={UpdateServiceDeptDetails}
                                                        >
                                                        </Textarea>
                                                    </Box>
                                                    <Box sx={{ flex: 2.5 }}>
                                                        <Typography sx={{ pl: .5, fontWeight: 400 }}>
                                                            Remarks
                                                        </Typography>
                                                        <Textarea
                                                            placeholder='type here...'
                                                            name="serviced_issue_remarks"
                                                            value={serviced_issue_remarks}
                                                            onChange={UpdateServiceDeptDetails}
                                                        >
                                                        </Textarea>
                                                    </Box>
                                                    <Box sx={{ pt: 3.3 }}>
                                                        <AddCircleIcon sx={{ height: 30, width: 30, cursor: 'pointer' }} onClick={AddDeptServiceDetails} />
                                                    </Box>
                                                </Box>
                                                {deptServDetailsData.length !== 0 ?
                                                    <Box>
                                                        <Box sx={{ flex: 1, display: 'flex', mr: 2, bgcolor: '#EBEFFB', mt: 1, ml: 4 }}>
                                                            <Box sx={{ flex: .5, pl: 3, color: 'black', mr: 1 }} >
                                                                #
                                                            </Box>
                                                            <Box sx={{ flex: .5, color: 'black', mr: 1 }} >
                                                                Edit
                                                            </Box>
                                                            <Box sx={{ flex: 2, color: 'black', mr: 1 }} >
                                                                Attended by
                                                            </Box>
                                                            <Box sx={{ flex: 2, color: 'black', mr: 1 }} >
                                                                Serviced Date
                                                            </Box>
                                                            <Box sx={{ flex: 5, color: 'black', mr: 1 }} >
                                                                Issues Identified
                                                            </Box>
                                                            <Box sx={{ flex: 5, color: 'black', }} >
                                                                Remarks
                                                            </Box>
                                                        </Box>
                                                        {deptServDetailsData?.map((val, index) => {
                                                            return (
                                                                <Box key={val.serviced_emp_detail_slno} sx={{
                                                                    flex: 1, display: 'flex', ml: 4, mr: 2, borderBottom: 2,
                                                                    borderColor: '#E0E1E3', mt: .5
                                                                }}>
                                                                    <Box sx={{ flex: .5, pl: 3, mr: 1 }} >
                                                                        {index + 1}
                                                                    </Box>
                                                                    <Box sx={{ flex: .5, mr: 1 }} >
                                                                        <ModeEditIcon sx={{ cursor: 'pointer' }} onClick={() => rowSelect(val)} />
                                                                    </Box>
                                                                    <Box sx={{ flex: 2, mr: 1 }} >
                                                                        {val.em_name}
                                                                    </Box>
                                                                    <Box sx={{ flex: 2, mr: 1 }} >
                                                                        {val.serviced_date}
                                                                    </Box>
                                                                    <Box sx={{ flex: 5, mr: 1 }} >
                                                                        {val.service_issues_identified}
                                                                    </Box>
                                                                    <Box sx={{ flex: 5 }} >
                                                                        {val.serviced_issue_remarks}
                                                                    </Box>

                                                                </Box>

                                                            )
                                                        })}
                                                    </Box> : null}
                                                <Box sx={{ flex: 1, border: 1, ml: 4, mr: 1.7, borderRadius: 4, mt: .8, display: 'flex', borderColor: '#CDD7E1' }}>
                                                    <label htmlFor="file-input">
                                                        <Box sx={{
                                                            display: 'flex', bgcolor: '#4A7212', px: 1, borderRadius: 10, cursor: 'pointer',
                                                            '&:hover': { bgcolor: '#59981A', }, m: .5,
                                                        }}>
                                                            <AttachmentOutlinedIcon sx={{ p: .3, color: 'white', }} />
                                                            <Typography sx={{ color: 'white', fontSize: 13, px: .3, pt: .3 }}>
                                                                Upload File
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
                                                    <Box sx={{ display: 'flex', flex: 1, mx: .5, mt: .5, overflow: 'auto' }}>
                                                        {selectFile && selectFile.map((file, index) => (
                                                            <Box key={index}>
                                                                <CssVarsProvider>
                                                                    <Chip sx={{ bgcolor: '#E0EBE5', width: '100%', ml: .5 }}>
                                                                        {file.name}
                                                                        <CloseIcon sx={{
                                                                            pl: .3, pb: .3, height: 20, width: 20, cursor: 'pointer', color: '#4D0011',
                                                                            '&:hover': { color: '#BA0F30' },
                                                                        }}
                                                                            onClick={() => handleRemoveFile(index)}
                                                                        />
                                                                    </Chip>
                                                                </CssVarsProvider>
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                </Box>
                                            </Box> : null}

                                            {/* <Box sx={{ mt: 2, flex: 1, bgcolor: 'yellow' }}>
                                                <Box sx={{ display: 'flex', flex: 1, }}>
                                                    <Box sx={{ mt: .4 }} onClick={holdService}>
                                                        {serviceHoldFlag === 1 ? (
                                                            <TimelapseIcon sx={{ cursor: 'pointer', color: '#B23D36', height: 30, width: 30, }} />
                                                        ) : (
                                                            <RadioButtonUncheckedIcon sx={{ cursor: 'pointer', color: '#B23D36', height: 30, width: 30, }} />
                                                        )}
                                                    </Box>
                                                    <Typography sx={{ color: '#B23D36', fontWeight: 600 }}>
                                                        Service Status
                                                    </Typography>
                                                </Box>

                                                <Box sx={{ flex: 1, display: 'flex', mr: 2, pl: 1.1 }}>
                                                    {serviceHoldFlag === 1 ?
                                                        <Box sx={{ flex: .8 }}>
                                                            <AmServiceStatus holdReason={serviceStatus} setHoldReason={setServiceStatus} />
                                                        </Box> : null}
                                                    {serviceHoldFlag === 1 ?
                                                        <>
                                                            <Textarea minRows={1} placeholder='status remarks...' sx={{ ml: 1, flex: 2, }}
                                                                name="service_on_hold_reason"
                                                                value={service_on_hold_reason}
                                                                onChange={UpdateServicedtl}
                                                            />
                                                            <Box sx={{ pl: 1, pt: .5 }}>
                                                                <LibraryAddIcon sx={{ height: 30, width: 30, cursor: 'pointer', color: '#B23D36' }} onClick={ServiceStatus} />
                                                            </Box>
                                                        </> : null}
                                                </Box>
                                            </Box> */}
                                        </Box>
                                        <Box sx={{ mb: 2 }}>
                                            <Box sx={{ display: 'flex', }}>
                                                <Checkbox
                                                    size="lg"
                                                    color='neutral'
                                                    checked={serviceStatusCheck === 1}
                                                    onChange={handleServiceStatusChange}
                                                />
                                                <Typography
                                                    sx={{
                                                        px: 1,
                                                        fontWeight: 600,
                                                        color: '#394060',
                                                    }}
                                                >
                                                    Service Status
                                                </Typography>
                                                {/* <TimelapseIcon sx={{ color: '#394060', }} /> */}
                                            </Box>
                                            {serviceStatusCheck === 1 ?
                                                <Box sx={{ flex: 1, display: 'flex', mr: 2, pl: 4, pt: 1 }}>
                                                    <Box sx={{ flex: .8 }}>
                                                        <AmServiceStatus holdReason={serviceStatus} setHoldReason={setServiceStatus} />
                                                    </Box>
                                                    <Textarea minRows={1} placeholder='status remarks...' sx={{ ml: 1, flex: 2, }}
                                                        name="service_on_hold_reason"
                                                        value={service_on_hold_reason}
                                                        onChange={UpdateServicedtl}
                                                    />
                                                    <Box sx={{ pl: 1, pt: .5 }}>
                                                        <LibraryAddIcon sx={{ height: 30, width: 30, cursor: 'pointer', color: '#636B74' }} onClick={ServiceStatus} />
                                                    </Box>

                                                </Box> : null}
                                        </Box>
                                        <Box sx={{ mb: 2 }}>
                                            <Box sx={{ display: 'flex', }}>
                                                <Checkbox
                                                    size="lg"
                                                    color='primary'
                                                    checked={checked === 1}
                                                    onChange={handleChange}
                                                />
                                                <Typography
                                                    sx={{
                                                        px: 1,
                                                        fontWeight: 600,
                                                        color: '#394060',

                                                    }}
                                                >
                                                    Contact Supplier
                                                </Typography>
                                                {/* <LocalShippingOutlinedIcon sx={{ color: '#394060', }} /> */}
                                            </Box>
                                            {checked === 1 ? <Box sx={{ pl: 4 }}>
                                                {warrentyOrGuaranteeDetl.length === 0 && amcCmcDetails.length === 0 ?
                                                    null :
                                                    <Box sx={{ mb: 2 }}>
                                                        <Typography sx={{ flex: 1, fontSize: 15, fontWeight: 600, mt: 2, color: '#0B6BCB' }}>
                                                            Item Assurance and Maintenance
                                                        </Typography>
                                                        {warrentyOrGuaranteeDetl.length !== 0 ? <>
                                                            <Box sx={{ display: 'flex', mt: 1 }}>
                                                                <Box sx={{ display: 'flex' }}>
                                                                    <Checkbox
                                                                        color="primary"
                                                                        variant="outlined"
                                                                        checked={selected === 'guarantee'}
                                                                        onChange={() => handleCheckboxChange('guarantee')}
                                                                        disabled={selected === 'warranty'}
                                                                        sx={{ mt: .5, mr: 1 }}

                                                                    />
                                                                    <Typography>
                                                                        guarantee
                                                                    </Typography>
                                                                </Box>
                                                                <Box sx={{ display: 'flex' }}>
                                                                    <Checkbox
                                                                        color="primary"
                                                                        variant="outlined"
                                                                        checked={selected === 'warranty'}
                                                                        onChange={() => handleCheckboxChange('warranty')}
                                                                        disabled={selected === 'guarantee'}
                                                                        sx={{ mt: .5, ml: 2, mr: 1 }}
                                                                    />
                                                                    <Typography>
                                                                        warranty
                                                                    </Typography>
                                                                </Box>
                                                            </Box>

                                                            {warrentyOrGuaranteeDetl?.map((val, index) => {
                                                                return (
                                                                    <Box sx={{ flex: 1, pt: 2 }} key={index}>
                                                                        <Box sx={{ display: 'flex', flex: 1 }}>
                                                                            <Box sx={{ color: '#6F7479', fontWeight: 600, width: 115 }}>
                                                                                From Date
                                                                            </Box>
                                                                            <Box sx={{ flex: 1, }}>
                                                                                : {val.from_date}
                                                                            </Box>
                                                                        </Box>
                                                                        <Box sx={{ display: 'flex', flex: 1 }}>
                                                                            <Box sx={{ color: '#6F7479', fontWeight: 600, width: 115 }}>
                                                                                To Date
                                                                            </Box>
                                                                            <Box sx={{ flex: 1, }}>
                                                                                : {val.to_date}
                                                                            </Box>
                                                                        </Box>
                                                                    </Box>
                                                                )
                                                            })}
                                                        </> : null}

                                                        {amcCmcDetails.length !== 0 ?
                                                            <>
                                                                <Box sx={{ display: 'flex', mt: 2 }}>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Checkbox
                                                                            color="primary"
                                                                            variant="outlined"
                                                                            checked={amcCmcSelected === 'Amc'}
                                                                            onChange={() => handleAmcCmcCheckboxChange('Amc')}
                                                                            disabled={amcCmcSelected === 'Cmc'}
                                                                            sx={{ mt: .5, mr: 1 }}

                                                                        />
                                                                        <Typography>
                                                                            Amc
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Checkbox
                                                                            color="primary"
                                                                            variant="outlined"
                                                                            checked={amcCmcSelected === 'Cmc'}
                                                                            onChange={() => handleAmcCmcCheckboxChange('Cmc')}
                                                                            disabled={amcCmcSelected === 'Amc'}
                                                                            sx={{ mt: .5, ml: 7, mr: 1 }}
                                                                        />
                                                                        <Typography>
                                                                            Cmc
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                                {amcCmcDetails?.[0] && (
                                                                    <Box sx={{ flex: 1, pt: 2 }}>
                                                                        <Box sx={{ display: 'flex', flex: 1 }}>
                                                                            <Box sx={{ color: '#6F7479', fontWeight: 600 }}>
                                                                                Supplier Name
                                                                            </Box>
                                                                            <Box sx={{ flex: 1, pl: 2 }}>
                                                                                : {amcCmcDetails[0]?.it_supplier_name || 'N/A'}
                                                                            </Box>
                                                                        </Box>
                                                                        <Box sx={{ display: 'flex', flex: 1 }}>
                                                                            <Box sx={{ color: '#6F7479', fontWeight: 600 }}>
                                                                                From Date
                                                                            </Box>
                                                                            <Box sx={{ flex: 1, pl: 5.5 }}>
                                                                                : {amcCmcDetails[0]?.from_date || 'N/A'}
                                                                            </Box>
                                                                        </Box>
                                                                        <Box sx={{ display: 'flex', flex: 1 }}>
                                                                            <Box sx={{ color: '#6F7479', fontWeight: 600 }}>
                                                                                To Date
                                                                            </Box>
                                                                            <Box sx={{ flex: 1, pl: 7.8 }}>
                                                                                : {amcCmcDetails[0]?.to_date || 'N/A'}
                                                                            </Box>
                                                                        </Box>
                                                                    </Box>
                                                                )}
                                                            </>
                                                            : null}

                                                    </Box>}
                                                <Box sx={{ mt: 1.5 }}>
                                                    <Typography sx={{ flex: 1, fontSize: 15, fontWeight: 600, pl: .5 }}>
                                                        <u>Select Supplier </u>
                                                    </Typography>
                                                    <SupplierDetailsAutoComplte value={supplierSelect} setValue={setsupplierSelect} />
                                                </Box>

                                                {
                                                    supplierSelect !== 0 ?
                                                        <>
                                                            {SupplierDetails?.map((val, index) => {
                                                                return (
                                                                    <Box
                                                                        key={index}>
                                                                        <Box sx={{ flex: 1, mt: 1.5, display: 'flex' }}>
                                                                            <Typography sx={{ flex: .4, ml: 1, fontSize: 14, fontWeight: 600 }}>
                                                                                Contact No.
                                                                            </Typography>
                                                                            <Box sx={{
                                                                                flex: 3,
                                                                                borderRadius: 5,
                                                                                pt: .2
                                                                            }}>
                                                                                {val.it_supplier_mob_one !== null ? <Chip>
                                                                                    <PhoneIcon /> {val.it_supplier_mob_one}
                                                                                </Chip> : null}
                                                                                {val.it_supplier_mob_two !== null ? <Chip>
                                                                                    <PhoneIcon /> {val.it_supplier_mob_two}
                                                                                </Chip> : null}
                                                                                {val.it_supplier_land_one !== null ? <Chip>
                                                                                    <PhoneIcon /> {val.it_supplier_land_one}
                                                                                </Chip> : null}
                                                                                {val.it_supplier_land_two !== null ? <Chip>
                                                                                    <PhoneIcon /> {val.it_supplier_land_two}
                                                                                </Chip> : null}
                                                                                {val.it_supplier_escl_mob_one !== null && val.it_supplier_escl_mob_one !== val.it_supplier_mob_one ? <Chip>
                                                                                    <PhoneIcon /> {val.it_supplier_escl_mob_one}
                                                                                </Chip> : null}
                                                                                {val.it_supplier_escl_mob_two !== null && val.it_supplier_escl_mob_two !== val.it_supplier_mob_two ? <Chip>
                                                                                    <PhoneIcon /> {val.it_supplier_escl_mob_two}
                                                                                </Chip> : null}
                                                                                {val.it_supplier_escl_land_one !== null && val.it_supplier_escl_land_one !== val.it_supplier_land_one ? <Chip>
                                                                                    <PhoneIcon /> {val.it_supplier_escl_land_one}
                                                                                </Chip> : null}
                                                                                {val.it_supplier_escl_land_two !== null && val.it_supplier_escl_land_two !== val.it_supplier_land_two ? <Chip>
                                                                                    <PhoneIcon /> {val.it_supplier_escl_land_two}
                                                                                </Chip> : null}
                                                                                {val.it_supplier_servperson_land_one !== null && val.it_supplier_servperson_land_one !== val.it_supplier_land_one ? <Chip>
                                                                                    <PhoneIcon /> {val.it_supplier_servperson_land_one}
                                                                                </Chip> : null}
                                                                                {val.it_supplier_servperson_land_two !== null && val.it_supplier_servperson_land_two !== val.it_supplier_land_two ? <Chip>
                                                                                    <PhoneIcon /> {val.it_supplier_servperson_land_two}
                                                                                </Chip> : null}
                                                                                {val.it_supplier_servperson_mob_one !== null && val.it_supplier_servperson_mob_one !== val.it_supplier_mob_one ? <Chip>
                                                                                    <PhoneIcon /> {val.it_supplier_servperson_mob_one}
                                                                                </Chip> : null}
                                                                                {val.it_supplier_servperson_mob_two !== null && val.it_supplier_servperson_mob_two !== val.it_supplier_mob_two ? <Chip>
                                                                                    <PhoneIcon /> {val.it_supplier_servperson_mob_two}
                                                                                </Chip> : null}
                                                                                {val.it_supplier_saleperson_land_one !== null && val.it_supplier_saleperson_land_one !== val.it_supplier_land_one ? <Chip>
                                                                                    <PhoneIcon /> {val.it_supplier_saleperson_land_one}
                                                                                </Chip> : null}
                                                                                {val.it_supplier_saleperson_land_two !== null && val.it_supplier_saleperson_land_two !== val.it_supplier_land_two ? <Chip>
                                                                                    <PhoneIcon /> {val.it_supplier_saleperson_land_two}
                                                                                </Chip> : null}
                                                                                {val.it_supplier_saleperson_mob_one !== null && val.it_supplier_saleperson_mob_one !== val.it_supplier_mob_one ? <Chip>
                                                                                    <PhoneIcon /> {val.it_supplier_saleperson_mob_one}
                                                                                </Chip> : null}
                                                                                {val.it_supplier_saleperson_mob_two !== null && val.it_supplier_saleperson_mob_two !== val.it_supplier_mob_two ? <Chip>
                                                                                    <PhoneIcon /> {val.it_supplier_saleperson_mob_two}
                                                                                </Chip> : null}
                                                                                {val.it_supplier_saleperson_second_land_one !== null && val.it_supplier_saleperson_second_land_one !== val.it_supplier_land_one ? <Chip>
                                                                                    <PhoneIcon /> {val.it_supplier_saleperson_second_land_one}
                                                                                </Chip> : null}
                                                                                {val.it_supplier_saleperson_second_land_two !== null && val.it_supplier_saleperson_second_land_two !== val.it_supplier_land_two ? <Chip>
                                                                                    <PhoneIcon /> {val.it_supplier_saleperson_second_land_two}
                                                                                </Chip> : null}
                                                                                {val.it_supplier_saleperson_second_mob_one !== null && val.it_supplier_saleperson_second_mob_one !== val.it_supplier_mob_one ? <Chip>
                                                                                    <PhoneIcon /> {val.it_supplier_saleperson_second_mob_one}
                                                                                </Chip> : null}
                                                                                {val.it_supplier_saleperson_second_mob_two !== null && val.it_supplier_saleperson_second_mob_two !== val.it_supplier_mob_two ? <Chip>
                                                                                    <PhoneIcon /> {val.it_supplier_saleperson_second_mob_two}
                                                                                </Chip> : null}
                                                                            </Box>
                                                                        </Box>
                                                                        <Box sx={{ flex: 1, mt: 1, display: 'flex' }}>
                                                                            <Typography sx={{ flex: .4, ml: 1, fontSize: 14, fontWeight: 600 }}>
                                                                                Email id
                                                                            </Typography>
                                                                            <Box sx={{
                                                                                flex: 3,
                                                                                pt: .2
                                                                            }}>
                                                                                {val.it_supplier_email_one !== null ? (
                                                                                    <Chip
                                                                                        component="a"
                                                                                        href={`mailto:${val.it_supplier_email_one}`}
                                                                                        clickable
                                                                                        label={<u>{val.it_supplier_email_one}</u>}
                                                                                    >
                                                                                        <u style={{ color: '#005BEA' }}>{val.it_supplier_email_one}</u>
                                                                                    </Chip>
                                                                                ) : null}

                                                                                {val.it_supplier_email_two !== null ? (
                                                                                    <Chip
                                                                                        component="a"
                                                                                        href={`mailto:${val.it_supplier_email_two}`}
                                                                                        clickable
                                                                                        label={<u>{val.it_supplier_email_two}</u>}
                                                                                    >
                                                                                        <u style={{ color: '#005BEA' }}>{val.it_supplier_email_two}</u>
                                                                                    </Chip>
                                                                                ) : null}

                                                                                {val.it_supplier_servperson_email_one !== null ? (
                                                                                    <Chip
                                                                                        component="a"
                                                                                        href={`mailto:${val.it_supplier_servperson_email_one}`}
                                                                                        clickable
                                                                                        label={<u>{val.it_supplier_servperson_email_one}</u>}
                                                                                    >
                                                                                        <u style={{ color: '#005BEA' }}>{val.it_supplier_servperson_email_one}</u>
                                                                                    </Chip>
                                                                                ) : null}

                                                                                {val.it_supplier_servperson_email_two !== null ? (
                                                                                    <Chip
                                                                                        component="a"
                                                                                        href={`mailto:${val.it_supplier_servperson_email_two}`}
                                                                                        clickable
                                                                                        label={<u>{val.it_supplier_servperson_email_two}</u>}
                                                                                    >
                                                                                        <u style={{ color: '#005BEA' }}>{val.it_supplier_servperson_email_two}</u>
                                                                                    </Chip>
                                                                                ) : null}

                                                                                {val.it_supplier_saleperson_email_one !== null ? (
                                                                                    <Chip
                                                                                        component="a"
                                                                                        href={`mailto:${val.it_supplier_saleperson_email_one}`}
                                                                                        clickable
                                                                                        label={<u>{val.it_supplier_saleperson_email_one}</u>}
                                                                                    >
                                                                                        <u style={{ color: '#005BEA' }}>{val.it_supplier_saleperson_email_one}</u>
                                                                                    </Chip>
                                                                                ) : null}

                                                                                {val.it_supplier_saleperson_email_two !== null ? (
                                                                                    <Chip
                                                                                        component="a"
                                                                                        href={`mailto:${val.it_supplier_saleperson_email_two}`}
                                                                                        clickable
                                                                                        label={<u>{val.it_supplier_saleperson_email_two}</u>}
                                                                                    >
                                                                                        <u style={{ color: '#005BEA' }}>{val.it_supplier_saleperson_email_two}</u>
                                                                                    </Chip>
                                                                                ) : null}

                                                                                {val.it_supplier_saleperson_second_email_one !== null ? (
                                                                                    <Chip
                                                                                        component="a"
                                                                                        href={`mailto:${val.it_supplier_saleperson_second_email_one}`}
                                                                                        clickable
                                                                                        label={<u>{val.it_supplier_saleperson_second_email_one}</u>}
                                                                                    >
                                                                                        <u style={{ color: '#005BEA' }}>{val.it_supplier_saleperson_second_email_one}</u>
                                                                                    </Chip>
                                                                                ) : null}

                                                                                {val.it_supplier_saleperson_second_email_two !== null ? (
                                                                                    <Chip
                                                                                        component="a"
                                                                                        href={`mailto:${val.it_supplier_saleperson_second_email_two}`}
                                                                                        clickable
                                                                                        label={<u>{val.it_supplier_saleperson_second_email_two}</u>}
                                                                                    >
                                                                                        <u style={{ color: '#005BEA' }}>{val.it_supplier_saleperson_second_email_two}</u>
                                                                                    </Chip>
                                                                                ) : null}
                                                                            </Box>
                                                                        </Box>

                                                                    </Box>
                                                                )
                                                            })}
                                                        </> : null
                                                }
                                                {
                                                    supplierSelect !== 0 ?
                                                        <Box>
                                                            <Box sx={{ flex: 1, mt: 2 }}>

                                                                <Typography
                                                                    sx={{
                                                                        fontWeight: 600,
                                                                        color: '#0B6BCB'
                                                                    }}
                                                                >
                                                                    Contacted supplier?
                                                                </Typography>

                                                                <Box sx={{ pt: 1, color: '#0B6BCB', fontWeight: 500 }}>
                                                                    {callSupplierFlag === 1 ? (
                                                                        <CheckBoxIcon sx={{ cursor: 'pointer', color: '#0B6BCB' }} onClick={callSupplier} />
                                                                    ) : (
                                                                        <CheckBoxOutlineBlankOutlinedIcon sx={{ cursor: 'pointer', color: '#0B6BCB' }} onClick={callSupplier} />
                                                                    )}
                                                                    Yes
                                                                </Box>
                                                                {callSupplierFlag === 1 ?
                                                                    <Box sx={{ flex: 1, pt: 1, display: 'flex', gap: 1, pr: 1 }}>
                                                                        <Box sx={{ flex: 2 }}>
                                                                            <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#0B6BCB', pl: .5 }}>
                                                                                Supplier Contacted Employee
                                                                            </Typography>
                                                                            <EmployeeSelectJoyAutoComp employee={supplContctEmp} setEmployee={setsupplContctEmp} />
                                                                        </Box>
                                                                        <Box sx={{ flex: 1 }}>
                                                                            <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#0B6BCB', pl: .5 }}>
                                                                                Expected date for the service visit.
                                                                            </Typography>
                                                                            <Input
                                                                                type="datetime-local"
                                                                                name="expcted_service_date"
                                                                                value={expcted_service_date}
                                                                                onChange={UpdateServicedtl}
                                                                            />

                                                                        </Box>
                                                                        <Box sx={{ flex: 3, }}>
                                                                            <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#0B6BCB', pl: .5 }}>
                                                                                Response
                                                                            </Typography>
                                                                            <Textarea type="text"
                                                                                placeholder='type here...'
                                                                                name="expcted_service_remarks"
                                                                                value={expcted_service_remarks}
                                                                                onChange={UpdateServicedtl}
                                                                            />
                                                                        </Box>
                                                                    </Box> : null}
                                                            </Box>



                                                            <Box sx={{ flex: 1, border: 1, mr: 1, borderRadius: 4, mt: .8, display: 'flex', borderColor: '#CDD7E1' }}>
                                                                <label htmlFor="file-input">
                                                                    <Box sx={{
                                                                        display: 'flex', bgcolor: '#4A7212', px: 1, borderRadius: 10, cursor: 'pointer',
                                                                        '&:hover': { bgcolor: '#59981A', }, m: .5,
                                                                    }}>
                                                                        <AttachmentOutlinedIcon sx={{ p: .3, color: 'white', }} />
                                                                        <Typography sx={{ color: 'white', fontSize: 13, px: .3, pt: .3 }}>
                                                                            Upload File
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
                                                                <Box sx={{ display: 'flex', flex: 1, mx: .5, mt: .5, overflow: 'auto' }}>
                                                                    {selectFile && selectFile.map((file, index) => (
                                                                        <Box key={index}>
                                                                            <CssVarsProvider>
                                                                                <Chip sx={{ bgcolor: '#E0EBE5', width: '100%', ml: .5 }}>
                                                                                    {file.name}
                                                                                    <CloseIcon sx={{
                                                                                        pl: .3, pb: .3, height: 20, width: 20, cursor: 'pointer', color: '#4D0011',
                                                                                        '&:hover': { color: '#BA0F30' },
                                                                                    }}
                                                                                        onClick={() => handleRemoveFile(index)}
                                                                                    />
                                                                                </Chip>
                                                                            </CssVarsProvider>
                                                                        </Box>
                                                                    ))}
                                                                </Box>
                                                            </Box>

                                                            {/* <Box sx={{ mt: 2, flex: 1, }}>
                                                        <Box sx={{ display: 'flex', gap: .5, flex: 1, ml: 1, }}>
                                                            <Box sx={{ mt: .4 }} onClick={holdService}>
                                                                {serviceHoldFlag === 1 ? (
                                                                    <TimelapseIcon sx={{ cursor: 'pointer', color: '#B23D36', height: 26, width: 26, }} />
                                                                ) : (
                                                                    <RadioButtonUncheckedIcon sx={{ cursor: 'pointer', color: '#B23D36', height: 26, width: 26, }} />
                                                                )}
                                                            </Box>
                                                            <Typography sx={{ color: '#B23D36', pt: 0.3, fontWeight: 600 }}>
                                                                Service Status
                                                            </Typography>
                                                        </Box>

                                                        <Box sx={{ flex: 1, display: 'flex', mr: 2, pl: 4 }}>
                                                            {serviceHoldFlag === 1 ?
                                                                <Box sx={{ flex: .8 }}>
                                                                    <AmServiceStatus holdReason={serviceStatus} setHoldReason={setServiceStatus} />
                                                                </Box> : null}
                                                            {serviceHoldFlag === 1 ?
                                                                <>
                                                                    <Textarea minRows={1} placeholder='status remarks...' sx={{ ml: 1, flex: 2, }}
                                                                        name="service_on_hold_reason"
                                                                        value={service_on_hold_reason}
                                                                        onChange={UpdateServicedtl}
                                                                    />
                                                                    <Box sx={{ pl: 1, pt: .5 }}>
                                                                        <AddCircleIcon sx={{ height: 30, width: 30, cursor: 'pointer' }} onClick={ServiceStatus} />
                                                                    </Box>
                                                                </> : null}
                                                        </Box>
                                                    </Box> */}

                                                            {/* {serviceDoneFlag === 1 ?
                                                            <Box sx={{ flex: 1, display: 'flex', ml: 1.5, mt: 1.5, gap: 1 }}>
                                                                <Box sx={{ flex: 1 }}>
                                                                    <Typography sx={{ color: '#32383E', fontSize: 14, fontWeight: 500, pl: .5 }}>
                                                                        Supplier Serviced Date
                                                                    </Typography>
                                                                    <Input
                                                                        type="datetime-local"
                                                                        name="suppl_serviced_date"
                                                                        value={suppl_serviced_date}
                                                                        onChange={UpdateServicedtl}
                                                                    />

                                                                </Box>
                                                                <Box sx={{ flex: 2 }}>
                                                                    <Typography sx={{ color: '#32383E', fontSize: 14, fontWeight: 500, pl: .5 }}>
                                                                        Services Performed
                                                                    </Typography>
                                                                    <Textarea type="text"
                                                                        placeholder='type here...'
                                                                        name="suppl_serviced_remarks"
                                                                        value={suppl_serviced_remarks}
                                                                        onChange={UpdateServicedtl}
                                                                    />
                                                                </Box>
                                                            </Box> : null} */}

                                                            {/* {serviceDoneFlag === 1 ? <Box
                                                            sx={{ flex: 1, display: 'flex', ml: 1.3, mt: 1.5 }}
                                                        >
                                                            <Box >
                                                                <Typography sx={{ flex: 1, fontSize: 15, fontWeight: 700, pl: .5 }}>
                                                                    <u>PM Details</u>
                                                                </Typography>
                                                                <Box sx={{ display: 'flex', ml: .5, mt: 1 }}>
                                                                    <Typography sx={{ fontWeight: 500, fontSize: 14, width: 130 }}>
                                                                        Installation Date
                                                                    </Typography>
                                                                    :
                                                                    <Input
                                                                        size="sm"
                                                                        type='date'
                                                                        sx={{
                                                                            minHeight: 25,
                                                                            maxHeight: 25,
                                                                            lineHeight: 1,
                                                                            borderRadius: 20,
                                                                            ml: 1.8,
                                                                            borderColor: '#E6E4F5',
                                                                            width: 130,
                                                                            fontSize: 14, fontWeight: 500
                                                                        }}
                                                                        name="instalationDate"
                                                                        value={instalationDate}
                                                                        onChange={UpdateinstalationDate}
                                                                    />
                                                                </Box>
                                                                <Box sx={{ display: 'flex', ml: .5, mt: .3 }}>
                                                                    <Typography sx={{ fontWeight: 500, fontSize: 14, width: 130 }}>
                                                                        Next PM with in
                                                                    </Typography>
                                                                    :
                                                                    <Input
                                                                        size="sm"
                                                                        type='number'
                                                                        sx={{
                                                                            minHeight: 25,
                                                                            maxHeight: 25,
                                                                            lineHeight: 1,
                                                                            borderRadius: 20,
                                                                            ml: 1.8,
                                                                            borderColor: '#E6E4F5',
                                                                            width: 130,
                                                                            fontSize: 14, fontWeight: 500
                                                                        }}

                                                                        name="dueDateCount"
                                                                        value={dueDateCount}
                                                                        onChange={UpdatedueDateCount}
                                                                        endDecorator={<Box>Days</Box>}
                                                                    />
                                                                </Box>
                                                                <Box sx={{ display: 'flex', ml: .5, mt: .3 }}>
                                                                    <Typography sx={{ fontWeight: 500, fontSize: 14, width: 130 }}>
                                                                        Next PM Dates
                                                                    </Typography>
                                                                    :
                                                                    <Input
                                                                        size="sm"
                                                                        type='date'
                                                                        sx={{
                                                                            minHeight: 25,
                                                                            maxHeight: 25,
                                                                            lineHeight: 1,
                                                                            borderRadius: 20,
                                                                            ml: 1.8,
                                                                            borderColor: '#E6E4F5',
                                                                            width: 130,
                                                                            fontSize: 14, fontWeight: 500
                                                                        }}
                                                                        name="dueDate"
                                                                        value={dueDate}
                                                                        disabled={true}
                                                                    />
                                                                </Box>
                                                            </Box>

                                                            <Box sx={{ flex: 1, pt: 6, pl: 3, display: 'flex' }}>
                                                                <Tooltip title={'PM details will be added by clicking'} color='neutral' placement='top'>
                                                                    <Box onClick={SavePMDetails} sx={{ display: "flex", cursor: 'pointer', pt: 1 }} >
                                                                        {daysEnable === 1 ? <>
                                                                            {pmFlag === 1 ? <CheckBoxIcon sx={{ height: 28, width: 28, color: '#394060', border: 1, }} /> :
                                                                                <CheckBoxOutlineBlankIcon sx={{ height: 28, width: 28, color: '#394060', border: 1, }} />}
                                                                            <Typography sx={{ fontSize: 14, color: '#394060', pt: .5, ml: .5, fontWeight: 500 }}>
                                                                                PM Changed
                                                                            </Typography>   </> : null}
                                                                    </Box>
                                                                </Tooltip>
                                                                {pmFlag === 1 ?
                                                                    <Box sx={{ display: 'flex', cursor: 'pointer', pt: 1 }} onClick={qrCodeOpen} >
                                                                        <QrCode2Icon sx={{ color: 'black', border: 1, height: 30, width: 30, p: .3, borderRadius: 0, ml: 5 }} />
                                                                        <Typography sx={{ ml: .5, fontSize: 14, color: 'black', pt: .5, fontWeight: 500 }}>
                                                                            Print QR
                                                                        </Typography>
                                                                    </Box> : null}
                                                            </Box>

                                                        </Box> : null} */}

                                                            {/* {serviceDoneFlag === 1 ?
                                                            <Box sx={{ display: 'flex', mb: 2 }}
                                                            >
                                                                <Box sx={{
                                                                    width: 200, borderRadius: 5, gap: .5, py: .5, bgcolor: '#1B669D',
                                                                    boxShadow: '1px 2px 4px', cursor: 'pointer', ml: 1.5, color: 'white', mt: 1.5,
                                                                    '&:hover': { bgcolor: '#7391C8', color: 'white' }, display: 'flex', justifyContent: 'center'

                                                                }} onClick={AddTostock}>
                                                                    Restore
                                                                </Box>
                                                                <Box sx={{
                                                                    width: 250, borderRadius: 5, gap: .5, py: .5, bgcolor: '#8B0000',
                                                                    boxShadow: '1px 2px 3px', cursor: 'pointer', mt: 1.5, color: 'white', ml: 1,
                                                                    '&:hover': { bgcolor: '#E44650', color: 'white' }, display: 'flex', justifyContent: 'center'
                                                                }} onClick={TransferToCondmination}>
                                                                    Transfer to Condemnation List
                                                                </Box>

                                                            </Box>
                                                            : null} */}
                                                        </Box> : null
                                                }
                                            </Box> : null}



                                        </Box>
                                        {/* <Box sx={{ display: 'flex', ml: .5 }}>
                                            <Checkbox
                                                size="lg"
                                                color='primary'
                                                checked={checked === 1}
                                                onChange={handleChange}
                                            />



                                            <Typography
                                                sx={{
                                                    px: 1,
                                                    fontWeight: 600,
                                                    color: '#394060',
                                                }}
                                            >
                                                Contact Supplier
                                            </Typography>
                                            <LocalShippingOutlinedIcon sx={{ color: '#394060', }} />

                                        </Box> */}

                                        <Box sx={{ display: 'flex', flex: 1, mt: 2 }}>
                                            {/* <Box sx={{ mt: .4 }} onClick={DoneService}>
                                                {serviceDoneFlag === 1 ? (
                                                    <CheckCircleIcon sx={{ cursor: 'pointer', color: '#394060' }} />
                                                ) : (
                                                    <RadioButtonUncheckedIcon sx={{ cursor: 'pointer', color: '#394060' }} />
                                                )}
                                            </Box> */}
                                            <Checkbox
                                                size="lg"
                                                color='primary'
                                                checked={serviceCheck === 1}
                                                onChange={handleServiceChange}
                                            />
                                            <Typography sx={{
                                                fontWeight: 600,
                                                color: '#394060', pl: 1
                                            }}>
                                                Service Done
                                            </Typography>
                                        </Box>

                                        {serviceCheck === 1 ?
                                            <Box sx={{ pl: 4 }}>
                                                <Box sx={{ flex: 1, display: 'flex', mt: 1.5, gap: 1 }}>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography sx={{ color: '#32383E', fontSize: 14, fontWeight: 500, pl: .5 }}>
                                                            Service Completed Date
                                                        </Typography>
                                                        <Input
                                                            type="datetime-local"
                                                            name="suppl_serviced_date"
                                                            value={suppl_serviced_date}
                                                            onChange={UpdateServicedtl}
                                                        />

                                                    </Box>
                                                    <Box sx={{
                                                        flex: 4,
                                                        mr: 1

                                                    }}>
                                                        <Typography sx={{ color: '#32383E', fontSize: 14, fontWeight: 500, pl: .5 }}>
                                                            Services Performed
                                                        </Typography>
                                                        <Textarea type="text"
                                                            placeholder='type here...'
                                                            name="suppl_serviced_remarks"
                                                            value={suppl_serviced_remarks}
                                                            onChange={UpdateServicedtl}
                                                        />
                                                    </Box>

                                                </Box>
                                                <Box sx={{
                                                    width: 200, height: 35, borderRadius: 5, py: .5, bgcolor: '#1B669D',
                                                    boxShadow: '1px 2px 4px', cursor: 'pointer', color: 'white', mt: 1.5,
                                                    '&:hover': { bgcolor: '#7391C8', color: 'white' }, display: 'flex', justifyContent: 'center',

                                                }} onClick={AddTostock}>
                                                    Service Completed
                                                </Box>
                                            </Box>
                                            : null}

                                        <Box sx={{ display: 'flex', flex: 1, mt: 2 }}>
                                            {/* <Box sx={{ mt: .4 }} onClick={DoneService}>
                                                        {serviceDoneFlag === 1 ? (
                                                            <CheckCircleIcon sx={{ cursor: 'pointer', color: '#394060' }} />
                                                        ) : (
                                                            <RadioButtonUncheckedIcon sx={{ cursor: 'pointer', color: '#394060' }} />
                                                        )}
                                                    </Box> */}
                                            <Checkbox
                                                size="lg"
                                                checked={notserviceCheck === 1}
                                                color='danger'
                                                onChange={handleNotServiceChange}
                                            />
                                            <Typography sx={{ color: '#394060', fontWeight: 600, pl: 1, }}>
                                                Not Serviceable / Not Repairable
                                            </Typography>
                                        </Box>



                                        {notserviceCheck === 1 ?
                                            <Box sx={{ pt: 1, pl: 4, pr: 1.5, mb: 3 }}>
                                                <Textarea type="text"
                                                    minRows={2}
                                                    placeholder='remarks...'
                                                    name="condm_transf_remarks"
                                                    value={condm_transf_remarks}
                                                    onChange={UpdateServicedtl}
                                                />
                                                <Box sx={{
                                                    width: 250, borderRadius: 5, py: .5, bgcolor: '#8B0000',
                                                    boxShadow: '1px 2px 3px', cursor: 'pointer', mt: 1, color: 'white',
                                                    '&:hover': { bgcolor: '#E44650', color: 'white' }, display: 'flex', justifyContent: 'center'
                                                }} onClick={TransferToCondmination}>
                                                    Transfer to Condemnation List
                                                </Box>
                                            </Box>
                                            : null}




                                    </Box>
                                </TabPanel>
                                {spare_asset_no === undefined ?
                                    <TabPanel value={3} sx={{
                                        p: 0,
                                        flexGrow: 1,
                                        overflowY: 'auto',
                                        maxHeight: 'calc(90vh - 230px)',
                                    }}>
                                        <Box
                                            sx={{
                                                flexGrow: 1,
                                                overflowY: 'auto',
                                                maxHeight: '100%',
                                                m: 0,
                                                pt: 2,
                                                pl: 1
                                            }}>
                                            <Box sx={{ flex: 1, mt: 1.5 }} >
                                                <Box>
                                                    <Typography sx={{ flex: 1, fontSize: 15, fontWeight: 600, color: '#394060', }}>
                                                        PM Details
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', mt: 1 }}>
                                                        <Typography sx={{ fontWeight: 500, fontSize: 14, width: 150 }}>
                                                            Installation Date
                                                        </Typography>
                                                        :
                                                        <Typography sx={{ fontWeight: 500, fontSize: 14, pl: 1 }}>
                                                            {instalationDate}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', mt: 1 }}>
                                                        <Typography sx={{ fontWeight: 500, fontSize: 14, width: 150 }}>
                                                            Upcoming PM Date
                                                        </Typography>
                                                        :
                                                        <Typography sx={{ fontWeight: 500, fontSize: 14, pl: 1 }}>
                                                            {dueDate}
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{ display: 'flex', flex: 1, mt: 2, gap: 1 }}>
                                                        <Box sx={{ flex: 1, }}>
                                                            <Typography sx={{ fontWeight: 500, fontSize: 14, pl: .5, color: '#0B6BCB' }}>
                                                                Installation Date
                                                            </Typography>
                                                            <Input
                                                                size="sm"
                                                                type='date'
                                                                sx={{

                                                                    borderColor: '#E6E4F5',
                                                                    fontSize: 14, fontWeight: 500
                                                                }}
                                                                name="instalationDate"
                                                                value={instalationDate}
                                                                onChange={UpdateinstalationDate}
                                                            />
                                                        </Box>
                                                        <Box sx={{ width: 150 }}>
                                                            <Typography sx={{ fontWeight: 500, fontSize: 14, pl: .5, color: '#0B6BCB' }}>
                                                                Next PM with in
                                                            </Typography>
                                                            <Input
                                                                size="sm"
                                                                type='number'
                                                                sx={{

                                                                    borderColor: '#E6E4F5',
                                                                    fontSize: 14, fontWeight: 500
                                                                }}
                                                                name="dueDateCount"
                                                                value={dueDateCount}
                                                                onChange={UpdatedueDateCount}
                                                                endDecorator={<Box>Days</Box>}
                                                            />
                                                        </Box>
                                                        <Box sx={{ flex: 1, }}>
                                                            <Typography sx={{ fontWeight: 500, fontSize: 14, pl: .5, color: '#0B6BCB' }}>
                                                                Next PM Date
                                                            </Typography>
                                                            <Input
                                                                size="sm"
                                                                type='date'
                                                                sx={{

                                                                    borderColor: '#E6E4F5',
                                                                    fontSize: 14, fontWeight: 500
                                                                }}
                                                                name="dueDate"
                                                                value={dueDate}
                                                                disabled={true}
                                                            />
                                                        </Box>
                                                        <Box sx={{ flex: 2, pt: 2, display: 'flex' }}>
                                                            <Tooltip title={'PM details will be added by clicking'} color='neutral' placement='top'>
                                                                <Box onClick={SavePMDetails} sx={{ display: "flex", cursor: 'pointer', pt: 1, px: .2 }} >
                                                                    {daysEnable === 1 ? <>
                                                                        <LibraryAddIcon sx={{ color: '#0B6BCB' }} />

                                                                        {/* {pmFlag === 1 ?
                                                                        <CheckBoxIcon sx={{ height: 28, width: 28, color: '#394060', border: 1, }} /> :
                                                                        <CheckBoxOutlineBlankIcon sx={{ height: 28, width: 28, color: '#394060', border: 1, }} />} */}
                                                                        {/* <Typography sx={{ fontSize: 14, color: '#394060', pt: .5, ml: .5, fontWeight: 500 }}>
                                                                        PM Changed
                                                                    </Typography> */}
                                                                    </> : null}
                                                                </Box>
                                                            </Tooltip>
                                                        </Box>
                                                    </Box>
                                                    {pmFlag === 1 ?
                                                        <Box sx={{ cursor: 'pointer', pt: 1.5, pl: .5, pb: 5 }} onClick={qrCodeOpen} >
                                                            <QrCode2Icon sx={{ color: 'black', border: 1, height: 50, width: 50, p: .3, borderRadius: 0, }} />
                                                            <Typography sx={{ fontSize: 14, color: 'black', pt: .5, fontWeight: 500 }}>
                                                                Print QR
                                                            </Typography>
                                                        </Box> : null}
                                                    {/* <Box sx={{ display: 'flex', ml: .5, mt: .3 }}>
                                                    <Typography sx={{ fontWeight: 500, fontSize: 14, width: 130 }}>
                                                        Next PM with in
                                                    </Typography>
                                                    :
                                                    <Input
                                                        size="sm"
                                                        type='number'
                                                        sx={{
                                                            minHeight: 25,
                                                            maxHeight: 25,
                                                            lineHeight: 1,
                                                            borderRadius: 20,
                                                            ml: 1.8,
                                                            borderColor: '#E6E4F5',
                                                            width: 130,
                                                            fontSize: 14, fontWeight: 500
                                                        }}

                                                        name="dueDateCount"
                                                        value={dueDateCount}
                                                        onChange={UpdatedueDateCount}
                                                        endDecorator={<Box>Days</Box>}
                                                    />
                                                </Box>
                                                <Box sx={{ display: 'flex', ml: .5, mt: .3 }}>
                                                    <Typography sx={{ fontWeight: 500, fontSize: 14, width: 130 }}>
                                                        Next PM Dates
                                                    </Typography>
                                                    :
                                                    <Input
                                                        size="sm"
                                                        type='date'
                                                        sx={{
                                                            minHeight: 25,
                                                            maxHeight: 25,
                                                            lineHeight: 1,
                                                            borderRadius: 20,
                                                            ml: 1.8,
                                                            borderColor: '#E6E4F5',
                                                            width: 130,
                                                            fontSize: 14, fontWeight: 500
                                                        }}
                                                        name="dueDate"
                                                        value={dueDate}
                                                        disabled={true}
                                                    />
                                                </Box> */}
                                                </Box>

                                                {/* <Box sx={{ flex: 1, pt: 6, pl: 3, display: 'flex' }}>
                                                <Tooltip title={'PM details will be added by clicking'} color='neutral' placement='top'>
                                                    <Box onClick={SavePMDetails} sx={{ display: "flex", cursor: 'pointer', pt: 1 }} >
                                                        {daysEnable === 1 ? <>
                                                            {pmFlag === 1 ? <CheckBoxIcon sx={{ height: 28, width: 28, color: '#394060', border: 1, }} /> :
                                                                <CheckBoxOutlineBlankIcon sx={{ height: 28, width: 28, color: '#394060', border: 1, }} />}
                                                            <Typography sx={{ fontSize: 14, color: '#394060', pt: .5, ml: .5, fontWeight: 500 }}>
                                                                PM Changed
                                                            </Typography>   </> : null}
                                                    </Box>
                                                </Tooltip>
                                                {pmFlag === 1 ?
                                                    <Box sx={{ display: 'flex', cursor: 'pointer', pt: 1 }} onClick={qrCodeOpen} >
                                                        <QrCode2Icon sx={{ color: 'black', border: 1, height: 30, width: 30, p: .3, borderRadius: 0, ml: 5 }} />
                                                        <Typography sx={{ ml: .5, fontSize: 14, color: 'black', pt: .5, fontWeight: 500 }}>
                                                            Print QR
                                                        </Typography>
                                                    </Box> : null}
                                            </Box> */}

                                            </Box>
                                        </Box>
                                    </TabPanel> : null}
                                <TabPanel value={4} sx={{
                                    p: 0,
                                    flexGrow: 1,
                                    overflowY: 'auto',
                                    maxHeight: 'calc(90vh - 230px)',
                                    mt: 2
                                }}>
                                    <Box
                                        sx={{
                                            flexGrow: 1,
                                            overflowY: 'auto',
                                            maxHeight: '100%',
                                            m: 0
                                        }}
                                    >

                                        {alldetailsService.length !== 0 ?
                                            <Box >
                                                <Typography
                                                    sx={{
                                                        pl: 1,
                                                        flex: 1,
                                                        fontWeight: 600,
                                                        color: '#394060',
                                                    }}
                                                >

                                                    Serviced Details
                                                </Typography>

                                                {alldetailsService?.map((val, index) => {
                                                    return (
                                                        <Box
                                                            key={index} sx={{ ml: .5, mt: 1, mb: 2, border: 1, py: 2, mr: 1 }}>
                                                            <Box sx={{ display: 'flex' }}>
                                                                <Box sx={{ px: 1, borderRadius: 10 }}>
                                                                    {index + 1}.
                                                                </Box>
                                                                <Box sx={{ flex: 1 }}>
                                                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                                                        <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                            Ticket No.
                                                                        </Typography>
                                                                        <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                                            : {val.complaint_slno !== null ? val.complaint_slno : 'Not Updated'}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                                                        <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                            Ticket type.
                                                                        </Typography>
                                                                        <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                                            : {val.complaint_type_name !== null ? val.complaint_type_name : 'Not Updated'}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                                                        <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                            Ticket desc.
                                                                        </Typography>
                                                                        <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                                            : {val.complaint_desc !== null ? val.complaint_desc : 'Not Updated'}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                                                        <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                            Section
                                                                        </Typography>
                                                                        <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                                            : {val.sec_name !== null ? val.sec_name : 'Not Updated'}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                                                        <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                            Location
                                                                        </Typography>
                                                                        <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                                            : {val.rm_room_name}
                                                                            {val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name ?
                                                                                ` (${val.rm_roomtype_name ? val.rm_roomtype_name : ''}${val.rm_roomtype_name &&
                                                                                    val.rm_insidebuildblock_name ? ' - ' : ''}
                                                                ${val.rm_insidebuildblock_name ? val.rm_insidebuildblock_name : ''}${(val.rm_insidebuildblock_name &&
                                                                                    val.rm_floor_name) ? ' - ' : ''}
                                                                ${val.rm_floor_name ? val.rm_floor_name : ''})`
                                                                                : "Not Updated"}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                                                        <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                            Registered Date
                                                                        </Typography>
                                                                        <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                                            : {val.compalint_date !== null ? val.compalint_date : 'Not Updated'}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                                                        <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                            Assingees
                                                                        </Typography>
                                                                        <Box sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                                            {ticketsServicedDetails[val.complaint_slno]?.map((emp, index) => (
                                                                                <Chip
                                                                                    key={index}
                                                                                    size="small"
                                                                                    variant="outlined"
                                                                                    sx={{ bgcolor: '#D3C7A1', fontSize: 13, px: .8 }}>
                                                                                    {emp.em_name}
                                                                                </Chip>
                                                                            ))}
                                                                        </Box>
                                                                    </Box>
                                                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                                                        <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                            Ticket Attachments
                                                                        </Typography>
                                                                        <Box sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, pt: .5 }}>
                                                                            <Box
                                                                                onClick={() => fileView(val)}
                                                                                sx={{ bgcolor: '#41729F', color: 'white', width: 85, pl: 1, borderRadius: 10, cursor: 'pointer' }}
                                                                            >
                                                                                <FilePresentRoundedIcon sx={{
                                                                                    color: 'white',
                                                                                    cursor: 'pointer',
                                                                                    height: 20, width: 18, pb: .1
                                                                                }} />file view
                                                                            </Box>
                                                                        </Box>
                                                                    </Box>
                                                                    <Typography sx={{ fontWeight: 700, mt: .5 }}>
                                                                        Department serviced Details
                                                                    </Typography>
                                                                    <Box sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, mr: 3 }}>
                                                                        <Box sx={{ display: 'flex', pl: .5, flex: 1, mt: .5, bgcolor: '#EBEFFB' }}>

                                                                            <Box sx={{ flex: .3 }} >
                                                                                #
                                                                            </Box>
                                                                            <Box sx={{ flex: 1 }} >
                                                                                Attended by
                                                                            </Box>
                                                                            <Box sx={{ flex: 2 }} >
                                                                                Serviced Date
                                                                            </Box>
                                                                            <Box sx={{ flex: 3 }} >
                                                                                Issues Identified
                                                                            </Box>
                                                                            <Box sx={{ flex: 3 }} >
                                                                                Remarks
                                                                            </Box>
                                                                        </Box>
                                                                        {deptServiceempList[val.serviced_emp_details_slno]?.map((emp, index) => (
                                                                            <Box key={index} sx={{
                                                                                display: 'flex', pl: .5, flex: 1, mt: .5, borderBottom: 1, borderBottomColor: 'lightgrey'
                                                                            }}>

                                                                                <Box sx={{ flex: .3 }} >
                                                                                    {index + 1}
                                                                                </Box>
                                                                                <Box sx={{ flex: 1 }} >
                                                                                    {emp.em_name}
                                                                                </Box>
                                                                                <Box sx={{ flex: 2 }} >
                                                                                    {emp.serviced_date}
                                                                                </Box>
                                                                                <Box sx={{ flex: 3 }} >
                                                                                    {emp.service_issues_identified}
                                                                                </Box>
                                                                                <Box sx={{ flex: 3 }} >
                                                                                    {emp.serviced_issue_remarks}
                                                                                </Box>
                                                                            </Box>
                                                                        ))}
                                                                    </Box>
                                                                    <Typography sx={{ fontWeight: 700, mt: 2 }}>
                                                                        Serviced Details
                                                                    </Typography>
                                                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                                                        <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                            Serviced Date
                                                                        </Typography>
                                                                        <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                                            : {val.suppl_serviced_date !== null ? val.suppl_serviced_date : 'Not Updated'}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                                                        <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                            Services Performed
                                                                        </Typography>
                                                                        <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                                            : {val.suppl_serviced_remarks !== null ? val.suppl_serviced_remarks : 'Not Updated'}
                                                                        </Typography>
                                                                    </Box>

                                                                    <Typography sx={{ fontWeight: 700, mt: 2 }}>
                                                                        Service Completion Marked Details
                                                                    </Typography>
                                                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                                                        <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                            Marked date
                                                                        </Typography>
                                                                        <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                                            : {val.add_to_store_date !== null ? val.add_to_store_date : 'Not Updated'}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                                                        <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                                            Marked Employee
                                                                        </Typography>
                                                                        <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                                            : {val.em_name !== null ? val.em_name : 'Not Updated'}
                                                                        </Typography>
                                                                    </Box>

                                                                    <Box
                                                                        onClick={() => fileViewAssetService(val)}
                                                                        sx={{
                                                                            bgcolor: '#41729F', color: 'white', width: 110,
                                                                            px: 1, borderRadius: 10, cursor: 'pointer',
                                                                            flex: 4, fontSize: 13, mt: 1, display: 'flex'
                                                                        }}
                                                                    >
                                                                        <FilePresentRoundedIcon sx={{
                                                                            color: 'white',
                                                                            cursor: 'pointer',
                                                                            height: 20, width: 18, pb: .1
                                                                        }} />Attachments
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    )
                                                })}
                                            </Box> :
                                            <Box sx={{ my: 10, fontWeight: 600, color: 'lightgray', fontSize: 20, flex: 1, display: 'flex', justifyContent: 'center' }}>
                                                No Service Done Yet!
                                            </Box>}
                                    </Box>
                                </TabPanel>
                                <TabPanel value={5} sx={{
                                    p: 0,
                                    flexGrow: 1,
                                    overflowY: 'auto',
                                    maxHeight: 'calc(90vh - 230px)',
                                }}>
                                    <Box
                                        sx={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(2, 1fr)',
                                            gap: 1,
                                            mt: 2
                                        }}
                                    >
                                        <Box sx={{ flex: 1, border: 1, borderRadius: 3, borderColor: '#EBEFFB', p: 1, }}>
                                            <Typography
                                                sx={{
                                                    flex: 1,
                                                    fontWeight: 600,
                                                    color: '#394060',
                                                }}
                                            >
                                                Purchase Bills
                                            </Typography>
                                            <Box sx={{ display: 'flex', flex: 1, mt: 1 }}>
                                                <Typography sx={{ width: 110 }}>
                                                    Bill No.
                                                </Typography>
                                                <Typography sx={{ flex: 1, }}>
                                                    {am_bill_no || "Not Updated"}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', flex: 1, }}>
                                                <Typography sx={{ width: 110 }}>
                                                    Bill Date
                                                </Typography>
                                                <Typography sx={{ flex: 1, }}>
                                                    {am_bill_date || "Not Updated"}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', flex: 1, }}>
                                                <Typography sx={{ width: 110 }}>
                                                    Bill Amount
                                                </Typography>
                                                <Typography sx={{ flex: 1, }}>
                                                    {am_bill_amount || "Not Updated"}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', flex: 1, }}>
                                                <Typography sx={{ width: 110 }}>
                                                    Supplier
                                                </Typography>
                                                <Typography sx={{ flex: 1, }}>
                                                    {bill_supplier_name || "Not Updated"}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, height: 40, width: 40, m: 1, cursor: 'pointer' }}
                                                onClick={OpenDocument}
                                            >
                                                <img src={serviceFold} alt={serviceFold} style={{ width: "100%", height: "100%" }} loading="lazy" />
                                            </Box>
                                        </Box>
                                        {item_asset_no !== undefined ?
                                            <Box sx={{ flex: 1, border: 1, borderRadius: 3, borderColor: '#EBEFFB', p: 1, }}>
                                                <Typography
                                                    sx={{
                                                        flex: 1,
                                                        fontWeight: 600,
                                                        color: '#394060',
                                                        pb: 1
                                                    }}
                                                >
                                                    AMC/CMC Details
                                                </Typography>
                                                <Chip sx={{ border: 1, borderColor: '#05445E' }}>
                                                    {amc_status === 1 ? "AMC" : cmc_status === 1 ? "CMC" : "Not Updated"}
                                                </Chip>
                                                <Box sx={{ display: 'flex', flex: 1, }}>
                                                    <Typography sx={{ width: 110 }}>
                                                        From Date
                                                    </Typography>
                                                    <Typography sx={{ flex: 1, }}>
                                                        {from_date || 'Not Updated'}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', flex: 1, }}>
                                                    <Typography sx={{ width: 110 }}>
                                                        To Date
                                                    </Typography>
                                                    <Typography sx={{ flex: 1, }}>
                                                        {to_date || 'Not Updated'}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', flex: 1, }}>
                                                    <Typography sx={{ width: 110 }}>
                                                        Supplier
                                                    </Typography>
                                                    <Typography sx={{ flex: 1, }}>
                                                        {amc_cmc_suppliername || 'Not Updated'}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ flex: 1, height: 40, width: 40, m: 1, cursor: 'pointer' }}
                                                    onClick={OpenAMCCMCDocument}
                                                >
                                                    <img src={serviceFold} alt={serviceFold} style={{ width: "100%", height: "100%" }} loading="lazy" />
                                                </Box>
                                            </Box>
                                            : null}
                                        {item_asset_no !== undefined ?
                                            <Box sx={{ flex: 1, border: 1, borderRadius: 3, borderColor: '#EBEFFB', p: 1, }}>
                                                <Typography
                                                    sx={{
                                                        flex: 1,
                                                        fontWeight: 600,
                                                        color: '#394060',
                                                    }}
                                                >
                                                    Lease Details
                                                </Typography>
                                                <Box sx={{ display: 'flex', flex: 1, mt: 1 }}>
                                                    <Typography sx={{ width: 110 }}>
                                                        From Date
                                                    </Typography>
                                                    <Typography sx={{ flex: 1, }}>
                                                        {lease_fromdate || 'Not Updated'}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', flex: 1, }}>
                                                    <Typography sx={{ width: 110 }}>
                                                        To Date
                                                    </Typography>
                                                    <Typography sx={{ flex: 1, }}>
                                                        {lease_todate || 'Not Updated'}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', flex: 1, }}>
                                                    <Typography sx={{ width: 110 }}>
                                                        Lease Amount
                                                    </Typography>
                                                    <Typography sx={{ flex: 1, }}>
                                                        {lease_amount || 'Not Updated'}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', flex: 1, }}>
                                                    <Typography sx={{ width: 110 }}>
                                                        Supplier
                                                    </Typography>
                                                    <Typography sx={{ flex: 1, }}>
                                                        {lease_suppliername || 'Not Updated'}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ flex: 1, height: 40, width: 40, m: 1, cursor: 'pointer' }}
                                                    onClick={OpenLeaseDocument}
                                                >
                                                    <img src={serviceFold} alt={serviceFold} style={{ width: "100%", height: "100%" }} loading="lazy" />
                                                </Box>
                                            </Box> : null}
                                        <Box sx={{ flex: 1, border: 1, borderRadius: 3, borderColor: '#EBEFFB', p: 1, }}>
                                            <Typography
                                                sx={{
                                                    flex: 1,
                                                    fontWeight: 600,
                                                    color: '#394060',
                                                }}
                                            >
                                                Warrenty/Guarantee Details
                                            </Typography>
                                            <Chip sx={{ border: 1, borderColor: '#05445E' }}>
                                                {warrenty_status === 1 ? "Warrenty" : guarenty_status === 1 ? "Guarentee" : "Not Updated"}
                                            </Chip>
                                            <Box sx={{ display: 'flex', flex: 1, mt: 1 }}>
                                                <Typography sx={{ width: 110 }}>
                                                    From Date
                                                </Typography>
                                                <Typography sx={{ flex: 1, }}>
                                                    {wargar_from_date || "Not Updated"}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', flex: 1, }}>
                                                <Typography sx={{ width: 110 }}>
                                                    To Date
                                                </Typography>
                                                <Typography sx={{ flex: 1, }}>
                                                    {wargar_to_date || "Not Updated"}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', flex: 1, }}>
                                                <Typography sx={{ width: 110 }}>
                                                    Toll Free No.
                                                </Typography>
                                                <Typography sx={{ flex: 1, }}>
                                                    {troll_free || "Not Updated"}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', flex: 1, }}>
                                                <Typography sx={{ width: 110 }}>
                                                    Contact No. 1
                                                </Typography>
                                                <Typography sx={{ flex: 1, }}>
                                                    {ph_one || "Not Updated"}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', flex: 1, }}>
                                                <Typography sx={{ width: 110 }}>
                                                    Contact No. 2
                                                </Typography>
                                                <Typography sx={{ flex: 1, }}>
                                                    {ph_two || "Not Updated"}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', flex: 1, }}>
                                                <Typography sx={{ width: 110 }}>
                                                    Address
                                                </Typography>
                                                <Typography sx={{ flex: 1, }}>
                                                    {address || "Not Updated"}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </TabPanel>

                            </Tabs>
                        </Box>

                        <Box sx={{ pb: 1, mr: 2, mt: 'auto', flexShrink: 0 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'right', }}>
                                <Button
                                    variant='plain'
                                    sx={buttonStyle}
                                    onClick={AddServiceDetails}
                                >Update</Button>
                                <Button
                                    variant='plain'
                                    sx={buttonStyle}
                                    onClick={Close}
                                >Cancel</Button>
                            </Box>

                        </Box>

                    </Box>

                </Modal>
            </CssVarsProvider>
        </Box >
    )
}

export default memo(ServiceDetailsModal)
