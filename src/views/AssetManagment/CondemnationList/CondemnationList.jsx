import React, { memo, useCallback, useEffect, useState, } from 'react'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { Tab, TabList, TabPanel, Tabs, } from '@mui/joy';
import TextComponent from 'src/views/Components/TextComponent';
import CusIconButton from 'src/views/Components/CusIconButton';
import CloseIcon from '@mui/icons-material/Close'
import PendingCondemnationList from './PendingCondemnationList';
import SubmittedCondemList from './DeptSubmittedList/SubmittedCondemList';
import DeptScrapstoreMain from './DeptScrapstore/DeptScrapstoreMain';
import { useNavigate } from 'react-router-dom'
import { taskColor } from 'src/color/Color';
import { useQueryClient } from '@tanstack/react-query';

const CondemnationList = () => {

  const queryClient = useQueryClient()
  const history = useNavigate();

  const empdept = useSelector((state) => {
    return state.LoginUserData.empdept
  })

  const empId = useSelector((state) => {
    return state.LoginUserData.empid
  })

  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])

  const [addmoreItemFlag, setAddmoreItemFlag] = useState(0)
  const [addMoreModalOpen, setaddMoreModalOpen] = useState(false)
  const [FormDetailsInAddMoreItems, setFormDetailsInAddMoreItems] = useState([])
  const [tabValue, setTabValue] = useState(1);

  useEffect(() => {
    setTabValue(addmoreItemFlag === 1 ? 1 : 1);
  }, [addmoreItemFlag]);


  return (

    <Box sx={{ borderRadius: 0, flexGrow: 1, height: '40vh', }} >
      <Box sx={{ flex: 1, display: 'flex', borderBottom: 1, borderColor: '#D0D0D0', }}>
        <TextComponent
          sx={{
            color: '#5A676C',
            fontWeight: 510,
            flex: 1,
            m: 0.5,
            pl: 1,
            fontFamily: 'Arial'
          }}
          text="Condemnation List" />
        <Box>
          <CusIconButton
            size="sm"
            variant="outlined"
            color="primary"
            onClick={backtoSetting}
          >
            <CloseIcon fontSize="small" />
          </CusIconButton>
        </Box>
      </Box>

      <Tabs
        value={tabValue}
        onChange={(event, newValue) => setTabValue(newValue)}
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
              value={1}
              disableIndicator
              sx={{
                color: taskColor.darkPurple,
                fontWeight: 600,
                p: 0,
                border: 1,
                width: 190,
                borderColor: taskColor.lightpurple,
                transition: 'all 0.3s ease',
                '&.Mui-selected': {
                  color: 'white',
                  backgroundColor: taskColor.darkPurple,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                  transform: 'scale(1.02)',
                },
              }}
            >
              Pending List
            </Tab>
            <Tab
              label="Asset"
              value={2}
              disableIndicator
              sx={{
                color: taskColor.darkPurple,
                fontWeight: 600,
                p: 0,
                border: 1,
                width: 190,
                borderColor: taskColor.lightpurple,
                transition: 'all 0.3s ease',
                '&.Mui-selected': {
                  color: 'white',
                  backgroundColor: taskColor.darkPurple,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                  transform: 'scale(1.02)',
                },
              }}
            >
              Condemnation Submitted
            </Tab>
            <Tab
              label="Asset"
              value={3}
              disableIndicator
              sx={{
                color: taskColor.darkPurple,
                fontWeight: 600,
                p: 0,
                border: 1,
                width: 190,
                borderColor: taskColor.lightpurple,
                transition: 'all 0.3s ease',
                '&.Mui-selected': {
                  color: 'white',
                  backgroundColor: taskColor.darkPurple,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                  transform: 'scale(1.02)',
                },
              }}
            >
              Scrap Store
            </Tab>
          </Box>
        </TabList>
        <TabPanel value={1} sx={{ p: 0, flexGrow: 1, }}>
          <Box sx={{ flexGrow: 1, }}>
            <PendingCondemnationList empdept={empdept} empId={empId} setAddmoreItemFlag={setAddmoreItemFlag} addmoreItemFlag={addmoreItemFlag}
              setFormDetailsInAddMoreItems={setFormDetailsInAddMoreItems} FormDetailsInAddMoreItems={FormDetailsInAddMoreItems} queryClient={queryClient}
              addMoreModalOpen={addMoreModalOpen} setaddMoreModalOpen={setaddMoreModalOpen} />
          </Box>
        </TabPanel>
        <TabPanel value={2} sx={{ p: 0, flexGrow: 1, }}>
          <Box sx={{ flexGrow: 1, }}>
            <SubmittedCondemList empdept={empdept} empId={empId} setAddmoreItemFlag={setAddmoreItemFlag}
              setFormDetailsInAddMoreItems={setFormDetailsInAddMoreItems} queryClient={queryClient}
            />
          </Box>
        </TabPanel>
        <TabPanel value={3} sx={{ p: 0, flexGrow: 1, }}>
          <Box sx={{ flexGrow: 1, }}>
            <DeptScrapstoreMain empdept={empdept} />
          </Box>
        </TabPanel>
      </Tabs>

    </Box >

  )
}

export default memo(CondemnationList)