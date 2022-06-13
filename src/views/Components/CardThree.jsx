import { Card, CardActions, CardContent } from '@mui/material';
import React, { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import ValidateSession from '../Axios/ValidateSession';
import CustomCardHeader from './CustomCardHeader';
import CancelButton from './CancelButton';

const CardThree = (props) => {
    return (
        <Fragment>
            <ToastContainer />
            <ValidateSession />
            <Card>
                <CustomCardHeader title={"Card Three"} />
                <CardContent>
                    {props.children}
                </CardContent>
                <CardActions disableSpacing sx={{ paddingY: 0 }}>
                    <CancelButton />
                </CardActions>
            </Card>
        </Fragment>
    )
}

export default CardThree