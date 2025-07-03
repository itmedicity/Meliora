import React, { Fragment, memo } from 'react'
import { Box, Skeleton } from '@mui/joy'
import { Paper, Grid } from '@mui/material'

const DashboardSkeleton = () => {
  return (
    <Fragment>
      <Grid container spacing={2}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Paper
              variant="outlined"
              square
              sx={{
                width: '100%',
                bgcolor: 'white',
                height: 180,
                border: '1px solid #bbdefb',
                borderRadius: 5,
              }}
            >
              <Box
                sx={{
                  marginBottom: 1,
                  display: 'flex',
                  height: 'calc(100% - 40px)',
                }}
              >
                {/* Left Side Image Skeleton */}
                <Box
                  sx={{
                    flex: 0.5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    pl: 1,
                    py: 1,
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    sx={{ width: 110, height: 90, borderRadius: 1 }}
                  />
                </Box>

                {/* Right Side Content Skeleton */}
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'flex-end',
                      pr: 2,
                      py: 2,
                    }}
                  >
                    <Skeleton variant="text" sx={{ width: '70%', height: 24 }} />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      pt: 0.5,
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        width: 100,
                        height: 40,
                        borderRadius: '20px 0 0 20px',
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mx: 1, my: 0.5 }}>
                <Skeleton variant="rectangular" sx={{ height: 1, bgcolor: 'rgba(0,51,122,0.6)' }} />
              </Box>

              {/* Footer Section Skeleton */}
              <Box
                sx={{
                  display: 'flex',
                  flexGrow: 1,
                  justifyContent: 'space-evenly',
                  m: 0.5,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Skeleton variant="text" sx={{ width: 60, height: 20, mr: 1 }} />
                  <Skeleton variant="text" sx={{ width: 30, height: 20 }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Skeleton variant="text" sx={{ width: 90, height: 20, mr: 1 }} />
                  <Skeleton variant="text" sx={{ width: 30, height: 20 }} />
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  )
}

export default memo(DashboardSkeleton)
