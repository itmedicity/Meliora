import { Box, CssVarsProvider, Tab, TabList, TabPanel, Tabs } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import TextComponent from 'src/views/Components/TextComponent'
import CloseIcon from '@mui/icons-material/Close'
import CusIconButton from 'src/views/Components/CusIconButton'
import { useNavigate } from 'react-router-dom'
import ItemDetailSearch from './ItemDetailSearch'
const PendingEntries = React.lazy(() => import('../PendingDetailEntries/PendingEntries'))
const PendingDetailEntry = React.lazy(() => import('../AssetItemDetails/PendingDetailEntry'))
const ItemDetailAdd = React.lazy(() => import('../ItemDetailEnter/ItemDetailEnterMain'))

const DetailMain = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [assetSpare, setAssetSpare] = useState(0)
  const [detailArry, setDetailArry] = useState([])
  const [detailflag, setDetailflag] = useState(0)
  const [modalOpwn, setmodalOpwn] = useState(false)
  const [count, setCount] = useState(0)
  const history = useNavigate()
  const [pendingDetailFlag, setpendingDetailFlag] = useState(0)

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
    setAssetSpare(newValue === 1 ? 1 : 2)
  }

  const backtoSetting = useCallback(() => {
    history('/Home')
  }, [history])

  const AddDetails = useCallback(params => {
    const data = params.api.getSelectedRows()
    setDetailArry(data[0])
    setDetailflag(1)
    setmodalOpwn(true)
  }, [])

  const enterDetails = useCallback(val => {
    setDetailArry(val)
    setpendingDetailFlag(1)
  }, [])

  return (
    <Paper sx={{ borderRadius: 0, height: '90vh' }}>
      {detailflag === 1 ? (
        <ItemDetailAdd
          detailArry={detailArry}
          setDetailflag={setDetailflag}
          assetSpare={assetSpare}
          setCount={setCount}
          count={count}
          modalOpwn={modalOpwn}
          setmodalOpwn={setmodalOpwn}
        />
      ) : null}
      {pendingDetailFlag === 1 ? (
        <PendingDetailEntry
          detailArry={detailArry}
          setpendingDetailFlag={setpendingDetailFlag}
          setCount={setCount}
          count={count}
        />
      ) : (
        <Box>
          <CssVarsProvider>
            <Box sx={{ flex: 1, display: 'flex', borderBottom: 1, borderColor: '#D0D0D0' }}>
              <TextComponent
                sx={{
                  color: '#5A676C',
                  fontWeight: 510,
                  flex: 1,
                  m: 0.5,
                  pl: 1,
                  fontFamily: 'Arial'
                }}
                text="Item Detail Entry"
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
                bgcolor: 'white'
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
                      bgcolor: 'white'
                    },
                    [`&.Mui-selected`]: {
                      color: 'primary.plainColor',
                      borderBottom: 1.5,
                      '&::after': {
                        height: 20,
                        borderTopLeftRadius: 3,
                        borderTopRightRadius: 3,
                        bgcolor: 'primary.500'
                      }
                    }
                  }
                }}
              >
                <Box sx={{ flex: 1, display: 'flex', gap: 1, mb: 1, ml: 1 }}>
                  <Tab
                    label="Item Entries"
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
                        backgroundColor: '#5A5F63',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                        transform: 'scale(1.02)'
                      }
                    }}
                  >
                    Pending Detail Entries
                  </Tab>
                  <Tab
                    label="Asset"
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
                        backgroundColor: '#5A5F63',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                        transform: 'scale(1.02)'
                      }
                    }}
                  >
                    Asset
                  </Tab>
                  <Tab
                    label="Spare"
                    value={2}
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
                        backgroundColor: '#5A5F63',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                        transform: 'scale(1.02)'
                      }
                    }}
                  >
                    Spare
                  </Tab>
                </Box>
              </TabList>
              <TabPanel value={0} sx={{ p: 0, flexGrow: 1 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <PendingEntries enterDetails={enterDetails} />
                </Box>
              </TabPanel>
              <TabPanel value={1} sx={{ p: 0, flexGrow: 1, overflowY: 'auto', maxHeight: '80vh' }}>
                <Box sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: '100%' }}>
                  <ItemDetailSearch assetSpare={assetSpare} AddDetails={AddDetails} count={count} />
                </Box>
              </TabPanel>
              <TabPanel value={2} sx={{ p: 0, flexGrow: 1, overflowY: 'auto', maxHeight: '80vh' }}>
                <Box sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: '100%' }}>
                  <ItemDetailSearch assetSpare={assetSpare} AddDetails={AddDetails} count={count} />
                </Box>
              </TabPanel>
            </Tabs>
          </CssVarsProvider>
        </Box>
      )}
    </Paper>
  )
}

export default memo(DetailMain)
