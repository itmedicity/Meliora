import { Box, CssVarsProvider, Tab, TabList, TabPanel, Tabs } from '@mui/joy'
import { keyframes, Paper } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CusIconButton from 'src/views/Components/CusIconButton'
import TextComponent from 'src/views/Components/TextComponent'
import CloseIcon from '@mui/icons-material/Close'
import DirectComplaintReg from '../DirectCmRegister/DirectComplaintReg'
import ResolvedDirectTickets from './ResolvedDirectTickets'
import { useQuery } from 'react-query'
import { axioslogin } from 'src/views/Axios/Axios'
import InfoIcon from '@mui/icons-material/Info'
import { useSelector } from 'react-redux'

const DirectTicketMainTab = () => {
  const history = useNavigate()
  const [selectedTab, setSelectedTab] = useState(0)
  const [count, setCount] = useState(0)
  const [depsec, setDepsec] = useState(0)

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  const backtoSetting = useCallback(() => {
    history('/Home')
  }, [history])

  const empsecid = useSelector((state) => {
    return state.LoginUserData.empsecid
  })

  const { data: verficationPending = [] } = useQuery({
    queryKey: ['getVerificationPendingTickets', depsec, count],
    queryFn: async () => {
      const result = await axioslogin.get(`/complaintreg/getVerificationPending/${depsec}`)
      const { success, data } = result.data
      return success === 1 ? data : []
    },
    nabled: !!depsec,
  })

  const blink = keyframes`
                50% {
                opacity: 20%;
            }`

  return (
    <Paper sx={{ borderRadius: 0, width: "100%", }}>
      <CssVarsProvider>
        <Box sx={{ flex: 1, display: 'flex', borderBottom: 1, borderColor: '#D0D0D0', }}>
          <TextComponent
            sx={{
              color: '#5A676C',
              fontWeight: 510,
              flex: 1,
              m: 0.5,
              pl: 1,
              fontFamily: 'Arial',
            }}
            text="Ticket Registration & View"
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
                    color: 'Black',
                    backgroundColor: '#C6DCF3',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                    transform: 'scale(1.02)',
                  },
                }}
              >
                Direct Ticket Registration
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
                    color: 'black',
                    backgroundColor: '#C6DCF3',
                    boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
                    transform: 'scale(1.02)',
                  },
                }}
              >
                Resolved Tickets
              </Tab>
              {verficationPending.length > 2 && empsecid === depsec ? (
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#FFF387',
                      color: 'darkred',
                      fontWeight: 600,
                      borderTopLeftRadius: 15,
                      borderBottomLeftRadius: 15,
                      px: 1,
                      boxShadow: 1,
                      animation: `${blink} 1.2s infinite`,
                    }}
                  >
                    <InfoIcon sx={{ fontSize: 22, mr: 1, color: 'darkred' }} />
                    Ensure all rectified tickets are verified prior to registering any new tickets.
                  </Box>
                </Box>
              ) : null}
            </Box>
          </TabList>

          <TabPanel value={0} sx={{ p: 0, flexGrow: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              <DirectComplaintReg
                verficationPending={verficationPending}
                count={count}
                setCount={setCount}
                depsec={depsec}
                setDepsec={setDepsec}
                empsecid={empsecid}
              />
            </Box>
          </TabPanel>
          <TabPanel value={1} sx={{ p: 0, flexGrow: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              <ResolvedDirectTickets />
            </Box>
          </TabPanel>
        </Tabs>
      </CssVarsProvider>
    </Paper>
  )
}

export default memo(DirectTicketMainTab)
