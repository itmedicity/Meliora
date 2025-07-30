import { Box, Input } from '@mui/joy'
import React from 'react'
import IncidentTextComponent from './IncidentTextComponent'
import SearchIcon from '@mui/icons-material/Search';



const PatientFilter = ({ onChange, onClick, value }) => {
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            mt: 1
        }}>
            <Input
                placeholder='Enter Op/Ip Number'
                onChange={(e) => onChange(e.target.value)}
                value={value}
                endDecorator={
                    <Box
                        onClick={onClick}
                        variant="soft"
                        color="neutral"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid grey',
                            mx: 1,
                            px: 1,
                            borderRadius: 5,
                            cursor: 'pointer',
                            '&:hover': {
                                transform: 'translateY(-0.5px)',
                                boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                            },
                            userSelect: 'none',
                        }}>
                        <SearchIcon sx={{ fontSize: 18 }} />
                        <IncidentTextComponent text={"search Here"} color={'#343537ff'} size={14} weight={400} />
                    </Box>
                }
                sx={{
                    width: '100%',
                    padding: 0,
                    fontFamily: 'var(--roboto-font)',
                    px: 1,
                    '--Input-focusedThickness': '0px', // removes Joy's blue focus ring
                    '--Input-focusedHighlight': 'transparent', // prevents any glow
                    boxShadow: 'none',
                    '&:focus-within': {
                        boxShadow: 'none',
                    },
                    '& input': {
                        boxShadow: 'none'
                    },
                    '& input:focus': {
                        boxShadow: 'none'
                    },
                }}
            />
        </Box>
    )
}

export default PatientFilter