import React, { memo, useCallback, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@mui/joy'
import CondemUnitMastTable from './CondemUnitMastTable'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

const CondemUnitMaster = () => {
    const history = useNavigate()
    const [value, setValue] = useState(0)
    const [count, setCount] = useState(0)

    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const queryClient = useQueryClient()
    const [quantityUnit, setquantityUnit] = useState({
        condem_quantity_slno: '',
        condem_quantity_name: '',
        condem_quantity_status: false,
    })
    const { condem_quantity_slno, condem_quantity_name, condem_quantity_status } = quantityUnit

    const updatequantityUnit = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setquantityUnit({ ...quantityUnit, [e.target.name]: value })
        },
        [quantityUnit],
    )
    const reset = () => {
        const frmdata = {
            condem_quantity_slno: '',
            condem_quantity_name: '',
            condem_quantity_status: false,
        }
        setquantityUnit(frmdata)
        setCount(0)
        setValue(0)
    }
    const postdata = useMemo(() => {
        return {
            condem_quantity_name: condem_quantity_name,
            condem_quantity_status: condem_quantity_status === true ? 1 : 0,
            create_user: id
        }
    }, [condem_quantity_name, condem_quantity_status, id])
    const patchdata = useMemo(() => {
        return {
            condem_quantity_slno: condem_quantity_slno,
            condem_quantity_name: condem_quantity_name,
            condem_quantity_status: condem_quantity_status === true ? 1 : 0,
            edit_user: id
        }
    }, [condem_quantity_slno, condem_quantity_name, condem_quantity_status, id])

    const sumbitquantityUnit = useCallback(
        (e) => {
            e.preventDefault()
            const InsertquantityUnit = async (postdata) => {
                const result = await axioslogin.post('/condemMasters/QuantityUnitInsert', postdata)
                const { message, success } = result.data
                if (success === 1) {
                    succesNotify(message)
                    queryClient.invalidateQueries('CondemquantityUnit')
                    reset()
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            const quantityUnitUpdate = async (patchdata) => {
                const result = await axioslogin.patch('/condemMasters/QuantityUnitUpdate', patchdata)
                const { message, success } = result.data
                if (success === 2) {
                    succesNotify(message)
                    queryClient.invalidateQueries('CondemquantityUnit')
                    reset()
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            if (value === 0) {
                if (condem_quantity_name !== '') {
                    InsertquantityUnit(postdata)
                } else {
                    infoNotify("Please Enter Asset Type")
                }
            }
            else {
                quantityUnitUpdate(patchdata)
            }
        },
        [postdata, value, patchdata, condem_quantity_name, queryClient],
    )
    const RowSelect = useCallback((val) => {
        const { condem_quantity_slno, condem_quantity_name, condem_quantity_status } = val
        setValue(1)
        const frmdata = {
            condem_quantity_slno: condem_quantity_slno,
            condem_quantity_name: condem_quantity_name,
            condem_quantity_status: condem_quantity_status === 1 ? true : false,
        }
        setquantityUnit(frmdata)
    }, [])


    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])

    const refreshWindow = useCallback(() => {
        const frmdata = {
            condem_quantity_slno: '',
            condem_quantity_name: '',
            condem_quantity_status: false,
        }
        setquantityUnit(frmdata)
        setValue(0)
    }, [setquantityUnit])


    return (
        <CardMaster
            title="Asset Condemnation Quantity Unit"
            submit={sumbitquantityUnit}
            close={backtoSetting}
            refresh={refreshWindow}
        >

            <Box sx={{ height: '100%', flex: 1, display: 'flex' }}>
                <Box sx={{ width: 300, px: 1 }}>
                    <TextFieldCustom
                        placeholder="Quantity Unit eg:- kg"
                        type="text"
                        size="sm"
                        name="condem_quantity_name"
                        value={condem_quantity_name}
                        onchange={updatequantityUnit}
                    ></TextFieldCustom>
                    <Box sx={{ pt: 1.5, pl: .5 }}>
                        <CusCheckBox
                            label="status"
                            color="primary"
                            size="md"
                            name="condem_quantity_status"
                            value={condem_quantity_status}
                            checked={condem_quantity_status}
                            onCheked={updatequantityUnit}
                        ></CusCheckBox>
                    </Box>
                </Box>
                <CondemUnitMastTable count={count} RowSelect={RowSelect} />
            </Box>
        </CardMaster>
    )
}

export default memo(CondemUnitMaster)
