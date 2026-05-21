import React, { memo } from 'react';
import { Box } from '@mui/joy';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import FastfoodIcon from "@mui/icons-material/Fastfood";

import StatusComponent from '../../DietComponent/StatusComponent';

import {
    KotFilterProvider,
    useKotFilter
} from '../../DietReducer/contextprovider/KotFilterContext';

import { FILTER_ACTIONS }
    from '../../DietReducer/action/kotPreparationFilter.actions';

import ChooseNursingBed
    from 'src/views/CommonSelectCode/ChooseNursingBed';

// import ChooseDietName
//     from 'src/views/CommonSelectCode/ChooseDietName';

import ChooseDietPatient
    from 'src/views/CommonSelectCode/ChooseDietPatient';

import ChooseDIetType
    from 'src/views/CommonSelectCode/ChooseDIetType';

import DietSearchComponent
    from '../../DietComponent/DietSearchComponent';

const PreparationStatusFilter = ({
    selectedStations,
    value = null,
    onChange = () => { },
    FilteredPatientDetail
}) => {

    const { state, dispatch } = useKotFilter();

    const {
        nursingBed,
        dietName,
        dietPatient,
        diettype,
        ptsearch
    } = state;

    const statusConfig = {
        PENDING: {
            color: "warning",
            icon: HourglassEmptyIcon,
            label: "PENDING",
        },


        SENT_TO_KITCHEN: {
            color: "primary",
            icon: FastfoodIcon,
            label: "SENT_TO_KITCHEN",
        },

        COMPLETED: {
            color: "success",
            icon: CheckCircleIcon,
            label: "COMPLETED",
        },

        CANCELLED: {
            color: "danger",
            icon: CancelIcon,
            label: "CANCELLED",
        }
    };

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
                }}
            >

                {/* Filters */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
                        flexWrap: 'wrap'
                    }}
                >

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

                    {/* <ChooseDietName
                        value={dietName}
                        setValue={(val) =>
                            dispatch({
                                type: FILTER_ACTIONS.SET_DIET_NAME,
                                payload: val
                            })
                        }
                    /> */}

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

                {/* Status Filters */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 1
                    }}
                >
                    {Object.values(statusConfig).map((status) => (
                        <StatusComponent
                            key={status.label}
                            status={status}
                            value={value}
                            onChange={() =>
                                onChange((prev) =>
                                    prev === status.label
                                        ? null
                                        : status.label
                                )
                            }
                        />
                    ))}
                </Box>
            </Box>
        </KotFilterProvider>
    );
};

export default memo(PreparationStatusFilter);