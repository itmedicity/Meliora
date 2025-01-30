import { Box, Button } from '@mui/material'
import React, { Fragment, memo, useCallback, useState } from 'react'
import { Chip, CssVarsProvider, Typography } from '@mui/joy'
import { format, isValid } from 'date-fns';
import ErrorIcon from '@mui/icons-material/Error';
import { keyframes } from '@mui/system';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import { axioslogin } from 'src/views/Axios/Axios';
import DescriptionIcon from '@mui/icons-material/Description';
import { warningNotify } from 'src/views/Common/CommonCode';
import SchoolIcon from '@mui/icons-material/School';
import BadgeIcon from '@mui/icons-material/Badge';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ModalToViewDetails from './ModalToViewDetails';

const MasterComponent = ({ val }) => {
    const { req_slno, req_date, req_deptsec, user_deptsection, actual_requirement, needed, dept_name, category,
        location, expected_date, emergency_flag, em_name, emer_type_name, emergeny_remarks, dept_type, dept_type_name } = val
    const expdate = expected_date !== null && isValid(new Date(expected_date)) ? format(new Date(expected_date), 'dd-MM-yyyy') : "Not Updated"
    const capitalizeWords = (str) => str ? str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';
    const blinkAnimation = keyframes`0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; }`;

    const [imagearray, setImageArry] = useState([])
    const [reqItems, setReqItems] = useState([])
    const [approveTableData, setApproveTableData] = useState([])
    const [modalFlag, setmodalFlag] = useState(0)
    const [modalData, setModalData] = useState([])
    const [modalOpen, setModalOpen] = useState(false)

    const viewDetails = useCallback(() => {
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
        const getItemDetails = async (req_slno) => {
            try {
                const result = await axioslogin.get(`/newCRFRegister/getDetailItemList/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    setReqItems(data)
                } else {
                    setReqItems([])
                }
            } catch (error) {
                warningNotify("Error to fetch Data:", error);
                setReqItems([])
            }
        }
        getItemDetails(req_slno)
        const getApproItemDetails = async (req_slno) => {
            try {
                const result = await axioslogin.get(`/CRFRegisterApproval/getItemListApproval/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    setApproveTableData(data)
                } else {
                    setApproveTableData([])
                }
            } catch (error) {
                warningNotify("Error to fetch Data:", error);
                setApproveTableData([])
            }
        }
        setmodalFlag(1)
        setModalData(val)
        setModalOpen(true)
        getApproItemDetails(req_slno)
    }, [req_slno, val])

    const handleClose = useCallback(() => {
        setmodalFlag(0)
        setModalData([])
        setModalOpen(false)
    }, [])
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

    return (
        <Fragment>
            {modalFlag === 1 ?
                <ModalToViewDetails open={modalOpen} modalData={modalData} handleClose={handleClose} reqItems={reqItems}
                    approveTableData={approveTableData} imagearray={imagearray} />
                : null}
            <CssVarsProvider>
                <Box sx={{
                    display: 'flex', flex: 1, borderRadius: 2, borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0, borderBottom: '1px solid #9fa8da', flexWrap: 'wrap'
                }}>
                    <Box sx={{ flex: 0.7, borderRight: '1px solid lightgray', flexWrap: 'wrap' }}>
                        <Box sx={{ ml: 1, mt: 0.5 }}>
                            <Typography sx={{ fontSize: 15, color: '#003060', fontWeight: 'bold' }}>
                                {'CRF/TMC/' + req_slno}</Typography>
                        </Box>
                        <Box sx={{ ml: 1, mt: 0.5 }}>
                            <Typography sx={{ fontSize: 12, color: '#003060' }}>{format(new Date(req_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                        </Box>
                        <Box sx={{ ml: 1, mt: 0.5 }}>
                            <Typography sx={{ fontSize: 12, textTransform: 'uppercase', color: '#003060', fontWeight: 'bold' }}>{em_name}</Typography>
                        </Box>
                        <Box sx={{ ml: 1, mt: 0.5 }}>
                            <Typography sx={{ fontSize: 12, textTransform: 'uppercase', color: '#003060' }}>{dept_name}</Typography>
                        </Box>
                        <Box sx={{ ml: 1, mt: 0.5, pb: 0.5 }}>
                            <Typography sx={{ fontSize: 12, textTransform: 'capitalize', color: '#003060' }}>{user_deptsection}</Typography>
                        </Box>
                    </Box>
                    {emergency_flag === 1 ?
                        <Box sx={{ flex: 0.6, textAlign: 'center', borderRight: '1px solid lightgray' }}>
                            <ErrorIcon
                                sx={{
                                    mt: 2,
                                    height: 30,
                                    width: 30,
                                    color: '#d50000',
                                    animation: `${blinkAnimation} 1s infinite`
                                }}
                            />
                            <Typography sx={{ fontSize: 13, color: '#b71c1c', pt: 0.2, fontWeight: 550 }}>
                                {emer_type_name !== null ? capitalizeWords(emer_type_name) : null}
                            </Typography>
                            <Typography sx={{ fontSize: 11, color: '#b71c1c', pt: 0.2 }}>
                                {emergeny_remarks !== null ? capitalizeWords(emergeny_remarks) : null}</Typography>
                        </Box>
                        : null}
                    <Box sx={{ flex: 3.5, flexWrap: 'wrap' }}>
                        <Box sx={{ m: 0.7, borderBottom: '1px solid lightgray', display: 'flex', pb: 0.5 }}>
                            <Typography sx={{ fontSize: 11, color: '#003060', fontWeight: 'bold', flex: 0.1, pt: 0.2 }}>REQUIREMENT </Typography>
                            <Typography sx={{ fontSize: 12, color: '#003060', fontWeight: 'bold' }}>: </Typography>
                            <Typography sx={{ fontSize: 13, pl: 1, flex: 1 }}>{actual_requirement !== null ? capitalizeWords(actual_requirement) : "Not Given"}</Typography>
                        </Box>
                        <Box sx={{ m: 0.7, borderBottom: '1px solid lightgray', display: 'flex', pb: 0.5 }}>
                            <Typography sx={{ fontSize: 11, color: '#003060', fontWeight: 'bold', flex: 0.1, pt: 0.2 }}>JUSTIFICATION</Typography>
                            <Typography sx={{ fontSize: 12, color: '#003060', fontWeight: 'bold' }}>: </Typography>
                            <Typography sx={{ fontSize: 13, pl: 1, flex: 1 }}>{needed !== null ? capitalizeWords(needed) : "Not Given"}</Typography>
                        </Box>
                        <Box sx={{ m: 0.7, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', pr: 0.5 }}>
                            <Box sx={{ display: 'flex', }}>
                                <Typography sx={{ fontSize: 11, color: '#003060', fontWeight: 'bold', pt: 0.4 }}>CATEGORY</Typography>
                                <Typography sx={{ fontSize: 12, color: '#003060', fontWeight: 'bold', pl: 1, }}>: </Typography>
                                <Typography sx={{ fontSize: 13, pl: 1 }}>{category.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', }}>
                                <Typography sx={{ fontSize: 11, color: '#003060', fontWeight: 'bold', pt: 0.4 }}>REQ. DEPARTMENT</Typography>
                                <Typography sx={{ fontSize: 12, color: '#003060', fontWeight: 'bold', pl: 1, }}>: </Typography>
                                <Typography sx={{ fontSize: 13, }}>&nbsp;&nbsp;{capitalizeWords(req_deptsec)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', }}>
                                <Typography sx={{ fontSize: 11, color: '#003060', fontWeight: 'bold', pt: 0.4 }}>LOCATION </Typography>
                                <Typography sx={{ fontSize: 12, color: '#003060', fontWeight: 'bold', pl: 1, }}>: </Typography>
                                <Typography sx={{ fontSize: 13, }}>&nbsp;&nbsp;{capitalizeWords(location)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', }}>
                                <Typography sx={{ fontSize: 11, color: '#003060', fontWeight: 'bold', pt: 0.4 }}>EXPECTED DATE</Typography>
                                <Typography sx={{ fontSize: 12, color: '#003060', fontWeight: 'bold', pl: 1, }}>: </Typography>
                                <Typography sx={{ fontSize: 13, }}>&nbsp;&nbsp;{expdate}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </CssVarsProvider>
            <Box sx={{
                display: 'flex', flex: 1, bgcolor: '#e3f2fd', borderRadius: 2, borderTopLeftRadius: 0,
                borderTopRightRadius: 0, justifyContent: 'space-between', flexWrap: 'wrap',
            }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', pl: 1 }} >
                    <Box sx={{ pl: 2, p: 0.5 }}>
                        <Button
                            variant="contained"
                            startIcon={
                                <DescriptionIcon
                                    sx={{
                                        height: 19,
                                        width: 19,
                                        color: '#0277bd',
                                    }}
                                />
                            }
                            sx={buttonstyle}
                            onClick={viewDetails}
                        >
                            View
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', m: 0.4, p: 0.5, pr: 20 }} >
                    <CssVarsProvider>
                        <Chip
                            startDecorator={
                                dept_type === 1 ?
                                    <AddBusinessIcon sx={{ color: '#FB6B90', fontWeight: '650' }} />
                                    : dept_type === 2 ? <BadgeIcon sx={{ color: '#8155BA' }} /> :
                                        <SchoolIcon sx={{ color: '#29A0B1' }} />
                            }
                            size="sm"
                            variant="solid"
                            sx={{
                                bgcolor: 'white', border: '1px solid lightblue', fontWeight: 650,
                                color: (dept_type === 1 ? '#EF7C8E' : dept_type === 2 ? '#A16AE8' : '#29A0B1')
                            }}
                        >
                            {dept_type_name}
                        </Chip>
                    </CssVarsProvider>
                </Box>
            </Box>
        </Fragment>
    )
}

export default memo(MasterComponent)
