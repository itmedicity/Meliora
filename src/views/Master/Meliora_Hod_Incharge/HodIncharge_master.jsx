import { Box } from '@mui/joy'
import React, { useCallback, useMemo, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import { useNavigate } from 'react-router-dom'
import MelioraDpSection from 'src/views/CommonSelectCode/MelioraDpSection'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import MelEmpNameDeptSecSelect from 'src/views/CommonSelectCode/MelEmpNameDeptSecSelect'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import AuthorizationMastTableMeliora from './AuthorizationMastTableMeliora'
import { useQueryClient } from '@tanstack/react-query'

const HodIncharge_master = () => {
    const history = useNavigate()
    const [deptsec, setDeptSec] = useState(0)
    const [incharge, setIncharge] = useState(false)
    const [hod, sethod] = useState(false)
    const [post, setPost] = useState(0)
    const [empid, setEmpid] = useState(0)
    const [empdeptsec, setEmpDeptSec] = useState(0)
    const queryClient = useQueryClient()

    const updateIncharge = e => {
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
    const updateHod = e => {
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

    const reset = useCallback(() => {
        setDeptSec(0)
        setEmpid(0)
        setEmpDeptSec(0)
        setIncharge(false)
        sethod(false)
        setPost(0)
    }, [])
    // Get login user emp_id
    const id = useSelector(state => {
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


    const submit = useCallback(
        () => {
            const InsertAuthorization = async postData => {
                const result = await axioslogin.post('InchHODAuthorization/InchHODAuthMeliora', postData)
                const { message, success } = result.data
                if (success === 1) {
                    succesNotify(message)
                    reset()
                    queryClient.invalidateQueries('getMelioraInchHODAuthorization')

                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            if (post !== 0) {
                InsertAuthorization(postData)
            } else {
                warningNotify('Please Check any post before save')
            }
        },
        [post, postData, reset]
    )

    //close button function
    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])

    const refreshWindow = useCallback(() => {
        reset()
    }, [reset])


    const rowSelect = useCallback(
        params => {
            const data = params.api.getSelectedRows()
            const { mel_authorization_slno } = data[0]

            const patchdata = {
                authorization_slno: mel_authorization_slno,
                delete_user: id
            }
            const UpdateAuthorization = async patchdata => {
                const result = await axioslogin.patch('/InchHODAuthorization/inactive', patchdata)
                const { message, success } = result.data
                if (success === 2) {
                    succesNotify(message)
                    reset()
                    queryClient.invalidateQueries('getMelioraInchHODAuthorization')

                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            UpdateAuthorization(patchdata)
        },
        [id, reset]
    )
    return (
        <Box sx={{ width: '100%' }}>
            <CardMaster title="Meliora Incharge/HOD Authorization" submit={submit} close={backtoSetting} refresh={refreshWindow}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Box sx={{ pl: 2, width: '25%' }}>
                        <MelioraDpSection value={deptsec} setValue={setDeptSec} />
                    </Box>
                    <Box sx={{ pl: 2, width: '10%', mt: 1 }}>
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
                    <Box sx={{ pl: 2, width: '8%', mt: 1 }}>
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
                    <Box sx={{ pl: 2, width: '25%' }}>
                        <MelioraDpSection value={empdeptsec} setValue={setEmpDeptSec} />
                    </Box>
                    <Box sx={{ pl: 2, width: '20%' }}>
                        <MelEmpNameDeptSecSelect value={empid} setValue={setEmpid} deptsec={empdeptsec} />
                    </Box>

                </Box>
                <Box>
                    <AuthorizationMastTableMeliora rowSelect={rowSelect} />
                </Box>
            </CardMaster>
        </Box>
    )
}

export default HodIncharge_master