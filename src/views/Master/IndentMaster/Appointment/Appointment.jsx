import { Box } from '@mui/joy'
import { format } from 'date-fns'
import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomInputDateCmp from 'src/views/CentralRequestManagement/ComonComponent/Components/CustomInputDateCmp'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import moment from 'moment'
import AppointmentTable from './AppointmentTable'
import { useSelector } from 'react-redux'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'

const Appointment = () => {
    const history = useNavigate()

    const [request, setRequest] = useState({
        appointment_date: format(new Date(), 'yyyy-MM-dd'),
        appointment_status: false,
        appointment_slno: ''
    })
    const { appointment_date, appointment_status } = request

    const updateRequesttype = useCallback(
        e => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setRequest({ ...request, [e.target.name]: value })
        },
        [request]
    )
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
    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])

    const refreshWindow = useCallback(() => {
        // setCategory([])
    }, [])
    // Get login user emp_id
    const id = useSelector(state => {
        return state.LoginUserData.empid
    })
    //data for insert
    const postdata = useMemo(() => {
        return {
            appointment_date: appointment_date,
            appointment_status: appointment_status === true ? 1 : 0,
            create_user: id
        }
    }, [appointment_date, appointment_status, id])


    const submitDashBoard = useCallback(
        async () => {
            const formreset = {
                appointment_date: format(new Date(), 'yyyy-MM-dd'),
                appointment_status: false,
                appointment_slno: ''
            }

            /***  * insert function for use call back     */
            const InsertFun = async postdata => {
                const result = await axioslogin.post('/tokenMaster/insertdate', postdata)
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


            if (edit === 0) {
                InsertFun(postdata)
            } else {
                InsertFun(postdata)
            }
        },
        [postdata, edit, count]
    )
    return (
        <CardMaster title="Appointment Master" submit={submitDashBoard} close={backtoSetting} refresh={refreshWindow}>
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
                            {/* <TextFieldCustom
                                placeholder="Token Count"
                                type="number"
                                size="sm"
                                name="token_number"
                                value={token_number}
                                onchange={updateRequesttype}
                            /> */}
                            <CustomInputDateCmp
                                className={{ width: '100%', height: 35, bgcolor: 'white' }}
                                size={'sm'}
                                type="date"
                                name={'appointment_date'}
                                value={appointment_date}
                                slotProps={{
                                    input: { min: moment(new Date()).format('YYYY-MM-DD') }
                                }}
                                handleChange={updateRequesttype}
                            />

                            <CusCheckBox
                                label="Status"
                                color="primary"
                                size="md"
                                name="appointment_status"
                                value={appointment_status}
                                checked={appointment_status}
                                onCheked={updateRequesttype}
                            />
                        </Box>

                        {/* Right Section */}
                        <Box sx={{ width: "70%", }} >
                            {/* <TokenMastTable
                                count={count}
                                rowSelect={rowSelect}
                                setCount={setCount}
                            /> */}
                            <AppointmentTable count={count}
                                rowSelect={rowSelect} setCount={setCount}
                            />

                        </Box>
                    </Box>
                </Box>
            </Box>
        </CardMaster>)
}

export default Appointment