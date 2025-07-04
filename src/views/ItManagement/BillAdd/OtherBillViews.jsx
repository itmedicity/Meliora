import { Box, CssVarsProvider } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import EditIcon from '@mui/icons-material/Edit'
import EditingOtherBillModal from './EditingOtherBillModal'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
const OtherBillViews = ({ billCount, setbillCount }) => {
  const [OtherBillData, setOtherBillData] = useState([])
  const [editOpen, seteditOpen] = useState(false)
  const [editFlag, seteditFlag] = useState(0)
  const [billDataother, setBillDataother] = useState([])
  const [filezUrls, setFilezUrls] = useState([])

  const EditModal = useCallback(value => {
    const { other_bill_slno } = value
    const getbillsFile = async () => {
      const result = await axioslogin.get(`/ItImageUpload/uploadFile/getOtherBillImages/${other_bill_slno}`)
      const { success } = result.data
      if (success === 1) {
        const data = result.data
        const fileNames = data.data
        const fileUrls = fileNames.map(fileName => {
          return `${PUBLIC_NAS_FOLDER}/Bills/OtherBill/${other_bill_slno}/${fileName}`
        })
        setFilezUrls(fileUrls)
      } else {
        setFilezUrls([])
      }
    }
    getbillsFile(other_bill_slno)
    setBillDataother(value)
    seteditFlag(1)
    seteditOpen(true)
  }, [])

  useEffect(() => {
    const getOtherBills = async () => {
      const result = await axioslogin.get('/ItBillAdd/otherBillView')
      const { success, data } = result.data
      if (data.length !== 0) {
        if (success === 2) {
          const arry = data?.map(val => {
            const obj = {
              other_bill_slno: val.other_bill_slno,
              bill_category: val.bill_category,
              bill_amount: val.bill_amount,
              bill_number: val.bill_number,
              bill_name: val.bill_name,
              it_bill_category_name: val.it_bill_category_name,
              bill_date: val.bill_date,
              bill_due_date: val.bill_due_date,
              bill_paid_date: val.bill_paid_date,
              payed_status: val.payed_status,
              bill_description: val.bill_description,
              am_item_map_slno: val.am_item_map_slno,
              it_supplier_name: val.it_supplier_name,
              supplier_details: val.supplier_details,
              file_upload_status: val.file_upload_status
            }
            return obj
          })
          setOtherBillData(arry)
        } else {
          setOtherBillData([])
        }
      }
    }
    getOtherBills()
  }, [billCount])

  return (
    <Box>
      <CssVarsProvider>
        {editFlag === 1 ? (
          <EditingOtherBillModal
            editOpen={editOpen}
            filezUrls={filezUrls}
            billDataother={billDataother}
            seteditOpen={seteditOpen}
            seteditFlag={seteditFlag}
            billCount={billCount}
            setbillCount={setbillCount}
          />
        ) : null}
      </CssVarsProvider>
      <Box sx={{ flex: 1, display: 'flex', bgcolor: '#868B8E', height: 30, pt: 0.5 }}>
        <Box sx={{ flex: 0.5, fontWeight: 600, color: 'white', px: 2 }}>#</Box>
        <Box sx={{ flex: 1, fontWeight: 600, color: 'white' }}>Category</Box>
        <Box sx={{ flex: 2, fontWeight: 600, color: 'white' }}>Supplier Name</Box>
        <Box sx={{ flex: 3, fontWeight: 600, color: 'white' }}>Bill Name</Box>
        <Box sx={{ flex: 3, fontWeight: 600, color: 'white' }}>Description</Box>
      </Box>
      <Box sx={{ maxHeight: '63vh', overflow: 'auto' }}>
        <Box>
          {OtherBillData &&
            OtherBillData.map(val => {
              return (
                <Paper
                  key={val.other_bill_slno}
                  sx={{
                    minHeight: 33,
                    maxHeight: 150,
                    bgcolor: '#E4E5E8',
                    borderRadius: 0,
                    display: 'flex',
                    mt: 0.5,
                    color: 'black'
                  }}
                >
                  <Box
                    sx={{
                      flex: 0.6,
                      px: 1,
                      pt: 0.5,
                      cursor: 'pointer'
                    }}
                  >
                    <EditIcon sx={{ height: 18 }} onClick={() => EditModal(val)} />
                  </Box>
                  <Box sx={{ flex: 1, pt: 0.5, fontSize: 14, pr: 0.5 }}>{val.it_bill_category_name}</Box>
                  <Box sx={{ flex: 2, pt: 0.5, fontSize: 14, pr: 0.5 }}>{val.it_supplier_name}</Box>
                  <Box sx={{ flex: 3, pt: 0.5, fontSize: 14, pr: 0.5 }}>{val.bill_name}</Box>
                  <Box sx={{ flex: 3, pt: 0.5, fontSize: 14, pr: 0.5 }}>{val.bill_description}</Box>
                </Paper>
              )
            })}
        </Box>
      </Box>
    </Box>
  )
}

export default memo(OtherBillViews)
