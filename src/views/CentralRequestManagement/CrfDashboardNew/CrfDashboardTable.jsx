import { Box, Paper } from '@mui/material'
import React, { useCallback, memo, useState, Fragment, useEffect } from 'react'
import MasterDetailCompnt from '../ComonComponent/MasterDetailCompnt'
import CloseIcon from '@mui/icons-material/Close';
import CusIconButton from 'src/views/Components/CusIconButton'
import { ToastContainer } from 'react-toastify'
import { CssVarsProvider } from '@mui/joy'
import CrfDashBoardAppButton from './CrfDashBoardAppButton'
import CrfMOClose from '../CrfMOApproval/CrfMOClose'
import HodCancel from '../CrfHodApproval/HodCancel'
import CrfSMOClose from '../CrfSMOApproval/CrfSMOClose'
import CrfGMClose from '../CrfGMApproval/CrfGMClose'
import CrfEDClose from '../CrfEDApproval/CrfEDClose'
import CrfMDClose from '../CrfMDApproval/CrfMDClose'
import CrfMOApprovalModal from '../CrfMOApproval/CrfMOApprovalModal';
import CrfSMOApprovalModal from '../CrfSMOApproval/CrfSMOApprovalModal';
import CrfGMApprovalModal from '../CrfGMApproval/CrfGMApprovalModal';
import CrfMDApprovalModal from '../CrfMDApproval/CrfMDApprovalModal';
import CrfEDApprovalModal from '../CrfEDApproval/CrfEDApprovalModal';
import PurchaseModal from '../PurchaseProcess/PurchaseModal';
import CrmHodApprovalModal from '../CrfHodApproval/CrmHodApprovalModal';


