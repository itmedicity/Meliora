import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import TextComponent from 'src/views/Components/TextComponent'
import AmSubCategryWOName from 'src/views/CommonSelectCode/AmSubCategryWOName'
import AmCategorySelWOName from 'src/views/CommonSelectCode/AmCategorySelWOName'
import AmGroupSelWOName from 'src/views/CommonSelectCode/AmGroupSelWOName'
import AmSubGroupWOName from 'src/views/CommonSelectCode/AmSubGroupWOName'
import AmModelSelWOName from 'src/views/CommonSelectCode/AmModelSelWOName'
import AmSubModelWOName from 'src/views/CommonSelectCode/AmSubModelWOName'
import AmManufacWOName from 'src/views/CommonSelectCode/AmManufacWOName'
import AmModelNumberSelect from 'src/views/CommonSelectCode/AmModelNumberSelect'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useNavigate } from 'react-router-dom'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import { taskColor } from 'src/color/Color'
import { getCategory } from 'src/redux/actions/AmCategoryList.action'
import { getGroup } from 'src/redux/actions/AmGroupList.action'
import { getAmManufacture } from 'src/redux/actions/AmManufactureList.actions'
import { getAmModel } from 'src/redux/actions/AmModelList.action'
import { useDispatch } from 'react-redux'
import { Checkbox, CircularProgress, Option, Select, Table, Tooltip, Box } from '@mui/joy'
import SearchIcon from '@mui/icons-material/Search';
import AssetCustodianDepartment from 'src/views/CommonSelectCode/AssetCustodianDepartment'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNotify, infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
import { getEmpID } from 'src/redux/reducers/LoginReducer'

