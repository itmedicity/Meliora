import React, { memo } from 'react';
import { Box } from '@mui/joy';
import { STATUS_FILTERS } from '../../CommonData/Common';
import StatusComponent from '../../DietComponent/StatusComponent';
import { KotFilterProvider, useKotFilter } from '../../DietReducer/contextprovider/KotFilterContext';
import { FILTER_ACTIONS } from '../../DietReducer/action/kotPreparationFilter.actions';
import ChooseNursingBed from 'src/views/CommonSelectCode/ChooseNursingBed';
import ChooseDietName from 'src/views/CommonSelectCode/ChooseDietName';
import ChooseDietPatient from 'src/views/CommonSelectCode/ChooseDietPatient';
import ChooseDIetType from 'src/views/CommonSelectCode/ChooseDIetType';
import DietSearchComponent from '../../DietComponent/DietSearchComponent';


const PreparationStatusFilter = ({
    selectedStations,
    value = null,          // selected status code
    onChange = () => { },   // callback
    FilteredPatientDetail
}) => {


    const { state, dispatch } = useKotFilter()
    const {
        nursingBed,
        dietName,
        dietPatient,
        diettype,
        ptsearch
    } = state


    return (
        <KotFilterProvider>
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
                    gap: 1.5,
                    borderRight: '4px solid #7c51a1',
                    borderLeft: '4px solid #7c51a1',
                    borderRadius: 5,
                    flexWrap: 'wrap'
                }}>
                <Box sx={{
                    display: 'flex',
                    gap: 1
                }}>


                    <ChooseNursingBed
                        value={nursingBed}
                        code={selectedStations}
                        setValue={(val) =>
                            dispatch({
                                type: FILTER_ACTIONS.SET_NURSING_BED,
                                payload: val
                            })
                        }
                    />

                    <ChooseDIetType
                        value={diettype}
                        setValue={(val) =>
                            dispatch({
                                type: FILTER_ACTIONS.SET_DIET_TYPE,
                                payload: val
                            })
                        }
                    />

                    <ChooseDietName
                        value={dietName}
                        // disabled={!nursingStation}
                        setValue={(val) =>
                            dispatch({
                                type: FILTER_ACTIONS.SET_DIET_NAME,
                                payload: val
                            })
                        }
                    />

                    <ChooseDietPatient
                        PtDetail={FilteredPatientDetail}
                        value={dietPatient}
                        diet={dietName}
                        setValue={(val) =>
                            dispatch({
                                type: FILTER_ACTIONS.SET_DIET_PATIENT,
                                payload: val
                            })
                        }
                    />
                    <DietSearchComponent
                        width={'120px'}
                        value={ptsearch}
                        onChange={(val) =>
                            dispatch({
                                type: FILTER_ACTIONS.SET_PT_SEARCH,
                                payload: val
                            })
                        }
                        placeholder="search Patient/MRD"
                    />
                </Box>

                <Box>
                    {
                        STATUS_FILTERS?.map((status) => (
                            <StatusComponent
                                key={status.code}
                                status={status}
                                value={value}
                                onChange={() => onChange((prev) => (prev === status.code ? null : status.code))}
                            />
                        ))}
                </Box>
            </Box>
        </KotFilterProvider>
    )
}

export default memo(PreparationStatusFilter)
