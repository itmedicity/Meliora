import React, { memo, useCallback, useEffect, useState } from 'react'
import AmDepartmentSelecct from 'src/views/CommonSelectCode/AmDepartmentSelecct'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { getDepartment } from 'src/redux/actions/Department.action'
import { getCustodianDept } from 'src/redux/actions/AmCustodianDept.action'
import AmDeptSectionSele from 'src/views/CommonSelectCode/AmDeptSectionSele'
import ItemCountWiseMap from './ItemCountWiseMap'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { useMemo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import AddTaskIcon from '@mui/icons-material/AddTask';
import AmCustodianDeptsele from 'src/views/CommonSelectCode/AmCustodianDeptsele'
import AssetRackSelect from 'src/views/CommonSelectCode/AssetRackSelect'
import { getRackList } from 'src/redux/actions/AmRackList.action'
import AmRoomSelecDeptSecBased from 'src/views/CommonSelectCode/AmRoomSelecDeptSecBased'
import AmsubRoomSeleDepdRoom from 'src/views/CommonSelectCode/AmsubRoomSeleDepdRoom'

const ItemAddingComp = ({ selectData, department, setDepartment, deptsec, setDeptSec,
    deptName, setDeptName, deptSecName, setDeptSecName, custodiandept, setCustodianDept,
    custdeptName, setcustdeptname, rackno, setrackNo, rackname, setrackName, roomNo,
    setRoomNo, roonName, setRoomName, count, setCount, setCustodianDeptSec, custodiandeptSec,
    subRoomNo, setSubRoomNo, subRoomName, setSubRoomName }) => {

    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const { slno, Item_name, type } = selectData
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('')
    const [secondname, setSecondName] = useState('')
    const [assetno, setassetNo] = useState('')

    useEffect(() => {
        if (custodiandept !== 0) {
            if (type === 1) {
                let array = [firstName, secondname]
                let filterName = array?.filter((e) => e !== null);
                let stringName = filterName?.map((e) => e).join('/')
                setassetNo(stringName)
            }
            else {
                let stringName = "SP/" + secondname
                setassetNo(stringName)
            }
        }
    }, [custodiandept, firstName, secondname, type])

    useEffect(() => {
        dispatch(getDepartment())
        dispatch(getCustodianDept())
        dispatch(getRackList())
        setFlag(0)
        setDisable(0)
        setCount('')
    }, [dispatch, selectData, setCount])

    const [flag, setFlag] = useState(0)
    const [disable, setDisable] = useState(0)
    const updateItemCount = useCallback((e) => {
        setCount(e.target.value)

    }, [setCount])

    const mapArry = Array.from({ length: count }, (_, index) => index);

    const postData = mapArry && mapArry.map((val) => {
        return {
            item_creation_slno: slno,
            item_dept_slno: department,
            item_deptsec_slno: deptsec,
            item_room_slno: roomNo === 0 ? null : roomNo,
            item_subroom_slno: subRoomNo === 0 ? null : subRoomNo,
            item_rack_slno: rackno === 0 ? null : rackno,
            item_create_status: 1,
            item_custodian_dept: custodiandept,
            item_custodian_dept_sec: custodiandeptSec,
            item_asset_no: assetno,
            create_user: id
        }
    })
    const sparepostData = mapArry && mapArry.map((val) => {
        return {
            spare_creation_slno: slno,
            spare_dept_slno: department,
            spare_deptsec_slno: deptsec,
            spare_room_slno: roomNo === 0 ? null : roomNo,
            spare_subroom_slno: subRoomNo === 0 ? null : subRoomNo,
            spare_rack_slno: rackno === 0 ? null : rackno,
            spare_create_status: 1,
            spare_custodian_dept: custodiandept,
            spare_custodian_dept_sec: custodiandeptSec,
            spare_asset_no: assetno,
            create_user: id
        }
    })

    const addMoreItem = useMemo(() => {
        return {
            item_creation_slno: slno,
            item_dept_slno: department,
            item_deptsec_slno: deptsec,
            item_room_slno: roomNo === 0 ? null : roomNo,
            item_subroom_slno: subRoomNo === 0 ? null : subRoomNo,
            item_rack_slno: rackno === 0 ? null : rackno,
            item_create_status: 1,
            item_custodian_dept: custodiandept,
            item_custodian_dept_sec: custodiandeptSec,
            item_asset_no: assetno,
            item_asset_no_only: assetno,
            create_user: id
        }

    }, [slno, department, deptsec, roomNo, subRoomNo, rackno, custodiandept, custodiandeptSec, assetno, id])

    const spareaddMoreItem = useMemo(() => {
        return {
            spare_creation_slno: slno,
            spare_dept_slno: department,
            spare_deptsec_slno: deptsec,
            spare_room_slno: roomNo === 0 ? null : roomNo,
            spare_subroom_slno: subRoomNo === 0 ? null : subRoomNo,
            spare_rack_slno: rackno === 0 ? null : rackno,
            spare_create_status: 1,
            spare_custodian_dept: custodiandept,
            spare_custodian_dept_sec: custodiandeptSec,
            spare_asset_no: assetno,
            spare_asset_no_only: assetno,
            create_user: id
        }

    }, [slno, department, deptsec, roomNo, subRoomNo, rackno, custodiandept, custodiandeptSec, assetno, id])

    const getPostData = useMemo(() => {
        return {
            item_creation_slno: slno,
            item_dept_slno: department,
            item_deptsec_slno: deptsec
        }
    }, [slno, department, deptsec])

    const getPostDataSpare = useMemo(() => {
        return {
            spare_creation_slno: slno,
            spare_dept_slno: department,
            spare_deptsec_slno: deptsec
        }
    }, [slno, department, deptsec])


    const AddMultiple = useCallback(() => {
        const insertItem = async (postData) => {
            const result = await axioslogin.post('/itemCreationDeptmap/insert', postData)
            return result
        }

        const insertSpareItem = async (postData) => {
            const result = await axioslogin.post('/itemCreationDeptmap/insertSpare', postData)
            return result
        }

        if (department !== 0 && deptsec !== 0 && mapArry.length !== 0 && custodiandept !== 0) {
            if (type === 1) {
                insertItem(postData).then((val) => {
                    const { message, success } = val.data
                    if (success === 1) {
                        setFlag(1)
                        succesNotify(message)
                        setDisable(1)
                    } else if (success === 0) {
                        infoNotify(message)
                    } else {
                        infoNotify(message)
                    }
                })
            } else {
                insertSpareItem(sparepostData).then((val) => {
                    const { message, success } = val.data
                    if (success === 1) {
                        setFlag(1)
                        succesNotify(message)
                        setDisable(1)
                    } else if (success === 0) {
                        infoNotify(message)
                    } else {
                        infoNotify(message)
                    }
                })
            }
        } else {
            warningNotify("Please Select Department,Department section,Custodian Department and Give Count")
        }
    }, [postData, department, deptsec, type, sparepostData, mapArry, custodiandept])


    const updateclick = useCallback(() => {
        const insertItemAdditional = async (addMoreItem) => {
            const result = await axioslogin.post('/itemCreationDeptmap/insertItemAdditional', addMoreItem)
            const { message, success } = result.data
            if (success === 1) {
                setFlag(1)
                succesNotify(message)
                setDisable(1)
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }

        const insertSpareItemAdditional = async (spareaddMoreItem) => {
            const result = await axioslogin.post('/itemCreationDeptmap/insertSpareItemAdditional', spareaddMoreItem)
            const { message, success } = result.data
            if (success === 1) {
                setFlag(1)
                succesNotify(message)
                setDisable(1)
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        if (department !== 0 && deptsec !== 0 && mapArry.length !== 0 && custodiandept !== 0) {
            if (type === 1) {
                insertItemAdditional(addMoreItem)
                setFlag(0)
            }
            else {
                insertSpareItemAdditional(spareaddMoreItem)
            }
        } else {
            warningNotify("Department,Department section,Room,Custodian Department and Give Count Must be Choosen")
        }

    }, [addMoreItem, spareaddMoreItem, type, department, deptsec, mapArry, custodiandept])


    return (
        <Box >
            <Box sx={{ display: 'flex', width: '100%', p: 0.5, flexDirection: 'row', px: 5, justifyContent: 'center' }} >
                <Box sx={{
                    backgroundColor: '#94b3b1', borderRadius: 1, p: 1, height: 35
                }}>
                    <Typography >{Item_name}</Typography>
                </Box>
            </Box>

            <Box sx={{
                display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                borderBottom: 1, borderWidth: 0.1, borderColor: 'black', width: '100%',
            }} >
                <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Department</Typography>
                    <Box>
                        {disable === 0 ?
                            <AmDepartmentSelecct
                                department={department}
                                setDepartment={setDepartment}
                                setDeptName={setDeptName}
                            /> :
                            <TextFieldCustom
                                type="text"
                                size="sm"
                                disabled={true}
                                name="deptName"
                                value={deptName}
                            />
                        }
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Department Section</Typography>
                    <Box>
                        {disable === 0 ?

                            <AmDeptSectionSele
                                deptsec={deptsec}
                                setDeptSec={setDeptSec}
                                setDeptSecName={setDeptSecName}
                            /> :
                            <TextFieldCustom
                                type="text"
                                size="sm"
                                disabled={true}
                                name="deptSecName"
                                value={deptSecName}
                            />
                        }
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Room</Typography>
                    <Box>
                        {disable === 0 ?

                            <AmRoomSelecDeptSecBased
                                roomNo={roomNo}
                                setRoomNo={setRoomNo}
                                setRoomName={setRoomName}
                            /> :
                            <TextFieldCustom
                                type="text"
                                size="sm"
                                disabled={true}
                                name="roonName"
                                value={roonName}
                            />
                        }
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Sub Room</Typography>
                    <Box>
                        {disable === 0 ?

                            <AmsubRoomSeleDepdRoom
                                subRoomNo={subRoomNo}
                                setSubRoomNo={setSubRoomNo}
                                setSubRoomName={setSubRoomName}
                            /> :
                            <TextFieldCustom
                                type="text"
                                size="sm"
                                disabled={true}
                                name="subRoomName"
                                value={subRoomName}
                            />
                        }
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Rack</Typography>
                    <Box>
                        {disable === 0 ?
                            <AssetRackSelect
                                rackno={rackno}
                                setrackNo={setrackNo}
                                setrackName={setrackName}
                            /> :
                            <TextFieldCustom
                                type="text"
                                size="sm"
                                disabled={true}
                                name="rackname"
                                value={rackname}
                            />
                        }
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Custodian Department</Typography>
                    <Box>
                        {disable === 0 ?

                            <AmCustodianDeptsele
                                custodiandept={custodiandept}
                                setCustodianDept={setCustodianDept}
                                setcustdeptname={setcustdeptname}
                                setFirstName={setFirstName}
                                setSecondName={setSecondName}
                                setCustodianDeptSec={setCustodianDeptSec}
                            /> :
                            <TextFieldCustom
                                type="text"
                                size="sm"
                                disabled={true}
                                name="custdeptName"
                                value={custdeptName}
                            />
                        }
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', width: '8%', p: 0.5, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Count</Typography>
                    <Box>
                        {
                            disable === 0 ? <TextFieldCustom
                                type="text"
                                size="sm"
                                name="count"
                                value={count}
                                onchange={updateItemCount}
                            /> : <TextFieldCustom
                                type="text"
                                size="sm"
                                disabled={true}
                                name="count"
                                value={count}
                            />
                        }
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width: '5%', pt: 1, pl: 3, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Add </Typography>
                    <Box>
                        <AddTaskIcon onClick={() => AddMultiple()} />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', width: '8%', pt: 1, pl: 3, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Add More </Typography>
                    <Box>
                        <AddCircleOutlineIcon onClick={() => updateclick()} />
                    </Box>
                </Box>

            </Box>

            <Box sx={{ display: 'flex', flex: 1, width: '100%', p: 0.5, flexDirection: 'row' }} >
                {flag === 1 ? < ItemCountWiseMap
                    getPostData={getPostData} type={type} getPostDataSpare={getPostDataSpare}
                />
                    : null}

            </Box>
        </Box>
    )
}

export default memo(ItemAddingComp)