import React, { Fragment, memo, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import ackimg from '../../../../assets/images/CRF/prchseAck.png'
import qcallimg from '../../../../assets/images/CRF/quocall.png'
import qnegoimg from '../../../../assets/images/CRF/qnegot.png'
import qfiximg from '../../../../assets/images/CRF/quofix.png'
import poprepimg from '../../../../assets/images/CRF/poprepare.png'
import pocompimg from '../../../../assets/images/CRF/pocomplete.png'
import poapprove from '../../../../assets/images/CRF/poapprove.png'
import apprvManager from '../../../../assets/images/CRF/apprv2.png'
import apprvDirect from '../../../../assets/images/CRF/apprv3.png'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode'
import { getPurchasePending } from '../../ComonComponent/CommonApiCallFuctn'
import CustomLoadComp from '../../ComonComponent/Components/CustomLoadComp'
const CrfPurchaseDetailedView = React.lazy(() => import('./CrfPurchaseDetailedView'))
const PurcahseMainComp = React.lazy(() => import('./PurcahseMainComp'))

const CRFPurchaseStatus = ({ purchaseData, companyData }) => {
  const purchaseDetails = useMemo(() => purchaseData, [purchaseData])

  const [flag, setFlag] = useState(0)
  const [tableData, setTableData] = useState([])
  const [disData, setDisData] = useState([])
  const [poStart, setPoStart] = useState(0)
  const [purchaseApprv, setPurchaseApprv] = useState({
    ack: { pending: 0, title: '', imageView: [], imName: '', id: 0 },
    qcall: { pending: 0, title: '', imageView: [], imName: '', id: 0 },
    qnego: { pending: 0, title: '', imageView: [], imName: '', id: 0 },
    qfix: { pending: 0, title: '', imageView: [], imName: '', id: 0 },
    poprep: { pending: 0, title: '', imageView: [], imName: '', id: 0 },
    apprval1: { pending: 0, title: '', imageView: [], imName: '', id: 0 },
    apprval2: { pending: 0, title: '', imageView: [], imName: '', id: 0 },
    apprval3: { pending: 0, title: '', imageView: [], imName: '', id: 0 },
    posup: { pending: 0, title: '', imageView: [], imName: '', id: 0 }
  })
  useEffect(() => {
    if (purchaseDetails && purchaseDetails.length !== 0) {
      const ackpendingList = purchaseDetails?.filter(val => val.ack_status === null)

      const quotPending = purchaseDetails?.filter(val => {
        return val.quatation_calling_status === 0 && val.ack_status === 1 && val.po_prepartion !== 1
      })
      const quotNego = purchaseDetails?.filter(val => {
        return val.quatation_negotiation === 0 && val.quatation_calling_status === 1
      })

      const quotFinal = purchaseDetails?.filter(val => {
        return val.quatation_fixing === 0 && val.quatation_negotiation === 1
      })

      const poPending = purchaseDetails?.filter(val => {
        return (
          val.ack_status === 1 &&
          ((val.po_prepartion === 1 && val.po_complete === 0) ||
            (val.quatation_calling_status === 1 && val.quatation_fixing === 1 && val.po_prepartion === 0))
        )
      })

      const apprlvl1 = purchaseDetails?.filter(val => {
        return val.po_complete === 1 && val.approval_level === null
      })

      const apprlvl2 = purchaseDetails?.filter(val => {
        return val.po_complete === 1 && val.approval_level === 1
      })

      const apprlvl3 = purchaseDetails?.filter(val => {
        return val.po_complete === 1 && val.approval_level === 2
      })

      const posup = purchaseDetails?.filter(val => {
        return val.po_complete === 1 && val.po_to_supplier === 0 && val.approval_level === 3
      })

      setPurchaseApprv({
        ack: {
          pending: ackpendingList.length,
          title: 'CRF Acknowledgement',
          imageView: ackimg,
          imName: 'ack',
          id: 1
        },
        qcall: {
          pending: quotPending.length,
          title: 'Quotation Calling',
          imageView: qcallimg,
          imName: 'qcall',
          id: 2
        },
        qnego: {
          pending: quotNego.length,
          title: 'Quotation Negotiation',
          imageView: qnegoimg,
          imName: 'qneg',
          id: 3
        },
        qfix: {
          pending: quotFinal.length,
          title: 'Quotation Approval',
          imageView: qfiximg,
          imName: 'qfix',
          id: 4
        },
        poprep: {
          pending: poPending.length,
          title: 'PO Preparation ',
          imageView: poprepimg,
          imName: 'prep',
          id: 5
        },
        apprval1: {
          pending: apprlvl1.length,
          title: 'PO Approval Purchase',
          imageView: pocompimg,
          imName: 'purch',
          id: 6
        },
        apprval2: {
          pending: apprlvl2.length,
          title: 'PO Approval Purchase Manager',
          imageView: apprvManager,
          imName: 'mang',
          id: 7
        },
        apprval3: {
          pending: apprlvl3.length,
          title: 'PO Approval Directors',
          imageView: apprvDirect,
          imName: 'direct',
          id: 8
        },
        posup: {
          pending: posup.length,
          title: 'Inform to Supplier(PO)',
          imageView: poapprove,
          imName: 'sup',
          id: 9
        }
      })
    } else {
      setPurchaseApprv({
        ack: {
          pending: 0,
          title: 'CRF Acknowledgement',
          imageView: ackimg,
          imName: 'ack',
          id: 1
        },
        qcall: {
          pending: 0,
          title: 'Quotation Calling',
          imageView: qcallimg,
          imName: 'qcall',
          id: 2
        },
        qnego: {
          pending: 0,
          title: 'Quotation Negotiation',
          imageView: qnegoimg,
          imName: 'qneg',
          id: 3
        },
        qfix: {
          pending: 0,
          title: 'Quotation Approval',
          imageView: qfiximg,
          imName: 'qfix',
          id: 4
        },
        poprep: {
          pending: 0,
          title: 'PO Preparation ',
          imageView: poprepimg,
          imName: 'prep',
          id: 5
        },
        apprval1: {
          pending: 0,
          title: 'PO Approval Purchase',
          imageView: pocompimg,
          imName: 'purch',
          id: 6
        },
        apprval2: {
          pending: 0,
          title: 'PO Approval Purchase Manager',
          imageView: apprvManager,
          imName: 'mang',
          id: 7
        },
        apprval3: {
          pending: 0,
          title: 'PO Approval Directors',
          imageView: apprvDirect,
          imName: 'direct',
          id: 8
        },
        posup: {
          pending: 0,
          title: 'Inform to Supplier(PO)',
          imageView: poapprove,
          imName: 'sup',
          id: 9
        }
      })
    }
  }, [purchaseDetails])

  const viewPednigDetails = useCallback(async id => {
    const getDetails = async id => {
      try {
        const result = await axioslogin.get(`/CRFDashboard/gePurchaseDetails/Dashboard/${id}`)
        const { success, data, message } = result.data
        if (success === 1) {
          getPurchasePending(setDisData, setTableData, data)
          setFlag(1)
          setPoStart(id)
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
  }, [])
  return (
    <Fragment>
      {flag === 1 ? (
        <Suspense fallback={<CustomLoadComp />}>
          <CrfPurchaseDetailedView
            setFlag={setFlag}
            disData={disData}
            setDisData={setDisData}
            tableData={tableData}
            poStart={poStart}
            companyData={companyData}
          />
        </Suspense>
      ) : (
        <PurcahseMainComp purchaseApprv={purchaseApprv} viewPednigDetails={viewPednigDetails} />
      )}
    </Fragment>
  )
}

export default memo(CRFPurchaseStatus)
