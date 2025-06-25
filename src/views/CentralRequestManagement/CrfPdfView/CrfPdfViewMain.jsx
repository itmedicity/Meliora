import React from 'react'
import { useState, useCallback, useEffect, memo, Fragment } from 'react'
// import { use } from 'react-router-dom/cjs/react-router-dom.min'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { Box, Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import MasterDetailCompnt from '../ComonComponent/MasterDetailCompnt'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusIconButton from 'src/views/Components/CusIconButton'
import PdfButtonClick from './PdfButtonClick'

const CrfPdfViewMain = () => {
  /*** Initializing */
  const history = useNavigate()
  const [disData, setDisData] = useState([])
  useEffect(() => {
    const getReqForDownload = async () => {
      const result = await axioslogin.get('/CRFRegisterApproval/getAllForPdfView')
      const { success, data } = result.data
      if (success === 1) {
        const incharge = data.filter((val) => {
          return val.hod_req === 1 && val.crf_close !== 1 && val.incharge_approve === 1
        })
        const datas = incharge.map((val) => {
          const obj = {
            req_slno: val.req_slno,
            actual_requirement: val.actual_requirement,
            needed: val.needed,

            request_deptsec_slno: val.request_deptsec_slno,
            req_deptsec: val.req_deptsec.toLowerCase(),
            user_deptsection: val.user_deptsection.toLowerCase(),
            em_name: val.create_user.toLowerCase(),
            category: val.category,
            location: val.location,
            emergency_flag: val.emergency_flag,
            emer_type_name: val.emer_type_name,
            emer_slno: val.emer_slno,
            emer_type_escalation: val.emer_type_escalation,
            emergeny_remarks: val.emergeny_remarks,
            total_approx_cost: val.total_approx_cost,
            image_status: val.image_status,
            req_date: val.create_date,
            expected_date: val.expected_date,
            status: val.rm_ndrf === 1 ? 'NDRF' : 'CRF',
            crf_close: val.crf_close,
            crf_close_remark: val.crf_close_remark,
            crf_closed_one: val.crf_closed_one,
            close_date: val.close_date,
            closed_user: val.closed_user !== null ? val.closed_user.toLowerCase() : '',
            incharge_approve: val.incharge_approve,
            incharge_req: val.incharge_req,
            incharge:
              val.incharge_approve === 1
                ? 'Approved'
                : val.incharge_approve === 2
                ? 'Reject'
                : val.incharge_approve === 3
                ? 'On-Hold'
                : 'Not Done',
            incharge_remarks: val.incharge_remarks,
            inch_detial_analysis: val.inch_detial_analysis,
            incharge_remark: val.incharge_remarks !== null ? val.incharge_remarks : 'Not Updated',
            incharge_apprv_date: val.incharge_apprv_date,
            incharge_user: val.incharge_user !== null ? val.incharge_user.toLowerCase() : '',

            hod_req: val.hod_req,
            hod_approve: val.hod_approve,
            hod:
              val.hod_approve === 1
                ? 'Approved'
                : val.hod_approve === 2
                ? 'Reject'
                : val.hod_approve === 3
                ? 'On-Hold'
                : 'Not Done',
            hod_remarks: val.hod_remarks !== null ? val.hod_remarks : 'Not Done',
            hod_remark: val.hod_remarks,
            hod_detial_analysis: val.hod_detial_analysis,
            hod_approve_date: val.hod_approve_date,
            hod_user: val.hod_user !== null ? val.hod_user.toLowerCase() : '',

            dms_req: val.dms_req,
            dms_approve: val.dms_approve,
            dms:
              val.dms_approve === 1
                ? 'Approved'
                : val.dms_approve === 2
                ? 'Reject'
                : val.dms_approve === 3
                ? 'On-Hold'
                : 'Not Done',
            dms_remarks: val.dms_remarks !== null ? val.dms_remarks : 'Not Updated',
            dms_approve_date: val.dms_approve_date,
            dms_user: val.dms_user !== null ? val.dms_user.toLowerCase() : '',

            ms_approve_req: val.ms_approve_req,
            ms_approve: val.ms_approve,
            ms:
              val.ms_approve === 1
                ? 'Approved'
                : val.ms_approve === 2
                ? 'Reject'
                : val.ms_approve === 3
                ? 'On-Hold'
                : 'Not Done',
            ms_approve_remark:
              val.ms_approve_remark !== null ? val.ms_approve_remark : 'Not Updated',
            ms_approve_date: val.ms_approve_date,
            ms_approve_user: val.ms_approve_user !== null ? val.ms_approve_user.toLowerCase() : '',
            manag_operation_req: val.manag_operation_req,

            manag_operation_approv: val.manag_operation_approv,
            om:
              val.manag_operation_approv === 1
                ? 'Approved'
                : val.manag_operation_approv === 2
                ? 'Reject'
                : val.manag_operation_approv === 3
                ? 'On-Hold'
                : 'Not Done',
            manag_operation_remarks:
              val.manag_operation_remarks !== null ? val.manag_operation_remarks : 'Not Updated',
            om_approv_date: val.om_approv_date,
            manag_operation_user:
              val.manag_operation_user !== null ? val.manag_operation_user.toLowerCase() : '',

            senior_manage_approv: val.senior_manage_approv,
            smo:
              val.senior_manage_approv === 1
                ? 'Approved'
                : val.senior_manage_approv === 2
                ? 'Reject'
                : val.senior_manage_approv === 3
                ? 'On-Hold'
                : 'Not Done',
            senior_manage_remarks:
              val.senior_manage_remarks !== null ? val.senior_manage_remarks : 'Not Updated',
            som_aprrov_date: val.som_aprrov_date,
            senior_manage_user:
              val.senior_manage_user !== null ? val.senior_manage_user.toLowerCase() : '',
            gm_approve: val.gm_approve,
            gm:
              val.gm_approve === 1
                ? 'Approved'
                : val.gm_approve === 2
                ? 'Reject'
                : val.gm_approve === 3
                ? 'On-Hold'
                : 'Not Done',
            gm_approve_remarks:
              val.gm_approve_remarks !== null ? val.gm_approve_remarks : 'Not Updated',
            gm_approv_date: val.gm_approv_date,
            gm_user: val.gm_user !== null ? val.gm_user.toLowerCase() : '',

            md_approve: val.md_approve,
            md:
              val.md_approve === 1
                ? 'Approved'
                : val.md_approve === 2
                ? 'Reject'
                : val.md_approve === 3
                ? 'On-Hold'
                : 'Not Done',
            md_approve_remarks: val.md_approve_remarks,
            md_approve_date: val.md_approve_date,
            md_user: val.md_user !== null ? val.md_user.toLowerCase() : '',
            md_detial_analysis: val.md_detial_analysis,

            ed_approve: val.ed_approve,
            ed:
              val.ed_approve === 1
                ? 'Approved'
                : val.ed_approve === 2
                ? 'Reject'
                : val.ed_approve === 3
                ? 'On-Hold'
                : 'Not Done',
            ed_approve_remarks:
              val.ed_approve_remarks !== null ? val.ed_approve_remarks : 'Not Updated',
            ed_approve_date: val.ed_approve_date,
            ed_user: val.ed_user ? val.ed_user.toLowerCase() : '',
            ed_detial_analysis: val.ed_detial_analysis,
            edid: val.edid,
            mdid: val.mdid,
          }
          return obj
        })
        setDisData(datas)
      } else {
        warningNotify('Error occured contact EDP')
      }
    }
    getReqForDownload()
  }, [])

  //close button function
  const backtoSetting = useCallback(() => {
    history('/Home')
  }, [history])

  return (
    <Fragment>
      <Box sx={{ height: 35, backgroundColor: '#f0f3f5', display: 'flex' }}>
        <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: 0.5, color: '#385E72' }}>
          CRF For PDF Download
        </Box>
        <Box>
          <CusIconButton size="sm" variant="outlined" color="primary" onClick={backtoSetting}>
            <CloseIcon fontSize="small" />
          </CusIconButton>
        </Box>
      </Box>
      <Box sx={{ height: window.innerHeight - 150, overflow: 'auto' }}>
        {disData &&
          disData.map((val) => {
            return (
              <Box key={val.req_slno} sx={{ width: '100%' }}>
                <Paper
                  sx={{
                    width: '100%',
                    mt: 0.8,
                    border: '2 solid #272b2f',
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: 1,
                    backgroundColor: '#BBBCBC',
                  }}
                  variant="outlined"
                >
                  <MasterDetailCompnt val={val} />

                  <PdfButtonClick val={val} />
                </Paper>
              </Box>
            )
          })}
      </Box>
    </Fragment>
  )
}

export default memo(CrfPdfViewMain)
