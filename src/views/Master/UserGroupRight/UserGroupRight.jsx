import { Box, Grid } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import CusIconButton from '../../Components/CusIconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import UserGroupSelect from 'src/views/CommonSelectCode/UserGroupSelect'
import ModuleSelect from 'src/views/CommonSelectCode/ModuleSelect'
import { useCallback } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import SubModuleGroup from 'src/views/CommonSelectCode/SubModuleGroup'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'

const UserGroupRight = () => {
  //Initializing
  const history = useNavigate()
  const [usergp, setUsergrp] = useState(0)
  const [modulename, setModule] = useState(0)
  const [subModule, setSubModule] = useState(0)
  const [tabledata, setTabledata] = useState([])
  const [render, setRender] = useState(0)
  const [update, setupdate] = useState(0)
  const [frmdata, setFrmdaat] = useState({
    group_right_slno: 0,
    menu_view: 0,
    user_group_slno: 0,
  })
  //Destructuring
  const { group_right_slno, user_group_slno, menu_view } = frmdata
  /*** data dispaly in agGrid */
  const [column] = useState([
    { headerName: 'slno', field: 'menu_slno' },
    { headerName: 'Menu Name', field: 'menu_name' },
    {
      headerName: 'Action',
      width: 2,
      cellRenderer: dataa => {
        return (
          <CheckCircleOutlinedIcon
            size="small"
            color={dataa.data.menu_view === 1 ? 'primary' : 'secondary'}
            onClick={e => onclickk(dataa.data)}
          />
        )
      },
    },
  ])

  /***When icon click the corresponding feild data get in click function and then destructure it for further update */
  const onclickk = e => {
    const { menu_slno, group_right_slno, menu_view } = e
    const frm = {
      menu_slno: menu_slno,
      group_right_slno: group_right_slno,
      menu_view: menu_view,
      user_group_slno: user_group_slno,
    }
    setFrmdaat(frm)
    setupdate(1)
  }
  //Enable edit
  const columnTypes = {
    nonEditableColumn: { editable: false },
  }
  //post data for search
  const postdata = useMemo(() => {
    return {
      user_group_slno: usergp,
      module_slno: modulename,
      sub_module_slno: subModule,
    }
  }, [usergp, modulename, subModule])

  useEffect(() => {
    if (render !== 0) {
      /*** first check menu is insert into table user_group_right if it is inserted return menus
       * otherwise first menu inserted into table. Newly inserted datas menu_view set as 0
       */
      const getmeus = async postdata => {
        const result = await axioslogin.post('/usergroup/rights/getMenu', postdata)
        const { success, data } = result.data
        if (success === 1) {
          setTabledata(data)
        } else {
          setTabledata()
          warningNotify('No Menus are under selected module')
        }
      }
      getmeus(postdata)
    } else {
      setRender(0)
    }
  }, [postdata, render])

  /*** get menus from table its under selected module */
  const search = useCallback(
    e => {
      e.preventDefault()
      if (usergp !== 0 && modulename !== 0 && subModule !== 0) {
        setRender(1)
      } else {
        warningNotify('Please Select User Group And Module')
      }
    },
    [usergp, modulename, subModule]
  )
  // update data
  const patchdata = useMemo(() => {
    return {
      group_right_slno: group_right_slno,
      menu_view: menu_view === 0 ? 1 : 0,
      user_group_slno: usergp,
      sub_module_slno: subModule,
      module_slno: modulename,
    }
  }, [group_right_slno, menu_view, usergp, modulename, subModule])

  /*** when proceess button click data insert to user right table */
  const getdata = useCallback(() => {
    if (update !== 0) {
      const frmreset = {
        group_right_slno: 0,
        menu_view: 0,
        user_group_slno: 0,
      }
      const updatefunc = async patchdata => {
        const result = await axioslogin.patch('/usergroup/rights', patchdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setRender(render + 1)
          setFrmdaat(frmreset)
          setupdate(0)
        } else if (success === 0) {
          infoNotify(message.sqlMessage)
        } else {
          infoNotify(message)
        }
      }
      updatefunc(patchdata)
    }
  }, [patchdata, render, update])

  //back to home
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])

  return (
    <CardMaster title="User Group Rights" close={backtoSetting}>
      <Box sx={{ pl: 2, pt: 2, pb: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={3} lg={3}>
            <UserGroupSelect value={usergp} setValue={setUsergrp} />
          </Grid>
          <Grid item xl={3} lg={3}>
            <ModuleSelect value={modulename} setValue={setModule} />
          </Grid>
          <Grid item xl={3} lg={3}>
            <SubModuleGroup value={subModule} setValue={setSubModule} module={modulename} />
          </Grid>
          <Box sx={{ pt: 0.4, pl: 2 }}>
            <Grid container spacing={5}>
              <Grid item lg={1} xl={1}>
                <CustomeToolTip title="Search" placement="left">
                  <Box>
                    <CusIconButton
                      size="sm"
                      variant="outlined"
                      color="primary"
                      clickable="true"
                      onClick={search}
                    >
                      <SearchOffIcon fontSize="small" />
                    </CusIconButton>
                  </Box>
                </CustomeToolTip>
              </Grid>
              <Grid item lg={1} xl={1}>
                <CustomeToolTip title="Close" placement="left">
                  <Box>
                    <CusIconButton
                      size="sm"
                      variant="outlined"
                      color="primary"
                      clickable="true"
                      onClick={backtoSetting}
                    >
                      <CloseIcon fontSize="small" />
                    </CusIconButton>
                  </Box>
                </CustomeToolTip>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Box>
      <Box sx={{ pl: 2, pr: 2, pb: 2 }}>
        {render !== 0 ? (
          <CusAgGridForMain
            columnDefs={column}
            tableData={tabledata}
            onSelectionChanged={getdata}
            columnTypes={columnTypes}
          />
        ) : null}
      </Box>
    </CardMaster>
  )
}

export default UserGroupRight
