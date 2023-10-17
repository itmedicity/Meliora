import React, { memo, useCallback, useState, useMemo, useEffect } from 'react'
import { Box, Typography, Paper } from '@mui/material'
import CusIconButton from '../../Components/CusIconButton';
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDispatch, useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import EditIcon from '@mui/icons-material/Edit';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import AmCustodianDeptSlOnly from 'src/views/CommonSelectCode/AmCustodianDeptSlOnly';
import { getCustodianDept } from 'src/redux/actions/AmCustodianDept.action';

const OwnerShipDetailsComp = ({ detailArry, exist, setExist, grndetailarry }) => {
    const { am_item_map_slno } = detailArry
    const { am_primary_custodian, am_secondary_custodian } = grndetailarry

    const dispatch = useDispatch();
    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const [primaryCustodian, setPrimaryCustodian] = useState(0)
    const [secondaryCustodian, setSecondaryCustodian] = useState(0)

    useEffect(() => {
        dispatch(getCustodianDept())
    }, [dispatch])

    useEffect(() => {
        if (am_primary_custodian !== null || am_secondary_custodian !== null) {
            setPrimaryCustodian(am_primary_custodian)
            setSecondaryCustodian(am_secondary_custodian)
        }

    }, [am_primary_custodian, am_secondary_custodian])
    const PostData = useMemo(() => {
        return {
            am_primary_custodian: primaryCustodian,
            am_secondary_custodian: secondaryCustodian,
            am_item_map_slno: am_item_map_slno,
            create_user: id
        }
    }, [primaryCustodian, secondaryCustodian, am_item_map_slno, id])


    const patchData = useMemo(() => {
        return {
            am_primary_custodian: primaryCustodian,
            am_secondary_custodian: secondaryCustodian,
            edit_user: id,
            am_item_map_slno: am_item_map_slno
        }
    }, [primaryCustodian, secondaryCustodian, id, am_item_map_slno])

    const reset = useCallback(() => {
        setPrimaryCustodian(0)
        setSecondaryCustodian(0)
    }, [])

    const SaveCustodian = useCallback((e) => {
        e.preventDefault()
        const InsertItemDetail = async (PostData) => {
            const result = await axioslogin.post('/ItemMapDetails/CustodianDetailsInsert', PostData)
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                setExist(1)
            } else {
                infoNotify(message)
            }
        }
        InsertItemDetail(PostData);
    }, [PostData, setExist])

    const EditDetails = useCallback((e) => {
        e.preventDefault()
        const checkinsertOrNot = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/checkDetailInsertOrNot/${am_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                const { am_primary_custodian, am_secondary_custodian } = data[0]
                setPrimaryCustodian(am_primary_custodian)
                setSecondaryCustodian(am_secondary_custodian)
            }
            else {
                warningNotify("Data Not Saved Yet")
            }
        }

        const updateGRNDetails = async (patchData) => {
            const result = await axioslogin.patch('/ItemMapDetails/CustodianDetailsUpdate', patchData);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
            }
            else {
                warningNotify(message)
            }
        }
        if (primaryCustodian === 0 && secondaryCustodian === 0) {
            checkinsertOrNot(am_item_map_slno)
        }
        else {
            updateGRNDetails(patchData)
        }

    }, [patchData, primaryCustodian, secondaryCustodian, am_item_map_slno])

    const refreshCustodian = useCallback(() => {
        reset()
    }, [reset])


    return (
        <Paper sx={{ overflow: 'auto', border: 1, mb: 1 }}>
            <Box sx={{
                display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
            }} >
                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Primary Custodian</Typography>
                    <Box>
                        <AmCustodianDeptSlOnly
                            custodiandept={primaryCustodian}
                            setCustodianDept={setPrimaryCustodian}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Secondary Custodian</Typography>
                    <Box>
                        <AmCustodianDeptSlOnly
                            custodiandept={secondaryCustodian}
                            setCustodianDept={setSecondaryCustodian}
                        />
                    </Box>
                </Box>
                {
                    exist === 0 ? <CustomeToolTip title="Save" placement="top" >
                        <Box sx={{ width: '3%', pl: 5, pt: 3, }}>
                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={SaveCustodian} >
                                <LibraryAddIcon fontSize='small' />
                            </CusIconButton>
                        </Box>
                    </CustomeToolTip> :
                        <CustomeToolTip title="Save" placement="top" >
                            <Box sx={{ width: '3%', pl: 5, pt: 3, }}>
                                <CusIconButton size="sm" variant="outlined"  >
                                    <LibraryAddIcon fontSize='small' />
                                </CusIconButton>
                            </Box>
                        </CustomeToolTip>

                }
                {
                    exist === 0 ?
                        <CustomeToolTip title="Edit" placement="top" >
                            <Box sx={{ width: '3%', pl: 4, pt: 3, }}>
                                <CusIconButton size="sm" variant="outlined" color="primary"  >
                                    <EditIcon fontSize='small' />
                                </CusIconButton>
                            </Box>
                        </CustomeToolTip> :
                        <CustomeToolTip title="Edit" placement="top" >
                            <Box sx={{ width: '3%', pl: 4, pt: 3, }}>
                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={EditDetails} >
                                    <EditIcon fontSize='small' />
                                </CusIconButton>
                            </Box>
                        </CustomeToolTip>
                }
                <CustomeToolTip title="Refresh" placement="top" >
                    <Box sx={{ width: '3%', pl: 3, pt: 3, }}>
                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={refreshCustodian} >
                            <RefreshIcon fontSize='small' />
                        </CusIconButton>
                    </Box>
                </CustomeToolTip>
            </Box>
        </Paper>
    )
}

export default memo(OwnerShipDetailsComp)