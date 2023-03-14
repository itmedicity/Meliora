import { Checkbox, Sheet, CssVarsProvider, Typography } from '@mui/joy'
import { Box } from '@mui/material'
import React from 'react'
import { Fragment } from 'react'
import { memo } from 'react'

const CmpRequestTypeCheckBx = ({ value, onChange, name, label, checkedValue, onClick }) => {
    return (
        <Fragment>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
                width: '100%',
                mx: 0.2,
                '& > div': { p: 1, boxShadow: 'sm', borderRadius: 'xs', display: 'flex', flex: 1 },
            }}>
                <CssVarsProvider>
                    <Sheet variant="outlined" sx={{ bgcolor: 'background.body', display: 'flex', }}>
                        <Checkbox
                            overlay
                            label={<Typography level="h2" fontSize="md" sx={{ mb: 0.5, color: 'neutral.600' }} >{label}</Typography>}
                            checked={checkedValue !== undefined && checkedValue !== value ? false : true}
                            onChange={(e) => {
                                onChange(e.target.checked === true ? value : null)
                            }}
                            onClick={onClick}
                            disabled={value === 2 ? true : false}
                            name={name}
                            size="lg"
                        />
                    </Sheet>
                </CssVarsProvider>
            </Box>

        </Fragment>
    )
}

export default memo(CmpRequestTypeCheckBx)