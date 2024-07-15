import React, { useEffect, memo, useCallback, useState, Fragment } from 'react'
import { Box } from '@mui/material'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardMasterClose from 'src/views/Components/CardMasterClose';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { Paper } from '@mui/material'
import CustomBackDrop from 'src/views/Components/CustomBackDrop';
import { axioslogin } from 'src/views/Axios/Axios';
import { useSelector } from 'react-redux'
import _ from 'underscore';
import { warningNotify } from 'src/views/Common/CommonCode';

const CondemnationList = () => {
    const history = useHistory()
    const [open, setOpen] = useState(false)
    const [tableData, setTableData] = useState([])
    const deptsecid = useSelector((state) => state.LoginUserData.empsecid, _.isEqual)

    useEffect(() => {
        setOpen(true)
        const getCondemnatnList = async (deptsecid) => {
            const result = await axioslogin.get(`/SpareCondemService/CondemnationList/${deptsecid}`)
            const { success, data } = result.data
            if (success === 1) {
                const dataaa = data?.map((val) => {
                    const obj = {
                        ...val,
                        spareNo: val.spare_asset_no + '/' + val.spare_asset_no_only.toString().padStart(6, '0'),
                    }
                    return obj
                })
                setTableData(dataaa);
                setOpen(false)
            }
            else {
                setTableData([])
                setOpen(false)
                warningNotify("No Spare under Condemnation!!!!")
            }
        }
        getCondemnatnList(deptsecid)
    }, [deptsecid])

    //column title setting
    const [column] = useState([
        // {
        //     headerName: 'Add Details', minWidth: 120, cellRenderer: (params) => {
        //         return <IconButton onClick={() => AddDetails(params)}
        //             sx={{ color: editicon, paddingY: 0.5 }} >
        //             <CustomeToolTip title="Add Details">
        //                 <DescriptionIcon />
        //             </CustomeToolTip>
        //         </IconButton>
        //     }
        // },
        // {
        //     headerName: 'QR Code', minWidth: 80, cellRenderer: (params) => {
        //         return <IconButton onClick={() => modeldisplay(params)}
        //             sx={{ color: editicon, paddingY: 0.5 }} >
        //             <CustomeToolTip title="QR Code">
        //                 <QrCode2Icon />
        //             </CustomeToolTip>
        //         </IconButton>
        //     }
        // },
        { headerName: "Sl No", field: "slno", minWidth: 50 },
        { headerName: "Item Name", field: "item_name", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Category", field: "category_name", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Spare No", field: "spareNo", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },

    ])


    const backtoSetting = useCallback(() => {

        history.push('/Home')
    }, [history])

    const rowHeight = 35
    const headerHeight = 30
    const defaultColDef = {
    }
    const onGridReady = (params) => {
        params.api.sizeColumnsToFit()
    }

    const rowStyle = {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }

    return (


        <Fragment>
            <CardMasterClose
                title="Spare Condemnation List"
                close={backtoSetting}
            >
                <CustomBackDrop open={open} text="Please Wait" />
                <Box sx={{ pt: 1 }}>
                    <Paper elevation={0}>
                        <Box
                            className="ag-theme-alpine ListItemScrol"
                            sx={{
                                height: 760,
                                width: "100%"
                            }}
                        >
                            <AgGridReact
                                columnDefs={column}
                                rowData={tableData}
                                defaultColDef={defaultColDef}
                                rowHeight={rowHeight}
                                headerHeight={headerHeight}
                                rowDragManaged={true}
                                animateRows={true}
                                onGridReady={onGridReady}
                                rowSelection="multiple"
                                rowStyle={rowStyle}

                            ></AgGridReact>
                        </Box>
                    </Paper>
                </Box>
            </CardMasterClose>
        </Fragment>
    )
}

export default memo(CondemnationList)