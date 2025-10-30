import { Box, Typography, } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CondemApprovalLevelTable from './CondemApprovalLevelTable'
import { useDispatch, useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CondemCheckboxList from './CondemCheckboxList'
import AmDeptSecLocationSelect from 'src/views/CommonSelectCode/AmDeptSecLocationSelect'
import EmployeeSelectJoyAutoComp from 'src/views/CommonSelectCode/EmployeeSelectJoyAutoComp'
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action'
import { getDeptsection } from 'src/redux/actions/DeptSection.action'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getActiveCondemnationLevels } from 'src/api/AssetApis'


const CondemApprovalLevelMast = () => {

  const history = useNavigate()
  const dispatch = useDispatch();
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [deptSec, setDeptSec] = useState(0)
  const [employee, setEmployee] = useState(0)
  const [levelsForView, setlevelsForView] = useState([])
  const [levelsforApprove, setlevelsforApprove] = useState([])
  const [condemn_level_slno, setcondemn_level_slno] = useState(0)
  const [initialLevelNo, setInitialLevelNo] = useState(null);
  const queryClient = useQueryClient()

  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })

  const [approvalLevels, setApprovalLevels] = useState({
    level_slno: '',
    level_no: '',
    level_name: '',
    level_status: false,
  })

  const { level_slno, level_no, level_name, level_status } = approvalLevels

  const updateApprovalLevels = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setApprovalLevels({ ...approvalLevels, [e.target.name]: value })
    },
    [approvalLevels],
  )

  const postdata = useMemo(() => {
    return {
      level_no: level_no,
      level_name: level_name,
      level_status: level_status === true ? 1 : 0,
      emp_id: employee,
      create_user: id,
      levels_approved_for_view: levelsForView,
      levels_approved_for_approve: levelsforApprove
    }
  }, [level_no, level_name, level_status, id, levelsForView, levelsforApprove, employee])


  const patchdata = useMemo(() => {
    return {
      level_no: level_no,
      level_slno: level_slno,
      level_name: level_name,
      level_status: level_status === true ? 1 : 0,
      emp_id: employee,
      edit_user: id,
      levels_approved_for_view: levelsForView,
      levels_approved_for_approve: levelsforApprove,
      condemn_level_slno: condemn_level_slno
    }
  }, [level_no, level_slno, level_name, level_status, levelsForView, levelsforApprove, id, condemn_level_slno, employee])


  useEffect(() => {
    dispatch(getDeptsection())
  }, [dispatch])

  useEffect(() => {
    if (deptSec !== 0) {
      dispatch(getDepartSecemployee(deptSec))
    }
  }, [deptSec, dispatch])

  const { data: ActiveCondemnationLevel } = useQuery({
    queryKey: ['getAllActiveCondemnLevel'],
    queryFn: () => getActiveCondemnationLevels()
  })

  const activeLevels = useMemo(() => ActiveCondemnationLevel || [], [ActiveCondemnationLevel])

  const rowSelect = useCallback((params) => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { level_slno, level_no, level_name, level_status, levels_approved_for_view, levels_approved_for_approve, condemn_level_slno, sec_id, em_id } = data[0]

    const frmdata = {
      level_slno: level_slno,
      level_no: level_no,
      level_name: level_name,
      level_status: level_status === 1 ? true : false,
    }
    setApprovalLevels(frmdata)
    setlevelsForView(levels_approved_for_view)
    setlevelsforApprove(levels_approved_for_approve)
    setcondemn_level_slno(condemn_level_slno)
    setInitialLevelNo(level_no);
    setDeptSec(sec_id)
    setEmployee(em_id)
  }, [])



  const refreshWindow = useCallback(() => {
    const frmdata = {
      level_slno: '',
      level_no: '',
      level_name: '',
      level_status: false,
    }
    setApprovalLevels(frmdata)
    setValue(0)
    setCount(0)
    setlevelsForView([]);
    setlevelsforApprove([]);
    setDeptSec(0)
    setEmployee(0)
  }, [setApprovalLevels])

  const submitapprovalLevels = useCallback(
    (e) => {
      e.preventDefault()
      const InsertapprovalLevels = async (postdata) => {
        const result = await axioslogin.post('/condemApprovalLevel/insertLevel', postdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          queryClient.invalidateQueries('getAllCondemnationLevel')
          queryClient.invalidateQueries('getAllCondemnActiveApprovalLevel')

          refreshWindow()
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      const approvalLevelsUpdate = async (patchdata) => {
        const result = await axioslogin.patch('/condemApprovalLevel/updateLevel', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          queryClient.invalidateQueries('getAllCondemnationLevel')
          queryClient.invalidateQueries('getAllCondemnActiveApprovalLevel')
          refreshWindow()
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }

      if (level_no === '') {
        infoNotify("Please enter scrap level number");
        return;
      }

      // If the level_no hasn't changed, skip the duplicate check
      const levelNoChanged = initialLevelNo !== level_no;

      const isDuplicate = activeLevels?.some((item) => {
        const itemLevelNo = Number(item.level_no);
        const itemSlno = Number(item.level_slno);
        if (value === 0) {
          return itemLevelNo === Number(level_no);
        } else {
          return levelNoChanged && itemLevelNo === Number(level_no) && itemSlno !== Number(level_slno);
        }
      });

      if (isDuplicate) {
        infoNotify("Level Number already exists");
        return;
      }
      if (value === 0) {
        if (level_name !== '' && level_no !== '') {
          InsertapprovalLevels(postdata)
        }
        else {
          infoNotify("Please Enter level Number and Level Name")
        }
      }
      else {
        approvalLevelsUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count, level_name, level_no, queryClient],
  )

  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])




  return (
    <Box sx={{ flexGrow: 1 }}>
      <CardMaster
        title='Condemnation Approval Levels'
        close={backtoSetting}
        submit={submitapprovalLevels}
        refresh={refreshWindow}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', gap: .5, flexWrap: 'wrap' }}>



          <TextFieldCustom
            style={{ width: 150 }}
            startDecorator={"Level No. "}
            type='number'
            size="sm"
            value={level_no}
            name='level_no'
            onchange={updateApprovalLevels}
          />
          <TextFieldCustom
            style={{ width: 300 }}
            placeholder="Level Name"
            type="text"
            name="level_name"
            size="sm"
            value={level_name}
            onchange={updateApprovalLevels}
          />

          <Box sx={{ width: 300 }}>
            <AmDeptSecLocationSelect location={deptSec} setLocation={setDeptSec} />
          </Box>

          <Box sx={{ width: 300 }}>
            <EmployeeSelectJoyAutoComp employee={employee} setEmployee={setEmployee} />
          </Box>
          <Box sx={{ mt: 1, ml: 2 }}>
            <CusCheckBox
              label="Level Active Status"
              color="primary"
              size="md"
              name="level_status"
              value={level_status}
              checked={level_status}
              onCheked={updateApprovalLevels}
            ></CusCheckBox>
          </Box>
        </Box>

        <Typography sx={{ fontWeight: 500, fontSize: 13, py: 1.5 }}>
          Enable Viewing of Submission After Approval from Required Levels
        </Typography>
        <CondemCheckboxList
          activeLevels={activeLevels}
          setSelectedLevels={setlevelsForView}
          selectedLevels={levelsForView}
        />
        <Typography sx={{ fontWeight: 500, fontSize: 13, pt: 2, pb: 1 }}>
          Approve Submission Only After Required Levels Have Approved
        </Typography>
        <CondemCheckboxList
          activeLevels={activeLevels}
          setSelectedLevels={setlevelsforApprove}
          selectedLevels={levelsforApprove}
        />

      </CardMaster >

      <Box sx={{ flex: 2, }}>
        <CondemApprovalLevelTable count={count} rowSelect={rowSelect} />
      </Box>
    </Box>
  )
}

export default memo(CondemApprovalLevelMast)