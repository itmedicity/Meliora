
import React, { memo, useCallback, useState, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import Modal from '@mui/joy/Modal';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { CssVarsProvider } from '@mui/joy';
import { Box } from '@mui/material'
import AmCategorySelWOName from 'src/views/CommonSelectCode/AmCategorySelWOName'
import AmGroupSelWOName from 'src/views/CommonSelectCode/AmGroupSelWOName'
import AmSubGroupWOName from 'src/views/CommonSelectCode/AmSubGroupWOName'
import AmModelSelWOName from 'src/views/CommonSelectCode/AmModelSelWOName'
import AmSubCategryWOName from 'src/views/CommonSelectCode/AmSubCategryWOName'
import AmSubModelWOName from 'src/views/CommonSelectCode/AmSubModelWOName'
import AmManufacWOName from 'src/views/CommonSelectCode/AmManufacWOName'
import AmModelNumberSelect from 'src/views/CommonSelectCode/AmModelNumberSelect'
import Button from '@mui/joy/Button';
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusIconButton from '../../Components/CusIconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { getCategory } from 'src/redux/actions/AmCategoryList.action'
import { getGroup } from 'src/redux/actions/AmGroupList.action'
import { getAmModel } from 'src/redux/actions/AmModelList.action'
import { getAmManufacture } from 'src/redux/actions/AmManufactureList.actions'
import Table from '@mui/joy/Table';

const ModelForItemExistOrNot = ({ open, handleClose }) => {

    const dispatch = useDispatch();
    const [category, setCategory] = useState(0)
    const [subcategory, setSubcategory] = useState(0)
    const [group, setGroup] = useState(0)
    const [model, setModel] = useState(0)
    const [submodel, setSubmodel] = useState(0)
    const [subgroup, setSubGroup] = useState(0)
    const [manufacture, setManufacture] = useState(0)
    const [itemList, setItemList] = useState([])
    const [modelNumber, setModelNumber] = useState('')
    const [flag, setFlag] = useState(0)

    useEffect(() => {
        dispatch(getCategory())
        dispatch(getGroup())
        dispatch(getAmManufacture())
        dispatch(getAmModel())
    }, [dispatch])


    const postdata = useMemo(() => {
        return {
            item_category_slno: category,
            item_subcategory_slno: subcategory,
            item_group_slno: group,
            item_subgroup_slno: subgroup,
            item_model_slno: model,
            item_submodel_slno: submodel,
            item_manufactures_slno: manufacture,
            item_model_num: modelNumber !== '' ? modelNumber : null
        }
    }, [category, subcategory, group, subgroup, model, submodel, manufacture, modelNumber])


    const search = useCallback(() => {
        const getItemdata = async (postdata) => {
            const result = await axioslogin.post('/itemNameCreation/getItem', postdata)
            const { data, success } = result.data
            if (success === 1) {
                setItemList(data)
                setFlag(1)
            }
            else {
                setFlag(0)
                warningNotify("No Items Under Selected Condition")
                setItemList([])
            }
        }

        if (category !== 0 || subcategory !== 0 || group !== 0 || subgroup !== 0 || model !== 0 ||
            submodel !== 0 || manufacture !== 0 || modelNumber !== '') {
            getItemdata(postdata)
        }
        else {
            warningNotify("Please Select Any Options")
        }
    }, [postdata, category, subcategory, group, subgroup, model, submodel, manufacture, modelNumber])

    return (
        <CssVarsProvider>
            <Modal aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Sheet
                    variant="outlined"
                    sx={{
                        minWidth: "70%", borderRadius: 'md', p: 3, boxShadow: 'lg', height: 800,
                        maxWidth: "90%"
                    }}
                >
                    <Box sx={{ width: '100%', height: '90%', borderRadius: 1, border: '0.1px solid #454545' }}>
                        <Box sx={{
                            display: 'flex', flexDirection: 'column', pl: 0.5
                        }} >
                            <Box sx={{ display: 'flex', flexDirection: 'row', p: 0.5 }} >
                                <Box sx={{ display: 'flex', width: '33%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Category</Typography>
                                    <Box>
                                        <AmCategorySelWOName
                                            category={category}
                                            setCategory={setCategory}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', width: '33%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Sub Category</Typography>
                                    <Box sx={{ width: '100%' }}>
                                        <AmSubCategryWOName
                                            subcategory={subcategory}
                                            setSubcategory={setSubcategory}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', width: '33%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Group</Typography>
                                    <Box sx={{ width: '100%' }}>
                                        <AmGroupSelWOName
                                            group={group}
                                            setGroup={setGroup}
                                        />
                                    </Box>
                                </Box>

                            </Box>
                            {/* 2nd row */}
                            <Box sx={{ display: 'flex', flexDirection: 'row', p: 0.5 }} >
                                <Box sx={{ display: 'flex', width: '33%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Sub Group</Typography>
                                    <Box sx={{ width: '100%' }}>
                                        <AmSubGroupWOName
                                            subgroup={subgroup}
                                            setSubGroup={setSubGroup}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', width: '33%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Model</Typography>
                                    <Box sx={{ width: '100%' }}>
                                        <AmModelSelWOName
                                            model={model}
                                            setModel={setModel}
                                        />
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', width: '33%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Sub Model</Typography>
                                    <Box sx={{ width: '100%' }}>
                                        <AmSubModelWOName
                                            submodel={submodel}
                                            setSubmodel={setSubmodel}
                                        />
                                    </Box>
                                </Box>

                            </Box>
                            {/* 3rd Floor */}
                            <Box sx={{ display: 'flex', flexDirection: 'row', p: 0.5 }} >
                                <Box sx={{ display: 'flex', width: '33%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Manufacture</Typography>
                                    <Box sx={{ width: '100%' }}>
                                        <AmManufacWOName
                                            manufacture={manufacture}
                                            setManufacture={setManufacture}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', width: '32%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Model No</Typography>
                                    <Box sx={{ width: '100%' }}>
                                        <AmModelNumberSelect
                                            modelNumber={modelNumber}
                                            setModelNumber={setModelNumber}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '3%', pl: 1, pt: 3, }}>
                                    <CusIconButton size="sm" variant="outlined" clickable="true" onClick={search} >
                                        <SearchOutlinedIcon fontSize='small' />
                                    </CusIconButton>
                                </Box>
                            </Box>

                            {flag === 1 ? <Box sx={{
                                minHeight: 80, maxHeight: 300,
                                overflow: 'auto', p: 1
                            }} >

                                <CssVarsProvider>
                                    <Table stickyHeader>
                                        <thead>
                                            <tr>
                                                <th style={{ width: '20%', align: "center" }}>Sl No</th>
                                                <th style={{ width: '60%', align: "center" }}>Item Name</th>
                                                <th style={{ width: '20%', align: "center" }}>Item Type</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {itemList && itemList.map((val, index) => {
                                                return <tr
                                                    key={index}
                                                    sx={{
                                                        '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                                                        minHeight: 2
                                                    }}
                                                >
                                                    <td> {index + 1}</td>
                                                    <td> {val.item_name}</td>
                                                    <td> {val.asset_spare === 1 ? "Asset" : val.asset_spare === 2 ? "Spare" : "Not Given"}</td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </Table>
                                </CssVarsProvider>
                            </Box> : null}
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: "flex-end", }}>
                        <Button variant="outlined" color="secondary"
                            size="md" onClick={handleClose}>Cancel</Button>
                    </Box>
                </Sheet>
            </Modal>
        </CssVarsProvider >
    )
}

export default memo(ModelForItemExistOrNot)