import { Box, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Virtuoso } from 'react-virtuoso'
import { axioslogin } from 'src/views/Axios/Axios'
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import ServiceDetailsModal from './ServiceDetailsModal'
import CircleIcon from '@mui/icons-material/Circle';


const SpareSErviceList = () => {
    const [serviceList, setServiceList] = useState([])
    const [flag, setFlag] = useState(1)
    const [open, setOpen] = useState(false)
    const [serviceDetails, setserviceDetails] = useState([])
    const [assetServiceListt, setassetServiceListt] = useState([])
    const [count, setCount] = useState(0)
    const combinedList = [...serviceList, ...assetServiceListt]; // Combine both lists

    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })

    const ServiceDetailsView = useCallback((val) => {
        setFlag(1)
        setOpen(true)
        setserviceDetails(val)
    }, [])

    useEffect(() => {
        const getServiceList = async (empsecid) => {
            const result = await axioslogin.get(`/SpareCondemService/ServiceList/${empsecid}`)
            const { success, data } = result.data
            if (success === 1) {
                setServiceList(data)
            }
            else {
                setServiceList([])
            }
        }
        getServiceList(empsecid)
    }, [empsecid, count])


    useEffect(() => {
        const getAssetServiceList = async (empsecid) => {
            const result = await axioslogin.get(`/SpareCondemService/AssetServiceList/${empsecid}`)
            const { success, data } = result.data
            if (success === 1) {
                setassetServiceListt(data)
            }
            else {
                setassetServiceListt([])
            }
        }
        getAssetServiceList(empsecid)
    }, [empsecid, count])


    const uniqueHoldReasons = [...new Map(
        [
            ...serviceList
                .map(item => ({ holdId: item.spare_service_hold, reason: item.cm_hold_reason, holdColor: item.hold_color }))
                .filter(item => item.holdId && item.reason && item.holdColor),
            ...assetServiceListt
                .map(item => ({ holdId: item.asset_item_service_hold, reason: item.cm_hold_reason, holdColor: item.hold_color }))
                .filter(item => item.holdId && item.reason && item.holdColor)
        ]
            .map(item => [item.holdId, item])
    ).values()];

    return (
        <Box sx={{
            flex: 1,
            height: {
                xs: '100vh',
                sm: '90vh',
                md: '85vh',
                lg: '80vh',
                xl: '75vh'
            },
        }}>
            <Box sx={{ flex: 1, height: 28, bgcolor: '#F0F3F5', color: 'grey', fontWeight: 550, py: .5, pl: 2 }}>
                Service List
            </Box>
            {flag === 1 ?
                <ServiceDetailsModal open={open} setOpen={setOpen}
                    setFlag={setFlag}
                    serviceDetails={serviceDetails} setCount={setCount} count={count} />
                : null}
            {combinedList.length !== 0 ?
                <Box sx={{ width: '100%', overflow: 'auto', p: 1, }}>
                    <Box sx={{ width: '100%', }}>
                        <Box sx={{
                            height: 45, mt: .5, display: 'flex', borderBottom: 1, borderTop: 1, borderColor: 'lightgray', pt: 1.5,
                            bgcolor: 'white'
                        }}>
                            <Box sx={{ flex: .7, pl: 1.7, fontWeight: 600, color: '#444444', fontSize: 12 }}>#</Box>
                            <Box sx={{ flex: .7, fontWeight: 600, color: '#444444', fontSize: 12 }}>Action</Box>
                            <Box sx={{ flex: 1, fontWeight: 600, color: '#444444', fontSize: 12 }}>Asset/Spare</Box>
                            <Box sx={{ flex: 2, fontWeight: 600, color: '#444444', fontSize: 12, }}>Asset/Spare No.</Box>
                            <Box sx={{ flex: 3, fontWeight: 600, color: '#444444', fontSize: 12, }}>Category</Box>
                            <Box sx={{ flex: 8, fontWeight: 600, color: '#444444', fontSize: 12, pl: 6 }}>Item Name</Box>
                        </Box>

                        {/* <Virtuoso
                            style={{ height: '73vh' }}
                            totalCount={combinedList.length}
                            itemContent={(index) => {
                                const val = combinedList[index];
                                const isServiceItem = index < serviceList.length;

                                return (
                                    <Box key={val.slno} sx={{
                                        flex: 1, display: 'flex', mt: .3, borderBottom: .5, borderColor: 'lightgrey', minHeight: 30,
                                        maxHeight: 80,
                                        background: 'white',

                                        pt: .5,
                                    }}>
                                        <Box sx={{ flex: .7, pl: 1.7, color: '#444444', fontSize: 14 }}>
                                            {index + 1}
                                        </Box>
                                        <Box sx={{ flex: .7, color: '#444444', fontSize: 14 }}>
                                            <BuildCircleIcon sx={{ color: '#4C5270', cursor: 'pointer' }} onClick={() => ServiceDetailsView(val)} />
                                        </Box>
                                        <Box sx={{ flex: 1, color: '#444444', fontSize: 14 }}>
                                            {val.spare_asset_no !== undefined ? 'Spare' : 'Asset'}
                                        </Box>
                                        <Box sx={{ flex: 2, color: '#444444', fontSize: 14 }}>
                                            {isServiceItem
                                                ? `${val.spare_asset_no}/${val.spare_asset_no_only.toString().padStart(6, '0')}`
                                                : `${val.item_asset_no}/${val.item_asset_no_only.toString().padStart(6, '0')}`}
                                        </Box>
                                        <Box sx={{ flex: 3, color: '#444444', fontSize: 14 }}>
                                            {val.category_name}
                                        </Box>
                                        <Box sx={{ flex: 8, color: '#444444', fontSize: 14, pl: 6 }}>
                                            {val.item_name}
                                        </Box>
                                    </Box>
                                );
                            }}
                        /> */}

                        <Box sx={{ width: '100%', overflow: 'auto', }}>
                            <Box sx={{ width: '100%' }}>
                                <Virtuoso
                                    style={{ height: '70vh' }}
                                    totalCount={combinedList.length}
                                    itemContent={(index) => {
                                        const val = combinedList[index];
                                        const isServiceItem = index < serviceList.length;
                                        return (
                                            <Box
                                                key={val.slno}
                                                sx={{
                                                    flex: 1,
                                                    display: 'flex',
                                                    mt: .3,
                                                    borderBottom: .5,
                                                    borderColor: 'lightgrey',
                                                    minHeight: 30,
                                                    maxHeight: 80,
                                                    background: (val.hold_color),
                                                    pt: .5,
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Box sx={{ flex: .7, pl: 1.7, color: '#444444', fontSize: 14 }}>
                                                    {index + 1}
                                                </Box>
                                                <Box sx={{ flex: .7, color: '#444444', fontSize: 14 }}>
                                                    <BuildCircleIcon sx={{ color: '#4C5270', cursor: 'pointer' }} onClick={() => ServiceDetailsView(val)} />
                                                </Box>
                                                <Box sx={{ flex: 1, color: '#444444', fontSize: 14 }}>
                                                    {val.spare_asset_no !== undefined ? 'Spare' : 'Asset'}
                                                </Box>
                                                <Box sx={{ flex: 2, color: '#444444', fontSize: 14 }}>
                                                    {isServiceItem
                                                        ? `${val.spare_asset_no}/${val.spare_asset_no_only.toString().padStart(6, '0')}`
                                                        : `${val.item_asset_no}/${val.item_asset_no_only.toString().padStart(6, '0')}`}
                                                </Box>
                                                <Box sx={{ flex: 2.5, color: '#444444', fontSize: 14 }}>
                                                    {val.category_name}
                                                </Box>
                                                <Box sx={{ flex: 8, color: '#444444', fontSize: 14, pl: 6 }}>
                                                    {val.item_name}
                                                </Box>
                                            </Box>
                                        );
                                    }}
                                />
                            </Box>
                        </Box>

                    </Box>
                </Box>
                :
                <Box sx={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    pt: 25,
                    fontWeight: 800,
                    fontSize: 25,
                    color: 'lightgrey',
                    height: '100%'
                }}>
                    <Typography>
                        Empty Service List
                    </Typography>
                </Box>
            }
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                {uniqueHoldReasons.map(({ holdId, reason, holdColor }) => (
                    <Box key={holdId} sx={{ display: 'flex', alignItems: 'center', mr: 2, mb: 1 }}>
                        <CircleIcon sx={{ color: (holdColor), fontSize: 18, mr: 1, }} />
                        <Box sx={{ fontSize: 15, color: '#444444', fontWeight: 600 }}>{reason}</Box>
                    </Box>
                ))}
            </Box>

        </Box >
    )
}

