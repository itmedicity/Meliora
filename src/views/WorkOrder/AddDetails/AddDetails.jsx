
import React, { memo, useCallback, useState, useMemo } from 'react'
import {
  Box,
  Typography,
  Card,
  Select,
  Option,
  Input,
  Button,
} from '@mui/joy'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import VendorDetailsEntry from './VendorDetailsEntry'
import InstallationLabourCharge from './InstallationLabourCharge'
import RetentialDetails from './RetentialDetails'
import TermsAndConditions from './TermsAndConditions'
import PaymentTermsAndCondition from './PaymentTermsAndCondition'
import InvoiceOrBillingTermsAndCondition from './InvoiceOrBillingTermsAndCondition'
import WorkOrderMaterialDetails from './WorkOrderMaterialDetails'
import WorkOrderStepperComp from '../WorkOrderStepperComp'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
/* 🔹 Contract Types */
const TAB_CONFIG = [
  {
    id: 1,
    label: 'ANNUAL MAINTANANCE CONTRACT',
    gradient: 'linear-gradient(135deg,#C5B0CD,#9B7EBD)',
  },
  {
    id: 2,
    label: 'COMPREHENSIVE MAINTANANCE CONTRACT',
    gradient: 'linear-gradient(135deg,#A2AADB,#6A7FDB)',
  },
  {
    id: 3,
    label: 'RATE CONTRACT',
    gradient: 'linear-gradient(135deg,#8174A0,#4A3F73)',
  },
]

