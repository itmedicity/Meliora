import React, { Fragment, memo, useCallback, useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { ToastContainer } from 'react-toastify';
import { Box, Paper, IconButton } from '@mui/material'
import { format } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { CssVarsProvider, Typography } from '@mui/joy'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import SubStoreRecevModal from './SubStoreRecevModal';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const CrfSubStoreModal = ({ open, handleClose, podetldata }) => {

    const { po_detail_slno, req_slno, req_deptsec, user_deptsection,
        req_date, actual_requirement, needed, expected_date, po_number,
        po_date, expected_delivery, main_store, sub_store_name } = podetldata
    const expdate = expected_date !== null ? format(new Date(expected_date), 'dd-MM-yyyy') : "Not Updated"

    const [itemRecvPartialydata, setitemRecvPartialyData] = useState([])
    const [itemtabrender, setItemTabRender] = useState(0)
    const [subReceiv, setSubRecev] = useState(0)
    const [subReceivModal, setSubRecevModal] = useState(false)
    const [subReceivdata, setSubRecevData] = useState([])

    const ItemSubStoreRecev = useCallback((val) => {
        setSubRecev(1)
        setSubRecevModal(true)
        setSubRecevData(val)
    }, [])


    useEffect(() => {
        const getReceivePODetails = async (po_detail_slno) => {
            const result = await axioslogin.get(`/newCRFStore/getPORecivedList/${po_detail_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const datas = data && data.map((val) => {
                    return {
                        po_log_slno: val.po_log_slno,
                        po_slno: val.po_slno,
                        receive_date: format(new Date(val.receive_date), 'dd-MM-yyyy'),
                        receive_user: val.receive_user,
                        partialy: val.partialy !== null ? val.partialy : 0,
                        fully: val.fully !== null ? val.fully : 0,
                        emp_name: val.emp_name,
                        substore_receive_stats: val.substore_receive === null ? "Not" : "Yes",
                        substore_receive: val.substore_receive,
                        sub_store_emname: val.sub_store_emname !== null ? val.sub_store_emname : "Not",
                        substore_receive_date: val.substore_receive_date !== null ?
                            format(new Date(val.substore_receive_date), 'dd-MM-yyyy') : "Not",
                    }
                })
                setitemRecvPartialyData(datas)
            }
            else {
                setitemRecvPartialyData([])
            }
        }
        getReceivePODetails(po_detail_slno)
    }, [po_detail_slno, itemtabrender])

    return (
        <Fragment>
            <ToastContainer />

            {subReceiv === 1 ? <SubStoreRecevModal open={subReceivModal} itemtabrender={itemtabrender}
                setItemTabRender={setItemTabRender} setSubRecev={setSubRecev} setSubRecevModal={setSubRecevModal}
                subReceivdata={subReceivdata} setSubRecevData={setSubRecevData} /> : null}
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                fullWidth
                maxWidth='md'

                aria-describedby="alert-dialog-slide-descriptiona"
            >
                < DialogContent id="alert-dialog-slide-descriptiona"
                    sx={{
                        width: "100%",
                        height: 400
                    }}
                >
                    <DialogContentText id="alert-dialog-slide-descriptiona">
                        Are you sure to  Receive Item against PO
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
                                            sx={{ width: "35%", }}>
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
                                            sx={{ width: "35%", }}>
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
                                {
                                    req_deptsec !== null ? <Box sx={{
                                        width: "100%", display: "flex", p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ width: "35%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Item Require Department:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {req_deptsec}
                                        </Paper>
                                    </Box> : null
                                }
                                {
                                    user_deptsection !== null ? <Box sx={{
                                        width: "100%", display: "flex", p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ width: "35%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Requested Department:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {user_deptsection}
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
                        <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                            <Box sx={{ pr: 1.5, pl: 1.5 }}>
                                <CssVarsProvider>
                                    <Typography sx={{ fontSize: 16, }}>
                                        Receive PO details
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                            }}>

                                <Box sx={{
                                    width: "100%", display: "flex", flexDirection: "column"
                                }}>
                                    <Box sx={{
                                        width: "100%", pl: 1, pb: 1, display: "flex", flexDirection: 'row'
                                    }}>
                                        <Box sx={{
                                            width: "15%", display: "flex", pr: 1, flexDirection: "column"
                                        }}>
                                            <CustomPaperTitle heading="PO No" />
                                            <TextFieldCustom
                                                type="number"
                                                size="sm"
                                                value={po_number}
                                                disabled={true}
                                            />
                                        </Box>
                                        <Box sx={{
                                            width: "15%", display: "flex", flexDirection: "column", pr: 1
                                        }}>
                                            <CustomPaperTitle heading="PO Date" />
                                            <TextFieldCustom
                                                type="date"
                                                size="sm"
                                                value={po_date}
                                                disabled={true}
                                            />
                                        </Box>
                                        <Box sx={{
                                            width: "20%", display: "flex", flexDirection: "column", pr: 1
                                        }}>
                                            <CustomPaperTitle heading="Main Store" />
                                            <TextFieldCustom
                                                type="text"
                                                size="sm"
                                                value={main_store}
                                                disabled={true}
                                            />
                                        </Box>
                                        <Box sx={{
                                            width: "20%", display: "flex", flexDirection: "column", pr: 1
                                        }}>
                                            <CustomPaperTitle heading="Sub Store" />
                                            <TextFieldCustom
                                                type="text"
                                                size="sm"
                                                value={sub_store_name}
                                                disabled={true}
                                            />
                                        </Box>
                                        <Box sx={{
                                            width: "20%", display: "flex", flexDirection: "column", pr: 1
                                        }}>
                                            <CustomPaperTitle heading="Expected Delivery" />
                                            <TextFieldCustom
                                                type="text"
                                                size="sm"
                                                value={expected_delivery}
                                                disabled={true}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ p: 1 }}>
                                <TableContainer sx={{ maxHeight: 250 }}>
                                    <Table size="small"
                                        stickyHeader aria-label="sticky table"
                                        sx={{ border: "0.2px solid" }}>
                                        <TableHead sx={{ border: "1px " }}>
                                            <TableRow  >
                                                {/* <TableCell align="center" >#</TableCell> */}
                                                <TableCell align="center" >Receive Date</TableCell>
                                                <TableCell align="left" > Receive Name</TableCell>
                                                <TableCell align="left" >Partialy</TableCell>
                                                <TableCell align="center">Fully</TableCell>
                                                <TableCell align="center">Sub Store Receive </TableCell>
                                                <TableCell align="center">Name  </TableCell>
                                                <TableCell align="center">Date </TableCell>
                                                <TableCell align="center">Receive </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {itemRecvPartialydata && itemRecvPartialydata.map((val, index) => {
                                                return <TableRow
                                                    key={index}
                                                    sx={{
                                                        '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                                                        minHeight: 5
                                                    }}
                                                >
                                                    {/* <TableCell align="center">{index + 1}</TableCell> */}
                                                    <TableCell align="center">{val.receive_date}</TableCell>
                                                    <TableCell align="left">{val.emp_name}</TableCell>
                                                    <TableCell align="left">{val.partialy}</TableCell>
                                                    <TableCell align="center">{val.fully}</TableCell>
                                                    <TableCell align="center">{val.substore_receive_stats}</TableCell>
                                                    <TableCell align="left">{val.sub_store_emname}</TableCell>
                                                    <TableCell align="center">{val.substore_receive_date}</TableCell>
                                                    <TableCell align="center">
                                                        {val.substore_receive === 1 ?
                                                            <IconButton variant="outlined" color="primary"
                                                                disabled   >
                                                                <LocalGroceryStoreIcon size={30} />
                                                            </IconButton> :
                                                            <IconButton variant="outlined" color="primary"
                                                                onClick={(e) => ItemSubStoreRecev(val)}   >
                                                                <LocalGroceryStoreIcon size={30} />
                                                            </IconButton>
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Paper>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" >Close</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default memo(CrfSubStoreModal)