export default memo(SpareSErviceList)

// import React, { useEffect, memo, useCallback, useState, Fragment } from 'react'
// import { Box } from '@mui/material'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
// import CardMasterClose from 'src/views/Components/CardMasterClose';
// import { AgGridReact } from 'ag-grid-react'
// import 'ag-grid-community/dist/styles/ag-grid.css'
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
// import { Paper } from '@mui/material'
// import CustomBackDrop from 'src/views/Components/CustomBackDrop';
// import { axioslogin } from 'src/views/Axios/Axios';
// import { useSelector } from 'react-redux'
// import _ from 'underscore';
// import { warningNotify } from 'src/views/Common/CommonCode';

// const SpareSErviceList = () => {
//     const history = useHistory()
//     const [open, setOpen] = useState(false)
//     const [tableData, setTableData] = useState([])
//     const deptsecid = useSelector((state) => state.LoginUserData.empsecid, _.isEqual)

//     useEffect(() => {
//         setOpen(true)
//         const getCondemnatnList = async (deptsecid) => {
//             const result = await axioslogin.get(`/SpareCondemService/ServiceList/${deptsecid}`)
//             const { success, data } = result.data
//             if (success === 1) {
//                 const dataaa = data?.map((val) => {
//                     const obj = {
//                         ...val,
//                         spareNo: val.spare_asset_no + '/' + val.spare_asset_no_only.toString().padStart(6, '0'),
//                     }
//                     return obj
//                 })
//                 setTableData(dataaa);
//                 setOpen(false)
//             }
//             else {
//                 setTableData([])
//                 setOpen(false)
//                 warningNotify("No Spare under Service!!!!")
//             }
//         }
//         getCondemnatnList(deptsecid)
//     }, [deptsecid])

