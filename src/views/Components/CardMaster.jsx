import React, { Fragment, memo } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Card, CardActions, CardContent, ThemeProvider } from '@mui/material';
import CusIconButton from './CusIconButton';
import theme from './MuiTheme';
import { Box } from '@mui/system';
import CustomeToolTip from './CustomeToolTip';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh';
import CustomCardHeaderOne from './CustomCardHeaderOne';

const CardMaster = ({ children, title, close, submit }) => {
    return (
        <Fragment>
            <ThemeProvider theme={theme} >
                <Card sx={{ borderRadius: 0, boxShadow: 1 }}>
                    <CustomCardHeaderOne
                        title={title}
                        onClickClose={close}
                        cardStyle={{}}
                    />
                    <CardContent >
                        {children}
                    </CardContent>
                    <CardActions sx={{ backgroundColor: '#f0f3f5', py: 0.300, pt: 0.500 }} disableSpacing={false} >
                        {/* Save button */}
                        <CustomeToolTip title="Save" placement="left" >
                            <Box>
                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={submit}>
                                    <LibraryAddIcon fontSize='small' />
                                </CusIconButton>
                            </Box>
                        </CustomeToolTip>
                        {/* Refresh Button */}
                        <CustomeToolTip title="Refresh" placement="left" >
                            <Box>
                                <CusIconButton size="sm" variant="outlined" color="primary">
                                    <RefreshIcon fontSize='small' />
                                </CusIconButton>
                            </Box>
                        </CustomeToolTip>
                        {/* Close button */}
                        <CustomeToolTip title="Close" placement="left" >
                            <Box>
                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={close}>
                                    <CloseIcon fontSize='small' />
                                </CusIconButton>
                            </Box>
                        </CustomeToolTip>
                    </CardActions>
                </Card>
            </ThemeProvider>
        </Fragment>
    )
}

export default memo(CardMaster)