import React, { useMemo } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { Box, Paper, Checkbox, FormControlLabel } from '@mui/material'
import { CssVarsProvider } from '@mui/joy'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CancelIcon from '@mui/icons-material/Cancel'
import DietButton from '../../DietComponent/DietButton'
import DietTextComponent from '../../DietComponent/DietTextComponent'
import { useNursingStationMaster } from '../../CommonData/UseQuery'
import { FILTER_ACTIONS } from '../../DietReducer/action/kotPreparationFilter.actions'
import { useKotFilter } from '../../DietReducer/contextprovider/KotFilterContext'
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';

/**
 * Resusable Component for showing ht Table Data
 */
const Cell = ({ width, children }) => (
    <Box sx={{
        width,
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }}>
        {children}
    </Box>
)

const PatientCardTable = ({
    data = [],
    onView,
    onCancel,
}) => {


    const { data: NURSING_STATIONS = [] } = useNursingStationMaster();
    const { state, dispatch } = useKotFilter();
    const { selectedPatients = [] } = state


    /**
     * 
     * Function Focus on Select All
     * Handle using Dispatch for the Global Access and Unwanted Props Passing !(nested Props Handling)
     */

    // Select only rows that are NOT disabled
    const selectablePatients = data.filter(
        row => !row.checkStatus && row.diet_status !== 'STOPPED'
    );
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            dispatch({
                type: FILTER_ACTIONS.SET_SELECTED_PATIENTS,
                payload: selectablePatients
            });

        } else {
            dispatch({
                type: FILTER_ACTIONS.CLEAR_SELECTED_PATIENTS
            });
        }
    };

    const isAllSelected =
        selectablePatients.length > 0 &&
        selectedPatients.length === selectablePatients.length;
    /**
     * 
     * Finding Currosponsding Nursing Staiions
     */
    const stationMap = useMemo(() => {
        return NURSING_STATIONS.reduce((acc, s) => {
            acc[s.fb_ns_code] = s
            return acc
        }, {})
    }, [NURSING_STATIONS])

    return (
        <Paper sx={{ width: '100%' }}>
            {/* HEADER */}
            <Box
                display="flex"
                justifyContent="space-between"
                sx={{
                    bgcolor: '#7c51a1',
                    py: 0.6,
                    px: 1,
                    borderBottom: '1px solid lightgrey',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1
                }}
            >
                {[
                    ['Sl.No', 60],
                    ['Patient', 120],
                    ['Pt No', 130],
                    ['Meal', 120],
                    ['Diet', 160],
                    ['NS', 160],
                    ['Items', 90],
                    ['Status', 120],
                    ['Diet Status', 120],
                    ['View', 60],
                    ['Cancel', 60]
                ].map(([label, width]) => (
                    <Cell key={label} width={width}>
                        {label === 'Sl.No' ? (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={isAllSelected}
                                        onChange={handleSelectAll}
                                        sx={{ color: 'white', p: 0 }}
                                    />
                                }
                                label={
                                    <span style={{
                                        color: 'white',
                                        fontWeight: 600,
                                        fontFamily: 'Bahnschrift',
                                        fontSize: 14
                                    }}>
                                        {label}
                                    </span>
                                }
                                sx={{ m: 0 }}
                            />
                        ) : (
                            <DietTextComponent
                                value={label}
                                weight={600}
                                color={'white'}
                            />
                        )}
                    </Cell>

                ))}
            </Box>

            {/* BODY */}
            <Virtuoso
                style={{ height: '72vh' }}
                data={data}
                itemContent={(index, row) => {
                    const station = stationMap[row.ns_code]

                    return (
                        <Box
                            key={`${row.order_id}-${index}`}
                            display="flex"
                            justifyContent="space-between"
                            sx={{
                                borderBottom: '1px solid lightgrey',
                                alignItems: 'center',
                                px: 1,
                                py: 0.5,
                                backgroundColor: row.bgcolor
                            }}
                        >
                            <Cell width={60}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <Checkbox
                                        disabled={row.checkStatus || row.diet_status === 'STOPPED'}
                                        size="small"
                                        checked={selectedPatients.some(
                                            item => item.order_id === row.order_id
                                        )}

                                        // onChange={() => handleRowSelect(row.order_id)}
                                        onChange={() =>
                                            dispatch({
                                                type: FILTER_ACTIONS.TOGGLE_SELECTED_PATIENT,
                                                payload: row
                                            })
                                        }

                                        sx={{ p: 0 }}
                                    />
                                    <DietTextComponent value={index + 1} size={12} />
                                </Box>
                            </Cell>


                            <Cell width={120}>
                                {row.is_bystander && <BabyChangingStationIcon sx={{ color: '#7e3bc1' }} />}

                                <DietTextComponent value={row.ptc_ptname} size={12} />
                            </Cell>

                            <Cell width={130}>
                                <DietTextComponent value={row.pt_no} size={12} />
                            </Cell>

                            <Cell width={120}>
                                <DietTextComponent value={row.meal.toUpperCase()} size={12} />
                            </Cell>

                            <Cell width={160}>
                                <DietTextComponent value={row.diet_name} size={12} />
                            </Cell>

                            <Cell width={160}>
                                <DietTextComponent
                                    value={station?.fb_ns_name ?? row.ns_code} size={12}
                                />
                            </Cell>

                            <Cell width={90}>
                                <DietTextComponent value={`${row.items?.length} items`} size={12} />
                            </Cell>

                            <Cell width={120}>
                                <DietTextComponent value={row.foodStatus} color={row.color} size={12} />
                            </Cell>

                            <Cell width={120}>
                                <DietTextComponent value={row.diet_status} size={12} />
                            </Cell>
                            {/* ACTIONS */}
                            <Cell width={60}>
                                <CssVarsProvider>


                                    <DietButton
                                        disabled={row.diet_status === 'STOPPED'}
                                        name=''
                                        width={10}
                                        icon={VisibilityIcon}
                                        onClick={() => onView({
                                            ...row,
                                            fb_ns_name: station?.fb_ns_name
                                        })}
                                    />


                                </CssVarsProvider>
                            </Cell>


                            <Cell width={60}>
                                <CssVarsProvider>

                                    <DietButton
                                        disabled={row.checkStatus || row.diet_status === 'STOPPED'}
                                        name=''
                                        width={10}
                                        icon={CancelIcon}
                                        onClick={() => onCancel(row)}
                                    />

                                </CssVarsProvider>
                            </Cell>
                        </Box>
                    )
                }}
            />
        </Paper>
    )
}

export default PatientCardTable


