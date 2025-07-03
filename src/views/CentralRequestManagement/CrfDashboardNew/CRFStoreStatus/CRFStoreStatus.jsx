import React, { Fragment, memo, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import partiallyimg from '../../../../assets/images/CRF/partiallyRcv.png'
import fullyimg from '../../../../assets/images/CRF/fullyRcv.png'
import crsImg from '../../../../assets/images/CRF/poPending.png'
import delvMarkimg from '../../../../assets/images/CRF/deliverymark.png'
import itemcheckimg from '../../../../assets/images/CRF/itemcheck.png'
import storeackimg from '../../../../assets/images/CRF/storeack.png'
import userackimg from '../../../../assets/images/CRF/userack.png'
import crfcomimg from '../../../../assets/images/CRF/complete.png'
import {
  getCompletedCRF,
  getDeliveryMarking,
  getItemChecking,
  getStoreAcknow,
  getUserAcknow,
} from 'src/api/CommonApiCRF'
import { format } from 'date-fns'
import { useQuery } from 'react-query'
import CrfStoreDetailedView from './Components/CrfStoreDetailedView'
import { axioslogin } from 'src/views/Axios/Axios'
import { getCRSPending } from '../../ComonComponent/CommonApiCallFuctn'
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode'
const DeliveryMarkingTable = React.lazy(() => import('./Components/DeliveryMarkingTable'))
const ViewItemCheckingList = React.lazy(() => import('./Components/ViewItemCheckingList'))
const StoreAckTableView = React.lazy(() => import('./Components/StoreAckTableView'))
const CompletedCRFView = React.lazy(() => import('./Components/CompletedCRFView'))
const PurcahseMainComp = React.lazy(() => import('../CRFPurchaseStatus/PurcahseMainComp'))
const CustomLoadComp = React.lazy(() => import('../../ComonComponent/Components/CustomLoadComp'))

const CRFStoreStatus = ({ storeData, companyData }) => {
  const storeDetails = useMemo(() => storeData, [storeData])

  const [modalopen, setModalOpen] = useState(false)
  const [modFlag, setModFlag] = useState(0)
  const [flag, setFlag] = useState(0)
  const [tableData, settableData] = useState([])
  const [disData, setDisData] = useState([])
  const [ackFlag, setAckFlag] = useState(0)
  const [strApprv, setStrApprv] = useState({
    crs: { pending: 0, title: '', imageView: [], imName: '', id: 0 },
    delivery: { pending: 0, title: '', imageView: [], imName: '', id: 0 },
    itemcheck: { pending: 0, title: '', imageView: [], imName: '', id: 0 },
    partially: { pending: 0, title: '', imageView: [], imName: '', id: 0 },
    fully: { pending: 0, title: '', imageView: [], imName: '', id: 0 },
    storeAck: { pending: 0, title: '', imageView: [], imName: '', id: 0 },
    userAck: { pending: 0, title: '', imageView: [], imName: '', id: 0 },
    compCRF: { pending: 0, title: '', imageView: [], imName: '', id: 0 },
  })
  const searchData = useMemo(() => {
    return {
      from: format(new Date(), 'yyyy-MM-dd 00:00:00'),
      to: format(new Date(), 'yyyy-MM-dd 23:59:59'),
    }
  }, [])
  const {
    data: delData,
    isLoading: isDeliveryLoading,
    error: deliveryError,
  } = useQuery({
    queryKey: ['deliverMarking', searchData],
    queryFn: () => getDeliveryMarking(searchData),
  })
  const deliveryData = useMemo(() => delData, [delData])

  const {
    data: checkData,
    isLoading: isItemCheckLoading,
    error: itemCheckError,
  } = useQuery({
    queryKey: ['itemChecking', searchData],
    queryFn: () => getItemChecking(searchData),
  })
  const itemCheckData = useMemo(() => checkData, [checkData])

  const {
    data: storeAck,
    isLoading: isStoreAckLoading,
    error: storeAckError,
  } = useQuery({
    queryKey: ['storeAck', searchData],
    queryFn: () => getStoreAcknow(searchData),
  })
  const storeAckData = useMemo(() => storeAck, [storeAck])

  const {
    data: userAck,
    isLoading: isUserAckLoading,
    error: userAckError,
  } = useQuery({
    queryKey: ['userAck', searchData],
    queryFn: () => getUserAcknow(searchData),
  })
  const userAckData = useMemo(() => userAck, [userAck])

  const {
    data: compCrf,
    isLoading: isComCRFoading,
    error: comCRFError,
  } = useQuery({
    queryKey: ['completedCRF', searchData],
    queryFn: () => getCompletedCRF(searchData),
  })
  const completedCRFData = useMemo(() => compCrf, [compCrf])

  useEffect(() => {
    if (storeDetails.length !== 0) {
      const crspending = storeDetails?.filter(val => {
        return val.po_to_supplier === 1 && val.store_recieve === null
      })
      const partially = storeDetails?.filter(val => {
        return val.po_to_supplier === 1 && val.store_recieve === 0
      })
      const fully = storeDetails?.filter(val => {
        return val.po_to_supplier === 1 && val.store_recieve === 1
      })
      setStrApprv({
        crs: {
          pending: crspending.length,
          title: 'Pending PO (CRF)',
          imageView: crsImg,
          imName: 'crs',
          id: 1,
        },
        delivery: {
          pending: deliveryData ? deliveryData.length : 0,
          title: 'Today Delivery Marking',
          imageView: delvMarkimg,
          imName: 'dlv',
          id: 4,
        },
        itemcheck: {
          pending: itemCheckData
            ? `${new Set(itemCheckData?.map(item => item.checking_item_slno)).size}/${
                new Set(itemCheckData?.map(item => item.checking_slno)).size
              }`
            : 0,
          title: 'Total Item/Bill Checked',
          imageView: itemcheckimg,
          imName: 'check',
          id: 5,
        },
        partially: {
          pending: partially.length,
          title: 'Partially Received',
          imageView: partiallyimg,
          imName: 'part',
          id: 2,
        },
        fully: {
          pending: fully.length,
          title: 'Fully Received',
          imageView: fullyimg,
          imName: 'full',
          id: 3,
        },
        storeAck: {
          pending: storeAckData ? storeAckData.length : 0,
          title: 'Today Store Acknowledged',
          imageView: storeackimg,
          imName: 'store',
          id: 6,
        },
        userAck: {
          pending: userAckData ? userAckData.length : 0,
          title: 'Today User Acknowledged',
          imageView: userackimg,
          imName: 'user',
          id: 7,
        },
        compCRF: {
          pending: completedCRFData ? completedCRFData.length : 0,
          title: 'Today Completed CRF',
          imageView: crfcomimg,
          imName: 'compl',
          id: 8,
        },
      })
    } else {
      setStrApprv({
        crs: {
          pending: 0,
          title: 'Pending PO (CRF)',
          imageView: crsImg,
          imName: 'crs',
          id: 1,
        },
        delivery: {
          pending: deliveryData ? deliveryData.length : 0,
          title: 'Today Delivery Marking',
          imageView: delvMarkimg,
          imName: 'dlv',
          id: 4,
        },
        itemcheck: {
          pending: itemCheckData
            ? `${new Set(itemCheckData?.map(item => item.checking_item_slno)).size}/${
                new Set(itemCheckData?.map(item => item.checking_slno)).size
              }`
            : 0,
          title: 'Total Item/Bill Checked',
          imageView: itemcheckimg,
          imName: 'check',
          id: 5,
        },
        partially: {
          pending: 0,
          title: 'Partially Received',
          imageView: partiallyimg,
          imName: 'part',
          id: 2,
        },
        fully: {
          pending: 0,
          title: 'Fully Received',
          imageView: fullyimg,
          imName: 'full',
          id: 3,
        },
        storeAck: {
          pending: storeAckData ? storeAckData.length : 0,
          title: 'Today Store Acknowledged',
          imageView: storeackimg,
          imName: 'store',
          id: 6,
        },
        userAck: {
          pending: userAckData ? userAckData.length : 0,
          title: 'Today User Acknowledged',
          imageView: userackimg,
          imName: 'user',
          id: 7,
        },
        compCRF: {
          pending: completedCRFData ? completedCRFData.length : 0,
          title: 'Today Completed CRF',
          imageView: crfcomimg,
          imName: 'compl',
          id: 8,
        },
      })
    }
  }, [storeDetails, deliveryData, itemCheckData, storeAckData, userAckData, completedCRFData])

  const viewPednigDetails = useCallback(
    async id => {
      if (id === 1 || id === 2 || id === 3) {
        const getDetails = async id => {
          try {
            const result = await axioslogin.get(`/CRFDashboard/getStore/Dashboard/${id}`)
            const { success, data, message } = result.data
            if (success === 1) {
              getCRSPending(setDisData, settableData, data)
              setFlag(1)
            } else if (success === 2) {
              infoNotify(message)
              setDisData([])
              setFlag(0)
            } else {
              warningNotify(message)
              setFlag(0)
            }
          } catch (error) {
            warningNotify('An error occurred while getting data')
          }
        }
        getDetails(id)
      } else if (id === 4) {
        setFlag(2)
        setDisData(deliveryData)
      } else if (id === 5) {
        setModFlag(1)
        setModalOpen(true)
        setDisData(itemCheckData)
      } else if (id === 6) {
        setFlag(3)
        setDisData(storeAckData)
        setAckFlag(1)
      } else if (id === 7) {
        setFlag(3)
        setDisData(userAckData)
        setAckFlag(2)
      } else {
        setFlag(4)
        setDisData(completedCRFData)
      }
    },
    [deliveryData, itemCheckData, storeAckData, userAckData, completedCRFData]
  )

  const handleClose = useCallback(() => {
    setModalOpen(false)
    setModFlag(0)
  }, [setModalOpen])

  if (
    isDeliveryLoading ||
    isItemCheckLoading ||
    isStoreAckLoading ||
    isUserAckLoading ||
    isComCRFoading
  )
    return <p>Loading...</p>
  if (deliveryError || itemCheckError || storeAckError || userAckError || comCRFError)
    return <p>Error occurred.</p>

  return (
    <Fragment>
      <Suspense fallback={<CustomLoadComp />}>
        {modFlag === 1 ? (
          <ViewItemCheckingList disData={disData} handleClose={handleClose} open={modalopen} />
        ) : null}
      </Suspense>
      {flag === 1 ? (
        <Suspense fallback={<CustomLoadComp />}>
          <CrfStoreDetailedView
            setFlag={setFlag}
            disData={disData}
            setDisData={setDisData}
            tableData={tableData}
            companyData={companyData}
          />
        </Suspense>
      ) : flag === 2 ? (
        <Suspense fallback={<CustomLoadComp />}>
          <DeliveryMarkingTable setFlag={setFlag} disData={disData} setDisData={setDisData} />
        </Suspense>
      ) : flag === 3 ? (
        <Suspense fallback={<CustomLoadComp />}>
          <StoreAckTableView
            ackFlag={ackFlag}
            disData={disData}
            setAckFlag={setAckFlag}
            setFlag={setFlag}
            companyData={companyData}
          />
        </Suspense>
      ) : flag === 4 ? (
        <Suspense fallback={<CustomLoadComp />}>
          <CompletedCRFView setFlag={setFlag} disData={disData} companyData={companyData} />
        </Suspense>
      ) : (
        <PurcahseMainComp
          purchaseApprv={strApprv}
          viewPednigDetails={viewPednigDetails}
          companyData={companyData}
        />
      )}
    </Fragment>
  )
}

export default memo(CRFStoreStatus)
