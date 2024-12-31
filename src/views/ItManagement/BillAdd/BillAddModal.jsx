import { Box, Button, Checkbox, CssVarsProvider, Modal, ModalDialog, Textarea, Tooltip } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ItBillCategoryList from 'src/views/CommonSelectCode/ItBillCategoryList';
import { useDispatch, useSelector } from 'react-redux';
import { getBillCategory } from 'src/redux/actions/ItBillCategoryList.action';
import TariffSelect from '../SimDetails/TariffSelect';
import ItSimTypeSelect from 'src/views/CommonSelectCode/ItSimTypeSelect';
import { getSimType } from 'src/redux/actions/ItSimTypeList.action';
import SpaceDashboardSharpIcon from '@mui/icons-material/SpaceDashboardSharp';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SimCardSharpIcon from '@mui/icons-material/SimCardSharp';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import PaidIcon from '@mui/icons-material/Paid';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import NotesIcon from '@mui/icons-material/Notes';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ReceiptIcon from '@mui/icons-material/Receipt';
import imageCompression from 'browser-image-compression';
import CloseIcon from '@mui/icons-material/Close';
import { Paper } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PinDropIcon from '@mui/icons-material/PinDrop';
import SpeakerPhoneIcon from '@mui/icons-material/SpeakerPhone';
import ItBillsupplierDetailsList from 'src/views/CommonSelectCode/ItBillsupplierDetailsList';
import { getSupplierList } from 'src/redux/actions/ItbillSupplierList.action';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AttachmentIcon from '@mui/icons-material/Attachment';

