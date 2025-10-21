import React, { memo, useCallback, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import CondemCategoryMastTable from './CondemCategoryMastTable'
import { Box } from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

const CondemnCategoryMast = () => {


    const history = useNavigate()
    const [value, setValue] = useState(0)
    const [count, setCount] = useState(0)

    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const queryClient = useQueryClient()
    const [category, setcategory] = useState({
        category_slno: '',
        category_name: '',
        category_status: false,
    })
    const { category_slno, category_name, category_status } = category

    const updatecategory = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setcategory({ ...category, [e.target.name]: value })
        },
        [category],
    )
    const reset = () => {
        const frmdata = {
            category_slno: '',
            category_name: '',
            category_status: false,
        }
        setcategory(frmdata)
        setCount(0)
        setValue(0)
    }
    const postdata = useMemo(() => {
        return {
            category_name: category_name,
            category_status: category_status === true ? 1 : 0,
            create_user: id
        }
    }, [category_name, category_status, id])
    const patchdata = useMemo(() => {
        return {
            category_slno: category_slno,
            category_name: category_name,
            category_status: category_status === true ? 1 : 0,
            edit_user: id
        }
    }, [category_slno, category_name, category_status, id])

    const sumbitcategory = useCallback(
        (e) => {
            e.preventDefault()
            const Insertcategory = async (postdata) => {
                const result = await axioslogin.post('/condemMasters/CategoryInsert', postdata)
                const { message, success } = result.data
                if (success === 1) {
                    succesNotify(message)
                    queryClient.invalidateQueries('CondemCategory')
                    reset()
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            const categoryUpdate = async (patchdata) => {
                const result = await axioslogin.patch('/condemMasters/categoryUpdate', patchdata)
                const { message, success } = result.data
                if (success === 2) {
                    succesNotify(message)
                    queryClient.invalidateQueries('CondemCategory')
                    reset()
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            if (value === 0) {
                if (category_name !== '') {
                    Insertcategory(postdata)
                } else {
                    infoNotify("Please Enter Asset Type")
                }
            }
            else {
                categoryUpdate(patchdata)
            }
        },
        [postdata, value, patchdata, category_name, queryClient],
    )
    const RowSelect = useCallback((val) => {
        const { category_slno, category_name, category_status } = val
        setValue(1)
        const frmdata = {
            category_slno: category_slno,
            category_name: category_name,
            category_status: category_status === 1 ? true : false,
        }
        setcategory(frmdata)
    }, [])


    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])


    const refreshWindow = useCallback(() => {
        const frmdata = {
            category_slno: '',
            category_name: '',
            category_status: false,
        }
        setcategory(frmdata)
        setValue(0)
    }, [setcategory])

    return (
        <CardMaster
            title="Asset Condemnation Category"
            submit={sumbitcategory}
            close={backtoSetting}
            refresh={refreshWindow}
        >

            <Box sx={{ height: '100%', flex: 1, display: 'flex' }}>
                <Box sx={{ width: 300, px: 1 }}>
                    <TextFieldCustom
                        placeholder="Category"
                        type="text"
                        size="sm"
                        name="category_name"
                        value={category_name}
                        onchange={updatecategory}
                    ></TextFieldCustom>
                    <Box sx={{ pt: 1.5, pl: .5 }}>
                        <CusCheckBox
                            label="status"
                            color="primary"
                            size="md"
                            name="category_status"
                            value={category_status}
                            checked={category_status}
                            onCheked={updatecategory}
                        ></CusCheckBox>
                    </Box>
                </Box>
                <CondemCategoryMastTable count={count} RowSelect={RowSelect} />
            </Box>
        </CardMaster>
    )
}

export default memo(CondemnCategoryMast)
