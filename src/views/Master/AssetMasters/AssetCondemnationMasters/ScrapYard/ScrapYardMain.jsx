import React, { memo, useCallback, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@mui/joy'
import ScrapYardMastTable from './ScrapYardMastTable'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

const ScrapYardMain = () => {


    const history = useNavigate()
    const [value, setValue] = useState(0)
    const [count, setCount] = useState(0)

    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const queryClient = useQueryClient()
    const [ScrapYard, setScrapYard] = useState({
        yard_slno: '',
        yard_name: '',
        yard_status: false,
    })
    const { yard_slno, yard_name, yard_status } = ScrapYard

    const updateScrapYard = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setScrapYard({ ...ScrapYard, [e.target.name]: value })
        },
        [ScrapYard],
    )
    const reset = () => {
        const frmdata = {
            yard_slno: '',
            yard_name: '',
            yard_status: false,
        }
        setScrapYard(frmdata)
        setCount(0)
        setValue(0)
    }
    const postdata = useMemo(() => {
        return {
            yard_name: yard_name,
            yard_status: yard_status === true ? 1 : 0,
            create_user: id
        }
    }, [yard_name, yard_status, id])
    const patchdata = useMemo(() => {
        return {
            yard_slno: yard_slno,
            yard_name: yard_name,
            yard_status: yard_status === true ? 1 : 0,
            edit_user: id
        }
    }, [yard_slno, yard_name, yard_status, id])

    const sumbitScrapYard = useCallback(
        (e) => {
            e.preventDefault()
            const InsertScrapYard = async (postdata) => {
                const result = await axioslogin.post('/condemMasters/ScrapYardInsert', postdata)
                const { message, success } = result.data
                if (success === 1) {
                    succesNotify(message)
                    queryClient.invalidateQueries('CondemScrapYard')
                    reset()
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            const ScrapYardUpdate = async (patchdata) => {
                const result = await axioslogin.patch('/condemMasters/ScrapYardUpdate', patchdata)
                const { message, success } = result.data
                if (success === 2) {
                    succesNotify(message)
                    queryClient.invalidateQueries('CondemScrapYard')
                    reset()
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            if (value === 0) {
                if (yard_name !== '') {
                    InsertScrapYard(postdata)
                } else {
                    infoNotify("Please Enter Asset Type")
                }
            }
            else {
                ScrapYardUpdate(patchdata)
            }
        },
        [postdata, value, patchdata, yard_name, queryClient],
    )
    const RowSelect = useCallback((val) => {
        const { yard_slno, yard_name, yard_status } = val
        setValue(1)
        const frmdata = {
            yard_slno: yard_slno,
            yard_name: yard_name,
            yard_status: yard_status === 1 ? true : false,
        }
        setScrapYard(frmdata)
    }, [])


    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])

    const refreshWindow = useCallback(() => {
        const frmdata = {
            yard_slno: '',
            yard_name: '',
            yard_status: false,
        }
        setScrapYard(frmdata)
        setValue(0)
    }, [setScrapYard])
    return (
        <CardMaster
            title="Asset Condemnation ScrapYard"
            submit={sumbitScrapYard}
            close={backtoSetting}
            refresh={refreshWindow}
        >

            <Box sx={{ height: '100%', flex: 1, display: 'flex' }}>
                <Box sx={{ width: 300, px: 1 }}>
                    <TextFieldCustom
                        placeholder="ScrapYard"
                        type="text"
                        size="sm"
                        name="yard_name"
                        value={yard_name}
                        onchange={updateScrapYard}
                    ></TextFieldCustom>
                    <Box sx={{ pt: 1.5, pl: .5 }}>
                        <CusCheckBox
                            label="status"
                            color="primary"
                            size="md"
                            name="yard_status"
                            value={yard_status}
                            checked={yard_status}
                            onCheked={updateScrapYard}
                        ></CusCheckBox>
                    </Box>
                </Box>
                <ScrapYardMastTable count={count} RowSelect={RowSelect} />
            </Box>
        </CardMaster>
    )
}

export default memo(ScrapYardMain)
