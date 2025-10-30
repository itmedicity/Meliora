import { Box, CssVarsProvider, ListItemDecorator, Tab, TabList, TabPanel, Tabs, tabClasses, tabsClasses } from '@mui/joy'
import { Paper } from '@mui/material'
import React from 'react'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useState } from 'react'
import BillsAndViews from './BillsAndViews'
import { memo } from 'react'
import TeleDash from './TeleCommunication/TeleDash'
import SoftDash from './SoftwareBills/SoftDash'
import ServiceDash from './Servicebills/ServiceDash'
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone'
import PlaylistAddTwoToneIcon from '@mui/icons-material/PlaylistAddTwoTone'
import ConnectedTvTwoToneIcon from '@mui/icons-material/ConnectedTvTwoTone'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import TapAndPlayIcon from '@mui/icons-material/TapAndPlay'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import BillsChartsAndGraph from './BillsChartsAndGraph'
import { useNavigate } from 'react-router-dom'

const BillDashBoardMain = () => {
  const [index, setIndex] = useState(0)
  const history = useNavigate()
  const [billCount, setbillCount] = useState(0)

  const GoTosupplierDetails = React.useCallback(() => {
    history('/Home/BillSupplierDetailsMast')
  }, [history])

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <Box sx={{ flex: 1, height: 35, borderBottom: 1, borderColor: 'lightgrey', display: 'flex' }}>
        <Box sx={{ flex: 1, fontWeight: 600, pl: 0.8, pt: 0.8, color: '#C7C8CB' }}> Bills & Pays</Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Paper
            sx={{
              bgcolor: '#647C90',
              my: 0.6,
              px: 1,
              borderRadius: 0,
              color: 'white',
              cursor: 'pointer',
              boxShadow: '5px 2px 3px',
              '&:hover': { bgcolor: '#738FA7', color: '#1B2A37', boxShadow: '1px 2px 3px' }
            }}
            onClick={GoTosupplierDetails}
          >
            &nbsp;Bill supplier Details <ArrowCircleRightIcon sx={{ pb: 0.3 }} />
          </Paper>
        </Box>
      </Box>
      <CssVarsProvider>
        <Tabs
          aria-label="Bottom Navigation"
          value={index}
          onChange={(event, value) => setIndex(value)}
          sx={theme => ({
            // p: 1,
            pt: 0.5,
            mx: 'auto',
            boxShadow: theme.shadow.sm,
            [`& .${tabsClasses.root}`]: {
              py: 1,
              flex: 1,
              transition: '0.3s',
              fontWeight: 'md',
              fontSize: 'md',
              [`&:not(.${tabClasses.selected})
                            :not(:hover)
                            `]: {
                opacity: 1
              }
            }
          })}
        >
          <TabList variant="plain" size="sm" disableUnderline sx={{ p: 0, flex: 1 }}>
            <Tab
              disableIndicator
              orientation="vertical"
              sx={{
                flexGrow: 1,
                pt: 0.5
              }}
            >
              <ListItemDecorator>
                <DashboardTwoToneIcon sx={{ width: 30, height: 30, color: '#274472' }} />
              </ListItemDecorator>
              DashBoard
            </Tab>
            <Tab
              disableIndicator
              orientation="vertical"
              sx={{
                flexGrow: 1,
                pt: 0.5
              }}
            >
              <ListItemDecorator>
                <PlaylistAddTwoToneIcon sx={{ width: 30, height: 30, color: '#5C4E4E' }} />
              </ListItemDecorator>
              New Bills & Views
            </Tab>
            <Tab
              disableIndicator
              orientation="vertical"
              sx={{
                flexGrow: 1,
                pt: 0.5
              }}
            >
              <ListItemDecorator>
                <TapAndPlayIcon sx={{ width: 30, height: 30, color: '#1A4314' }} />
              </ListItemDecorator>
              Telecommunication Bills
            </Tab>
            <Tab
              disableIndicator
              orientation="vertical"
              sx={{
                flexGrow: 1,
                pt: 0.5
              }}
            >
              <ListItemDecorator>
                <ConnectedTvTwoToneIcon sx={{ width: 30, height: 30, color: '#6B79BA' }} />
              </ListItemDecorator>
              Software Bills
            </Tab>
            <Tab
              disableIndicator
              orientation="vertical"
              sx={{
                flexGrow: 1,
                pt: 0.5
              }}
            >
              <ListItemDecorator>
                <SettingsSuggestIcon sx={{ width: 30, height: 30, color: '#738580' }} />
              </ListItemDecorator>
              Service Bills
            </Tab>
          </TabList>
          <TabPanel value={0} sx={{ p: 0 }}>
            <BillsChartsAndGraph />
          </TabPanel>
          <TabPanel value={1} sx={{ p: 0 }}>
            <BillsAndViews billCount={billCount} setbillCount={setbillCount} />
          </TabPanel>
          <TabPanel value={2} sx={{ p: 0 }}>
            <TeleDash billCount={billCount} setbillCount={setbillCount} />
          </TabPanel>
          <TabPanel value={3} sx={{ p: 0 }}>
            <SoftDash billCount={billCount} setbillCount={setbillCount} />
          </TabPanel>
          <TabPanel value={4} sx={{ p: 0 }}>
            <ServiceDash billCount={billCount} setbillCount={setbillCount} />
          </TabPanel>
        </Tabs>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(BillDashBoardMain)
