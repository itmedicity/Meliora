import { Box, Button } from '@mui/material'
import React, { useCallback, memo, Fragment, useState } from 'react'
import SubtitlesOffIcon from '@mui/icons-material/SubtitlesOff';
import ClosedDetailsModal from './ClosedDetailsModal';
import { GetItemDetailsOfCRFCmp } from './GetItemDetailsOfCRFCmp';
import { axioslogin } from 'src/views/Axios/Axios';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';

const ClosedButtonCompnt = ({ val, setPoDetails, imagearray, setImageArry }) => {
    const [closeViewFlag, setCloseViewFlag] = useState(0)
    const [closeViewModal, setCloseViewModal] = useState(false)
    const [crfClosedDetails, setCrfClosedDetails] = useState([])
    const [reqItems, setReqItems] = useState([])
    const [approveTableData, setApproveTableData] = useState([])

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
                imagearray={imagearray} /> : null}
            <Box sx={{
                display: 'flex', flex: 1, bgcolor: '#e3f2fd', borderRadius: 2, borderTopLeftRadius: 0,
                borderTopRightRadius: 0, justifyContent: 'space-between', flexWrap: 'wrap',
            }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', pl: 1 }} >
                    <Box sx={{ p: 0.5, pl: 1 }}>
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
                </Box>
            </Box>
        </Fragment>
    )
}
export default memo(ClosedButtonCompnt)