import React, { Fragment, memo, Suspense, useCallback, useState } from 'react'
import { Box, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import { format } from 'date-fns'
import { ToastContainer } from 'react-toastify'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ReqImageDisModal from './ImageUploadCmp/ReqImageDisModal'
import CustomLoadComp from './Components/CustomLoadComp'
const CrfReqDetailViewCmp = ({ ApprovalData, imagearray }) => {

    const { req_slno, req_date, actual_requirement, needed, expected_date, image_status, company_name, } = ApprovalData
    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imageshow, setImageShow] = useState(false)
    const [previewFile, setPreviewFile] = useState({ url: "", type: "" });

    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])
    const fileLIst = imagearray?.filter(file => {
        const lowerCaseName = file.imageName.toLowerCase();
        return (
            lowerCaseName.endsWith(".png") ||
            lowerCaseName.endsWith(".jpg") ||
            lowerCaseName.endsWith(".jpeg") ||
            lowerCaseName.endsWith(".pdf") ||
            lowerCaseName.endsWith(".jfif")
        );
    });
    const ViewImage = useCallback((file) => {
        const fileType = file.imageName
            ? file.imageName.toLowerCase().endsWith(".pdf")
                ? "pdf"
                : "image"
            : file.type.includes("application/pdf")
                ? "pdf"
                : "image";

        const fileUrl = file.url || URL.createObjectURL(file);
        setPreviewFile({ url: fileUrl, type: fileType });
        setImageShow(true);
        setImageShowFlag(1);
    }, []);

    const capitalizeWords = (str) =>
        str
            ? str
                .toLowerCase()
                .trim()
                .replace(/\s+/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
            : '';
    return (
        <Fragment>
            <ToastContainer />
            <Suspense fallback={<CustomLoadComp />}>
                {imageshowFlag === 1 ? <ReqImageDisModal open={imageshow} handleClose={handleClose}
                    previewFile={previewFile} /> : null}</Suspense>

            {/* <Box sx={{ mx: 0.5 }}>
                <Typography sx={{ fontWeight: 550, fontSize: 17, color: '#607d8b', fontFamily: 'system-ui', pl: 0.5 }}>
                    CRF Details</Typography>
            </Box> */}
            {ApprovalData.length !== 0 ?
                <Paper variant="outlined" sx={{ flexWrap: 'wrap', mx: 0.6 }}>
                    <Box sx={{ padding: 1, borderRadius: 2, }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 0.5, color: '#145DA0', fontSize: 14 }}>
                            {`CRF/${company_name}/${req_slno}`}
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ display: 'flex', pt: 0.4, flex: 1 }}>
                                <Typography sx={{ fontSize: 14, fontWeight: 600, flex: 0.47 }}>Req.Date</Typography>
                                <Typography sx={{ pl: 0.5 }} >  :&nbsp;</Typography>
                                <Box sx={{ pl: 0.3, pt: 0.3, flex: 1 }}>
                                    <Typography sx={{ fontSize: 13 }}>{format(new Date(req_date), 'dd-MM-yyyy hh:mm a')}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', pt: 0.4, flex: 0.5 }}>
                                <Typography sx={{ fontSize: 14, fontWeight: 600, pt: 0.2 }}>Expected Date</Typography>
                                <Typography sx={{ pl: 1 }} >  :&nbsp;</Typography>
                                <Box sx={{ pl: 0.5, pt: 0.4 }} >
                                    <Typography sx={{ fontSize: 13 }}>{format(new Date(expected_date), 'dd-MM-yyyy')}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flex: 2 }}></Box>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600, flex: 0.2, pt: 1 }}>Purpose</Typography>
                            <Typography sx={{ pt: 0.7 }}>  :&nbsp;</Typography>
                            <Box sx={{ pt: 0.5, flex: 2, pl: 0.3 }}>
                                <Typography sx={{ fontSize: 13, pt: 0.5, pr: 1 }}>{actual_requirement === null ? 'nil' : capitalizeWords(actual_requirement)}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 1 }}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600, flex: 0.2, pt: 1 }}>Justfication</Typography>
                            <Typography sx={{ pt: 0.7 }}>  :&nbsp;</Typography>
                            <Box sx={{ pt: 0.5, flex: 2, pl: 0.3 }}>
                                <Typography sx={{ fontSize: 13, pt: 0.5, pr: 1 }}>{needed === null ? 'nil' : capitalizeWords(needed)}</Typography>
                            </Box>
                        </Box>
                        {image_status === 1 && fileLIst.length > 0 ?
                            <Paper variant='outlined' square sx={{ display: "flex", flexWrap: "wrap", gap: 0.2, width: "100%", p: 0.5 }}>
                                {fileLIst.length > 0 &&
                                    fileLIst?.map((file, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                m: 0.3,
                                                border: "1px solid #e0e0e0",
                                                borderRadius: "4px",
                                                p: 0.5,
                                            }}

                                        >
                                            {file.imageName.endsWith(".png") || file.imageName.endsWith(".jpg") || file.imageName.endsWith(".jpeg") ? (
                                                <img
                                                    src={file.url}
                                                    alt={file.imageName}
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

                                            ) : file.imageName.endsWith(".pdf") ? (
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
                                            ) :
                                                (
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
                                            <Box sx={{ fontSize: 14, cursor: "pointer", flexGrow: 1, pr: 0.5 }}>{file.imageName}</Box>
                                        </Box>
                                    ))
                                }
                            </Paper>
                            : null
                        }
                    </Box>
                </Paper>
                : null}
        </Fragment >
    )
}

export default memo(CrfReqDetailViewCmp)