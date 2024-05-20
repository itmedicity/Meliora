import { Box, Paper } from '@mui/material'
import React, { useCallback, memo, useState, Fragment, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import MasterDetailCompnt from '../ComonComponent/MasterDetailCompnt'
import { ToastContainer } from 'react-toastify'
import CloseIcon from '@mui/icons-material/Close';
import CusIconButton from 'src/views/Components/CusIconButton'
import ClosedButtonCompnt from '../ComonComponent/ClosedButtonCompnt'
import CustomBackDrop from 'src/views/Components/CustomBackDrop'
import { CssVarsProvider, Typography } from '@mui/joy';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Virtuoso } from 'react-virtuoso'
import ApproveButtonsCompnt from '../ComonComponent/ApproveButtonsCompnt'
import { AllListForMOApi, CloseListApi, OnHoldListApi, RejectListApi, getMOAppvalPending } from '../ComonComponent/ComonFunctnFile'
import HigherAppDoneModal from '../ComonComponent/HigherAppDoneModal'
import CrfMOClose from './CrfMOClose'
import CrfMOApprovalModal from './CrfMOApprovalModal'
import ReqImageDisModal from '../ComonComponent/ReqImageDisModal'
import ClosedDetailsModal from '../ComonComponent/ClosedDetailsModal'
import { axioslogin } from 'src/views/Axios/Axios'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'

