import React, { memo, useCallback, useEffect, useState, useMemo } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Box, Typography, } from '@mui/material'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import AmDepartmentSelWOName from 'src/views/CommonSelectCode/AmDepartmentSelWOName'
import AmDeptSecSelectWOName from 'src/views/CommonSelectCode/AmDeptSecSelectWOName'
import CusIconButton from '../../Components/CusIconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ItemListViewTable from './ItemListViewTable'
import { axioslogin } from 'src/views/Axios/Axios'
import { useDispatch } from 'react-redux'
import { getDepartment } from 'src/redux/actions/Department.action'
import AmItemDeptSecBsedWOName from 'src/views/CommonSelectCode/AmItemDeptSecBsedWOName'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import AmDeptSecSelectSpare from 'src/views/CommonSelectCode/AmDeptSecSelectSpare'
import AmSpareItemListDeptSecBsed from 'src/views/CommonSelectCode/AmSpareItemListDeptSecBsed'
const ItemDetailAdd = React.lazy(() => import('../ItemDetailEnter/ItemDetailEnterMain'))

const ItemListViewDept = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const [department, setDepartment] = useState(0)
    const [deptsec, setDeptSec] = useState(0)
    const [item, setItem] = useState(0)
    const [asset, setasset] = useState(true)
    const [spare, setSpare] = useState(false)
    const postdata = useMemo(() => {
        return {
            item_dept_slno: department,
            item_deptsec_slno: deptsec,
            item_creation_slno: item
        }
    }, [department, deptsec, item])
    const postdataSpare = useMemo(() => {
        return {
            spare_dept_slno: department,
            spare_deptsec_slno: deptsec,
            spare_creation_slno: item
        }
    }, [department, deptsec, item])

    const [displayarry, setDisArry] = useState([])
    const [flag, setFlag] = useState(0)


    const updateAsset = useCallback((e) => {
        if (e.target.checked === true) {
            setasset(true)
            setSpare(false)
            setFlag(0)
        } else if (e.target.checked === false) {
            setasset(false)
            setSpare(true)
            setFlag(0)
        }
    }, [])
    const updateSpare = useCallback((e) => {
        if (e.target.checked === true) {
            setSpare(true)
            setasset(false)
            setFlag(0)
        } else if (e.target.checked === false) {
            setasset(true)
            setSpare(false)
            setFlag(0)
        }
    }, [])


    useEffect(() => {
        dispatch(getDepartment())
    }, [dispatch])
    const search = useCallback(() => {
        const getdata = async (postdata) => {
            const result = await axioslogin.post(`/itemCreationDeptmap/getItemsFronList`, postdata);
            const { success, data } = result.data
            if (success === 1) {
                setDisArry(data)
                setFlag(1)

            }
            else {
                warningNotify("No data for Selected Condition")
                setDisArry([])
                setFlag(0)
            }
        }
        const getdataSpareItem = async (postdataSpare) => {
            const result = await axioslogin.post(`/itemCreationDeptmap/getSpareItemsFronList`, postdataSpare);
            const { success, data } = result.data
            if (success === 1) {
                setDisArry(data)
                setFlag(1)

            }
            else {
                warningNotify("No data for Selected Condition")
                setDisArry([])
                setFlag(0)
            }
        }
        if (department !== 0 && deptsec !== 0) {
            if (asset === true) {
                getdata(postdata)
            }
            else {
                getdataSpareItem(postdataSpare)
            }
        }
    }, [postdata, postdataSpare, department, deptsec, asset])

    const [detailArry, setDetailArry] = useState([])
    const [detailflag, setDetailflag] = useState(0)

    const AddDetails = useCallback((value) => {
        setDetailArry(value)
        setDetailflag(1)
    }, [])

    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])

    return (
        < Box sx={{
            display: 'flex',
            flexGrow: 1,
            width: '100%',
            height: window.innerHeight - 85,
        }}>
            {
                detailflag === 1 ?
                    <ItemDetailAdd detailArry={detailArry} setDetailflag={setDetailflag} />
                    :
                    <CardMasterClose
                        title="Item Location List"
                        close={backtoSetting}
                    >
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 0
                        }} >
                            <Box sx={{ width: '40%', display: 'flex', pt: 2.5, margin: 'auto ', pl: 13 }}>

                                <Box sx={{ pl: 0.8, width: "20%" }}>
                                    <CusCheckBox
                                        label="Asset"
                                        color="primary"
                                        size="md"
                                        name="asset"
                                        value={asset}
                                        checked={asset}
                                        onCheked={updateAsset}
                                    ></CusCheckBox>
                                </Box>
                                <Box sx={{ pl: 2, }}>
                                    <CusCheckBox
                                        label="Spare"
                                        color="primary"
                                        size="md"
                                        name="spare"
                                        value={spare}
                                        checked={spare}
                                        onCheked={updateSpare}
                                    ></CusCheckBox>
                                </Box>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                m: 0
                            }} >
                                <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Department</Typography>
                                    <Box>
                                        <AmDepartmentSelWOName
                                            department={department}
                                            setDepartment={setDepartment}
                                        />
                                    </Box>
                                </Box>
                                {asset === true ? <Box sx={{ display: 'flex', width: '75%', p: 0.5, flexDirection: 'row' }}>
                                    <Box sx={{ display: 'flex', width: '35%', p: 0.5, flexDirection: 'column' }} >
                                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Department Section</Typography>
                                        <Box>
                                            <AmDeptSecSelectWOName
                                                deptsec={deptsec}
                                                setDeptSec={setDeptSec}
                                            />
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: '75%', p: 0.5, flexDirection: 'column' }} >
                                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Item Name</Typography>
                                        <Box>
                                            <AmItemDeptSecBsedWOName
                                                asset={asset}
                                                item={item}
                                                setItem={setItem}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                                    : <Box sx={{ display: 'flex', width: '75%', p: 0.5, flexDirection: 'row' }}>

                                        <Box sx={{ display: 'flex', width: '35%', p: 0.5, flexDirection: 'column' }} >
                                            <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Department Section</Typography>
                                            <Box>
                                                <AmDeptSecSelectSpare
                                                    deptsec={deptsec}
                                                    setDeptSec={setDeptSec}
                                                />
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', width: '75%', p: 0.5, flexDirection: 'column' }} >
                                            <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Item Name</Typography>
                                            <Box>
                                                <AmSpareItemListDeptSecBsed
                                                    item={item}
                                                    setItem={setItem}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                }

                                <Box sx={{ width: '3%', pl: 1, pt: 3, }}>
                                    <CusIconButton size="sm" variant="outlined" clickable="true" onClick={search} >
                                        <SearchOutlinedIcon fontSize='small' />
                                    </CusIconButton>
                                </Box>
                            </Box>
                        </Box>
                        {flag === 1 ? <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            pt: 2
                        }} >
                            <ItemListViewTable asset={asset} displayarry={displayarry} AddDetails={AddDetails} />
                        </Box> : null}
                    </CardMasterClose>
            }
        </Box >
    )
}

export default memo(ItemListViewDept)