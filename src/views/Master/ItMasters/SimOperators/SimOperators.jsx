import { Box } from '@mui/material'
import React, { memo, useMemo, useCallback, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import SimOperatorTable from './SimOperatorTable'


const SimOperators = () => {
    const [value, setValue] = useState(0)
    const [count, setCount] = useState(0)
    const history = useHistory()

    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [simOperators, setsimOperators] = useState({
        sim_operator_id: '',
        sim_operator_name: '',
        sim_operator_status: false,
    })
    const { sim_operator_id, sim_operator_name, sim_operator_status } = simOperators
    const UpdatesimOperators = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setsimOperators({ ...simOperators, [e.target.name]: value })
        },
        [simOperators],
    )
    const postdata = useMemo(() => {
        return {
            sim_operator_name: sim_operator_name,
            sim_operator_status: sim_operator_status === true ? 1 : 0,
            create_user: id
        }
    }, [sim_operator_name, sim_operator_status, id])
    const patchdata = useMemo(() => {
        return {
            sim_operator_id: sim_operator_id,
            sim_operator_name: sim_operator_name,
            sim_operator_status: sim_operator_status === true ? 1 : 0,
            edit_user: id

        }
    }, [sim_operator_id, sim_operator_name, sim_operator_status, id])
    const rowSelect = useCallback((params) => {
        setValue(1)
        const data = params.api.getSelectedRows()
        const { sim_operator_id, sim_operator_name, sim_operator_status } = data[0]
        const frmdata = {
            sim_operator_id: sim_operator_id,
            sim_operator_name: sim_operator_name,
            sim_operator_status: sim_operator_status === 1 ? true : false,
        }
        setsimOperators(frmdata)
    }, [])
    const reset = () => {
        const frmdata = {
            sim_operator_id: '',
            sim_operator_name: '',
            sim_operator_status: false,
        }
        setsimOperators(frmdata)
        setCount(0)
        setValue(0)
    }
    const submitsimOperators = useCallback(
        (e) => {
            e.preventDefault()

            const InsertsimOperators = async (postdata) => {
                const result = await axioslogin.post('/simOperators/insert', postdata)

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
            const simOperatorsUpdate = async (patchdata) => {
                const result = await axioslogin.patch('/simOperators/update', patchdata)
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
                if (sim_operator_name !== '') {
                    InsertsimOperators(postdata)
                }
                else {
                    infoNotify("Please Enter Backup Type")
                }
            }
            else {
                simOperatorsUpdate(patchdata)
            }
        },
        [postdata, value, patchdata, count, sim_operator_name],
    )

    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    const refreshWindow = useCallback(() => {
        const frmdata = {
            sim_operator_id: '',
            sim_operator_name: '',
            sim_operator_status: false,
        }
        setsimOperators(frmdata)
        setValue(0)
    }, [setsimOperators])
    return (
        <CardMaster
            title="Sim Operators"
            submit={submitsimOperators}
            close={backtoSetting}
            refresh={refreshWindow}
        >
            <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
                <Box sx={{ width: '30%', p: 1 }}>
                    <Box>
                        <TextFieldCustom
                            placeholder="Sim Operators"
                            type="text"
                            size="sm"
                            name="sim_operator_name"
                            value={sim_operator_name}
                            onchange={UpdatesimOperators}
                        ></TextFieldCustom>
                    </Box>
                    <Box sx={{ pt: 1 }}>
                        <CusCheckBox
                            label="status"
                            color="primary"
                            size="md"
                            name="sim_operator_status"
                            value={sim_operator_status}
                            checked={sim_operator_status}
                            onCheked={UpdatesimOperators}
                        ></CusCheckBox>
                    </Box>
                </Box>
                <Box sx={{ width: '70%' }}>
                    <SimOperatorTable count={count} rowSelect={rowSelect} />
                </Box>
            </Box>
        </CardMaster>
    )
}

export default memo(SimOperators)