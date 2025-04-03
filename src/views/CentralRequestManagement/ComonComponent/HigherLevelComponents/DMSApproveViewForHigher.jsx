import React, { Fragment, memo, useCallback, useState } from 'react'
import { axioskmc, axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import { PUBLIC_NAS_FOLDER, PUBLIC_NAS_FOLDER_KMC } from 'src/views/Constant/Static'
import ImageDisplayModal from '../ImageUploadCmp/ImageDisplayModal'
import { Paper } from '@mui/material'
import { Box, Chip, Typography } from '@mui/joy'
import { format } from 'date-fns'
import CustomToolTipForCRF from '../Components/CustomToolTipForCRF'
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
const DMSApproveViewForHigher = ({ DetailViewData, selectedCompany, company }) => {
    const { req_slno, dms_approve, dms, dms_remarks, dms_detail_analysis, dms_approve_date, dms_user, dms_image
    } = DetailViewData
    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imageshow, setImageShow] = useState(false)
    const [imagearray, setImageArry] = useState([])
    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])
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

    const ViewDMSUploadImage = useCallback(() => {
        if (selectedCompany === '1') {
            const getImage = async (req_slno) => {
                const result = await axioslogin.get(`/newCRFRegisterImages/crfDMSImageGet/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const fileNames = data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/DMSUpload/${fileName}`;
                    });
                    setImageArry(fileUrls);
                    setImageShowFlag(1)
                    setImageShow(true)
                } else {
                    warningNotify("Error Occured to display image")
                    setImageShowFlag(0)
                    setImageShow(false)
                    setImageArry([])
                }
            }
            getImage(req_slno)
        } else if (selectedCompany === '2') {
            const getImage = async (req_slno) => {
                const result = await axioskmc.get(`/newCRFRegisterImages/crfDMSImageGet/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const fileNames = data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER_KMC}/CRF/crf_registration/${req_slno}/DMSUpload/${fileName}`;
                    });
                    setImageArry(fileUrls);
                    setImageShowFlag(1)
                    setImageShow(true)
                } else {
                    warningNotify("Error Occured to display image")
                    setImageShowFlag(0)
                    setImageShow(false)
                    setImageArry([])
                }
            }
            getImage(req_slno)
        }

    }, [req_slno, selectedCompany])
    return (
        <Fragment>
            {imageshowFlag === 1 ? <ImageDisplayModal open={imageshow} handleClose={handleClose}
                images={imagearray} /> : null}
            <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', pt: 0.5, borderBottom: '1px solid lightgrey' }}>
                    <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.4 }}>
                        {company?.dms_status_name}
                    </Typography>
                    <Box sx={{ flex: 1, py: 0.4, ml: 2 }}>
                        <Chip size="md" variant="outlined" sx={{
                            color: (dms_approve === 1 ? '#2e7d32' : dms_approve === 2 ? '#bf360c' : dms_approve === 3 ? '#FF9800' : dms_approve === 4 ? '#009688' : '#607D8B'),
                            height: 25, pb: 0.5, fontSize: 12, fontWeight: 550,
                        }}>
                            {dms}
                        </Chip>
                    </Box>
                </Box>
                <Box sx={{ pt: 0.1 }}>
                    {dms_approve === 1 && dms_remarks !== null ?
                        <Box sx={{ pt: 0.5 }}>
                            <Box sx={{ display: 'flex' }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Justification/ Requirement Description </Typography>
                                <Typography sx={{ pl: 0.5 }} >  :&nbsp;</Typography>
                                <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                                    {dms_remarks === null ? 'Not Updated' : dms_remarks}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', pt: 1 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Detailed Analysis of Requirement</Typography>
                                <Typography sx={{ pl: 0.5 }} >  :&nbsp;</Typography>
                                <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                                    {dms_detail_analysis === null ? 'Not Updated' : dms_detail_analysis}</Typography>
                            </Box>

                        </Box>
                        :
                        dms_approve === 2 && dms_remarks !== null ?
                            <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Justification for Reject </Typography>
                                <Typography sx={{ pl: 0.5 }} >  :&nbsp;</Typography>
                                <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                                    {dms_remarks === null ? 'Not Updated' : dms_remarks} </Typography>
                            </Box>
                            : dms_approve === 3 && dms_remarks !== null ?
                                <Box sx={{ display: 'flex', pt: 0.5 }}>
                                    <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Justification for On-Hold</Typography>
                                    <Typography sx={{ pl: 0.5 }} >  :&nbsp;</Typography>
                                    <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                                        {dms_remarks === null ? 'Not Updated' : dms_remarks} </Typography>
                                </Box>
                                : dms_approve === 4 && dms_remarks !== null ?
                                    <Box sx={{ display: 'flex', pt: 0.5 }}>
                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Remarks</Typography>
                                        <Typography sx={{ pl: 0.5 }} >  :&nbsp;</Typography>
                                        <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                                            {dms_remarks === null ? 'Not Updated' : dms_remarks} </Typography>
                                    </Box> : null}
                    {
                        dms_approve_date !== null ?
                            <Box sx={{ display: 'flex', py: 1 }}>
                                {(dms_approve === 1 || dms_approve === 4) ?
                                    <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>Approved by </Typography>
                                    : dms_approve === 2 ?
                                        <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>Rejected by </Typography>
                                        : dms_approve === 3 ?
                                            <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>On-Hold by </Typography>
                                            : null}
                                <Box sx={{ display: 'flex', flex: 1 }}>
                                    <Typography sx={{}} >  :&nbsp;</Typography>
                                    <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, pt: 0.3, pl: 0.2 }}>
                                        {capitalizeWords(dms_user)}</Typography>
                                    <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, pl: 2, pt: 0.3 }}>
                                        {format(new Date(dms_approve_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                    {dms_image === 1 ?
                                        <Box sx={{ display: 'flex', pl: 2 }} >
                                            <CustomToolTipForCRF title='File View' placement='top' >
                                                <AttachmentTwoToneIcon fontSize='small' sx={{ cursor: 'pointer', color: '#0277bd', width: 35, height: 25 }}
                                                    onClick={ViewDMSUploadImage} >
                                                </AttachmentTwoToneIcon>
                                            </CustomToolTipForCRF>
                                        </Box> : null
                                    }
                                </Box>
                            </Box>
                            : null}
                </Box>
            </Paper>
        </Fragment>
    )
}

export default memo(DMSApproveViewForHigher)