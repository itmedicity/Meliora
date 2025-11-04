import { Grid } from '@mui/material'
import React, { useMemo, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import { Box } from '@mui/system'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import ModuleGroupTable from './ModuleGroupTable'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
const ModuleGroupMast = () => {
  const history = useNavigate()
  const [count, setCount] = useState(0)
  const [value, setvalue] = useState(0)
  /*** Initializing */
  const [moduleGroup, setModuleGroup] = useState({
    modulegrp_name: '',
    complaintManagement: false,
    requestmanag: false,
    assetmanag: false,
    roommanag: false,
    wework: false,
    diet: false,
    feedback: false,
    nabh: false,
    settings: false,
    nurseStation: false,
    sfanfa: false,
    reports: false,
    dashboard: false,
    escalation: false,
    hallbooking: false,
    task: false,
    itmanagement: false,
    dailycensus: false,
    incident: false,
    notification: false,
    amsModule: false,
    mod_grp_slno: 0,
    workorder: false,
    icubeds: false
  })
  /*** Destructuring */
  const {
    modulegrp_name,
    complaintManagement,
    requestmanag,
    assetmanag,
    roommanag,
    wework,
    diet,
    feedback,
    nabh,
    settings,
    sfanfa,
    nurseStation,
    reports,
    mod_grp_slno,
    dashboard,
    escalation,
    hallbooking,
    task,
    itmanagement,
    dailycensus,
    incident,
    notification,
    amsModule,
    workorder,
    icubeds
  } = moduleGroup

  /***Get values from the component */
  const updateModuleGroup = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setModuleGroup({ ...moduleGroup, [e.target.name]: value })
    },
    [moduleGroup]
  )

  /*** data for insert to module_group_mast table */
  const postdata = useMemo(() => {
    return {
      mod_grp_name: modulegrp_name,
      module_slno: {
        module_home: 1,
        module_complaint: complaintManagement === true ? 2 : 0,
        module_request: requestmanag === true ? 3 : 0,
        module_asset: assetmanag === true ? 4 : 0,
        module_room: roommanag === true ? 5 : 0,
        module_wework: wework === true ? 6 : 0,
        module_diet: diet === true ? 7 : 0,
        module_feedback: feedback === true ? 8 : 0,
        module_nabh: nabh === true ? 9 : 0,
        module_settings: settings === true ? 10 : 0,
        module_nursestation: nurseStation === true ? 11 : 0,
        module_sfanfa: sfanfa === true ? 12 : 0,
        module_reports: reports === true ? 13 : 0,
        module_dashboard: dashboard === true ? 14 : 0,
        module_escalation: escalation === true ? 15 : 0,
        module_hallbooking: hallbooking === true ? 16 : 0,
        module_task: task === true ? 17 : 0,
        module_it: itmanagement === true ? 18 : 0,
        module_dailycensus: dailycensus === true ? 19 : 0,
        module_incident: incident === true ? 20 : 0,
        module_notification: notification === true ? 24 : 0,
        module_ams: amsModule === true ? 25 : 0,
        module_workorder: workorder === true ? 26 : 0,
        module_icubeds: icubeds === true ? 27 : 0
      }
    }
  }, [
    modulegrp_name,
    complaintManagement,
    requestmanag,
    assetmanag,
    roommanag,
    escalation,
    wework,
    diet,
    feedback,
    settings,
    nabh,
    sfanfa,
    nurseStation,
    reports,
    dashboard,
    hallbooking,
    task,
    itmanagement,
    dailycensus,
    incident,
    notification,
    amsModule,
    workorder,
    icubeds
  ])

  /*** data for  update to module_group_mast table */
  const patchdata = useMemo(() => {
    return {
      mod_grp_name: modulegrp_name,
      module_slno: {
        module_home: 1,
        module_complaint: complaintManagement === true ? 2 : 0,
        module_request: requestmanag === true ? 3 : 0,
        module_asset: assetmanag === true ? 4 : 0,
        module_room: roommanag === true ? 5 : 0,
        module_wework: wework === true ? 6 : 0,
        module_diet: diet === true ? 7 : 0,
        module_feedback: feedback === true ? 8 : 0,
        module_nabh: nabh === true ? 9 : 0,
        module_settings: settings === true ? 10 : 0,
        module_nursestation: nurseStation === true ? 11 : 0,
        module_sfanfa: sfanfa === true ? 12 : 0,
        module_reports: reports === true ? 13 : 0,
        module_dashboard: dashboard === true ? 14 : 0,
        module_escalation: escalation === true ? 15 : 0,
        module_hallbooking: hallbooking === true ? 16 : 0,
        module_task: task === true ? 17 : 0,
        module_it: itmanagement === true ? 18 : 0,
        module_dailycensus: dailycensus === true ? 19 : 0,
        module_incident: incident === true ? 20 : 0,
        module_notification: notification === true ? 24 : 0,
        module_ams: amsModule === true ? 25 : 0,
        module_workorder: workorder === true ? 26 : 0,
        module_icubeds: icubeds === true ? 27 : 0,
      },
      mod_grp_slno: mod_grp_slno
    }
  }, [
    modulegrp_name,
    complaintManagement,
    requestmanag,
    escalation,
    assetmanag,
    roommanag,
    wework,
    diet,
    feedback,
    nabh,
    settings,
    sfanfa,
    mod_grp_slno,
    nurseStation,
    reports,
    dashboard,
    hallbooking,
    task,
    itmanagement,
    dailycensus,
    incident,
    notification,
    amsModule,
    workorder,
    icubeds
  ])

  // data setting for edit
  const rowSelect = useCallback(data => {
    setvalue(1)
    const datas = data.api.getSelectedRows()
    const { mod_grp_slno, mod_grp_name, module_slno } = datas[0]
    const module_status = JSON.parse(module_slno)
    const formdata = {
      modulegrp_name: mod_grp_name,
      complaintManagement: module_status.module_complaint === 0 ? false : true,
      requestmanag: module_status.module_request === 0 ? false : true,
      assetmanag: module_status.module_asset === 0 ? false : true,
      roommanag: module_status.module_room === 0 ? false : true,
      wework: module_status.module_wework === 0 ? false : true,
      diet: module_status.module_diet === 0 ? false : true,
      feedback: module_status.module_feedback === 0 ? false : true,
      nabh: module_status.module_nabh === 0 ? false : true,
      sfanfa: module_status.module_sfanfa === 0 ? false : true,
      nurseStation: module_status.module_nursestation === 0 ? false : true,
      reports: module_status.module_reports === 0 ? false : true,
      settings: module_status.module_settings === 0 ? false : true,
      mod_grp_slno: mod_grp_slno,
      dashboard: module_status.module_dashboard === 0 ? false : true,
      escalation: module_status.module_escalation === 0 ? false : true,
      hallbooking: module_status.module_hallbooking === 0 ? false : true,
      task: module_status.module_task === 0 ? false : true,
      itmanagement: module_status.module_it === 0 ? false : true,
      dailycensus: module_status.module_dailycensus === 0 ? false : true,
      incident: module_status.module_incident === 0 ? false : true,
      notification: module_status.module_notification === 0 ? false : true,
      amsModule: module_status.module_ams === 0 ? false : true,
      module_workorder: module_status.workorder === true ? 26 : 0,
      icubeds: module_status.icubeds === 0 ? false : true
    }
    setModuleGroup(formdata)
  }, [])
  /*** usecallback function for form submitting */
  const submitModuleGroup = useCallback(
    e => {
      e.preventDefault()
      /*** form reset after insert or update */
      const formreset = {
        modulegrp_name: '',
        complaintManagement: false,
        requestmanag: false,
        assetmanag: false,
        roommanag: false,
        wework: false,
        diet: false,
        feedback: false,
        nabh: false,
        settings: false,
        sfanfa: false,
        nurseStation: false,
        reports: false,
        escalation: false,
        hallbooking: false,
        task: false,
        itmanagement: false,
        dailycensus: false,
        incident: false,
        notification: false,
        amsModule: false,
        workorder: false,
        icubeds: false
      }
      /***     * insert function for use call back     */
      const InsertFun = async postdata => {
        const result = await axioslogin.post('/modulegroup', postdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          setModuleGroup(formreset)
          setvalue(0)
        } else if (success === 0) {
          infoNotify(message.sqlMessage)
        } else {
          infoNotify(message)
        }
      }
      /*** * update function for use call back     */
      const updateFun = async patchdata => {
        const result = await axioslogin.patch('/modulegroup', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
          setModuleGroup(formreset)
          setvalue(0)
        } else if (success === 0) {
          infoNotify(message.sqlMessage)
        } else {
          infoNotify(message)
        }
      }
      /*** value=0 insert api call work else update call
       * value initialy '0' when edit button click value changes to '1'
       */
      if (value === 0) {
        InsertFun(postdata)
      } else {
        updateFun(patchdata)
      }
    },
    [postdata, patchdata, value, count]
  )
  //back to home
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  //refresh textfields
  const refereshWindow = useCallback(() => {
    const frmreset = {
      modulegrp_name: '',
      complaintManagement: false,
      requestmanag: false,
      assetmanag: false,
      roommanag: false,
      wework: false,
      diet: false,
      feedback: false,
      nabh: false,
      sfanfa: false,
      settings: false,
      nurseStation: false,
      reports: false,
      dashboard: false,
      escalation: false,
      hallbooking: false,
      task: false,
      itmanagement: false,
      dailycensus: false,
      incident: false,
      notification: false,
      amsModule: false,
      workorder: false,
      icubeds: false
    }
    setModuleGroup(frmreset)
    setvalue(0)
  }, [setModuleGroup])

  return (
    <CardMaster title="Module Group Master" submit={submitModuleGroup} close={backtoSetting} refresh={refereshWindow}>
      <Box sx={{ p: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={4} lg={4}>
            <Box sx={{ p: 1 }}>
              <TextFieldCustom
                placeholder="Module Group Name"
                type="text"
                size="sm"
                name="modulegrp_name"
                value={modulegrp_name}
                onchange={updateModuleGroup}
              />
            </Box>
            <Box sx={{ p: 1 }}>
              <Grid container spacing={1}>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="Complaint Management"
                    color="primary"
                    size="md"
                    name="complaintManagement"
                    variant="outlined"
                    value={complaintManagement}
                    checked={complaintManagement}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="Central Request Management"
                    color="primary"
                    size="md"
                    name="requestmanag"
                    variant="outlined"
                    value={requestmanag}
                    checked={requestmanag}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="Asset Management"
                    color="primary"
                    size="md"
                    name="assetmanag"
                    variant="outlined"
                    value={assetmanag}
                    checked={assetmanag}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="Room Management"
                    color="primary"
                    size="md"
                    name="roommanag"
                    variant="outlined"
                    value={roommanag}
                    checked={roommanag}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="We Work"
                    color="primary"
                    size="md"
                    name="wework"
                    variant="outlined"
                    value={wework}
                    checked={wework}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="Diet"
                    color="primary"
                    size="md"
                    name="diet"
                    variant="outlined"
                    value={diet}
                    checked={diet}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="Feed Back"
                    color="primary"
                    size="md"
                    name="feedback"
                    variant="outlined"
                    value={feedback}
                    checked={feedback}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="Quality Indicator"
                    color="primary"
                    size="md"
                    name="nabh"
                    variant="outlined"
                    value={nabh}
                    checked={nabh}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="Settings"
                    color="primary"
                    size="md"
                    name="settings"
                    variant="outlined"
                    value={settings}
                    checked={settings}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="SFANFA"
                    color="primary"
                    size="md"
                    name="sfanfa"
                    variant="outlined"
                    value={sfanfa}
                    checked={sfanfa}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="Nursing Station"
                    color="primary"
                    size="md"
                    name="nurseStation"
                    variant="outlined"
                    value={nurseStation}
                    checked={nurseStation}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="Reports"
                    color="primary"
                    size="md"
                    name="reports"
                    variant="outlined"
                    value={reports}
                    checked={reports}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="Dash Board"
                    color="primary"
                    size="md"
                    name="dashboard"
                    variant="outlined"
                    value={dashboard}
                    checked={dashboard}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="Escalation"
                    color="primary"
                    size="md"
                    name="escalation"
                    variant="outlined"
                    value={escalation}
                    checked={escalation}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="Hall Booking"
                    color="primary"
                    size="md"
                    name="hallbooking"
                    variant="outlined"
                    value={hallbooking}
                    checked={hallbooking}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="Task Management"
                    color="primary"
                    size="md"
                    name="task"
                    variant="outlined"
                    value={task}
                    checked={task}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="IT Management"
                    color="primary"
                    size="md"
                    name="itmanagement"
                    variant="outlined"
                    value={itmanagement}
                    checked={itmanagement}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="Daily Census"
                    color="primary"
                    size="md"
                    name="dailycensus"
                    variant="outlined"
                    value={dailycensus}
                    checked={dailycensus}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="Incident Module"
                    color="primary"
                    size="md"
                    name="incident"
                    variant="outlined"
                    value={incident}
                    checked={incident}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="Notification Module"
                    color="primary"
                    size="md"
                    name="notification"
                    variant="outlined"
                    value={notification}
                    checked={notification}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="Ams Module"
                    color="primary"
                    size="md"
                    name="amsModule"
                    variant="outlined"
                    value={amsModule}
                    checked={amsModule}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="Work Order"
                    color="primary"
                    size="md"
                    name="workorder"
                    variant="outlined"
                    value={workorder}
                    checked={workorder}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
                <Grid item xl={12} lg={12}>
                  <CusCheckBox
                    label="Icu Beds"
                    color="primary"
                    size="md"
                    name="icubeds"
                    variant="outlined"
                    value={icubeds}
                    checked={icubeds}
                    onCheked={updateModuleGroup}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xl={8} lg={8}>
            <ModuleGroupTable count={count} rowSelect={rowSelect} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}

export default ModuleGroupMast