const BillAddModal = ({ open, setAddModalFlag, setaddModalOpen, billCount, setbillCount, }) => {

    const [billCategory, setBillCategory] = useState(0)
    const [billCategoryName, setBillCategoryName] = useState('')
    const [tarrif, setTarrif] = useState(0)
    const [simType, setSimType] = useState(0)
    const [cugStatus, setcugStatus] = useState(false)
    const [checkFlag, setcheckFlag] = useState(0)
    const [payedCheck, setpayedCheck] = useState(0)
    const [payedStatus, setpayedStatus] = useState(false)
    const [billName, setbillName] = useState('')
    const [selectFile, setSelectFile] = useState([]);
    const [billType, setbillType] = useState(0)
    const [pswd_mast_asset_no, setPswd_mast_asset_no] = useState('')
    const [deviceName, setdeviceName] = useState('')
    const [location, setlocation] = useState('')
    const [item_slno, setItem_slno] = useState(0)
    const [suppliersList, setSuppliersList] = useState(0)
    const dispatch = useDispatch();
    const id = useSelector((state) => { return state.LoginUserData.empid })

    useEffect(() => {
        dispatch(getBillCategory())
        dispatch(getSimType())
        dispatch(getSupplierList())
    }, [dispatch])

    const CheckBoxChange = useCallback((e) => {
        if (e.target.checked === true) {
            setcugStatus(true)
            setcheckFlag(1)
        }
        else {
            setcugStatus(false)
            setcheckFlag(0)
        }
    }, [])
    const PayedStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setpayedStatus(true)
            setpayedCheck(1)
        }
        else {
            setpayedStatus(false)
            setpayedCheck(0)
        }
    }, [])
    const BillOnChange = useCallback((e) => {
        setbillName(e.target.value)
    }, [])
    const UpdateAssetNo = useCallback((e) => {
        setPswd_mast_asset_no(e.target.value.toLocaleUpperCase())
    }, [])

    const ResetModal = useCallback(() => {
        setBillCategory(0)
        setTarrif(0)
        setSimType(0)
        setcugStatus(false)
        setcheckFlag(0)
        setbillName('')
        setBillCategoryName('')
        setpayedCheck(0)
        setpayedStatus(false)
        setSelectFile([])
        setbillType(0)
        setPswd_mast_asset_no('')
        setdeviceName('')
        setlocation('')
        setItem_slno(0)
        setSuppliersList(0)
    }, [setBillCategory,])

    const handleClose = useCallback(() => {
        ResetModal()
        setAddModalFlag(0)
        setaddModalOpen(false)
    }, [
        setAddModalFlag, setaddModalOpen, ResetModal
    ])

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
    }, [billCategory]);

    const [otherBill, setOtherBill] = useState({
        bill_amount: '',
        bill_number: '',
        bill_date: '',
        bill_due_date: '',
        bill_paid_date: '',
        bill_description: '',
    })
    const { bill_amount, bill_date, bill_due_date, bill_paid_date, bill_description, bill_number } = otherBill

    const MastBillUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setOtherBill({ ...otherBill, [e.target.name]: value })
        },
        [otherBill],
    )

    const PostData = useMemo(() => {
        return {
            bill_name: billName,
            bill_category: billCategory === 0 ? null : billCategory,
            bill_tariff: tarrif === 0 ? null : tarrif,
            bill_cug_status: cugStatus === true ? 1 : 0,
            bill_cug_simtype: simType === 0 ? null : simType,
            create_user: id,
        }
    }, [billName, billCategory, tarrif, cugStatus, simType, id])

    const InsertOtherBills = useMemo(() => {
        return {
            bill_name: billName,
            bill_category: billCategory === 0 ? null : billCategory,
            bill_number: bill_number === '' ? null : bill_number,
            bill_amount: bill_amount === '' ? null : bill_amount,
            bill_date: bill_date === '' ? null : bill_date,
            bill_due_date: bill_due_date === '' ? null : bill_due_date,
            payed_status: payedStatus === true ? 1 : 0,
            bill_paid_date: bill_paid_date === '' ? null : bill_paid_date,
            bill_description: bill_description === '' ? null : bill_description,
            am_item_map_slno: item_slno === 0 ? null : item_slno,
            supplier_details: suppliersList === 0 ? null : suppliersList,
            create_user: id,
        }
    }, [billName, billCategory, bill_amount, bill_date, bill_due_date, bill_paid_date, bill_description, payedStatus, bill_number, item_slno, suppliersList, id])

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

    const addBill = useCallback((e) => {
        e.preventDefault()
        if (tarrif === 4) {
            if (billName !== '' && billCategory !== 0 && bill_number !== '' && bill_amount !== '' && bill_date !== '' && bill_due_date !== '') {
                if ((payedStatus === true && bill_paid_date !== '') || (payedStatus === false && bill_paid_date === '')) {
                    const InsertOtherBill = async (InsertOtherBills) => {
                        const result = await axioslogin.post('/ItBillAdd/otherBillinsert', InsertOtherBills)
                        return result.data;
                    }
                    const InsertOtherFile = async (selectFile, insertId) => {
                        try {
                            const formData = new FormData();
                            formData.append('id', insertId);
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
                    InsertOtherBill(InsertOtherBills).then((value) => {
                        const { message, success, insertId } = value
                        if (success === 1) {
                            if (selectFile.length !== 0) {
                                InsertOtherFile(selectFile, insertId).then((value) => {
                                    const { success } = value
                                    if (success === 1) {
                                        succesNotify('Bill Updated with file attach successfully')
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

                } else if (payedStatus === true && bill_paid_date === '') {
                    infoNotify('Please enter Bill Payed Date')
                }
            } else {
                infoNotify('Please All the mandatory feilds')
            }
        } else {
            if (billName !== '' && billCategory !== 0) {
                if ((billCategoryName === 'CUG' && simType !== 0) || (billCategoryName !== 'CUG')) {
                    const InsertBill = async (PostData) => {
                        const result = await axioslogin.post('/ItBillAdd/insertBill', PostData)
                        const { message, success } = result.data
                        if (success === 1) {
                            succesNotify(message)
                            setbillCount(billCount + 1)
                            handleClose()
                        } else if (success === 0) {
                            infoNotify(message)
                        } else {
                            infoNotify(message)
                        }
                    }
                    InsertBill(PostData)
                } else {
                    infoNotify('Please select CUG type')
                }
            } else {
                infoNotify('Please All the mandatory feilds')
            }
        }
    }, [PostData, InsertOtherBills, billName, billCount, selectFile, handleClose, billCategory, bill_amount, bill_date, bill_due_date, bill_number, handleImageUpload,
        setbillCount, tarrif, bill_paid_date, payedStatus, billCategoryName, simType])

    return (
        <Box >
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10, }}>
                <ModalDialog variant="outlined"
                    sx={{ width: 850 }}>
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
                    <Box sx={{ overflow: 'auto', }}>
                        <Box sx={{ flex: 1, mt: 3, ml: 2, fontWeight: 600, color: '#183A53' }}>
                            <SpaceDashboardSharpIcon sx={{
                                p: .3, mb: .3,
                                fontSize: 20, bgcolor: '#183A53', color: 'white',
                                border: 1, borderRadius: 10
                            }} />Bill Category<span style={{ color: '#74112F' }} >*</span>
                        </Box>
                        <Box sx={{ flex: 1, mx: 2 }}>
                            <ItBillCategoryList
                                billCategory={billCategory} setBillCategory={setBillCategory} setName={setBillCategoryName} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 1.5, ml: 2, fontWeight: 600, color: '#183A53' }}>
                            <PaidIcon sx={{
                                p: .3, mb: .3,
                                fontSize: 20, bgcolor: '#183A53', color: 'white',
                                border: 1, borderRadius: 10
                            }} />Tariff<span style={{ color: '#74112F' }} >*</span>
                        </Box>
                        <Box sx={{ flex: 1, mx: 2 }}>
                            <TariffSelect tarrif={tarrif} setTarrif={setTarrif} />
                        </Box>
                        {billType === 3 && tarrif !== 4 ?
                            <Box>
                                <Box sx={{ flex: 1, mt: 1.5, ml: 2, fontWeight: 600, color: '#183A53' }}>
                                    <ReceiptLongIcon sx={{
                                        p: .3, mb: .3,
                                        fontSize: 20, bgcolor: '#183A53', color: 'white',
                                        border: 1, borderRadius: 10
                                    }} />Bill Name<span style={{ color: '#74112F' }} >*</span>
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
                                            name="billName"
                                            value={billName}
                                            onChange={(e) => BillOnChange(e)}
                                        >
                                        </Textarea>
                                    </CssVarsProvider>
                                </Box> </Box>
                            : null}
                        {billType !== 3 && tarrif !== 4 ?
                            <Box>
                                <Box sx={{ flex: 1, mt: 1.5, ml: 2, fontWeight: 600, color: '#183A53' }}>
                                    <ReceiptLongIcon sx={{
                                        p: .3, mb: .3,
                                        fontSize: 20, bgcolor: '#183A53', color: 'white',
                                        border: 1, borderRadius: 10
                                    }} />Bill Name<span style={{ color: '#74112F' }} >*</span>
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
                                            name="billName"
                                            value={billName}
                                            onChange={(e) => BillOnChange(e)}
                                        >
                                        </Textarea>
                                    </CssVarsProvider>
                                </Box> </Box>
                            : null}

                        {tarrif === 4 ?
                            <Box>
                                {billType === 3 ?
                                    <Box>

                                        <Paper sx={{ mx: 2, borderRadius: 0, bgcolor: '#F0F2F3', boxShadow: '0px 0px 3px' }}>
                                            <Box sx={{ flex: 1, mt: 1.5, fontWeight: 600, px: .5, color: '#54627B' }}>
                                                <ManageSearchIcon sx={{
                                                    p: .3, mb: .3,
                                                    fontSize: 20, bgcolor: '#183A53', color: 'white',
                                                    border: 1, borderRadius: 10
                                                }} />Asset No.<span style={{ color: '#74112F' }} >*</span>
                                            </Box>
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
                                                    <SearchRoundedIcon sx={{ color: 'white', cursor: 'pointer' }} onClick={searchAssetNo} />
                                                </Box>
                                            </Box>
                                            {deviceName !== '' ?
                                                <Box>
                                                    <Box sx={{ flex: 1, mt: 1.5, fontWeight: 600, pl: .5, mb: .3, color: '#54627B' }}>
                                                        <SpeakerPhoneIcon sx={{
                                                            p: .3, mb: .3,
                                                            fontSize: 20, bgcolor: '#183A53', color: 'white',
                                                            border: 1, borderRadius: 10
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
                                        <Box sx={{ flex: 1, mt: 1.5, ml: 2, fontWeight: 600, color: '#183A53' }}>
                                            <LocalShippingIcon sx={{
                                                p: .3, mb: .3,
                                                fontSize: 20, bgcolor: '#183A53', color: 'white',
                                                border: 1, borderRadius: 10
                                            }} />Supplier Name<span style={{ color: '#74112F' }} >*</span>
                                        </Box>
                                        <Box sx={{ flex: 1, mx: 2 }}>
                                            <ItBillsupplierDetailsList
                                                suppliersList={suppliersList} setSuppliersList={setSuppliersList} />
                                        </Box>
                                        <Box sx={{ flex: 1, mt: 1.5, ml: 2, fontWeight: 600, color: '#183A53' }}>
                                            <ReceiptLongIcon sx={{
                                                p: .3, mb: .3,
                                                fontSize: 20, bgcolor: '#183A53', color: 'white',
                                                border: 1, borderRadius: 10
                                            }} />Bill Name<span style={{ color: '#74112F' }} >*</span>
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
                                                    name="billName"
                                                    value={billName}
                                                    onChange={(e) => BillOnChange(e)}
                                                >
                                                </Textarea>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box sx={{ flex: 1, mt: 1.5, ml: 2, fontWeight: 600, color: '#183A53' }}>
                                            <ReceiptIcon sx={{
                                                p: .3, mb: .3,
                                                fontSize: 20, bgcolor: '#183A53', color: 'white',
                                                border: 1, borderRadius: 10
                                            }} />Bill Number/Invoice Number<span style={{ color: '#74112F' }} >*</span>
                                        </Box>
                                        <Box sx={{ flex: 1, mx: 2 }}>
                                            <TextFieldCustom
                                                placeholder="Bill Number/Invoice Number"
                                                type="text"
                                                size="sm"
                                                name="bill_number"
                                                value={bill_number}
                                                onchange={MastBillUpdate}
                                            >
                                            </TextFieldCustom>
                                        </Box>
                                        <Box sx={{ flex: 1, mt: 1.5, ml: 2, fontWeight: 600, color: '#183A53' }}>
                                            <NotesIcon sx={{
                                                p: .3, mb: .3,
                                                fontSize: 20, bgcolor: '#183A53', color: 'white',
                                                border: 1, borderRadius: 10
                                            }} />Bill Description
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
                                                    name="bill_description"
                                                    value={bill_description}
                                                    onChange={(e) => MastBillUpdate(e)}
                                                >
                                                </Textarea>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box sx={{ flex: 1, mt: 1.5, ml: 2, fontWeight: 600, color: '#183A53' }}>
                                            <CurrencyRupeeIcon sx={{
                                                p: .3, mb: .3,
                                                fontSize: 20, bgcolor: '#183A53', color: 'white',
                                                border: 1, borderRadius: 10
                                            }} />Bill Amount<span style={{ color: '#74112F' }} >*</span>
                                        </Box>
                                        <Box sx={{ flex: 1, mx: 2 }}>
                                            <TextFieldCustom
                                                placeholder="₹0.00"
                                                type="text"
                                                size="sm"
                                                name="bill_amount"
                                                value={bill_amount}
                                                onchange={MastBillUpdate}
                                            >
                                            </TextFieldCustom>
                                        </Box>
                                        <Box sx={{ flex: 1, mt: 1.8, ml: 2, fontWeight: 600, color: '#183A53' }}>
                                            <InsertInvitationIcon sx={{
                                                p: .3, mb: .3,
                                                fontSize: 20, bgcolor: '#183A53', color: 'white',
                                                border: 1, borderRadius: 10
                                            }} />Bill Date<span style={{ color: '#74112F' }} >*</span>
                                        </Box>
                                        <Box sx={{ flex: 1, mx: 2 }}>
                                            <CssVarsProvider>
                                                <TextFieldCustom
                                                    type="date"
                                                    size="sm"
                                                    name="bill_date"
                                                    value={bill_date}
                                                    onchange={MastBillUpdate}>
                                                </TextFieldCustom>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box sx={{ flex: 1, mt: 1.8, ml: 2, fontWeight: 600, color: '#183A53' }}>
                                            <InsertInvitationIcon sx={{
                                                p: .3, mb: .3,
                                                fontSize: 20, bgcolor: '#183A53', color: 'white',
                                                border: 1, borderRadius: 10
                                            }} />Bill Due Date<span style={{ color: '#74112F' }} >*</span>
                                        </Box>
                                        <Box sx={{ flex: 1, mx: 2 }}>
                                            <TextFieldCustom
                                                type="date"
                                                size="sm"
                                                name="bill_due_date"
                                                value={bill_due_date}
                                                onchange={MastBillUpdate}>
                                            </TextFieldCustom>
                                        </Box>
                                        <Box sx={{ flex: 1, mt: 1, ml: 2.5, pt: .5 }}>
                                            <Checkbox label="Bill Payed" color="primary"
                                                onChange={(e) => PayedStatus(e)}
                                                checked={payedStatus} />
                                        </Box>
                                        {payedCheck === 1 ?
                                            <>
                                                <Box sx={{ flex: 1, mt: 1, ml: 2, fontWeight: 600, color: '#183A53' }}>
                                                    <InsertInvitationIcon sx={{
                                                        p: .3, mb: .3,
                                                        fontSize: 20, bgcolor: '#183A53', color: 'white',
                                                        border: 1, borderRadius: 10
                                                    }} />Bill Payed Date<span style={{ color: '#74112F' }} >*</span>
                                                </Box>
                                                <Box sx={{ flex: 1, mx: 2 }}>
                                                    <TextFieldCustom
                                                        type="date"
                                                        size="sm"
                                                        name="bill_paid_date"
                                                        value={bill_paid_date}
                                                        onchange={MastBillUpdate}>
                                                    </TextFieldCustom>
                                                </Box>
                                            </>
                                            : null
                                        }
                                        <Box sx={{
                                            border: '1px', borderStyle: 'dashed', mt: .5, py: .3, borderColor: '#41729F', pl: .5, borderRadius: '2px', minHeight: 60,
                                            flex: 1, mx: 2,
                                        }}>
                                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', mt: 2 }}>
                                                <label htmlFor="file-input">
                                                    <Box sx={{ cursor: 'pointer', fontWeight: 600, color: '#145DA0', }}>
                                                        <AttachmentIcon sx={{ fontWeight: 800, color: '#145DA0' }} />Choose Files (Bills)
                                                    </Box>
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
                                    </Box> :
                                    <Box>
                                        <Box sx={{ flex: 1, mt: 1.5, ml: 2, fontWeight: 600, color: '#183A53' }}>
                                            <ReceiptLongIcon sx={{
                                                p: .3, mb: .3,
                                                fontSize: 20, bgcolor: '#183A53', color: 'white',
                                                border: 1, borderRadius: 10
                                            }} />Bill Name<span style={{ color: '#74112F' }} >*</span>
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
                                                    name="billName"
                                                    value={billName}
                                                    onChange={(e) => BillOnChange(e)}
                                                >
                                                </Textarea>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box sx={{ flex: 1, mt: 1.5, ml: 2, fontWeight: 600, color: '#183A53' }}>
                                            <ReceiptIcon sx={{
                                                p: .3, mb: .3,
                                                fontSize: 20, bgcolor: '#183A53', color: 'white',
                                                border: 1, borderRadius: 10
                                            }} />Bill Number/Invoice Number<span style={{ color: '#74112F' }} >*</span>
                                        </Box>
                                        <Box sx={{ flex: 1, mx: 2 }}>
                                            <TextFieldCustom
                                                placeholder="Bill Number/Invoice Number"
                                                type="text"
                                                size="sm"
                                                name="bill_number"
                                                value={bill_number}
                                                onchange={MastBillUpdate}
                                            >
                                            </TextFieldCustom>
                                        </Box>
                                        <Box sx={{ flex: 1, mt: 1.5, ml: 2, fontWeight: 600, color: '#183A53' }}>
                                            <NotesIcon sx={{
                                                p: .3, mb: .3,
                                                fontSize: 20, bgcolor: '#183A53', color: 'white',
                                                border: 1, borderRadius: 10
                                            }} />Bill Description
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
                                                    name="bill_description"
                                                    value={bill_description}
                                                    onChange={(e) => MastBillUpdate(e)}
                                                >
                                                </Textarea>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box sx={{ flex: 1, mt: 1.5, ml: 2, fontWeight: 600, color: '#183A53' }}>
                                            <CurrencyRupeeIcon sx={{
                                                p: .3, mb: .3,
                                                fontSize: 20, bgcolor: '#183A53', color: 'white',
                                                border: 1, borderRadius: 10
                                            }} />Bill Amount<span style={{ color: '#74112F' }} >*</span>
                                        </Box>
                                        <Box sx={{ flex: 1, mx: 2, }}>
                                            <TextFieldCustom
                                                placeholder="₹0.00"
                                                type="text"
                                                size="sm"
                                                name="bill_amount"
                                                value={bill_amount}
                                                onchange={MastBillUpdate}>
                                            </TextFieldCustom>
                                        </Box>
                                        <Box sx={{ flex: 1, mt: 1.8, ml: 2, fontWeight: 600, color: '#183A53' }}>
                                            <InsertInvitationIcon sx={{
                                                p: .3, mb: .3,
                                                fontSize: 20, bgcolor: '#183A53', color: 'white',
                                                border: 1, borderRadius: 10
                                            }} />Bill Date<span style={{ color: '#74112F' }} >*</span>
                                        </Box>
                                        <Box sx={{ flex: 1, mx: 2 }}>
                                            <CssVarsProvider>
                                                <TextFieldCustom
                                                    type="date"
                                                    size="sm"
                                                    name="bill_date"
                                                    value={bill_date}
                                                    onchange={MastBillUpdate}>
                                                </TextFieldCustom>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box sx={{ flex: 1, mt: 1.8, ml: 2, fontWeight: 600, color: '#183A53' }}>
                                            <InsertInvitationIcon sx={{
                                                p: .3, mb: .3,
                                                fontSize: 20, bgcolor: '#183A53', color: 'white',
                                                border: 1, borderRadius: 10
                                            }} />Bill Due Date<span style={{ color: '#74112F' }} >*</span>
                                        </Box>
                                        <Box sx={{ flex: 1, mx: 2 }}>
                                            <TextFieldCustom
                                                type="date"
                                                size="sm"
                                                name="bill_due_date"
                                                value={bill_due_date}
                                                onchange={MastBillUpdate}>
                                            </TextFieldCustom>
                                        </Box>
                                        <Box sx={{ flex: 1, mt: 1, ml: 2.5, pt: .5 }}>
                                            <Checkbox label="Bill Payed" color="primary"
                                                onChange={(e) => PayedStatus(e)}
                                                checked={payedStatus} />
                                        </Box>
                                        {payedCheck === 1 ?
                                            <>
                                                <Box sx={{ flex: 1, mt: 1, ml: 2, fontWeight: 600, color: '#183A53' }}>
                                                    <InsertInvitationIcon sx={{
                                                        p: .3, mb: .3,
                                                        fontSize: 20, bgcolor: '#183A53', color: 'white',
                                                        border: 1, borderRadius: 10
                                                    }} />Bill Payed Date<span style={{ color: '#74112F' }} >*</span>
                                                </Box>
                                                <Box sx={{ flex: 1, mx: 2 }}>
                                                    <TextFieldCustom
                                                        type="date"
                                                        size="sm"
                                                        name="bill_paid_date"
                                                        value={bill_paid_date}
                                                        onchange={MastBillUpdate}>
                                                    </TextFieldCustom>
                                                </Box>
                                            </>
                                            : null
                                        }
                                        <Box sx={{
                                            border: '1px', borderStyle: 'dashed', mt: .5, py: .3, borderColor: '#41729F', pl: .5, borderRadius: '2px', minHeight: 60,
                                            flex: 1, mx: 2,
                                        }}>
                                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', mt: 2 }}>
                                                <label htmlFor="file-input">
                                                    <Box sx={{ cursor: 'pointer', fontWeight: 600, color: '#145DA0', }}>
                                                        <AttachmentIcon sx={{ fontWeight: 800, color: '#145DA0' }} />Choose Files (Bills)
                                                    </Box>
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
                                                        key={index}>
                                                        <Box sx={{ flex: 1 }}>{file.name}</Box>
                                                        <CloseIcon size={'sm'} sx={{ cursor: 'pointer', width: 20, '&:hover': { color: '#055C9D' }, }}
                                                            onClick={() => handleRemoveFile(index)} />
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>

                                    </Box>}


                            </Box>
                            : <>
                                {billCategoryName === 'CUG' ?
                                    <Box>
                                        <Box sx={{ flex: 1, mt: 1, ml: 2.5 }}>
                                            <Checkbox label="CUG Type" color="primary"
                                                onChange={(e) => CheckBoxChange(e)}
                                                checked={cugStatus} />
                                        </Box>
                                        {checkFlag === 1 ?
                                            <>
                                                <Box sx={{ flex: 1, mt: 1, ml: 2, fontWeight: 600, color: '#183A53' }}>
                                                    <SimCardSharpIcon sx={{
                                                        p: .3, mb: .3,
                                                        fontSize: 20, bgcolor: '#183A53', color: 'white',
                                                        border: 1, borderRadius: 10
                                                    }} />Sim Type<span style={{ color: '#74112F' }} >*</span>
                                                </Box>
                                                <Box sx={{ flex: 1, mx: 2 }}>
                                                    <ItSimTypeSelect simType={simType} setSimType={setSimType} />
                                                </Box>
                                            </>
                                            : null
                                        }
                                    </Box> : null}

                            </>
                        }
                    </Box>
                    <Box sx={{ flex: 1, mx: 2, mt: 1 }}>
                        <CssVarsProvider>
                            <Button variant="solid" style={{ borderRadius: 2, color: 'white', width: '100%' }}
                                onClick={addBill}
                                sx={{ fontSize: 16, color: '#004F76', }} >Add</Button>
                        </CssVarsProvider>
                    </Box>
                </ModalDialog>
            </Modal >
        </Box >
    )
}

export default memo(BillAddModal)