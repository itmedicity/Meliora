import React, { memo, useCallback, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@mui/joy'
import CondemnQualityMastTable from './CondemnQualityMastTable'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'


const CondemnQualityMast = () => {
    const history = useNavigate()
    const [value, setValue] = useState(0)
    const [count, setCount] = useState(0)

    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const queryClient = useQueryClient()
    const [Condemquality, setCondemquality] = useState({
        quality_slno: '',
        quality_name: '',
        quality_status: false,
    })
    const { quality_slno, quality_name, quality_status } = Condemquality

    const updateCondemquality = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setCondemquality({ ...Condemquality, [e.target.name]: value })
        },
        [Condemquality],
    )
    const reset = () => {
        const frmdata = {
            quality_slno: '',
            quality_name: '',
            quality_status: false,
        }
        setCondemquality(frmdata)
        setCount(0)
        setValue(0)
    }
    const postdata = useMemo(() => {
        return {
            quality_name: quality_name,
            quality_status: quality_status === true ? 1 : 0,
            create_user: id
        }
    }, [quality_name, quality_status, id])
    const patchdata = useMemo(() => {
        return {
            quality_slno: quality_slno,
            quality_name: quality_name,
            quality_status: quality_status === true ? 1 : 0,
            edit_user: id
        }
    }, [quality_slno, quality_name, quality_status, id])

    const sumbitCondemquality = useCallback(
        (e) => {
            e.preventDefault()
            const InsertCondemquality = async (postdata) => {
                const result = await axioslogin.post('/condemMasters/QualityInsert', postdata)
                const { message, success } = result.data
                if (success === 1) {
                    succesNotify(message)
                    queryClient.invalidateQueries('CondemQualitydata')
                    reset()
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            const CondemqualityUpdate = async (patchdata) => {
                const result = await axioslogin.patch('/condemMasters/QualityUpdate', patchdata)
                const { message, success } = result.data
                if (success === 2) {
                    succesNotify(message)
                    queryClient.invalidateQueries('CondemQualitydata')
                    reset()
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            if (value === 0) {
                if (quality_name !== '') {
                    InsertCondemquality(postdata)
                } else {
                    infoNotify("Please Enter Asset Type")
                }
            }
            else {
                CondemqualityUpdate(patchdata)
            }
        },
        [postdata, value, patchdata, quality_name, queryClient],
    )
    const RowSelect = useCallback((val) => {
        const { quality_slno, quality_name, quality_status } = val
        setValue(1)
        const frmdata = {
            quality_slno: quality_slno,
            quality_name: quality_name,
            quality_status: quality_status === 1 ? true : false,
        }
        setCondemquality(frmdata)
    }, [])


    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])

    const refreshWindow = useCallback(() => {
        const frmdata = {
            quality_slno: '',
            quality_name: '',
            quality_status: false,
        }
        setCondemquality(frmdata)
        setValue(0)
    }, [setCondemquality])
    return (
        <CardMaster
            title="Asset Condemnation Quality Master"
            submit={sumbitCondemquality}
            close={backtoSetting}
            refresh={refreshWindow}
        >

            <Box sx={{ height: '100%', flex: 1, display: 'flex' }}>
                <Box sx={{ width: 300, px: 1 }}>
                    <TextFieldCustom
                        placeholder="Quality"
                        type="text"
                        size="sm"
                        name="quality_name"
                        value={quality_name}
                        onchange={updateCondemquality}
                    ></TextFieldCustom>
                    <Box sx={{ pt: 1.5, pl: .5 }}>
                        <CusCheckBox
                            label="status"
                            color="primary"
                            size="md"
                            name="quality_status"
                            value={quality_status}
                            checked={quality_status}
                            onCheked={updateCondemquality}
                        ></CusCheckBox>
                    </Box>
                </Box>
                <CondemnQualityMastTable count={count} RowSelect={RowSelect} />
            </Box>
        </CardMaster>
    )
}

export default memo(CondemnQualityMast)

