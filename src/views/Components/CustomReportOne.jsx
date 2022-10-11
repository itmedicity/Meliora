import React, { memo } from 'react'
import { Box, Paper } from '@mui/material'
import CusIconButton from '../Components/CusIconButton';
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import DownloadIcon from '@mui/icons-material/Download'
import CustomeToolTip from './CustomeToolTip'
import CustomReportMenuSelect from './CustomReportMenuSelect';
import CustomAGReportDispaly from './CustomAGReportDispaly';
import TextFieldCustom from './TextFieldCustom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { ActionTyps } from 'src/redux/constants/action.type'
import { warningNotify } from '../Common/CommonCode';
const CustomReportOne = ({ columnDefs,
    tableData,
    SelectFilter,
    columnDefForTable,
    tableDataForTable,
    onClick, startdate, setstartDate, setdayselect }) => {

    const history = useHistory()
    const dispatch = useDispatch();
    //month format
    const updatedate = (e) => {
        setdayselect(1)
        setstartDate(e.target.value)
    }
    const CloseReport = () => {
        dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 0 })
        history.push(`/Home/Reports`)
    }

    const onExportClick = () => {
        if (tableDataForTable.length === 0) {
            warningNotify("Please Click The Search Button")
        }
        else {
            dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 1 })
        }

    }
    return (
        <Box>
            <Paper
                square
                sx={{
                    height: { xs: 550, sm: 550, md: 400, lg: 400, xl: 850 },
                    p: 0.5,

                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        // backgroundColor: 'blue',
                    }}
                >
                    <Paper
                        square
                        sx={{
                            //backgroundColor: 'blue',
                            width: { md: '20%', lg: '20%', xl: '15%' },
                            height: { xs: 540, sm: 540, md: 400, lg: 400, xl: 840 },
                        }}
                    >

                        <Paper
                            square
                            sx={{
                                backgroundColor: '#f0f3f5',
                                display: 'flex',
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                gap: 0.1,
                                p: 0.3,
                            }}
                        >
                            <CusIconButton variant="outlined" size="sm" color="success" onClick={onClick}>
                                <SearchIcon />
                            </CusIconButton>

                        </Paper>

                        <Paper
                            square
                            sx={{
                                // backgroundColor: 'blue',
                                px: 1, py: 3,
                                alignItems: 'flex-start',

                            }}
                        >
                            <TextFieldCustom
                                placeholder="Select Date"
                                type="date"
                                size="sm"
                                min={new Date()}
                                name="startdate"
                                value={startdate}
                                onchange={updatedate}
                            />

                        </Paper>
                        <Paper
                            square
                            sx={{
                                //backgroundColor: 'green',
                                px: 1, py: 3,
                                alignItems: 'flex-start',
                                height: { xs: 350, sm: 350, md: 350, lg: 350, xl: 350 },
                            }}
                        >



                            <CustomReportMenuSelect
                                columnDefs={columnDefs}
                                SelectFilter={SelectFilter}
                                tableData={tableData}
                                sx={{
                                    height: { xs: 350, sm: 350, md: 350, lg: 350, xl: 350 },
                                    width: '100%',
                                    pt: 3
                                }}
                            />

                        </Paper>
                        {/* </Box>

                        </Box> */}


                    </Paper>

                    <Paper
                        square
                        sx={{
                            backgroundColor: 'black',
                            //  backgroundColor: 'lightGrey',
                            width: { md: '80%', lg: '80%', xl: '85%' },
                            height: { xs: 540, sm: 540, md: 540, lg: 548, xl: 840 },
                        }}
                    >
                        {/* Rigth Side Menu  */}
                        <Paper
                            square
                            sx={{
                                backgroundColor: '#f0f3f5',
                                display: 'flex',
                                flexWrap: 'wrap',
                                flexDirection: 'row-reverse',
                                // alignItems: "",
                                gap: 0.1,
                                p: 0.3,
                                borderLeft: 2,
                                borderColor: '#d3d3d3',
                            }}
                        >
                            <CustomeToolTip title="Close" placement="bottom">
                                <Box>
                                    <CusIconButton variant="outlined" size="sm" color="success" onClick={CloseReport}>
                                        <CloseIcon />
                                    </CusIconButton>
                                </Box>
                            </CustomeToolTip>

                            <CustomeToolTip title="Download" placement="bottom">
                                <Box>
                                    <CusIconButton variant="outlined" size="sm" color="success" onClick={onExportClick}>
                                        <DownloadIcon />
                                    </CusIconButton>
                                </Box>
                            </CustomeToolTip>
                        </Paper>
                        <Box
                            sx={{
                                borderLeft: 2,
                                borderColor: '#d3d3d3',
                            }}
                        >
                            {/* Table Component */}
                            <CustomAGReportDispaly
                                columnDefForTable={columnDefForTable}
                                tableDataForTable={tableDataForTable}

                            />
                        </Box>
                        {/* Rigth Side Menu  */}
                    </Paper>

                </Box>
            </Paper>
        </Box>
    )
}

export default memo(CustomReportOne)