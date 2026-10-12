import React from 'react'
import { Virtuoso } from 'react-virtuoso'
import { Paper, Box, Tooltip, Chip } from '@mui/material'
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import DietTextComponent from '../DietComponent/DietTextComponent';
import DietButton from '../DietComponent/DietButton';
import { PatientstatusConfig } from '../CommonData/Common';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const Cell = ({ width, children }) => (
    <Box
        sx={{
            width,
            display: 'flex',
            alignItems: 'center'
        }}>
        {children}
    </Box>
)

const ClosingTable = ({
    data = [],
    onView,
}) => {

    return (
        <Paper sx={{ width: '100%' }}>

            <Box
                display="flex"
                justifyContent="space-between"
                sx={{
                    bgcolor: '#7c51a1',
                    py: 0.6,
                    px: 1,
                    position: 'sticky',
                    top: 0,
                    zIndex: 1
                }}>

                {[
                    ['Sl No', 80],
                    ['Admission', 100],
                    ['MRD', 100],
                    ['Patient Name', 220],
                    ['Room', 100],
                    ['Nurse Station', 140],
                    ['Patient Status', 240],
                    ['View Details', 140]
                ]?.map(([label, width]) => (
                    <Cell
                        key={label}
                        width={width}
                    >
                        <DietTextComponent
                            value={label}
                            color="white"
                            weight={600}
                        />
                    </Cell>
                ))}

            </Box>

            {/* BODY */}

            <Virtuoso
                style={{ height: '60vh' }}
                data={data}
                itemContent={(index, row) => {

                    const AdmissiongStatus = PatientstatusConfig[row.current_status];

                    return (

                        <Box
                            key={row.fb_ip_no}
                            display="flex"
                            justifyContent="space-between"
                            sx={{
                                borderBottom: '1px solid lightgrey',
                                px: 1,
                                py: .5
                            }}
                        >
                            <Cell width={80}>
                                <DietTextComponent value={index + 1} size={12} />
                            </Cell>

                            <Cell width={100}>
                                <DietTextComponent value={row?.admission_id} size={12} />
                            </Cell>

                            <Cell width={100}>
                                <DietTextComponent value={row?.pt_no} size={12} />
                            </Cell>

                            <Cell width={220}>
                                <PersonPinCircleIcon sx={{
                                    fontSize: 16,
                                    color: '#8c2ef0'
                                }} />
                                <DietTextComponent value={row?.patient_name} size={12} />
                            </Cell>


                            <Cell width={100}>
                                <DietTextComponent value={row?.bed_name} size={12} />
                            </Cell>

                            <Cell width={140}>
                                <DietTextComponent value={row?.nursing_station_name} size={12} />
                            </Cell>

                            <Cell width={240}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={0.5}
                                    sx={{
                                        cursor: 'pointer'
                                    }}>
                                    <Tooltip title={AdmissiongStatus?.shortLabel}
                                        placement='left-start'>
                                        <Chip
                                            icon={AdmissiongStatus?.icon && (
                                                React.cloneElement(AdmissiongStatus.icon, {
                                                    size: 14,
                                                    color: AdmissiongStatus?.color,
                                                })
                                            )}
                                            label={AdmissiongStatus?.label || "-"}
                                            size="small"
                                            sx={{
                                                height: 24,
                                                borderRadius: "6px",
                                                fontSize: 10,
                                                fontWeight: 700,
                                                backgroundColor:
                                                    AdmissiongStatus?.bgColor ||
                                                    "rgba(37, 99, 235, 0.08)",
                                                color: AdmissiongStatus?.color || "inherit",
                                                border: `1px solid ${AdmissiongStatus?.borderColor || "transparent"
                                                    }`,
                                            }}
                                        />
                                    </Tooltip>
                                </Box>
                            </Cell>

                            <Cell width={140}>
                                <DietButton
                                    width={80}
                                    name={`View`}
                                    icon={RemoveRedEyeIcon}
                                    onClick={() => onView(row)}
                                />
                            </Cell>
                        </Box>
                    )
                }}
            />
        </Paper>
    )
}
export default ClosingTable