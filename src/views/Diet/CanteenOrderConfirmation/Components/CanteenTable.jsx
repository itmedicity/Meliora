import React, { } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { Box, Paper, Checkbox, Chip, Tooltip, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CancelIcon from '@mui/icons-material/Cancel'
import DietButton from '../../DietComponent/DietButton'
import DietTextComponent from '../../DietComponent/DietTextComponent'
import { format } from 'date-fns'
import { useFetchProductionMap } from '../../CommonData/UseQuery'
import { PatientstatusConfig } from '../../CommonData/Common'
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import FontDownloadOffIcon from '@mui/icons-material/FontDownloadOff';
import { keyframes } from "@mui/system";
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';


const Cell = ({ width, children }) => (
    <Box sx={{ width, display: 'flex', alignItems: 'center' }}>
        {children}
    </Box>
)

const CanteenTable = ({
    data = [],
    onView,
    onCancel,
    setSelectedRows,
    selectedRows,
    activeTab,
}) => {



    const isCheckMode = activeTab === "CONFIRMED";

    const { data: ProductionMapDetail = [] } =
        useFetchProductionMap(isCheckMode);


    const mappedOrderIds = new Set(
        ProductionMapDetail?.map(item => item.canteen_order_id)
    );

    const getRowId = (row) => row.canteen_order_id;

    /* SELECT ALL */
    const handleSelectAll = (e) => {

        if (e.target.checked) {
            const allIds = data
                .filter(row => !mappedOrderIds.has(row.canteen_order_id))
                .map(row => row.canteen_order_id);

            setSelectedRows(allIds);

        } else {
            setSelectedRows([]);
        }
    };

    /* SINGLE SELECT */
    const handleSelectRow = (id) => {

        setSelectedRows(prev => {

            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            }

            return [...prev, id];
        });
    };

    const selectableRows = data.filter(
        row => !mappedOrderIds?.has(row.canteen_order_id)
    );

    const isAllSelected =
        selectableRows.length > 0 &&
        selectedRows.length === selectableRows.length;


    const sortedData = [...data].sort((a, b) => {

        // Urgent orders first
        const aUrgent = Number(a.is_urgent) === 1;
        const bUrgent = Number(b.is_urgent) === 1;

        if (aUrgent !== bUrgent) {
            return aUrgent ? -1 : 1;
        }

        const aMapped = mappedOrderIds.has(a.canteen_order_id);
        const bMapped = mappedOrderIds.has(b.canteen_order_id);

        // send production items to bottom
        if (aMapped !== bMapped) {
            return aMapped ? 1 : -1;
        }
        // FIFO inside groups
        return new Date(a.order_time) - new Date(b.order_time);
    });


    const urgentPulse = keyframes`
    0% {
        box-shadow: 0 0 0 0 rgba(211, 47, 47, 0.25);
    }
    70% {
        box-shadow: 0 0 0 5px rgba(211, 47, 47, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(211, 47, 47, 0);
    }
`;

    const urgentBlink = keyframes`
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.45;
    }
`;

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
                    position: 'sticky',
                    top: 0,
                    zIndex: 1
                }}
            >
                {isCheckMode && (
                    <Cell width={40}>
                        <Checkbox
                            checked={isAllSelected}
                            onChange={handleSelectAll}
                            size="large"
                            sx={{
                                color: "white",
                                '&.Mui-checked': {
                                    color: "white"
                                }
                            }}
                        />
                    </Cell>
                )}

                {[
                    ['Sl.No', 60],
                    ['Order ID', 120],
                    ['Admission', 120],
                    ['MRD', 120],
                    ['Name', 120],
                    ['Type', 120],
                    ['Room', 100],
                    ['NS', 120],
                    ['Remark', 80],
                    ['Patient Status', 120],
                    ['Time', 180],
                    ['Order', 100],
                    ['Cancel', 100]
                ].map(([label, width]) => (
                    <Cell key={label} width={width}>
                        <DietTextComponent value={label} color="white" weight={600} />
                    </Cell>
                ))}
            </Box>

            {/* BODY */}

            <Virtuoso
                style={{ height: '70vh' }}
                data={sortedData}
                // endReached={loadMore}
                itemContent={(index, row) => {
                    const rowId = getRowId(row);
                    const isMapped = mappedOrderIds.has(rowId);
                    const AdmissiongStatus = PatientstatusConfig[row.fb_ipc_curstatus];

                    const Remarks = `${(row?.canteen_remarks || "") + (row?.diet_remarks || "")}`

                    const isUrgent = Number(row?.is_urgent) === 1;

                    return (
                        <Box
                            key={`${getRowId(row)}_${index + 1}`}
                            display="flex"
                            justifyContent="space-between"
                            sx={{
                                borderBottom: '1px solid lightgrey',
                                borderLeft: isUrgent
                                    ? '4px solid #d32f2f'
                                    : '4px solid transparent',

                                px: 1,
                                py: 0.5,

                                bgcolor: isUrgent
                                    ? '#fff1f0'
                                    : isMapped
                                        ? '#ececec'
                                        : selectedRows.includes(rowId)
                                            ? '#f5edff'
                                            : '#fff',

                                opacity: isMapped ? 0.7 : 1,
                                pointerEvents: isMapped ? 'none' : 'auto',

                                transition: 'background-color 0.3s ease, border-color 0.3s ease',

                                ...(isUrgent && {
                                    animation: `${urgentPulse} 2s infinite`,
                                }),

                                '&:hover': {
                                    bgcolor: isUrgent ? '#ffe4e1' : '#f7f4fa',
                                },
                            }}
                        >
                            {/* ROW CHECKBOX */}
                            {isCheckMode && (
                                <Cell width={40}>
                                    <Checkbox
                                        checked={selectedRows.includes(rowId)}
                                        onChange={() => handleSelectRow(rowId)}
                                        disabled={isMapped}
                                        size="medium"
                                    />
                                </Cell>
                            )}
                            <Cell width={60}>
                                <DietTextComponent value={index + 1} size={12} />
                            </Cell>

                            <Cell width={140}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={0.7}
                                >
                                    <DietTextComponent
                                        value={`CAN-${String(row?.canteen_order_id || 0).padStart(6, "0")}`}
                                        size={12}
                                        weight={700}
                                    />

                                    {isUrgent && (
                                        <Chip
                                            icon={
                                                <WarningAmberRoundedIcon
                                                    sx={{
                                                        fontSize: '14px !important',
                                                        color: '#fff !important',
                                                    }}
                                                />
                                            }
                                            label=""
                                            size="small"
                                            sx={{
                                                height: 21,
                                                borderRadius: '5px',
                                                bgcolor: '#d32f2f',
                                                color: '#fff',
                                                fontSize: 9,
                                                fontWeight: 800,
                                                letterSpacing: 0.4,
                                                animation: `${urgentBlink} 1.5s infinite`,
                                                '& .MuiChip-label': {
                                                    px: 0.5,
                                                },
                                            }}
                                        />
                                    )}
                                </Box>
                            </Cell>
                            <Cell width={120}>
                                <DietTextComponent value={row?.admission_id} size={12} />
                            </Cell>
                            <Cell width={120}>
                                <DietTextComponent value={row?.fb_pt_no} size={12} />
                            </Cell>
                            <Cell width={120}>
                                <DietTextComponent value={row?.fb_ptc_name} size={12} />
                            </Cell>
                            <Cell width={120}>
                                <DietTextComponent value={row?.party_name} size={12} />
                            </Cell>
                            <Cell width={100}>
                                <DietTextComponent value={row?.fb_bdc_no} size={12} />
                            </Cell>

                            <Cell width={120}>
                                <DietTextComponent value={row?.fb_ns_name} size={12} />
                            </Cell>
                            <Cell width={80}>
                                <Tooltip sx={{
                                    fontSize: 20
                                }} title={<React.Fragment>
                                    <Typography
                                        sx={{
                                            fontSize: 16,
                                            fontWeight: 800,
                                            color: 'inherit',
                                            fontFamily: 'Bahnschrift',
                                        }}
                                    >
                                        {Remarks}
                                    </Typography>

                                </React.Fragment>}
                                    placement='left-start'>
                                    {
                                        Remarks?.trim() !== "" ? (<TextSnippetIcon sx={{
                                            fontSize: 18,
                                            cursor: 'pointer',
                                            color: "#3b1263"
                                        }} />) : (<FontDownloadOffIcon sx={{
                                            fontSize: 18,
                                            color: "#696072"
                                            // cursor: 'pointer'
                                        }} />)
                                    }

                                </Tooltip>
                            </Cell>

                            <Cell width={120}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={0.5}
                                    sx={{
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Tooltip title={AdmissiongStatus?.label}
                                        placement='left-start'>
                                        <Chip
                                            icon={AdmissiongStatus?.icon && (
                                                React.cloneElement(AdmissiongStatus.icon, {
                                                    size: 14,
                                                    color: AdmissiongStatus?.color,
                                                })
                                            )}
                                            label={AdmissiongStatus?.shortLabel || "-"}
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

                            <Cell width={180}>
                                <DietTextComponent
                                    value={
                                        row.order_time
                                            ? format(new Date(row.order_time), 'dd-MM-yyyy hh:mm a')
                                            : '-'
                                    }
                                    size={12}
                                />
                            </Cell>

                            <Cell width={100}>
                                <DietButton
                                    name={"orders"}
                                    width={80}
                                    icon={VisibilityIcon}
                                    onClick={() => onView(row)}
                                />
                            </Cell>

                            <Cell width={100}>
                                <DietButton
                                    disabled={row.order_status === "CANCELLED"}
                                    name={"cancel"}
                                    width={100}
                                    icon={CancelIcon}
                                    onClick={() => onCancel(row)}
                                />
                            </Cell>
                        </Box>
                    )
                }
                }
            />
        </Paper>
    )
}

export default CanteenTable