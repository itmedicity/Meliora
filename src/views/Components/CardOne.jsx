import { Card, CardActions, CardContent } from '@mui/material'
import React, { Fragment, memo } from 'react'
import { ToastContainer } from 'react-toastify'
import ValidateSession from '../Axios/ValidateSession'
import CustomCardHeader from './CustomCardHeader'
import SaveButton from './SaveButton'
import CancelButton from './CancelButton'
import EditButton from './EditButton'
import RefreshButton from './RefreshButton'

const CardOne = (props) => {
  return (
    <Fragment>
      <ToastContainer />
      <ValidateSession />
      <Card>
        <CustomCardHeader title={'Card One'} />
        <CardContent>{props.children}</CardContent>
        <CardActions disableSpacing sx={{ paddingY: 0 }}>
          <SaveButton />
          <EditButton />
          <RefreshButton />
          <CancelButton />
        </CardActions>
      </Card>
    </Fragment>
  )
}

export default memo(CardOne)
