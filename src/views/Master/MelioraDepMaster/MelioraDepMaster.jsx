import React, { memo, useCallback } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import { useNavigate } from 'react-router-dom'

const MelioraDepMaster = () => {
    const history = useNavigate()

    const submitDepartment = useCallback(() => {
    }, [])

    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])
    const refreshWindow = useCallback(() => {

    }, [])
    return (
        <CardMaster title="Department Master" submit={submitDepartment} close={backtoSetting} refresh={refreshWindow}>
        </CardMaster>

    )
}

export default memo(MelioraDepMaster)