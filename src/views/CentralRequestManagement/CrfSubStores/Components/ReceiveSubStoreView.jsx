import { format } from 'date-fns'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Paper, Typography, Box } from '@mui/material'
import { axioslogin } from 'src/views/Axios/Axios'
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone'
import BallotTwoToneIcon from '@mui/icons-material/BallotTwoTone'
import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone'
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone'
import { Virtuoso } from 'react-virtuoso'
import { useQuery } from '@tanstack/react-query'
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone'
import AssignmentReturnedOutlinedIcon from '@mui/icons-material/AssignmentReturnedOutlined'
import { itemReturnDetailsForViewStore } from 'src/api/CommonApiCRF'
import CustomToolTipForCRF from '../../ComonComponent/Components/CustomToolTipForCRF'
const PODetailsView = React.lazy(() => import('./PODetailsView'))
const GrnItemDetails = React.lazy(() => import('./GrnItemDetails'))
const InfoModal = React.lazy(() => import('./InfoModal'))
const CRFDetailsView = React.lazy(() => import('./CRFDetailsView'))
const ReturnViewDetails = React.lazy(() => import('./ReturnViewDetails'))

const ReceiveSubStoreView = ({
  tableData,
  selectedRadio,
  storeName,
  setSelectedRadio,
  setStoreName,
  company,
  reqSlno
}) => {
  const [displayList, setDisplayList] = useState([])
  const [retrunModal, setRetrunModal] = useState(false)
  const [returnModalData, setReturnModalData] = useState([])
  const [returnFlag, setReturnFlag] = useState(0)
  const [subStoreState, setSubStoreState] = useState({
    poItems: [],
    modalopen: false,
    modFlag: 0,
    crfData: [],
    crfModal: false,
    crfFlag: 0,
    informModal: false,
    infoFlag: 0,
    infoData: [],
    poDetails: [],
    grnData: [],
    grnFlag: 0,
    grnItem: [],
    grnItemModal: false
  })
  const {
    poItems,
    modalopen,
    modFlag,
    crfData,
    crfModal,
    crfFlag,
    informModal,
    infoFlag,
    infoData,
    poDetails,
    grnData,
    grnFlag,
    grnItem,
    grnItemModal
  } = subStoreState

  const {
    data: returnList,
    isLoading: isReturnLoading,
    error: returnError
  } = useQuery({
    queryKey: ['returnDetailsView', reqSlno],
    queryFn: () => itemReturnDetailsForViewStore(reqSlno),
    enabled: reqSlno && reqSlno.length > 0,
    staleTime: Infinity
  })
  const returnData = useMemo(() => returnList, [returnList])

  useEffect(() => {
    if (returnData && returnData.length > 0) {
      const newArray = tableData?.map(val => {
        const xx = returnData?.filter(value => value.req_slno === val.req_slno)
        return {
          ...val,
          returnDetails: xx ? xx : [],
          status: xx.some(item => item.received_status_return === 0),
          received: xx?.filter(item => item.received_status_return === 1)
        }
      })
      setDisplayList(newArray)
    } else {
      setDisplayList(tableData)
    }
  }, [returnData, tableData])

  const viewPODetails = useCallback(val => {
    const { po_detail_slno, po_details } = val

    const news = po_details?.map(item => ({
      po_detail_slno: item.po_detail_slno,
      po_number: item.po_number,
      po_date: item.po_date,
      supplier_name: item.supplier_name,
      expected_delivery: item.expected_delivery
    }))

    setSubStoreState(prev => ({
      ...prev,
      poDetails: news
    }))

    const poNumber = po_detail_slno?.map(slno => ({ poSlno: slno }))

    const getPOItems = async poNumber => {
      const result = await axioslogin.post('/newCRFStore/getItems', poNumber)
      return result.data
    }

    getPOItems(poNumber).then(val => {
      const { success, data } = val
      setSubStoreState(prev => ({
        ...prev,
        poItems: success === 1 ? data : [],
        modalopen: success === 1,
        modFlag: success === 1 ? 1 : 0
      }))
    })
  }, [])

  const viewGrnDetails = useCallback(val => {
    const { po_detail_slno, grn_nos } = val

    setSubStoreState(prev => ({
      ...prev,
      grnData: grn_nos
    }))
    const poNumber = po_detail_slno?.map(slno => ({ poSlno: slno }))
    const getPOItems = async poNumber => {
      const result = await axioslogin.post('/newCRFStore/getItems', poNumber)
      return result.data
    }
    getPOItems(poNumber).then(val => {
      const { success, data } = val
      setSubStoreState(prev => ({
        ...prev,
        grnItem: success === 1 ? data : [],
        grnItemModal: success === 1,
        grnFlag: success === 1 ? 1 : 0
      }))
    })
  }, [])

  const viewCrfDetails = useCallback(req_slno => {
    const getCRfDetails = async req_slno => {
      const result = await axioslogin.get(`/newCRFStore/crfReq/${req_slno}`)
      const { success, data } = result.data
      if (success === 1) {
        const newData = data?.filter(val => val.item_status_approved === 1)
        setSubStoreState(prev => ({
          ...prev,
          crfData: newData,
          crfModal: true,
          crfFlag: 1
        }))
      } else {
        setSubStoreState(prev => ({
          ...prev,
          crfData: [],
          crfModal: false,
          crfFlag: 0
        }))
      }
    }

    getCRfDetails(req_slno)
  }, [])

  const handleClose = useCallback(() => {
    setSubStoreState(prev => ({
      ...prev,
      modalopen: false,
      modFlag: 0,
      poItems: [],
      crfData: [],
      crfModal: false,
      crfFlag: 0,
      grnItemModal: false,
      grnFlag: 0
    }))
  }, [])

  const informToReqUser = useCallback(
    details => {
      const { sub_store_slno, sub_store_name } = details

      setSelectedRadio(sub_store_slno)
      setStoreName(sub_store_name)

      setSubStoreState(prev => ({
        ...prev,
        informModal: true,
        infoFlag: 1,
        infoData: details
      }))
    },
    [setSelectedRadio, setStoreName]
  )

  const handleCloseInfo = useCallback(() => {
    setSubStoreState(prev => ({
      ...prev,
      informModal: false,
      infoFlag: 0,
      grnFlag: 0,
      grnItemModal: false
    }))
  }, [])

  const viewReturnDetails = useCallback(details => {
    setRetrunModal(true)
    const newData = details?.map(val => {
      return {
        item_return_slno: val.item_return_slno,
        req_slno: val.req_slno,
        po_detail_slno: val.po_detail_slno,
        po_itm_slno: val.po_itm_slno,
        item_name: val.item_name,
        return_remarks: val.return_remarks,
        return_user: val.return_user,
        return_date: val.return_date,
        store_return_received_remarks: val.store_return_received_remarks,
        item_received_user: val.item_received_user,
        received_status_return: val.received_status_return,
        received_date: val.received_date,
        storeRemarks: ''

        // storeRemarks: val.store_issue_remarks ? val.store_issue_remarks : '',
        // store_user: val.storeUser ? val.storeUser : '',
        // issued_date: val.issued_date ? val.issued_date : '',
      }
    })
    setReturnModalData(newData)
    setReturnFlag(1)
  }, [])
  const handleCloseReturn = useCallback(() => {
    setReturnFlag(0)
    setReturnModalData([])
    setRetrunModal(false)
  }, [])
  const capitalizeWords = str =>
    str
      ? str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      : ''
  if (isReturnLoading) return <p>Loading...</p>
  if (returnError) return <p>Error occurred.</p>
  return (
    <Fragment>
      {grnFlag === 1 ? (
        <GrnItemDetails open={grnItemModal} grnData={grnData} handleCloseInfo={handleCloseInfo} grnItem={grnItem} />
      ) : null}
      {modFlag === 1 ? (
        <PODetailsView handleClose={handleClose} open={modalopen} poItems={poItems} poDetails={poDetails} />
      ) : null}
      {crfFlag === 1 ? (
        <CRFDetailsView handleClose={handleClose} open={crfModal} crfData={crfData} company={company} />
      ) : null}
      {infoFlag === 1 ? (
        <InfoModal
          handleClose={handleCloseInfo}
          open={informModal}
          selectedRadio={selectedRadio}
          storeName={storeName}
          infoData={infoData}
        />
      ) : null}
      {returnFlag === 1 ? (
        <ReturnViewDetails
          setReturnModalData={setReturnModalData}
          returnModalData={returnModalData}
          handleClose={handleCloseReturn}
          open={retrunModal}
        />
      ) : null}
      <Box>
        {tableData.length !== 0 ? (
          <Box
            variant="outlined"
            sx={{
              overflow: 'auto',
              pt: 0.4,
              flexWrap: 'wrap',
              maxHeight: window.innerHeight - 220,
              width: '100%',
              '&::-webkit-scrollbar': { height: 8 }
            }}
          >
            <Paper elevation={3} sx={{ width: '100%' }}>
              <Box
                display="flex"
                justifyContent="space-between"
                padding={0.5}
                sx={{
                  bgcolor: '#41729F',
                  color: 'white',
                  position: 'sticky',
                  top: 0,
                  zIndex: 1
                }}
              >
                <Typography sx={{ width: 60, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>Sl.No</Typography>
                <Typography sx={{ width: 120, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>CRF No</Typography>
                <Typography sx={{ width: 200, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Req.Dpt</Typography>
                <Typography sx={{ width: 120, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Req.Emp</Typography>
                <Typography sx={{ width: 200, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Req.Date</Typography>
                <Typography sx={{ width: 200, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>
                  Required Dpt
                </Typography>
                <Typography sx={{ width: 200, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Store</Typography>
                <Typography sx={{ width: 40, textAlign: 'center', fontWeight: 550, fontSize: 12, mr: 0.6 }}>
                  PO
                </Typography>
                <Typography sx={{ width: 40, textAlign: 'center', fontWeight: 550, fontSize: 12, mr: 0.5 }}>
                  GRN
                </Typography>
                <Typography sx={{ width: 30, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>CRF</Typography>
                {returnData.length > 0 ? (
                  <Typography sx={{ width: 30, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>
                    {' '}
                    Return
                  </Typography>
                ) : null}
                <Typography sx={{ width: 30, textAlign: 'center', fontWeight: 550, fontSize: 12, mr: 2 }}></Typography>
              </Box>
              <Virtuoso
                style={{ height: '71vh', width: '100%' }}
                data={displayList}
                itemContent={(index, val) => (
                  <React.Fragment key={index}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      sx={{ borderBottom: '1px solid lightgrey', cursor: 'pointer' }}
                    >
                      <Typography sx={{ width: 60, textAlign: 'center', fontSize: 12, my: 1 }}>{index + 1}</Typography>
                      <Typography sx={{ width: 120, textAlign: 'left', fontSize: 12, my: 1 }}>
                        `CRF/{company?.company_name}/{val?.req_slno}
                      </Typography>
                      <Typography sx={{ width: 200, textAlign: 'left', fontSize: 12, my: 1 }}>
                        {capitalizeWords(val?.user_deptsection)}
                      </Typography>
                      <Typography sx={{ width: 120, textAlign: 'left', fontSize: 12, my: 1 }}>
                        {capitalizeWords(val?.create_user)}
                      </Typography>
                      <Typography sx={{ width: 200, textAlign: 'left', fontSize: 12, my: 1 }}>
                        {format(new Date(val?.req_date), 'dd-MM-yyyy hh:mm:ss a')}
                      </Typography>
                      <Typography sx={{ width: 200, textAlign: 'left', fontSize: 12, my: 1 }}>
                        {capitalizeWords(val?.req_deptsec)}
                      </Typography>
                      <Typography sx={{ width: 200, textAlign: 'left', fontSize: 12, my: 1 }}>
                        {capitalizeWords(val?.sub_store_name)}
                      </Typography>
                      <Box sx={{ width: 40, textAlign: 'center', cursor: 'pointer', display: 'flex' }}>
                        <CustomToolTipForCRF title="PO Details" placement="left">
                          <InventoryTwoToneIcon
                            sx={{
                              mt: 0.5,
                              fontSize: 'lg',
                              color: '#004d40',
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
                            onClick={() => viewPODetails(val)}
                          />
                        </CustomToolTipForCRF>
                      </Box>
                      <Box sx={{ width: 40, textAlign: 'center', cursor: 'pointer', display: 'flex' }}>
                        <CustomToolTipForCRF title="GRN Details" placement="left">
                          <BallotTwoToneIcon
                            sx={{
                              mt: 0.5,
                              fontSize: 'lg',
                              color: '#01579b',
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
                            onClick={() => viewGrnDetails(val)}
                          />
                        </CustomToolTipForCRF>
                      </Box>
                      <Box sx={{ width: 30, textAlign: 'center', cursor: 'pointer', display: 'flex' }}>
                        <CustomToolTipForCRF title="CRF Details" placement="left">
                          <ListAltTwoToneIcon
                            sx={{
                              mt: 0.5,
                              fontSize: 'lg',
                              color: '#303f9f',
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
                            onClick={() => viewCrfDetails(val.req_slno)}
                          />
                        </CustomToolTipForCRF>
                      </Box>
                      {returnData.length > 0 ? (
                        <Box
                          sx={{
                            width: 30,
                            textAlign: 'center',
                            cursor: 'pointer',
                            display: 'flex'
                          }}
                        >
                          {val.received && val.received.length > 0 ? (
                            <CustomToolTipForCRF title="Replace Item" placement="left">
                              <AssignmentReturnedOutlinedIcon
                                sx={{
                                  mt: 0.5,
                                  fontSize: 'lg',
                                  color: '#bf360c',
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
                                onClick={() => viewReturnDetails(val.returnDetails)}
                              />
                            </CustomToolTipForCRF>
                          ) : val.status === true ? (
                            <CustomToolTipForCRF title="Return Details" placement="left">
                              <NotificationsActiveTwoToneIcon
                                sx={{
                                  mt: 0.5,
                                  fontSize: 'lg',
                                  color: '#827717',
                                  height: 25,
                                  width: 30,
                                  borderRadius: 2,
                                  boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                                  cursor: 'pointer',
                                  animation: 'blink 1s infinite',
                                  '@keyframes blink': {
                                    '0%': { opacity: 1 },
                                    '50%': { opacity: 0 },
                                    '100%': { opacity: 1 }
                                  },
                                  transition: 'transform 0.2s',
                                  '&:hover': {
                                    transform: 'scale(1.1)'
                                  }
                                }}
                                onClick={() => viewReturnDetails(val.returnDetails)}
                              />
                            </CustomToolTipForCRF>
                          ) : (
                            <AssignmentReturnedOutlinedIcon
                              sx={{
                                mt: 0.5,
                                fontSize: 'lg',
                                color: 'grey',
                                height: 25,
                                width: 30,
                                borderRadius: 2
                              }}
                            />
                          )}
                        </Box>
                      ) : null}
                      <Box
                        sx={{
                          width: 30,
                          textAlign: 'center',
                          cursor: 'pointer',
                          display: 'flex',
                          mr: 2
                        }}
                      >
                        <CustomToolTipForCRF title="Inform To Req User" placement="left">
                          <VerifiedTwoToneIcon
                            sx={{
                              mt: 0.5,
                              fontSize: 'lg',
                              color: '#1b5e20',
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
                            onClick={() => informToReqUser(val)}
                          />
                        </CustomToolTipForCRF>
                      </Box>
                    </Box>
                  </React.Fragment>
                )}
              />
            </Paper>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: 25,
              opacity: 0.5,
              pt: 10,
              color: 'grey'
            }}
          >
            No Report Found
          </Box>
        )}
      </Box>
    </Fragment>
  )
}

export default memo(ReceiveSubStoreView)
