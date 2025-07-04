import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import CusIconButton from './CusIconButton'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'
import CloseIcon from '@mui/icons-material/Close'
import CustomeToolTip from './CustomeToolTip'
import DownloadIcon from '@mui/icons-material/Download'
import CustomAgGridMenuSelection from './CustomAgGridMenuSelection'
import CustomAgGridRptFormatOne from './CustomAgGridRptFormatOne'

const CommonReportFormOne = () => {
  return (
    <Box>
      <Paper
        square
        sx={{
          height: { xs: 550, sm: 550, md: 550, lg: 558, xl: 850 },
          p: 0.5
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          {/* Left Side Section Start */}
          <Paper
            square
            sx={{
              backgroundColor: 'lightBlue',
              width: { md: '20%', lg: '20%', xl: '15%' },
              height: { xs: 540, sm: 540, md: 540, lg: 548, xl: 840 }
            }}
          >
            {/* Top Left Menu Section Start */}
            <Paper
              square
              sx={{
                backgroundColor: '#f0f3f5',
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 0.1,
                p: 0.3
              }}
            >
              <CustomeToolTip title="Department Name" placement="bottom">
                <Box>
                  <CusIconButton variant="outlined" size="sm" color="success">
                    <ContentPasteSearchIcon />
                  </CusIconButton>
                </Box>
              </CustomeToolTip>
              <CustomeToolTip title="Department Section" placement="bottom">
                <Box>
                  <CusIconButton variant="outlined" size="sm" color="success">
                    <ContentPasteSearchIcon />
                  </CusIconButton>
                </Box>
              </CustomeToolTip>
              <CustomeToolTip title="Department Master" placement="bottom">
                <Box>
                  <CusIconButton variant="outlined" size="sm" color="success">
                    <ContentPasteSearchIcon />
                  </CusIconButton>
                </Box>
              </CustomeToolTip>
            </Paper>
            {/* Table Component */}
            <CustomAgGridMenuSelection />
            {/* Top Left Menu Section End */}
          </Paper>
          {/* Left Side Section End */}

          {/* Rigth Side Section Start */}
          <Paper
            square
            sx={{
              backgroundColor: 'lightGrey',
              width: { md: '80%', lg: '80%', xl: '85%' },
              height: { xs: 540, sm: 540, md: 540, lg: 548, xl: 840 }
            }}
          >
            {/* Rigth Side Menu  */}
            {/* Date Selection Start */}
            {/* <Paper
              square
              sx={{
                backgroundColor: '#fafef3',
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 0.1,
                p: 0.3,
              }}
            >
              <CusIconButton variant="outlined" size="sm" color="success">
                <SearchIcon />
              </CusIconButton>
            </Paper> */}
            {/* Date Selection Start */}
            <Paper
              square
              sx={{
                backgroundColor: '#f0f3f5',
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row-reverse',
                // alignItems: "",
                gap: 0.1,
                p: 0.3,
                borderLeft: 2,
                borderColor: '#d3d3d3'
              }}
            >
              <CustomeToolTip title="Close" placement="bottom">
                <Box>
                  <CusIconButton variant="outlined" size="sm" color="success">
                    <CloseIcon />
                  </CusIconButton>
                </Box>
              </CustomeToolTip>

              <CustomeToolTip title="Download" placement="bottom">
                <Box>
                  <CusIconButton variant="outlined" size="sm" color="success">
                    <DownloadIcon />
                  </CusIconButton>
                </Box>
              </CustomeToolTip>
            </Paper>
            <Box
              sx={{
                borderLeft: 2,
                borderColor: '#d3d3d3'
              }}
            >
              {/* Table Component */}
              <CustomAgGridRptFormatOne />
            </Box>
            {/* Rigth Side Menu  */}
          </Paper>
          {/* Rigth Side Section End */}
        </Box>
        {/* <Paper square sx={{ backgroundColor: "lightpink" }}  >sdfsdfsdf</Paper> */}
      </Paper>
    </Box>
  )
}

export default CommonReportFormOne
