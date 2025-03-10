import { Box, Button, Checkbox, CssVarsProvider, Grid, Modal, ModalDialog, Textarea, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { getCondemAddedDetails, getItemUnderForm } from 'src/api/AssetApis'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import TextComponent from 'src/views/Components/TextComponent'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import AddDetailOnItem from './AddDetailOnItem'
import MoreIcon from '@mui/icons-material/More';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { Popover } from '@mui/material'
import FileViewSingle from 'src/views/Components/FileViewSingle'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DirectionsIcon from '@mui/icons-material/Directions';

const EditCondemSubmitionModal = ({ modalEditOpen, setmodalEditOpen, setmodalEditFlag, empId, formDetails, empdept, setformCount, formCount }) => {

    const { condem_mast_slno, condem_form_prefix, condem_form_no, reg_date, } = formDetails
    const [condemCount, setcondemCount] = useState(0)

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
        setmodalEditOpen(false)
        setmodalEditFlag(0)
    }, [setmodalEditOpen, setmodalEditFlag])

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

    const patchdata = useMemo(() => {
        return {
            condem_mast_slno: condem_mast_slno,
            reg_date: reqRegDate,
            condem_form_prefix: formPrefix,
            condem_form_no: formNumber,
            edit_user: empId,
            condem_status: 1,
            req_dept: empdept
        }
    }, [condem_mast_slno, formNumber, reqRegDate, condem_mast_slno, empId, formPrefix, empdept])


    const submitForm = useCallback(
        (e) => {
            e.preventDefault()
            const FormUpdate = async (patchdata) => {
                const result = await axioslogin.patch('/AssetCondemnation/updateCondemMasterData', patchdata)
                const { message, success } = result.data
                if (success === 2) {
                    succesNotify(message)
                    setformCount(formCount + 1)
                    CloseModal()
                } else {
                    infoNotify(message)
                }
            }
            if (formNumber !== null && formPrefix !== null) {
                FormUpdate(patchdata)
            }
            else {
                infoNotify("Enter From Number")
            }
        },
        [patchdata])


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
                open={modalEditOpen}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
                <ModalDialog variant="outlined" sx={{ width: '95vw', p: 0, overflow: 'auto', }}>
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
                                                        Keeped In Scrap Store :
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
                        <Box sx={{
                            bottom: 0,
                            left: 0,
                            textAlign: 'right',
                            py: 1,
                            mr: 2,
                            backgroundColor: 'white',
                        }}>
                            <Button
                                variant='outlined'
                                sx={buttonStyle}
                                onClick={submitForm}
                            >Submit</Button>
                            <Button
                                variant='outlined'
                                sx={buttonStyle}
                                onClick={CloseModal}
                            >Cancel</Button>
                        </Box>
                    </Box>

                </ModalDialog>
            </Modal >
        </CssVarsProvider >
    )
}

export default memo(EditCondemSubmitionModal)