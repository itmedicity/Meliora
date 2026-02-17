import React, { useCallback, useState } from 'react'
import { Box } from '@mui/joy'
import ChooseDietName from 'src/views/CommonSelectCode/ChooseDietName'
import ChooseRoomCategory from 'src/views/CommonSelectCode/ChooseRoomCategory'
import DietButton from 'src/views/Diet/DietComponent/DietButton'
import '../DietStyle/DietStyle.css'
import DietInputLabel from '../DietComponent/DietInputLabel'
import DietDetailExpand from '../DietComponent/DietDetailExpand'
import DietTable from '../DietComponent/DietTable'
import DietWeekTable from '../DietComponent/DietWeekTable'
import { useNavigate } from 'react-router-dom'
import DietMasterHeader from '../DietComponent/DietMasterHeader'



const DietRoomTypeGroupingMaster = () => {
    const navigate = useNavigate();

    const [diet, setDiet] = useState(0)
    const [dietroom, setDietRoom] = useState(0)
    const [hospitalRate, setHospitalRate] = useState("")
    const [canteenRate, setCanteenRate] = useState("")


    const [schedule, setSchedule] = useState({})

    const [tempFood, setTempFood] = useState({
        item_id: null,
        item_name: "",
        qty: ""
    })
    const [tempFoods, setTempFoods] = useState([])

    console.log({
        tempFoods
    });


    const addTempFood = () => {
        if (!tempFood.item_id || !tempFood.qty) return
        setTempFoods(p => [...p, tempFood])
        setTempFood({ item_id: null, item_name: "", qty: "" })
    }

    const hanldeGoBack = useCallback(() => {
        navigate('/Home/Settings')
    }, [navigate])

    const columns = [
        { key: 'item_name', label: 'Room Category' },
        { key: 'hsrate', label: 'Hospital Rate' },
        { key: 'cnrate', label: 'Canteen Rate' }
    ]

    const data = [
        { item_name: 'Normal Room', hsrate: 210, cnrate: 210 },
        { item_name: 'AC Room', hsrate: 150, cnrate: 210 },
        { item_name: 'Bed', hsrate: 150, cnrate: 210 }
    ]

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
                <DietMasterHeader onClose={hanldeGoBack} name="DIET ROOM TYPE GROUPING" />

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

                    <DietDetailExpand name={"Room Category Price Details"} >
                        <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', pb: 1 }}>
                            <Box sx={{ width: '50%', mt: 1 }}>
                                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DietInputLabel name={"Select Room Category"} />
                                    <ChooseRoomCategory width={300} value={dietroom} setValue={setDietRoom} />
                                </Box>

                                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DietInputLabel name={"Enter Hospital Rate"} />
                                    <input
                                        className="qty-input"
                                        placeholder="Hospital Rate"
                                        type="number"
                                        value={hospitalRate}
                                        onChange={e => setHospitalRate(e.target.value)}
                                    />
                                </Box>

                                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DietInputLabel name={"Enter Canteen Rate"} />
                                    <input
                                        className="qty-input"
                                        placeholder="Canteen Rate"
                                        type="number"
                                        value={canteenRate}
                                        onChange={e => setCanteenRate(e.target.value)}
                                    />
                                </Box>

                                <Box sx={{ my: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DietButton onClick={addTempFood} name='Add' />
                                </Box>

                                <DietTable columns={columns} data={data} />
                            </Box>
                        </Box>
                    </DietDetailExpand>

                    <DietDetailExpand name={"Diet Food Detail"} >
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

export default DietRoomTypeGroupingMaster
