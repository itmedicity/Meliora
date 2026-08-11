import React, { useCallback, useMemo, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { useSelector } from 'react-redux'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import TaxMasterTable from './TaxMasterTable'

const Taxmaster = () => {
    const history = useNavigate()
    const [request, setRequest] = useState({
        tax: '',
        tax_status: false,
        tax_slno: ''
    })

    const [count, setCount] = useState(0)
    //state for edit
    const [edit, setEdit] = useState(0)
    //data set for edit
    const rowSelect = useCallback(params => {
        setEdit(1)
        const data = params.api.getSelectedRows()
        const { tax_id, tax, status } = data[0]

        const frmdata = {
            tax: tax,
            tax_status: status === 'Yes' ? true : false,
            tax_slno: tax_id
        }
        setRequest(frmdata)
    }, [])
    //destructuring
    const { tax, tax_status, tax_slno } = request

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
            tax: tax,
            tax_status: tax_status === true ? 1 : 0,
            create_user: id
        }
    }, [tax, tax_status, id])

    const patchdata = useMemo(() => {
        return {
            tax: tax,
            tax_status: tax_status === true ? 1 : 0,
            tax_slno: tax_slno
        }
    }, [tax, tax_status, tax_slno])

    const submitDashBoard = useCallback(
        async () => {
            const formreset = {
                tax: '',
                tax_status: false,
                tax_slno: ''
            }

            /***  * insert function for use call back     */
            const InsertFun = async postdata => {
                const result = await axioslogin.post('/tokenMaster/inserttax', postdata)
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
                const result = await axioslogin.post('/tokenMaster/updatetax', patchdata)
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
        <CardMaster title="Tax Master" submit={submitDashBoard} close={backtoSetting} refresh={refreshWindow}>
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
                                placeholder="Enter Tax%"
                                type="number"
                                size="sm"
                                name="tax"
                                value={tax}
                                onchange={updateRequesttype}
                            />

                            <CusCheckBox
                                label="Status"
                                color="primary"
                                size="md"
                                name="tax_status"
                                value={tax_status}
                                checked={tax_status}
                                onCheked={updateRequesttype}
                            />
                        </Box>

                        {/* Right Section */}
                        <Box sx={{ width: "70%", }} >
                            <TaxMasterTable
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

export default Taxmaster