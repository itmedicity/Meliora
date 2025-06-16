import { Box, Button } from '@mui/material'
import React, { useCallback, memo, Fragment, useState } from 'react'
import SubtitlesOffIcon from '@mui/icons-material/SubtitlesOff';
import ClosedDetailsModal from './ClosedDetailsModal';
import { GetItemDetailsOfCRFCmp } from './GetItemDetailsOfCRFCmp';
import { axioslogin } from 'src/views/Axios/Axios';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import { CssVarsProvider, IconButton, Tooltip, Typography } from '@mui/joy';
import DoDisturbOffTwoToneIcon from '@mui/icons-material/DoDisturbOffTwoTone';


const ClosedButtonCompnt = ({ val, setPoDetails, imagearray, setImageArry, company }) => {

    const [closeViewFlag, setCloseViewFlag] = useState(0)
    const [closeViewModal, setCloseViewModal] = useState(false)
    const [crfClosedDetails, setCrfClosedDetails] = useState([])
    const [reqItems, setReqItems] = useState([])
    const [approveTableData, setApproveTableData] = useState([])
    const { crf_close, internally_arranged_status, now_who, crf_closed_one } = val
    const ModalOpenfctn = useCallback(() => {
        const { req_slno } = val
        const getImage = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                });

                const savedFiles = fileUrls.map((val) => {
                    const parts = val.split('/');
                    const fileNamePart = parts[parts.length - 1];
                    const obj = {
                        imageName: fileNamePart,
                        url: val
                    }
                    return obj
                })
                setImageArry(savedFiles)
            } else {
                setImageArry([])
            }
        }
        getImage(req_slno)
        GetItemDetailsOfCRFCmp(req_slno, setReqItems, setApproveTableData, setPoDetails)

        setCloseViewFlag(1)
        setCloseViewModal(true)
        setCrfClosedDetails(val)
    }, [val, setPoDetails, setImageArry])

    const buttonstyle = {
        px: 2,
        fontSize: 12,
        height: '30px',
        minHeight: '30px',
        lineHeight: '1.2',
        color: '#01579b',
        bgcolor: 'white',
        '&:hover': {
            bgcolor: '#F0F4F8',
        },
        borderRadius: 1,
    }
    const handleCloseModal = useCallback(() => {
        setCloseViewFlag(0)
        setCloseViewModal(false)
        setCrfClosedDetails([])
    }, [setCloseViewFlag, setCloseViewModal, setCrfClosedDetails])

    return (
        <Fragment>
            {closeViewFlag === 1 ? <ClosedDetailsModal open={closeViewModal} crfClosedDetails={crfClosedDetails}
                handleCloseModal={handleCloseModal} reqItems={reqItems} approveTableData={approveTableData}
                imagearray={imagearray} company={company} /> : null}
            <Box sx={{
                display: 'flex', flex: 1, bgcolor: '#e3f2fd', borderRadius: 2, borderTopLeftRadius: 0,
                borderTopRightRadius: 0, justifyContent: 'space-between', flexWrap: 'wrap',
            }}>
                <Box sx={{ p: 0.5, pl: 1, flex: 1 }}>
                    <Button
                        variant="contained"
                        startIcon={
                            <SubtitlesOffIcon
                                sx={{
                                    height: 19,
                                    width: 19,
                                    color: '#0277bd',
                                }}
                            />
                        }
                        sx={buttonstyle}
                        onClick={ModalOpenfctn}
                    >
                        View CRF Details
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, p: 0.5, mr: 2 }}>
                    {crf_close === 2 || internally_arranged_status === 1 ?
                        <Button variant="plain"
                            sx={{
                                px: 1, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                bgcolor: '#0277bd', borderRadius: 1, fontSize: 13, pr: 1, textTransform: 'capitalize', fontWeight: 550, color: 'white',
                                '&:hover': {
                                    bgcolor: '#0277bd'
                                },
                            }}>
                            <Typography sx={{ fontSize: 13, pl: 2, pr: 1, color: 'white', textTransform: 'capitalize', fontWeight: 550 }}>{now_who}</Typography>
                            Internally Arranged
                        </Button>
                        : null}
                </Box>

                {crf_close === 1 ?
                    <Box sx={{ display: 'flex', p: 0.5 }} >
                        <Button variant="plain"
                            sx={{
                                px: 1, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                bgcolor: '#0277bd', borderRadius: 1,
                                '&:hover': {
                                    bgcolor: '#0277bd'
                                },
                            }}>
                            <Typography sx={{ fontSize: 13, pl: 2, pr: 1, color: 'white', textTransform: 'capitalize', fontWeight: 550 }}>{now_who + ' By ' + crf_closed_one}</Typography>
                        </Button>
                        <Box sx={{ mx: 0.3 }}>
                            <CssVarsProvider>
                                <IconButton
                                    sx={{
                                        fontSize: 12, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                        width: '15px',
                                        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                        bgcolor: 'white',
                                        '&:hover': {
                                            bgcolor: 'white',
                                        },
                                    }}
                                >   <Tooltip title="Closed" arrow color="danger" size="sm" variant="solid" placement="top">
                                        <DoDisturbOffTwoToneIcon sx={{ color: 'red', height: 18, width: 18, }} /></Tooltip>
                                </IconButton>
                            </CssVarsProvider>
                        </Box>
                    </Box> : null


                }
            </Box>
        </Fragment>
    )
}
export default memo(ClosedButtonCompnt)