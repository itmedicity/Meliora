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
    const [qtDepartment, setQtDepartment] = useState({
        qi_dept_slno: '0',
        qi_dept_name: '',
        qi_dept_status: false,
    })
    const { qi_dept_name, qi_dept_status, qi_dept_slno } = qtDepartment
    const updateQtDepartment = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setQtDepartment({ ...qtDepartment, [e.target.name]: value })
    }, [qtDepartment])
    const reset = () => {
        const formreset = {
            qi_dept_name: '',
            qi_dept_status: false,
        }
        setQtDepartment(formreset);
        setCount(0)
        setValue(0)
    }
    const postdata = useMemo(() => {
        return {
            // qi_dept_slno: qi_dept_slno,
            qi_dept_name: qi_dept_name,
            qi_dept_status: qi_dept_status === true ? 1 : 0,
            create_user: id
        }
    }, [qi_dept_name, qi_dept_status, id])

    const patchdata = useMemo(() => {
        return {
            qi_dept_slno: qi_dept_slno,
            qi_dept_name: qi_dept_name,
            qi_dept_status: qi_dept_status === true ? 1 : 0,
            edit_user: id
        }
    }, [qi_dept_slno, qi_dept_name, qi_dept_status, id])

    const submitQualityDept = useCallback((e) => {
        e.preventDefault();
        const InsertDepartment = async (postdata) => {
            const result = await axioslogin.post('/qualityDept/insert', postdata);
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
            const result = await axioslogin.patch('/qualityDept/update', patchdata);
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
        const { qi_dept_slno, qi_dept_name, status, } = data[0]
        const frmdata = {
            qi_dept_slno: qi_dept_slno,
            qi_dept_name: qi_dept_name,
            qi_dept_status: status === 'Yes' ? true : false
        }
        setQtDepartment(frmdata)
    }, [])

    const refreshWindow = useCallback(() => {
        reset()

    }, [])

    return (
        <CardMaster
            title="Quality Indicator Departments"
            submit={submitQualityDept}
            close={backtoSetting}
            refresh={refreshWindow}
        >
            <Box sx={{ pl: 1, display: 'flex' }}>
                <Box sx={{ flex: 1, pr: 3 }}>
                    <Box>
                        <TextFieldCustom
                            placeholder="Department Name"
                            type="text"
                            size="sm"
                            name="qi_dept_name"
                            value={qi_dept_name}
                            onchange={updateQtDepartment}
                        />
                    </Box>
                    <Box sx={{ pt: 1 }}>
                        <CusCheckBox
                            label="Status"
                            color="primary"
                            size="md"
                            name="qi_dept_status"
                            value={qi_dept_status}
                            checked={qi_dept_status}
                            onCheked={updateQtDepartment}
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