import { Box } from '@mui/material'
import React, { useCallback, memo, useState } from 'react'
import CusIconButton from 'src/views/Components/CusIconButton'
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { Typography } from '@mui/joy';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { axioslogin } from 'src/views/Axios/Axios'
import ProfilePicDefault from 'src/assets/images/nosigature.jpg'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import { urlExist } from 'src/views/Constant/Constant'
import { warningNotify } from 'src/views/Common/CommonCode';
import { CrfPdfWithOutDetails } from '../CrfPdfView/CrfPdfWithOutDetails';
import { CrfPdfWithDetails } from '../CrfPdfView/CrfPdfWithDetail';


const PurchaseApprovalButton = ({ val, setpuchaseFlag, setpuchaseModal, setpuchaseData }) => {
    const { ack_status } = val
    const ModalOpenfctn = useCallback(() => {
        setpuchaseFlag(1)
        setpuchaseModal(true)
        setpuchaseData(val)
    }, [val, setpuchaseFlag, setpuchaseModal, setpuchaseData])

    const [mdsign, setMdSign] = useState(ProfilePicDefault)
    const [edsign, setEdSign] = useState(ProfilePicDefault)

    const PdfDownloadFctn = useCallback(() => {
        const { req_slno, mdid, edid } = val

        const ItemDetailsGet = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegister/getDetailItemList/${req_slno}`)
            return result.data
        }

        const ItemDetailsApproved = async (req_slno) => {
            const result = await axioslogin.get(`/CRFRegisterApproval/getFinalItemListApproval/${req_slno}`)
            return result.data
        }

        const getMDSign = async () => {
            if (mdid > 0) {
                const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + mdid}/signature/signature.jpg`);
                urlExist(profilePic, (status) => {
                    if (status === true) {
                        const picUrl = JSON.parse(profilePic)
                        setMdSign(picUrl)
                    } else {
                        setMdSign(ProfilePicDefault)
                    }
                })
            }
        }

        const getEDSign = async () => {
            if (edid > 0) {
                const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + edid}/signature/signature.jpg`);
                urlExist(profilePic, (status) => {
                    if (status === true) {
                        const picUrl = JSON.parse(profilePic)
                        setEdSign(picUrl)
                    } else {
                        setEdSign(ProfilePicDefault)
                    }
                })
            }
        }

        getMDSign()
        getEDSign()

        ItemDetailsGet(req_slno).then((values) => {
            const { success, data, message } = values
            if (success === 1) {
                ItemDetailsApproved(req_slno).then((value) => {
                    const { succes, dataa, message } = value
                    if (succes === 1) {
                        CrfPdfWithDetails(val, data, dataa, mdsign, edsign)
                    }
                    else {
                        warningNotify(message)
                    }
                })
            }
            else if (success === 0) {
                CrfPdfWithOutDetails(val, mdsign, edsign)
            }
            else {
                warningNotify(message)
            }
        })

    }, [val, mdsign, edsign,])
    return (
        <Box sx={{
            height: 40, backgroundColor: "#f0f3f5", display: 'flex', width: "100%",
            flexDirection: "row", pt: 0.5, pb: 0.5
        }}>

            <Box sx={{ pl: 2, }}>
                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={ModalOpenfctn}  >
                    <Typography color="primary" sx={{ fontSize: 15, pl: 1 }}></Typography>
                    <SaveAsIcon fontSize='small' />
                    <Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>Procees</Typography>
                </CusIconButton>
            </Box>
            {ack_status === 1 ?
                <Box sx={{ pl: 2, }}>
                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={PdfDownloadFctn}  >
                        <Typography color="primary" sx={{ fontSize: 15, pl: 1 }}></Typography>
                        <FileOpenIcon fontSize='small' />
                        <Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>View</Typography>
                    </CusIconButton>
                </Box> : null
            }


        </Box>
    )
}

export default memo(PurchaseApprovalButton)