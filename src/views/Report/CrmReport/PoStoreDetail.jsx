import React from 'react'
import { useState, useEffect, memo, Fragment } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Box } from '@mui/material'

const PoStoreDetail = ({ val }) => {
  const { po_detail_slno } = val
  const [storeDetailData, setStorDetailData] = useState([])

  useEffect(() => {
    const getPOStoresDetails = async po_detail_slno => {
      const result = await axioslogin.get(`/CrfReports/getPOdetailStores/${po_detail_slno}`)
      const { success, data } = result.data
      if (success === 1) {
        const datas =
          data &&
          data.map(val => {
            return {
              po_log_slno: val.po_log_slno,
              receive_date: val.receive_date,
              crs_receive_user: val.crs_receive_user,
              status: val.partialy === 1 ? 'Partialy' : val.fully === 1 ? 'Fully' : 'Not Received',
              substore_receive: val.substore_receive,
              sotre_receive_user: val.sotre_receive_user === null ? 'Not Received' : val.sotre_receive_user,
              substore_receive_date: val.substore_receive_date === null ? 'Not Received' : val.substore_receive_date
            }
          })
        setStorDetailData(datas)
      } else {
        setStorDetailData([])
      }
    }
    getPOStoresDetails(po_detail_slno)
  }, [po_detail_slno])

  return (
    <Fragment>
      <Box sx={{ p: 1 }}>
        <TableContainer sx={{ maxHeight: 250 }}>
          <Table size="small" stickyHeader aria-label="sticky table" sx={{ border: '0.2px solid' }}>
            <TableHead sx={{ border: '1px ' }}>
              <TableRow>
                <TableCell align="center">Sl No</TableCell>
                <TableCell align="center">Crs Receive Status</TableCell>
                <TableCell align="center">Crs Receive Date</TableCell>
                <TableCell align="center">Crs Receive User</TableCell>
                <TableCell align="center">Sub Store Receive Date</TableCell>
                <TableCell align="center">Sub Store Receive User</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {storeDetailData &&
                storeDetailData.map((val, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        maxHeight: 60,
                        minHeight: 5
                      }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{val.status}</TableCell>
                      <TableCell align="center">{val.receive_date}</TableCell>
                      <TableCell align="center">{val.crs_receive_user}</TableCell>
                      <TableCell align="center">{val.substore_receive_date}</TableCell>
                      <TableCell align="center">{val.sotre_receive_user}</TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Fragment>
  )
}

export default memo(PoStoreDetail)
