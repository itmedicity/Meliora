import { Box, CssVarsProvider, Input, Tooltip } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardMaster from 'src/views/Components/CardMaster'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import SearchIcon from '@mui/icons-material/Search';
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import QideptAcessSelect from 'src/views/CommonSelectCode/QideptAcessSelect'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import DeptAcessTableView from './DeptAcessTableView'
const DeptAcessMast = () => {
    const [qidept, setQidept] = useState([])
    const [empName, setEmpName] = useState('')
    const [empId, setEmpId] = useState(0)
    const [emflag, setemflag] = useState(0)
    const [edit, setEdit] = useState(0)
    const [count, setCount] = useState(0)
    const history = useHistory()

    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })
    // access_slno, em_id, dpt_access_list,access_status
    const [dptAccess, setdptAccess] = useState({
        access_slno: '0',
        em_no: '',
        access_status: false
    })
    const { access_slno, em_no, access_status } = dptAccess
    const updateDeptAcess = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setdptAccess({ ...dptAccess, [e.target.name]: value })
    }, [dptAccess])
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])

    const SearchEmployee = useCallback(() => {
        if (em_no === '') {
            infoNotify("Enter Employee Number")
        } else {
            const getempDetails = async () => {
                const result = await axioslogin.get(`/qideptAccess/emp/${em_no}`)
                const { success, data, message } = result.data
                if (success === 1) {
                    const { em_id, em_name } = data[0]
                    setEmpName(em_name)
                    setEmpId(em_id)
                    setemflag(1)
                }
                else {
                    setemflag(0)
                    infoNotify(message)
                }
            }
            getempDetails();
        }
    }, [em_no])

    const reset = useCallback(() => {
        const formreset = {
            access_slno: '0',
            em_no: '',
            access_status: false
        }
        setdptAccess(formreset)
        setQidept([])
        setEmpName('')
        setEmpId(0)
        setemflag(0)
        setEdit(0)
        setCount(0)
    }, [])
    const refreshWindow = useCallback(() => {
        reset()
    }, [reset])
    const postdata = useMemo(() => {
        return {
            em_id: empId,
            dpt_access_list: qidept,
            access_status: access_status === true ? 1 : 0,
            create_user: id,
        }
    }, [empId, qidept, access_status, id])

    const patchdata = useMemo(() => {
        return {
            em_id: empId,
            dpt_access_list: qidept,
            access_status: access_status === true ? 1 : 0,
            edit_user: id,
            access_slno: access_slno
        }
    }, [empId, qidept, access_status, id, access_slno])

    const submitAcessDetails = useCallback((e) => {
        e.preventDefault();
        if (em_no === '') {
            infoNotify("Please Enter Employee Number")
        } else if (qidept.length === 0) {
            infoNotify("Please Select Any Department")
        } else {
            const InsertDetails = async (postdata) => {
                const result = await axioslogin.post('/qideptAccess/insert', postdata);
                const { message, success } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    setCount(count + 1);
                    reset()
                } else {
                    infoNotify(message)
                }
            }
            const updateDetails = async (patchdata) => {
                const result = await axioslogin.patch('/qideptAccess/update', patchdata);
                const { message, success } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    setCount(count + 1);
                    reset()
                } else {
                    infoNotify(message)
                }
            }
            if (edit === 0) {
                InsertDetails(postdata)
            } else {
                updateDetails(patchdata)
            }
        }

    }, [postdata, count, edit, patchdata, reset, em_no, qidept.length])
    const rowSelect = useCallback((params) => {
        setEdit(1)
        setemflag(1)
        const data = params.api.getSelectedRows()
        const { access_slno, em_id, em_no, em_name, status } = data[0]
        const dpt = JSON?.parse(data[0]?.dpt_access_list)
        setQidept(dpt)
        const frmdata = {
            access_slno: access_slno,
            em_no: em_no,
            access_status: status === 'Yes' ? true : false
        }
        setdptAccess(frmdata)
        setEmpId(em_id)
        setEmpName(em_name)
    }, [])

    return (
        <CardMaster
            title="QI Department Access Mast"
            submit={submitAcessDetails}
            close={backtoSetting}
            refresh={refreshWindow}
        >
            <Box sx={{ pl: 1, display: 'flex' }}>
                <Box sx={{ flex: 1, pr: 3 }}>
                    <Box sx={{ display: 'flex', flex: 1 }}>
                        <Box sx={{ flex: 1, pt: 0.3 }}>
                            <TextFieldCustom
                                placeholder="Employee No."
                                type="text"
                                size="md"
                                name="em_no"
                                value={em_no}
                                onchange={updateDeptAcess}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', flex: 0.1, pt: 0.8, pl: 1 }}>
                            <CssVarsProvider>
                                <Tooltip title="Search" placement='right'>
                                    < SearchIcon sx={{ color: '#555830', cursor: 'pointer', height: 30, width: 30 }} fontSize='large'
                                        onClick={SearchEmployee}
                                    />
                                </Tooltip>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    {emflag === 1 ?
                        <Box sx={{ flex: 1, pb: 0.3 }}>
                            <CssVarsProvider>
                                <Input
                                    readOnly
                                    size="sm"
                                    name="empName"
                                    value={empName}
                                    sx={{ height: 35, fontWeight: 550, fontSize: 16 }}
                                />
                            </CssVarsProvider>
                        </Box>
                        : null}
                    <Box sx={{ flex: 1, pt: 0.6 }}>
                        <QideptAcessSelect qidept={qidept} setQidept={setQidept} />
                    </Box>
                    <Box sx={{ flex: 1, pt: 0.5, pl: 0.1 }}>
                        <CusCheckBox
                            label="Status"
                            color="primary"
                            size="md"
                            name="access_status"
                            value={access_status}
                            checked={access_status}
                            onCheked={updateDeptAcess}
                        />
                    </Box>
                </Box>
                <Box sx={{ flex: 2, }}>
                    <DeptAcessTableView rowSelect={rowSelect} count={count} />
                </Box>
            </Box>

        </CardMaster >
    )
}

export default memo(DeptAcessMast)