const AddDetails = ({ setOpen, SelectedData, setSelectedData }) => {
  const [tabValue, setTabValue] = useState(0)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [vendorList, SetVendorList] = useState(null)
  const [wod, setWod] = useState('')
  const [vendor_Desc, setVendor_Desc] = useState('')
  const [openNext, setOpenNext] = useState(0)

  // Material
  const [uom, setUOM] = useState(0)
  const [uomName, setUomName] = useState('')

  const selectedTab = useMemo(() => TAB_CONFIG[tabValue], [tabValue])

  const close = useCallback(() => {
    setOpen(0)
    setSelectedData([])
  }, [setOpen, setSelectedData])

  const handleNext = useCallback(() => {
    setOpenNext(prev => prev + 1)
  }, [])

  const handleBack = useCallback(() => {
    setOpenNext(prev => prev - 1)
  }, [])
  return (
    <Box sx={{ width: '100%' }}>
      <Card
        sx={{
          flex: 1,
          p: 3,
          // borderRadius: '24px',
          height: "90vh",
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(240,242,255,0.92))',
          boxShadow:
            '0 30px 80px rgba(79,70,229,0.15), inset 0 0 0 1px rgba(199,210,254,0.8)',
          position: 'relative',
        }}
      >
        {/* CLOSE BUTTON */}
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          <IconButton
            onClick={close}
            sx={{
              bgcolor: '#926FB1',
              '&:hover': { bgcolor: '#926FB1' },
            }}
          >
            <CloseIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>

        {/* STEPPER */}
        <Box
          sx={{
            mb: 3,
            p: 2,
            borderRadius: '18px',
            bgcolor: '#eef2ff',
            boxShadow: 'inset 0 0 0 1px #c7d2fe',
          }}
        >
          <WorkOrderStepperComp currentstep={openNext} />
        </Box>

        {/* HEADER */}
        <Box
          sx={{
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
            value={tabValue}
            onChange={(e, v) => setTabValue(v)}
            placeholder="Select Contract"
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
              },
            }}
          >
            {TAB_CONFIG.map((tab, index) => (
              <Option
                key={tab.label}
                value={index}
                sx={{
                  fontWeight: 600,
                  borderRadius: '10px',
                  my: 0.5,
                  '&.Mui-selected': {
                    bgcolor: tab.gradient,
                    color: '#fff',
                  },
                }}
              >
                {tab.label}
              </Option>
            ))}
          </Select>

          {/* TITLE */}
          <Box
            sx={{
              color: "#A88EC2",
              // px: 4,
              // py: 1.2,
              // borderRadius: '999px',
              // background: selectedTab.gradient,
              // boxShadow: '0 12px 30px rgba(79,70,229,0.4)',
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
              {selectedTab.label}
            </Typography>
          </Box>

          {/* DATE RANGE */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 1,
              borderRadius: '14px',
              bgcolor: '#fff',
              border: '1px solid #e0e7ff',
              boxShadow: 'sm',
            }}
          >
            <Input
              type="date"
              size="sm"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              sx={{ borderRadius: '10px', fontWeight: 600, minWidth: 135 }}
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
              size="sm"
              value={toDate}
              min={fromDate || undefined}
              onChange={(e) => setToDate(e.target.value)}
              sx={{ borderRadius: '10px', fontWeight: 600, minWidth: 135 }}
            />
          </Box>
        </Box>

        {/* CONTENT */}
        <Box
          sx={{
            animation: 'fadeSlide 0.35s ease',
            '@keyframes fadeSlide': {
              from: { opacity: 0, transform: 'translateY(12px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          {openNext === 0 && (
            <VendorDetailsEntry
              SelectedData={SelectedData}
              vendorList={vendorList}
              SetVendorList={SetVendorList}
              wod={wod}
              setWod={setWod}
              vendor_Desc={vendor_Desc}
              setVendor_Desc={setVendor_Desc}
            />
          )}

          {openNext === 1 && (
            <WorkOrderMaterialDetails
              uom={uom}
              setUOM={setUOM}
              setUomName={setUomName}
              uomName={uomName}
            />
          )}

          {openNext === 2 && <InstallationLabourCharge />}
          {openNext === 3 && <RetentialDetails />}
          {openNext === 4 && <TermsAndConditions />}
          {openNext === 5 && <PaymentTermsAndCondition />}
          {openNext === 6 && <InvoiceOrBillingTermsAndCondition />}
        </Box>



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
            onClick={handleBack}
            disabled={openNext === 0}
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

          {/* Next Button */}
          <Button
            endDecorator={<ArrowForwardIcon />}
            size="lg"
            onClick={handleNext}
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
        </Box>



      </Card >





    </Box >
  )
}

export default memo(AddDetails)


// import React, { memo, useCallback, useMemo, useState } from 'react'
// import { Box, Typography, Card, Select, Option, Input, Button, } from '@mui/joy'
// import { IconButton } from '@mui/material'
// import CloseIcon from '@mui/icons-material/Close'
// import VendorDetailsEntry from './VendorDetailsEntry'
// import InstallationLabourCharge from './InstallationLabourCharge'
// import RetentialDetails from './RetentialDetails'
// import TermsAndConditions from './TermsAndConditions'
// import PaymentTermsAndCondition from './PaymentTermsAndCondition'
// import InvoiceOrBillingTermsAndCondition from './InvoiceOrBillingTermsAndCondition'
// import WorkOrderMaterialDetails from './WorkOrderMaterialDetails'
// import WorkOrderStepperComp from '../WorkOrderStepperComp'
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


// const TAB_CONFIG = [
//   {
//     id: 1,
//     label: 'ANNUAL MAINTANANCE CONTRACT',
//     gradient: 'linear-gradient(135deg,#C5B0CD,#9B7EBD)',
//   },
//   {
//     id: 2,
//     label: 'COMPREHENSIVE MAINTANANCE CONTRACT',
//     gradient: 'linear-gradient(135deg,#A2AADB,#6A7FDB)',
//   },
//   {
//     id: 3,
//     label: 'RATE CONTRACT',
//     gradient: 'linear-gradient(135deg,#8174A0,#4A3F73)',
//   },
// ]

// const AddDtails = ({ setOpen,
//   SelectedData,
//   setSelectedData }) => {
//   const [tabValue, setTabValue] = useState(0)
//   const [fromDate, setFromDate] = useState('')
//   const [toDate, setToDate] = useState('')
//   const [vendorList, SetVendorList] = useState(null)
//   const [wod, setWod] = useState('')
//   const [vendor_Desc, setVendor_Desc] = useState('')
//   const [openNext, setOpenNext] = useState(0)

//   // Material
//   const [uom, setUOM] = useState(0)
//   const [uomName, setUomName] = useState('')

//   const selectedTab = useMemo(() => TAB_CONFIG[tabValue], [tabValue])

//   const close = useCallback(() => {
//     setOpen(0)
//     setSelectedData([])
//   }, [setOpen, setSelectedData])

//   const handleNext = useCallback(() => {
//     setOpenNext(prev => prev + 1)
//   }, [])

//   const handleBack = useCallback(() => {
//     setOpenNext(prev => prev - 1)
//   }, [])

//   return (
//     <Card
//       sx={{
//         flex: 1,
//         p: 3,
//         height: "90vh",                 // ✅ fixed height
//         display: "flex",                // ✅ flex layout
//         flexDirection: "column",
//         background:
//           "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(240,242,255,0.92))",
//         boxShadow:
//           "0 30px 80px rgba(79,70,229,0.15), inset 0 0 0 1px rgba(199,210,254,0.8)",
//         borderRadius: "24px",
//       }}
//     >
//       {/* ================= HEADER ================= */}
//       <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
//         <IconButton onClick={close} sx={{ bgcolor: '#926FB1', '&:hover': { bgcolor: '#926FB1' }, }} >
//           <CloseIcon sx={{ color: 'white' }} />
//         </IconButton>
//       </Box>
//       {/* STEPPER */}
//       <Box sx={{ mb: 3, p: 2, borderRadius: '18px', bgcolor: '#eef2ff', boxShadow: 'inset 0 0 0 1px #c7d2fe', }} >
//         <WorkOrderStepperComp currentstep={openNext} />
//       </Box>
//       {/* HEADER */}
//       <Box sx={{
//         position: 'sticky', top: 0, zIndex: 10, display: 'flex',
//         alignItems: 'center', justifyContent: 'space-between', p: 2,
//         mb: 3, borderRadius: '20px', background: 'linear-gradient(135deg, rgba(255,255,255,0.97), rgba(238,242,255,0.92))',
//         backdropFilter: 'blur(12px)', boxShadow: '0 10px 30px rgba(79,70,229,0.15), inset 0 0 0 1px rgba(199,210,254,0.8)',
//       }} >
//         {/* CONTRACT SELECT */}
//         <Select value={tabValue} onChange={(e, v) => setTabValue(v)} placeholder="Select Contract"
//           sx={{
//             width: 400, bgcolor: '#fff', borderRadius: '14px', fontWeight: 700,
//             border: '1px solid #e0e7ff', boxShadow: 'sm', '&:hover': { boxShadow: 'md' }, '&:focus-within': { borderColor: '#6366f1', boxShadow: '0 0 0 3px rgba(99,102,241,0.2)', },
//           }} > {TAB_CONFIG.map((tab, index) => (
//             <Option key={tab.label} value={index}
//               sx={{
//                 fontWeight: 600, borderRadius: '10px', my: 0.5, '&.Mui-selected':
//                   { bgcolor: tab.gradient, color: '#fff', },
//               }} > {tab.label} </Option>))}
//         </Select>
//         {/* TITLE */}
//         <Box sx={{
//           color: "#A88EC2",
//           px: 4,
//           py: 1.2, borderRadius: '999px', background: selectedTab.gradient,
//           boxShadow: '0 12px 30px rgba(79,70,229,0.4)',
//         }} >
//           <Typography level="h4" sx={{
//             fontWeight: 900, color: "#A88EC2",
//             letterSpacing: 0.8, whiteSpace: 'nowrap', textTransform: 'uppercase',
//           }} >
//             {selectedTab.label} </Typography> </Box>
//         {/* DATE RANGE */}
//         <Box sx={{
//           display: 'flex', alignItems: 'center', gap: 1, p: 1,
//           borderRadius: '14px', bgcolor: '#fff', border: '1px solid #e0e7ff', boxShadow: 'sm',
//         }} >
//           <Input type="date" size="sm" value={fromDate} onChange={(e) => setFromDate(e.target.value)}
//             sx={{ borderRadius: '10px', fontWeight: 600, minWidth: 135 }} />
//           <Box sx={{
//             px: 1.2, py: 0.5, borderRadius: '999px', bgcolor: '#eef2ff',
//             fontWeight: 800, color: '#4f46e5',
//           }} > → </Box> <Input type="date" size="sm"
//             value={toDate} min={fromDate || undefined} onChange={(e) => setToDate(e.target.value)}
//             sx={{ borderRadius: '10px', fontWeight: 600, minWidth: 135 }} />
//         </Box> </Box>

//       {/* ================= SCROLLABLE CONTENT ================= */}
//       {/* <Box
//         sx={{
//           flex: 1,                    // ✅ takes remaining space
//           overflowY: "auto",          // ✅ scrolls only content
//           pr: 1,
//           animation: "fadeSlide 0.35s ease",
//           "@keyframes fadeSlide": {
//             from: { opacity: 0, transform: "translateY(12px)" },
//             to: { opacity: 1, transform: "translateY(0)" },
//           },
//         }}
//       >
//         <Box sx={{ minHeight: 600 }}>
//           <Typography level="h4" mb={2}>
//             Step Content {openNext + 1}
//           </Typography>

//           <Typography>
//             This area will scroll if content is long.
//             Footer buttons will stay fixed at the bottom.
//           </Typography>

//           {[...Array(20)].map((_, i) => (
//             <Typography key={i} mt={1}>
//               Content line {i + 1}
//             </Typography>
//           ))}
//         </Box>
//       </Box> */}



// //         {/* CONTENT */}
//       <Box
//         sx={{
//           animation: 'fadeSlide 0.35s ease',
//           '@keyframes fadeSlide': {
//             from: { opacity: 0, transform: 'translateY(12px)' },
//             to: { opacity: 1, transform: 'translateY(0)' },
//           },
//         }}
//       >
//         {openNext === 0 && (
//           <VendorDetailsEntry
//             SelectedData={SelectedData}
//             vendorList={vendorList}
//             SetVendorList={SetVendorList}
//             wod={wod}
//             setWod={setWod}
//             vendor_Desc={vendor_Desc}
//             setVendor_Desc={setVendor_Desc}
//           />
//         )}

//         {openNext === 1 && (
//           <WorkOrderMaterialDetails
//             uom={uom}
//             setUOM={setUOM}
//             setUomName={setUomName}
//             uomName={uomName}
//           />
//         )}

//         {openNext === 2 && <InstallationLabourCharge />}
//         {openNext === 3 && <RetentialDetails />}
//         {openNext === 4 && <TermsAndConditions />}
//         {openNext === 5 && <PaymentTermsAndCondition />}
//         {openNext === 6 && <InvoiceOrBillingTermsAndCondition />}
//       </Box>

//       {/* ================= FOOTER (STICKY) ================= */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           pt: 2,
//           mt: 2,
//           borderTop: "1px solid #e0e7ff",
//           background:
//             "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(240,242,255,0.96))",
//           position: "sticky",        // ✅ sticks inside card
//           bottom: 0,
//           zIndex: 10,
//         }}
//       >
//         <Button
//           startDecorator={<ArrowBackIcon />}
//           size="lg"
//           disabled={openNext === 0}
//           onClick={handleBack}
//           sx={{
//             px: 5,
//             borderRadius: "xl",
//             fontWeight: 800,
//             background: "linear-gradient(135deg,#64748b,#475569)",
//             boxShadow: "0 12px 28px rgba(100,116,139,0.45)",
//             transition: "all 0.25s ease",
//             "&:hover": {
//               transform: "translateY(-2px)",
//               boxShadow: "0 16px 36px rgba(100,116,139,0.6)",
//             },
//           }}
//         >
//           Back
//         </Button>

//         <Button
//           endDecorator={<ArrowForwardIcon />}
//           size="lg"
//           onClick={handleNext}
//           sx={{
//             px: 5,
//             borderRadius: "xl",
//             fontWeight: 800,
//             background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
//             boxShadow: "0 12px 28px rgba(124,58,237,0.45)",
//             transition: "all 0.25s ease",
//             "&:hover": {
//               transform: "translateY(-2px)",
//               boxShadow: "0 16px 36px rgba(124,58,237,0.6)",
//             },
//           }}
//         >
//           {openNext === 3 ? "Finish" : "Next"}
//         </Button>
//       </Box>
//     </Card>
//   );
// };

// export default memo(AddDtails);



