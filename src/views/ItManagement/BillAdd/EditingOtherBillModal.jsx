
import { Avatar, Box, Button, Checkbox, CssVarsProvider, Modal, ModalDialog, Textarea, Tooltip } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ItBillCategoryList from 'src/views/CommonSelectCode/ItBillCategoryList';
import { useDispatch, useSelector } from 'react-redux';
import { getBillCategory } from 'src/redux/actions/ItBillCategoryList.action';
import SpaceDashboardSharpIcon from '@mui/icons-material/SpaceDashboardSharp';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import NotesIcon from '@mui/icons-material/Notes';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Paper } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PinDropIcon from '@mui/icons-material/PinDrop';
import SpeakerPhoneIcon from '@mui/icons-material/SpeakerPhone';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import imageCompression from 'browser-image-compression';
import CloseIcon from '@mui/icons-material/Close';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ItBillsupplierDetailsList from 'src/views/CommonSelectCode/ItBillsupplierDetailsList';
import { getSupplierList } from 'src/redux/actions/ItbillSupplierList.action';
import ModeEditOutlineSharpIcon from '@mui/icons-material/ModeEditOutlineSharp';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import BillFile from './FileView/BillFile';

const EditingOtherBillModal = ({ editOpen, billDataother, seteditFlag, seteditOpen, billCount, setbillCount, filezUrls }) => {

    const { bill_amount, bill_category, bill_date, bill_description, bill_due_date, bill_name, bill_paid_date, payed_status, other_bill_slno, bill_number,
        am_item_map_slno, supplier_details, file_upload_status } = billDataother


    const [billViewmodalFlag, setBillViewModalFlag] = useState(0)
    const [billViewmodalOpen, setBillViewModalOpen] = useState(false)
    const [suppliersList, setSuppliersList] = useState(supplier_details)
    const [selectFile, setSelectFile] = useState([]);
    const [billCategoryName, setBillCategoryName] = useState('')
    const [billCategory, setBillCategory] = useState(bill_category)
    const [payedStatus, setpayedStatus] = useState(payed_status === 1 ? true : false)
    const [payedCheckFlag, setpayedCheckFlag] = useState(payed_status)
    const [pswd_mast_asset_no, setPswd_mast_asset_no] = useState('')
    const [deviceName, setdeviceName] = useState('')
    const [location, setlocation] = useState('')
    const [item_slno, setItem_slno] = useState(0)
    const [billType, setbillType] = useState(0)
    const [ChangeAsset, setChangeAsset] = useState(0)
    const [assetSecName, setassetSecName] = useState('')
    const [assetNumb, setassetNumb] = useState('')
    const [assetNumbOnly, setassetNumbOnly] = useState('')
    const [assetDeviceName, setassetDeviceName] = useState('')
    const [otherBill, setOtherBill] = useState({
        billname: bill_name === '' ? null : bill_name,
        billamount: bill_amount === '' ? null : bill_amount,
        billnumber: bill_number === '' ? null : bill_number,
        billdate: bill_date === '' ? null : bill_date,
        billduedate: bill_due_date === '' ? null : bill_due_date,
        billpayed_date: bill_paid_date === '' ? null : bill_paid_date,
        billdescription: bill_description === '' ? null : bill_description
    })
    const { billname, billamount, billdate, billduedate, billpayed_date, billdescription, billnumber } = otherBill
    const dispatch = useDispatch();
    const id = useSelector((state) => { return state.LoginUserData.empid })

    useEffect(() => {
        dispatch(getBillCategory())
        dispatch(getSupplierList())
    }, [dispatch])

    const CheckBoxChange = useCallback((e) => {
        if (e.target.checked === true) {
            setpayedStatus(true)
            setpayedCheckFlag(1)
        }
        else {
            setpayedStatus(false)
            setpayedCheckFlag(0)
        }
    }, [])

    const MastBillUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setOtherBill({ ...otherBill, [e.target.name]: value })
        },
        [otherBill],
    )

    const ResetModal = useCallback(() => {
        setBillCategory(0)
        setpayedCheckFlag(0)

    }, [])
    const handleClose = useCallback(() => {
        ResetModal()
        seteditFlag(0)
        seteditOpen(false)
    }, [seteditFlag, seteditOpen, ResetModal])
    const UpdateAssetNo = useCallback((e) => {
        setPswd_mast_asset_no(e.target.value.toLocaleUpperCase())
    }, [])
    useEffect(() => {
        if (billCategory !== 0) {
            const getbillType = async () => {
                const result = await axioslogin.get(`/ItBillAdd/getbilltype/${billCategory}`);
                const { success, data } = result.data;
                if (success === 2) {
                    const { it_bill_type_slno } = data[0]
                    setbillType(it_bill_type_slno)
                }
            }
            getbillType(billCategory)
        } else {
            setBillCategory(0)
        }
    }, [billCategory])

    const PatchData = useMemo(() => {
        return {
            other_bill_slno: other_bill_slno,
            bill_name: billname,
            bill_category: billCategory === 0 ? null : billCategory,
            bill_amount: billamount === '' ? null : billamount,
            bill_number: billnumber === '' ? null : billnumber,
            bill_date: billdate === '' ? null : billdate,
            bill_due_date: billduedate === '' ? null : billduedate,
            bill_paid_date: billpayed_date === '' ? null : billpayed_date,
            bill_description: billdescription === '' ? null : billdescription,
            am_item_map_slno: item_slno === 0 ? am_item_map_slno : item_slno,
            supplier_details: suppliersList === 0 ? null : suppliersList,
            payed_status: payedStatus === true ? 1 : 0,
            edit_user: id
        }
    }, [other_bill_slno, billname, billCategory, billamount, billdate, billduedate, billpayed_date, billdescription, billnumber, am_item_map_slno, payedStatus,
        item_slno, suppliersList, id])

    const searchAssetNo = useCallback((e) => {
        if (pswd_mast_asset_no === '') {
            infoNotify('Please Enter Asset Number')
        }
        else {
            const parts = pswd_mast_asset_no.split('/');
            const assetno = parts[parts.length - 1];
            const Custodian = parts[parts.length - 2];
            const firstname = parts[parts.length - 3];
            const starts = firstname + '/' + Custodian
            const asset_number = parseInt(assetno)
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

                        setPswd_mast_asset_no(pswd_mast_asset_no)
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
        }
    }, [pswd_mast_asset_no])

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

    useEffect(() => {
        if (am_item_map_slno !== 0) {
            const getAssetDetails = async () => {
                const result = await axioslogin.get(`/ItBillAdd/getAssetDetails/${am_item_map_slno}`);
                const { success, dataa } = result.data;
                if (success === 2) {
                    const { sec_name, item_asset_no, item_asset_no_only, item_name } = dataa[0]
                    setassetDeviceName(item_name)
                    setassetNumb(item_asset_no)
                    setassetNumbOnly(item_asset_no_only)
                    setassetSecName(sec_name)
                }
            }
            getAssetDetails(am_item_map_slno)
        }
        else {
        }
    }, [am_item_map_slno])

    const ChangeAssetNum = useCallback(() => {
        setChangeAsset(1)
    }, [])
    const openBillModal = useCallback(() => {
        setBillViewModalFlag(1)
        setBillViewModalOpen(true)
    }, [])


    const editOtherBill = useCallback((e) => {
        e.preventDefault()
        if (billname !== '' && billamount !== '' && billnumber !== '' && billdate !== '' && billduedate !== '') {
            const UpdateBill = async (PatchData) => {
                const result = await axioslogin.patch('/ItBillAdd/UpdateOtherBill', PatchData)
                return result.data;
            }
            const InsertOtherFile = async (selectFile, other_bill_slno) => {
                try {
                    const formData = new FormData();
                    formData.append('id', other_bill_slno);
                    for (const fileOthers of selectFile) {
                        if (fileOthers.type.startsWith('image')) {
                            const compressedFile = await handleImageUpload(fileOthers);
                            formData.append('files', compressedFile, compressedFile.name);
                        } else {
                            formData.append('files', fileOthers, fileOthers.name);
                        }
                    }
                    // Use the Axios instance and endpoint that matches your server setup
                    const uploadResult = await axioslogin.post('/ItImageUpload/uploadFile/Others', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    return uploadResult.data;
                } catch (error) {
                    warningNotify('An error occurred during file upload.');
                }
            };
            UpdateBill(PatchData).then((value) => {
                const { message, success } = value
                if (success === 2) {
                    if (selectFile.length !== 0) {
                        InsertOtherFile(selectFile, other_bill_slno).then((value) => {
                            const { success, message } = value
                            if (success === 1) {
                                succesNotify(message)
                                setbillCount(billCount + 1)
                                handleClose()
                            }
                            else {
                                warningNotify('failed to upload file')
                            }
                        })
                    }
                    else {
                        succesNotify(message)
                        setbillCount(billCount + 1)
                        handleClose()
                    }

                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            })
        } else {
            infoNotify('Please Fill Mandatory feilds')
        }
    }, [PatchData, billname, billCount, selectFile, billamount, billdate, billduedate, billnumber, handleImageUpload, other_bill_slno, setbillCount, handleClose])

    return (
        <Box>
            {billViewmodalFlag === 1 ?
                <BillFile
                    billViewmodalOpen={billViewmodalOpen} setBillViewModalOpen={setBillViewModalOpen}
                    setBillViewModalFlag={setBillViewModalFlag} filezUrls={filezUrls} /> : null}
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={editOpen}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
                <Box sx={{ margin: 'auto', }}>
                    <ModalDialog variant="outlined"
                        sx={{ width: 900 }}>
                        <Box sx={{ display: 'flex', pl: 1, fontSize: 28, fontWeight: 500, color: '#183A53', }}>
                            <ReceiptLongOutlinedIcon sx={{ pt: .5, fontSize: 40, color: '#183A53' }} />
                            Add Bill
                            <Box sx={{ flex: 1, display: 'flex', justifyContent: "flex-end", mt: .5, pt: .5 }}>
                                <Tooltip title="Close">
                                    < HighlightOffSharpIcon sx={{
                                        cursor: 'pointer', color: '#183A53', height: 25, width: 25,
                                        '&:hover': {
                                            color: '#5C97B8',
                                        },
                                    }}
                                        onClick={handleClose}
                                    />
                                </Tooltip>
                            </Box>
                        </Box>
                        <Box sx={{
                            overflow: 'auto',
                        }}>
                            <Box sx={{ flex: 1, mt: 3, ml: 2, fontWeight: 600, }}>
                                <SpaceDashboardSharpIcon sx={{ pb: .5, fontSize: 20 }} />Bill Category<span style={{ color: '#74112F' }} >*</span>
                            </Box>
                            <Box sx={{ flex: 1, mx: 2 }}>
                                <ItBillCategoryList
                                    billCategory={billCategory} setBillCategory={setBillCategory} setName={setBillCategoryName}
                                />
                            </Box>
                            {billType === 3 ?
                                <Box>
                                    <Paper sx={{ mx: 2, borderRadius: 0, bgcolor: '#F0F2F3', boxShadow: '0px 0px 3px' }}>
                                        <Box sx={{ flex: 1, mt: 1.5, fontWeight: 600, px: .5, color: '#54627B', display: 'flex' }}>
                                            <Box sx={{ flex: 1 }}>
                                                <ManageSearchIcon sx={{
                                                    p: .3, fontSize: 20, color: 'white', border: 1, borderRadius: 10,
                                                    bgcolor: '#183A53',
                                                    mb: .3,

                                                }} /> Asset No.
                                            </Box>
                                            {ChangeAsset === 1 ?
                                                <>
                                                    <Box></Box>
                                                </> :
                                                <>

                                                    {am_item_map_slno !== null ?
                                                        <Box sx={{ p: .5 }}>
                                                            <Avatar size='sm' sx={{ bgcolor: '#81BADF' }}>
                                                                <ModeEditOutlineSharpIcon sx={{ color: '#28415D', cursor: 'pointer' }} onClick={ChangeAssetNum} />
                                                            </Avatar>
                                                        </Box> : null}
                                                </>}
                                        </Box>
                                        {ChangeAsset === 1 ? <>
                                            <Box sx={{ flex: 1, pl: .5, display: 'flex' }}>
                                                <Box sx={{ flex: 1 }}>
                                                    <TextFieldCustom
                                                        style={{ borderRadius: 0, borderColor: '#868B8E' }}
                                                        placeholder="search"
                                                        type="text"
                                                        size="sm"
                                                        name="pswd_mast_asset_no"
                                                        value={pswd_mast_asset_no}
                                                        onchange={UpdateAssetNo}
                                                    >
                                                    </TextFieldCustom>
                                                </Box>
                                                <Box sx={{ mr: .8, bgcolor: '#868B8E', px: .5, pt: .3 }}>
                                                    <SearchRoundedIcon sx={{ color: 'white', cursor: 'pointer', }} onClick={searchAssetNo} />
                                                </Box>
                                            </Box>
                                        </>
                                            :
                                            <>
                                                {am_item_map_slno !== null ?
                                                    <Box sx={{ flex: 1 }}>
                                                        <Box sx={{ flex: 1, px: .5, bgcolor: 'white', mx: .8, borderColor: '#ADC4D7', }}>
                                                            {assetNumb}/{assetNumbOnly}
                                                        </Box>
                                                        <Box>
                                                            <Box sx={{ flex: 1, mt: 1.5, fontWeight: 600, pl: .5, mb: .3, color: '#54627B' }}>
                                                                <SpeakerPhoneIcon sx={{
                                                                    p: .3,
                                                                    fontSize: 20, bgcolor: '#183A53', color: 'white',
                                                                    border: 1, borderRadius: 10, mb: .3,
                                                                }} />Device Name
                                                            </Box>
                                                            <Box sx={{ flex: 1, px: .5, bgcolor: 'white', mx: .8, borderColor: '#ADC4D7', }}>
                                                                {assetDeviceName}
                                                            </Box>
                                                            <Box sx={{ flex: 1, mt: 1, fontWeight: 600, px: .5, color: '#54627B' }}>
                                                                <PinDropIcon sx={{
                                                                    p: .3, mb: .3,
                                                                    fontSize: 20, bgcolor: '#183A53', color: 'white',
                                                                    border: 1, borderRadius: 10
                                                                }} />Location
                                                            </Box>

                                                            <Box sx={{ flex: 1, px: .5, bgcolor: 'white', mx: .8, borderColor: '#868B8E', }}>
                                                                {assetSecName}
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                    :
                                                    <Box sx={{ flex: 1, pl: .5, display: 'flex' }}>
                                                        <Box sx={{ flex: 1 }}>
                                                            <TextFieldCustom
                                                                style={{ borderRadius: 0, borderColor: '#868B8E' }}
                                                                placeholder="search"
                                                                type="text"
                                                                size="sm"
                                                                name="pswd_mast_asset_no"
                                                                value={pswd_mast_asset_no}
                                                                onchange={UpdateAssetNo}
                                                            >
                                                            </TextFieldCustom>
                                                        </Box>
                                                        <Box sx={{ mr: .8, bgcolor: '#868B8E', px: .5, pt: .3 }}>
                                                            <SearchRoundedIcon sx={{ color: 'white', cursor: 'pointer', }} onClick={searchAssetNo} />
                                                        </Box>
                                                    </Box>
                                                }
                                            </>}

                                        {deviceName !== '' ?
                                            <Box>
                                                <Box sx={{ flex: 1, mt: 1.5, fontWeight: 600, pl: .5, mb: .3, color: '#54627B' }}>
                                                    <SpeakerPhoneIcon sx={{
                                                        p: .3,
                                                        fontSize: 20, bgcolor: '#183A53', color: 'white',
                                                        border: 1, borderRadius: 10, mb: .3,
                                                    }} />Device Name
                                                </Box>
                                                <Box sx={{ flex: 1, px: .5, bgcolor: 'white', mx: .8, borderColor: '#ADC4D7', }}>
                                                    {deviceName}
                                                </Box>
                                                <Box sx={{ flex: 1, mt: 1, fontWeight: 600, px: .5, color: '#54627B' }}>
                                                    <PinDropIcon sx={{
                                                        p: .3, mb: .3,
                                                        fontSize: 20, bgcolor: '#183A53', color: 'white',
                                                        border: 1, borderRadius: 10
                                                    }} />Location
                                                </Box>

                                                <Box sx={{ flex: 1, px: .5, bgcolor: 'white', mx: .8, borderColor: '#868B8E', }}>
                                                    {location}
                                                </Box>
                                            </Box> : null}
                                        <Box sx={{ height: 8 }}></Box>
                                    </Paper>
                                    <Box sx={{ flex: 1, mt: 1.5, ml: 2, fontWeight: 600 }}>
                                        <LocalShippingIcon sx={{ pb: .5, fontSize: 20 }} />Supplier Name<span style={{ color: '#74112F' }} >*</span>
                                    </Box>
                                    <Box sx={{ flex: 1, mx: 2 }}>
                                        <ItBillsupplierDetailsList
                                            suppliersList={suppliersList} setSuppliersList={setSuppliersList} />
                                    </Box>
                                </Box> : null}

                            <Box sx={{ flex: 1, mt: 1.5, ml: 2, fontWeight: 600 }}>
                                <ReceiptLongIcon sx={{ pb: .5, fontSize: 20 }} />Bill Name<span style={{ color: '#74112F' }} >*</span>
                            </Box>
                            <Box sx={{ flex: 1, mx: 2 }}>
                                <CssVarsProvider>
                                    <Textarea
                                        type="text"
                                        size="sm"
                                        placeholder="Bill Name"
                                        variant="outlined"
                                        minRows={2}
                                        maxRows={4}
                                        name="billname"
                                        value={billname}
                                        onChange={(e) => MastBillUpdate(e)}
                                    >
                                    </Textarea>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ flex: 1, mt: 1.5, ml: 2, fontWeight: 600 }}>
                                <ReceiptIcon sx={{ pb: .5, fontSize: 20, fontWeight: 800 }} />Bill Number/Invoice Number<span style={{ color: '#74112F' }} >*</span>
                            </Box>
                            <Box sx={{ flex: 1, mx: 2 }}>
                                <TextFieldCustom
                                    placeholder="Bill Number/Invoice Number"
                                    type="text"
                                    size="sm"
                                    name="billnumber"
                                    value={billnumber}
                                    onchange={MastBillUpdate}
                                >
                                </TextFieldCustom>
                            </Box>
                            <Box sx={{ flex: 1, mt: 1.5, ml: 2, fontWeight: 600 }}>
                                <NotesIcon sx={{ pb: .5, fontSize: 20 }} />Bill Description
                            </Box>
                            <Box sx={{ flex: 1, mx: 2 }}>
                                <CssVarsProvider>
                                    <Textarea
                                        type="text"
                                        size="sm"
                                        placeholder="Bill Description"
                                        variant="outlined"
                                        minRows={2}
                                        maxRows={4}
                                        name="billdescription"
                                        value={billdescription}
                                        onChange={(e) => MastBillUpdate(e)}
                                    >
                                    </Textarea>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ flex: 1, mt: 1.5, ml: 2, fontWeight: 600 }}>
                                <CurrencyRupeeIcon sx={{ pb: .5, fontSize: 20 }} />Bill Amount<span style={{ color: '#74112F' }} >*</span>
                            </Box>
                            <Box sx={{ flex: 1, mx: 2 }}>
                                <TextFieldCustom
                                    placeholder="$0.00"
                                    type="text"
                                    size="sm"
                                    name="billamount"
                                    value={billamount}
                                    onchange={MastBillUpdate}
                                >
                                </TextFieldCustom>
                            </Box>
                            <Box sx={{ flex: 1, mt: 1.5, ml: 2, fontWeight: 600 }}>
                                <InsertInvitationIcon sx={{ pb: .5, fontSize: 20 }} />Bill Date<span style={{ color: '#74112F' }} >*</span>
                            </Box>
                            <Box sx={{ flex: 1, mx: 2 }}>
                                <CssVarsProvider>
                                    <TextFieldCustom
                                        placeholder="Sim SlNo"
                                        type="datetime-local"
                                        size="sm"
                                        name="billdate"
                                        value={billdate}
                                        onchange={MastBillUpdate}
                                    >
                                    </TextFieldCustom>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ flex: 1, mt: 1.8, ml: 2, fontWeight: 600 }}>
                                <InsertInvitationIcon sx={{ pb: .5, fontSize: 20 }} />Bill Due Date<span style={{ color: '#74112F' }} >*</span>
                            </Box>
                            <Box sx={{ flex: 1, mx: 2 }}>
                                <TextFieldCustom
                                    placeholder="Sim SlNo"
                                    type="datetime-local"
                                    size="sm"
                                    name="billduedate"
                                    value={billduedate}
                                    onchange={MastBillUpdate}
                                >
                                </TextFieldCustom>
                            </Box>
                            <Box sx={{ flex: 1, mt: 1.4, ml: 2.5 }}>
                                <Checkbox label="Bill Payed" color="primary"
                                    onChange={(e) => CheckBoxChange(e)}
                                    checked={payedStatus}
                                />
                            </Box>

                            {billCategoryName === 'CUG' ?
                                <Box></Box> : null}

                            {payedCheckFlag === 1 ?
                                <>
                                    <Box sx={{ flex: 1, mt: 1, ml: 2, fontWeight: 600 }}>
                                        <InsertInvitationIcon sx={{ pb: .5, fontSize: 20 }} />Bill Payed Date<span style={{ color: '#74112F' }} >*</span>
                                    </Box>
                                    <Box sx={{ flex: 1, mx: 2 }}>
                                        <TextFieldCustom
                                            type="datetime-local"
                                            size="sm"
                                            name="billpayed_date"
                                            value={billpayed_date}
                                            onchange={MastBillUpdate}
                                        >
                                        </TextFieldCustom>
                                    </Box>
                                </>
                                : null
                            }
                            <Box sx={{ border: '1px', borderStyle: 'dashed', mt: .5, py: .5, borderColor: '#41729F', display: 'flex', pl: .5, mx: 2 }}>
                                <Box sx={{ m: .5, border: 1, borderColor: '#41729F', borderRadius: 8, flex: 1, pl: 1, fontSize: 13, color: '#05445E', margin: 'auto' }}>
                                    <label htmlFor="file-input">
                                        <DriveFolderUploadIcon sx={{ cursor: 'pointer', color: '#175873', height: 30, width: 30, '&:hover': { color: '#189AB4' }, }} />&nbsp;Bill Attach
                                    </label>
                                </Box>
                                <Box sx={{ flex: 4, mr: .5, }}>
                                    <input
                                        id="file-input"
                                        type="file"
                                        accept=".jpg, .jpeg, .png, .pdf"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        name="file"
                                        multiple // Add this attribute to allow multiple file selections
                                    />
                                    {selectFile && selectFile.map((file, index) => (
                                        <Box sx={{
                                            display: "flex", backgroundColor: '#D6E2E8', mx: 1, borderRadius: 8, my: .5, px: 1,
                                            border: 1, borderColor: '#0C2D48'
                                        }}
                                            key={index}
                                        >
                                            <Box sx={{ flex: 1 }}>{file.name}</Box>
                                            <CloseIcon size={'sm'} sx={{ cursor: 'pointer', width: 20, '&:hover': { color: '#055C9D' }, }}
                                                onClick={() => handleRemoveFile(index)} />
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                            {file_upload_status === 1 ?
                                <Box sx={{ mt: 1, mx: 1 }}>
                                    <Box sx={{
                                        m: .5, borderRadius: 8, width: 134, pl: 1, fontSize: 13, bgcolor: '#5F7950', color: '#F8F8F0', py: .5, cursor: 'pointer',
                                        '&:hover': {
                                            boxShadow: '1px 2px 10px'
                                            , bgcolor: '#A4AA83',
                                            color: '#4C411A'
                                        },
                                    }}
                                        onClick={openBillModal}>
                                        <FilePresentIcon sx={{
                                            cursor: 'pointer', color: '#F8F8F0', height: 23, width: 23,
                                            '&:hover': {
                                                color: '#4C411A'
                                            },
                                        }} />&nbsp;Uploaded bills
                                    </Box>

                                </Box> : null}

                        </Box>
                        <Box sx={{ flex: 1, mx: 2, mt: 1.5 }}>
                            <CssVarsProvider>
                                <Button variant="solid" style={{ borderRadius: 2, color: 'white', width: '100%' }}
                                    onClick={editOtherBill}
                                    sx={{ fontSize: 16, color: '#004F76', }} >Update</Button>
                            </CssVarsProvider>
                        </Box>
                    </ModalDialog>
                </Box>
            </Modal>
        </Box >

    )
}

export default memo(EditingOtherBillModal)