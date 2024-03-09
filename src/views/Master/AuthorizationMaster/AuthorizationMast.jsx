import { Box } from '@mui/system'
import React, { useCallback, useMemo, useState, memo, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
import DeptSectionSelect from 'src/views/CommonSelectCode/DeptSectionSelect'
import EmpNameDeptSecSelect from 'src/views/CommonSelectCode/EmpNameDeptSecSelect'
import AuthorizationMastTable from './AuthorizationMastTable'

const AuthorizationMast = () => {

    const history = useHistory();
    const [count, setCount] = useState(0);
    const [deptsec, setDeptSec] = useState(0)
    const [empid, setEmpid] = useState(0)
    const [empdeptsec, setEmpDeptSec] = useState(0)
    const [incharge, setIncharge] = useState(false)
    const [hod, sethod] = useState(false)
    const [post, setPost] = useState(0)

    const updateIncharge = (e) => {
        if (e.target.checked === true) {
            setIncharge(true)
            sethod(false)
            setPost(1)
        } else {
            sethod(false)
            setIncharge(false)
            setPost(0)
        }
    }
    const updateHod = (e) => {
        if (e.target.checked === true) {
            sethod(true)
            setIncharge(false)
            setPost(2)
        } else {
            setIncharge(false)
            sethod(false)
            setPost(0)
        }
    }

    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const postData = useMemo(() => {
        return {
            dept_section: deptsec,
            auth_post: post,
            dept_section_post: empdeptsec,
            emp_id: empid,
            create_user: id
        }
    }, [deptsec, empdeptsec, empid, id, post])

    const reset = useCallback(() => {
        setCount(0)
        setDeptSec(0)
        setEmpid(0)
        setEmpDeptSec(0)
        setIncharge(false)
        sethod(false)
        setPost(0)
    }, [])


    const submit = useCallback((e) => {
        const InsertAuthorization = async (postData) => {
            const result = await axioslogin.post('/InchHODAuthorization', postData);
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

        if (post !== 0) {
            InsertAuthorization(postData)
        } else {
            warningNotify("Please Check any post before save")
        }

    }, [post, postData, reset, count, setCount])

    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])

    const refreshWindow = useCallback(() => {
        reset()
    }, [reset])

    const rowSelect = useCallback((params) => {
        const data = params.api.getSelectedRows()
        const { authorization_slno } = data[0]

        const patchdata = {
            authorization_slno: authorization_slno,
            delete_user: id
        }

        const UpdateAuthorization = async (patchdata) => {
            const result = await axioslogin.patch('/InchHODAuthorization', patchdata);
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
        UpdateAuthorization(patchdata)
    }, [id, count, setCount, reset])


    return (
        <Fragment>
            <CardMaster
                title="Incharge/HOD Authorization"
                submit={submit}
                close={backtoSetting}
                refresh={refreshWindow}
            >
                <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "center", }}>
                    <Box sx={{ pl: 2, width: "25%" }}>
                        <DeptSectionSelect
                            value={deptsec}
                            setValue={setDeptSec}
                        />
                    </Box>
                    <Box sx={{ pl: 2, width: "10%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="danger"
                            size="md"
                            name="estimate"
                            label="Incharge"
                            value={incharge}
                            onCheked={updateIncharge}
                            checked={incharge}
                        />
                    </Box>
                    <Box sx={{ pl: 2, width: "8%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="danger"
                            size="md"
                            name="estimate"
                            label="HOD"
                            value={hod}
                            onCheked={updateHod}
                            checked={hod}
                        />
                    </Box>
                    <Box sx={{ pl: 2, width: "20%" }}>
                        <DeptSectionSelect
                            value={empdeptsec}
                            setValue={setEmpDeptSec}
                        />
                    </Box>
                    <Box sx={{ pl: 2, width: "20%" }}>
                        <EmpNameDeptSecSelect
                            value={empid}
                            setValue={setEmpid}
                            deptsec={empdeptsec}
                        />
                    </Box>
                </Box>
            </CardMaster>
            <Box >
                <AuthorizationMastTable count={count} rowSelect={rowSelect} />
            </Box>
        </Fragment>

    )
}

export default memo(AuthorizationMast)