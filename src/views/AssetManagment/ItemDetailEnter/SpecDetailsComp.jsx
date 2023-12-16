import React, { memo, useCallback, useState, useEffect } from 'react'
import { Box, Paper, IconButton, Tooltip } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusIconButton from '../../Components/CusIconButton';
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { CssVarsProvider } from '@mui/joy/'
import Table from '@mui/joy/Table';
import ReqRegistItemCmpt from 'src/views/RequestManagement/RequestRegister/ReqRegistItemCmpt';
import { editicon } from 'src/color/Color'
import DeleteIcon from '@mui/icons-material/Delete';



const SpecDetailsComp = ({ detailArry }) => {

    const { am_item_map_slno } = detailArry

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

        checkinsertOrNotSpeciali(am_item_map_slno)
    }, [am_item_map_slno, setAlready, setAlreadyData, count])



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
                // SpecReferesh();
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        detailInsert(postData)

    }, [specificData, setCount, count])

    const SpecReferesh = useCallback(() => {
        setSpecific('')

    }, [])

    // const EditSpec = useCallback(() => {

    // }, [])


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
    return (
        <Paper sx={{ overflow: 'auto', border: 1, mb: 1 }}>
            <Box sx={{
                display: 'flex', flexDirection: 'column', flexWrap: 'wrap',
            }} >
                <Box sx={{
                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                }} >
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
                    </Box>
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
                        : null
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

                {
                    already === 1 ?
                        <Box sx={{ width: '70%', p: 1 }}>

                            <ReqRegistItemCmpt
                                columnDefs={column}
                                tableData={alreadyData}

                            />
                        </Box> : null

                }


                <Box sx={{
                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                }}>

                    <CustomeToolTip title="Save" placement="top" >
                        <Box sx={{ width: '3%', pl: 7, pt: 3, }}>
                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={SaveSpecDetails} >
                                <LibraryAddIcon fontSize='small' />
                            </CusIconButton>
                        </Box>
                    </CustomeToolTip>

                    <CustomeToolTip title="Refresh" placement="top" >
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
