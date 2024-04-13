import React, { useMemo } from 'react'
import { useState, useCallback, useEffect, memo, Fragment } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axioslogin } from 'src/views/Axios/Axios'
import { Box, Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import MasterDetailCompnt from '../ComonComponent/MasterDetailCompnt'
import CusIconButton from 'src/views/Components/CusIconButton'
import PurchaseApprovalButton from './PurchaseApprovalButton'
import PurchaseModal from './PurchaseModal'
import { ToastContainer } from 'react-toastify'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ReqImageDisModal from '../ComonComponent/ReqImageDisModal'
import { useDispatch, useSelector } from 'react-redux'
import { getCRMPurchase } from 'src/redux/actions/CrmPurchaseList.action'
import CustomBackDrop from 'src/views/Components/CustomBackDrop'
import { PurchAckMapList, PurchaseAckDoneList, getData, getpurchaseAckPending, poClose, potoSupp } from 'src/redux/ReduxhelperFun/reduxhelperfun'
import { warningNotify } from 'src/views/Common/CommonCode'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Virtuoso } from 'react-virtuoso'
import { getCRMPurchaseAckPending } from 'src/redux/actions/CrmPurchaseACKList.action'


const PurchaseTablemain = () => {

    const dispatch = useDispatch();
    /*** Initializing */
    const history = useHistory();
    const [count, setCount] = useState(0)
    const [open, setOpen] = useState(false)
    const [DisArray, setDisArray] = useState([])
    const [radiovalue, setRadioValue] = useState('1')
    const [puchaseFlag, setpuchaseFlag] = useState(0)
    const [puchaseModal, setpuchaseModal] = useState(false)
    const [puchaseData, setpuchaseData] = useState([])

    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imageshow, setImageShow] = useState(false)
    const [imageSlno, setImageSlno] = useState(0)
    const [imagearray, setImageArry] = useState([])

    useEffect(() => {
        dispatch(getCRMPurchaseAckPending())
        dispatch(getCRMPurchase())
    }, [dispatch, count])

    const purchaseAckPending = useSelector((state) => getpurchaseAckPending(state))
    const CRMPurchaseAckPendingListAry = useMemo(() => purchaseAckPending, [purchaseAckPending])
    const PurchaseArryList = useSelector((state) => getData(state))
    const tabledata = useMemo(() => PurchaseArryList, [PurchaseArryList])

    useEffect(() => {
        setOpen(true)
        const getPending = async (CRMPurchaseAckPendingListAry) => {
            const firstFilter = await PurchAckMapList(CRMPurchaseAckPendingListAry)
            const { status, data } = firstFilter
            if (status === true) {
                setDisArray(data)
                setOpen(false)
            } else {
                setDisArray([])
                warningNotify("No CRF for Purchase Acknowledgement")
                setOpen(false)
            }
        }

        const getPurcAckDone = async (tabledata) => {
            const PurchaseAckDoneListArry = await PurchaseAckDoneList(tabledata);
            const { status, data } = PurchaseAckDoneListArry
            if (status === true) {
                if (data.length !== 0) {
                    setDisArray(data)
                    setOpen(false)
                }
                else {
                    setDisArray([])
                    warningNotify("No CRF for PO starts ")
                    setOpen(false)
                }
            } else {
                setDisArray([])
                warningNotify("Error Occured")
                setOpen(false)
            }
        }

        const getPoClose = async (tabledata) => {
            const PoCloseList = await poClose(tabledata);
            const { status, data } = PoCloseList
            if (status === true) {
                if (data.length !== 0) {
                    setDisArray(data)
                    setOpen(false)
                } else {
                    setDisArray([])
                    warningNotify("No CRF for PO Close Pending")
                    setOpen(false)
                }
            } else {
                setDisArray([])
                warningNotify("Error Occured")
                setOpen(false)
            }

        }

        const getPOtoSupplier = async (tabledata) => {
            const dataPoSupply = await potoSupp(tabledata);
            const { status, data } = dataPoSupply
            if (status === true) {
                if (data.length !== 0) {
                    setDisArray(data)
                    setOpen(false)
                } else {
                    setDisArray([])
                    warningNotify("No CRF for Po to Supplier Pending")
                    setOpen(false)
                }
            } else {
                setDisArray([])
                warningNotify("Error Occured")
                setOpen(false)
            }

        }

        if (radiovalue === '1') {
            getPending(CRMPurchaseAckPendingListAry)
        } else if (radiovalue === '2') {
            getPurcAckDone(tabledata)
        } else if (radiovalue === '3') {
            getPoClose(tabledata)
        } else if (radiovalue === '4') {
            getPOtoSupplier(tabledata)
        }

    }, [CRMPurchaseAckPendingListAry, radiovalue, tabledata])

    const updateRadioClick = useCallback(async (e) => {
        e.preventDefault()
        setOpen(false)
        setRadioValue(e.target.value)
        if (e.target.value === '1') {
            setDisArray([])
            setOpen(true)
            const dataPurchaseAck = await PurchAckMapList(CRMPurchaseAckPendingListAry);
            const { status, data } = dataPurchaseAck
            if (status === true) {
                if (data.length !== 0) {
                    setDisArray(data)
                    setOpen(false)
                }
                else {
                    setDisArray([])
                    warningNotify("No CRF for Purchase Acknowledgement")
                    setOpen(false)
                }
            } else {
                setDisArray([])
                warningNotify("Error Occured")
                setOpen(false)
            }
        } else if (e.target.value === '2') {
            setDisArray([])
            setOpen(true)
            const PurchaseAckDoneListArry = await PurchaseAckDoneList(tabledata);
            const { status, data } = PurchaseAckDoneListArry
            if (status === true) {
                if (data.length !== 0) {
                    setDisArray(data)
                    setOpen(false)
                }
                else {
                    setDisArray([])
                    warningNotify("No CRF for PO starts ")
                    setOpen(false)
                }
            } else {
                setDisArray([])
                warningNotify("Error Occured")
                setOpen(false)
            }
        }


        else if (e.target.value === '3') {
            setDisArray([])
            setOpen(true)
            const PoCloseList = await poClose(tabledata);
            const { status, data } = PoCloseList
            if (status === true) {
                if (data.length !== 0) {
                    setDisArray(data)
                    setOpen(false)
                } else {
                    setDisArray([])
                    warningNotify("No CRF for PO Close Pending")
                    setOpen(false)
                }
            } else {
                setDisArray([])
                warningNotify("Error Occured")
                setOpen(false)
            }
        } else if (e.target.value === '4') {
            setDisArray([])
            setOpen(true)
            const dataPoSupply = await potoSupp(tabledata);
            const { status, data } = dataPoSupply
            if (status === true) {
                if (data.length !== 0) {
                    setDisArray(data)
                    setOpen(false)
                } else {
                    setDisArray([])
                    warningNotify("No CRF for Po to Supplier Pending")
                    setOpen(false)
                }
            } else {
                setDisArray([])
                warningNotify("Error Occured")
                setOpen(false)
            }
            // potoSupp(tabledata).then((e) => {
            //     setDisArray(e)
            //     setOpen(false)
            // })
        }
    }, [tabledata, CRMPurchaseAckPendingListAry])



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
            {
                puchaseFlag === 1 ? <PurchaseModal open={puchaseModal}
                    setpuchaseFlag={setpuchaseFlag} setpuchaseModal={setpuchaseModal}
                    puchaseData={puchaseData} setpuchaseData={setpuchaseData}
                    count={count} setCount={setCount} /> : null
            }
            {imageshowFlag === 1 ? <ReqImageDisModal open={imageshow} handleClose={handleClose}
                images={imagearray} /> : null}

            <Box sx={{ height: 35, backgroundColor: "#f0f3f5", display: 'flex' }}>
                <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: .5, color: '#385E72', }}>CRF Purchase</Box>
                <Box>
                    <CusIconButton size="sm" variant="outlined" color="primary" onClick={backtoSetting} >
                        <CloseIcon fontSize='small' />
                    </CusIconButton>
                </Box>
            </Box>

            <Paper >
                <Box sx={{
                    width: "100%",
                    pl: 1, pt: 0.5, pr: 1, pb: 0.5, flex: 1,
                    display: "flex",
                    flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                    justifyContent: 'center',
                }}>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={radiovalue}
                        onChange={(e) => updateRadioClick(e)}
                    >
                        <FormControlLabel value='1' control={<Radio />} label="Acknowledgement Pending" />
                        <FormControlLabel value='2' control={<Radio />} label="Processing CRF " />
                        <FormControlLabel value='3' control={<Radio />} label="PO Close Pending" />
                        <FormControlLabel value='4' control={<Radio />} label="PO to Supplier Pending" />
                    </RadioGroup>
                </Box>
            </Paper>


            <Box sx={{ height: window.innerHeight - 150, overflow: 'auto', }}>

                <Virtuoso
                    // style={{ height: '400px' }}
                    data={DisArray}
                    totalCount={DisArray?.length}
                    itemContent={(index, val) => <Box key={val.req_slno} sx={{ width: "100%", }}>
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

                            <PurchaseApprovalButton val={val}
                                setpuchaseFlag={setpuchaseFlag} setpuchaseModal={setpuchaseModal}
                                setpuchaseData={setpuchaseData} setImageShowFlag={setImageShowFlag}
                                setImageShow={setImageShow} setImageSlno={setImageSlno} />

                        </Paper>
                    </Box>} />
                {/* {DisArray && DisArray.map((val) => {
                    return <Box key={val.req_slno} sx={{ width: "100%", }}>{val.actual_requirement}
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

                            <PurchaseApprovalButton val={val}
                                setpuchaseFlag={setpuchaseFlag} setpuchaseModal={setpuchaseModal}
                                setpuchaseData={setpuchaseData} setImageShowFlag={setImageShowFlag}
                                setImageShow={setImageShow} setImageSlno={setImageSlno} />

                        </Paper>
                    </Box>
                })} */}
            </Box>
        </Fragment >
    )
}

export default memo(PurchaseTablemain)