const CustodianTransfer = () => {

    const dispatch = useDispatch()
    const history = useNavigate();


    const [category, setCategory] = useState(0)
    const [subcategory, setSubcategory] = useState(0)
    const [group, setGroup] = useState(0)
    const [model, setModel] = useState(0)
    const [submodel, setSubmodel] = useState(0)
    const [subgroup, setSubGroup] = useState(0)
    const [manufacture, setManufacture] = useState(0)
    const [modelNumber, setModelNumber] = useState('')
    const [custoDian, setCustodian] = useState(0)
    const [custodianAllDetails, setcustodianAllDetails] = useState({})
    const [itemName, setitemName] = useState('')
    const [itemNumber, setItemNumber] = useState('')
    const [assetOrSpare, setAssetOrSpare] = useState(0);
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false);
    const [transferCustodian, settransferCustodian] = useState(0)
    const [transferCustodianDetails, settransferCustodianDetails] = useState({})
    const [selectedRows, setSelectedRows] = useState([]);
    const { am_custodian_dept_slno, am_custodian_deptsec_slno } = transferCustodianDetails


    const backtoSetting = () => history('/Home/Settings')

    useEffect(() => {
        try {
            dispatch(getCategory())
            dispatch(getGroup())
            dispatch(getAmManufacture())
            dispatch(getAmModel())
        } catch (error) {

            return;
        }
    }, [dispatch])



    const id = useSelector(getEmpID)

    const postdata = useMemo(
        () => ({
            category,
            subcategory,
            group,
            model,
            submodel,
            subgroup,
            manufacture,
            modelNumber,
            itemName,
            itemNumber,
            custoDian,
        }),
        [
            category,
            subcategory,
            group,
            model,
            submodel,
            subgroup,
            manufacture,
            modelNumber,
            itemName,
            itemNumber,
            custoDian,
        ]
    );

    const resetData = useCallback(() => {
        setCategory(0);
        setSubcategory(0);
        setGroup(0);
        setModel(0);
        setSubmodel(0);
        setSubGroup(0);
        setManufacture(0);
        setModelNumber('');
        setCustodian(0);
        settransferCustodian(0)
        setcustodianAllDetails({});
        settransferCustodianDetails({});
        setTableData([]);
        setAssetOrSpare(0);
        setItemNumber('');
        setitemName('');
    }, [setCustodian, settransferCustodian]);

    const SearchItem = useCallback(async (e) => {
        e.preventDefault();
        if (!assetOrSpare) {
            infoNotify("Please select item type: Asset or Spare");
            return;
        }
        if (!custoDian) {
            infoNotify("Please Select Custodian ");
            return;
        }
        try {
            setLoading(true);
            if (assetOrSpare !== 0) {
                const apiResponse = (assetOrSpare === 1) ? await axioslogin.post('/assetDeptTransfer/getAssetUnderCustodian', postdata) :
                    await axioslogin.post('/assetDeptTransfer/getSpareUnderCustodian', postdata)
                const { success, data } = apiResponse.data
                setTableData(success === 1 ? data : [])
                setSelectedRows(success === 1 ? data : [])
            }

            // let result;
            // if (assetOrSpare === "1") {
            //     result = await axioslogin.post('/assetDeptTransfer/getAssetUnderCustodian', postdata);
            // } else if (assetOrSpare === "2") {
            //     result = await axioslogin.post('/assetDeptTransfer/getSpareUnderCustodian', postdata);
            // }
            // const { success, data } = result.data;
            // setTableData(success === 1 ? data : []);
        } catch (err) {
            errorNotify(`Error getting Api - GetAsset & Spare info ${err}`)
            setTableData([]);
            setLoading(false);
            return;
        } finally {
            setLoading(false);
        }
    }, [assetOrSpare, postdata]);


    // Initially select all rows
    // useEffect(() => {
    //     if (tableData.length > 0) {
    //         setSelectedRows(tableData);
    //     } else {
    //         setSelectedRows([]);
    //     }
    // }, [tableData]);



    // Check if all rows are selected
    const allSelected = tableData.length > 0 && selectedRows.length === tableData.length;

    // Handle single row selection
    const handleCheckboxChange = useCallback((row) => {
        const isSelected = selectedRows.some((r) => r.am_item_map_slno === row.am_item_map_slno);
        if (isSelected) {
            setSelectedRows((prev) => prev.filter((r) => r.am_item_map_slno !== row.am_item_map_slno));
        } else {
            setSelectedRows((prev) => [...prev, row]);
        }
    }, [selectedRows]);



    const handleSelectAll = () => {
        if (allSelected) {
            setSelectedRows([]);
        } else {
            setSelectedRows(tableData);
        }
    };


    // const TransferItems = useCallback((e) => {
    //     e.preventDefault();
    //     const patchData = {
    //         assetOrSpare,
    //         selectedRows,
    //         custoDian,
    //         transferCustodian,
    //         am_custodian_dept_slno,
    //         am_custodian_deptsec_slno,
    //         id
    //     };
    //     const updateAssetTransfer = async (patchData) => {
    //         try {
    //             const result = await axioslogin.patch('/assetDeptTransfer/TransferAssetUnderCustodian', patchData);
    //             const { message, success } = result.data;
    //             if (success === 1) {
    //                 succesNotify(message);
    //                 resetData()
    //             }
    //             else {
    //                 infoNotify(message);
    //             }
    //         } catch (error) {
    //             errorNotify("error Occured while transfer")
    //         }
    //     };
    //     const updateSpareTransfer = async (patchData) => {
    //         try {
    //             const result = await axioslogin.patch('/assetDeptTransfer/TransferSpareUnderCustodian', patchData);
    //             const { message, success } = result.data;
    //             if (success === 1) {
    //                 succesNotify(message);
    //                 resetData()
    //             }
    //             else {
    //                 infoNotify(message);
    //             }
    //         } catch (error) {
    //             errorNotify("error Occured while transfer")
    //         }
    //     };

    //     if (assetOrSpare === 1) {
    //         updateAssetTransfer(patchData);
    //     }
    //     else if (assetOrSpare === 2) {
    //         updateSpareTransfer(patchData);
    //     }
    // }, [selectedRows, custoDian, transferCustodian, am_custodian_dept_slno, am_custodian_deptsec_slno, id, resetData])


    const TransferItems = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                const patchData = {
                    assetOrSpare,
                    selectedRows,
                    custoDian,
                    transferCustodian,
                    am_custodian_dept_slno,
                    am_custodian_deptsec_slno,
                    id,
                };

                let result;
                if (assetOrSpare === 1) {
                    result = await axioslogin.patch(
                        "/assetDeptTransfer/TransferAssetUnderCustodian",
                        patchData
                    );
                } else if (assetOrSpare === 2) {
                    result = await axioslogin.patch(
                        "/assetDeptTransfer/TransferSpareUnderCustodian",
                        patchData
                    );
                }

                if (result) {
                    const { message, success } = result.data;
                    if (success === 1) {
                        succesNotify(message);
                        resetData();
                    } else {
                        infoNotify(message);
                    }
                }
            } catch (error) {
                errorNotify("Error occurred while transfer");
            }
        },
        [
            assetOrSpare,
            selectedRows,
            custoDian,
            transferCustodian,
            am_custodian_dept_slno,
            am_custodian_deptsec_slno,
            id,
            resetData,
        ]
    );

    return (
        <Box sx={{ flexGrow: 1, }}>
            <CardMasterClose title="Custodian Transfer" close={backtoSetting}>
                <Box sx={{ height: '80vh' }}>

                    <Box sx={{ m: 1, display: 'flex', flexWrap: 'wrap', gap: .5 }}>
                        <Box sx={{ flex: 1.5 }}>
                            <TextComponent text={'Custodian Department'} sx={{
                                fontSize: 14, fontWeight: 600, color: taskColor.darkPurple,
                                pl: 0.5, letterSpacing: 0.5,
                            }} />
                            <AssetCustodianDepartment
                                custoDian={custoDian}
                                setCustodian={setCustodian}
                                setcustodianAllDetails={setcustodianAllDetails}
                                custodianAllDetails={custodianAllDetails} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <TextComponent text={'Asset or Spare'} sx={{
                                fontSize: 14, fontWeight: 600, color: taskColor.darkPurple,
                                pl: 0.5, letterSpacing: 0.5,
                            }} />
                            <Select
                                size="sm"
                                name="AssetOrSpare"
                                value={assetOrSpare}
                                onChange={(e, newValue) => setAssetOrSpare(newValue)}
                                placeholder="Select Type"
                            >
                                <Option value={0}>Select Type</Option>
                                <Option value={1}>Asset</Option>
                                <Option value={2}>Spare</Option>
                            </Select>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <TextComponent text={'Item Number'} sx={{ fontSize: 14, fontWeight: 600, color: taskColor.darkPurple, pl: 0.5, letterSpacing: 0.5, }} />
                            <TextFieldCustom
                                type='number'
                                size="sm"
                                name="itemNumber"
                                placeholder={"000000"}
                                value={itemNumber}
                                onchange={(e) => setItemNumber(e.target.value)}
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <TextComponent text={'Category'} sx={{ fontSize: 14, fontWeight: 600, color: taskColor.darkPurple, pl: 0.5, letterSpacing: 0.5, }} />
                            <AmCategorySelWOName category={category} setCategory={setCategory} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <TextComponent text={'Subcategory'} sx={{ fontSize: 14, fontWeight: 600, color: taskColor.darkPurple, pl: 0.5, letterSpacing: 0.5, }} />
                            <AmSubCategryWOName subcategory={subcategory} setSubcategory={setSubcategory} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <TextComponent text={'Group'} sx={{ fontSize: 14, fontWeight: 600, color: taskColor.darkPurple, pl: 0.5, letterSpacing: 0.5, }} />
                            <AmGroupSelWOName group={group} setGroup={setGroup} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <TextComponent text={'Subgroup'} sx={{ fontSize: 14, fontWeight: 600, color: taskColor.darkPurple, pl: 0.5, letterSpacing: 0.5, }} />
                            <AmSubGroupWOName subgroup={subgroup} setSubGroup={setSubGroup} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <TextComponent text={'Model'} sx={{ fontSize: 14, fontWeight: 600, color: taskColor.darkPurple, pl: 0.5, letterSpacing: 0.5, }} />
                            <AmModelSelWOName model={model} setModel={setModel} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <TextComponent text={'Submodel'} sx={{ fontSize: 14, fontWeight: 600, color: taskColor.darkPurple, pl: 0.5, letterSpacing: 0.5, }} />
                            <AmSubModelWOName submodel={submodel} setSubmodel={setSubmodel} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <TextComponent text={'Manufacture'} sx={{ fontSize: 14, fontWeight: 600, color: taskColor.darkPurple, pl: 0.5, letterSpacing: 0.5, }} />
                            <AmManufacWOName manufacture={manufacture} setManufacture={setManufacture} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <TextComponent text={'Model No.'} sx={{ fontSize: 14, fontWeight: 600, color: taskColor.darkPurple, pl: 0.5, letterSpacing: 0.5, }} />
                            <AmModelNumberSelect modelNumber={modelNumber} setModelNumber={setModelNumber} />
                        </Box>
                        <Box sx={{ flex: 2, }}>
                            <TextComponent text={'Item Name'} sx={{ fontSize: 14, fontWeight: 600, color: taskColor.darkPurple, pl: 0.5, letterSpacing: 0.5, }} />
                            <Box sx={{ flex: 1, }}>
                                <TextFieldCustom
                                    type="text"
                                    size="sm"
                                    name="itemName"
                                    value={itemName}
                                    onchange={(e) => setitemName(e.target.value)}
                                />
                            </Box>
                        </Box>
                        <Tooltip title="Search" placement="top" variant='soft'>
                            <SearchIcon
                                onClick={SearchItem}
                                sx={{ height: 34, width: 34, cursor: 'pointer', color: 'white', mt: 2.3, bgcolor: taskColor.purple, p: .3, borderRadius: 2 }} />
                        </Tooltip>
                    </Box>
                    {tableData.length > 0 ? (

                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', pt: 1, gap: .8, bgcolor: taskColor.lightpurple }}>
                            <Box sx={{ flex: .5 }}> </Box>
                            <Box sx={{ flex: 1 }}>
                                <TextComponent text={'Transfer to Custodian Department'} sx={{
                                    fontSize: 14, fontWeight: 600, color: taskColor.darkPurple, pl: 0.5,
                                    letterSpacing: 0.5,
                                }} />
                                <AssetCustodianDepartment
                                    custoDian={transferCustodian}
                                    setCustodian={settransferCustodian}
                                    setcustodianAllDetails={settransferCustodianDetails}
                                    custodianAllDetails={transferCustodianDetails} />
                            </Box>
                            <Tooltip
                                title="Selected items will be transferred to the chosen custodian department"
                                placement="top"
                                variant='outlined'
                                sx={{
                                    bgcolor: 'white',
                                    color: taskColor.darkPurple,
                                    fontWeight: 600,
                                    fontSize: 13,
                                    borderRadius: "8px",

                                }}
                            >
                                <Box
                                    onClick={TransferItems}
                                    sx={{
                                        width: 150,
                                        height: 30,
                                        border: 1,
                                        py: 0.1,
                                        my: 2.5,
                                        borderColor: taskColor.purple,
                                        textAlign: 'center',
                                        borderRadius: 1,
                                        color: 'white',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 0.5,
                                        bgcolor: taskColor.purple,
                                        fontSize: 16,
                                        fontsize: 12,
                                        boxShadow: '2px 4px 6px rgba(0,0,0,0.4)',
                                        '&:active': {
                                            transform: 'scale(0.98)',
                                            boxShadow: '1px 2px 3px rgba(0,0,0,0.3)'
                                        }
                                    }}
                                >
                                    Transfer
                                </Box>
                            </Tooltip>
                            <Box sx={{ flex: .5 }}></Box>
                        </Box>

                    ) : null}

                    {loading ? (
                        <Box style={{ textAlign: "center", padding: "20px" }}>
                            <CircularProgress />
                        </Box>
                    ) : tableData.length > 0 ? (
                        <Box sx={{ flex: 1, my: 1, height: "50vh", overflow: "auto" }}>
                            <Table stickyHeader size="sm" borderAxis="both">
                                <thead>
                                    <tr>
                                        <th style={{ width: 50, textAlign: "center" }}>Slno</th>
                                        <th style={{ width: 80, textAlign: "center" }}>
                                            <Checkbox
                                                checked={allSelected}
                                                indeterminate={
                                                    selectedRows.length > 0 &&
                                                    selectedRows.length < tableData.length
                                                }
                                                onChange={handleSelectAll}
                                            />
                                        </th>
                                        <th style={{ width: 130 }}>Item Number</th>
                                        <th>Category</th>
                                        <th>Item Name</th>
                                        <th>Custodian Department</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((row, index) => {
                                        const isChecked = selectedRows.some(
                                            (r) => r.am_item_map_slno === row.am_item_map_slno
                                        );
                                        return (
                                            <tr key={row.am_item_map_slno}>
                                                <td style={{ textAlign: "center" }}>{index + 1}</td>
                                                <td style={{ textAlign: "center" }}>
                                                    <Checkbox
                                                        checked={isChecked}
                                                        onChange={() => handleCheckboxChange(row)}
                                                    />
                                                </td>
                                                <td>
                                                    {row.item_prefix}/{String(row.item_suffix).padStart(6, "0")}
                                                </td>
                                                <td>{row.category_name}</td>
                                                <td>{row.item_name}</td>
                                                <td>{row.am_custodian_name}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Box>
                    ) : (
                        <Box style={{ textAlign: "center", padding: "30px", }}>
                            No Data Found
                        </Box>
                    )}
                </Box >
            </CardMasterClose >
        </Box >
    )
}

export default memo(CustodianTransfer)

