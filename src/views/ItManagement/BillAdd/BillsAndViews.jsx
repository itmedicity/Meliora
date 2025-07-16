import { Paper } from '@mui/material'
import React, { useCallback, useState } from 'react'
import AllBill from './AllBill'
import BillAddModal from './BillAddModal'
import { Box, Button, CssVarsProvider, Tab, TabList, TabPanel, Tabs, tabClasses } from '@mui/joy'
import OtherBillViews from './OtherBillViews'
import { memo } from 'react'

const BillsAndViews = ({ billCount, setbillCount }) => {
  const [addModalOpen, setaddModalOpen] = useState(false)
  const [AddModalFlag, setAddModalFlag] = useState(0)

  const addModal = useCallback(() => {
    setAddModalFlag(1)
    setaddModalOpen(true)
  }, [])

  return (
    <Box
      sx={{
        mt: 0.5,
        borderRadius: 0,
        p: 0.5,
        boxShadow: '0px 0px 1px',
        height: '80vh',
        bgcolor: '#E3E7F1'
      }}
    >
      <CssVarsProvider>
        {AddModalFlag === 1 ? (
          <BillAddModal
            open={addModalOpen}
            billCount={billCount}
            setbillCount={setbillCount}
            setAddModalFlag={setAddModalFlag}
            setaddModalOpen={setaddModalOpen}
          />
        ) : null}
      </CssVarsProvider>
      <Box sx={{ bgcolor: '#F8F8F8', p: 1, maxHeight: '79vh', flex: 1 }}>
        <Box sx={{ display: 'flex' }}>
          <CssVarsProvider>
            <Button sx={{ borderRadius: 0, bgcolor: '#52688F', height: 8, boxShadow: 10 }} onClick={addModal}>
              + Add New Bill
            </Button>
          </CssVarsProvider>
        </Box>
        <Tabs aria-label="Basic tabs" defaultValue={0}>
          <TabList
            sx={{
              bgcolor: 'background.level1',
              borderBottom: 0,
              [`& .${tabClasses.root}[aria-selected="true"]`]: {
                boxShadow: 'sm',
                borderBottom: 0,
                borderColor: 'white',
                color: 'white',
                bgcolor: '#36454F'
              }
            }}
          >
            <Tab sx={{ flex: 1 }}>Recurring Bills</Tab>
            <Tab sx={{ flex: 1 }}>Other Bills</Tab>
          </TabList>
          <TabPanel value={0} sx={{ p: 0 }}>
            <AllBill billCount={billCount} setbillCount={setbillCount} />
          </TabPanel>
          <TabPanel value={1} sx={{ p: 0 }}>
            <OtherBillViews billCount={billCount} setbillCount={setbillCount} />
          </TabPanel>
        </Tabs>
      </Box>
    </Box>
  )
}

export default memo(BillsAndViews)
