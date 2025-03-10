import { Box, Button, Checkbox, CssVarsProvider, Grid, Modal, ModalDialog, Table, Textarea, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import TextComponent from 'src/views/Components/TextComponent';
import CancelIcon from '@mui/icons-material/Cancel';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import MoreIcon from '@mui/icons-material/More';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddDetailOnItem from './AddDetailOnItem';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useQuery } from 'react-query';
import { getCondemAddedDetails, getItemUnderForm } from 'src/api/AssetApis';
import { axioslogin } from 'src/views/Axios/Axios';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import DirectionsIcon from '@mui/icons-material/Directions';
import FileViewSingle from 'src/views/Components/FileViewSingle';
import { Popover } from '@mui/material';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { format } from 'date-fns';

const CondemnationApprovalModal = ({
    modalApproveOpen, setmodalApproveOpen,
    setmodalApproveFlag,
    empId,
    formDetails,
    setformCount,
    formCount
}) => {
    const { condem_mast_slno, condem_form_prefix, condem_form_no, reg_date, incharge_approve_status, incharge_remarks, hod_approve_status, hod_remarks,
        gm_approve_status, gm_approve_remarks, acc_approve_status, acc_approve_remarks, material_mangmnt_mangr_apprv_status, material_mangmnt_mangr_apprv_remark,
        inch_apprv_date, hod_apprv_date, inch_apprv_reject_date
    } = formDetails

    const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    console.log(currentDate);
    const [condemCount, setcondemCount] = useState(0)
    const [inchremarks, setinchRemarks] = useState("");
    const [hodRemarks, setHodRemarks] = useState("");

    const handleInchChange = (event) => {
        setinchRemarks(event.target.value);
    };
    const handleHodChange = (event) => {
        setHodRemarks(event.target.value);
    };
    const postCondemSlno = useMemo(() => {
        return {
            condemMastslno: condem_mast_slno,
        }
    }, [condem_mast_slno])

    const [count, setcount] = useState(0)
    const { data: itemUnderForm } = useQuery({
        queryKey: ['getItemUnderForm', count],
        queryFn: () => getItemUnderForm(postCondemSlno),
        enabled: condem_mast_slno !== undefined,
    })

    const [addModalOpen, setaddModalOpen] = useState(false)
    const [addModalFlag, setaddModalFlag] = useState(0)
    const [itemDetails, setitemDetails] = useState([])
    const [reqRegDate, setReqRegDate] = useState(reg_date)

    const AddDetailsModal = useCallback((val) => {
        setaddModalFlag(1)
        setaddModalOpen(true)
        setitemDetails(val)
    }, [setaddModalFlag, setaddModalOpen])

    const CloseModal = useCallback(() => {
        setmodalApproveOpen(false)
        setmodalApproveFlag(0)
    }, [setmodalApproveOpen, setmodalApproveFlag])


    const [checkPopover, setCheckPopover] = useState(null);
    const [uncheckPopover, setUncheckPopover] = useState(null);
    const [checkedItems, setCheckedItems] = useState({});
    const [reasons, setReasons] = useState({});
    const [deatilSlno, setDeatilSlno] = useState(0);
    const [addedCondemFiles, setaddedCondemFiles] = useState([])

    const handleCheckboxChange = (event, index, val) => {
        const { am_condem_detail_slno } = val;
        const isChecked = event.target.checked;
        setCheckedItems((prev) => ({ ...prev, [index]: isChecked }));
        if (isChecked) {
            setDeatilSlno(am_condem_detail_slno);
            setCheckPopover(event.currentTarget);
            setUncheckPopover(null);
        } else {
            setDeatilSlno(am_condem_detail_slno);
            setUncheckPopover(event.currentTarget);
            setCheckPopover(null);
        }
    };
    const handleCloseCheck = () => setCheckPopover(null);
    const handleCloseUncheck = () => setUncheckPopover(null);


    const handleAddReason = (index) => {
        const singleItemData = {
            am_condem_detail_slno: deatilSlno,
            keep_inscarp_status: 1,
            keep_in_srap_store_reason: reasons[index] || "",
            scarp_store_emp: empId,
        };

        const scarpStoreUpdate = async (singleItemData) => {
            const result = await axioslogin.patch('/AssetCondemnation/updateScarpStoreData', singleItemData)
            const { message, success } = result.data
            if (success === 2) {
                succesNotify(message)
                handleCloseCheck()
                setReasons({})
            } else {
                infoNotify(message)
            }
        }
        scarpStoreUpdate(singleItemData)
    };
    const RemoveFromScrapStore = () => {
        const singleItemData = {
            am_condem_detail_slno: deatilSlno,
            keep_inscarp_status: 0,
            keep_in_srap_store_reason: null,
            scarp_store_emp: empId,
        };
        const scarpStoreUpdate = async (singleItemData) => {
            const result = await axioslogin.patch('/AssetCondemnation/updateScarpStoreData', singleItemData)
            const { message, success } = result.data
            if (success === 2) {
                succesNotify("Item Removed From Keeping in Scapstore and Submitted for Condemnation ")
                handleCloseUncheck()
                setReasons({})
            } else {
                infoNotify("Unable to Update")
            }
        }
        scarpStoreUpdate(singleItemData)
    };



    const { data: CondemData } = useQuery({
        queryKey: ['getCondemAddedDetails', count],
        queryFn: () => getCondemAddedDetails(postCondemSlno),
        enabled: condem_mast_slno !== undefined,
    })

    const [formPrefix, setFormPrefix] = useState(condem_form_prefix || '');
    const [formNumber, setFormNumber] = useState(condem_form_no || '');

    const handleFormNoChange = (event) => {
        let value = event.target.value.toUpperCase();
        const match = value.match(/^([A-Z]+\/[A-Z]+)\/(\d+)$/);
        if (match) {
            setFormPrefix(match[1]);
            setFormNumber(match[2]);
        } else {
            setFormPrefix(value);
            setFormNumber("");
        }
    };

    const handleDateChange = (event) => {
        setReqRegDate(event.target.value);
    };

    const fetchCondemFiles = async () => {
        try {
            if (CondemData?.length > 0) {
                const requests = CondemData.map(async (row) => {
                    const postData = {
                        id: row.condem_mast_slno || null,
                        detailId: row.am_condem_detail_slno || null
                    };
                    try {
                        const result = await axioslogin.post("/AssetFileUpload/uploadFile/getCondemnation", postData);
                        const { success, data } = result.data;
                        if (success === 1 && data && Array.isArray(data)) {
                            return {
                                [row.am_condem_detail_slno]: data.map(fileName =>
                                    `${PUBLIC_NAS_FOLDER}/AssetCondemDetails/${postData.id}/${postData.detailId}/${fileName}`
                                )
                            };
                        } else {
                            return { [row.am_condem_detail_slno]: [] };
                        }
                    } catch (error) {
                        if (error.response?.data?.message?.includes("ENOENT")) {
                            return { [row.am_condem_detail_slno]: null };
                        }
                        return { [row.am_condem_detail_slno]: [] };
                    }
                });

                const resultsArray = await Promise.all(requests);
                const filesMap = resultsArray.reduce((acc, curr) => ({ ...acc, ...curr }), {});
                setaddedCondemFiles(filesMap);
            }
        } catch (error) {
            setaddedCondemFiles({});
        }
    };

    useEffect(() => {
        fetchCondemFiles();
    }, [CondemData]);

    const [imageShowsingleFlag, setImagesingle] = useState(0)
    const [imageShowSingle, setImageShowSingle] = useState(false)
    const [uploadedFile, setUplodedFile] = useState({ url: "", type: "" });

    const SingleView = useCallback((file) => {
        const fileType = file.url
            ? file.url.endsWith(".pdf")
                ? "pdf"
                : "image"
            : file.type && file.type.includes("application/pdf")
                ? "image"
                : "pdf";

        const fileUrl = file.url || URL.createObjectURL(file);
        setUplodedFile({ url: fileUrl, type: fileType });
        setImageShowSingle(true);
        setImagesingle(1);

        const modalElement = document.querySelector('.MuiModal-root');
        if (modalElement && modalElement.hasAttribute('aria-hidden') && modalElement.getAttribute('aria-hidden') === 'true') {
            document.activeElement.blur();
        }
    }, []);

    const CloseSingleFile = useCallback(() => {
        setImagesingle(0)
        setImageShowSingle(false)
    }, [])

    const Approvedata = useMemo(() => {
        return {
            condem_mast_slno: condem_mast_slno,
            condem_form_prefix: formPrefix,
            condem_form_no: formNumber,
            condem_status: 2,
            incharge_approve_status: 1,
            incharge_remarks: inchremarks,
            inch_apprv_reject_date: currentDate,
            hod_approve_status: 0,
            hod_remarks: null,
            gm_approve_status: 0,
            gm_approve_remarks: null,
            acc_approve_status: 0,
            acc_approve_remarks: null,
            material_mangmnt_mangr_apprv_status: 0,
            material_mangmnt_mangr_apprv_remark: null
        }
    }, [condem_mast_slno, inchremarks, currentDate])

    const InChargeApproval = useCallback(
        (e) => {
            e.preventDefault()
            const FormUpdate = async (Approvedata) => {
                const result = await axioslogin.patch('/AssetCondemnation/ApproveData', Approvedata)
                const { message, success } = result.data
                if (success === 2) {
                    succesNotify(message)
                    setformCount(formCount + 1)
                    CloseModal()
                } else {
                    infoNotify(message)
                }
            }
            if (inchremarks !== null) {
                FormUpdate(Approvedata)
            }
            else {
                infoNotify("Enter From Approval Remarks")
            }
        },
        [Approvedata])

    const Rejectdata = useMemo(() => {
        return {
            condem_mast_slno: condem_mast_slno,
            condem_form_prefix: formPrefix,
            condem_form_no: formNumber,
            condem_status: 2,
            incharge_approve_status: 2,
            incharge_remarks: inchremarks,
            inch_apprv_reject_date: currentDate,
            hod_approve_status: 0,
            hod_remarks: null,
            gm_approve_status: 0,
            gm_approve_remarks: null,
            acc_approve_status: 0,
            acc_approve_remarks: null,
            material_mangmnt_mangr_apprv_status: 0,
            material_mangmnt_mangr_apprv_remark: null
        }
    }, [condem_mast_slno, formNumber, condem_mast_slno, formPrefix, inchremarks])

    const InChargeRejected = useCallback(
        (e) => {
            e.preventDefault()
            const FormUpdate = async (Rejectdata) => {
                const result = await axioslogin.patch('/AssetCondemnation/ApproveData', Rejectdata)
                const { message, success } = result.data
                if (success === 2) {
                    succesNotify("Condemnation Form Rejected")
                    setformCount(formCount + 1)
                    CloseModal()
                } else {
                    infoNotify(message)
                }
            }
            if (inchremarks !== null) {
                FormUpdate(Rejectdata)
            }
            else {
                infoNotify("Enter From Approval Remarks")
            }
        },
        [Rejectdata])


    const HodApprove = useMemo(() => {
        return {
            condem_mast_slno: condem_mast_slno,
            condem_form_prefix: formPrefix,
            condem_form_no: formNumber,
            condem_status: 3,
            incharge_approve_status: incharge_approve_status,
            incharge_remarks: incharge_remarks,
            hod_approve_status: 1,
            hod_remarks: hodRemarks,
            inch_apprv_reject_date: inch_apprv_reject_date,
            hod_apprv_date: currentDate,
            gm_approve_status: 0,
            gm_approve_remarks: null,
            acc_approve_status: 0,
            acc_approve_remarks: null,
            material_mangmnt_mangr_apprv_status: 0,
            material_mangmnt_mangr_apprv_remark: null
        }
    }, [condem_mast_slno, formNumber, condem_mast_slno, formPrefix, incharge_remarks, incharge_approve_status, hodRemarks])

    const HodApproval = useCallback(
        (e) => {
            e.preventDefault()
            const FormUpdate = async (HodApprove) => {
                const result = await axioslogin.patch('/AssetCondemnation/ApproveData', HodApprove)
                const { message, success } = result.data
                if (success === 2) {
                    succesNotify(message)
                    setformCount(formCount + 1)
                    CloseModal()
                } else {
                    infoNotify(message)
                }
            }
            if (hodRemarks !== null) {
                FormUpdate(HodApprove)
            }
            else {
                infoNotify("Enter  Approval Remarks")
            }
        },
        [HodApprove])

    const HodReject = useMemo(() => {
        return {
            condem_mast_slno: condem_mast_slno,
            condem_form_prefix: formPrefix,
            condem_form_no: formNumber,
            condem_status: 3,
            incharge_approve_status: incharge_approve_status,
            incharge_remarks: incharge_remarks,
            inch_apprv_reject_date: inch_apprv_reject_date,
            hod_approve_status: 0,
            hod_remarks: hodRemarks,
            hod_apprv_date: currentDate,
            gm_approve_status: 0,
            gm_approve_remarks: null,
            acc_approve_status: 0,
            acc_approve_remarks: null,
            material_mangmnt_mangr_apprv_status: 0,
            material_mangmnt_mangr_apprv_remark: null
        }
    }, [condem_mast_slno, formNumber, condem_mast_slno, formPrefix, incharge_approve_status, incharge_remarks, hodRemarks])

    const HodRejected = useCallback(
        (e) => {
            e.preventDefault()
            const FormUpdate = async (HodReject) => {
                const result = await axioslogin.patch('/AssetCondemnation/ApproveData', HodReject)
                const { message, success } = result.data
                if (success === 2) {
                    succesNotify("Condemnation Form Rejected")
                    setformCount(formCount + 1)
                    CloseModal()
                } else {
                    infoNotify(message)
                }
            }
            if (hodRemarks !== null) {
                FormUpdate(HodReject)
            }
            else {
                infoNotify("Enter Approval Remarks")
            }
        },
        [HodReject])



    return (
        <CssVarsProvider>
            {addModalFlag === 1 ?
                <Box>
                    <AddDetailOnItem addModalOpen={addModalOpen}
                        setaddModalOpen={setaddModalOpen}
                        setaddModalFlag={setaddModalFlag}
                        itemDetails={itemDetails}
                        empId={empId}
                        reqRegDate={reqRegDate}
                        condemMastslno={condem_mast_slno}
                        setcount={setcount}
                        count={count}
                        setcondemCount={setcondemCount}
                        condemCount={condemCount}
                    />
                </Box> : null}
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={modalApproveOpen}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
                <ModalDialog variant="outlined" sx={{ width: '95vw', p: 0, overflow: 'auto', height: '90vh' }}>
                    <Box sx={{ border: .1, borderColor: '#E8E6E5', m: 1, height: '100%' }}>
                        <Box sx={{ flex: 1, display: 'flex', ml: 1, }}>
                            <Box sx={{ flex: 1 }}>
                                <TextComponent
                                    text={"Condemnation Request Form"}
                                    sx={{ fontWeight: 600, color: '#6A5546', pl: .8, pt: 1, fontSize: 21 }}
                                />
                                <TextComponent
                                    text={"Information Technpology"}
                                    sx={{ fontWeight: 500, color: 'black', pl: .8, fontSize: 15 }}
                                />
                            </Box>
                            <Box sx={{ pr: 1, pt: 1, }}>
                                <CancelIcon sx={{ width: 30, height: 30, color: '#6A5546', cursor: 'pointer' }} onClick={CloseModal} />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mx: 1, mt: 2 }}>
                            <Box >
                                <TextComponent
                                    text={"Request Date"}
                                    sx={{ fontWeight: 400, pl: .5, color: 'Black' }} />
                                <TextFieldCustom
                                    style={{ width: 200 }}
                                    type="date"
                                    name="reqRegDate"
                                    value={reqRegDate}
                                    onchange={handleDateChange} />
                            </Box>

                            <Box>
                                <TextComponent
                                    text={
                                        <>
                                            Form No.<span style={{ color: "#74112F", fontSize: 15 }}>*</span>
                                        </>
                                    }
                                    sx={{ fontWeight: 400, pl: 0.5, color: "black" }}

                                />
                                <TextFieldCustom
                                    style={{ width: 200 }}
                                    type="text"
                                    value={`${formPrefix}${formNumber ? `/${formNumber}` : ""}`}
                                    name="FromNo"
                                    onchange={handleFormNoChange} />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, mx: 1, mt: 2, }}>
                            <Box sx={{ flex: 1, color: '#735F51', fontWeight: 600, }}>
                                Item List
                            </Box>
                            <Box sx={{
                                flex: 1, borderTop: 1, borderRight: 1, borderLeft: 1,
                                borderColor: 'lightgray',
                            }}>
                                <Box
                                    sx={{
                                        height: 32,
                                        display: 'flex',
                                        bgcolor: '#DCD2CC',
                                        alignItems: 'center',
                                        borderBottom: 1,
                                        borderColor: 'lightgray',

                                    }}
                                >
                                    <Box sx={{ width: 40, fontWeight: 600, color: '#444444', fontSize: 14, pl: 1.5 }}>#</Box>
                                    <Box sx={{ width: 150, fontWeight: 600, color: '#444444', fontSize: 14, pl: 1 }}>Keep in Scarp Store</Box>
                                    <Box sx={{ width: 120, fontWeight: 600, color: '#444444', fontSize: 14 }}>Asset/Spare No.</Box>
                                    <Box sx={{ width: 160, fontWeight: 600, color: '#444444', fontSize: 14, pl: 1 }}>
                                        Item Purchase Value
                                    </Box>
                                    <Box sx={{ width: 100, fontWeight: 600, color: '#444444', fontSize: 14 }}>Ticket No.</Box>
                                    <Box sx={{ flex: 2, fontWeight: 600, color: '#444444', fontSize: 14, pl: 1 }}>
                                        Condem Reason
                                    </Box>
                                    <Box sx={{ width: 60, fontWeight: 600, color: '#444444', fontSize: 14 }}>Details</Box>
                                    <Box sx={{ width: 50, fontWeight: 600, color: '#444444', fontSize: 14, pl: 1 }}>Add</Box>
                                </Box>

                                <Box sx={{ width: '100%', overflow: 'auto' }}>
                                    <Box sx={{ minHeight: 10, overflowY: 'auto', }}>
                                        {itemUnderForm?.map((val, index) => {
                                            const billamount = val.asset_bill_amount
                                                ? val.asset_bill_amount
                                                : val.spare_bill_amount
                                                    ? val.spare_bill_amount
                                                    : '';


                                            return (<Box
                                                key={index}
                                                sx={{
                                                    height: 32,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    borderBottom: 1,
                                                    borderColor: 'lightgray',
                                                    bgcolor: val.keep_inscarp_status === 1 ? '#EDF2F3' : 'white'
                                                }}
                                            >
                                                <Box sx={{ width: 40, fontWeight: 600, color: '#444444', fontSize: 14, pl: 1.5 }}>{index + 1}</Box>
                                                <Box sx={{ width: 150, fontWeight: 600, color: '#444444', fontSize: 14, display: 'flex', justifyContent: 'center' }}>
                                                    <Box>
                                                        <Checkbox
                                                            variant="outlined"
                                                            color="neutral"
                                                            onChange={(e) => handleCheckboxChange(e, index, val)}
                                                            checked={checkedItems[index] || val.keep_inscarp_status === 1}
                                                            sx={{ mt: .5 }}
                                                        />
                                                        <Popover open={Boolean(checkPopover)} anchorEl={checkPopover}  >
                                                            <Box sx={{ width: 250, p: 2, bgcolor: "white" }}>
                                                                <Typography sx={{ mb: 1, color: "black", fontSize: 14 }}>
                                                                    Why do you want to keep this in the scrap store?
                                                                    <span style={{ color: "#74112F", fontSize: 15 }}>*</span>
                                                                </Typography>
                                                                <Textarea
                                                                    minRows={3}
                                                                    placeholder="Enter reason..."
                                                                    value={reasons[index] || ""}
                                                                    onChange={(e) => setReasons((prev) => ({ ...prev, [index]: e.target.value }))}
                                                                    sx={{ width: "100%" }}
                                                                />
                                                                <Box sx={{ display: "flex", justifyContent: "right", mt: 1, gap: 1 }}>
                                                                    <Button variant="outlined" color="neutral" onClick={() => handleAddReason(index, val)}>
                                                                        Add
                                                                    </Button>
                                                                    <Button variant="outlined" color="neutral" onClick={handleCloseCheck}>
                                                                        Close
                                                                    </Button>
                                                                </Box>
                                                            </Box>
                                                        </Popover>
                                                        <Popover open={Boolean(uncheckPopover)} anchorEl={uncheckPopover} >
                                                            <Box sx={{ width: 250, p: 2, bgcolor: "white" }}>
                                                                <Typography sx={{ mb: 1, color: "black", fontSize: 15 }}>
                                                                    Do you want to submit this for condemnation by removing it from the scrap store?
                                                                </Typography>
                                                                <Box sx={{ display: "flex", justifyContent: "right", mt: 1, gap: 1 }}>
                                                                    <Button variant="outlined" color="neutral" onClick={() => RemoveFromScrapStore(index, val)}>
                                                                        Yes
                                                                    </Button>
                                                                    <Button variant="outlined" color="neutral" onClick={handleCloseUncheck}>
                                                                        No
                                                                    </Button>
                                                                </Box>
                                                            </Box>
                                                        </Popover>

                                                    </Box>

                                                </Box>
                                                <Box sx={{ width: 120, fontWeight: 600, color: '#444444', fontSize: 14 }}>
                                                    {val.spare_asset_no
                                                        ? `${val.spare_asset_no}/${val.spare_asset_no_only.toString().padStart(6, '0')}`
                                                        : `${val.item_asset_no}/${val.item_asset_no_only.toString().padStart(6, '0')}`}
                                                </Box>
                                                <Box sx={{ width: 160, fontWeight: 600, color: '#444444', fontSize: 14, pl: 1 }}>
                                                    {
                                                        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(billamount)

                                                    }

                                                </Box>
                                                <Box sx={{ width: 100, fontWeight: 600, color: '#444444', fontSize: 14 }}>{val.asset_complaint_slno ?
                                                    val.asset_complaint_slno : val.spare_complaint_slno ? val.spare_complaint_slno : ''}</Box>
                                                <Box sx={{ flex: 2, fontWeight: 600, color: '#444444', fontSize: 14, pl: 1 }}>
                                                    {val.asset_condm_transf_remarks ?
                                                        val.asset_condm_transf_remarks : val.spare_condm_transf_remarks ? val.spare_condm_transf_remarks : ''}
                                                </Box>
                                                <Box sx={{ width: 60, fontWeight: 600, color: '#444444', fontSize: 14, pl: 1 }}>
                                                    <MoreIcon sx={{ cursor: 'pointer', color: '#41729F' }} />
                                                </Box>
                                                <Box sx={{ width: 50, fontWeight: 600, color: '#444444', fontSize: 14, pl: 1 }}>
                                                    <AddCircleIcon sx={{ cursor: 'pointer', color: '#A45C40' }}
                                                        onClick={() => AddDetailsModal(val)} />
                                                </Box>
                                            </Box>)
                                        })}
                                    </Box>
                                </Box>
                            </Box>

                        </Box>
                        {(CondemData?.some(item => item.am_condem_reason !== null) || addedCondemFiles.length > 0) && (
                            <Box sx={{ flex: 1, border: 1, borderColor: 'lightgray', mx: 1, mt: 1, pb: 0.5 }}>
                                <TextComponent
                                    text={"Item Details and Attachments"}
                                    sx={{ fontWeight: 500, color: '#6A5546', pl: 0.8, pt: 0.5, fontSize: 15 }}
                                />
                                {CondemData?.filter(val => val.am_condem_reason !== null || (addedCondemFiles[val.am_condem_detail_slno]?.length > 0))
                                    .map((val, index) => (
                                        <Box
                                            key={index}
                                            sx={{ flex: 1, mx: 0.5, border: 1, borderColor: 'lightgray', mt: 0.5, p: 0.5 }}
                                        >
                                            {val.keep_inscarp_status === 1 ?

                                                <Box sx={{ flex: 1, display: 'flex', bgcolor: '#F7F9A7', pl: .5 }}>
                                                    <DirectionsIcon sx={{ color: 'black', }} />
                                                    <Box sx={{ fontWeight: 600, pl: .5, color: 'black' }}>
                                                        Keeped In Department Scrap Store :
                                                    </Box>

                                                    <Box sx={{ pl: 1, fontWeight: 600, fontsize: 12, color: 'black' }}>
                                                        {val.keep_in_srap_store_reason}
                                                    </Box>
                                                </Box>
                                                : null}
                                            <Box sx={{ flex: 1, display: 'flex' }}>
                                                <TextComponent
                                                    text={
                                                        val.spare_asset_no
                                                            ? `${val.spare_asset_no}/${val.spare_asset_no_only.toString().padStart(6, '0')}`
                                                            : `${val.item_asset_no}/${val.item_asset_no_only.toString().padStart(6, '0')}`
                                                    }
                                                    sx={{ fontWeight: 500, color: '#0C2D48', pl: 0.8, pt: 0.5, fontSize: 14 }}
                                                />
                                                <TextComponent
                                                    text={`(${val.cat_asset_name !== null ? val.cat_asset_name : val.cat_spare_name !== null ? val.cat_spare_name : ''})`}
                                                    sx={{ fontWeight: 500, color: '#0C2D48', pl: 0.8, pt: 0.5, fontSize: 14 }}
                                                />
                                                <TextComponent
                                                    text={val.item_asset_name !== null ? val.item_asset_name : val.item_spare_name !== null ? val.item_spare_name : ''}
                                                    sx={{ fontWeight: 500, color: '#0C2D48', pl: 0.8, pt: 0.5, fontSize: 14 }}
                                                />
                                            </Box>
                                            <Box sx={{ flex: 1, display: 'flex' }}>
                                                <TextComponent
                                                    text={"Reason :"}
                                                    sx={{ fontWeight: 500, color: 'black', pl: 0.8, pt: 0.5, fontSize: 14 }}
                                                />
                                                <TextComponent
                                                    text={val.am_condem_reason || null}
                                                    sx={{ color: 'black', pl: 0.8, pt: 0.5, fontSize: 14 }}
                                                />
                                            </Box>
                                            <Box sx={{ flex: 1, mr: 1, my: 0.5, ml: 0.5 }}>
                                                {imageShowsingleFlag === 1 && (
                                                    <Box>
                                                        <FileViewSingle previewFile={uploadedFile} imageShow={imageShowSingle} CloseFile={CloseSingleFile} />
                                                    </Box>
                                                )}
                                                {addedCondemFiles[val.am_condem_detail_slno]?.length > 0 && (
                                                    <Grid container spacing={0.5}>
                                                        {addedCondemFiles[val.am_condem_detail_slno].map((url, fileIndex) => {
                                                            if (!url || typeof url !== "string") return null;
                                                            const isPdf = url.toLowerCase().endsWith(".pdf");
                                                            const isImage = /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url);

                                                            return (
                                                                <Box key={fileIndex} sx={{ display: "flex" }}>
                                                                    {isImage ? (
                                                                        <Box sx={{ display: "flex", border: 0.5, borderColor: "#E0E1E3", mr: 0.5 }}>
                                                                            <Box sx={{ p: 0.5 }}>
                                                                                <img
                                                                                    src={url}
                                                                                    alt={`Complaint file ${fileIndex}`}
                                                                                    style={{
                                                                                        width: 48,
                                                                                        height: 48,
                                                                                        color: "#e53935",
                                                                                        cursor: "pointer",
                                                                                    }}
                                                                                    onClick={() => SingleView({ url })}
                                                                                />
                                                                            </Box>
                                                                            <Box
                                                                                sx={{
                                                                                    fontSize: 12,
                                                                                    color: "#333",
                                                                                    overflow: "hidden",
                                                                                    textOverflow: "ellipsis",
                                                                                    whiteSpace: "nowrap",
                                                                                    width: 90,
                                                                                    pt: 2,
                                                                                }}
                                                                            >
                                                                                {url.split("/").pop() || "N/A"}
                                                                            </Box>
                                                                        </Box>
                                                                    ) : isPdf ? (
                                                                        <Box sx={{ display: "flex", border: 0.5, borderColor: "#E0E1E3", mr: 0.5 }}>
                                                                            <PictureAsPdfIcon
                                                                                sx={{
                                                                                    width: 48,
                                                                                    height: 48,
                                                                                    color: "#e53935",
                                                                                    cursor: "pointer",
                                                                                    mt: 0.5,
                                                                                }}
                                                                                onClick={() => SingleView({ url })}
                                                                            />
                                                                            <Box
                                                                                sx={{
                                                                                    fontSize: 12,
                                                                                    color: "#333",
                                                                                    overflow: "hidden",
                                                                                    textOverflow: "ellipsis",
                                                                                    whiteSpace: "nowrap",
                                                                                    width: 90,
                                                                                    pt: 2,
                                                                                }}
                                                                            >
                                                                                {url.split("/").pop() || "N/A"}
                                                                            </Box>
                                                                        </Box>
                                                                    ) : (
                                                                        <InsertDriveFileIcon
                                                                            sx={{
                                                                                width: 50,
                                                                                height: 50,
                                                                                color: "#e53935",
                                                                                cursor: "pointer",
                                                                            }}
                                                                            onClick={() => SingleView({ url })}
                                                                        />
                                                                    )}
                                                                </Box>
                                                            );
                                                        })}
                                                    </Grid>
                                                )}
                                            </Box>
                                        </Box>
                                    ))}
                            </Box>
                        )}
                        <Box sx={{ flex: 1, border: 1, borderColor: 'lightgray', mx: 1, mt: 1, pb: 0.5 }}>
                            <TextComponent
                                text={"Verification and Approvals"}
                                sx={{ fontWeight: 500, color: '#003060', pl: 1.5, py: 1, fontSize: 15 }}
                            />
                            <Table stickyHeader size='sm'
                                sx={{ my: 1, ml: 1, width: '99%' }} borderAxis='both'  >
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: 'center', width: 10 }}>
                                            Approval Panels
                                        </th>
                                        <th style={{ textAlign: 'center', width: 15 }}>
                                            Name
                                        </th>
                                        <th style={{ textAlign: 'center', width: 10 }}>
                                            Status
                                        </th>
                                        <th style={{ textAlign: 'center', width: 30 }}>
                                            Remarks
                                        </th>
                                        <th style={{ textAlign: 'center', width: 10 }}>
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td style={{ textAlign: 'center', }}>
                                            {"Incharge"}
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            {hod_apprv_date || '-'}
                                        </td>
                                        <td style={{ textAlign: 'center', color: incharge_approve_status === 1 ? "green" : incharge_approve_status === 2 ? "red" : 'black' }}>
                                            {incharge_approve_status === 1 ? "Approved" : incharge_approve_status === 2 ? 'Rejected' : '-'}
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            {incharge_remarks || '-'}
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            {inch_apprv_date || '-'}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center', }}>
                                            {"Hod"}
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            {hod_apprv_date || '-'}
                                        </td>
                                        <td style={{ textAlign: 'center', color: hod_approve_status === 1 ? "green" : hod_approve_status === 2 ? "red" : 'black' }}>
                                            {hod_approve_status === 1 ? "Approved" : hod_approve_status === 2 ? 'Rejected' : '-'}
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            {hod_remarks || '-'}
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            {hod_apprv_date || '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'center', }}>
                                            {"GM Operations"}
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            {hod_apprv_date || '-'}
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            {gm_approve_status === 1 ? "Approved" : hod_approve_status === 2 ? 'Rejected' : '-'}
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            {hod_remarks || '-'}
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            {hod_apprv_date || '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'center', }}>
                                            {"Accounts"}
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            {hod_apprv_date || '-'}
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            {gm_approve_status === 1 ? "Approved" : hod_approve_status === 2 ? 'Rejected' : '-'}
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            {hod_remarks || '-'}
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            {hod_apprv_date || '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'center', }}>
                                            {"General Store"}
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            {hod_apprv_date || '-'}
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            {gm_approve_status === 1 ? "Approved" : hod_approve_status === 2 ? 'Rejected' : '-'}
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            {hod_remarks || '-'}
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            {hod_apprv_date || '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'center', }}>
                                            {"Materials Management Manager"}
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            {hod_apprv_date || '-'}
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            {gm_approve_status === 1 ? "Approved" : hod_approve_status === 2 ? 'Rejected' : '-'}
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            {hod_remarks || '-'}
                                        </td>
                                        <td style={{ textAlign: 'center', }}>
                                            {hod_apprv_date || '-'}
                                        </td>
                                    </tr>

                                </tbody>

                            </Table>



                        </Box>
                        <Box sx={{ m: 1, pt: 1, pl: 1 }}>
                            <Box sx={{ flex: 1, display: 'flex' }} >
                                <Checkbox variant="soft" defaultChecked size="lg" readOnly />
                                <TextComponent
                                    sx={{ color: '#0C4160', fontWeight: 500, pl: 1 }}
                                    text={"Incharge Approval"}
                                />
                            </Box>
                            <Textarea
                                sx={{ mt: 1 }}
                                minRows={2}
                                placeholder="Enter your remarks..."
                                variant="outlined"
                                value={inchremarks}
                                name='inchremarks'
                                onChange={handleInchChange}
                            />
                            <Box sx={{ flex: 1, display: 'flex', gap: 1, pt: 1, pb: 5 }} >
                                <Button
                                    size='sm'
                                    variant='outlined'
                                    color="success"
                                    startDecorator={<ThumbUpIcon />}
                                    onClick={InChargeApproval}
                                >
                                    Approve
                                </Button>
                                <Button
                                    size='sm'
                                    variant="outlined"
                                    color="danger"
                                    startDecorator={<ThumbDownIcon />}
                                    onClick={InChargeRejected}
                                >
                                    Reject
                                </Button>
                            </Box>
                        </Box>

                        <Box sx={{ m: 1, pt: 1, pl: 1 }}>
                            <Box sx={{ flex: 1, display: 'flex' }} >
                                <Checkbox variant="soft" defaultChecked size="lg" readOnly />
                                <TextComponent
                                    sx={{ color: '#0C4160', fontWeight: 500, pl: 1 }}
                                    text={"Hod Approval"}
                                />
                            </Box>
                            <Textarea
                                sx={{ mt: 1 }}
                                minRows={2}
                                placeholder="Enter your remarks..."
                                variant="outlined"
                                value={hodRemarks}
                                name='hodRemarks'
                                onChange={handleHodChange}
                            />
                            <Box sx={{ flex: 1, display: 'flex', gap: 1, pt: 1, pb: 5 }} >
                                <Button
                                    size='sm'
                                    variant='outlined'
                                    color="success"
                                    startDecorator={<ThumbUpIcon />}
                                    onClick={HodApproval}
                                >
                                    Approve
                                </Button>
                                <Button
                                    size='sm'
                                    variant="outlined"
                                    color="danger"
                                    startDecorator={<ThumbDownIcon />}
                                    onClick={HodRejected}
                                >
                                    Reject
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal >
        </CssVarsProvider >
    )
}
export default memo(CondemnationApprovalModal)