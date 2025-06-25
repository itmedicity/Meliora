import React, { memo, useCallback } from 'react'
import { Box, Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import { CssVarsProvider, Tab, TabList, TabPanel, Tabs } from '@mui/joy'
import TextComponent from 'src/views/Components/TextComponent'
import CusIconButton from 'src/views/Components/CusIconButton'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import PendingCondemnationList from './PendingCondemnationList'
// import SubmittedCondemList from './DeptSubmittedList/SubmittedCondemList';
// import DeptScrapstoreMain from './DeptScrapstore/DeptScrapstoreMain';

const CondemnationList = () => {
  const empdept = useSelector((state) => {
    return state.LoginUserData.empdept
  })
  const empId = useSelector((state) => {
    return state.LoginUserData.empid
  })
  const history = useNavigate()
  const backtoSetting = useCallback(() => {
    history('/Home')
  }, [history])

  return (
    <Paper sx={{ borderRadius: 0, height: '90vh' }}>
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
                fontFamily: 'Arial',
              }}
              text="Condemnation List"
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
                  Pending List
                </Tab>
                {/* <Tab
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
                                    Condemnation Submitted
                                </Tab>
                                <Tab
                                    label="Asset"
                                    value={2}
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
                                    Scrap Store
                                </Tab> */}
              </Box>
            </TabList>
            <TabPanel value={0} sx={{ p: 0, flexGrow: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                <PendingCondemnationList empdept={empdept} empId={empId} />
              </Box>
            </TabPanel>
            {/* <TabPanel value={1} sx={{ p: 0, flexGrow: 1, }}>
                            <Box sx={{ flexGrow: 1, }}>
                                <SubmittedCondemList empdept={empdept} empId={empId} />
                            </Box>
                        </TabPanel>
                        <TabPanel value={2} sx={{ p: 0, flexGrow: 1, }}>
                            <Box sx={{ flexGrow: 1, }}>
                                <DeptScrapstoreMain empdept={empdept} />
                            </Box>
                        </TabPanel> */}
          </Tabs>
        </CssVarsProvider>
      </Box>
    </Paper>
  )
}

export default memo(CondemnationList)
