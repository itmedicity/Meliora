import React from 'react'
import { Virtuoso } from 'react-virtuoso'
import { Box, Paper, Checkbox, FormControlLabel } from '@mui/material'
import { CssVarsProvider } from '@mui/joy'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CancelIcon from '@mui/icons-material/Cancel'
import DietButton from '../../DietComponent/DietButton'
import DietTextComponent from '../../DietComponent/DietTextComponent'
import { FILTER_ACTIONS } from '../../DietReducer/action/kotPreparationFilter.actions'
import { useKotFilter } from '../../DietReducer/contextprovider/KotFilterContext'
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';

const Cell = ({ width, children }) => (
    <Box
        sx={{
            width,
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
        }}
    >
        {children}
    </Box>
)

const PatientCardTable = ({
    data = [],
    onView,
    onCancel,
}) => {

    const { state, dispatch } = useKotFilter();

    // ALWAYS ARRAY
    const selectedPatients = Array.isArray(state?.selectedPatients)
        ? state.selectedPatients
        : [];

    // DEFINE ONCE
    const getRowId = (row) =>
        `${row.canteen_order_id}-${row.batch_id}-${row.fb_ip_no}`;

    // ONLY NON CANCELLED
    const selectablePatients = data.filter(
        row => row.kitchen_status !== 'CANCELLED'
    );

    // ONLY COMPLETED
    const completedPatients = selectablePatients.filter(
        row => row.kitchen_status === 'COMPLETED'
    );

    // CHECK SELECTED
    const isSelected = (row) =>
        selectedPatients.some(
            p =>
                p.canteen_order_id === row.canteen_order_id &&
                p.batch_id === row.batch_id &&
                p.fb_ip_no === row.fb_ip_no
        );

    // SELECT ALL
    const handleSelectAll = (e) => {

        if (e.target.checked) {

            const completedPatients = selectablePatients.filter(
                row => row.kitchen_status === "COMPLETED"
            );

            dispatch({
                type: FILTER_ACTIONS.SET_SELECTED_PATIENTS,

                // STORE FULL ROWS
                payload: completedPatients
            });

        } else {
            dispatch({
                type: FILTER_ACTIONS.CLEAR_SELECTED_PATIENTS
            });
        }
    };

    // ALL SELECTED
    const isAllSelected =
        completedPatients.length > 0 &&
        completedPatients.every(row => isSelected(row));

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
                    ['Order By', 120],
                    ['Order Id', 80],
                    ['Pt No', 130],
                    ['Meal', 120],
                    ['Ip No', 160],
                    ['Name', 160],
                    ['NS', 160],
                    ['Room', 100],
                    ['Kitchen Status', 120],
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
                                        sx={{
                                            color: 'white',
                                            p: 0
                                        }}
                                    />
                                }
                                label={
                                    <span
                                        style={{
                                            color: 'white',
                                            fontWeight: 600,
                                            fontFamily: 'Bahnschrift',
                                            fontSize: 14
                                        }}
                                    >
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

                    return (

                        <Box
                            key={getRowId(row)}
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

                            {/* SELECT */}
                            <Cell width={60}>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5
                                    }}
                                >

                                    <Checkbox
                                        disabled={row.kitchen_status !== 'COMPLETED'}
                                        size="small"

                                        checked={selectedPatients.some(
                                            p =>
                                                p.canteen_order_id === row.canteen_order_id &&
                                                p.batch_id === row.batch_id &&
                                                p.fb_ip_no === row.fb_ip_no
                                        )}

                                        onChange={() =>
                                            dispatch({
                                                type: FILTER_ACTIONS.TOGGLE_SELECTED_PATIENT,

                                                // PASS FULL ROW
                                                payload: row
                                            })
                                        }

                                        sx={{ p: 0 }}
                                    />
                                    <DietTextComponent
                                        value={index + 1}
                                        size={12}
                                    />

                                </Box>

                            </Cell>

                            {/* ORDER BY */}
                            <Cell width={120}>
                                {row.party_name === "BYSTANDER" && (
                                    <BabyChangingStationIcon
                                        sx={{ color: '#7e3bc1' }}
                                    />
                                )}

                                <DietTextComponent
                                    value={row.party_name}
                                    size={12}
                                />
                            </Cell>

                            {/* ORDER ID */}
                            <Cell width={80}>
                                <DietTextComponent
                                    value={`#${row.canteen_order_id}`}
                                    size={12}
                                />
                            </Cell>

                            {/* PT NO */}
                            <Cell width={130}>
                                <DietTextComponent
                                    value={row.fb_pt_no}
                                    size={12}
                                />
                            </Cell>

                            {/* MEAL */}
                            <Cell width={120}>
                                <DietTextComponent
                                    value={row.meal_type?.toUpperCase()}
                                    size={12}
                                />
                            </Cell>

                            {/* ORDER TYPE */}
                            <Cell width={160}>
                                <DietTextComponent
                                    value={row.fb_ip_no}
                                    size={12}
                                />
                            </Cell>
                             <Cell width={160}>
                                <DietTextComponent
                                    value={row.fb_ptc_name}
                                    size={12}
                                />
                            </Cell>

                            {/* NS */}
                            <Cell width={160}>
                                <DietTextComponent
                                    value={row?.nursing_station}
                                    size={12}
                                />
                            </Cell>

                            {/* ROOM */}
                            <Cell width={100}>
                                <DietTextComponent
                                    value={row?.bed_no}
                                    size={12}
                                />
                            </Cell>

                            {/* KITCHEN STATUS */}
                            <Cell width={120}>
                                <DietTextComponent
                                    value={row.kitchen_status}
                                    color={row.color}
                                    size={12}
                                />
                            </Cell>

                            {/* VIEW */}
                            <Cell width={60}>
                                <CssVarsProvider>

                                    <DietButton
                                        disabled={row.kitchen_status !== 'COMPLETED'}
                                        name=''
                                        width={40}
                                        icon={VisibilityIcon}
                                        onClick={() =>
                                            onView({
                                                ...row,
                                                fb_ns_name: row?.nursing_station
                                            })
                                        }
                                    />

                                </CssVarsProvider>
                            </Cell>

                            {/* CANCEL */}
                            <Cell width={60}>
                                <CssVarsProvider>

                                    <DietButton
                                        disabled={row.kitchen_status === 'CANCELLED'}
                                        name=''
                                        width={40}
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