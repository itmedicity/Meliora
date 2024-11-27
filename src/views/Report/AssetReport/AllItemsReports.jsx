import React, { useEffect, useCallback, memo, useState, useMemo } from 'react'
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
import CustomBackDrop from 'src/views/Components/CustomBackDrop';
import { Checkbox, CssVarsProvider, } from '@mui/joy';
import AMCustodianDeptSelect from 'src/views/CommonSelectCode/AMCustodianDeptSelect';
import { useQuery } from 'react-query';

const AllItemsReports = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [TableData, setTableData] = useState([]);
    const [exports, setexport] = useState(0)
    const [open, setOpen] = useState(false)
    const [selectedDept, setSelectedDept] = useState(null);
    const [allDetailsCheck, setallDetailsCheck] = useState(true)
    const [SortDetailsCheck, setSortDetailsCheck] = useState(false)

    const custodian = useMemo(() => {
        if (selectedDept) {
            return selectedDept.am_custodian_slno;
        }
        return null;
    }, [selectedDept]);

    const { data, isLoading, isError } = useQuery(
        ['getAllItemsInAsset', selectedDept],
        async () => {
            const result = await axioslogin.get('/amReport/getAllItemList');
            return result.data;
        },
        { enabled: !!selectedDept || allDetailsCheck }
    );

    useEffect(() => {
        if (isLoading) {
            setOpen(true);
            return;
        }
        if (isError) {
            warningNotify("Failed to fetch items");
            setOpen(false);
            return;
        }
        if (data?.success === 1) {
            const filteredData = custodian
                ? data.data.filter(
                    item =>
                        item.item_custodian_dept === custodian ||
                        item.spare_custodian_dept === custodian
                )
                : data.data;

            const tableDataa = filteredData.map(val => ({
                item_creation_slno: val.item_creation_slno,
                asset_spare: val.asset_spare === 1 ? "Asset" : "Spare",
                am_item_map_slno: val.am_item_map_slno ?? "Not Given",
                item_name: val.item_name ?? "Not Given",
                asset_type_name: val.asset_type_name ?? "Not Given",
                item_type_name: val.item_type_name ?? "Not Given",
                category_name: val.category_name ?? "Not Given",
                subcategory_name: val.subcategory_name ?? "Not Given",
                group_name: val.group_name ?? "Not Given",
                sub_group_name: val.sub_group_name ?? "Not Given",
                model_name: val.model_name ?? "Not Given",
                manufacture_name: val.manufacture_name ?? "Not Given",
                item_model_num: val.item_model_num ?? "Not Given",
                uom_name: val.uom_name ?? "Not Given",
                item_creation_count:
                    (val.am_item_map_slno === null && val.am_spare_item_map_slno === null)
                        ? 0
                        : val.item_creation_count,
            }));

            setTableData(tableDataa);
            setOpen(false);
        } else {
            warningNotify("No Items Added");
            setTableData([]);
            setOpen(false);
        }
    }, [data, isLoading, isError, custodian, selectedDept]);



    const [columnDefs] = useState([
        { headerName: "SlNo", field: "item_creation_slno", autoHeight: true, wrapText: true, minWidth: 80 },
        { headerName: "Asset/Spare", field: "asset_spare", autoHeight: true, wrapText: true, minWidth: 100 },
        { headerName: "Item Name", field: "item_name", autoHeight: true, wrapText: true, minWidth: 400, filter: "true" },
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
        { headerName: "Item Count", field: "item_creation_count", autoHeight: true, wrapText: true, minWidth: 50, filter: "true" },
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



    const handleCheckboxAll = (event) => {
        setallDetailsCheck(event.target.checked);
        setSortDetailsCheck(false)
        setSelectedDept(null)

    };
    const handleCheckboxSort = (event) => {
        setSortDetailsCheck(event.target.checked);
        setallDetailsCheck(false)
    };

    return (

        <CardCloseOnly
            title='Asset Item Report'
            close={backToSetting}
        >
            <CustomBackDrop open={open} text="Please Wait" />
            <Paper
                square
                sx={{
                    width: { md: '100%', lg: '100%', xl: '100%' },
                    p: 1
                }}
            >
                <Paper
                    square
                    sx={{
                        backgroundColor: '#f0f3f5',
                        display: 'flex',
                        borderColor: '#d3d3d3',
                    }}
                >
                    <Box sx={{ flex: 1, display: 'flex' }}>
                        <Box sx={{ margin: 'auto', display: 'flex', gap: 4, }}>

                            <Box sx={{ pt: .8 }}>
                                <CssVarsProvider>
                                    <Checkbox color="primary" variant="outlined" label="All"
                                        checked={allDetailsCheck}
                                        onChange={handleCheckboxAll} />
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ pt: .8 }}>
                                <CssVarsProvider>
                                    <Checkbox color="primary" variant="outlined" label="Sort by"
                                        checked={SortDetailsCheck}
                                        onChange={handleCheckboxSort}
                                    />
                                </CssVarsProvider>
                            </Box>

                            {SortDetailsCheck === true ? <Box sx={{ display: 'flex', pt: .3 }}>
                                <Box sx={{ width: 240 }}>
                                    <AMCustodianDeptSelect selectedDept={selectedDept} setSelectedDept={setSelectedDept} />

                                </Box>

                            </Box> : null}
                        </Box>
                    </Box>
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


