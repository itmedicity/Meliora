import React, { Fragment, memo, useCallback, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { getCompanyDetails } from 'src/api/CommonApiCRF'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import CompanySelect from './CompanySelect'
import { Box, CssVarsProvider, Input, Typography } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CustomToolTipForCRF from 'src/views/CentralRequestManagement/ComonComponent/Components/CustomToolTipForCRF'
import SearchIcon from '@mui/icons-material/Search'
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
import ApprovalMappingTable from './ApprovalMappingTable'
import CustomCloseIconCmp from 'src/views/CentralRequestManagement/ComonComponent/Components/CustomCloseIconCmp'
import ModalButtomCmp from 'src/views/CentralRequestManagement/ComonComponent/Components/ModalButtomCmp'
import { useNavigate } from 'react-router-dom'

const ApprovalMappingMaster = () => {
  const history = useNavigate()
  const id = useSelector(state => {
    return state?.LoginUserData.empid
  })
  const [edit, setEdit] = useState(0)
  const [count, setCount] = useState(0)
  const [selectedCompany, setSelectedCompany] = useState(0)

  const {
    data: compData,
    isLoading: isCompLoading,
    error: compError
  } = useQuery({
    queryKey: 'getCompany',
    queryFn: () => getCompanyDetails(),
    staleTime: Infinity
  })
  const companyData = useMemo(() => compData, [compData])

  const [approvalState, setApprovalState] = useState({
    approval_slno: 0,
    mdStatus: false,
    edStatus: false,
    manageStatus: false,
    mdEmpId: '',
    edEmpId: '',
    manageEmpId: '',
    mdName: '',
    edName: '',
    manageName: '',
    mdNo: '',
    edNo: '',
    manageNo: '',
    mdFlag: 0,
    edFlag: 0,
    manageFlag: 0
  })
  const {
    approval_slno,
    mdStatus,
    edStatus,
    manageStatus,
    mdEmpId,
    edEmpId,
    manageEmpId,
    mdName,
    edName,
    manageName,
    mdNo,
    edNo,
    manageNo,
    mdFlag,
    edFlag,
    manageFlag
  } = approvalState
  const updateApproval = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setApprovalState({ ...approvalState, [e.target.name]: value })
    },
    [approvalState]
  )

  const searchMD = useCallback(() => {
    if (mdStatus === false) {
      infoNotify('Select CheckBox')
      return
    }
    if (mdNo === '') {
      infoNotify('Enter Employee Number')
    } else {
      const getempDetails = async () => {
        const result = await axioslogin.get(`/qideptAccess/emp/${mdNo}`)
        const { success, data, message } = result.data
        if (success === 1) {
          const { em_id, em_name } = data[0]
          setApprovalState(prev => ({
            ...prev,
            mdEmpId: em_id,
            mdName: em_name,
            mdFlag: 1
          }))
        } else {
          infoNotify(message)
        }
      }
      getempDetails()
    }
  }, [mdNo, mdStatus])

  const searchED = useCallback(() => {
    if (edStatus === false) {
      infoNotify('Select CheckBox')
      return
    }
    if (edNo === '') {
      infoNotify('Enter Employee Number')
    } else {
      const getempDetails = async () => {
        const result = await axioslogin.get(`/qideptAccess/emp/${edNo}`)
        const { success, data, message } = result.data
        if (success === 1) {
          const { em_id, em_name } = data[0]
          setApprovalState(prev => ({
            ...prev,
            edEmpId: em_id,
            edName: em_name,
            edFlag: 1
          }))
        } else {
          infoNotify(message)
        }
      }
      getempDetails()
    }
  }, [edNo, edStatus])

  const searchManage = useCallback(() => {
    if (manageStatus === false) {
      infoNotify('Select CheckBox')
      return
    }
    if (manageNo === '') {
      infoNotify('Enter Employee Number')
    } else {
      const getempDetails = async () => {
        const result = await axioslogin.get(`/qideptAccess/emp/${manageNo}`)
        const { success, data, message } = result.data
        if (success === 1) {
          const { em_id, em_name } = data[0]
          setApprovalState(prev => ({
            ...prev,
            manageEmpId: em_id,
            manageName: em_name,
            manageFlag: 1
          }))
        } else {
          infoNotify(message)
        }
      }
      getempDetails()
    }
  }, [manageNo, manageStatus])

  const postdata = useMemo(() => {
    return {
      company_slno: selectedCompany,
      medical_director_approve: mdStatus === true ? 1 : 0,
      medical_director_emid: mdStatus === true ? mdEmpId : 0,
      executive_director_approve: edStatus === true ? 1 : 0,
      executive_director_emid: edStatus === true ? edEmpId : 0,
      managing_director_approve: manageStatus === true ? 1 : 0,
      managing_director_emid: manageStatus === true ? manageEmpId : 0,
      create_user: id
    }
  }, [selectedCompany, mdStatus, edStatus, manageStatus, mdEmpId, edEmpId, manageEmpId, id])

  const patchdata = useMemo(() => {
    return {
      company_slno: selectedCompany,
      medical_director_approve: mdStatus === true ? 1 : 0,
      medical_director_emid: mdStatus === true ? mdEmpId : 0,
      executive_director_approve: edStatus === true ? 1 : 0,
      executive_director_emid: edStatus === true ? edEmpId : 0,
      managing_director_approve: manageStatus === true ? 1 : 0,
      managing_director_emid: manageStatus === true ? manageEmpId : 0,
      edit_user: id,
      approval_slno: approval_slno
    }
  }, [selectedCompany, mdStatus, edStatus, manageStatus, mdEmpId, edEmpId, manageEmpId, id, approval_slno])

  const reset = useCallback(() => {
    const formdata = {
      approval_slno: 0,
      mdStatus: false,
      edStatus: false,
      manageStatus: false,
      mdEmpId: '',
      edEmpId: '',
      manageEmpId: '',
      mdName: '',
      edName: '',
      manageName: '',
      mdNo: '',
      edNo: '',
      manageNo: '',
      mdFlag: 0,
      edFlag: 0,
      manageFlag: 0
    }
    setApprovalState(formdata)
    setEdit(0)
    setSelectedCompany(0)
  }, [])

  const submitCompanyName = useCallback(
    e => {
      if (selectedCompany === 0) {
        infoNotify('Select Company')
        return
      } else {
        e.preventDefault()
        const insertApprovalDetails = async postdata => {
          const result = await axioslogin.post('/approvalMapping/insert', postdata)
          const { message, success } = result.data
          if (success === 1) {
            succesNotify(message)
            setCount(count + 1)
            reset()
          } else if (success === 2) {
            infoNotify(message)
          } else {
            infoNotify(message)
          }
        }
        const updateApprovalDetails = async patchdata => {
          const result = await axioslogin.patch('/approvalMapping/update/edit', patchdata)
          const { message, success } = result.data
          if (success === 1) {
            succesNotify(message)
            setCount(count + 1)
            reset()
          } else if (success === 2) {
            infoNotify(message)
          } else {
            infoNotify(message)
          }
        }
        if (edit === 1) {
          updateApprovalDetails(patchdata)
        } else {
          insertApprovalDetails(postdata)
        }
      }
    },
    [selectedCompany, postdata, reset, count, patchdata, edit]
  )

  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    reset()
  }, [reset])

  const rowSelect = useCallback(val => {
    setEdit(1)
    const {
      approval_slno,
      company_slno,
      medical_director_approve,
      medical_director_emid,
      MD_em_no,
      MD_em_name,
      executive_director_approve,
      executive_director_emid,
      ED_em_no,
      ED_em_name,
      managing_director_approve,
      managing_director_emid,
      MA_em_no,
      MA_em_name
    } = val
    const formdata = {
      approval_slno: approval_slno,
      mdStatus: medical_director_approve === 1 ? true : false,
      edStatus: executive_director_approve === 1 ? true : false,
      manageStatus: managing_director_approve === 1 ? true : false,
      mdEmpId: medical_director_emid,
      edEmpId: executive_director_emid,
      manageEmpId: managing_director_emid,
      mdName: MD_em_name,
      edName: ED_em_name,
      manageName: MA_em_name,
      mdNo: MD_em_no,
      edNo: ED_em_no,
      manageNo: MA_em_no,
      mdFlag: medical_director_approve === 1 ? 1 : 0,
      edFlag: executive_director_approve === 1 ? 1 : 0,
      manageFlag: managing_director_approve === 1 ? 1 : 0
    }
    setApprovalState(formdata)
    setSelectedCompany(company_slno)
  }, [])

  if (isCompLoading) return <p>Loading...</p>
  if (compError) return <p>Error Occurred.</p>
  return (
    <Box sx={{ width: "100%" }}>
      {/* <CssVarsProvider> */}
      <Box sx={{ backgroundColor: '#f0f3f5', border: '1px solid #B4F5F0' }}>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: 0.5, color: '#385E72' }}>CRF Approval Mapping</Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, fontSize: 20, m: 0.5 }}>
            <CustomCloseIconCmp handleChange={backtoSetting} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', p: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: 600 }}>
              <CustomPaperTitle heading="Company" />
              <Box sx={{ pt: 0.5 }}>
                <CompanySelect
                  selectedCompany={selectedCompany}
                  setSelectedCompany={setSelectedCompany}
                  companyData={companyData}
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ border: '1px solid lightgrey', p: 3, mt: 0.5 }}>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ fontSize: 18, width: 200, pt: 0.5 }}>Medical Director</Typography>
              <Box sx={{ pt: 1, width: 10 }}>
                <CusCheckBox
                  color="primary"
                  size="md"
                  name="mdStatus"
                  value={mdStatus}
                  checked={mdStatus}
                  onCheked={updateApproval}
                ></CusCheckBox>
              </Box>
              {mdStatus === true ? (
                <>
                  <Box sx={{ width: 300, pl: 5 }}>
                    <TextFieldCustom
                      disabled={mdStatus === false}
                      placeholder="Employee No."
                      type="text"
                      size="md"
                      name="mdNo"
                      value={mdNo}
                      onchange={updateApproval}
                    />
                  </Box>
                  <Box sx={{ pt: 0.8, pl: 1, width: 50 }}>
                    <CssVarsProvider>
                      <CustomToolTipForCRF title="Search" placement="right">
                        <SearchIcon
                          sx={{ color: '#555830', cursor: 'pointer', height: 30, width: 30 }}
                          fontSize="large"
                          onClick={searchMD}
                        />
                      </CustomToolTipForCRF>
                    </CssVarsProvider>
                  </Box>
                  {mdFlag === 1 ? (
                    <Box sx={{ pt: 0.3, width: 300 }}>
                      <CssVarsProvider>
                        <Input
                          readOnly
                          size="sm"
                          name="mdName"
                          value={mdName}
                          sx={{ height: 35, fontWeight: 550, fontSize: 16 }}
                        />
                      </CssVarsProvider>
                    </Box>
                  ) : null}
                </>
              ) : null}
            </Box>
            <Box sx={{ display: 'flex', pt: 1 }}>
              <Typography sx={{ fontSize: 18, width: 200, pt: 0.5 }}>Executive Director</Typography>
              <Box sx={{ pt: 1, width: 10 }}>
                <CusCheckBox
                  color="primary"
                  size="md"
                  name="edStatus"
                  value={edStatus}
                  checked={edStatus}
                  onCheked={updateApproval}
                ></CusCheckBox>
              </Box>
              {edStatus === true ? (
                <>
                  <Box sx={{ width: 300, pl: 5 }}>
                    <TextFieldCustom
                      disabled={edStatus === false}
                      placeholder="Employee No."
                      type="text"
                      size="md"
                      name="edNo"
                      value={edNo}
                      onchange={updateApproval}
                    />
                  </Box>
                  <Box sx={{ pt: 0.8, pl: 1, width: 50 }}>
                    <CssVarsProvider>
                      <CustomToolTipForCRF title="Search" placement="right">
                        <SearchIcon
                          sx={{ color: '#555830', cursor: 'pointer', height: 30, width: 30 }}
                          fontSize="large"
                          onClick={searchED}
                        />
                      </CustomToolTipForCRF>
                    </CssVarsProvider>
                  </Box>
                  {edFlag === 1 ? (
                    <Box sx={{ pt: 0.3, width: 300 }}>
                      <CssVarsProvider>
                        <Input
                          readOnly
                          size="sm"
                          name="edName"
                          value={edName}
                          sx={{ height: 35, fontWeight: 550, fontSize: 16 }}
                        />
                      </CssVarsProvider>
                    </Box>
                  ) : null}
                </>
              ) : null}
            </Box>
            <Box sx={{ display: 'flex', pt: 1 }}>
              <Typography sx={{ fontSize: 18, width: 200, pt: 0.5 }}>Managing Director</Typography>
              <Box sx={{ pt: 1, width: 10 }}>
                <CusCheckBox
                  color="primary"
                  size="md"
                  name="manageStatus"
                  value={manageStatus}
                  checked={manageStatus}
                  onCheked={updateApproval}
                ></CusCheckBox>
              </Box>
              {manageStatus === true ? (
                <>
                  <Box sx={{ width: 300, pl: 5 }}>
                    <TextFieldCustom
                      disabled={manageStatus === false}
                      placeholder="Employee No."
                      type="text"
                      size="md"
                      name="manageNo"
                      value={manageNo}
                      onchange={updateApproval}
                    />
                  </Box>
                  <Box sx={{ pt: 0.8, pl: 1, width: 50 }}>
                    <CssVarsProvider>
                      <CustomToolTipForCRF title="Search" placement="right">
                        <SearchIcon
                          sx={{ color: '#555830', cursor: 'pointer', height: 30, width: 30 }}
                          fontSize="large"
                          onClick={searchManage}
                        />
                      </CustomToolTipForCRF>
                    </CssVarsProvider>
                  </Box>
                  {manageFlag === 1 ? (
                    <Box sx={{ pt: 0.3, width: 300 }}>
                      <CssVarsProvider>
                        <Input
                          readOnly
                          size="sm"
                          name="manageName"
                          value={manageName}
                          sx={{ height: 35, fontWeight: 550, fontSize: 16 }}
                        />
                      </CssVarsProvider>
                    </Box>
                  ) : null}
                </>
              ) : null}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', py: 0.2, pl: 1 }}>
        <Box sx={{ pr: 0.5 }}>
          <ModalButtomCmp handleChange={submitCompanyName}> Save</ModalButtomCmp>
        </Box>
        <Box sx={{ pr: 0.5 }}>
          <ModalButtomCmp handleChange={refreshWindow}> Refresh</ModalButtomCmp>
        </Box>
      </Box>
      <ApprovalMappingTable count={count} rowSelect={rowSelect} />
      {/* </CssVarsProvider> */}
    </Box>
  )
}

export default memo(ApprovalMappingMaster)
