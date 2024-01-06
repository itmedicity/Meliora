import React, { useEffect, useCallback, memo, useState } from 'react'
import { Paper, Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import CusIconButton from '../../Components/CusIconButton';
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import CusAgGridForReport from 'src/views/Components/CusAgGridForReport';
import { warningNotify } from '../../Common/CommonCode';
import DownloadIcon from '@mui/icons-material/Download'
import CustomeToolTip from '../../Components/CustomeToolTip'
import { ActionTyps } from 'src/redux/constants/action.type'
import { axioslogin } from 'src/views/Axios/Axios';
import { useDispatch } from 'react-redux';


const AllItemsReports = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [TableData, setTableData] = useState([]);
    const [exports, setexport] = useState(0)
    useEffect(() => {
        const getAllItems = async () => {
            const result = await axioslogin.get('/amReport/getItemList')
            const { success, data } = result.data;
            if (success === 1) {
                const dispalyData = data && data.map((val) => {
                    const obj = {
                        item_creation_slno: val.item_creation_slno,
                        item_name: val.item_name,
                        asset_type_name: val.asset_type_name,
                        item_type_name: val.item_type_name,
                        category_name: val.category_name !== null ? val.category_name : "Not Given",
                        subcategory_name: val.subcategory_name !== null ? val.subcategory_name : "Not Given",
                        group_name: val.group_name !== null ? val.group_name : "Not Given",
                        sub_group_name: val.sub_group_name !== null ? val.sub_group_name : "Not Given",
                        model_name: val.model_name !== null ? val.model_name : "Not Given",
                        manufacture_name: val.manufacture_name !== null ? val.manufacture_name : "Nopt Given",
                        item_model_num: val.item_model_num !== null ? val.item_model_num : "Not Given",
                        uom_name: val.uom_name !== null ? val.uom_name : "Not Given",
                    }
                    return obj
                })
                setTableData(dispalyData)
            } else {
                warningNotify("No Items Added")
                setTableData([])
            }
        }
        getAllItems()
    }, [])


    const [columnDefs] = useState([
        { headerName: "SlNo", field: "item_creation_slno", autoHeight: true, wrapText: true, minWidth: 100 },
        { headerName: "Item Name", field: "item_name", autoHeight: true, wrapText: true, minWidth: 350, filter: "true" },
        { headerName: "Asset Type", field: "asset_type_name", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "Item Type", field: "item_type_name", autoHeight: true, wrapText: true, minWidth: 250 },
        { headerName: "Category", field: "category_name", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "Sub Category", field: "subcategory_name", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "Group Name", field: "group_name", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "Sub Group", field: "sub_group_name", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "Model", field: "model_name", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "Manufacture", field: "manufacture_name", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "Model No", field: "item_model_num", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "UOM", field: "uom_name", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
    ])

    const onExportClick = () => {
        if (TableData.length === 0) {
            warningNotify("No Data For Download, Please select dates")
            setexport(0)
        }
        else {
            setexport(1)
        }
    }

    useEffect(() => {
        if (exports === 1) {
            dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 1 })
            setexport(0)
        }
        else {
            dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 0 })
        }
    }, [exports, dispatch])


    const backToSetting = useCallback(() => {
        history.push(`/Home/Reports`)
    }, [history])
    return (

        <CardCloseOnly
            title='Asset Item Report'
            close={backToSetting}
        >

            <Paper
                square
                sx={{
                    width: { md: '100%', lg: '100%', xl: '100%' },
                    p: 1
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
                        gap: 0.1,
                        p: 0.3,
                        borderLeft: 2,
                        borderColor: '#d3d3d3',
                    }}
                >
                    <CustomeToolTip title="Download" placement="bottom">
                        <Box>
                            <CusIconButton variant="outlined" size="sm" color="success" onClick={onExportClick}>
                                <DownloadIcon />
                            </CusIconButton>
                        </Box>
                    </CustomeToolTip>
                </Paper>
                <CusAgGridForReport
                    columnDefs={columnDefs}
                    tableData={TableData}
                />
            </Paper>
        </CardCloseOnly>
    )
}

export default memo(AllItemsReports)