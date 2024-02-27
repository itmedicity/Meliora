import { Box, CssVarsProvider, Typography } from '@mui/joy'
import React from 'react'
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import Settings from '@mui/icons-material/Settings';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';

const CrfDashboardMain = () => {

    const purchaseDeptArray = [
        { name: 'PO acknowledgement', count: 100 },
        { name: 'Quote Pending', count: 20 },
        { name: 'Negotiation Pending', count: 30 },
        { name: 'PO Preperation Pending', count: 70 },
        { name: 'PO Approval', count: 80 },
        { name: 'PO Submit Pending', count: 20 },
        { name: 'CRS DC Pending', count: 30 },
        { name: 'User acknowledgement', count: 180 },
    ]

    return (
        <CssVarsProvider>
            {/* CRF Pending Status Start Here */}
            <Box
                sx={{
                    display: 'flex',
                    border: 5,
                    borderColor: '#6398fd',
                    borderRadius: 10,
                    minHeight: 50,
                    boxShadow: 2,
                    backgroundColor: '#6398fd'
                }}
            >
                <ButtonGroup
                    aria-label="outlined primary button group"
                    size="sm"
                    buttonFlex={1}
                    variant="plain"
                    orientation="vertical"
                    sx={{
                        display: 'flex',
                        flex: 1,
                        maxWidth: '100%',
                        overflow: 'auto',
                    }}
                >
                    <Button sx={{}} startDecorator={<AlignHorizontalLeftIcon sx={{ color: 'red' }} />} >CRF Status</Button>
                    <Button sx={{ color: 'white' }} >Head Of Department (HOD)</Button>
                    <Button sx={{ color: 'white' }} >Deputy medical superintendent (DMS) </Button>
                    <Button sx={{ color: 'white' }} >Medical superintendent (MS)</Button>
                    <Button sx={{ color: 'white' }} >Materials Management</Button>
                    <Button sx={{ color: 'white' }} >Senior Manager Operation (SMO)</Button>
                    <Button sx={{ color: 'white' }} >General Manager Operation (GM)</Button>
                    <Button sx={{ color: 'white' }} >Medical Director (MD)</Button>
                    <Button sx={{ color: 'white' }} >Executive Director (ED)</Button>
                </ButtonGroup>

                <ButtonGroup
                    aria-label="outlined primary button group"
                    size="sm"
                    buttonFlex={1}
                    // variant="plain"
                    orientation="vertical"
                    sx={{
                        display: 'flex',
                        flex: 1,
                        maxWidth: '100%',
                        overflow: 'auto',
                    }}
                >
                    <Button sx={{}} variant='solid' color='primary' >Clinical Department CRF</Button>
                    <Button sx={{}} >100</Button>
                    <Button sx={{}} >100</Button>
                    <Button sx={{}} >100</Button>
                    <Button sx={{}} >100</Button>
                    <Button sx={{}} >100</Button>
                    <Button sx={{}} >100</Button>
                    <Button sx={{}} >100</Button>
                    <Button sx={{}} >100</Button>
                </ButtonGroup>
                <ButtonGroup
                    aria-label="outlined primary button group"
                    size="sm"
                    buttonFlex={1}
                    // variant="plain"
                    orientation="vertical"
                    sx={{
                        display: 'flex',
                        flex: 1,
                        maxWidth: '100%',
                        overflow: 'auto',

                    }}
                >
                    <Button sx={{}} variant='solid' color='primary'  >Non Clinical Department CRF</Button>
                    <Button sx={{}} >200</Button>
                    <Button sx={{}} disabled >0</Button>
                    <Button sx={{}} disabled>0</Button>
                    <Button sx={{}} disabled>0</Button>
                    <Button sx={{}} >200</Button>
                    <Button sx={{}} >200</Button>
                    <Button sx={{}} >200</Button>
                    <Button sx={{}} >200</Button>
                </ButtonGroup>
            </Box>
            {/* CRF Pending Status Start Here */}
            {/* Purchase CRF Status Start Here  */}
            <Box
                sx={{
                    display: 'flex',
                    mt: 1,
                    borderColor: '#6398fd',
                    borderRadius: 10,
                    minHeight: 50,
                    boxShadow: 2,
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}
                gap={1}
            >
                {/* <Stack spacing={1} flexDirection={'row'} > */}
                {
                    purchaseDeptArray?.map((val, index) =>
                        <Card
                            variant='solid'
                            color='primary'
                            invertedColors
                            sx={{ width: 260 }}
                            size='md'
                            key={index}
                        >
                            <div>
                                <Typography level="h2">
                                    {val.count}{' '}
                                    <Typography fontSize="sm" textColor="text.tertiary">
                                        / {val.name}
                                    </Typography>
                                </Typography>
                            </div>
                        </Card>
                    )
                }
                {/* </Stack> */}
            </Box>
            {/* Purchase CRF Status End Here  */}
        </CssVarsProvider>
    )
}

export default CrfDashboardMain