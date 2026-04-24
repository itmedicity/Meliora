import React, { memo, useCallback, useEffect, useMemo } from 'react'
import {
  Box,
  Typography,
  Card,
  Select,
  Option,
  Input,
  Button,
  IconButton,
} from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  setStep,
  updateVendorDetails,
  togglePreview,
  saveWorkOrder,
  resetWorkOrder,
} from '../../../redux/actions/Workorder.action'

import VendorDetailsEntry from './VendorDetailsEntry'
import WorkOrderStepperComp from '../WorkOrderStepperComp'
import WorkOrderPreviewModal from './WorkOrderModals/WorkOrderPreviewModal'
import { warningNotify } from 'src/views/Common/CommonCode'
import { getCrfItem, getLastWOnumber } from '../WorkOrderCommonApi'
import WorkOrderMaterialDetails from './WorkOrderMaterialDetails'
import InstallationLabourCharge from './InstallationLabourCharge'
import RetentialDetails from './RetentialDetails'
import TermsAndConditions from './TermsAndConditions'
import PaymentTermsAndCondition from './PaymentTermsAndCondition'
import InvoiceOrBillingTermsAndCondition from './InvoiceOrBillingTermsAndCondition'
import { TAB_CONFIG, validateVendorDetails } from '../ReUsableCodes'


