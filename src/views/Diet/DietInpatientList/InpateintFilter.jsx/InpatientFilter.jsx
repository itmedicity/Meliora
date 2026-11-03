import React, { useMemo } from 'react'
import {
    Box,
} from '@mui/joy'


import DietSearchComponent from '../../DietComponent/DietSearchComponent'
import ChooseNursingBed from 'src/views/CommonSelectCode/ChooseNursingBed'
import ChooseDietPatient from 'src/views/CommonSelectCode/ChooseDietPatient'
import ChooseDietName from 'src/views/CommonSelectCode/ChooseDietName'
import ChooseNursingStation from './ChooseNursingStation'
import { useSelector } from 'react-redux'
import { getEmployeeuserrightsMenu } from 'src/api/TicketApi'
import { useQuery } from '@tanstack/react-query'

const InpatientFilter = ({
    setSearch,
    setNursingBed,
    setDietPatient,
    setDietName,
    search,
    selectedStations,
    nursingBed,
    FilteredPatientDetail,
    dietPatient,
    dietName,
    setNursingStation,
    nursingStation
}) => {

    const empid = useSelector(state => {
        return state.LoginUserData.empid
    });

    const postEmp = useMemo(() => ({ empid }), [empid])

    const { data: menuRightsEmployee = [] } = useQuery({
        queryKey: ['getEmployeeuserrightsMenu', postEmp],
        queryFn: () => getEmployeeuserrightsMenu(postEmp)
    });

    const employeeMenuRights = useMemo(() => menuRightsEmployee, [menuRightsEmployee]);

    const hasNursingStationRight = useMemo(() => {
        return employeeMenuRights?.some((item) => Number(item.menu_slno) === 381)
    }, [menuRightsEmployee]);


    return (
        <Box
            sx={{
                width: '100%',
                minHeight: 40,
                border: '1px solid #e9e5e56c',
                mt: 1,
                p: 1,
                bgcolor: '#f6f6f6d9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                borderRight: '4px solid #7c51a1',
                borderLeft: '4px solid #7c51a1',
                borderRadius: 5,
                flexWrap: 'wrap'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    justifyContent: 'center'
                }}
            >
                {/* <ChooseDIetType
                    value={dietType}
                    setValue={setDietType}
                /> */}

                <ChooseNursingBed
                    value={nursingBed}
                    code={selectedStations}
                    setValue={(val) => setNursingBed(val)}
                />

                <ChooseDietPatient
                    PtDetail={FilteredPatientDetail}
                    value={dietPatient}
                    diet={dietName}
                    setValue={(val) => setDietPatient(val)}
                />

                <ChooseDietName
                    value={dietName}
                    setValue={(val) => setDietName(val)}
                />

                {
                    hasNursingStationRight &&
                    <ChooseNursingStation
                        value={nursingStation}
                        setValue={setNursingStation}
                        width={200}
                    />
                }

            </Box>

            <DietSearchComponent
                value={search}
                onChange={setSearch}
                placeholder="Patient Search"
            />
        </Box>
    )
}

export default InpatientFilter