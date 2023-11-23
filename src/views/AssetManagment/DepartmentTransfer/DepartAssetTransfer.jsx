import React, { memo, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Box, Typography, } from '@mui/material'
import CusIconButton from '../../Components/CusIconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { axioslogin } from 'src/views/Axios/Axios'
import { useDispatch } from 'react-redux'
import { getDepartment } from 'src/redux/actions/Department.action'
import { warningNotify } from 'src/views/Common/CommonCode'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import AmDepartmentSelWOName from 'src/views/CommonSelectCode/AmDepartmentSelWOName';
import AmDeptSecSelectWOName from 'src/views/CommonSelectCode/AmDeptSecSelectWOName';
import CardMaster from 'src/views/Components/CardMaster';
import { useSelector } from 'react-redux';
import { getRoomBasedOnDeptSec } from 'src/redux/actions/AmRoomDeptSecBased.action';
import AmRoomSelWONameUDepSec from 'src/views/CommonSelectCode/AmRoomSelWONameUDepSec';
import AmSubRmSelWONamURoom from 'src/views/CommonSelectCode/AmSubRmSelWONamURoom';
import { CssVarsProvider } from '@mui/joy/'
import Table from '@mui/joy/Table';



const DepartAssetTransfer = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const [transDept, setTransDept] = useState(0)
    const [transDeptSec, setTransDeptSec] = useState(0)
    const [roomNo, setRoomNo] = useState(0)
    const [subRoomNo, setSubRoomNo] = useState(0)
    const [RoomAssetList, setRoomAsset] = useState([])
    const [tableshow, setTableShow] = useState(0)

    // Get login user emp_id
    const sec_name = useSelector((state) => {
        return state.LoginUserData.empdeptsec
    })

    const sec_id = useSelector((state) => {
        return state.LoginUserData.empsecid
    })

    useEffect(() => {
        dispatch(getDepartment())
        dispatch(getRoomBasedOnDeptSec(sec_id))
    }, [dispatch, sec_id])

    const search = useCallback(() => {
        const getRoomAsset = async (roomNo) => {
            const result = await axioslogin.get(`/getDashboardData/getRoomAsset/${roomNo}`)
            const { success, data } = result.data
            if (success === 2) {
                setTableShow(1)
                setRoomAsset(data)
            } else {
                warningNotify('No Room under selected building')
            }
        }

        getRoomAsset(roomNo)
    }, [roomNo])

    useEffect(() => {
        if (subRoomNo !== 0) {
            const newArry = RoomAssetList.filter((value) => value.item_subroom_slno === subRoomNo)
            setRoomAsset(newArry);
        }
    }, [subRoomNo, RoomAssetList])


    // const [checks, setChecks] = useState(false)

    // const [check, setCheck] = useState(false)

    // const AddItems = useCallback(() => {

    // }, [])

    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])
    return (

        <CardMaster
            title="Department Transfer"
            // submit={sumbitItemCreation}
            close={backtoSetting}
        // refresh={refreshWindow}
        >
            <Box sx={{
                display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 0
            }} >
                <Box sx={{
                    display: 'flex', flexDirection: 'row', width: '100%', pt: 1.5
                }} >
                    <Box sx={{ pl: 0.8, width: "10%", cursor: "pointer" }}>
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >To Department</Typography>
                    </Box>
                    <Box sx={{ pl: 0.8, width: "25%" }} >
                        <AmDepartmentSelWOName
                            department={transDept}
                            setDepartment={setTransDept}
                        />
                    </Box>
                    <Box sx={{ pl: 0.8, width: "15%", cursor: "pointer", pt: 0.5 }}>
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >To Department Section</Typography>
                    </Box>
                    <Box sx={{ pl: 0.8, width: "25%", cursor: "pointer" }} >
                        <AmDeptSecSelectWOName
                            deptsec={transDeptSec}
                            setDeptSec={setTransDeptSec}
                        />
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                    borderBottom: 1, borderWidth: 0.1, borderColor: 'black', width: '100%',
                }} >
                    <Box sx={{ display: 'flex', width: '30%', p: 0.5, flexDirection: 'column' }} >
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Department Section</Typography>
                        <Box>
                            <TextFieldCustom
                                type="text"
                                size="sm"
                                disabled={true}
                                name="sec_name"
                                value={sec_name}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', width: '30%', p: 0.5, flexDirection: 'column' }} >
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Room </Typography>
                        <Box>
                            <AmRoomSelWONameUDepSec
                                roomNo={roomNo}
                                setRoomNo={setRoomNo} />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', width: '30%', p: 0.5, flexDirection: 'column' }} >
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Sub Room </Typography>
                        <Box>
                            <AmSubRmSelWONamURoom
                                subRoomNo={subRoomNo}
                                setSubRoomNo={setSubRoomNo}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', width: '10%', p: 2.3, flexDirection: 'column' }} >
                        <Box>
                            <CusIconButton size="sm" variant="outlined" clickable="true" color="primary" onClick={search} >
                                <SearchOutlinedIcon fontSize='small' />
                            </CusIconButton>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', width: '100%', pt: 1.5 }} >
                    {
                        tableshow === 1 ?
                            <CssVarsProvider>
                                <Table stickyHeader>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '5%', align: "center" }}>Sl No</th>
                                            <th style={{ width: '50%', align: "center" }}>Item Name</th>
                                            <th style={{ width: '10%', align: "center" }}>Room</th>
                                            <th style={{ width: '10%', align: "center" }}>Sub Room</th>
                                            <th style={{ width: '10%', align: "center" }}>Select</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {RoomAssetList && RoomAssetList.map((val, index) => {
                                            return <tr
                                                key={index}
                                                sx={{
                                                    '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                                                    minHeight: 5
                                                }}
                                            >
                                                <td> {index + 1}</td>
                                                <td> {val.item_name}</td>
                                                <td> {val.rm_room_name}</td>
                                                <td> {val.subroom_name}</td>
                                                {/* <td>
                                                    <CssVarsProvider>
                                                        <Checkbox
                                                            variant="outlined"
                                                            color='primary'
                                                            checked={val.am_item_map_slno}
                                                            //checked={check !== undefined && check !== val.am_item_map_slno ? false : true}
                                                            onChange={(e) => {
                                                                setCheck(e.target.checked === true ? val.am_item_map_slno : null)

                                                            }}
                                                        />
                                                    </CssVarsProvider >
                                                </td> */}
                                            </tr>
                                        })}
                                    </tbody>
                                </Table>
                            </CssVarsProvider>
                            : null
                    }
                </Box>
            </Box>
        </CardMaster>
    )
}

export default memo(DepartAssetTransfer)