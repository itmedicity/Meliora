import { Box } from '@mui/material'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import QualityDeptTable from './QualityDeptTable'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'

const QualityDept = () => {

    const [count, setCount] = useState(0)
    const [value, setValue] = useState(0)
    const history = useHistory()
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])

    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })
    const [censusNurs, setCensusNurs] = useState({
        census_ns_slno: '0',
        census_ns_name: '',
        census_ns_code: '',
        census_ou_code: '',
        nursing_status: false,
    })
    const { census_ns_code, census_ns_name, census_ou_code, nursing_status, census_ns_slno } = censusNurs
    const updateCensusNurs = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setCensusNurs({ ...censusNurs, [e.target.name]: value })
    }, [censusNurs])
    const reset = () => {
        const formreset = {
            census_ns_name: '',
            census_ns_code: '',
            census_ou_code: '',
            nursing_status: false,
        }
        setCensusNurs(formreset);
        setCount(0)
        setValue(0)
    }

    // census_ns_slno, census_ns_code, census_ou_code, nursing_status

    const postdata = useMemo(() => {
        return {
            // census_ns_slno: census_ns_slno,
            census_ns_name: census_ns_name,
            census_ns_code: census_ns_code,
            census_ou_code: census_ou_code,
            nursing_status: nursing_status === true ? 1 : 0,
            create_user: id
        }
    }, [census_ns_code, nursing_status, id, census_ou_code, census_ns_name])

    const patchdata = useMemo(() => {
        return {
            census_ns_slno: census_ns_slno,
            census_ns_name: census_ns_name,
            census_ns_code: census_ns_code,
            census_ou_code: census_ou_code,
            nursing_status: nursing_status === true ? 1 : 0,
            edit_user: id
        }
    }, [census_ns_slno, census_ns_code, census_ou_code, nursing_status, id, census_ns_name])

    const submitQualityDept = useCallback((e) => {
        e.preventDefault();
        const InsertDepartment = async (postdata) => {
            const result = await axioslogin.post('/censusNursingStat/insert', postdata);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1);
                reset()
            } else if (success === 0) {
                infoNotify(message);
            }
            else {
                infoNotify(message)
            }
        }
        const updateDepartment = async (patchdata) => {
            const result = await axioslogin.patch('/censusNursingStat/update', patchdata);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1);
                reset()
            } else if (success === 0) {
                infoNotify(message);
            }
            else {
                infoNotify(message)
            }
        }
        if (value === 0) {
            InsertDepartment(postdata)
        } else {
            updateDepartment(patchdata)
        }
    }, [postdata, count, patchdata, value])
    const rowSelect = useCallback((params) => {
        setValue(1)
        const data = params.api.getSelectedRows()
        const { census_ns_slno, census_ns_name, census_ns_code, census_ou_code, status, } = data[0]
        const frmdata = {
            census_ns_slno: census_ns_slno,
            census_ns_name: census_ns_name,
            census_ns_code: census_ns_code,
            census_ou_code: census_ou_code,
            nursing_status: status === 'Yes' ? true : false
        }
        setCensusNurs(frmdata)
    }, [])

    const refreshWindow = useCallback(() => {
        reset()

    }, [])

    return (
        <CardMaster
            title="Census Nursing Stations"
            submit={submitQualityDept}
            close={backtoSetting}
            refresh={refreshWindow}
        >
            <Box sx={{ pl: 1, display: 'flex' }}>
                <Box sx={{ flex: 1, pr: 3 }}>
                    <Box>
                        <TextFieldCustom
                            placeholder="Nursing Station Name"
                            type="text"
                            size="md"
                            name="census_ns_name"
                            value={census_ns_name}
                            onchange={updateCensusNurs}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', pt: 0.5 }}>
                        <Box sx={{ flex: 1, pr: 0.3 }}>
                            <TextFieldCustom
                                placeholder="NS Code"
                                type="text"
                                size="md"
                                name="census_ns_code"
                                value={census_ns_code}
                                onchange={updateCensusNurs}
                            />
                        </Box>
                        <Box sx={{ flex: 1, pl: 0.3 }}>
                            <TextFieldCustom
                                placeholder="OU Code"
                                type="text"
                                size="md"
                                name="census_ou_code"
                                value={census_ou_code}
                                onchange={updateCensusNurs}
                            />
                        </Box>
                    </Box>


                    <Box sx={{ pt: 1 }}>
                        <CusCheckBox
                            label="Status"
                            color="primary"
                            size="md"
                            name="nursing_status"
                            value={nursing_status}
                            checked={nursing_status}
                            onCheked={updateCensusNurs}
                        />
                    </Box>
                </Box>
                <Box sx={{ flex: 2 }}>
                    <QualityDeptTable count={count} rowSelect={rowSelect} />
                </Box>
            </Box>
        </CardMaster>
    )
}

export default memo(QualityDept)