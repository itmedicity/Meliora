
import { Box, CssVarsProvider, Textarea } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { getQltyDept } from 'src/redux/actions/QualityIndicatorDept.action'
import QualityIndicatorSelect from 'src/views/CommonSelectCode/QualityIndicatorSelect'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import QualityIndicatorsTable from './QualityIndicatorsTable'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'


const QualityIndicators = () => {
    const [count, setCount] = useState(0)
    const [value, setValue] = useState(0)
    const [qltyDept, setQltyDept] = useState(0)
    const history = useHistory()
    const dispatch = useDispatch()
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])

    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })

    const [qualityIndicator, setQualityIndicator] = useState({
        qi_slno: '0',
        qi_name: '',
        qi_status: false
    })
    const { qi_name, qi_status, qi_slno } = qualityIndicator
    const updateQtIndicator = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setQualityIndicator({ ...qualityIndicator, [e.target.name]: value })
    }, [qualityIndicator])

    useEffect(() => {
        dispatch(getQltyDept())
    }, [dispatch])
    const reset = () => {
        const formreset = {
            qi_slno: 0,
            qi_name: '',
            qi_status: false,
        }
        setQualityIndicator(formreset);
        setQltyDept(0)
        setCount(0)
        setValue(0)
    }
    const postdata = useMemo(() => {
        return {
            qi_dept_slno: qltyDept,
            qi_name: qi_name,
            qi_status: qi_status === true ? 1 : 0,
            create_user: id
        }
    }, [qi_name, qltyDept, qi_status, id])
    const patchdata = useMemo(() => {
        return {
            qi_slno: qi_slno,
            qi_name: qi_name,
            qi_dept_slno: qltyDept,
            qi_status: qi_status === true ? 1 : 0,
            edit_user: id
        }
    }, [qi_slno, qltyDept, qi_name, qi_status, id])
    const submitQualityIndicator = useCallback((e) => {
        e.preventDefault();
        const InsertQI = async (postdata) => {
            const result = await axioslogin.post('/qualityindicator/insert', postdata);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1);
                reset()
            }
            else {
                infoNotify(message)
            }
        }
        const updateQI = async (patchdata) => {
            const result = await axioslogin.patch('/qualityindicator/update', patchdata);
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
            InsertQI(postdata)
        } else {
            updateQI(patchdata)
        }
    }, [postdata, count, patchdata, value])

    const rowSelect = useCallback((params) => {
        setValue(1)
        const data = params.api.getSelectedRows()
        const { qi_slno, qi_name, qi_dept_slno, status } = data[0]
        const frmdata = {
            qi_slno: qi_slno,
            qi_name: qi_name,
            qi_status: status === 'Yes' ? true : false
        }
        setQualityIndicator(frmdata)
        setQltyDept(qi_dept_slno)
    }, [])

    const refreshWindow = useCallback(() => {
        reset()

    }, [])

    return (
        <CardMaster
            title="Quality Indicator"
            submit={submitQualityIndicator}
            close={backtoSetting}
            refresh={refreshWindow}
        >
            <CssVarsProvider>
                <Box sx={{ pl: 1, display: 'flex' }}>
                    <Box sx={{ flex: 1 }}>
                        <Box >
                            <QualityIndicatorSelect
                                qltyDept={qltyDept}
                                setQltyDept={setQltyDept}
                            />
                        </Box>
                        <Box sx={{ pt: 0.5 }}>
                            <Textarea
                                placeholder="Quality Indicator"
                                type="text"
                                size="md"
                                name="qi_name"
                                value={qi_name}
                                onChange={updateQtIndicator}
                            />
                        </Box>
                        <Box sx={{ pt: 0.5 }}>
                            <CusCheckBox
                                label="Status"
                                color="primary"
                                size="md"
                                name="qi_status"
                                value={qi_status}
                                checked={qi_status}
                                onCheked={updateQtIndicator}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ flex: 2 }}>
                        <QualityIndicatorsTable count={count} rowSelect={rowSelect} />
                    </Box>
                </Box>
            </CssVarsProvider>
        </CardMaster>
    )
}

export default memo(QualityIndicators)