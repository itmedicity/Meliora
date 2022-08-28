import React, { useCallback } from 'react'
import CardCloseOnly from '../Components/CardCloseOnly'
import { useHistory } from 'react-router-dom'
import { Box } from '@mui/material'
import DietProcessDashCmp from '../dashboard/DietProcessDashCmp'

const DietProcess = () => {
    //*** Initializing */
    const history = useHistory();

    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])

    return (
        <CardCloseOnly
            title="Diet Proccess"
            close={backtoSetting}
        >
            <Box sx={{ width: "100%", pl: 2, pt: 1, pr: 2, pb: 2 }}>
                <DietProcessDashCmp />
            </Box>
        </CardCloseOnly>
    )
}

export default DietProcess