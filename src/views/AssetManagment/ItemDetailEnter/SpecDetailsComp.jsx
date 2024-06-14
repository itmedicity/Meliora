import React, { memo, useCallback, useState, useEffect } from 'react'
import { Box, Paper, IconButton, Tooltip } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusIconButton from '../../Components/CusIconButton';
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { CssVarsProvider } from '@mui/joy/'
import Table from '@mui/joy/Table';
import ReqRegistItemCmpt from 'src/views/RequestManagement/RequestRegister/ReqRegistItemCmpt';
import { editicon } from 'src/color/Color'
import DeleteIcon from '@mui/icons-material/Delete';
import SpareListSelect from './SpareListSelect';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BlockIcon from '@mui/icons-material/Block';
const SpecDetailsComp = ({ detailArry, assetSpare }) => {
    const { am_item_map_slno, item_custodian_dept } = detailArry

    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const [secFlag, setSpecFlag] = useState(0)
    const [spareFlag, setSpareFlag] = useState(false)
    const [SpecificationFlag, setSpecificationFlag] = useState(false)

    const [specific, setSpecific] = useState('')
    const [specificTable, setSpecificTable] = useState(0)
    const [specificData, setSpecificData] = useState([])
    const [already, setAlready] = useState(0)
    const [alreadyData, setAlreadyData] = useState([])

    const [spare, setSpare] = useState(0)
    const [spareTable, setSpareTable] = useState(0)
    const [spareData, setSpareData] = useState([])
    const [spareNo, setSpareNo] = useState('')

    const updateSpareFlag = useCallback((e) => {
        if (e.target.checked === true) {
            setSpareFlag(true)
            setSpecificationFlag(false)
            setSpecFlag(1)
        } else {
            setSpareFlag(false)
            setSpecificationFlag(false)
            setSpecFlag(0)
        }

    }, [])

    const updateSpecFlag = useCallback((e) => {
        if (e.target.checked === true) {
            setSpecificationFlag(true)
            setSpareFlag(false)
            setSpecFlag(2)
        } else {
            setSpecificationFlag(false)
            setSpareFlag(false)
            setSpecFlag(0)
        }

    }, [])

    const updateSpecific = useCallback((e) => {
        setSpecific(e.target.value)
    }, [setSpecific])

    const AddSpecification = useCallback(() => {

        const newdata = {
            id: Math.ceil(Math.random() * 1000),
            am_item_map_slno: am_item_map_slno,
            specifications: specific,
            create_user: id
        }
        const datass = [...specificData, newdata]

        if (datass.length !== 0) {
            setSpecificData(datass)
            setSpecificTable(1)
            setSpecific('')
        }

    }, [id, am_item_map_slno, specificData, specific])

    const [count, setCount] = useState(0)
    const [alreadytSpare, setAlreadySpare] = useState(0)
    const [alreadytSpareData, setAlreadySpareData] = useState([])
    useEffect(() => {
        const checkinsertOrNotSpeciali = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/SpecificationInsertOrNot/${am_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                setAlready(1)
                setAlreadyData(data)
            }
            else {
                setAlready(0)
                setAlreadyData([])
            }
        }


        const checkinsertOrNotSpareDetails = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/SpareDetailsInsertOrNot/${am_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                const datass = data.map((val, index) => {
                    const obj = {
                        slno: index + 1,
                        asset_spare_slno: val.asset_spare_slno,
                        am_item_map_slno: val.am_item_map_slno,
                        am_spare_item_map_slno: val.am_spare_item_map_slno,
                        item_name: val.item_name,
                        assetno: val.spare_asset_no + '/' + val.spare_asset_no_only.toString().padStart(6, '0')

                    }
                    return obj
                })
                setAlreadySpare(1)
                setAlreadySpareData(datass)
            }
            else {
                setSpareTable(0)
                setAlreadySpareData([])
            }
        }


        checkinsertOrNotSpeciali(am_item_map_slno)
        checkinsertOrNotSpareDetails(am_item_map_slno)
    }, [am_item_map_slno, setAlready, setAlreadyData, count, setSpareTable, setSpareData])



    const SaveSpecDetails = useCallback((e) => {

        const postData = specificData && specificData.map((val) => {
            return {
                am_item_map_slno: val.am_item_map_slno,
                specifications: val.specifications,
                status: 1,
                create_user: val.create_user,
            }
        })

        const detailInsert = async (postData) => {
            const result = await axioslogin.post(`/ItemMapDetails/SpecificationInsert`, postData);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                setSpecificData([]);
                setSpecificTable(0)
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }


        const SparepostData = spareData && spareData.map((val) => {
            return {
                am_item_map_slno: val.am_item_map_slno,
                am_spare_item_map_slno: val.am_spare_item_map_slno,
                spare_status: 1,
                create_user: val.create_user,
            }
        })


        const SparedetailInsert = async (SparepostData) => {
            const result = await axioslogin.post(`/ItemMapDetails/SpareDetailsInsert`, SparepostData);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                setSpareData([]);
                setSpareTable(0)
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }


        if (secFlag === 1) {
            SparedetailInsert(SparepostData)

        } else if (secFlag === 2) {
            detailInsert(postData)
        }



    }, [specificData, spareData, setCount, count, secFlag])


    const SpecReferesh = useCallback(() => {
        setSpecific('')

    }, [])

    //column title setting
    const [column] = useState([
        { headerName: "Slno", field: "am_sec_detal_slno" },
        { headerName: "Specifications", field: "specifications", autoHeight: true, wrapText: true, width: 250, filter: "true" },

        {
            headerName: 'Delete', width: 80, cellRenderer: params =>
                <IconButton onClick={() => deleteSelect(params)}
                    sx={{ color: editicon, pt: 0 }} >
                    <CustomeToolTip title="Edit">
                        <DeleteIcon size={15} />
                    </CustomeToolTip>
                </IconButton>
        },
    ])

    //column title setting
    const [columnSpare] = useState([
        { headerName: "Slno", field: "slno" },
        { headerName: "Item Name", field: "item_name", autoHeight: true, wrapText: true, width: 250, filter: "true" },
        { headerName: "Spare No", field: "assetno", autoHeight: true, wrapText: true, width: 250, filter: "true" },
        {
            headerName: 'Condemnation', width: 120, cellRenderer: params =>
                <IconButton onClick={() => contaminationfunctn(params)}
                    sx={{ color: editicon, pt: 0 }} >
                    <CustomeToolTip title="contamination">
                        <BlockIcon size={15} />
                    </CustomeToolTip>
                </IconButton>
        },
        {
            headerName: 'Service', width: 80, cellRenderer: params =>
                <IconButton onClick={() => servicefunctn(params)}
                    sx={{ color: editicon, pt: 0 }} >
                    <CustomeToolTip title="Service">
                        <ManageAccountsIcon size={15} />
                    </CustomeToolTip>
                </IconButton>
        },
    ])


    const contaminationfunctn = useCallback((params) => {
        const data = params.api.getSelectedRows()
        const { am_spare_item_map_slno, asset_spare_slno } = data[0]

        const patchdata = {
            delete_user: id,
            asset_spare_slno: asset_spare_slno,
            am_spare_item_map_slno: am_spare_item_map_slno
        }

        const contaminatnUpdate = async (patchdata) => {
            const result = await axioslogin.patch('/ItemMapDetails/spareContamination', patchdata);
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
            } else {
                warningNotify(message)
                setCount(count + 1)
            }
        }
        contaminatnUpdate(patchdata)
    }, [id, setCount, count])

    const servicefunctn = useCallback((params) => {
        const data = params.api.getSelectedRows()
        const { am_spare_item_map_slno, asset_spare_slno } = data[0]

        const patchdata = {
            delete_user: id,
            asset_spare_slno: asset_spare_slno,
            am_spare_item_map_slno: am_spare_item_map_slno
        }

        const ServiceUpdate = async (patchdata) => {
            const result = await axioslogin.patch('/ItemMapDetails/spareService', patchdata);
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
            } else {
                warningNotify(message)
                setCount(count + 1)
            }
        }
        ServiceUpdate(patchdata)
    }, [id, setCount, count])


    const deleteSelect = useCallback((params) => {
        const data = params.api.getSelectedRows()
        const { am_sec_detal_slno } = data[0]


        const patchdata = {
            delete_user: id,
            am_sec_detal_slno: am_sec_detal_slno

        }
        const deleteItem = async (patchdata) => {
            const result = await axioslogin.patch('/ItemMapDetails/SepcifiDelete', patchdata);
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
            }
        }
        deleteItem(patchdata)

    }, [id, setCount, count])

    const AddSpares = useCallback(() => {

        const newdata = {
            id: Math.ceil(Math.random() * 1000),
            am_item_map_slno: am_item_map_slno,
            am_spare_item_map_slno: spare,
            spare_status: 1,
            name: spareNo,
            create_user: id
        }
        const datass = [...spareData, newdata]

        if (datass.length !== 0) {
            setSpareData(datass)
            setSpareTable(1)
            setSpare('')
        }

    }, [id, am_item_map_slno, spareData, spare, spareNo])


    return (
        <Paper sx={{ overflow: 'auto', border: 1, mb: 1 }}>
            <Box sx={{
                display: 'flex', flexDirection: 'column', flexWrap: 'wrap',
            }} >
                <Box sx={{
                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                }} >
                    {
                        assetSpare === 1 ?
                            <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                                <CusCheckBox
                                    variant="outlined"
                                    color="danger"
                                    size="md"
                                    name="spareFlag"
                                    label="Spare"
                                    value={spareFlag}
                                    onCheked={updateSpareFlag}
                                    checked={spareFlag}
                                />
                            </Box> : null
                    }

                    <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                        <CusCheckBox
                            variant="outlined"
                            color="danger"
                            size="md"
                            name="SpecificationFlag"
                            label="Specification"
                            value={SpecificationFlag}
                            onCheked={updateSpecFlag}
                            checked={SpecificationFlag}
                        />
                    </Box>
                </Box>
                {
                    secFlag === 2 ?
                        <Box sx={{
                            display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                        }} >
                            <Box sx={{ width: '70%', p: 1 }}>
                                <TextFieldCustom
                                    type="text"
                                    size="sm"
                                    name="specific"
                                    value={specific}
                                    onchange={updateSpecific}
                                ></TextFieldCustom>
                            </Box>

                            <Box sx={{ width: '5%', pl: 1, pt: 1, cursor: "pointer" }} >
                                <Tooltip title="Add  " placement="top">
                                    <AddCircleOutlineIcon onClick={() => AddSpecification()} />
                                </Tooltip>
                            </Box>

                        </Box>
                        : secFlag === 1 ?

                            <Box sx={{
                                display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                            }} >

                                <Box sx={{ width: '70%', p: 1 }}>
                                    <SpareListSelect spare={spare} setSpare={setSpare}
                                        item_custodian_dept={item_custodian_dept}
                                        setSpareNo={setSpareNo} />
                                </Box>
                                <Box sx={{ width: '5%', pl: 1, pt: 1, cursor: "pointer" }} >
                                    <Tooltip title="Add  " placement="top">
                                        <AddCircleOutlineIcon onClick={() => AddSpares()} />
                                    </Tooltip>
                                </Box>
                            </Box> :
                            null
                }

                {specificTable === 1 ?
                    <Box sx={{ width: '70%', p: 1 }}>

                        <CssVarsProvider>
                            <Table stickyHeader>
                                <thead>
                                    <tr>
                                        <th style={{ width: '20%', align: "center" }}>Sl No</th>
                                        <th style={{ width: '60%', align: "center" }}>Specifications</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {specificData && specificData.map((val, index) => {
                                        return <tr
                                            key={index}
                                            sx={{
                                                '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                                                minHeight: 5
                                            }}
                                        >
                                            <td> {index + 1}</td>
                                            <td> {val.specifications}</td>

                                        </tr>
                                    })}
                                </tbody>
                            </Table>
                        </CssVarsProvider>
                    </Box> : null
                }

                {spareTable === 1 ?
                    <Box sx={{ width: '70%', p: 1 }}>

                        <CssVarsProvider>
                            <Table stickyHeader>
                                <thead>
                                    <tr>
                                        <th style={{ width: '20%', align: "center" }}>Sl No</th>
                                        <th style={{ width: '60%', align: "center" }}>Spare Sl no</th>
                                        <th style={{ width: '60%', align: "center" }}>Spare Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {spareData && spareData.map((val, index) => {
                                        return <tr
                                            key={index}
                                            sx={{
                                                '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                                                minHeight: 5
                                            }}
                                        >
                                            <td> {index + 1}</td>
                                            <td> {val.am_spare_item_map_slno}</td>
                                            <td> {val.name}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </Table>
                        </CssVarsProvider>
                    </Box> : null


                }

                {
                    already === 1 ?
                        <Box sx={{ width: '70%', p: 1 }}>

                            <ReqRegistItemCmpt
                                columnDefs={column}
                                tableData={alreadyData}

                            />
                        </Box> : null

                }

                {alreadytSpare === 1 ?
                    <Box sx={{ width: '100%', p: 1 }}>

                        <ReqRegistItemCmpt
                            columnDefs={columnSpare}
                            tableData={alreadytSpareData}

                        />
                    </Box> : null
                }
                <Box sx={{
                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                }}>

                    <CustomeToolTip title="Save" placement="bottom" >
                        <Box sx={{ width: '3%', pl: 7, pt: 3, }}>
                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={SaveSpecDetails} >
                                <LibraryAddIcon fontSize='small' />
                            </CusIconButton>
                        </Box>
                    </CustomeToolTip>

                    <CustomeToolTip title="Refresh" placement="bottom" >
                        <Box sx={{ width: '3%', pl: 5, pt: 3, }}>
                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={SpecReferesh} >
                                <RefreshIcon fontSize='small' />
                            </CusIconButton>
                        </Box>
                    </CustomeToolTip>
                </Box>

            </Box>
        </Paper>
    )
}

export default memo(SpecDetailsComp)
