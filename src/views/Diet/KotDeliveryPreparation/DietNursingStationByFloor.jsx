import React, { useEffect, useMemo } from 'react'
import { Box } from '@mui/joy'
// import DietTextComponent from '../DietComponent/DietTextComponent'
import { useKotFilter } from '../DietReducer/contextprovider/KotFilterContext'
import { AnimatePresence } from 'framer-motion'
import { useDietNames, useNursingStationBedDetail } from '../CommonData/UseQuery'
import { FILTER_ACTIONS } from '../DietReducer/action/kotPreparationFilter.actions'
import { assignDietToBed } from '../Helpers/HelperFunction'
import { patientDietList } from '../CommonData/Common'
import FloorView from './FloorView'
import BedsView from './BedsView'

const DietNursingStationByFloor = ({ data }) => {
    const { state, dispatch } = useKotFilter()
    const { nursingStation, nursingBed, dietName, dietPatient } = state

    const { data: bedsData = [] } = useNursingStationBedDetail(nursingStation)
    const { data: DietName = [] } = useDietNames()

    const isStationSelected = Boolean(nursingStation)


    // FLOOR → STATION view

    const floorViewData = useMemo(() => {
        if (!nursingStation) return data

        const entry = Object.entries(data)?.find(([, stations]) =>
            stations.some(s => String(s.fb_ns_code) === String(nursingStation))
        )
        if (!entry) return {}
        const [floor, stations] = entry
        const matchedStation = stations.find(
            s => String(s.fb_ns_code) === String(nursingStation)
        )
        return {
            [floor]: [matchedStation]
        }
    }, [data, nursingStation]);



    const selectedStation = useMemo(() => {
        if (!nursingStation) return null
        for (const stations of Object.values(data)) {
            const match = stations.find(
                s => String(s.fb_ns_code) === String(nursingStation)
            )
            if (match) return match
        }
        return null
    }, [data, nursingStation])


    // Group beds by diet (stable)
    const bedsByDiet = useMemo(() => {
        if (!bedsData?.length || !DietName?.length) return {}

        // Empty diet buckets
        const result = DietName.reduce((acc, diet) => {
            acc[diet.diet_name] = []
            return acc
        }, {})

        //  Filter by nursingBed if selected
        const filteredBeds = nursingBed
            ? bedsData.filter(bed => String(bed.fb_bd_code) === String(nursingBed))
            : bedsData

        //  Assign diet to each bed
        filteredBeds.forEach(bed => {
            const diet = assignDietToBed(bed, DietName)
            if (diet) {
                result[diet.diet_name].push({
                    ...bed,
                    diet_slno: diet.diet_slno,
                    diet_name: diet.diet_name
                })
            }
        })

        // 3 Optional: Filter by selected diet
        if (dietName && !nursingBed) {
            const diet = DietName.find(d => d.diet_slno === dietName)
            if (!diet) return {}
            return { [diet.diet_name]: result[diet.diet_name] ?? [] }
        }

        return result
    }, [bedsData, DietName, nursingBed, dietName]);


    // If Room Change Automatically change the Diet also
    useEffect(() => {
        if (!nursingBed || !bedsData?.length || !DietName?.length) return

        // 1 Find the selected bed
        const selectedBed = bedsData.find(
            bed => String(bed.fb_bd_code) === String(nursingBed)
        )

        if (!selectedBed) return

        // 2 Identify its diet
        const diet = assignDietToBed(selectedBed, DietName)

        if (!diet) return

        // 3 Dispatch diet automatically
        dispatch({
            type: FILTER_ACTIONS.SET_DIET_NAME,
            payload: diet.diet_slno
        })
    }, [nursingBed, bedsData, DietName, dispatch])


    // Diet → validate bed
    useEffect(() => {
        if (!dietName || !nursingBed) return

        const selectedBed = bedsData.find(
            bed => String(bed.fb_bd_code) === String(nursingBed)
        )

        const bedDiet = selectedBed && assignDietToBed(selectedBed, DietName)

        if (!bedDiet || Number(bedDiet.diet_slno) !== Number(dietName)) {
            dispatch({
                type: FILTER_ACTIONS.SET_NURSING_BED,
                payload: ''
            })
        }
    }, [dietName, nursingBed, bedsData, DietName, dispatch])


    // Patients by selected Diet
    const patientsByDiet = useMemo(() => {
        if (!dietName) return []

        let filteredPatient = patientDietList.filter(
            pt => Number(pt.diet_slno) === Number(dietName)
        )

        if (dietPatient) {
            filteredPatient = filteredPatient.filter(
                pt => String(pt.pt_no) === String(dietPatient)
            )
        }

        return filteredPatient
    }, [dietName, dietPatient])



    return (
        <Box sx={{ width: '95%', minHeight: '65vh', maxHeight: '75vh', mt: 1, p: 1, bgcolor: '#f6f6f6d9', overflowY: 'auto' }}>
            <AnimatePresence mode="wait">
                {!isStationSelected ? (
                    <FloorView
                        floorViewData={floorViewData}
                        nursingStation={nursingStation}
                        dispatch={dispatch}
                    />
                ) : (
                    <BedsView
                        selectedStation={selectedStation}
                        dietName={dietName}
                        bedsByDiet={bedsByDiet}
                        DietName={DietName}
                        patientsByDiet={patientsByDiet}
                        dispatch={dispatch}
                    />
                )}
            </AnimatePresence>
        </Box>

    )
}

export default DietNursingStationByFloor
