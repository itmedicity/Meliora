import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Checkbox as Ched,
  Grid,
  TextField,
} from '@mui/material'
import React, { Fragment } from 'react'
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined'
import { Checkbox, CssVarsProvider } from '@mui/joy'
import { useState } from 'react'
import CusCheckBox from './CusCheckBox'
import UnCheckedIcon from './UnCheckedIcon'
import FoucuCheckBox from './FoucuCheckBox'
import FoucCheckBocSecondary from './FoucCheckBocSecondary'
import OverRelayCheckBox from './OverRelayCheckBox'
import CusIconButton from './CusIconButton'
import CustomMaterialTable from './CustomMaterialTable'
import GitHubIcon from '@mui/icons-material/GitHub'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import TextFieldCustom from './TextFieldCustom'

const CusCard = () => {
  const [checked, checkValue] = useState(0)
  console.log(checked)
  return (
    <Fragment>
      <Card
        sx={{
          my: 0.8,
          borderRadius: 0,
          boxShadow: 3,
        }}
      >
        <CardHeader
          title="Test Card"
          action={
            <IconButton
              aria-label="bookmark Bahamas Islands"
              // variant="plain"
              // color="neutral"
              // size="sm"
              // sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
            >
              <BookmarkAdd />
            </IconButton>
          }
          sx={{
            backgroundColor: {
              xs: 'lightGreen',
              sm: 'lightBlue',
              md: 'lightgrey',
              lg: 'lightYellow',
              xl: 'lightDark',
            },
          }}
        />
        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <CusCheckBox label="CheckBox1" color="success" size="lg" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <UnCheckedIcon label="CheckBox1" color="success" size="lg" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <FoucuCheckBox
                label="Focus with Label"
                color="success"
                size="lg"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <FoucCheckBocSecondary
                label="Focus Box Only"
                color="success"
                size="lg"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <OverRelayCheckBox
                label="OverRelay Checkbox"
                color="success"
                size="lg"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              {/* <CusIconButton size="sm" variant="outlined">
                <GitHubIcon />
              </CusIconButton>
              <CusIconButton size="sm" variant="outlined">
                <FavoriteBorder />
              </CusIconButton> */}
              <TextFieldCustom />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <TextFieldCustom />
              {/* <CustomMaterialTable /> */}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ mt: 2 }}>
            <TextFieldCustom />
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  )
}

export default CusCard
