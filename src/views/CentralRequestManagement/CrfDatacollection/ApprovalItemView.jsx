import { Box, Table, Typography } from '@mui/joy'
import React, { memo } from 'react'
import CustomToolTipForCRF from '../ComonComponent/Components/CustomToolTipForCRF'

const ApprovalItemView = ({ approveTableData }) => {
  return (
    <Box sx={{ flexWrap: 'wrap', my: 0.5 }}>
      {approveTableData.length !== 0 ? (
        <Box sx={{}}>
          <Typography sx={{ fontWeight: 'bold', ml: 1, my: 0.5, color: '#145DA0', fontSize: 14 }}>
            Approved Items
          </Typography>
          <Box sx={{ flexWrap: 'wrap', px: 0.5, pb: 0.5 }}>
            <Table
              aria-label="table with sticky header"
              borderAxis="both"
              padding={'none'}
              stickyHeader
              size="sm"
            >
              <thead style={{ height: 4 }} size="small">
                <tr style={{ height: 4 }} size="small">
                  <th
                    size="sm"
                    style={{ width: 50, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                  >
                    Sl.No
                  </th>
                  <th size="sm" style={{ width: 300, backgroundColor: '#e3f2fd' }}>
                    &nbsp;&nbsp;Description
                  </th>
                  <th size="sm" style={{ width: 200, backgroundColor: '#e3f2fd' }}>
                    &nbsp;&nbsp;Brand
                  </th>
                  <th
                    size="sm"
                    style={{ width: 80, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                  >
                    Qty
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
                    style={{ width: 80, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                  >
                    Price
                  </th>
                  <th
                    size="sm"
                    style={{ width: 80, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                  >
                    Approx.Cost
                  </th>
                  <th
                    size="sm"
                    style={{
                      borderRadius: 0,
                      width: 150,
                      textAlign: 'center',
                      backgroundColor: '#e3f2fd',
                    }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {approveTableData?.map((item, ind) => {
                  const rowColor =
                    item.item_status_approved === 1
                      ? '#59981A'
                      : item.item_status_approved === 2
                      ? '#D13120'
                      : item.item_status_approved === 3
                      ? '#DBA40E'
                      : item.item_status_approved === 4
                      ? '#009688'
                      : null

                  return (
                    <CustomToolTipForCRF
                      key={item.req_detl_slno}
                      placement="top"
                      title={
                        item.po_item_status === 1
                          ? 'PO Generated'
                          : item.item_status_approved === 1
                          ? 'Approved'
                          : item.item_status_approved === 2
                          ? `Rejected by ${item.reject_remarks}`
                          : item.item_status_approved === 3
                          ? `On-Hold by ${item.hold_remarks}`
                          : item.item_status_approved === 4
                          ? `Internally Arranged By ${item.internal_remarks}`
                          : ''
                      }
                    >
                      <tr style={{ cursor: 'pointer' }}>
                        <td style={{ textAlign: 'center' }}>{ind + 1}</td>
                        <td style={{ fontSize: 13 }}>&nbsp;{item.approve_item_desc}</td>
                        <td>
                          &nbsp;
                          {item.approve_item_brand === '' ? 'Not Given' : item.approve_item_brand}
                        </td>
                        <td style={{ textAlign: 'center' }}>{item.item_qnty_approved}</td>
                        <td style={{ textAlign: 'center' }}>
                          {item.approve_item_unit === 0 ? 'Not Given' : item.apprv_uom}
                        </td>
                        <td>
                          &nbsp;
                          {item.approve_item_specification === ''
                            ? 'Not Given'
                            : item.approve_item_specification}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {item.approve_item_unit_price === 0
                            ? 'Not Given'
                            : item.approve_item_unit_price}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {item.approve_aprox_cost === 0 ? 'Not Given' : item.approve_aprox_cost}
                        </td>
                        <td style={{ textAlign: 'center', color: rowColor }}>
                          {item.po_item_status === 1
                            ? 'PO Generated'
                            : item.item_status_approved === 1
                            ? 'Approved'
                            : item.item_status_approved === 2
                            ? 'Rejected '
                            : item.item_status_approved === 3
                            ? 'On-Hold '
                            : item.item_status_approved === 4
                            ? 'Internally Arranged'
                            : null}
                        </td>
                      </tr>
                    </CustomToolTipForCRF>
                  )
                })}
              </tbody>
            </Table>
          </Box>
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
  )
}

export default memo(ApprovalItemView)
