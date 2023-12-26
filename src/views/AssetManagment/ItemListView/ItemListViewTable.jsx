import React, { useEffect, memo, useCallback, useState } from 'react'
import { CssVarsProvider } from '@mui/joy/'
import Table from '@mui/joy/Table';
import { Paper } from '@mui/material';
import ItemQrDisplayModel from './ItemQrDisplayModel';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DescriptionIcon from '@mui/icons-material/Description';

const ItemListViewTable = ({ asset, displayarry, AddDetails }) => {

    const [disArry, setDisArry] = useState([])

    useEffect(() => {
        if (displayarry.length !== 0) {
            if (asset === true) {
                const xx = displayarry.map((val) => {
                    const obj = {
                        am_item_map_slno: val.am_item_map_slno,
                        item_creation_slno: val.item_creation_slno,
                        item_dept_slno: val.item_dept_slno,
                        item_deptsec_slno: val.item_deptsec_slno,
                        deptname: val.deptname,
                        secname: val.secname,
                        item_custodian_dept: val.item_custodian_dept,
                        am_custodian_name: val.am_custodian_name,
                        item_name: val.item_name,
                        item_asset_no: val.item_asset_no,
                        item_asset_no_only: val.item_asset_no_only,
                        due_date: val.due_date,
                        assetno: val.item_asset_no + '/' + val.item_asset_no_only.toString().padStart(6, '0')
                    }
                    return obj
                })
                setDisArry(xx)
            }
            else {
                const xx = displayarry.map((val) => {
                    const obj = {
                        am_spare_item_map_slno: val.am_spare_item_map_slno,
                        spare_creation_slno: val.spare_creation_slno,
                        spare_dept_slno: val.spare_dept_slno,
                        spare_deptsec_slno: val.spare_deptsec_slno,
                        deptname: val.deptname,
                        secname: val.secname,
                        spare_custodian_dept: val.spare_custodian_dept,
                        am_custodian_name: val.am_custodian_name,
                        item_name: val.item_name,
                        spare_asset_no: val.spare_asset_no,
                        spare_asset_no_only: val.spare_asset_no_only,
                        due_date: val.due_date,
                        assetno: val.spare_asset_no + '/' + val.spare_asset_no_only.toString().padStart(6, '0')
                    }
                    return obj
                })
                setDisArry(xx)
            }
        }
    }, [displayarry, asset])

    const [flag, setFlag] = useState(0)
    const [selectedData, setSelectedData] = useState([])
    const [open, setOpen] = useState(false)



    const modeldisplay = useCallback((val) => {
        setSelectedData(val)
        setFlag(1)
        setOpen(true)
    }, [])

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [setOpen])

    return (
        <Paper sx={{ height: 700, overflow: 'auto', border: 1 }}>
            {flag === 1 ? <ItemQrDisplayModel open={open} handleClose={handleClose} selectedData={selectedData}
            /> : null}
            < CssVarsProvider >
                <Table stickyHeader>
                    <thead>
                        <tr>
                            <th style={{ width: '10%', align: "center" }}>Sl No</th>
                            <th style={{ width: '25%', align: "center" }}>Department</th>
                            <th style={{ width: '25%', align: "center" }}>Department Section</th>
                            <th style={{ width: '20%', align: "center" }}>Asset No</th>
                            <th style={{ width: '50%', align: "center" }}>Item Name</th>
                            <th style={{ width: '10%', align: "center" }}>Add Details QR</th>
                            <th style={{ width: '10%', align: "center" }}>Print QR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {disArry && disArry.map((val, index) => {
                            return <tr
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                                    minHeight: 5
                                }}
                            >
                                <td> {index + 1}</td>
                                <td> {val.deptname}</td>
                                <td> {val.secname}</td>
                                <td>{val.assetno} </td>
                                <td> {val.item_name}</td>
                                <td>
                                    <DescriptionIcon size={6} onClick={() => AddDetails(val)} />
                                </td>
                                <td>
                                    <QrCode2Icon size={6} onClick={() => modeldisplay(val)} />
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </CssVarsProvider>
        </Paper >
    )
}

export default memo(ItemListViewTable)