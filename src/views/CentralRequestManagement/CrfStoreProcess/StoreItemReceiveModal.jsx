import React, { memo, Fragment, useCallback } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material'

const StoreItemReceiveModal = ({ getpoDetaildata, setPartialFlag, setPodetlno, setOkModal, setEdit,
    setFullyFlag, setStrFulyRecev }) => {

    const partialyReceive = useCallback((val) => {
        const { po_detail_slno } = val
        setPartialFlag(1)
        setEdit(1)
        setPodetlno(po_detail_slno)
        setOkModal(true)
    }, [setEdit, setPartialFlag, setPodetlno, setOkModal])

    const FullyReceive = useCallback((val) => {
        const { po_detail_slno, store_recieve_fully } = val
        setFullyFlag(1)
        setEdit(1)
        setPodetlno(po_detail_slno)
        setOkModal(true)
        setStrFulyRecev(store_recieve_fully)
    }, [setEdit, setFullyFlag, setPodetlno, setOkModal, setStrFulyRecev])


    return (
        <Fragment>
            <TableContainer sx={{ maxHeight: 250 }}>
                <Table size="small"
                    stickyHeader aria-label="sticky table"

                    sx={{ border: "0.2px solid" }}>
                    <TableHead sx={{ border: "1px " }}>
                        <TableRow  >
                            <TableCell align="center" >#</TableCell>
                            <TableCell align="center" >PO Number</TableCell>
                            <TableCell align="left" > PO Date</TableCell>
                            <TableCell align="left" > Store</TableCell>
                            <TableCell align="center">CRS Store</TableCell>
                            <TableCell align="center">Expected Delivery Date</TableCell>
                            <TableCell align="center">Partaily</TableCell>
                            <TableCell align="center">Fully</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getpoDetaildata && getpoDetaildata.map((val, index) => {
                            return <TableRow
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                                    minHeight: 5
                                }}
                            >
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{val.po_number}</TableCell>
                                <TableCell align="left">{val.po_date}</TableCell>
                                <TableCell align="left">{val.sub_storename}</TableCell>
                                <TableCell align="center">{val.store_name}</TableCell>
                                <TableCell align="center">{val.expected_delivery}</TableCell>
                                <TableCell align="center">
                                    {val.store_recieve_fully === 1 ?
                                        <IconButton variant="outlined" color="primary"
                                            disabled   >
                                            <ShoppingCartCheckoutIcon size={30} />
                                        </IconButton> :
                                        <IconButton variant="outlined" color="primary"
                                            onClick={(e) => partialyReceive(val)}   >
                                            <ShoppingCartCheckoutIcon size={30} />
                                        </IconButton>

                                    }

                                </TableCell>
                                <TableCell align="center">
                                    <IconButton variant="outlined" color="primary"
                                        onClick={(e) => FullyReceive(val)}   >
                                        <ShoppingCartIcon size={30} />
                                    </IconButton>
                                    {/* <Button onClick={(e) => FullyReceive(val)} variant="contained"
                                        color="primary">Fully</Button> */}
                                </TableCell>

                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment >
    )
}

export default memo(StoreItemReceiveModal)