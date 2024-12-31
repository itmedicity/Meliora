import { Box, Chip, CssVarsProvider, Grid, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import { format } from 'date-fns'
import React, { Fragment, memo, useCallback, useState } from 'react'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CrfReqDetailCmpnt from '../Components/CrfReqDetailCmpnt'
import CommonEdapprvCmp from '../../ComonComponent/ApprovalComp/CommonEdapprvCmp'
import CommonMdApprvCmp from '../../ComonComponent/ApprovalComp/CommonMdApprvCmp'
import CommonGmapprvCmp from '../../ComonComponent/ApprovalComp/CommonGmapprvCmp'
import CommonSmoApprvCmp from '../../ComonComponent/ApprovalComp/CommonSmoApprvCmp'
import CommonMoApprvlCmp from '../../ComonComponent/ApprovalComp/CommonMoApprvlCmp'
import CommonMsApprvCmp from '../../ComonComponent/ApprovalComp/CommonMsApprvCmp'
import CommonDmsApprvCmp from '../../ComonComponent/ApprovalComp/CommonDmsApprvCmp'
import CommonHodApprvCmp from '../../ComonComponent/ApprovalComp/CommonHodApprvCmp'
import CommonInchargeReqCmp from '../../ComonComponent/ApprovalComp/CommonInchargeReqCmp'
import ReqItemDisplay from '../../ComonComponent/ReqItemDisplay'
import ApprovedItemListDis from '../../ComonComponent/ApprovedItemListDis'
import PoAcknowComp from '../../ComonComponent/PurchaseComp/PoAcknowComp'
import QuotationCallComp from '../../ComonComponent/PurchaseComp/QuotationCallComp'
import QuotationNegoComp from '../../ComonComponent/PurchaseComp/QuotationNegoComp'
import QuotationFinalComp from '../../ComonComponent/PurchaseComp/QuotationFinalComp'
import ReqImageDisModal from '../../ComonComponent/ImageUploadCmp/ReqImageDisModal'

const CRFApprovalView = ({ modalData, handleClose, open, imagearray, poDetails, reqItems, approveTableData }) => {

    const { req_slno, incharge_req, incharge_approve, incharge_remarks, hod_req, hod_approve, dms_req, dms_approve,
        ms_approve_req, ms_approve, manag_operation_req, manag_operation_approv, senior_manage_req, senior_manage_approv,
        gm_approve_req, gm_approve, md_approve_req, md_approve, ed_approve_req, ed_approve, image_status, ack_status,
        quatation_calling_status, quatation_negotiation, quatation_fixing, sub_store_name, po_complete,
        po_complete_date, pocomplete_user, po_to_supplier, po_to_supplier_date, store_recieve, sub_store_recieve,
        crf_close, crf_close_remark, crf_closed_one, close_date, closed_user, crs_user, store_user,
        store_receive_date, substore_ack_date
    } = modalData

    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imageshow, setImageShow] = useState(false)
    const [previewFile, setPreviewFile] = useState({ url: "", type: "" });

    const fileLIst = imagearray?.filter(file => {
        return (
            file.imageName.endsWith(".png") ||
            file.imageName.endsWith(".jpg") ||
            file.imageName.endsWith(".jpeg") ||
            file.imageName.endsWith(".pdf") ||
            file.imageName.endsWith(".jfif")
        );
    });
    const ViewImage = useCallback((file) => {
        const fileType = file.imageName
            ? file.imageName.endsWith(".pdf")
                ? "pdf"
                : "image"
            : file.type.includes("application/pdf")
                ? "pdf"
                : "image";

        const fileUrl = file.url || URL.createObjectURL(file);
        setPreviewFile({ url: fileUrl, type: fileType });
        setImageShow(true)
        setImageShowFlag(1)
    }, [])

    const handleCloseImage = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])

    const capitalizeWords = (str) =>
        str ? str
            .toLowerCase()
            .trim()
            .replace(/\s+/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
            : '';
    return (
        <Fragment>
            {imageshowFlag === 1 ?
                <ReqImageDisModal open={imageshow} handleClose={handleCloseImage} previewFile={previewFile} /> : null}
            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    onClose={handleClose}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <ModalDialog
                        variant="outlined"
                    >
                        <ModalClose
                            variant="outlined"
                            sx={{
                                m: 1,
                                top: 'calc(-1/4 * var(--IconButton-size))',
                                right: 'calc(-1/4 * var(--IconButton-size))',
                                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                borderRadius: '50%',
                                bgcolor: 'background.body',
                                color: '#bf360c',
                                height: 35, width: 35
                            }}
                        />
                        <Box sx={{ minWidth: '75vw', minHeight: '45vh', maxHeight: '85vh', overflowY: 'auto', px: 0.5 }}>
                            <Box sx={{ mx: 0.5, }}>
                                <Typography sx={{ fontWeight: 550, fontSize: 16, fontFamily: 'system-ui' }}>
                                    CRF/TMC/{req_slno}</Typography>
                            </Box>
                            {reqItems.length !== 0 ?
                                <ReqItemDisplay reqItems={reqItems} />
                                : null
                                // <Box sx={{
                                //     display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5, color: 'grey'
                                // }}>
                                //     No Item Requested
                                // </Box>
                            }
                            {image_status === 1 ?
                                <Paper variant='outlined' square sx={{ display: "flex", flexWrap: "wrap", m: 0.5, }}>
                                    {fileLIst.length > 0 &&
                                        fileLIst?.map((file, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    m: 0.5,
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
                                                <Box sx={{ fontSize: 14, cursor: "pointer", flexGrow: 1 }}>{file.imageName}</Box>
                                            </Box>
                                        ))
                                    }
                                </Paper>
                                : null
                            }
                            {approveTableData.length !== 0 && (incharge_approve === 1 || hod_approve === 1) ?
                                <Box sx={{ mt: 0.3 }}>
                                    <ApprovedItemListDis approveTableData={approveTableData} />
                                </Box>
                                : null
                                // <Box sx={{
                                //     display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                                //     pt: 10, color: 'grey'
                                // }}>
                                //     No items Approved
                                // </Box>
                            }

                            {(hod_approve !== null || incharge_approve !== null) ?
                                <>
                                    <>
                                        <Typography sx={{ fontWeight: 'bold', m: 1, color: '#145DA0', fontSize: 14 }}>
                                            Approved Details
                                        </Typography>
                                        <Paper variant="outlined" square sx={{ flexWrap: 'wrap', py: 0.5, pr: 0.5 }}>
                                            <Grid container spacing={0.5} sx={{ flexGrow: 1, }}>
                                                {incharge_req === 1 && incharge_remarks !== null ?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                        <CommonInchargeReqCmp DetailViewData={modalData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {hod_req === 1 && hod_approve !== null ?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                        <CommonHodApprvCmp DetailViewData={modalData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {dms_req === 1 && dms_approve !== null ?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                        <CommonDmsApprvCmp DetailViewData={modalData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {ms_approve_req === 1 && ms_approve !== null ?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                        <CommonMsApprvCmp DetailViewData={modalData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {manag_operation_req === 1 && manag_operation_approv !== null ?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                        <CommonMoApprvlCmp DetailViewData={modalData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {senior_manage_req === 1 && senior_manage_approv !== null ?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                        <CommonSmoApprvCmp DetailViewData={modalData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {gm_approve_req === 1 && gm_approve !== null ?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                        <CommonGmapprvCmp DetailViewData={modalData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {md_approve_req === 1 && md_approve !== null ?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                        <CommonMdApprvCmp DetailViewData={modalData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {ed_approve_req === 1 && ed_approve !== null ?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                        <CommonEdapprvCmp DetailViewData={modalData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {crf_close === 1 ?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                        <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap', height: 135 }}>
                                                            <Box sx={{ display: 'flex', py: 0.2, borderBottom: '1px solid lightgrey' }}>
                                                                <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.4 }}>
                                                                    {crf_closed_one}
                                                                </Typography>
                                                                <Box sx={{ flex: 1, }}>
                                                                    <Chip size="md" variant="outlined" sx={{
                                                                        color: '#bf360c', height: 25,
                                                                        fontSize: 12, fontWeight: 550,
                                                                    }}>
                                                                        CRF Closed
                                                                    </Chip>
                                                                </Box>
                                                            </Box>
                                                            <Box sx={{ pt: 0.5 }}>
                                                                <Box sx={{ display: 'flex', pt: 0.5 }}>
                                                                    <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Remarks </Typography>
                                                                    <Typography sx={{ pl: 0.5 }} >  :&nbsp;</Typography>
                                                                    <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                                                                        {crf_close_remark}</Typography>
                                                                </Box>
                                                                <Box sx={{ display: 'flex', pt: 0.5 }}>
                                                                    <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Closed By </Typography>
                                                                    <Typography sx={{ pl: 0.5 }} >  :&nbsp;</Typography>
                                                                    <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                                                                        {capitalizeWords(closed_user)}</Typography>
                                                                </Box>
                                                                <Box sx={{ display: 'flex', pt: 0.5 }}>
                                                                    <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Closed Date </Typography>
                                                                    <Typography sx={{ pl: 0.5 }} >  :&nbsp;</Typography>
                                                                    <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                                                                        {format(new Date(close_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                                </Box>
                                                            </Box>
                                                        </Paper>
                                                    </Grid>
                                                    : null}
                                            </Grid>
                                        </Paper>
                                    </>
                                    {ack_status === 1 ?
                                        <Paper variant="outlined" square sx={{ flexWrap: 'wrap', p: 0.3, mt: 0.7, mx: 0.7 }}>
                                            <Typography sx={{ fontWeight: 'bold', px: 1, py: 0.7, color: '#145DA0', fontSize: 14 }}>
                                                Procurement Details
                                            </Typography>
                                            <Grid container spacing={0.5} sx={{ flexGrow: 1, }}>
                                                {ack_status === 1 ?
                                                    <Grid xs={12} sm={12} md={12} lg={6} xl={6} sx={{ pl: 0.5 }}>
                                                        <PoAcknowComp poData={modalData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {quatation_calling_status === 1 ?
                                                    <Grid xs={12} sm={12} md={12} lg={6} xl={6} sx={{ pl: 0.5 }}>
                                                        <QuotationCallComp poData={modalData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {quatation_negotiation === 1 ?
                                                    <Grid xs={12} sm={12} md={12} lg={6} xl={6} sx={{ pl: 0.5 }}>
                                                        <QuotationNegoComp poData={modalData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {quatation_fixing === 1 ?
                                                    <Grid xs={12} sm={12} md={12} lg={6} xl={6} sx={{ pl: 0.5 }}>
                                                        <QuotationFinalComp poData={modalData} />
                                                    </Grid>
                                                    : null
                                                }
                                            </Grid>
                                            {poDetails.length !== 0 ?
                                                <>
                                                    <Typography sx={{ fontWeight: 'bold', mx: 1, pt: 0.5, color: '#145DA0', fontSize: 14 }}>
                                                        PO Details
                                                    </Typography>
                                                    <Box sx={{ width: "100%", pb: 0.3, flexWrap: 'wrap' }}>
                                                        <CrfReqDetailCmpnt poDetails={poDetails} />
                                                    </Box>
                                                </> : null}
                                            {po_complete === 1 ?
                                                <Box sx={{ display: 'flex', pt: 0.5, }}>
                                                    <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.7 }}>
                                                        Purchase Order&apos;s Completed
                                                    </Typography>
                                                    : &nbsp;        <Box sx={{ flex: 1, display: 'flex' }}>
                                                        <Chip size="md" variant="outlined" sx={{
                                                            color: '#2e7d32', height: 25, pb: 0.5,
                                                            fontSize: 12, fontWeight: 550,
                                                        }}>
                                                            Yes
                                                        </Chip>
                                                        <Typography sx={{
                                                            display: 'flex', justifyContent: 'flex-end', fontSize: 12,
                                                            textTransform: 'capitalize', fontWeight: 550, pl: 2, pt: 0.4
                                                        }}>{capitalizeWords(pocomplete_user)}&nbsp; /</Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, pl: 1, pt: 0.4 }}>
                                                            {format(new Date(po_complete_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                    </Box>
                                                </Box>
                                                : null
                                            }
                                            {po_to_supplier === 1 ?
                                                <Box sx={{ display: 'flex', pt: 0.5, }}>
                                                    <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.7 }}>
                                                        CRF Acknowledgement
                                                    </Typography>
                                                    : &nbsp;      <Box sx={{ flex: 1, display: 'flex' }}>
                                                        <Chip size="md" variant="outlined" sx={{
                                                            color: '#2e7d32', height: 25, pb: 0.5,
                                                            fontSize: 12, fontWeight: 550,
                                                        }}>
                                                            Yes
                                                        </Chip>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, pl: 2, pt: 0.4 }}>
                                                            {format(new Date(po_to_supplier_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                    </Box>
                                                </Box>
                                                : null
                                            }
                                            {store_recieve === 1 || store_recieve === 0 ?
                                                <Box sx={{ display: 'flex', pt: 0.5, }}>
                                                    <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.7 }}>
                                                        Received in CRS Store
                                                    </Typography>
                                                    : &nbsp;     <Box sx={{ flex: 1, display: 'flex' }}>
                                                        <Chip size="md" variant="outlined" sx={{
                                                            color: '#2e7d32', height: 25, pb: 0.5,
                                                            fontSize: 12, fontWeight: 550,
                                                        }}>
                                                            Yes
                                                        </Chip>
                                                        <Typography sx={{
                                                            display: 'flex', justifyContent: 'flex-end', fontSize: 12,
                                                            textTransform: 'capitalize', fontWeight: 550, pl: 2, pt: 0.4
                                                        }}>{capitalizeWords(crs_user)}&nbsp; /</Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, pl: 1, pt: 0.4 }}>
                                                            {format(new Date(store_receive_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                    </Box>
                                                </Box>
                                                : null
                                            }
                                            {sub_store_recieve === 1 ?
                                                <Box sx={{ display: 'flex', pt: 0.5, }}>
                                                    <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.7 }}>
                                                        Received in {sub_store_name}
                                                    </Typography>
                                                    : &nbsp;     <Box sx={{ flex: 1, display: 'flex' }}>
                                                        <Chip size="md" variant="outlined" sx={{
                                                            color: '#2e7d32', height: 25, pb: 0.5,
                                                            fontSize: 12, fontWeight: 550,
                                                        }}>
                                                            Yes
                                                        </Chip>
                                                        <Typography sx={{
                                                            display: 'flex', justifyContent: 'flex-end', fontSize: 12,
                                                            textTransform: 'capitalize', fontWeight: 550, pl: 2, pt: 0.4
                                                        }}>{capitalizeWords(store_user)}&nbsp; /</Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, pl: 1, pt: 0.4 }}>
                                                            {format(new Date(substore_ack_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                    </Box>
                                                </Box>
                                                : null
                                            }
                                        </Paper>
                                        : null}
                                </>
                                : ((hod_approve === null || incharge_approve == null)) ?
                                    <>
                                        {crf_close === 1 ?
                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap', height: 135 }}>
                                                    <Box sx={{ display: 'flex', py: 0.2, borderBottom: '1px solid lightgrey' }}>
                                                        <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.4 }}>
                                                            {crf_closed_one}
                                                        </Typography>
                                                        <Box sx={{ flex: 1, }}>
                                                            <Chip size="md" variant="outlined" sx={{
                                                                color: '#bf360c', height: 25,
                                                                fontSize: 12, fontWeight: 550,
                                                            }}>
                                                                CRF Closed
                                                            </Chip>
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ pt: 0.5 }}>
                                                        <Box sx={{ display: 'flex', pt: 0.5 }}>
                                                            <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Remarks </Typography>
                                                            <Typography sx={{ pl: 0.5 }} >  :&nbsp;</Typography>
                                                            <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                                                                {crf_close_remark}</Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', pt: 0.5 }}>
                                                            <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Closed By </Typography>
                                                            <Typography sx={{ pl: 0.5 }} >  :&nbsp;</Typography>
                                                            <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                                                                {capitalizeWords(closed_user)}</Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', pt: 0.5 }}>
                                                            <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Closed Date </Typography>
                                                            <Typography sx={{ pl: 0.5 }} >  :&nbsp;</Typography>
                                                            <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                                                                {format(new Date(close_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                        </Box>
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                            : null}
                                    </>
                                    :
                                    <Box sx={{
                                        display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                                        pt: 10, color: 'grey'
                                    }}>
                                        No Report Found
                                    </Box>}
                        </Box>
                    </ModalDialog>
                </Modal>
            </CssVarsProvider >
        </Fragment>
    )
}

export default memo(CRFApprovalView)
