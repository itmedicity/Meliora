import React, { memo, useCallback, useEffect, useState } from 'react'
import { Box, CssVarsProvider } from '@mui/joy'
import { axioslogin } from 'src/views/Axios/Axios'
import EditIcon from '@mui/icons-material/Edit'
import EditBillModal from './EditBillModal'

const AllBill = ({ billCount, setbillCount }) => {
  const [allBillData, setallBillData] = useState([])
  const [editModalOpen, seteditModalOpen] = useState(false)
  const [editModalFlag, seteditModalFlag] = useState(0)
  const [billData, setBillData] = useState([])

  const EditModal = useCallback(value => {
    setBillData(value)
    seteditModalFlag(1)
    seteditModalOpen(true)
  }, [])

  useEffect(() => {
    const getAllBills = async () => {
      const result = await axioslogin.get('/ItBillAdd/allBillView')
      const { success, data } = result.data
      if (data.length !== 0) {
        if (success === 2) {
          const arry = data?.map(val => {
            const obj = {
              bill_add_slno: val.bill_add_slno,
              bill_category: val.bill_category,
              bill_tariff: val.bill_tariff,
              bill_name: val.bill_name,
              it_bill_category_name: val.it_bill_category_name,
              it_sim_type_name: val.it_sim_type_name,
              bill_cug_status: val.bill_cug_status,
              bill_cug_simtype: val.bill_cug_simtype,
              it_bill_type_name: val.it_bill_type_name
            }
            return obj
          })
          setallBillData(arry)
        } else {
          setallBillData([])
        }
      }
    }
    getAllBills()
  }, [billCount])

  return (
    <Box>
      <CssVarsProvider>
        {editModalFlag === 1 ? (
          <EditBillModal
            openEditModal={editModalOpen}
            billData={billData}
            seteditModalFlag={seteditModalFlag}
            seteditModalOpen={seteditModalOpen}
            billCount={billCount}
            setbillCount={setbillCount}
          />
        ) : null}
      </CssVarsProvider>
      <Box sx={{ width: '100%', overflow: 'auto' }}>
        <Box sx={{ minWidth: 1300 }}>
          <Box sx={{ flex: 1, display: 'flex', bgcolor: '#868B8E', height: 30, pt: 0.5 }}>
            <Box sx={{ flex: 0.3, fontWeight: 600, color: 'white', pl: 3 }}>#</Box>
            <Box sx={{ flex: 1.2, fontWeight: 600, color: 'white' }}>Bill Type</Box>
            <Box sx={{ flex: 1.5, fontWeight: 600, color: 'white' }}>Category</Box>
            <Box sx={{ flex: 4, fontWeight: 600, color: 'white' }}>Bill Name</Box>
            <Box sx={{ flex: 1, fontWeight: 600, color: 'white' }}>Sim Type</Box>
            <Box sx={{ flex: 0.6, fontWeight: 600, color: 'white' }}>Tariff</Box>
          </Box>
          <Box sx={{ maxHeight: '60vh', overflow: 'auto', flex: 1 }}>
            {allBillData &&
              allBillData.map(val => {
                return (
                  <Box
                    key={val.bill_add_slno}
                    sx={{
                      flex: 1,
                      minHeight: 30,
                      maxHeight: 100,
                      bgcolor: '#E4E5E8',
                      borderRadius: 0,
                      display: 'flex',
                      mt: 0.5,
                      color: 'black'
                    }}
                  >
                    <Box
                      sx={{
                        flex: 0.3,
                        p: 0.5,
                        cursor: 'pointer',
                        mx: 1
                      }}
                    >
                      <EditIcon sx={{ height: 18 }} onClick={() => EditModal(val)} />
                    </Box>
                    <Box sx={{ flex: 1.2, pt: 0.5, fontSize: 14 }}>{val.it_bill_type_name}</Box>
                    <Box sx={{ flex: 1.5, pt: 0.5, fontSize: 14 }}>{val.it_bill_category_name}</Box>
                    <Box sx={{ flex: 4, pt: 0.5, fontSize: 14 }}>{val.bill_name}</Box>
                    <Box sx={{ flex: 1, pt: 0.5, fontSize: 14 }}>{val.it_sim_type_name}</Box>
                    <Box sx={{ flex: 0.6, pt: 0.5, pr: 0.3, fontSize: 14 }}>
                      {val.bill_tariff === 0
                        ? 'not given'
                        : val.bill_tariff === 1
                          ? 'Monthly'
                          : val.bill_tariff === 2
                            ? 'Quaterly'
                            : val.bill_tariff === 3
                              ? 'Yearly'
                              : val.bill_tariff === 4
                                ? 'Others'
                                : 'not given'}
                    </Box>
                  </Box>
                )
              })}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default memo(AllBill)