const CrfMOApprovalMain = () => {

    /*** Initializing */
    const history = useHistory();
    //redux for geting login id
    const [count, setCount] = useState(0)
    const [open, setOpen] = useState(false)
    const [radiovalue, setRadioValue] = useState('1')
    const [DisArray, setDisArray] = useState([])

    const [ApprovalFlag, setApprovalFlag] = useState(0)
    const [ApprovalModal, setApprovalModal] = useState(false)
    const [ApprovalData, setApprovalData] = useState([])

    const [cancelFlag, setCancelFlag] = useState(0)
    const [cancelModal, setCancelModal] = useState(false)
    const [cancelData, setCancelData] = useState([])

    const [DetailViewFlag, setDetailViewFlag] = useState(0)
    const [DetailViewModal, setDetailViewModal] = useState(false)
    const [DetailViewData, setDetailViewData] = useState([])

    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imageshow, setImageShow] = useState(false)
    const [imageSlno, setImageSlno] = useState(0)
    const [imagearray, setImageArry] = useState([])

    const [CloseFlag, setCloseFlag] = useState(0)
    const [CloseModal, setCloseModal] = useState(false)
    const [CloseData, setCloseData] = useState([])

    useEffect(() => {
        setOpen(true)
        getMOAppvalPending(setDisArray, setOpen)
    }, [count])

    //Radio button OnClick function starts
    const updateRadioClick = useCallback(async (e) => {
        e.preventDefault()
        setOpen(false)
        setRadioValue(e.target.value)
        if (e.target.value === '1') {
            getMOAppvalPending(setDisArray, setOpen)
        } else if (e.target.value === '2') {
            AllListForMOApi(setDisArray, setOpen)
        } else if (e.target.value === '3') {
            CloseListApi(setDisArray, setOpen)
        }
    }, [])

    const rejectOnclick = useCallback(() => {
        setOpen(true)
        RejectListApi(setDisArray, setOpen)
    }, [])

    const onHoldOnclick = useCallback(() => {
        setOpen(true)
        OnHoldListApi(setDisArray, setOpen)
    }, [])

    useEffect(() => {
        const getImage = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                });
                setImageArry(fileUrls);
            }
        }
        if (imageshowFlag === 1) {
            getImage(imageSlno)
        }
    }, [imageshowFlag, imageSlno])

    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
        setImageSlno(0)
        setImageArry([])
    }, [])

    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/CrfNewDashBoard')
    }, [history])

    return (
        <Fragment>
            <ToastContainer />
            <CustomBackDrop open={open} text="Please Wait" />
            {DetailViewFlag === 1 ? <HigherAppDoneModal
                open={DetailViewModal} setDetailViewModal={setDetailViewModal}
                DetailViewData={DetailViewData} setDetailViewData={setDetailViewData}
                setDetailViewFlag={setDetailViewFlag}
            /> : null}
            {cancelFlag === 1 ? <CrfMOClose open={cancelModal} setCancelData={setCancelData}
                setCancelFlag={setCancelFlag} setCancelModal={setCancelModal}
                count={count} setCount={setCount} cancelData={cancelData} /> : null}

            {ApprovalFlag === 1 ? <CrfMOApprovalModal open={ApprovalModal} ApprovalData={ApprovalData}
                setApprovalModal={setApprovalModal} setApprovalFlag={setApprovalFlag}
                count={count} setCount={setCount} setApprovalData={setApprovalData} /> : null}

            {imageshowFlag === 1 ? <ReqImageDisModal open={imageshow} handleClose={handleClose}
                images={imagearray} /> : null}

            {CloseFlag === 1 ? <ClosedDetailsModal open={CloseModal} CloseData={CloseData}
                setCloseData={setCloseData} setCloseModal={setCloseModal} setCloseFlag={setCloseFlag} /> : null}

            <Box sx={{ height: 35, backgroundColor: "#f0f3f5", display: 'flex' }}>
                <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: .5, color: '#385E72', }}>CRF Documentation</Box>
                <Box>
                    <CusIconButton size="sm" variant="outlined" color="primary" onClick={backtoSetting} >
                        <CloseIcon fontSize='small' />
                    </CusIconButton>
                </Box>
            </Box>
            <Paper >
                <Box sx={{
                    width: "100%", pl: 1, pt: 0.5, pr: 1, pb: 0.5, flex: 1,
                    display: "flex",
                    flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                    justifyContent: 'center',
                }}><Box sx={{ width: "30%", pr: 1, mt: 1 }}></Box>


                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={radiovalue}
                        onChange={(e) => updateRadioClick(e)}
                    >
                        <FormControlLabel value='1' control={<Radio />} label="Pending" />
                        <FormControlLabel sx={{ pl: 2 }} value='2' control={<Radio />} label="All List" />
                        <FormControlLabel sx={{ pl: 2 }} value='3' control={<Radio />} label="Closed" />
                    </RadioGroup>

                    <Box sx={{ width: "10%", }}></Box>
                    <Box sx={{ width: "10%", mt: 1, mb: 1, backgroundColor: '#db6775', borderRadius: 2.5 }}
                        onClick={() => rejectOnclick()}  >
                        <CssVarsProvider>
                            <Typography sx={{
                                fontSize: 15, pl: 1, pr: 2, color: 'white', textAlign: "center",
                                cursor: "pointer"
                            }}>Reject</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: "2%" }}></Box>
                    <Box sx={{
                        width: "10%", mt: 1, mb: 1, backgroundColor: "#c9b661", borderRadius: 2.5,
                        cursor: "pointer"
                    }}
                        onClick={() => onHoldOnclick()}                    >
                        <CssVarsProvider>
                            <Typography sx={{ fontSize: 15, pl: 1, pr: 2, color: 'white', textAlign: "center" }}>On-Hold</Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>
            </Paper>

            <Box sx={{ height: window.innerHeight - 150, overflow: 'auto', }}>

                <Virtuoso
                    // style={{ height: '400px' }}
                    data={DisArray}
                    totalCount={DisArray?.length}
                    itemContent={(index, val) => <Box key={index} sx={{ width: "100%", }}>
                        <Paper sx={{
                            width: '100%',
                            mt: 0.8,
                            border: "2 solid #272b2f",
                            borderRadius: 3,
                            overflow: 'hidden',
                            boxShadow: 1,
                            backgroundColor: '#BBBCBC'
                        }} variant='outlined'>
                            <MasterDetailCompnt val={val} />
                            {
                                val.crf_close === 1 ?
                                    <ClosedButtonCompnt val={val} setCloseFlag={setCloseFlag}
                                        setCloseModal={setCloseModal} setCloseData={setCloseData}
                                    /> :
                                    <ApproveButtonsCompnt val={val} setApprovalFlag={setApprovalFlag}
                                        setApprovalModal={setApprovalModal} setCancelFlag={setCancelFlag}
                                        setCancelModal={setCancelModal} setApprovalData={setApprovalData}
                                        setCancelData={setCancelData} setDetailViewFlag={setDetailViewFlag}
                                        setDetailViewData={setDetailViewData} setDetailViewModal={setDetailViewModal}
                                        setImageShowFlag={setImageShowFlag} setImageShow={setImageShow}
                                        setImageSlno={setImageSlno}
                                    />
                            }
                        </Paper>
                    </Box>} />
            </Box>
        </Fragment >
    )
}

export default memo(CrfMOApprovalMain)