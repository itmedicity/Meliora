import React, { Fragment, memo } from 'react'
import { Box } from '@mui/joy'
import { Paper, Tooltip, Typography } from '@mui/material'
import { Virtuoso } from 'react-virtuoso'
import { format } from 'date-fns'
import FeaturedPlayListTwoToneIcon from '@mui/icons-material/FeaturedPlayListTwoTone'
const FullyReceiveTableView = ({ disData, viewGrnDetails, company }) => {
  const capitalizeWords = str =>
    str
      ? str
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      : ''
  return (
    <Fragment>
      <Box
        variant="outlined"
        sx={{
          overflow: 'auto',
          flexWrap: 'wrap',
          width: '100%',
          '&::-webkit-scrollbar': { height: 8 }
        }}
      >
        <Paper elevation={3} sx={{ width: 1640 }}>
          {/* < Box display="flex" flexDirection="column" sx={{ mx: 0.5, overflow: 'auto' }}> */}
          <Box display="flex" justifyContent="space-between" padding={0.5} sx={{ bgcolor: '#41729F', color: 'white' }}>
            <Typography sx={{ width: 60, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>Sl.No</Typography>
            <Typography sx={{ width: 100, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>CRF No</Typography>
            <Typography sx={{ width: 80, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Order#</Typography>
            <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>PO Date</Typography>
            <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>
              PO to Supplier
            </Typography>
            <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Supplier</Typography>
            <Typography sx={{ width: 120, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Expected Date</Typography>
            <Typography sx={{ width: 80, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Store</Typography>
            <Typography sx={{ width: 80, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Details</Typography>
          </Box>
          <Virtuoso
            style={{ height: '73vh', width: '100%' }}
            data={disData}
            itemContent={(index, val) => (
              <React.Fragment key={index}>
                <Box display="flex" justifyContent="space-between" sx={{ borderBottom: '1px solid lightgrey' }}>
                  <Typography sx={{ width: 60, textAlign: 'center', fontSize: 12, my: 1 }}>{index + 1}</Typography>
                  <Typography
                    sx={{ width: 100, textAlign: 'left', fontSize: 12, my: 1 }}
                  >{`CRF/${company?.company_name}/${val?.req_slno}`}</Typography>
                  <Typography sx={{ width: 80, textAlign: 'left', fontSize: 12, my: 1 }}>{val.po_number}</Typography>
                  <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>
                    {format(new Date(val.po_date), 'dd-MM-yyyy hh:mm:ss a')}
                  </Typography>
                  <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>
                    {format(new Date(val.po_to_supplier_date), 'dd-MM-yyyy hh:mm:ss a')}
                  </Typography>
                  <Typography sx={{ width: 150, textAlign: 'left', fontSize: 11, my: 1 }}>
                    {capitalizeWords(val.supplier_name)}
                  </Typography>
                  <Typography sx={{ width: 120, textAlign: 'left', fontSize: 12, my: 1 }}>
                    {val.expected_delivery ? format(new Date(val.expected_delivery), 'dd-MM-yyyy') : 'Nil'}
                  </Typography>
                  <Typography sx={{ width: 80, textAlign: 'left', fontSize: 12, my: 1 }}>{val.main_store}</Typography>
                  <Box sx={{ width: 80, textAlign: 'center', cursor: 'pointer', display: 'flex' }}>
                    <Tooltip title="View Grn Details" placement="left">
                      <FeaturedPlayListTwoToneIcon
                        sx={{
                          mt: 0.6,
                          // fontSize: 'md',
                          color: '#0d47a1',
                          height: 20,
                          width: 20,
                          borderRadius: 2,
                          boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                          cursor: 'pointer',
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'scale(1.1)'
                          }
                        }}
                        onClick={() => viewGrnDetails(val.po_number, val.items)}
                      />
                    </Tooltip>
                  </Box>
                </Box>
              </React.Fragment>
            )}
          />
          {/* </Box> */}
        </Paper>
      </Box>
    </Fragment>
  )
}

export default memo(FullyReceiveTableView)
