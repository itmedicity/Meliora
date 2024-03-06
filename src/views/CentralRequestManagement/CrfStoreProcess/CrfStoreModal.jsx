import React, { Fragment, useCallback, useState, memo, useEffect } from 'react'
import Slide from '@mui/material/Slide';
import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Paper } from '@mui/material'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { axioslogin } from 'src/views/Axios/Axios'
import { CssVarsProvider, Typography } from '@mui/joy'
import { format } from 'date-fns';
import CrfReqDetailCmpnt from '../CRFRequestMaster/CrfReqDetailCmpnt';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import CrfStoreConfmModal from './CrfStoreConfmModal';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const CrfStoreModal = ({ open, storeData, setStoreFlag, setStoreModal, setStoreData,
    count, setCount }) => {

    const { req_slno, req_date, actual_requirement, needed, expected_date,
    } = storeData

    const expdate = expected_date !== null ? format(new Date(expected_date), 'dd-MM-yyyy') : "Not Updated"

    const [podetailFlag, setPOdetalFalg] = useState(0)
    const [getpoDetaildata, setgetPodetailData] = useState([])


    useEffect(() => {
        const getPODetails = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFPurchase/getPOList/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const datas = data && data.map((val) => {
                    return {
                        po_detail_slno: val.po_detail_slno,
                        req_slno: val.req_slno,
                        po_number: val.po_number,
                        po_date: val.po_date,
                        po_status: 1,
                        expected_delivery: val.expected_delivery,
                        supply_store: val.supply_store,
                        sub_storename: val.sub_store_name,
                        store_name: val.main_store,
                        store_recieve: val.store_recieve
                    }
                })

                setgetPodetailData(datas)
                setPOdetalFalg(1)
            }
            else {
                setgetPodetailData([])
            }
        }
        getPODetails(req_slno)
    }, [req_slno, count])


    const reset = useCallback(() => {

        setStoreFlag(0)
        setStoreModal(false)
        setStoreData([])
        setPOdetalFalg(0)
        setgetPodetailData([])
    }, [setStoreFlag, setStoreModal, setStoreData])


    const ModalClose = useCallback(() => {
        reset()
    }, [reset])


    //column title setting
    const [column] = useState([
        { headerName: "PO Number", field: "po_number", minWidth: 80 },
        { headerName: "PO Date", field: "po_date", autoHeight: true, wrapText: true, minWidth: 100, filter: "true" },
        { headerName: "Store", field: "sub_storename", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "CRS Store", field: "store_name", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "Expected Delivery Date", field: "expected_delivery", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        {
            headerName: 'Action', minWidth: 80, autoHeight: true, cellRenderer: params => {
                if (params.data.store_recieve === 1) {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }} disabled>
                        <PublishedWithChangesOutlinedIcon />
                    </IconButton>
                } else {
                    return <IconButton onClick={() => ReceiverEntry(params)}
                        sx={{ color: editicon, paddingY: 0.5 }} >
                        <CustomeToolTip title="Receiver Entry">
                            <PublishedWithChangesOutlinedIcon />
                        </CustomeToolTip>
                    </IconButton>
                }
            }
        },


    ])
    const [edit, setEdit] = useState(0)
    const [podetlno, setPodetlno] = useState(0)
    const [okModal, setOkModal] = useState(false)

    const ReceiverEntry = useCallback((params) => {
        const data = params.api.getSelectedRows()
        const { po_detail_slno } = data[0]
        setEdit(1)
        setPodetlno(po_detail_slno)
        setOkModal(true)
    }, [])

    const handleClose = useCallback(() => {
        setEdit(0)
        setPodetlno(0)
    }, [])


    return (

        <Fragment>
            <ToastContainer />
            {edit === 1 ?
                <CrfStoreConfmModal open={okModal} podetlno={podetlno} handleClose={handleClose}
                    count={count} setCount={setCount} /> : null
            }
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                fullWidth
                maxWidth='lg'

                aria-describedby="alert-dialog-slide-descriptiona"
            >
                < DialogContent id="alert-dialog-slide-descriptiona"
                    sx={{
                        width: "100%",
                        height: 500
                    }}
                >
                    < DialogContentText id="alert-dialog-slide-descriptiona">
                        CRF Store Process
                    </DialogContentText>

                    <Box sx={{ width: "100%", mt: 0, display: "flex", flexDirection: "column" }}>
                        <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                            <Box sx={{
                                width: "100%", display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                            }}>
                                <Box sx={{
                                    width: "100%", display: "flex", p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box sx={{ pr: 1.5 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Request No: CRF/TMC/{req_slno}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 4 }}                                    >
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Req.Date: {req_date}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                {
                                    actual_requirement !== null ? <Box sx={{
                                        width: "100%", display: "flex", p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ width: "25%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Actual Requirement:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: "75%", minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {actual_requirement}
                                        </Paper>
                                    </Box> : null
                                }
                                {
                                    needed !== null ? <Box sx={{
                                        width: "100%", display: "flex", p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ width: "25%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Justification for need:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {needed}
                                        </Paper>
                                    </Box> : null
                                }
                                <Box sx={{
                                    width: "100%", display: "flex", p: 0.5, pb: 0,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ pr: 9 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Expected Date: {expdate}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>

                            </Box>
                        </Paper>

                        <Box sx={{ width: "100%", mt: 0 }}>
                            <Paper variant='outlined' sx={{ mt: 1 }} >

                                {
                                    podetailFlag === 1 ?
                                        <Box sx={{ width: "100%", pl: 1, pb: 1, pr: 1, height: 200 }}> PO Details
                                            <CrfReqDetailCmpnt
                                                columnDefs={column}
                                                tableData={getpoDetaildata}
                                            />
                                        </Box> : null
                                }


                            </Paper>
                        </Box>

                    </Box>
                </DialogContent>

                <DialogActions>
                    {/* <Button color="secondary" onClick={submit} >Save</Button> */}
                    <Button onClick={ModalClose} color="secondary" >Close</Button>
                </DialogActions>


            </Dialog>
        </Fragment>


    )
}

export default memo(CrfStoreModal)