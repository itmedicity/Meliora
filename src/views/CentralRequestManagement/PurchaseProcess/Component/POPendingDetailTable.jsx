import { Box, CssVarsProvider, Table, Tooltip } from '@mui/joy'
import React, { Fragment, memo, useCallback, useState } from 'react'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import PendingItemDetailsTable from './PendingItemDetailsTable';

const POPendingDetailTable = ({ pendingPOList }) => {

    const [modalData, setModalData] = useState([])
    const [modalflag, setModalflag] = useState(0)
    const [modalopen, setModalOpen] = useState(false)
    const [store, setStore] = useState('')

    const viewPOItemDetails = useCallback((items, storeName) => {
        setModalflag(1)
        setModalOpen(true)
        setModalData(items)
        setStore(storeName)
    }, [])
    const handleClose = useCallback(() => {
        setModalOpen(false)
        setModalflag(0)
    }, [setModalOpen])
    return (
        <Fragment>
            {modalflag === 1 ? <PendingItemDetailsTable modalData={modalData} open={modalopen} handleClose={handleClose}
                store={store} /> : null}

            <Box sx={{ pt: 0.5, flexWrap: 'wrap' }}>
                <Box variant="outlined" sx={{ maxHeight: window.innerHeight - 220, overflow: 'auto', '&::-webkit-scrollbar': { height: 8 } }}>
                    <CssVarsProvider>
                        <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' stickyFooter hoverRow >
                            <thead style={{ alignItems: 'center' }}>
                                <tr style={{ height: 0.5 }}>
                                    <th size='sm' style={{ width: 60, fontSize: 14, textAlign: 'center' }}>&nbsp; Sl.No</th>
                                    <th size='sm' style={{ width: 80, fontSize: 14 }}>&nbsp;Order#</th>
                                    <th size='sm' style={{ width: 170, fontSize: 14 }}>&nbsp;PO Date</th>
                                    <th size='sm' style={{ width: 200, fontSize: 14 }}>&nbsp;Supplier</th>
                                    <th size='sm' style={{ width: 80, fontSize: 14 }}>&nbsp;Delivery </th>
                                    <th size='sm' style={{ width: 100, fontSize: 14 }}>&nbsp;Types</th>
                                    <th size='sm' style={{ width: 120, fontSize: 14 }}>&nbsp;Delivery Date </th>
                                    <th size='sm' style={{ width: 150, fontSize: 14 }}>&nbsp;Amount</th>
                                    <th size='sm' style={{ width: 100, fontSize: 14 }}>&nbsp;PO Expiry</th>
                                    <th size='sm' style={{ width: 50, fontSize: 14 }}>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody size='small'>
                                {pendingPOList?.map((val) => {
                                    return (< tr key={val.slno} size='small'
                                        style={{
                                            maxHeight: 2, cursor: 'pointer'
                                        }}  >
                                        <td size='sm' style={{ fontSize: 12, height: 5, textAlign: 'center' }}>{val.slno}</td>
                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.po_no}</td>
                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.po_date}</td>
                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.supplier_name}</td>
                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.po_delivery}</td>
                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.po_types}</td>
                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.expected_delvery}</td>
                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{'Rs. ' + val.po_amount}</td>
                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.po_expiry}</td>
                                        <td size='sm' style={{ textAlign: 'center', height: 5 }}>
                                            <CssVarsProvider>
                                                <Tooltip title="View PO Items" placement='left'>
                                                    < DriveFileRenameOutlineIcon sx={{
                                                        padding: 'none',
                                                        color: '#607d8b',
                                                        ":hover": {
                                                            color: '#37474f'
                                                        }
                                                    }}
                                                        onClick={() => viewPOItemDetails(val.items, val.storeName)}
                                                    />
                                                </Tooltip>
                                            </CssVarsProvider>
                                        </td>
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </CssVarsProvider>
                </Box >
            </Box >
        </Fragment>
    )
}

export default memo(POPendingDetailTable)