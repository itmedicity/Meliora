import React, { memo } from 'react'
import { Box } from '@mui/joy'
import DietSearchComponent from '../../DietComponent/DietSearchComponent'
import { useCanteenFilter } from '../../DietReducer/contextprovider/CanteenFilterContext'
import ChooseCanteenActivePatient from 'src/views/CommonSelectCode/ChooseCanteenActivePatient'
import { useAllActiveNsPatient } from '../../CommonData/UseQuery'
import ChooseOrderType from 'src/views/CommonSelectCode/ChooseOrderType'
import ChooseNursingBed from 'src/views/CommonSelectCode/ChooseNursingBed'
import ChooseDIetType from 'src/views/CommonSelectCode/ChooseDIetType'


const CanteenFilterComponent = ({ selectedStations }) => {

    const { state, dispatch } = useCanteenFilter()
    const { bed, patient, meal, type, search } = state;

    const { data: ActiveNsPatient = [] } = useAllActiveNsPatient(selectedStations);


    return (
        <Box sx={{
            width: '100%',
            p: 1,
            bgcolor: '#f6f6f6d9',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            borderRadius: 5
        }}>

            {/* <input placeholder="Bed"
                value={bed}
                onChange={(e) => dispatch({ type: 'SET_BED', payload: e.target.value })}
            /> */}

            <ChooseNursingBed
                value={bed}
                code={selectedStations}
                setValue={(val) =>
                    dispatch({
                        type: 'SET_BED',
                        payload: val
                    })
                }
            />

            <ChooseDIetType
                value={meal}
                setValue={(val) =>
                    dispatch({
                        type: 'SET_MEAL_ID',
                        payload: val
                    })
                }
            />

            <ChooseCanteenActivePatient
                PtDetail={ActiveNsPatient}
                value={patient}
                setValue={(value) =>
                    dispatch({
                        type: 'SET_PATIENT',
                        payload: value
                    })
                }
            />
            <ChooseOrderType
                value={type}
                setValue={(value) =>
                    dispatch({
                        type: 'SET_TYPE',
                        payload: value
                    })
                }
            />

            <DietSearchComponent
                value={search}
                onChange={(val) => dispatch({ type: 'SET_SEARCH', payload: val })}
            />
        </Box>
    )
}

export default memo(CanteenFilterComponent)