//     //column title setting
//     const [column] = useState([
//         // {
//         //     headerName: 'Add Details', minWidth: 120, cellRenderer: (params) => {
//         //         return <IconButton onClick={() => AddDetails(params)}
//         //             sx={{ color: editicon, paddingY: 0.5 }} >
//         //             <CustomeToolTip title="Add Details">
//         //                 <DescriptionIcon />
//         //             </CustomeToolTip>
//         //         </IconButton>
//         //     }
//         // },
//         // {
//         //     headerName: 'QR Code', minWidth: 80, cellRenderer: (params) => {
//         //         return <IconButton onClick={() => modeldisplay(params)}
//         //             sx={{ color: editicon, paddingY: 0.5 }} >
//         //             <CustomeToolTip title="QR Code">
//         //                 <QrCode2Icon />
//         //             </CustomeToolTip>
//         //         </IconButton>
//         //     }
//         // },
//         { headerName: "Sl No", field: "slno", minWidth: 50 },
//         { headerName: "Item Name", field: "item_name", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
//         { headerName: "Category", field: "category_name", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
//         { headerName: "Spare No", field: "spareNo", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },

//     ])


//     const backtoSetting = useCallback(() => {

//         history.push('/Home')
//     }, [history])

//     const rowHeight = 35
//     const headerHeight = 30
//     const defaultColDef = {
//     }
//     const onGridReady = (params) => {
//         params.api.sizeColumnsToFit()
//     }

//     const rowStyle = {
//         fontFamily: [
//             '-apple-system',
//             'BlinkMacSystemFont',
//             '"Segoe UI"',
//             'Roboto',
//             '"Helvetica Neue"',
//             'Arial',
//             'sans-serif',
//             '"Apple Color Emoji"',
//             '"Segoe UI Emoji"',
//             '"Segoe UI Symbol"',
//         ].join(','),
//     }
//     return (

//         <Fragment>
//             <CardMasterClose
//                 title="Spare Service List"
//                 close={backtoSetting}
//             >
//                 <CustomBackDrop open={open} text="Please Wait" />
//                 <Box sx={{ pt: 1 }}>
//                     <Paper elevation={0}>
//                         <Box
//                             className="ag-theme-alpine ListItemScrol"
//                             sx={{
//                                 height: 760,
//                                 width: "100%"
//                             }}
//                         >
//                             <AgGridReact
//                                 columnDefs={column}
//                                 rowData={tableData}
//                                 defaultColDef={defaultColDef}
//                                 rowHeight={rowHeight}
//                                 headerHeight={headerHeight}
//                                 rowDragManaged={true}
//                                 animateRows={true}
//                                 onGridReady={onGridReady}
//                                 rowSelection="multiple"
//                                 rowStyle={rowStyle}

//                             ></AgGridReact>
//                         </Box>
//                     </Paper>
//                 </Box>
//             </CardMasterClose>
//         </Fragment>
//     )
// }

// export default memo(SpareSErviceList)