import React, { memo, useCallback, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
import HoldReasonMasterTable from './HoldReasonMasterTable'
import { Box, CssVarsProvider, Input } from '@mui/joy'

const HoldReasonMaster = () => {

    const history = useHistory()
    const [value, setValue] = useState(0)
    const [count, setCount] = useState(0)
    const [color, setColor] = useState('#000000');


    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [holdReason, setholdReason] = useState({
        cm_hold_id: '',
        cm_hold_reason: '',
        hold_reason_status: false,
    })
    const { cm_hold_id, cm_hold_reason, hold_reason_status } = holdReason

    const updateholdReason = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setholdReason({ ...holdReason, [e.target.name]: value })
        },
        [holdReason],
    )
    const reset = () => {
        const frmdata = {
            cm_hold_id: '',
            cm_hold_reason: '',
            hold_reason_status: false,
        }
        setholdReason(frmdata)
        setCount(0)
        setValue(0)
        setColor('#000000')
    }
    const postdata = useMemo(() => {
        return {
            cm_hold_reason: cm_hold_reason,
            hold_reason_status: hold_reason_status === true ? 1 : 0,
            hold_color: color,
            create_user: id
        }
    }, [cm_hold_reason, hold_reason_status, color, id])
    const patchdata = useMemo(() => {
        return {
            cm_hold_id: cm_hold_id,
            cm_hold_reason: cm_hold_reason,
            hold_reason_status: hold_reason_status === true ? 1 : 0,
            hold_color: color,
            edit_user: id
        }
    }, [cm_hold_id, cm_hold_reason, hold_reason_status, color, id])


    const sumbitholdReason = useCallback(
        (e) => {
            e.preventDefault()
            const InsertholdReason = async (postdata) => {
                const result = await axioslogin.post('/complaintHoldReason/holdInsert', postdata)
                const { message, success } = result.data
                if (success === 1) {
                    succesNotify(message)
                    setCount(count + 1)
                    reset()
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            const holdReasonUpdate = async (patchdata) => {
                const result = await axioslogin.patch('/complaintHoldReason/updateHold', patchdata)
                const { message, success } = result.data
                if (success === 2) {
                    succesNotify(message)
                    setCount(count + 1)
                    reset()
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            if (value === 0) {
                if (cm_hold_reason !== '') {
                    InsertholdReason(postdata)
                } else {
                    infoNotify("Please Enter Hold Reason")
                }
            }
            else {
                holdReasonUpdate(patchdata)
            }
        },
        [postdata, value, patchdata, count, cm_hold_reason],
    )
    const rowSelect = useCallback((row) => {
        setValue(1)
        const { cm_hold_id, cm_hold_reason, hold_reason_status, hold_color } = row
        // const data = params.api.getSelectedRows()
        // const { cm_hold_id, cm_hold_reason, hold_reason_status, hold_color } = data[0]
        const frmdata = {
            cm_hold_id: cm_hold_id,
            cm_hold_reason: cm_hold_reason,
            hold_reason_status: hold_reason_status === 1 ? true : false,

        }
        setholdReason(frmdata)
        setColor(hold_color !== null ? hold_color : '#FFFFFF')
    }, [])
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    const refreshWindow = useCallback(() => {
        const frmdata = {
            cm_hold_id: '',
            cm_hold_reason: '',
            hold_reason_status: false,
        }
        setholdReason(frmdata)
        setValue(0)
    }, [setholdReason])




    return (
        <CardMaster
            title='Complaint/Service Hold Reason Master'
            close={backtoSetting}
            submit={sumbitholdReason}
            refresh={refreshWindow}
        >

            <Box sx={{ p: .5, flex: 1, display: 'flex', gap: 1 }}>
                <Box sx={{ flex: 1 }}>
                    <TextFieldCustom
                        placeholder=" Hold Reason"
                        type="text"
                        size="sm"
                        name="cm_hold_reason"
                        value={cm_hold_reason}
                        onchange={updateholdReason}
                    />
                    <Box sx={{ display: 'flex' }}>
                        <CssVarsProvider>
                            <Input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                sx={{ width: 40, padding: '5px', my: 1 }}
                            />
                        </CssVarsProvider>
                        <Box sx={{
                            mt: 1, mb: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', pl: 1, fontWeight: 400
                        }}>
                            {color}
                        </Box>
                    </Box>
                    <Box sx={{ ml: .5 }}>
                        <CusCheckBox
                            label="Status"
                            color="primary"
                            size="md"
                            name="hold_reason_status"
                            value={hold_reason_status}
                            checked={hold_reason_status}
                            onCheked={updateholdReason}
                        />
                    </Box>
                </Box>
                <Box sx={{ flex: 2 }}>
                    <HoldReasonMasterTable
                        count={count} rowSelect={rowSelect}
                    />
                </Box>
            </Box>
        </CardMaster>
    )
}

export default memo(HoldReasonMaster)