const CrfDashboardTable = ({ heading, disData, flag, setFlag, setHeading, setDisData, PurchseFlag, count,
    setCount, setPurchaseFlag, setOpen }) => {

    /*** Initializing */

    const [ApprovalFlag, setApprovalFlag] = useState(0)
    const [ApprovalModal, setApprovalModal] = useState(false)
    const [ApprovalData, setApprovalData] = useState([])

    const [cancelFlag, setCancelFlag] = useState(0)
    const [cancelModal, setCancelModal] = useState(false)
    const [cancelData, setCancelData] = useState([])

    const [puchaseFlag, setpuchaseFlag] = useState(0)
    const [puchaseModal, setpuchaseModal] = useState(false)
    const [puchaseData, setpuchaseData] = useState([])

    useEffect(() => {
        setOpen(false)
    }, [])
    //close button function
    const backtoSetting = useCallback(() => {
        setFlag(0)
        setHeading('')
        setDisData([])
        setPurchaseFlag(0)
    }, [setFlag, setHeading, setDisData, setPurchaseFlag])

    return (
        <Fragment>
            <ToastContainer />
            {cancelFlag === 1 && (flag === 1 || flag === 2) ? <HodCancel open={cancelModal} setCancelData={setCancelData}
                setCancelFlag={setCancelFlag} setCancelModal={setCancelModal}
                count={count} setCount={setCount} cancelData={cancelData} /> :

                cancelFlag === 1 && (flag === 3 || flag === 4) ?
                    <CrfMOClose open={cancelModal} setCancelData={setCancelData}
                        setCancelFlag={setCancelFlag} setCancelModal={setCancelModal}
                        count={count} setCount={setCount} cancelData={cancelData} /> :

                    cancelFlag === 1 && (flag === 5 || flag === 6) ?
                        <CrfSMOClose open={cancelModal} setCancelData={setCancelData}
                            setCancelFlag={setCancelFlag} setCancelModal={setCancelModal}
                            count={count} setCount={setCount} cancelData={cancelData} /> :

                        cancelFlag === 1 && (flag === 7 || flag === 8) ?
                            <CrfGMClose open={cancelModal} setCancelData={setCancelData}
                                setCancelFlag={setCancelFlag} setCancelModal={setCancelModal}
                                count={count} setCount={setCount} cancelData={cancelData} /> :

                            cancelFlag === 1 && (flag === 9 || flag === 10) ?
                                <CrfMDClose open={cancelModal} setCancelData={setCancelData}
                                    setCancelFlag={setCancelFlag} setCancelModal={setCancelModal}
                                    count={count} setCount={setCount} cancelData={cancelData} /> :

                                cancelFlag === 1 && (flag === 11 || flag === 12) ?
                                    <CrfEDClose open={cancelModal} setCancelData={setCancelData}
                                        setCancelFlag={setCancelFlag} setCancelModal={setCancelModal}
                                        count={count} setCount={setCount} cancelData={cancelData} /> :
                                    null}

            {ApprovalFlag === 1 && (flag === 1 || flag === 2) ? <CrmHodApprovalModal open={ApprovalModal} ApprovalData={ApprovalData}
                setApprovalModal={setApprovalModal} setApprovalFlag={setApprovalFlag}
                count={count} setCount={setCount} setApprovalData={setApprovalData} /> :

                ApprovalFlag === 1 && (flag === 3 || flag === 4) ? <CrfMOApprovalModal open={ApprovalModal} ApprovalData={ApprovalData}
                    setApprovalModal={setApprovalModal} setApprovalFlag={setApprovalFlag}
                    count={count} setCount={setCount} setApprovalData={setApprovalData} /> :

                    ApprovalFlag === 1 && (flag === 5 || flag === 6) ? <CrfSMOApprovalModal open={ApprovalModal} ApprovalData={ApprovalData}
                        setApprovalModal={setApprovalModal} setApprovalFlag={setApprovalFlag}
                        count={count} setCount={setCount} setApprovalData={setApprovalData} /> :

                        ApprovalFlag === 1 && (flag === 7 || flag === 8) ? <CrfGMApprovalModal open={ApprovalModal} ApprovalData={ApprovalData}
                            setApprovalModal={setApprovalModal} setApprovalFlag={setApprovalFlag}
                            count={count} setCount={setCount} setApprovalData={setApprovalData} /> :

                            ApprovalFlag === 1 && (flag === 9 || flag === 10) ? <CrfMDApprovalModal open={ApprovalModal} ApprovalData={ApprovalData}
                                setApprovalModal={setApprovalModal} setApprovalFlag={setApprovalFlag}
                                count={count} setCount={setCount} setApprovalData={setApprovalData} /> :

                                ApprovalFlag === 1 && (flag === 11 || flag === 12) ? <CrfEDApprovalModal open={ApprovalModal} ApprovalData={ApprovalData}
                                    setApprovalModal={setApprovalModal} setApprovalFlag={setApprovalFlag}
                                    count={count} setCount={setCount} setApprovalData={setApprovalData} /> :

                                    null}

            {
                puchaseFlag === 1 ? <PurchaseModal open={puchaseModal}
                    setpuchaseFlag={setpuchaseFlag} setpuchaseModal={setpuchaseModal}
                    puchaseData={puchaseData} setpuchaseData={setpuchaseData}
                    count={count} setCount={setCount} /> : null
            }

            <CssVarsProvider>
                <Box sx={{ height: 35, backgroundColor: "#f0f3f5", display: 'flex' }}>
                    <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: .5, color: '#385E72', }}>{heading}</Box>
                    <Box>
                        <CusIconButton size="sm" variant="outlined" color="primary" onClick={backtoSetting} >
                            <CloseIcon fontSize='small' />
                        </CusIconButton>
                    </Box>
                </Box>

                <Box sx={{ height: window.innerHeight - 150, overflow: 'auto', }}>

                    {disData && disData.map((val) => {
                        return <Box key={val.req_slno} sx={{ width: "100%", }}>
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
                                <CrfDashBoardAppButton val={val} setApprovalFlag={setApprovalFlag}
                                    setApprovalModal={setApprovalModal} setApprovalData={setApprovalData}
                                    setCancelFlag={setCancelFlag} setCancelModal={setCancelModal}
                                    setCancelData={setCancelData} PurchseFlag={PurchseFlag}
                                    setpuchaseFlag={setpuchaseFlag} setpuchaseModal={setpuchaseModal}
                                    puchaseData={puchaseData} setpuchaseData={setpuchaseData}


                                />
                            </Paper>
                        </Box>
                    })
                    }
                </Box>
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(CrfDashboardTable)