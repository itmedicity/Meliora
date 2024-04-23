import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import Button from '@mui/material/Button';
import { Box, Paper } from '@mui/material'
import { IconButton } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { ToastContainer } from 'react-toastify';
import _ from 'underscore'
import { useSelector } from 'react-redux'
import { format } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { CssVarsProvider, Typography } from '@mui/joy'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CrfStoreConfmModal = ({ open, handleClose, podetlno, partialFlag, fullyFlag, strFulyReciv, req_slno }) => {
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const [itemRecvPartialy, setitemRecvPartialy] = useState(0)
    const [itemRecvPartialydata, setitemRecvPartialyData] = useState([])

    useEffect(() => {

        const getReceivePODetails = async (podetlno) => {
            const result = await axioslogin.get(`/newCRFStore/getPORecivedList/${podetlno}`)
            const { success, data } = result.data
            if (success === 1) {
                const datas = data && data.map((val) => {
                    return {
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
                setitemRecvPartialy(1)
            }
            else {
                setitemRecvPartialyData([])
            }
        }
        getReceivePODetails(podetlno)
    }, [podetlno])

    const InsetPoDetailsStorePartial = useMemo(() => {
        return {
            po_slno: podetlno,
            receive_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            receive_user: id,
            partialy: 1,
            req_slno: req_slno
        }
    }, [podetlno, id, req_slno])

    const InsetPoDetailsStoreFull = useMemo(() => {
        return {
            po_slno: podetlno,
            receive_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            receive_user: id,
            fully: 1,
            req_slno: req_slno
        }
    }, [podetlno, id, req_slno])


    const Receive = useCallback(() => {
        const InsertPoReceivePartialLog = async (InsetPoDetailsStorePartial) => {
            const result = await axioslogin.post('/newCRFStore/InsertPoDetailsLog', InsetPoDetailsStorePartial);
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                handleClose()
            } else {
                warningNotify(message)
            }
        }

        const InsertPoReceiveFullLog = async (InsetPoDetailsStoreFull) => {
            const result = await axioslogin.post('/newCRFStore/InsertPoDetailsLogFully', InsetPoDetailsStoreFull);
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                handleClose()
            } else {
                warningNotify(message)
            }
        }

        if (partialFlag === 1) {
            InsertPoReceivePartialLog(InsetPoDetailsStorePartial)
        } else if (fullyFlag === 1) {
            InsertPoReceiveFullLog(InsetPoDetailsStoreFull)
        }
    }, [InsetPoDetailsStorePartial, handleClose, InsetPoDetailsStoreFull,
        partialFlag, fullyFlag])

    return (
        <Fragment>
            <ToastContainer />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                fullWidth
                maxWidth='md'
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                <DialogContent sx={{
                    minWidth: "100%",
                    maxWidth: 400
                }}>
                    {
                        partialFlag === 1 && fullyFlag === 0 ?
                            <Box sx={{ width: "100%", mt: 0, display: "flex", flexDirection: "column" }}>
                                <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                    <Box sx={{
                                        width: "100%", display: "flex",
                                        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                    }}>
                                        <Box sx={{ pr: 1.5 }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 18, textAlign: "center" }}>
                                                    Are you sure to  Receive Item Partially against Selected PO
                                                </Typography>
                                            </CssVarsProvider>
                                        </Box>

                                        {
                                            itemRecvPartialy === 1 ?
                                                <Box>
                                                    <Box sx={{ pr: 1.5, pl: 1.5 }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 18, }}>
                                                                Previously receive details
                                                            </Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                                    <Box sx={{ p: 1 }}>
                                                        <TableContainer sx={{ maxHeight: 250 }}>
                                                            <Table size="small"
                                                                stickyHeader aria-label="sticky table"
                                                                sx={{ border: "0.2px solid" }}>
                                                                <TableHead sx={{ border: "1px " }}>
                                                                    <TableRow  >
                                                                        <TableCell align="center" >#</TableCell>
                                                                        <TableCell align="center" >Receive Date</TableCell>
                                                                        <TableCell align="left" > Receive Name</TableCell>
                                                                        <TableCell align="left" >Partialy</TableCell>
                                                                        <TableCell align="center">Fully</TableCell>
                                                                        <TableCell align="center">Sub Store Receive </TableCell>
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
                                                                            <TableCell align="center">{index + 1}</TableCell>
                                                                            <TableCell align="center">{val.receive_date}</TableCell>
                                                                            <TableCell align="left">{val.emp_name}</TableCell>
                                                                            <TableCell align="left">{val.partialy}</TableCell>
                                                                            <TableCell align="center">{val.fully}</TableCell>
                                                                            {val.substore_receive === 1 ?
                                                                                <TableCell align="center">
                                                                                    <IconButton variant="outlined" color="primary"                                                                                     >
                                                                                        <InventoryTwoToneIcon size={30} />
                                                                                    </IconButton>
                                                                                </TableCell> :
                                                                                <TableCell align="center">
                                                                                    <IconButton variant="outlined" color="primary"                                                                                     >
                                                                                        <LocalShippingRoundedIcon size={30} />
                                                                                    </IconButton>
                                                                                </TableCell>
                                                                            }

                                                                        </TableRow>
                                                                    })}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Box>
                                                    <Box sx={{ width: "100%", mt: 0, display: "flex", flexDirection: "row" }}>
                                                        <Box sx={{ width: "8%", pl: 2 }}>
                                                            <IconButton variant="outlined" color="primary"                                                                                     >
                                                                <LocalShippingRoundedIcon size={30} />
                                                            </IconButton>
                                                        </Box>
                                                        <Box sx={{ width: "20%", pt: 1 }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15 }}> Sub Store Not Receive</Typography>
                                                            </CssVarsProvider>
                                                        </Box>
                                                        <Box sx={{ width: "8%", pl: 2 }}>
                                                            <IconButton variant="outlined" color="primary"                                                                                     >
                                                                <InventoryTwoToneIcon size={30} />
                                                            </IconButton>
                                                        </Box>
                                                        <Box sx={{ width: "20%", pt: 1 }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15 }}> Sub Store Receive</Typography>
                                                            </CssVarsProvider>
                                                        </Box>
                                                    </Box>
                                                </Box> :
                                                null
                                        }
                                    </Box>
                                </Paper>
                            </Box>
                            :
                            fullyFlag === 1 && strFulyReciv !== 1 ?
                                <Box sx={{ width: "100%", mt: 0, display: "flex", flexDirection: "column" }}>
                                    <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                        <Box sx={{
                                            width: "100%", display: "flex",
                                            flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                        }}>
                                            <Box sx={{ pr: 1.5 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 18, textAlign: "center" }}>
                                                        Are you sure to  Receive Item Fully against Selected PO
                                                    </Typography>
                                                </CssVarsProvider>
                                            </Box>

                                            {
                                                itemRecvPartialy === 1 ?
                                                    <Box>
                                                        <Box sx={{ pr: 1.5, pl: 1.5 }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 18, }}>
                                                                    Previously receive details
                                                                </Typography>
                                                            </CssVarsProvider>
                                                        </Box>
                                                        <Box sx={{ p: 1 }}>
                                                            <TableContainer sx={{ maxHeight: 250 }}>
                                                                <Table size="small"
                                                                    stickyHeader aria-label="sticky table"
                                                                    sx={{ border: "0.2px solid" }}>
                                                                    <TableHead sx={{ border: "1px " }}>
                                                                        <TableRow  >
                                                                            <TableCell align="center" >#</TableCell>
                                                                            <TableCell align="center" >Receive Date</TableCell>
                                                                            <TableCell align="left" > Receive Name</TableCell>
                                                                            <TableCell align="left" >Partialy</TableCell>
                                                                            <TableCell align="center">Fully</TableCell>
                                                                            <TableCell align="center">Sub Store Receive </TableCell>
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
                                                                                <TableCell align="center">{index + 1}</TableCell>
                                                                                <TableCell align="center">{val.receive_date}</TableCell>
                                                                                <TableCell align="left">{val.emp_name}</TableCell>
                                                                                <TableCell align="left">{val.partialy}</TableCell>
                                                                                <TableCell align="center">{val.fully}</TableCell>
                                                                                {val.substore_receive === 1 ?
                                                                                    <TableCell align="center">
                                                                                        <IconButton variant="outlined" color="primary"                                                                                     >
                                                                                            <InventoryTwoToneIcon size={30} />
                                                                                        </IconButton>
                                                                                    </TableCell> :
                                                                                    <TableCell align="center">
                                                                                        <IconButton variant="outlined" color="primary"                                                                                     >
                                                                                            <LocalShippingRoundedIcon size={30} />
                                                                                        </IconButton>
                                                                                    </TableCell>
                                                                                }
                                                                            </TableRow>
                                                                        })}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                        <Box sx={{ width: "100%", mt: 0, display: "flex", flexDirection: "row" }}>
                                                            <Box sx={{ width: "8%", pl: 2 }}>
                                                                <IconButton variant="outlined" color="primary"                                                                                     >
                                                                    <LocalShippingRoundedIcon size={30} />
                                                                </IconButton>
                                                            </Box>
                                                            <Box sx={{ width: "20%", pt: 1 }}>
                                                                <CssVarsProvider>
                                                                    <Typography sx={{ fontSize: 15 }}> Sub Store Not Receive</Typography>
                                                                </CssVarsProvider>
                                                            </Box>
                                                            <Box sx={{ width: "8%", pl: 2 }}>
                                                                <IconButton variant="outlined" color="primary"                                                                                >
                                                                    <InventoryTwoToneIcon size={30} />
                                                                </IconButton>
                                                            </Box>
                                                            <Box sx={{ width: "20%", pt: 1 }}>
                                                                <CssVarsProvider>
                                                                    <Typography sx={{ fontSize: 15 }}> Sub Store Receive</Typography>
                                                                </CssVarsProvider>
                                                            </Box>
                                                        </Box>
                                                    </Box> :
                                                    null
                                            }
                                        </Box>
                                    </Paper>
                                </Box>
                                :
                                <Box sx={{ width: "100%", mt: 0, display: "flex", flexDirection: "column" }}>
                                    <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                        <Box sx={{ pr: 1.5, pl: 1.5 }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 18, }}>
                                                    Received details
                                                </Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box sx={{ p: 1 }}>
                                            <TableContainer sx={{ maxHeight: 250 }}>
                                                <Table size="small"
                                                    stickyHeader aria-label="sticky table"
                                                    sx={{ border: "0.2px solid" }}>
                                                    <TableHead sx={{ border: "1px " }}>
                                                        <TableRow  >
                                                            <TableCell align="center" >#</TableCell>
                                                            <TableCell align="center" >Receive Date</TableCell>
                                                            <TableCell align="left" > Receive Name</TableCell>
                                                            <TableCell align="left" >Partialy</TableCell>
                                                            <TableCell align="center">Fully</TableCell>
                                                            <TableCell align="center">Sub Store Receive </TableCell>
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
                                                                <TableCell align="center">{index + 1}</TableCell>
                                                                <TableCell align="center">{val.receive_date}</TableCell>
                                                                <TableCell align="left">{val.emp_name}</TableCell>
                                                                <TableCell align="left">{val.partialy}</TableCell>
                                                                <TableCell align="center">{val.fully}</TableCell>
                                                                {val.substore_receive === 1 ?
                                                                    <TableCell align="center">
                                                                        <IconButton variant="outlined" color="primary"                                                                                     >
                                                                            <InventoryTwoToneIcon size={30} />
                                                                        </IconButton>
                                                                    </TableCell> :
                                                                    <TableCell align="center">
                                                                        <IconButton variant="outlined" color="primary"                                                                                     >
                                                                            <LocalShippingRoundedIcon size={30} />
                                                                        </IconButton>
                                                                    </TableCell>
                                                                }

                                                            </TableRow>
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                        <Box sx={{ width: "100%", mt: 0, display: "flex", flexDirection: "row" }}>
                                            <Box sx={{ width: "8%", pl: 2 }}>
                                                <IconButton variant="outlined" color="primary"                                                                                     >
                                                    <LocalShippingRoundedIcon size={30} />
                                                </IconButton>
                                            </Box>
                                            <Box sx={{ width: "20%", pt: 1 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15 }}> Sub Store Not Receive</Typography>
                                                </CssVarsProvider>
                                            </Box>
                                            <Box sx={{ width: "8%", pl: 2 }}>
                                                <IconButton variant="outlined" color="primary"                                                                                     >
                                                    <InventoryTwoToneIcon size={30} />
                                                </IconButton>
                                            </Box>
                                            <Box sx={{ width: "20%", pt: 1 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15 }}> Sub Store Receive</Typography>
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Box>
                    }
                </DialogContent>
                <DialogActions>
                    {strFulyReciv !== 1 && (partialFlag === 1 || fullyFlag === 1) ?

                        <Button onClick={Receive} color="secondary" >Yes</Button> : null}
                    {strFulyReciv !== 1 && (partialFlag === 1 || fullyFlag === 1) ?

                        <Button onClick={handleClose} color="secondary" >No</Button> :
                        <Button onClick={handleClose} color="secondary" >Close</Button>}

                </DialogActions>
            </Dialog>

        </Fragment>

    )
}

export default memo(CrfStoreConfmModal)