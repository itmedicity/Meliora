import React, { useCallback, useState } from 'react'
import { Box } from '@mui/joy'
import ChooseDietName from 'src/views/CommonSelectCode/ChooseDietName'
import DietButton from 'src/views/Diet/DietComponent/DietButton'
import '../../Master/DietMasters/DietStyle/DietStyle.css'
import { useNavigate } from 'react-router-dom'
import DietMasterHeader from 'src/views/Master/DietMasters/DietComponent/DietMasterHeader'
import DietInputLabel from 'src/views/Master/DietMasters/DietComponent/DietInputLabel'
import DietDetailExpand from 'src/views/Master/DietMasters/DietComponent/DietDetailExpand'
import DietWeekTable from 'src/views/Master/DietMasters/DietComponent/DietWeekTable'




const DietTypeGrouping = () => {
    const navigate = useNavigate();

    const [diet, setDiet] = useState(0)

    const [schedule, setSchedule] = useState({})

    const hanldeGoBack = useCallback(() => {
        navigate('/Home/Settings')
    }, [navigate])



    return (
        <Box sx={{
            width: '100%',
            minHeight: 650,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Box sx={{
                width: '100%',
                minHeight: 650,
                borderRadius: 5,
                border: '1px solid #9822c365',
            }}>

                {/* HEADER */}
                <DietMasterHeader onClose={hanldeGoBack} name="DIET TYPE GROUPING" />

                <Box sx={{ p: 1 }}>

                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Box sx={{ width: '50%' }}>
                            <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <DietInputLabel name={"Select Diet Name"} />
                                <ChooseDietName width={300} value={diet} setValue={setDiet} />
                            </Box>
                        </Box>
                    </Box>

                    <DietDetailExpand name={"Diet Food Detail"} status={true} >
                        <Box sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            pb: 1,
                            flexDirection: 'column'
                        }}>
                            <Box sx={{ width: '100%', mt: 1 }}>
                                <DietWeekTable
                                    weekData={schedule}
                                    onUpdateWeek={setSchedule}
                                />
                            </Box>
                            <Box sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'start',
                                p: 1
                            }}>
                                <DietButton
                                    name='Add' />
                            </Box>
                        </Box>
                    </DietDetailExpand>
                </Box>
            </Box>
        </Box>
    )
}

export default DietTypeGrouping
