import { Box, Grid } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo } from 'react'
const PurchaseGridView = React.lazy(() => import('../Components/PurchaseGridView'))

const PurcahseMainComp = ({ viewPednigDetails, purchaseApprv }) => {
  return (
    <Fragment>
      <Box sx={{ flexGrow: 1, height: window.innerHeight - 160, bgcolor: 'white' }}>
        <Paper variant="plain" sx={{ bgcolor: 'white', flexWrap: 'wrap', px: 1 }}>
          <Grid container spacing={0.5} sx={{ flexGrow: 1, p: 0.5 }}>
            {Object.entries(purchaseApprv)?.map(([key, value]) => (
              <PurchaseGridView val={value} key={key} viewPednigDetails={viewPednigDetails} />
            ))}
          </Grid>
        </Paper>
      </Box>
    </Fragment>
  )
}

export default memo(PurcahseMainComp)
