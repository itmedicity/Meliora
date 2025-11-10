import { Box, CssVarsProvider, Tab, TabList, TabPanel, Tabs } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CusIconButton from 'src/views/Components/CusIconButton'
import TextComponent from 'src/views/Components/TextComponent'
import CloseIcon from '@mui/icons-material/Close'
import TransferAsset from './TransferAsset'
import InterDeptTransfer from './InterDeptTransfer'
import AssetTransferHistory from './AssetTransferHistory'
import { getEmployeeuserrightsMenu } from 'src/api/TicketApi'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { taskColor } from 'src/color/Color'

const AssetTransferMain = () => {
  const history = useNavigate()

  const backtoSetting = useCallback(() => {
    history('/Home')
  }, [history])

  const [menurights, setMenurights] = useState([])

  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const postEmp = useMemo(() => ({ empid: id }), [id])
  const { data: menuRightsEmployee = [] } = useQuery({
    queryKey: ['getEmployeeUserRightsMenu', postEmp],
    queryFn: () => getEmployeeuserrightsMenu(postEmp)
  })

  const employeeMenuRight = useMemo(() => menuRightsEmployee, [menuRightsEmployee])

  const menuList = useMemo(() => {

    return [
      {
        slno: 322,
        name: 'Ticket List',
        component: <TransferAsset />
      },
      {
        slno: 323,
        name: 'Ticket List Supervisor',
        component: <InterDeptTransfer />
      },
      {
        slno: 324,
        name: 'Dept Ticket List Employee View',
        component: <AssetTransferHistory />
      },

    ]
  }, [])

  useEffect(() => {
    let array = menuList.filter(value => employeeMenuRight.find(val => value.slno === val.menu_slno))
    setMenurights(array)
  }, [menuList, employeeMenuRight]);

  return (
    <Paper sx={{ borderRadius: 0, width: "100%" }}>
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
            text="Asset Transfer"
          />
          <Box>
            <CusIconButton size="sm" variant="outlined" color="primary" onClick={backtoSetting}>
              <CloseIcon fontSize="small" />
            </CusIconButton>
          </Box>
        </Box>
        <Tabs
          size="sm"
          defaultValue={1}
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
              {menurights.find(menu => menu.slno === 322) ? (
                <Tab
                  value={0}
                  disableIndicator
                  sx={{
                    color: '#5D6268',
                    fontWeight: 600,
                    p: 0,
                    border: 1,
                    width: 240,
                    borderColor: '#EAEFF2',
                    transition: 'all 0.3s ease',
                    '&.Mui-selected': {
                      color: 'white',
                      backgroundColor: taskColor.darkPurple,
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                      transform: 'scale(1.02)'
                    }
                  }}
                >
                  Custodian to Department Transfer
                </Tab>
              ) : null}
              {menurights.find(menu => menu.slno === 323) ? (
                <Tab
                  value={1}
                  disableIndicator
                  sx={{
                    color: '#5D6268',
                    fontWeight: 600,
                    p: 0,
                    border: 1,
                    width: 240,
                    borderColor: '#EAEFF2',
                    transition: 'all 0.3s ease',
                    '&.Mui-selected': {
                      color: 'white',
                      backgroundColor: taskColor.darkPurple,
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                      transform: 'scale(1.02)'
                    }
                  }}
                >
                  InterDepartment Transfer
                </Tab>
              ) : null}
              {menurights.find(menu => menu.slno === 324) ? (
                <Tab
                  value={2}
                  disableIndicator
                  sx={{
                    color: '#5D6268',
                    fontWeight: 600,
                    p: 0,
                    border: 1,
                    width: 240,
                    borderColor: '#EAEFF2',
                    transition: 'all 0.3s ease',
                    '&.Mui-selected': {
                      color: 'white',
                      backgroundColor: taskColor.darkPurple,
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                      transform: 'scale(1.02)'
                    }
                  }}
                >
                  Transfer History
                </Tab>
              ) : null}
            </Box>
          </TabList>
          <TabPanel value={0} sx={{ p: 0, flexGrow: 1, overflowY: 'auto', height: '78vh' }}>
            <Box sx={{ flexGrow: 1 }}>
              {menurights.find(menu => menu.slno === 322)?.component || null}

            </Box>
          </TabPanel>
          <TabPanel value={1} sx={{ p: 0, flexGrow: 1, overflowY: 'auto', height: '78vh' }}>
            <Box sx={{ flexGrow: 1 }}>
              {menurights.find(menu => menu.slno === 323)?.component || null}
            </Box>
          </TabPanel>
          <TabPanel value={2} sx={{ p: 0, flexGrow: 1, overflowY: 'auto', height: '78vh' }}>
            <Box sx={{ flexGrow: 1 }}>
              {menurights.find(menu => menu.slno === 324)?.component || null}
            </Box>
          </TabPanel>
        </Tabs>
      </CssVarsProvider>
    </Paper>
  )
}

export default memo(AssetTransferMain)
