import React, { Fragment, useState, memo, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios';
import { format } from 'date-fns';

const StoreItemReceiveDetails = ({ po_detail_slno }) => {

    const [flag, setFlag] = useState(0)
    const [itemRecvPartialydata, setitemRecvPartialyData] = useState([])

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
                setFlag(1)
            }
            else {
                setitemRecvPartialyData([])
                setFlag(0)
            }
        }
        getReceivePODetails(po_detail_slno)

    }, [po_detail_slno])


    return (
        <Fragment>
            {flag === 1 ?
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
                                <TableCell align="center">Name  </TableCell>
                                <TableCell align="center">Date </TableCell>
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
                                    <TableCell align="center">{val.substore_receive_stats}</TableCell>
                                    <TableCell align="left">{val.sub_store_emname}</TableCell>
                                    <TableCell align="center">{val.substore_receive_date}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                : null
            }

        </Fragment >
    )
}

export default memo(StoreItemReceiveDetails)