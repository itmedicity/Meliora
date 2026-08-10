import React, { useCallback, useMemo, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TokenMastTable from './TokenMastTable'
import { useSelector } from 'react-redux'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'

const TokenMaster = () => {
    const history = useNavigate()
    const [request, setRequest] = useState({
        token_number: 0,
        token_status: false,
        token_slno: ''
    })

    const [count, setCount] = useState(0)
    //state for edit
    const [edit, setEdit] = useState(0)
    //data set for edit
    const rowSelect = useCallback(params => {
        setEdit(1)
        const data = params.api.getSelectedRows()

        const { token_number, status, token_slno } = data[0]
        const frmdata = {
            token_number: token_number,
            token_status: status === 'Yes' ? true : false,
            token_slno: token_slno
        }
        setRequest(frmdata)
    }, [])
    //destructuring
    const { token_number, token_status, token_slno } = request

    const updateRequesttype = useCallback(
        e => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setRequest({ ...request, [e.target.name]: value })
        },
        [request]
    )
    // Get login user emp_id
    const id = useSelector(state => {
        return state.LoginUserData.empid
    })
    //data for insert
    const postdata = useMemo(() => {
        return {
            token_number: token_number,
            token_status: token_status === true ? 1 : 0,
            create_user: id
        }
    }, [token_number, token_status, id])
    const patchdata = useMemo(() => {
        return {
            token_number: token_number,
            token_status: token_status === true ? 1 : 0,
            token_slno: token_slno
        }
    }, [token_number, token_status, token_slno])

    const submitDashBoard = useCallback(
        async () => {
            const formreset = {
                token_number: 0,
                token_status: false,
                token_slno: ''
            }

            /***  * insert function for use call back     */
            const InsertFun = async postdata => {
                const result = await axioslogin.post('/tokenMaster/insert', postdata)
                const { message, success } = result.data
                if (success === 1) {
                    succesNotify(message)
                    setCount(count + 1)
                    setRequest(formreset)
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            /***  * update function for use call back     */
            const updateFun = async patchdata => {
                const result = await axioslogin.post('/tokenMaster/update', patchdata)
                const { message, success } = result.data
                if (success === 2) {
                    succesNotify(message)
                    setCount(count + 1)
                    setRequest(formreset)
                    setEdit(0)
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            /*** edit=0 insert api call work else update call
             * edit initialy '0' when edit button click value changes to '1'
             */
            if (edit === 0) {
                InsertFun(postdata)
            } else {
                updateFun(patchdata)
            }
        },
        [edit, postdata, patchdata, count]
    )

    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])

    const refreshWindow = useCallback(() => {
        // setCategory([])
    }, [])
    return (
        <CardMaster title="Token Count  Master" submit={submitDashBoard} close={backtoSetting} refresh={refreshWindow}>
            <Box sx={{ p: 1 }}>
                <Box sx={{ p: 1 }}>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            alignItems: "flex-start",
                        }}
                    >
                        {/* Left Section */}
                        <Box
                            sx={{
                                width: "30%",
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            <TextFieldCustom
                                placeholder="Token Count"
                                type="number"
                                size="sm"
                                name="token_number"
                                value={token_number}
                                onchange={updateRequesttype}
                            />

                            <CusCheckBox
                                label="Status"
                                color="primary"
                                size="md"
                                name="token_status"
                                value={token_status}
                                checked={token_status}
                                onCheked={updateRequesttype}
                            />
                        </Box>

                        {/* Right Section */}
                        <Box sx={{ width: "70%", }} >
                            <TokenMastTable
                                count={count}
                                rowSelect={rowSelect}
                                setCount={setCount}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </CardMaster>
    )
}

export default TokenMaster