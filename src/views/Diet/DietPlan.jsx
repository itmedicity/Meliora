import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import CardMaster from '../Components/CardMaster'

const DietPlan = () => {
    const history = useHistory();
    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    return (
        <CardMaster
            title="Diet Plan"
            close={backtoSetting}
        >
        </CardMaster>
    )
}

export default DietPlan