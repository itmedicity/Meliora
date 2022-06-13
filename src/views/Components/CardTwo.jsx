import { Card, CardActions, CardContent } from '@mui/material';
import React, { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import ValidateSession from '../Axios/ValidateSession';
import CustomCardHeader from './CustomCardHeader';
import SaveButton from './SaveButton';
import CancelButton from './CancelButton';
import RefreshButton from './RefreshButton';

const CardTwo = (props) => {
    return (
        <Fragment>
            <ToastContainer />
            <ValidateSession />
            <Card>
                <CustomCardHeader title={"Card Two"} />
                <CardContent>
                    {props.children}
                </CardContent>
                <CardActions disableSpacing sx={{ paddingY: 0 }}>
                    <SaveButton />
                    <RefreshButton />
                    <CancelButton />
                </CardActions>
            </Card>
        </Fragment>
    )
}

export default CardTwo