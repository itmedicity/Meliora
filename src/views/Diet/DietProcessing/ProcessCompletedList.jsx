import React, { memo, useMemo, useState } from 'react'
import { Box, Chip, Skeleton, Tooltip } from '@mui/joy'
import { bodyCell, headerCell, ProcessedList, rowStyle } from '../CommonData/Common'
import ReplayIcon from '@mui/icons-material/Replay'
import InsertPageBreakIcon from '@mui/icons-material/InsertPageBreak'
import DietButton from '../DietComponent/DietButton'
import NotProcessed from './NotProcessed'
import { infoNotify } from 'src/views/Common/CommonCode'
import DoneAllIcon from '@mui/icons-material/DoneAll';


const ProcessCompletedList = ({
    selectedDiets = [],
    processing,
    selectedDietTimes,      // selected diet times
    processedRows,
    setProcessedRows
}) => {

    /** SINGLE ROW PROCESSING */
    const [processingRow, setProcessingRow] = useState(null)


    const filteredList = useMemo(() => {
        if (!selectedDiets.length) return []
        if (!selectedDietTimes || Object.keys(selectedDietTimes).length === 0) {
            return []
        }
        return ProcessedList.filter(row => {
            const dietKey = row.diet_name.toUpperCase()
            const selectedTimes = selectedDietTimes[dietKey]

            return (
                Array.isArray(selectedTimes) &&
                selectedTimes.includes(row.type)
            )
        })
    }, [selectedDietTimes, selectedDiets])

    /** SINGLE ROW PROCESS */
    const handleProcessing = (row) => {
        const rowKey = `${row.diet_name.toUpperCase()}|${row.type}`
        const hasNew = row.new_Count !== null;
        if (!hasNew && processedRows[rowKey]) {
            return infoNotify("No New Request!");
        }

        setProcessingRow(rowKey)
        // simulate API call
        setTimeout(() => {
            setProcessingRow(null)
            setProcessedRows(prev => ({ ...prev, [rowKey]: true }))  // update parent
        }, 2000)
    }

    return (
        <Box sx={{ width: '100%', borderRadius: 8, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
            {/* HEADER */}
            <Box sx={{ ...rowStyle, backgroundColor: '#7c51a1', borderBottom: '1px solid #ddd' }}>
                <Box sx={{ width: 70, fontWeight: 600, fontSize: 13, color: 'white' }}>Sl No</Box>
                <Box sx={headerCell}>Diet Name</Box>
                <Box sx={headerCell}>Process Date</Box>
                <Box sx={headerCell}>Type</Box>
                <Box sx={headerCell}>Patient Count</Box>
                {/* <Box sx={headerCell}>Status</Box> */}
                <Box sx={headerCell}>Action</Box>
            </Box>

            {/* BODY */}
            <Box sx={{ maxHeight: 720, overflowY: 'auto', backgroundColor: '#fff', }}>

                {
                    filteredList?.length === 0 && <NotProcessed />
                }
                {filteredList?.map((row, index) => {
                    const rowKey = `${row?.diet_name?.toUpperCase()}|${row.type}`
                    const isRowSelected = selectedDietTimes?.[row?.diet_name?.toUpperCase()]?.includes(row.type)

                    /** FINAL PROCESSING LOGIC */
                    const isProcessingRow =
                        (processing && isRowSelected && !processedRows[rowKey]) || // global process for selected
                        processingRow === rowKey                                   // single row retry

                    const isProcessed = processedRows[rowKey] === true

                    /** SHOW COUNT & STATUS ONLY AFTER PROCESSING */
                    const showCount = isProcessed
                    // const showStatus = isProcessed
                    const totalCount =
                        row.new_Count && row.new_Count > 0
                            ? row.patient_count + row.new_Count
                            : row.patient_count

                    return (
                        <Box
                            key={rowKey}
                            sx={{
                                ...rowStyle,
                                borderBottom: '1px solid #f0f0f0',
                                '&:hover': { backgroundColor: '#fafafa' }
                            }}
                        >
                            <Box sx={{ width: 70, fontSize: 12 }}>{index + 1}</Box>
                            <Box sx={bodyCell}>{row?.diet_name}</Box>
                            <Box sx={bodyCell}>{row?.process_date}</Box>
                            <Box sx={bodyCell}>{row?.type}</Box>

                            {/* PATIENT COUNT */}
                            <Box sx={{ ...bodyCell, cursor: 'pointer' }}>
                                {isProcessingRow ? (
                                    <Skeleton variant="rectangular" width={60} height={16} />
                                ) : showCount ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <Tooltip
                                            title="Processed Patient"
                                            placement="top"
                                            size="sm"
                                            variant="soft"
                                        >
                                            <span style={{ cursor: 'pointer' }}>
                                                {row.processed_count}
                                            </span>
                                        </Tooltip>

                                        <span>/</span>

                                        <Tooltip
                                            title="Total Patient"
                                            placement="top"
                                            size="sm"
                                            variant="soft"
                                        >
                                            <span style={{ cursor: 'pointer' }}>
                                                {totalCount}
                                            </span>
                                        </Tooltip>
                                    </Box>

                                ) : (
                                    <Tooltip title="Total Patient" placement="top"
                                        size="sm"
                                        variant="soft">
                                        <span>{totalCount}</span>
                                    </Tooltip>

                                )}
                            </Box>



                            {/* ACTION */}
                            <Box sx={{
                                ...bodyCell,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'start'
                            }}>
                                {
                                    showCount
                                        ? row.processed_count === totalCount
                                            ? <Chip
                                                startDecorator={<DoneAllIcon sx={{
                                                    fontSize: 12
                                                }} />}
                                                size="sm"
                                                variant="soft"
                                                color={'success'}
                                                sx={{ fontSize: 11, fontWeight: 600, width: 100 }}>
                                                Success
                                            </Chip>
                                            :
                                            <DietButton
                                                width={40}
                                                onClick={() => handleProcessing(row)}
                                                disabled={!isRowSelected && !isProcessed || isProcessingRow}
                                                name={'Retry'}
                                                icon={ReplayIcon
                                                }
                                            />
                                        : <DietButton
                                            width={40}
                                            onClick={() => handleProcessing(row)}
                                            disabled={!isRowSelected && !isProcessed || isProcessingRow}
                                            name={''}
                                            icon={InsertPageBreakIcon}
                                        />
                                }

                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}

export default memo(ProcessCompletedList)
