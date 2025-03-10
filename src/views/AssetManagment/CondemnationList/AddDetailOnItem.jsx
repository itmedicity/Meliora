import { Box, Button, Grid, Input, Modal, ModalDialog, Textarea } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import TextComponent from 'src/views/Components/TextComponent'
import CancelIcon from '@mui/icons-material/Cancel';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import imageCompression from 'browser-image-compression';
import FileViewSingle from 'src/views/Components/FileViewSingle'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import { axioslogin } from 'src/views/Axios/Axios';
import { getCondemSlno } from 'src/api/AssetApis';
import { useQuery } from 'react-query';

const AddDetailOnItem = ({ addModalOpen, setaddModalFlag, setaddModalOpen, itemDetails, empId, condemMastslno, count, setcount, setcondemCount,
    condemCount }) => {

    const { category_name, item_name, item_asset_no, item_asset_no_only, spare_asset_no, spare_asset_no_only, am_item_map_slno, am_spare_item_map_slno,
        am_condem_reason } = itemDetails

    const [selectFile, setSelectFile] = useState([])
    const [previewFile, setPreviewFile] = useState({ url: "", type: "" });
    const [imageViewFlag, setimageViewFlag] = useState(0)
    const [imageViewSingle, setimageViewSingle] = useState(false)
    const [condemReason, setCondemReason] = useState(am_condem_reason || "")
    const [amCondemDetailSlno, setAmCondemDetailSlno] = useState(null);

    const postCondemMast = useMemo(() => {
        return {
            condemMastslno,
            am_item_map_slno: am_item_map_slno !== undefined ? am_item_map_slno : null,
            am_spare_item_map_slno: am_spare_item_map_slno !== undefined ? am_spare_item_map_slno : null
        }
    }, [condemMastslno, am_item_map_slno, am_spare_item_map_slno])

    const { data: CondemSlno } = useQuery({
        queryKey: ['getCondemSlnoData'],
        queryFn: () => getCondemSlno(postCondemMast),
        enabled: condemMastslno !== undefined,
    })

    useEffect(() => {
        if (CondemSlno?.length > 0) {
            const [{ am_condem_detail_slno }] = CondemSlno;
            setAmCondemDetailSlno(am_condem_detail_slno);
        } else {
        }
    }, [CondemSlno]);

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
        setimageViewSingle(true)
        setimageViewFlag(1)
    }, [])

    const CloseImage = useCallback(() => {
        setimageViewSingle(false)
        setimageViewFlag(0)
    }, [])

    const CloseAddModal = useCallback(() => {
        setaddModalOpen(false)
        setaddModalFlag(0)
    }, [setaddModalFlag, setaddModalOpen])

    const handleFileChange = useCallback((e) => {
        const newFiles = [...selectFile]
        newFiles.push(e.target.files[0])
        setSelectFile(newFiles)
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
            updatedFiles.splice(index, 1);
            return updatedFiles;
        });
    };

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

    const ChangeCondemReason = (event) => {
        setCondemReason(event.target.value);
    };


    const patchdata = useMemo(() => {
        return {
            condem_mast_slno: condemMastslno,
            edit_user: empId,
            am_asset_item_slno: am_item_map_slno === undefined ? null : am_item_map_slno,
            am_spare_item_slno: am_spare_item_map_slno === undefined ? null : am_spare_item_map_slno,
            am_condem_reason: condemReason
        }
    }, [condemMastslno, empId, am_item_map_slno, am_spare_item_map_slno, condemReason])


    const AddDetails = useCallback(
        async (e) => {
            e.preventDefault();
            const UpdateItemDetail = async (patchdata) => {
                const result = await axioslogin.patch('/AssetCondemnation/UpdateItemDetails', patchdata);
                return result.data;
            };
            const InsertFile = async (selectFile, condemMastslno, amCondemDetailSlno) => {
                try {
                    const formData = new FormData();
                    formData.append('id', condemMastslno);
                    formData.append('detailId', amCondemDetailSlno);

                    for (const file of selectFile) {
                        if (file.type.startsWith('image')) {
                            const compressedFile = await handleImageUpload(file);
                            formData.append('files', compressedFile, compressedFile.name);
                        } else {
                            formData.append('files', file, file.name);
                        }
                    }

                    const uploadResult = await axioslogin.post('/AssetFileUpload/uploadFile/uploadCondemnation', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    return uploadResult.data;
                } catch (error) {
                    warningNotify('An error occurred during file upload.');
                }
            };
            const condemDataUpdate = await UpdateItemDetail(patchdata);
            if (condemDataUpdate.success === 2) {
                if (selectFile.length !== 0) {
                    const fileUploadResponse = await InsertFile(selectFile, condemMastslno, amCondemDetailSlno);
                    if (fileUploadResponse.success === 1) {
                        setcondemCount = (condemCount + 1)
                        succesNotify('Details Added With File Attach Successfully');
                        setcount(count + 1)
                        CloseAddModal()
                    } else {
                        warningNotify(fileUploadResponse.message);
                    }
                } else {
                    setcondemCount = (condemCount + 1)
                    succesNotify('Details Added Successfully');
                    setcount(count + 1)
                    CloseAddModal()
                }
            } else {
                infoNotify('Unable to Add Details');
            }
        },
        [patchdata, selectFile, setcondemCount, condemCount]);

    return (

        <Box>
            {imageViewFlag === 1 ? <FileViewSingle imageShow={imageViewSingle} CloseFile={CloseImage}
                previewFile={previewFile} /> : null}
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={addModalOpen}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
                <ModalDialog variant="outlined" sx={{ width: '40vw', p: 0, overflow: 'auto', }}>
                    <Box sx={{ border: .1, borderColor: '#E8E6E5', m: 1, height: '100%' }}>
                        <Box sx={{ flex: 1, display: 'flex', ml: 1 }}>
                            <Box sx={{ flex: 1 }}>
                                <TextComponent
                                    text={"Add Item Condemnation Details"}
                                    sx={{ fontWeight: 600, color: '#6A5546', pl: .8, pt: 1, fontSize: 18 }}
                                />
                                <TextComponent
                                    text={"Information Technpology"}
                                    sx={{ fontWeight: 500, color: 'black', pl: .8, fontSize: 13 }}
                                />
                            </Box>
                            <Box sx={{ pr: 1, pt: 1, }}>
                                <CancelIcon sx={{ width: 30, height: 30, color: '#6A5546', cursor: 'pointer' }}
                                    onClick={CloseAddModal}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ border: .1, borderColor: '#E8E6E5', m: 1, }}>
                            <Box sx={{ flex: 1, display: 'flex' }}>
                                <TextComponent
                                    text={"Item No."}
                                    sx={{ fontWeight: 500, color: 'black', pl: .8, pt: 1, fontSize: 14, width: 90 }}
                                />
                                <TextComponent
                                    text={spare_asset_no
                                        ? `${spare_asset_no}/${spare_asset_no_only.toString().padStart(6, '0')}`
                                        : `${item_asset_no}/${item_asset_no_only.toString().padStart(6, '0')}`}
                                    sx={{ fontWeight: 500, color: 'black', pl: 1, pt: 1, fontSize: 14 }}
                                />
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex' }}>
                                <TextComponent
                                    text={"Category"}
                                    sx={{ fontWeight: 500, color: 'black', pl: .8, fontSize: 14, width: 90 }}
                                />

                                <TextComponent
                                    text={category_name}
                                    sx={{ fontWeight: 500, color: 'black', pl: 1, fontSize: 14 }}
                                />
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', pb: .5 }}>
                                <TextComponent
                                    text={"Item Name"}
                                    sx={{ fontWeight: 500, color: 'black', pl: .8, fontSize: 14, width: 90 }}
                                />

                                <TextComponent
                                    text={item_name}
                                    sx={{ fontWeight: 500, color: 'black', pl: 1, fontSize: 14 }}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, p: 1 }}>
                            <TextComponent

                                text={"Reason"}
                                sx={{ fontWeight: 500, color: 'black', pl: .8, fontSize: 14, width: 90 }}
                            />

                            <Textarea minRows={5}
                                placeholder='type here...'
                                value={condemReason}
                                name='condemReason'
                                onChange={ChangeCondemReason}
                            />
                        </Box>

                        <Box sx={{ flex: 1, px: 1 }}>
                            <Box sx={{
                                border: 1, height: 70, borderStyle: 'dashed', borderRadius: 2, borderColor: '#B4BCC3', display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center', bgcolor: '#F6F8FA'
                            }}>
                                <Box sx={{}}>
                                    <label htmlFor="file-input">
                                        <AttachmentIcon sx={{ color: '#617EAA', cursor: 'pointer' }} />
                                        <TextComponent
                                            text={"Attach File"}
                                            sx={{ fontWeight: 500, color: '#617EAA', pl: .8, fontSize: 14, width: 90, cursor: 'pointer' }}
                                        />
                                    </label>
                                    <Input
                                        id="file-input"
                                        type="file"
                                        accept=".jpg, .jpeg, .png, .pdf"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                </Box>
                            </Box>

                        </Box>

                        {selectFile.length !== 0 ?
                            <Box sx={{ display: 'flex', flex: 1, border: 1, borderColor: 'lightgrey', mx: 1, p: 1, my: .5 }}>
                                <Grid container spacing={1}>
                                    {selectFile.length !== 0 &&
                                        selectFile.map((file, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    border: "1px solid #e0e0e0",
                                                    borderRadius: "4px",
                                                    p: 0.5, mr: .5, mb: .5
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
                                        ))}
                                </Grid>
                            </Box> : null}
                        <Box sx={{ flex: 1, textAlign: 'right', py: 1, m: 1, }}>
                            <Button
                                variant='outlined'
                                sx={buttonStyle}
                                onClick={AddDetails}
                            >Add</Button>
                            <Button
                                variant='outlined'
                                sx={buttonStyle}
                                onClick={CloseAddModal}
                            >Cancel</Button>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box>

    )
}

export default memo(AddDetailOnItem)