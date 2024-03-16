import { Box, Button, CssVarsProvider, Table } from '@mui/joy'
import { Paper } from '@mui/material'
import React from 'react'

const SeeMyTable = () => {
    return (
        <Paper sx={{ p: 1, mt: .9, boxShadow: '0px 0px 2px', border: 1, borderColor: '#DDE7EE', height: '76vh' }} >

            <Box sx={{ flex: 1, my: .5 }}>
                <CssVarsProvider>
                    <Button variant='soft' sx={{ width: 250, borderRadius: 0 }} >
                        + Add See My Machine Bill
                    </Button>
                </CssVarsProvider>
            </Box>

            <Box sx={{}}>
                <CssVarsProvider>
                    <Table padding={"none"} stickyHeader sx={{ backgroundColor: 'white', border: 1, borderColor: '#F2F1F0', }}
                        hoverRow>
                        <thead>
                            <tr>
                                <th style={{ width: 60, fontFamily: 'Georgia' }}>SlNo</th>
                                <th style={{ width: 80, fontFamily: 'Georgia' }}>Action</th>
                                <th style={{ width: 150, fontFamily: 'Georgia' }}>Sim Operator</th>
                                <th style={{ width: 150, fontFamily: 'Georgia' }}>Sim Category</th>
                                <th style={{ width: 150, fontFamily: 'Georgia' }}>Sim Mobile No</th>
                                <th style={{ width: 150, fontFamily: 'Georgia' }}>Tariff</th>
                                <th style={{ width: 150, fontFamily: 'Georgia' }}>Tariff Amount</th>
                                <th style={{ width: 150, fontFamily: 'Georgia' }}>Sim SlNo </th>

                            </tr>
                        </thead>

                        <tbody >

                        </tbody>

                    </Table>
                </CssVarsProvider>
            </Box>

        </Paper>
    )
}

export default SeeMyTable