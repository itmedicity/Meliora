import { Box, CssVarsProvider, Tab, TabList, TabPanel, Tabs } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import TextComponent from 'src/views/Components/TextComponent'
import CusIconButton from 'src/views/Components/CusIconButton'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import ViewSubmittedModal from '../CondemnationList/ViewSubmittedModal'
import AllDeptRegistedLists from './AllDeptRegistedLists'
import AllDeptSelectRegDates from './AllDeptSelectRegDates'
import { Paper } from '@mui/material'

const AllDeptRegcondemMain = () => {
  const navigate = useNavigate()
  const backtoSetting = useCallback(() => {
    navigate('/Home')
  }, [navigate])

  const [formDetails, setformDetails] = useState([])
  const [modalViewFlag, setmodalViewFlag] = useState(0)
  const [modalViewOpen, setmodalViewOpen] = useState(false)

  const viewForm = useCallback((val) => {
    setformDetails(val)
    setmodalViewFlag(1)
    setmodalViewOpen(true)
  }, [])

  return (
    <Paper sx={{ borderRadius: 0, height: '90vh' }}>
      <CssVarsProvider>
        {modalViewFlag === 1 ? (
          <ViewSubmittedModal
            modalViewOpen={modalViewOpen}
            setmodalViewOpen={setmodalViewOpen}
            setmodalViewFlag={setmodalViewFlag}
            formDetails={formDetails}
          />
        ) : null}
        <Box>
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
              text=" Registered Condemnation List"
            />
            <Box>
              <CusIconButton size="sm" variant="outlined" color="primary" onClick={backtoSetting}>
                <CloseIcon fontSize="small" />
              </CusIconButton>
            </Box>
          </Box>
          <Tabs
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
                  label="Item Entries"
                  value={0}
                  disableIndicator
                  sx={{
                    color: '#5D6268',
                    fontWeight: 600,
                    p: 0,
                    border: 1,
                    width: 190,
                    borderColor: '#EAEFF2',
                    transition: 'all 0.3s ease',
                    '&.Mui-selected': {
                      color: 'white',
                      backgroundColor: '#6B5F5A ',
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  Select Registered Dates
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
                    width: 190,
                    borderColor: '#EAEFF2',
                    transition: 'all 0.3s ease',
                    '&.Mui-selected': {
                      color: 'white',
                      backgroundColor: '#6B5F5A ',
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  All Registered List
                </Tab>
              </Box>
            </TabList>
            <TabPanel value={0} sx={{ p: 0, flexGrow: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                <AllDeptSelectRegDates viewForm={viewForm} />
              </Box>
            </TabPanel>
            <TabPanel value={1} sx={{ p: 0, flexGrow: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                <AllDeptRegistedLists viewForm={viewForm} />
              </Box>
            </TabPanel>
          </Tabs>
        </Box>
      </CssVarsProvider>
    </Paper>
  )
}

export default memo(AllDeptRegcondemMain)
