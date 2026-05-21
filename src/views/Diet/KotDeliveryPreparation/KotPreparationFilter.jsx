// @NOT USING
import React from 'react'
import { Box } from '@mui/joy'
import ChooseNursingStation from 'src/views/CommonSelectCode/ChooseNursingStation'
import ChooseNursingBed from 'src/views/CommonSelectCode/ChooseNursingBed'
import ChooseDietName from 'src/views/CommonSelectCode/ChooseDietName'
import ChooseDietPatient from 'src/views/CommonSelectCode/ChooseDietPatient'

import { useKotFilter } from '../DietReducer/contextprovider/KotFilterContext'
import { FILTER_ACTIONS } from '../DietReducer/action/kotPreparationFilter.actions'
import DietSearchComponent from '../DietComponent/DietSearchComponent'

const KotPreparationFilter = () => {

    const { state, dispatch } = useKotFilter()
    const {
        nursingStation,
        nursingBed,
        dietName,
        dietPatient,
        ptsearch
    } = state



    return (

        <Box
            sx={{
                width: '95%',
                minHeight: 40,
                border: '1px solid #e9e5e56c',
                mt: 1,
                p: 1,
                bgcolor: '#f6f6f6d9',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderRight: '4px solid #7c51a1',
                borderLeft: '4px solid #7c51a1',
                borderRadius: 5,
                flexWrap: 'wrap'
            }}
        >
            <ChooseNursingStation
                value={nursingStation}
                handleChange={(e) =>
                    dispatch({
                        type: FILTER_ACTIONS.SET_NURSING_STATION,
                        payload: e.target.value
                    })
                }
            />

            <ChooseNursingBed
                value={nursingBed}
                code={nursingStation}
                setValue={(val) =>
                    dispatch({
                        type: FILTER_ACTIONS.SET_NURSING_BED,
                        payload: val
                    })
                }
            />

            <ChooseDietName
                value={dietName}
                disabled={!nursingStation}
                setValue={(val) =>
                    dispatch({
                        type: FILTER_ACTIONS.SET_DIET_NAME,
                        payload: val
                    })
                }
            />

            <ChooseDietPatient
                value={dietPatient}
                // disabled={!dietName}
                diet={dietName}
                setValue={(val) =>
                    dispatch({
                        type: FILTER_ACTIONS.SET_DIET_PATIENT,
                        payload: val
                    })
                }
            />
            <DietSearchComponent
                width={'100px'}
                value={ptsearch}
                onChange={(val) =>
                    dispatch({
                        type: FILTER_ACTIONS.SET_PT_SEARCH,
                        payload: val
                    })
                }
                placeholder="search Patient / Mrd Number"
            />
        </Box>
    )
}

export default KotPreparationFilter
