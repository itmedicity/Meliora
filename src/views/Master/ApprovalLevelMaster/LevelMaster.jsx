import { Box, Button, } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AllModuleSelect from 'src/views/CommonSelectCode/AllModuleSelect'
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
import DeptSecUnderDept from 'src/views/CommonSelectCode/DeptSecUnderDept'
import CardMaster from 'src/views/Components/CardMaster'
import CountSelectCom from './Component/CountSelectCom'
import AddDetails from './Component/AddDetails'

const LevelMaster = () => {
    const history = useNavigate()
    const [dept, setDept] = useState(0)
    const [deptsec, setDeptsec] = useState(0)
    const [ModuleId, setModuleId] = useState(0)
    const [CountSelect, setCountSelect] = useState(0)
    const [Empid, setEmpId] = useState(0)
    // Dynamic Level Fields
    const [levels, setLevels] = useState([])

    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])

    // Handle + Button Click
    const handleAddLevels = () => {
        const count = Number(CountSelect)
        if (count <= 0) return

        const newLevels = Array.from({ length: count }, (_, index) => ({
            id: index + 1,
            name: '',
            description: ''
        }))
        setLevels(newLevels)
    }


    return (
        <CardMaster title="Level Master" close={backtoSetting}>
            <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Left Side Inputs */}
                <Box sx={{ width: '50%', p: 1 }}>
                    <DepartmentSelect value={dept} setValue={setDept} />
                    <Box sx={{ mt: 1.5 }}>
                        <DeptSecUnderDept value={deptsec} setValue={setDeptsec} dept={dept} />
                    </Box>
                    <Box sx={{ mt: 1.5 }}>
                        <AllModuleSelect value={ModuleId} setValue={setModuleId} />
                    </Box>

                    {/* Count Input + Button */}
                    <Box sx={{ mt: 1.5, display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Box sx={{ width: '90%' }}>
                            <CountSelectCom value={CountSelect} setValue={setCountSelect} />
                        </Box>
                        <Button onClick={handleAddLevels} variant="soft">+</Button>
                    </Box>
                </Box>
                <Box>
                    <AddDetails setEmpId={setEmpId} Empid={Empid} levels={levels} setLevels={setLevels} />
                </Box>

            </Box>
        </CardMaster>
    )
}

export default memo(LevelMaster)
