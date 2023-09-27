import React, { memo, useCallback, useEffect, useState } from 'react'
import AmDepartmentSelecct from 'src/views/CommonSelectCode/AmDepartmentSelecct'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Tooltip } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { getDepartment } from 'src/redux/actions/Department.action'
import AmDeptSectionSele from 'src/views/CommonSelectCode/AmDeptSectionSele'
import { Fragment } from 'react'
import ItemCountWiseMap from './ItemCountWiseMap'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { useMemo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import AddTaskIcon from '@mui/icons-material/AddTask';

const ItemAddingComp = ({ selectData }) => {

    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const { slno, Item_name } = selectData
    const dispatch = useDispatch();

    const [department, setDepartment] = useState(0)
    const [deptsec, setDeptSec] = useState(0)
    const [deptName, setDeptName] = useState('')
    const [deptSecName, setDeptSecName] = useState('')
    const [count, setCount] = useState('')

    useEffect(() => {
        dispatch(getDepartment())
        setFlag(0)
        setDisable(0)
        setCount('')
    }, [dispatch, selectData])

    const [flag, setFlag] = useState(0)
    const [disable, setDisable] = useState(0)
    const updateItemCount = useCallback((e) => {
        setCount(e.target.value)

    }, [])

    const mapArry = Array.from({ length: count }, (_, index) => index);


    const postData = mapArry && mapArry.map((val) => {
        return {
            item_creation_slno: slno,
            item_dept_slno: department,
            item_deptsec_slno: deptsec,
            item_create_status: 1,
            create_user: id
        }
    })
    const addMoreItem = useMemo(() => {
        return {
            item_creation_slno: slno,
            item_dept_slno: department,
            item_deptsec_slno: deptsec,
            item_create_status: 1,
            create_user: id
        }

    }, [slno, department, deptsec, id])

    const getPostData = useMemo(() => {
        return {
            item_creation_slno: slno,
            item_dept_slno: department,
            item_deptsec_slno: deptsec,

        }

    }, [slno, department, deptsec])
    const AddMultiple = useCallback(() => {
        const insertItem = async (postData) => {
            const result = await axioslogin.post('/itemCreationDeptmap/insert', postData)
            return result
        }
        if (department !== 0 && deptsec !== 0) {
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
            warningNotify("Please Select Deoartment and Dep")
        }

    }, [postData, department, deptsec])


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
        insertItemAdditional(addMoreItem)
        setFlag(0)

    }, [addMoreItem])
    return (
        <Fragment>
            <Box sx={{ display: 'flex', width: '100%', p: 0.5, flexDirection: 'row', px: 20, justifyContent: 'center' }} >
                <Box sx={{
                    backgroundColor: '#94b3b1', borderRadius: 1, p: 1,
                }}>
                    <Typography >{Item_name}</Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', width: '100%', p: 0.5, flexDirection: 'row' }} >
                <Box sx={{ display: 'flex', flex: 1, width: '25%', p: 0.5, flexDirection: 'row' }} >
                    <Box sx={{ width: '30%', pl: 1, pt: 1.3, }}>
                        <Typography>Department</Typography>
                    </Box>
                    <Box sx={{ width: '70%', pt: 1.3, }}>

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
                <Box sx={{ display: 'flex', flex: 1, width: '30%', p: 0.5, flexDirection: 'row', }} >
                    <Box sx={{ width: '30%', pl: 1, pt: 1.3, }}>
                        <Typography>Department Section</Typography>
                    </Box>
                    <Box sx={{ width: '70%', pt: 1.3, }}>
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
                <Box sx={{ display: 'flex', flex: 1, width: '40%', p: 0.5, flexDirection: 'row' }} >
                    <Box sx={{ width: '20%', pl: 1, pt: 1.3, }}>
                        <Typography>Count</Typography>
                    </Box>
                    <Box sx={{ width: '20%', pt: 1.3 }}>
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
                    <Box sx={{ width: '10%', pl: 1, pt: 1.3, }}>
                        <Tooltip title="Add " placement="top">
                            <AddTaskIcon onClick={() => AddMultiple()} />
                        </Tooltip>
                    </Box>
                    <Box sx={{ width: '10%', pl: 1, pt: 1.3, }}>
                        <Tooltip title="Add More " placement="top">
                            <AddCircleOutlineIcon onClick={() => updateclick()} />
                        </Tooltip>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flex: 1, width: '100%', p: 0.5, flexDirection: 'row' }} >
                {flag === 1 ? < ItemCountWiseMap
                    getPostData={getPostData}
                />
                    : null}

            </Box>
        </Fragment >
    )
}

export default memo(ItemAddingComp)