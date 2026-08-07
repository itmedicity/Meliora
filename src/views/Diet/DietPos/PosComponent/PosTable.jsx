import React from 'react'
import { Virtuoso } from 'react-virtuoso'
import { Paper, Box } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DietButton from '../../DietComponent/DietButton'
import DietTextComponent from '../../DietComponent/DietTextComponent'

const Cell = ({ width, children }) => (
    <Box
        sx={{
            width,
            display: 'flex',
            alignItems: 'center'
        }}
    >
        {children}
    </Box>
)

const PosTable = ({
    data = [],
    onView
}) => {

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
                }}>

                {[
                    ['Admission', 120],
                    ['MRD', 120],
                    ['Patient Name', 220],
                    ['Room', 100],
                    ['Nurse Station', 180],
                    ['Bill', 100]
                ].map(([label, width]) => (
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
                style={{ height: '70vh' }}
                data={data}
                itemContent={(index, row) => (

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

                        <Cell width={120}>
                            <DietTextComponent value={row.fb_ip_no} size={12} />
                        </Cell>

                        <Cell width={120}>
                            <DietTextComponent value={row.fb_pt_no} size={12} />
                        </Cell>

                        <Cell width={220}>
                            <DietTextComponent value={row.fb_ptc_name} size={12} />
                        </Cell>


                        <Cell width={100}>
                            <DietTextComponent value={row.fb_bdc_no} size={12} />
                        </Cell>

                        <Cell width={180}>
                            <DietTextComponent value={row.fb_ns_name} size={12} />
                        </Cell>


                        <Cell width={100}>
                            <DietButton
                                width={80}
                                name="Bill"
                                icon={VisibilityIcon}
                                onClick={() => onView(row)}
                            />
                        </Cell>

                    </Box>
                )}
            />

        </Paper>
    )
}

export default PosTable