const AddDetails = ({ setOpen, SelectedData }) => {

  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const loginId = useSelector(state => state.LoginUserData.empid)
  // Storing
  const WorderFullData = useSelector(state => state.getworkOrderReducer)

  const FullData = useMemo(() => WorderFullData, [WorderFullData])
  // DeStructuring the Stored Data
  const {
    step,
    vendorDetails,
    materialList,
    labourList,
    retentionDetails,
    terms,
    paymentTerms,
    billingTerms,
    previewOpen,
    loading
  } = FullData ?? {};

  const {
    sec_name,
    crfNo,
    req_date,
    req_slno
  } = SelectedData || {}

  // Dynamic localStorage key based on req_slno
  const LOCAL_KEY = useMemo(() => `VendorFullData_${req_slno}`, [req_slno]);

  const { data: getWOnumber = [] } = useQuery({
    queryKey: ['lastWOnumber'],
    queryFn: getLastWOnumber
  })

  const { data: getCrfItems = [] } = useQuery({
    queryKey: ['getCrfItemsList', req_slno],
    queryFn: () => getCrfItem(req_slno),
    enabled: !!req_slno
  })

  const last_wo_slno = getWOnumber?.[0]?.wo_slno ?? 0

  const selectedTab = useMemo(
    () => TAB_CONFIG.find(t => t.id === vendorDetails.contractType),
    [vendorDetails, TAB_CONFIG]
  )

  //  Load draft from localStorage when req_slno changes
  useEffect(() => {
    if (!req_slno) return

    const savedDraft = JSON.parse(
      localStorage.getItem(LOCAL_KEY) || "{}"
    )

    if (Object.keys(savedDraft).length > 0) {
      dispatch(updateVendorDetails(savedDraft.vendorDetails || {}))
      dispatch(setStep(savedDraft.step || 0))
    }

  }, [dispatch, req_slno, LOCAL_KEY])

  useEffect(() => {
    dispatch(updateVendorDetails({
      sec_name,
      crfNo,
      req_date,
      wo_number: last_wo_slno + 1
    }))
  }, [dispatch, sec_name, crfNo, req_date, last_wo_slno])

  const handleSave = useCallback(() => {

    const postData = {
      vendorDetails,
      materialList,
      labourList,
      retentionDetails,
      terms,
      paymentTerms,
      billingTerms
    }

    const errorMsg = validateVendorDetails(postData)
    if (errorMsg) {
      warningNotify(errorMsg)
      return
    }

    const apiPayload = {
      vendor_details: {
        ...vendorDetails,
        loginId,
        crf_no: req_slno
      },

      material_details: materialList.map((row) => ({
        item_name: row.itemName,
        item_code: row.itemCode,
        item_brand: row.itemBrand,
        item_desc: row.itemDesc,
        specification: row.specification,
        quantity: Number(row.quantity),
        unit_price: Number(row.unitPrice),
        gst_amount: Number(row.gstAmount),
        total_amount: Number(row.totalAmount),
        gross_amount: Number(row.grossAmount),
        uom: row.uom,
        uom_name: row.uomName,
        loginId,
      })),

      labour_details: labourList.map((row) => ({
        description: row.description,
        specification: row.specification,
        unit_rate: Number(row.unitRate),
        quantity: Number(row.quantity),
        rate_unit: row.rateUnit,
        total_amount: Number(row.totalAmount),
        loginId,
      })),

      retention_details: {
        description: retentionDetails.description,
        payment_type: retentionDetails.paymentType,
        amount: Number(retentionDetails.amount),
        loginId,
      },

      // terms_details: terms,
      // payment_terms_details: paymentTerms,
      // billing_terms_details: billingTerms,
      // loginId,
      terms_details: {
        ...terms,
        loginId
      },

      payment_terms_details: {
        ...paymentTerms,
        loginId
      },

      billing_terms_details: {
        ...billingTerms,
        loginId
      },
    }

    dispatch(saveWorkOrder(apiPayload, queryClient))

    //  Clear only this CRF draft
    localStorage.removeItem(LOCAL_KEY)
    setOpen(0)

  }, [
    vendorDetails,
    materialList,
    labourList,
    retentionDetails,
    terms,
    paymentTerms,
    billingTerms,
    loginId,
    req_slno,
    dispatch,
    LOCAL_KEY,
    setOpen,
    queryClient
  ])


  const isValidValue = (value) => {
    return value !== null && value !== undefined && value !== "";
  };



  // const HandleNext = useCallback(() => {

  //   const {
  //     sup_email_one,
  //     sup_email_two,
  //     sup_first_mob,
  //     sup_second_mob,
  //     ...mandatoryFields
  //   } = vendorDetails;

  //   const allFieldsValid = Object.values(mandatoryFields).every(isValidValue);

  //   if (!allFieldsValid) {
  //     warningNotify("Please fill all required vendor details before continuing.");
  //     return;
  //   }

  //   const hasEmail =
  //     Boolean(sup_email_one?.trim()) ||
  //     Boolean(sup_email_two?.trim());

  //   const hasMobile =
  //     Boolean(sup_first_mob?.trim()) ||
  //     Boolean(sup_second_mob?.trim());

  //   if (!hasEmail && !hasMobile) {
  //     warningNotify("Please provide at least one email and one mobile number.");
  //     return;
  //   }

  //   if (!hasEmail) {
  //     warningNotify("Please provide at least one email.");
  //     return;
  //   }

  //   if (!hasMobile) {
  //     warningNotify("Please provide at least one mobile number.");
  //     return;
  //   }

  //   const existingDraft = JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}");

  //   const nextUIStep = step + 1;

  //   //  Prevent overwriting with empty FullData
  //   const safeFullData =
  //     FullData && Object.keys(FullData).length > 0
  //       ? FullData
  //       : {};

  //   const mergedData = {
  //     ...existingDraft,
  //     ...safeFullData,

  //     step:
  //       existingDraft?.step > step
  //         ? existingDraft.step
  //         : nextUIStep
  //   };

  //   localStorage.setItem(LOCAL_KEY, JSON.stringify(mergedData));

  //   dispatch(setStep(nextUIStep));

  // }, [dispatch, step, FullData, vendorDetails, LOCAL_KEY]);


  const HandleNext = useCallback(() => {

    const {
      sup_email_one,
      sup_email_two,
      sup_first_mob,
      sup_second_mob,
      ...mandatoryFields
    } = vendorDetails;

    const allFieldsValid = Object.values(mandatoryFields).every(isValidValue);

    if (!allFieldsValid) {
      warningNotify("Please fill all required vendor details before continuing.");
      return;
    }

    const hasEmail =
      Boolean(sup_email_one?.trim()) ||
      Boolean(sup_email_two?.trim());

    const hasMobile =
      Boolean(sup_first_mob?.trim()) ||
      Boolean(sup_second_mob?.trim());

    if (!hasEmail && !hasMobile) {
      warningNotify("Please provide at least one email and one mobile number.");
      return;
    }

    if (!hasEmail) {
      warningNotify("Please provide at least one email.");
      return;
    }

    if (!hasMobile) {
      warningNotify("Please provide at least one mobile number.");
      return;
    }

    // 🔹 Load existing draft safely
    const existingDraft = JSON.parse(
      localStorage.getItem(LOCAL_KEY) || "{}"
    );

    const nextUIStep = step + 1;

    //  Safe merge (NEVER overwrite existing valid data with empty)
    const mergedData = {
      ...existingDraft,

      vendorDetails:
        Object.keys(vendorDetails || {}).length
          ? vendorDetails
          : existingDraft.vendorDetails,

      materialList:
        materialList?.length
          ? materialList
          : existingDraft.materialList,

      labourList:
        labourList?.length
          ? labourList
          : existingDraft.labourList,

      retentionDetails:
        Object.keys(retentionDetails || {}).length
          ? retentionDetails
          : existingDraft.retentionDetails,

      terms:
        Object.keys(terms || {}).length
          ? terms
          : existingDraft.terms,

      paymentTerms:
        Object.keys(paymentTerms || {}).length
          ? paymentTerms
          : existingDraft.paymentTerms,

      billingTerms:
        Object.keys(billingTerms || {}).length
          ? billingTerms
          : existingDraft.billingTerms,

      step:
        existingDraft?.step > step
          ? existingDraft.step
          : step + 1
    };

    localStorage.setItem(LOCAL_KEY, JSON.stringify(mergedData));

    // UI always moves forward only 1 step
    dispatch(setStep(nextUIStep));

  }, [
    dispatch,
    step,
    vendorDetails,
    materialList,
    labourList,
    retentionDetails,
    terms,
    paymentTerms,
    billingTerms,
    LOCAL_KEY
  ]);

  //  Fetch local data based on req_slno
  const localStorageData = JSON.parse(
    localStorage.getItem(LOCAL_KEY) || "{}"
  )

  const stepComponents = [
    <VendorDetailsEntry
      key={0}
      last_wo_slno={last_wo_slno}
      SelectedData={SelectedData}
      localdata={localStorageData}
    />,
    <WorkOrderMaterialDetails localdata={localStorageData} key={1} getCrfItems={getCrfItems} />,
    <InstallationLabourCharge localdata={localStorageData} key={2} />,
    <RetentialDetails key={3} localdata={localStorageData} />,
    <TermsAndConditions key={4} localdata={localStorageData} />,
    <PaymentTermsAndCondition key={5} localdata={localStorageData} />,
    <InvoiceOrBillingTermsAndCondition key={6} localdata={localStorageData} />,
  ];

  const handleClose = useCallback(() => {
    setOpen(0)
    dispatch(resetWorkOrder())
  }, [dispatch])

  return (
    <Box sx={{ width: '100%' }}>
      <Card sx={{ p: 2, height: '90vh' }}>

        {previewOpen && (
          <WorkOrderPreviewModal
            open={previewOpen}
            onClose={() => dispatch(togglePreview(false))}
            data={{
              vendorDetails, materialList, labourList,
              retentionDetails, terms, paymentTerms, billingTerms
            }}
          />
        )}

        <IconButton
          // onClick={() => setOpen(0)}
          onClick={handleClose}

          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 20
          }}
        >
          <CloseIcon />
        </IconButton>
        <WorkOrderStepperComp currentstep={step} />

        <Box
          sx={{
            mt: 2,
            position: 'sticky',
            top: 0,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            mb: 3,
            borderRadius: '20px',
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.97), rgba(238,242,255,0.92))',
            backdropFilter: 'blur(12px)',
            boxShadow:
              '0 10px 30px rgba(79,70,229,0.15), inset 0 0 0 1px rgba(199,210,254,0.8)',
          }}
        >
          {/* CONTRACT SELECT */}
          <Select
            placeholder="Select Contract Type"
            value={vendorDetails.contractType || null}
            onChange={(e, v) =>
              dispatch(updateVendorDetails({ contractType: v }))
            }
            sx={{
              width: 400,
              bgcolor: '#fff',
              borderRadius: '14px',
              fontWeight: 700,
              border: '1px solid #e0e7ff',
              boxShadow: 'sm',
              '&:hover': { boxShadow: 'md' },
              '&:focus-within': {
                borderColor: '#6366f1',
                boxShadow: '0 0 0 3px rgba(99,102,241,0.2)',
              }
            }}
          >
            {TAB_CONFIG.map((t) => (
              <Option key={t.id} value={t.id}>
                {t.label}
              </Option>
            ))}
          </Select>

          {/* TITLE */}
          <Box
            sx={{
              color: "#A88EC2"
            }}
          >
            <Typography
              level="h4"
              sx={{
                fontWeight: 900,
                color: "#A88EC2",
                letterSpacing: 0.8,
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
              }}
            >
              {selectedTab?.label}
            </Typography>
          </Box>

          {/* DATE RANGE */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 1
            }}
          >
            <Input
              type="date"
              value={vendorDetails.fromDate || ''}
              sx={{
                bgcolor: '#fff',
                borderRadius: '14px',
                border: '1px solid #e0e7ff',
                boxShadow: 'sm',
                '&:hover': { boxShadow: 'md' },
                '&:focus-within': {
                  borderColor: '#6366f1',
                  boxShadow: '0 0 0 3px rgba(99,102,241,0.2)',
                },
              }}
              onChange={(e) =>
                dispatch(
                  updateVendorDetails({
                    fromDate: e.target.value
                  })
                )
              }
            />
            <Box
              sx={{
                px: 1.2,
                py: 0.5,
                borderRadius: '999px',
                bgcolor: '#eef2ff',
                fontWeight: 800,
                color: '#4f46e5',
              }}
            >
              →
            </Box>
            <Input
              type="date"
              value={vendorDetails.toDate || ''}
              sx={{
                bgcolor: '#fff',
                borderRadius: '14px',
                border: '1px solid #e0e7ff',
                boxShadow: 'sm',
                '&:hover': { boxShadow: 'md' },
                '&:focus-within': {
                  borderColor: '#6366f1',
                  boxShadow: '0 0 0 3px rgba(99,102,241,0.2)',
                },
              }}
              onChange={(e) =>
                dispatch(
                  updateVendorDetails({
                    toDate: e.target.value
                  })
                )
              }
            />
          </Box>
        </Box>
        {stepComponents.map((Comp, index) =>
          index === step ? Comp : null
        )}
        {/* footer secton */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
            position: "-webkit-sticky"
          }}
        >

          {/* Back Button */}
          <Button
            startDecorator={<ArrowBackIcon />}
            size="lg"
            disabled={step === 0}
            onClick={

              () => dispatch(setStep(step - 1))
            }
            sx={{
              px: 5,
              borderRadius: "xl",
              fontWeight: 800,
              background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
              boxShadow: "0 12px 28px rgba(124,58,237,0.45)",
              transition: "all 0.25s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 16px 36px rgba(124,58,237,0.6)",
              },
            }}
          >
            Back
          </Button>

          {/* For Preview Purpose */}
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => dispatch(togglePreview(true))}
          >
            Preview
          </Button>

          {step === 6 ?
            <Button
              endDecorator={<ArrowForwardIcon />}
              size="lg"
              loading={loading}
              onClick={handleSave}
              sx={{
                px: 5,
                borderRadius: "xl",
                fontWeight: 800,
                background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
                boxShadow: "0 12px 28px rgba(124,58,237,0.45)",
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 16px 36px rgba(124,58,237,0.6)",
                },
              }}
            >
              Save
            </Button>
            :
            < Button
              endDecorator={<ArrowForwardIcon />}
              size="lg"
              onClick={HandleNext}
              sx={{
                px: 5,
                borderRadius: "xl",
                fontWeight: 800,
                background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
                boxShadow: "0 12px 28px rgba(124,58,237,0.45)",
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 16px 36px rgba(124,58,237,0.6)",
                },
              }}
            >
              Next
            </Button>
          }
        </Box>
      </Card>
    </Box>
  )
}
export default memo(AddDetails)


