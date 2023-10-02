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
const ItemListViewDept = () => {

    const history = useHistory()
    const dispatch = useDispatch();
    const [department, setDepartment] = useState(0)
    const [deptsec, setDeptSec] = useState(0)
    const [item, setItem] = useState(0)
    const postdata = useMemo(() => {
        return {
            item_dept_slno: department,
            item_deptsec_slno: deptsec,
            item_creation_slno: item
        }

    }, [department, deptsec, item])

    const [displayarry, setDisArry] = useState([])
    const [flag, setFlag] = useState(0)

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
            }
        }
        if (department !== 0 && deptsec !== 0) {
            getdata(postdata)
        }

    }, [postdata, department, deptsec])

    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])

    return (
        <Box sx={{
            display: 'flex',
            flexGrow: 1,
            width: '100%',
            height: window.innerHeight - 85,
            bgcolor: 'green'
        }}>
            <CardMasterClose
                title="Item List"
                close={backtoSetting}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 1,
                }} >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        m: -1,
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

                        <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
                            <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Department Section</Typography>
                            <Box>
                                <AmDeptSecSelectWOName
                                    deptsec={deptsec}
                                    setDeptSec={setDeptSec}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
                            <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Iten Name</Typography>
                            <Box>
                                <AmItemDeptSecBsedWOName
                                    item={item}
                                    setItem={setItem}
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
                        display: 'flex',
                        flexDirection: 'row',
                        pt: 2
                    }} >
                        <ItemListViewTable displayarry={displayarry} />
                    </Box> : null}
                </Box>
            </CardMasterClose>

        </Box>
    )
}

export default memo(ItemListViewDept)