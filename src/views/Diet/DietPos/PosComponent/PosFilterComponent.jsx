import React, { memo } from 'react'
import { Box } from '@mui/joy'
import ChooseNursingBed from 'src/views/CommonSelectCode/ChooseNursingBed'
import ChooseOrderType from 'src/views/CommonSelectCode/ChooseOrderType'
import { usePosFilter } from '../../DietReducer/contextprovider/PosFilterContext'
import ChooseAdmittedPatient from 'src/views/CommonSelectCode/ChooseAdmittedPatient'


const PosFilterComponent = ({ FinalAdmmiteddDetail,selectedStations }) => {

    const { state, dispatch } = usePosFilter();

    const { bed, patient, party } = state;

    return (
        <Box
            sx={{
                width: '100%',
                p: 1,
                bgcolor: '#f6f6f6d9',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                borderRadius: 5
            }}
        >
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

            <ChooseOrderType
                value={party}
                setValue={(val) =>
                    dispatch({
                        type: 'SET_PARTY',
                        payload: val
                    })
                }
            />


            <ChooseAdmittedPatient
                patientDetail={FinalAdmmiteddDetail}
                value={patient}
                setValue={(val) =>
                    dispatch({
                        type: 'SET_PATIENT',
                        payload: val
                    })
                }
            />
        </Box>
    )
}

export default memo(PosFilterComponent)