import { Box, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { format } from 'date-fns'
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CustomCloseIconCmp from 'src/views/CentralRequestManagement/ComonComponent/Components/CustomCloseIconCmp'
import CRFReqItemDetails from '../CRFReqItemDetails'

const StoreAckTableView = ({ ackFlag, disData, setAckFlag, setFlag, companyData }) => {
  const [reqItems, setReqItems] = useState([])
  const [modalopen, setModalOpen] = useState(false)
  const [modFlag, setModFlag] = useState(0)
  const { company_name } = companyData

  const backtoHome = useCallback(() => {
    setFlag(0)
    setAckFlag(0)
  }, [setFlag, setAckFlag])

  const viewItemDetails = useCallback(req_slno => {
    const getPOItems = async () => {
      try {
        const result = await axioslogin.get(`/newCRFStore/storeReceivedItem/${req_slno}`)
        const { success, data } = result.data
        if (success === 1) {
          setReqItems(data)
          setModalOpen(true)
          setModFlag(1)
        } else {
          setReqItems([])
          setModalOpen(false)
          setModFlag(0)
        }
      } catch (error) {
        warningNotify('Error fetching item details:', error)
        setReqItems([])
        setModalOpen(false)
        setModFlag(0)
      }
    }
    getPOItems()
  }, [])

  const handleClose = useCallback(() => {
    setModalOpen(false)
    setModFlag(0)
  }, [setModalOpen])

  return (
    <Fragment>
      {modFlag === 1 ? <CRFReqItemDetails handleClose={handleClose} open={modalopen} reqItems={reqItems} /> : null}
      <Box sx={{ height: window.innerHeight - 160, flexWrap: 'wrap', bgcolor: 'white' }}>
        <Paper variant="outlined" sx={{ bgcolor: 'white', pt: 0.5, height: 92 }}>
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                flex: 1,
                fontSize: 20,
                pt: 0.8,
                pr: 1
              }}
            >
              <CustomCloseIconCmp handleChange={backtoHome} />
            </Box>
          </Box>
          <Box sx={{ bgcolor: 'white', pt: 0.5, overflow: 'auto' }}>
            {disData.length !== 0 ? (
              <Box sx={{ width: '100%' }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  sx={{
                    bgcolor: '#41729F',
                    flexWrap: 'nowrap',
                    py: 0.5,
                    position: 'sticky',
                    top: 0,
                    zIndex: 1
                  }}
                >
                  <Typography
                    sx={{
                      width: 50,
                      textAlign: 'center',
                      fontWeight: 550,
                      fontSize: 12,
                      color: 'white'
                    }}
                  >
                    Sl.No
                  </Typography>
                  <Typography
                    sx={{
                      width: 80,
                      textAlign: 'left',
                      fontWeight: 550,
                      fontSize: 12,
                      color: 'white'
                    }}
                  >
                    Req.No
                  </Typography>
                  <Typography
                    sx={{
                      width: 200,
                      textAlign: 'left',
                      fontWeight: 550,
                      fontSize: 12,
                      color: 'white'
                    }}
                  >
                    Req.Dpt
                  </Typography>
                  <Typography
                    sx={{
                      width: 150,
                      textAlign: 'left',
                      fontWeight: 550,
                      fontSize: 12,
                      color: 'white'
                    }}
                  >
                    Store
                  </Typography>
                  {ackFlag === 1 ? (
                    <>
                      <Typography
                        sx={{
                          width: 150,
                          textAlign: 'left',
                          fontWeight: 550,
                          fontSize: 12,
                          color: 'white'
                        }}
                      >
                        Remarks
                      </Typography>
                      <Typography
                        sx={{
                          width: 150,
                          textAlign: 'left',
                          fontWeight: 550,
                          fontSize: 12,
                          color: 'white'
                        }}
                      >
                        Ack Date
                      </Typography>
                      <Typography
                        sx={{
                          width: 150,
                          textAlign: 'left',
                          fontWeight: 550,
                          fontSize: 12,
                          color: 'white'
                        }}
                      >
                        User
                      </Typography>
                      <Typography
                        sx={{
                          width: 100,
                          textAlign: 'left',
                          fontWeight: 550,
                          fontSize: 12,
                          color: 'white'
                        }}
                      >
                        Received or Not
                      </Typography>
                    </>
                  ) : ackFlag === 2 ? (
                    <>
                      <Typography
                        sx={{
                          width: 150,
                          textAlign: 'left',
                          fontWeight: 550,
                          fontSize: 12,
                          color: 'white'
                        }}
                      >
                        Remarks
                      </Typography>
                      <Typography
                        sx={{
                          width: 150,
                          textAlign: 'left',
                          fontWeight: 550,
                          fontSize: 12,
                          color: 'white'
                        }}
                      >
                        Received Date
                      </Typography>
                      <Typography
                        sx={{
                          width: 150,
                          textAlign: 'left',
                          fontWeight: 550,
                          fontSize: 12,
                          color: 'white'
                        }}
                      >
                        User
                      </Typography>
                    </>
                  ) : null}
                  <Typography
                    sx={{
                      width: 80,
                      textAlign: 'center',
                      fontWeight: 550,
                      fontSize: 12,
                      color: 'white'
                    }}
                  ></Typography>
                </Box>
                <Virtuoso
                  style={{ height: window.innerHeight - 282, width: '100%' }}
                  data={disData}
                  itemContent={(index, val) => (
                    <React.Fragment key={index}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        sx={{ borderBottom: '1px solid lightgrey', flexWrap: 'nowrap' }}
                      >
                        <Typography sx={{ width: 50, textAlign: 'center', fontSize: 12, my: 1 }}>
                          {index + 1}
                        </Typography>
                        <Typography sx={{ width: 80, textAlign: 'left', fontSize: 12, my: 1 }}>
                          CRF/{company_name}/ + {val.req_slno}
                        </Typography>
                        <Typography
                          sx={{
                            width: 200,
                            textAlign: 'left',
                            fontSize: 12,
                            my: 1,
                            textTransform: 'capitalize'
                          }}
                        >
                          {val.req_deptsec.toLowerCase()}
                        </Typography>
                        <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>
                          {val.sub_store_name}
                        </Typography>
                        {ackFlag === 1 ? (
                          <>
                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>
                              {val.substore_remarks}
                            </Typography>
                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>
                              {format(new Date(val.substore_ack_date), 'dd-MM-yyyy hh:mm:ss a')}
                            </Typography>
                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>
                              {val.store_user}
                            </Typography>
                            <Typography sx={{ width: 100, textAlign: 'left', fontSize: 12, my: 1 }}>
                              {val.received_status === 1 ? 'Received' : 'Not Received'}
                            </Typography>
                          </>
                        ) : ackFlag === 2 ? (
                          <>
                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>
                              {val.received_user_remarks}
                            </Typography>
                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>
                              {format(new Date(val.received_date), 'dd-MM-yyyy hh:mm:ss a')}
                            </Typography>
                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>
                              {val.receive_user}
                            </Typography>
                          </>
                        ) : null}
                        <Box sx={{ width: 80, textAlign: 'center', pt: 0.5, cursor: 'pointer', mr: 2 }}>
                          <Tooltip title="Item Details" placement="left">
                            <CheckCircleTwoToneIcon
                              sx={{
                                fontSize: 'lg',
                                color: '#145DA0',
                                height: 25,
                                width: 30,
                                borderRadius: 2,
                                boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                  transform: 'scale(1.1)'
                                }
                              }}
                              onClick={() => viewItemDetails(val.req_slno)}
                            />
                          </Tooltip>
                        </Box>
                      </Box>
                    </React.Fragment>
                  )}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: 30,
                  opacity: 0.5,
                  pt: 10,
                  color: 'grey'
                }}
              >
                No Report Found
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </Fragment>
  )
}

export default memo(StoreAckTableView)
