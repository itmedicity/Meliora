import { Box, CssVarsProvider, Option, Select } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
import CardMaster from 'src/views/Components/CardMaster'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import DeptSectionSelect from 'src/views/CommonSelectCode/DeptSectionSelect'
import DeptSectionSelectkmc from 'src/views/CommonSelectCode/DeptSectionSelectkmc'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { getDptSecHodbyDep, getDptSecHodbyDepkmc } from 'src/api/CommonApiCRF'
import { useQuery } from 'react-query'
import DepMappingTable from './DepMappingTable'
import { useNavigate } from 'react-router-dom'

const DepartmentMaping = () => {
  const [crfdept, setCrfDept] = useState(0)
  const [crfdeptKmc, setCrfDeptKmc] = useState(0)
  const history = useNavigate()
  const [HodId, setHodId] = useState(0)
  const [InchargeId, setInchargeId] = useState(0)
  const [HodIdkmc, setHodIdkmc] = useState(0)
  const [InchargeIdkmc, setInchargeIdkmc] = useState(0)
  const [count, setCount] = useState(0)

  const refreshWindow = useCallback(() => {
    // setCategory([])
  }, [])
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])

  // submit data
  const submit = useCallback(
    async () => {
      const postData = {
        dept: crfdept,
        crfdeptKmc: crfdeptKmc,
        HodId: HodId,
        InchargeId: InchargeId,
        HodIdkmc: HodIdkmc,
        InchargeIdkmc: InchargeIdkmc,
      }
      const result = await axioslogin.post('/newCRFRegister/DepartmentMapping', postData)
      const { success, message } = result.data
      if (success === 1) {
        succesNotify('Data Inserted Sucessfully')
        setCount(1)
        setCrfDept(0)
        setCrfDeptKmc(0)
        setHodId(0)
        setInchargeId(0)
        setHodIdkmc(0)
        setInchargeIdkmc(0)
      } else if (success === 0) {
        warningNotify(message)
      } else {
        warningNotify('Something Went Wrong')
      }
    },
    [crfdept, crfdeptKmc, HodId, InchargeId, HodIdkmc, InchargeIdkmc, setCount]
  )
  const {
    data: authData,
    isLoading: isAuthLoading,
    error: authError,
  } = useQuery({
    queryKey: ['authDepSecListHodbyDep ', crfdept],
    queryFn: () => getDptSecHodbyDep(crfdept),
    staleTime: Infinity,
  })
  const {
    data: authDatakmc,
    isLoading: isAuthLoadingkmc,
    error: authErrorkmc,
  } = useQuery({
    queryKey: ['authDepSecListHodbyDepkmc ', crfdeptKmc],
    queryFn: () => getDptSecHodbyDepkmc(crfdeptKmc),
    staleTime: Infinity,
  })

  useEffect(() => {
    if (authData && authData.length > 0) {
      const defaultHod = authData.find(item => item.auth_post === 2)
      if (defaultHod) {
        setHodId(defaultHod?.emp_id)
      } else {
        setHodId(0)
      }
      const defaultincharge = authData.find(item => item.auth_post === 1)
      if (defaultincharge) {
        setInchargeId(defaultincharge?.emp_id)
      } else {
        setInchargeId(0)
      }
    }

    if (authDatakmc && authDatakmc.length > 0) {
      const defaultHod = authDatakmc.find(item => item.auth_post === 2)
      if (defaultHod) {
        setHodIdkmc(defaultHod?.emp_id)
      } else {
        setHodIdkmc(0)
      }
      const defaultincharge = authDatakmc.find(item => item.auth_post === 1)
      if (defaultincharge) {
        setInchargeIdkmc(defaultincharge?.emp_id)
      } else {
        setInchargeIdkmc(0)
      }
    }
  }, [authData, authDatakmc])

  if (isAuthLoading || isAuthLoadingkmc) return <p>Loading...</p>
  if (authErrorkmc || authError) return <p>Error occurred.</p>
  return (
    <CssVarsProvider>
      <CardMaster
        title="Department Mapping KMC"
        submit={submit}
        close={backtoSetting}
        refresh={refreshWindow}
      >
        <Box sx={{}}>
          <CustomPaperTitle heading="TMC Department" />
        </Box>
        <Box sx={{ px: 1, pt: 0.2, flex: 1.5, width: '50%', mt: 1 }}>
          <DeptSectionSelect setValue={setCrfDept} value={crfdept} />
        </Box>
        <Box sx={{}}>
          <CustomPaperTitle heading="TMC Department HOD" />
        </Box>
        <Box sx={{ px: 1, pt: 0.2, flex: 1.5, width: '50%', mt: 1 }}>
          <Select
            id="demo-simple-select"
            value={HodId}
            disabled={true}
            size="small"
            variant="outlined"
            sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
          >
            <Option value={0} disabled>
              Hod Name
            </Option>
            {authData &&
              authData?.map((val, index) => (
                <Option key={index} value={val.emp_id}>
                  {val.em_name}
                </Option>
              ))}
          </Select>
        </Box>
        <Box sx={{}}>
          <CustomPaperTitle heading="TMC Department Incharge" />
        </Box>
        <Box sx={{ px: 1, pt: 0.2, flex: 1.5, width: '50%', mt: 1 }}>
          <Select
            id="demo-simple-select"
            value={InchargeId}
            disabled={true}
            size="small"
            variant="outlined"
            sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
          >
            <Option value={0} disabled>
              Incharge Name
            </Option>
            {authData &&
              authData?.map((val, index) => (
                <Option key={index} value={val.emp_id}>
                  {val.em_name}
                </Option>
              ))}
          </Select>
        </Box>
        <Box sx={{ mt: 1 }}>
          <CustomPaperTitle heading="KMC Department" />
        </Box>
        <Box sx={{ px: 1, pt: 0.2, flex: 1.5, width: '50%', mt: 1 }}>
          <DeptSectionSelectkmc setValue={setCrfDeptKmc} value={crfdeptKmc} />
        </Box>
        <Box sx={{}}>
          <CustomPaperTitle heading="KMC Department HOD" />
        </Box>
        <Box sx={{ px: 1, pt: 0.2, flex: 1.5, width: '50%', mt: 1 }}>
          <Select
            id="demo-simple-select"
            value={HodIdkmc}
            disabled={true}
            size="small"
            variant="outlined"
            sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
          >
            <Option value={0} disabled>
              Hod Name
            </Option>
            {authDatakmc &&
              authDatakmc?.map((val, index) => (
                <Option key={index} value={val.emp_id}>
                  {val.em_name}
                </Option>
              ))}
          </Select>
        </Box>
        <Box sx={{}}>
          <CustomPaperTitle heading="KMC Department Incharge" />
        </Box>
        <Box sx={{ px: 1, pt: 0.2, flex: 1.5, width: '50%', mt: 1 }}>
          <Select
            id="demo-simple-select"
            value={InchargeIdkmc}
            disabled={true}
            size="small"
            variant="outlined"
            sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
          >
            <Option value={0} disabled>
              Hod Name
            </Option>
            {authDatakmc &&
              authDatakmc?.map((val, index) => (
                <Option key={index} value={val.emp_id}>
                  {val.em_name}
                </Option>
              ))}
          </Select>
        </Box>

        <Box sx={{ width: '100%', p: 1 }}>
          <DepMappingTable setCount={setCount} count={count} />
        </Box>
      </CardMaster>
    </CssVarsProvider>
  )
}

export default memo(DepartmentMaping)
