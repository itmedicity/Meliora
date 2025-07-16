import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined'
import { Box, Table, Typography } from '@mui/joy'
import CustomToolTipForCRF from '../../ComonComponent/Components/CustomToolTipForCRF'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { useQuery, useQueryClient, } from '@tanstack/react-query'

import ReturnModal from './ReturnModal'
import { viewItemReturnDetails } from 'src/api/CommonApiCRF'
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone'
import ItemReturnViewModal from '../../ComonComponent/ApprovalComp/ItemReturnViewModal'

const StoreReceivedItemList = ({ storeReceived, empId, req_slno }) => {
  const queryClient = useQueryClient()
  const [combinedData, setCombinedData] = useState([])
  const [returnData, setReturnData] = useState([])
  const [returnModal, setReturnModal] = useState(false)
  const [returnFlag, setReturnFlag] = useState(0)
  const [notifyFlag, setNotifyFlag] = useState(0)
  const [notifyModal, setnotifyModal] = useState(false)
  const [modalData, setModalData] = useState([])

  const {
    data: retunDetails,
    isLoading: isReturnLoading,
    error: returnError
  } = useQuery({
    queryKey: ['viewItemReturn', req_slno],
    queryFn: () => viewItemReturnDetails(req_slno),
    enabled: req_slno !== null,
    staleTime: Infinity
  })
  const displayData = useMemo(() => retunDetails, [retunDetails])

  useEffect(() => {
    if (storeReceived && storeReceived.length > 0) {
      if (displayData && displayData.length > 0) {
        const newArray = storeReceived?.map(val => {
          const matchingItems = displayData?.filter(item => item.po_itm_slno === val.po_itm_slno)
          const latestItem = matchingItems?.reduce((latest, current) => {
            const latestReturnDate = new Date(latest?.return_date || 0)
            const currentReturnDate = new Date(current.return_date)

            if (currentReturnDate > latestReturnDate) {
              return current
            }
            const latestIssuedDate = new Date(latest?.issued_date || 0)
            const currentIssuedDate = new Date(current.issued_date)

            return currentReturnDate === latestReturnDate && currentIssuedDate > latestIssuedDate ? current : latest
          }, null)

          return {
            ...val,
            returnDetails: latestItem ? [latestItem] : []
          }
        })

        setCombinedData(newArray)
      } else {
        setCombinedData(storeReceived)
      }
    }
  }, [storeReceived, displayData])

  const receivedSave = useCallback(
    async val => {
      const { po_itm_slno, item_receive_status, return_status } = val
      if (item_receive_status !== 1) {
        infoNotify('Item Not Received Fully')
        return
      } else if (return_status === 1) {
        infoNotify('Item Not replaced From Store.')
        return
      } else {
        const patchdata = {
          user_received_status: 1,
          po_itm_slno: po_itm_slno
        }
        const updateStatus = async patchdata => {
          try {
            const result = await axioslogin.patch('/newCRFRegister/receiveReturn', patchdata)
            const { success, message } = result.data

            if (success === 1) {
              succesNotify(message)
              queryClient.invalidateQueries('getCrfItemDetails')
            } else {
              warningNotify(message)
            }
          } catch (error) {
            warningNotify('An error occurred while updating the status. Please try again.', error)
          }
        }
        updateStatus(patchdata)
      }
    },
    [queryClient]
  )

  const returnSave = useCallback(async val => {
    const { item_receive_status } = val
    if (item_receive_status !== 1) {
      warningNotify('Item Not Received Fully')
      return
    } else {
      setReturnFlag(1)
      setReturnData(val)
      setReturnModal(true)
    }
  }, [])

  const handleCloseReturn = useCallback(() => {
    setReturnFlag(0)
    setReturnData([])
    setReturnModal(false)
    setNotifyFlag(0)
    setnotifyModal(false)
    setModalData([])
  }, [])

  const [itemName, setitemName] = useState('')
  const viewReturnDetails = useCallback((details, itemName) => {
    setNotifyFlag(1)
    setnotifyModal(true)
    setModalData(details)
    setitemName(itemName)
  }, [])
  if (isReturnLoading) return <p>Loading...</p>
  if (returnError) return <p>Error occurred.</p>
  return (
    <Fragment>
      {returnFlag === 1 ? (
        <ReturnModal returnData={returnData} handleClose={handleCloseReturn} open={returnModal} empId={empId} />
      ) : null}
      {notifyFlag === 1 ? (
        <ItemReturnViewModal
          open={notifyModal}
          handleClose={handleCloseReturn}
          modalData={modalData}
          itemName={itemName}
        />
      ) : null}

      <Box sx={{ overflow: 'auto', flexWrap: 'wrap', px: 0.5 }}>
        <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14 }}>
          Store Received Items
        </Typography>
        <Table aria-label="table with sticky header" borderAxis="both" padding={'none'} stickyHeader size="sm">
          <thead style={{ height: 4 }} size="small">
            <tr style={{ height: 4 }} size="small">
              <th
                size="sm"
                style={{
                  borderRadius: 0,
                  width: 50,
                  textAlign: 'center',
                  backgroundColor: '#e3f2fd',
                  fontSize: 13
                }}
              >
                Sl.No.
              </th>
              <th size="sm" style={{ width: 250, backgroundColor: '#e3f2fd', fontSize: 13, ml: 2 }}>
                Item Description
              </th>
              <th size="sm" style={{ width: 40, textAlign: 'center', backgroundColor: '#e3f2fd', fontSize: 13 }}>
                Qty
              </th>
              <th size="sm" style={{ width: 70, textAlign: 'center', backgroundColor: '#e3f2fd', fontSize: 13 }}>
                Received Qty(Store)
              </th>
              <th
                size="sm"
                style={{
                  borderRadius: 0,
                  width: 70,
                  textAlign: 'center',
                  backgroundColor: '#e3f2fd',
                  fontSize: 13
                }}
              >
                Received Status(Store)
              </th>
              <th
                size="sm"
                style={{
                  borderRadius: 0,
                  width: 70,
                  textAlign: 'center',
                  backgroundColor: '#e3f2fd',
                  fontSize: 13
                }}
              >
                Receive/Return(User)
              </th>
              <th
                size="sm"
                style={{
                  borderRadius: 0,
                  width: 70,
                  textAlign: 'center',
                  backgroundColor: '#e3f2fd',
                  fontSize: 13
                }}
              ></th>
            </tr>
          </thead>
          <tbody>
            {combinedData?.map((item, ind) => (
              <tr key={item.po_itm_slno}>
                <td style={{ textAlign: 'center', fontSize: 13 }}>{ind + 1}</td>
                <td style={{ fontSize: 12, pl: 1 }}>{item.item_name}</td>
                <td style={{ textAlign: 'center', fontSize: 13, fontWeight: 650 }}>{item.item_qty}</td>
                <td
                  style={{
                    textAlign: 'center',
                    color: item.received_qnty === item.item_qty ? '#59981A' : '#e65100',
                    fontWeight: 650
                  }}
                >
                  {item.received_qnty}
                </td>
                <td
                  style={{
                    textAlign: 'center',
                    color:
                      item.item_receive_status === 1
                        ? '#59981A'
                        : item.item_receive_status === 0
                          ? '#e65100'
                          : '#0288d1'
                  }}
                >
                  {item.item_receive_status === 1
                    ? 'Received'
                    : item.item_receive_status === 0
                      ? 'Partially'
                      : 'Pending'}
                </td>
                <td
                  style={{
                    color:
                      item.user_received_status === 1
                        ? '#59981A'
                        : item.user_received_status === 0
                          ? '#e65100'
                          : '#0288d1'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography sx={{ fontSize: 13, pr: 3 }}>
                      {item.user_received_status === 1
                        ? 'Received'
                        : item.user_received_status === 0
                          ? 'Return'
                          : 'Not Updated'}
                    </Typography>
                    {item.returnDetails && item.returnDetails.length > 0 ? (
                      <>
                        {item.returnDetails[0].return_status === 0 && item.user_received_status === 0 ? (
                          <CustomToolTipForCRF title=" Store Acknowledgement " placement="top">
                            <NotificationsActiveTwoToneIcon
                              sx={{
                                cursor: 'pointer',
                                color: '#9e9d24',
                                width: 22,
                                height: 22,
                                animation: 'blink 1s infinite',
                                '@keyframes blink': {
                                  '0%': { opacity: 1 },
                                  '50%': { opacity: 0 },
                                  '100%': { opacity: 1 }
                                }
                              }}
                              onClick={() => viewReturnDetails(item.returnDetails, item.item_name)}
                            />
                          </CustomToolTipForCRF>
                        ) : null}
                      </>
                    ) : null}
                  </Box>
                </td>
                <td style={{ justifyContent: 'center', fontSize: 13, display: 'flex' }}>
                  <Box sx={{ pr: 2 }}>
                    {item.user_received_status === 1 ? (
                      <CustomToolTipForCRF title="Received" placement="top">
                        <ThumbUpOutlinedIcon
                          sx={{
                            fontSize: 'lg',
                            color: 'grey',
                            height: 22,
                            width: 22,
                            borderRadius: 2,
                            boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer'
                          }}
                        />
                      </CustomToolTipForCRF>
                    ) : (
                      <CustomToolTipForCRF title="Receive" placement="top">
                        <ThumbUpOutlinedIcon
                          sx={{
                            fontSize: 'lg',
                            color: 'green',
                            height: 22,
                            width: 22,
                            borderRadius: 2,
                            boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            '&:hover': {
                              transform: 'scale(1.1)'
                            }
                          }}
                          onClick={() => receivedSave(item)}
                        />
                      </CustomToolTipForCRF>
                    )}
                  </Box>

                  <Box sx={{ pl: 2 }}>
                    {item.user_received_status === 0 ? (
                      <CustomToolTipForCRF title="Returned to Store" placement="top">
                        <RedoOutlinedIcon
                          sx={{
                            fontSize: 'lg',
                            color: 'grey',
                            height: 22,
                            width: 22,
                            borderRadius: 2,
                            boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer'
                          }}
                        />
                      </CustomToolTipForCRF>
                    ) : (
                      <CustomToolTipForCRF title="Return" placement="top">
                        <RedoOutlinedIcon
                          sx={{
                            fontSize: 'lg',
                            color: 'red',
                            height: 22,
                            width: 22,
                            borderRadius: 2,
                            boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            '&:hover': {
                              transform: 'scale(1.1)'
                            }
                          }}
                          onClick={() => returnSave(item)}
                        />
                      </CustomToolTipForCRF>
                    )}
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </Fragment>
  )
}

export default memo(StoreReceivedItemList)
