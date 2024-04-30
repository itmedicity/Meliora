import React, { useEffect, memo, useCallback, useState, Fragment } from 'react'
import ItemQrDisplayModel from './ItemQrDisplayModel';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DescriptionIcon from '@mui/icons-material/Description';
import { Box } from '@mui/material'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain';
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';

const ItemListViewTable = ({ asset, displayarry, AddDetails }) => {

    const [disArry, setDisArry] = useState([])

    useEffect(() => {
        if (displayarry.length !== 0) {
            if (asset === true) {
                const xx = displayarry.map((val, index) => {
                    const obj = {
                        slno: index + 1,
                        am_item_map_slno: val.am_item_map_slno,
                        item_creation_slno: val.item_creation_slno,
                        item_dept_slno: val.item_dept_slno,
                        item_deptsec_slno: val.item_deptsec_slno,
                        deptname: val.deptname,
                        secname: val.secname,
                        item_custodian_dept: val.item_custodian_dept,
                        am_custodian_name: val.am_custodian_name,
                        category_name: val.category_name,
                        item_name: val.item_name,
                        item_asset_no: val.item_asset_no,
                        item_asset_no_only: val.item_asset_no_only,
                        due_date: val.due_date,
                        assetno: val.item_asset_no + '/' + val.item_asset_no_only.toString().padStart(6, '0'),
                        am_manufacture_no: val.am_manufacture_no,
                        serialno: val.am_manufacture_no !== null ? val.am_manufacture_no : "Not Updated"
                    }
                    return obj
                })
                setDisArry(xx)
            }
            else {
                const xx = displayarry.map((val, index) => {
                    const obj = {
                        slno: index + 1,
                        am_spare_item_map_slno: val.am_spare_item_map_slno,
                        spare_creation_slno: val.spare_creation_slno,
                        spare_dept_slno: val.spare_dept_slno,
                        spare_deptsec_slno: val.spare_deptsec_slno,
                        deptname: val.deptname,
                        secname: val.secname,
                        category_name: val.category_name,
                        spare_custodian_dept: val.spare_custodian_dept,
                        am_custodian_name: val.am_custodian_name,
                        item_name: val.item_name,
                        spare_asset_no: val.spare_asset_no,
                        spare_asset_no_only: val.spare_asset_no_only,
                        due_date: val.due_date,
                        assetno: val.spare_asset_no + '/' + val.spare_asset_no_only.toString().padStart(6, '0'),
                        am_manufacture_no: val.am_manufacture_no,
                        serialno: val.am_manufacture_no !== null ? val.am_manufacture_no : "Not Updated"
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

    const modeldisplay = useCallback((params) => {
        const data = params.api.getSelectedRows()
        setSelectedData(data[0])
        setFlag(1)
        setOpen(true)
    }, [])

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [setOpen])


    //column title setting
    const [column] = useState([
        {
            headerName: 'Add Details', minWidth: 120, cellRenderer: (params) => {
                return <IconButton onClick={() => AddDetails(params)}
                    sx={{ color: editicon, paddingY: 0.5 }} >
                    <CustomeToolTip title="Add Details">
                        <DescriptionIcon />
                    </CustomeToolTip>
                </IconButton>
            }
        },
        {
            headerName: 'QR Code', minWidth: 80, cellRenderer: (params) => {
                return <IconButton onClick={() => modeldisplay(params)}
                    sx={{ color: editicon, paddingY: 0.5 }} >
                    <CustomeToolTip title="QR Code">
                        <QrCode2Icon />
                    </CustomeToolTip>
                </IconButton>
            }
        },
        { headerName: "Sl No", field: "slno", minWidth: 100 },
        // { headerName: "Department", field: "deptname", minWidth: 250 },
        { headerName: "Department Section", field: "secname", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Category", field: "category_name", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Asset No", field: "assetno", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Serial No", field: "serialno", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Item Name", field: "item_name", autoHeight: true, wrapText: true, minWidth: 350, filter: "true" },
    ])
    return (
        <Fragment>
            {flag === 1 ? <ItemQrDisplayModel open={open} handleClose={handleClose} selectedData={selectedData}
            /> : null}
            <Box sx={{ pt: 1 }}>
                <CusAgGridForMain
                    columnDefs={column}
                    tableData={disArry}
                />
            </Box>
        </Fragment>
    )
}
export default memo(ItemListViewTable)
