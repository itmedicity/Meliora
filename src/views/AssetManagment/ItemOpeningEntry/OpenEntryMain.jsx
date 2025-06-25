import { Box, CssVarsProvider, Tab, TabList, TabPanel, Tabs } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CusIconButton from 'src/views/Components/CusIconButton'
import TextComponent from 'src/views/Components/TextComponent'
import CloseIcon from '@mui/icons-material/Close'
import ItemSearch from './ItemSearch'

const OpenEntryMain = () => {
  const history = useNavigate()
  const [selectedTab, setSelectedTab] = useState(0)
  const [assetOrSpare, setAssetOrSpare] = useState(1)

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
    setAssetOrSpare(newValue === 0 ? 1 : 2)
  }

  const backtoSetting = useCallback(() => {
    history('/Home')
  }, [history])

  return (
    <Paper sx={{ borderRadius: 0 }}>
      <CssVarsProvider>
        <Box sx={{ flex: 1, display: 'flex', borderBottom: 1, borderColor: '#D0D0D0' }}>
          <TextComponent
            sx={{
              color: '#5A676C',
              fontWeight: 510,
              flex: 1,
              m: 0.5,
              pl: 1,
              fontFamily: 'Arial',
            }}
            text="Item Opening Entry"
          />
          <Box>
            <CusIconButton size="sm" variant="outlined" color="primary" onClick={backtoSetting}>
              <CloseIcon fontSize="small" />
            </CusIconButton>
          </Box>
        </Box>

        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          size="sm"
          sx={{
            display: 'flex',
            bgcolor: 'white',
          }}
        >
          <TabList
            sx={{
              pt: 1,
              justifyContent: 'center',
              [`&& .MuiTabs-root`]: {
                flex: 'initial',
                bgcolor: 'white',
                '&:hover': {
                  bgcolor: 'white',
                },
                [`&.Mui-selected`]: {
                  color: 'primary.plainColor',
                  borderBottom: 1.5,
                  '&::after': {
                    height: 20,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    bgcolor: 'primary.500',
                  },
                },
              },
            }}
          >
            <Box sx={{ flex: 1, display: 'flex', gap: 1, mb: 1, ml: 1 }}>
              <Tab
                label="Asset"
                value={0}
                disableIndicator
                sx={{
                  color: '#5D6268',
                  fontWeight: 600,
                  p: 0,
                  border: 1,
                  width: 180,
                  borderColor: '#EAEFF2',
                  transition: 'all 0.3s ease',
                  '&.Mui-selected': {
                    color: 'white',
                    backgroundColor: '#5a5f63',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                    transform: 'scale(1.02)',
                  },
                }}
              >
                Asset
              </Tab>

              <Tab
                label="Spare"
                value={1}
                disableIndicator
                sx={{
                  color: '#5D6268',
                  fontWeight: 600,
                  p: 0,
                  border: 1,
                  width: 180,
                  borderColor: '#EAEFF2',
                  transition: 'all 0.3s ease',
                  '&.Mui-selected': {
                    color: 'white',
                    backgroundColor: '#5a5f63',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                    transform: 'scale(1.02)',
                  },
                }}
              >
                Spare
              </Tab>
            </Box>
          </TabList>

          <TabPanel value={0} sx={{ p: 0, flexGrow: 1, overflowY: 'auto', height: '80vh' }}>
            <Box sx={{ flexGrow: 1 }}>
              <ItemSearch assetOrSpare={assetOrSpare} />
            </Box>
          </TabPanel>
          <TabPanel value={1} sx={{ p: 0, flexGrow: 1, overflowY: 'auto', height: '80vh' }}>
            <Box sx={{ flexGrow: 1 }}>
              <ItemSearch assetOrSpare={assetOrSpare} />
            </Box>
          </TabPanel>
        </Tabs>
      </CssVarsProvider>
    </Paper>
  )
}

export default memo(OpenEntryMain)
