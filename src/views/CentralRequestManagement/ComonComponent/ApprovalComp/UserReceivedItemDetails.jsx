import { Box, Table, Typography } from '@mui/joy'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getStoreReceivedItemDetails, viewItemReturnDetails } from 'src/api/CommonApiCRF'
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned'
import ItemReturnViewModal from './ItemReturnViewModal'
import { infoNotify } from 'src/views/Common/CommonCode'
import CustomToolTipForCRF from '../Components/CustomToolTipForCRF'

const UserReceivedItemDetails = ({ req_slno }) => {
  const [combinedData, setCombinedData] = useState([])
  const [returnModal, setReturnModal] = useState(false)
  const [returnFlag, setReturnFlag] = useState(0)
  const [modalData, setModalData] = useState([])

  const {
    data: storeItems,
    isLoading: isStoreLoading,
    error: storeError
  } = useQuery({
    queryKey: ['getCrfItemDetails', req_slno],
    queryFn: () => getStoreReceivedItemDetails(req_slno),
    enabled: req_slno !== null,
    staleTime: Infinity
  })
  const storeReceived = useMemo(() => storeItems, [storeItems])

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
  const returnData = useMemo(() => retunDetails, [retunDetails])

  useEffect(() => {
    if (storeReceived && storeReceived.length > 0) {
      if (returnData && returnData.length > 0) {
        const newArray = storeReceived?.map(val => {
          const xx = returnData?.filter(value => value.po_itm_slno === val.po_itm_slno)
          return {
            ...val,
            returnDetails: xx ? xx : []
          }
        })
        setCombinedData(newArray)
      } else {
        setCombinedData(storeReceived)
      }
    }
  }, [storeReceived, returnData])

  const [itemName, setitemName] = useState('')
  const viewDetails = useCallback((details, itemName) => {
    if (details.length > 0) {
      setReturnModal(true)
      setReturnFlag(1)
      setModalData(details)
      setitemName(itemName)
    } else {
      infoNotify('Details Not Found')
    }
  }, [])
  const handleClose = useCallback(() => {
    setReturnModal(false)
    setReturnFlag(0)
    setModalData([])
  }, [])

  if (isStoreLoading || isReturnLoading) return <p>Loading...</p>
  if (storeError || returnError) return <p>Error occurred.</p>
  return (
    <Fragment>
      {returnFlag === 1 ? (
        <ItemReturnViewModal open={returnModal} handleClose={handleClose} modalData={modalData} itemName={itemName} />
      ) : null}
      {combinedData && combinedData.length > 0 ? (
        <Box sx={{ overflow: 'auto', flexWrap: 'wrap', px: 0.5 }}>
          <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14 }}>
            Received Items
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
                <th
                  size="sm"
                  style={{
                    width: 40,
                    textAlign: 'center',
                    backgroundColor: '#e3f2fd',
                    fontSize: 13
                  }}
                >
                  Qty
                </th>
                <th
                  size="sm"
                  style={{
                    width: 70,
                    textAlign: 'center',
                    backgroundColor: '#e3f2fd',
                    fontSize: 13
                  }}
                >
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
                {retunDetails.length > 0 ? (
                  <th
                    size="sm"
                    style={{
                      width: 40,
                      textAlign: 'center',
                      backgroundColor: '#e3f2fd',
                      fontSize: 13
                    }}
                  ></th>
                ) : null}
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
                      textAlign: 'center',
                      color:
                        item.user_received_status === 1
                          ? '#59981A'
                          : item.user_received_status === 0
                            ? '#e65100'
                            : '#0288d1'
                    }}
                  >
                    {item.user_received_status === 1
                      ? 'Received'
                      : item.user_received_status === 0
                        ? 'Return'
                        : 'Not Updated'}
                  </td>
                  <td style={{ textAlign: 'center', fontSize: 13 }}>
                    {item.returnDetails && item.returnDetails.length > 0 ? (
                      <CustomToolTipForCRF title="Return Details" placement="top">
                        <AssignmentReturnedIcon
                          sx={{
                            color: item.returnDetails.length > 0 ? '#ff8a80' : 'grey',
                            cursor: 'pointer'
                          }}
                          onClick={() => viewDetails(item.returnDetails, item.item_name)}
                        />
                      </CustomToolTipForCRF>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      ) : null}
    </Fragment>
  )
}

export default memo(UserReceivedItemDetails)
