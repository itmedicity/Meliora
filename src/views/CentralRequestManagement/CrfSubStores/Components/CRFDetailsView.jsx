import { Box, CssVarsProvider, Modal, ModalClose, ModalDialog, Table, Typography } from '@mui/joy'
import { keyframes, Paper } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import ErrorIcon from '@mui/icons-material/Error'
import { format } from 'date-fns'

const CRFDetailsView = ({ open, handleClose, crfData, company }) => {
  const { req_slno, actual_requirement, needed, expected_date, emergency_flag, emer_type_name } =
    crfData[0]
  const capitalizeWords = str =>
    str
      ? str
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      : ''
  const blinkAnimation = keyframes`0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; }`
  const [reqItems, setReqItems] = useState([])
  const [apprvdItems, setApprvdItems] = useState([])

  useEffect(() => {
    if (crfData.length !== 0) {
      const xx = crfData?.filter(val => val.item_add_higher !== 1 && val.item_status === 1)
      const req = xx?.map(val => {
        return {
          item_desc: val.approve_item_desc,
          item_brand: val.approve_item_brand,
          item_unit: val.approve_item_unit,
          uom_name: val.Req_UnitName,
          item_qnty: val.item_qnty,
          item_specification: val.item_specification,
          aprox_cost: val.aprox_cost,
          item_unit_price: val.item_unit_price,
        }
      })
      setReqItems(req)
      const yy = crfData?.filter(val => val.approve_item_status === 1)
      const apprv = yy?.map(val => {
        return {
          item_desc: val.approve_item_desc,
          item_brand: val.approve_item_brand,
          item_unit: val.approve_item_unit,
          uom_name: val.AP_UnitName,
          item_qnty: val.item_qnty_approved,
          item_specification: val.approve_item_specification,
          aprox_cost: val.approve_aprox_cost,
          item_unit_price: val.approve_item_unit_price,
        }
      })
      setApprvdItems(apprv)
    }
  }, [crfData])
  return (
    <Box>
      <CssVarsProvider>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={handleClose}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <ModalDialog variant="outlined">
            <ModalClose
              variant="outlined"
              sx={{
                m: 1,
                top: 'calc(-1/4 * var(--IconButton-size))',
                right: 'calc(-1/4 * var(--IconButton-size))',
                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                borderRadius: '50%',
                bgcolor: 'background.body',
                color: '#bf360c',
                height: 35,
                width: 35,
              }}
            />
            <Box sx={{ minWidth: '80vw', minHeight: '62vh', maxHeight: '85vh', overflowY: 'auto' }}>
              <Box sx={{ mx: 0.5 }}>
                <Typography sx={{ fontWeight: 550, fontFamily: 'system-ui', fontSize: 17 }}>
                  CRF Details
                </Typography>
              </Box>
              <Paper variant="outlined" square sx={{ flexWrap: 'wrap' }}>
                <Box
                  sx={{
                    padding: 1,
                    borderRadius: 2,
                    backgroundColor: '#ffffff',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', marginBottom: 0.5, color: '#145DA0', fontSize: 14 }}
                  >
                    CRF/{company?.company_name}/ {req_slno}
                  </Typography>
                  <Box sx={{ display: 'flex' }}>
                    {emergency_flag === 1 ? (
                      <Box sx={{ display: 'flex', flex: 0.5 }}>
                        <Box sx={{ pl: 0.5 }}>
                          <ErrorIcon
                            sx={{
                              height: 15,
                              width: 15,
                              color: '#d50000',
                              animation: `${blinkAnimation} 1s infinite`,
                            }}
                          />
                        </Box>
                        <Typography
                          sx={{ pl: 0.5, fontSize: 14, color: '#b71c1c', fontWeight: 550, pt: 0.5 }}
                        >
                          {emer_type_name !== null ? capitalizeWords(emer_type_name) : null}
                        </Typography>
                        {/* <Typography sx={{ fontSize: 12, color: '#b71c1c', pl: 1 }}>
                                                    {emergeny_remarks !== null ? capitalizeWords(emergeny_remarks) : null}</Typography> */}
                      </Box>
                    ) : null}
                    <Box sx={{ display: 'flex', pt: 0.5, justifyContent: 'center' }}>
                      <Box>
                        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                          Expected Date :
                        </Typography>
                      </Box>
                      <Box sx={{ pl: 0.5, pt: 0.1 }}>
                        <Typography sx={{ fontSize: 13 }}>
                          {format(new Date(expected_date), 'dd-MM-yyyy')}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, flex: 0.3, pt: 1 }}>
                      Purpose
                    </Typography>
                    <Typography sx={{ pt: 0.7 }}> :&nbsp;</Typography>
                    <Box sx={{ pt: 0.5, flex: 2, pl: 0.3 }}>
                      <Typography sx={{ fontSize: 13, pt: 0.5, pr: 1 }}>
                        {actual_requirement === null ? 'nil' : capitalizeWords(actual_requirement)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, flex: 0.3, pt: 1 }}>
                      Justfication
                    </Typography>
                    <Typography sx={{ pt: 0.7 }}> :&nbsp;</Typography>
                    <Box sx={{ pt: 0.5, flex: 2, pl: 0.3 }}>
                      <Typography sx={{ fontSize: 13, pt: 0.5, pr: 1 }}>
                        {needed === null ? 'nil' : capitalizeWords(needed)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
              <Box sx={{ overflow: 'auto', flexWrap: 'wrap' }}>
                <Typography
                  sx={{ fontWeight: 'bold', mx: 1, pb: 0.5, color: '#145DA0', fontSize: 14 }}
                >
                  Requested Items
                </Typography>
                <Table
                  aria-label="table with sticky header"
                  borderAxis="both"
                  padding={'none'}
                  stickyHeader
                  size="sm"
                >
                  <thead>
                    <tr>
                      <th
                        size="sm"
                        style={{
                          borderRadius: 0,
                          width: 50,
                          textAlign: 'center',
                          backgroundColor: '#e3f2fd',
                        }}
                      >
                        Sl.No
                      </th>
                      <th size="sm" style={{ width: 300, backgroundColor: '#e3f2fd' }}>
                        &nbsp;&nbsp;Description
                      </th>
                      <th size="sm" style={{ width: 100, backgroundColor: '#e3f2fd' }}>
                        &nbsp;&nbsp;Brand
                      </th>
                      <th
                        size="sm"
                        style={{ width: 80, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                      >
                        Qnty
                      </th>
                      <th
                        size="sm"
                        style={{ width: 80, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                      >
                        UOM
                      </th>
                      <th
                        size="sm"
                        style={{ width: 350, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                      >
                        Specification
                      </th>
                      <th
                        size="sm"
                        style={{ width: 100, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                      >
                        Price
                      </th>
                      <th
                        size="sm"
                        style={{
                          borderRadius: 0,
                          width: 100,
                          textAlign: 'center',
                          backgroundColor: '#e3f2fd',
                        }}
                      >
                        Approx.cost
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reqItems.map((item, ind) => (
                      <tr key={ind}>
                        <td style={{ textAlign: 'center' }}>{ind + 1}</td>
                        <td style={{ fontSize: 13 }}>&nbsp;{item.item_desc}</td>
                        <td style={{}}>&nbsp;{item.item_brand}</td>
                        <td style={{ textAlign: 'center' }}>{item.item_qnty}</td>
                        <td style={{ textAlign: 'center' }}>
                          {item.item_unit === 0 ? 'Not Given' : item.uom_name}
                        </td>
                        <td style={{}}>&nbsp;{item.item_specification}</td>
                        <td style={{ textAlign: 'center' }}>
                          {item.item_unit_price === 0 ? 'Not Given' : item.item_unit_price}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {item.aprox_cost === 0 ? 'Not Given' : item.aprox_cost}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Box>
              {apprvdItems.length !== 0 ? (
                <Box sx={{ overflow: 'auto', flexWrap: 'wrap' }}>
                  <Typography
                    sx={{ fontWeight: 'bold', mx: 1, pb: 0.5, color: '#145DA0', fontSize: 14 }}
                  >
                    Approved Items
                  </Typography>
                  <Table
                    aria-label="table with sticky header"
                    borderAxis="both"
                    padding={'none'}
                    stickyHeader
                    size="sm"
                  >
                    <thead>
                      <tr>
                        <th
                          size="sm"
                          style={{
                            borderRadius: 0,
                            width: 50,
                            textAlign: 'center',
                            backgroundColor: '#e3f2fd',
                          }}
                        >
                          Sl.No
                        </th>
                        <th size="sm" style={{ width: 300, backgroundColor: '#e3f2fd' }}>
                          &nbsp;&nbsp;Description
                        </th>
                        <th size="sm" style={{ width: 100, backgroundColor: '#e3f2fd' }}>
                          &nbsp;&nbsp;Brand
                        </th>
                        <th
                          size="sm"
                          style={{ width: 80, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                        >
                          Qnty
                        </th>
                        <th
                          size="sm"
                          style={{ width: 80, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                        >
                          UOM
                        </th>
                        <th
                          size="sm"
                          style={{ width: 350, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                        >
                          Specification
                        </th>
                        <th
                          size="sm"
                          style={{ width: 100, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                        >
                          Price
                        </th>
                        <th
                          size="sm"
                          style={{
                            borderRadius: 0,
                            width: 100,
                            textAlign: 'center',
                            backgroundColor: '#e3f2fd',
                          }}
                        >
                          Approx.cost
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {apprvdItems.map((item, ind) => (
                        <tr key={ind}>
                          <td style={{ textAlign: 'center' }}>{ind + 1}</td>
                          <td style={{ fontSize: 13 }}>&nbsp;{item.item_desc}</td>
                          <td style={{}}>&nbsp;{item.item_brand}</td>
                          <td style={{ textAlign: 'center' }}>{item.item_qnty}</td>
                          <td style={{ textAlign: 'center' }}>
                            {item.item_unit === 0 ? 'Not Given' : item.uom_name}
                          </td>
                          <td style={{}}>&nbsp;{item.item_specification}</td>
                          <td style={{ textAlign: 'center' }}>
                            {item.item_unit_price === 0 ? 'Not Given' : item.item_unit_price}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            {item.aprox_cost === 0 ? 'Not Given' : item.aprox_cost}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: 25,
                    opacity: 0.5,
                    pt: 10,
                    color: 'grey',
                  }}
                >
                  No items Approved
                </Box>
              )}
            </Box>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Box>
  )
}
export default memo(CRFDetailsView)
