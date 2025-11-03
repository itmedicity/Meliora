import { Box } from '@mui/joy'
import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import ContractMasTable from './ContractMasTable'
import { useQueryClient } from '@tanstack/react-query'

const ContractMaster = () => {
    const history = useNavigate()
    const [value, setValue] = useState(0)
    const queryClient = useQueryClient()

    const [Contract, setContract] = useState({
        Contract_name: '',
        Contract_status: false,
        Contract_id: ''
    })
    const { Contract_name, Contract_status, Contract_id } = Contract

    const updateContract = useCallback(
        e => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setContract({ ...Contract, [e.target.name]: value })
        },
        [Contract]
    )
    const id = useSelector(state => {
        return state.LoginUserData.empid
    })
    const postdata = useMemo(() => {
        return {
            Contract_name: Contract_name,
            Contract_status: Contract_status === true ? 1 : 0,
            create_user: id
        }
    }, [Contract_id, Contract_name, Contract_status])

    //data for update
    const patchdata = useMemo(() => {
        return {
            Contract_name: Contract_name,
            Contract_status: Contract_status === true ? 1 : 0,
            edit_user: id,
            Contract_id: Contract_id
        }
    }, [Contract_id, Contract_name, Contract_status, id])

    const rowSelect = useCallback(params => {
        setValue(1)
        const data = params.api.getSelectedRows()
        const { contract_name, contract_id, status, } = data[0]
        const frmdata = {
            Contract_name: contract_name,
            Contract_id: contract_id,
            Contract_status: status === 1 ? true : false,
        }
        setContract(frmdata)
    }, [])


    const submitDepartment = useCallback(() => {
        const formreset = {
            Contract_name: '',
            Contract_status: '',
        }
        const InsertFun = async postdata => {
            const result = await axioslogin.post('/ContractMaster/insert', postdata)
            const { message, success } = result.data
            if (success === 1) {
                succesNotify(message)
                queryClient.invalidateQueries('getcontractitems')
                setContract(formreset)
                // setCount(count + 1)
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        const updateFun = async patchdata => {
            const result = await axioslogin.post('/ContractMaster/Updated', patchdata)
            const { message, success } = result.data
            if (success === 1) {
                succesNotify(message)
                setContract(formreset)

                // setCount(count + 1)
                queryClient.invalidateQueries('getcontractitems')
                setValue(0)
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }

        if (value === 0) {
            InsertFun(postdata)
        } else {
            updateFun(patchdata)
        }
    }, [postdata, patchdata])
    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])
    const refreshWindow = useCallback(() => {

    }, [postdata])
    return (
        <CardMaster title="Contract Type Master" submit={submitDepartment} close={backtoSetting} refresh={refreshWindow}>
            <Box sx={{ p: 1, }}>
                <Box sx={{ display: 'flex', width: '100%', gap: 1 }}>
                    <Box sx={{ width: '30%' }}>
                        <Box>
                            <TextFieldCustom
                                placeholder="Contract Name"
                                type="text"
                                size="sm"
                                name="Contract_name"
                                value={Contract_name}
                                onchange={updateContract}
                            />
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <CusCheckBox
                                label="Status"
                                color="primary"
                                size="md"
                                name="Contract_status"
                                value={Contract_status}
                                checked={Contract_status}
                                onCheked={updateContract}
                            />
                        </Box>
                    </Box>


                    <Box sx={{ width: '70%' }}>
                        <ContractMasTable rowSelect={rowSelect} />

                    </Box>

                </Box>
            </Box>
        </CardMaster>

    )
}

export default ContractMaster