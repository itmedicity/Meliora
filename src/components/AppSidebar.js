import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { ActionTyps } from 'src/redux/constants/action.type'
import { getMenuSlno } from 'src/views/Constant/Constant'
import CmTransactions from '../Menus/CmTransactions'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilHouse } from '@coreui/icons'
import { axioslogin } from 'src/views/Axios/Axios'
import { apsideBgclor } from 'src/color/Color'
import DietTransactions from '../Menus/DietTransactions'
import RmTransactions from '../Menus/RmTransaction'
import NurseStation from '../Menus/NurseStation'
import WeWorkTransact from '../Menus/WeWorkTransact'
import TimeEscalations from '../Menus/EscalationUtility'
import { Box, Typography } from '@mui/material'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.changeState.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.changeState.sidebarShow)
  const [nurseStation, setNurseStation] = useState()
  const [cmtransact, setCmTransact] = useState()
  const [diettransact, setDietTransact] = useState()
  const [rmtransact, setRmTransact] = useState()
  const [weworktransact, setweworktransact] = useState()
  const [escalation, setescalation] = useState()
  const [count, setCount] = useState(0)
  const [menu, setMenu] = useState([])

  //Side bar menus array
  const navigation = [
    //Home Menu
    {
      slno: 1,
      component: CNavItem,
      name: 'Home',
      to: '/Home',
      icon: <CIcon icon={cilHouse} customClassName="nav-icon" />
    },
    //Nursing Station Menu
    {
      slno: 11,
      component: CNavGroup,
      name: 'Nursing Station',
      items: nurseStation
    },
    //Complaint Management System Menu Start from Here
    {
      slno: 2,
      component: CNavGroup,
      name: 'Complaint Management',
      items: cmtransact
    },
    //Request Management System Menu Start from Here
    {
      slno: 3,
      component: CNavTitle,
      name: 'Central Request management',
    },
    //Room Management System Menu Start from Here
    {
      slno: 5,
      component: CNavGroup,
      name: 'Room Management',
      items: rmtransact
    },
    //Diet Management Menus
    {
      slno: 7,
      component: CNavGroup,
      name: 'Diet Management',
      items: diettransact
    },
    //We  Work Menu Start from Here
    {
      slno: 6,
      component: CNavGroup,
      name: 'We Work',
      items: weworktransact
    },
    {
      slno: 15,
      component: CNavGroup,
      name: 'Escalation',
      items: escalation
    },
  ]

  useEffect(() => {
    /*** get menus based on user rights */
    getMenuSlno().then((val) => {
      const resultLength = Object.keys(val[0])?.length ?? 0
      if (resultLength > 0) {
        const menuRitSlno = val[0];
        const menuSlnoAry = menuRitSlno.map((menu) => {
          return menu.menu_slno;
        })
        /*** check menus array and getMenuSlno array and returnuser rights given menus */
        const newNurseStation = NurseStation.filter(val => menuSlnoAry.includes(val.men_slno));
        setNurseStation(newNurseStation)
        const newCmTransaction = CmTransactions.filter(val => menuSlnoAry.includes(val.men_slno));
        setCmTransact(newCmTransaction)
        const newDietTransaction = DietTransactions.filter(val => menuSlnoAry.includes(val.men_slno));
        setDietTransact(newDietTransaction)
        const newRmTransaction = RmTransactions.filter(val => menuSlnoAry.includes(val.men_slno));
        setRmTransact(newRmTransaction)
        const weworkTransact = WeWorkTransact.filter(val => menuSlnoAry.includes(val.men_slno));
        setweworktransact(weworkTransact)
        const escalationTransact = TimeEscalations.filter(val => menuSlnoAry.includes(val.men_slno));
        setescalation(escalationTransact)
        setCount(1)
      }
    })

    const module_rights = []
    /***get modules based on login user's rights */
    const getModuleUserRight = async () => {
      const userinfo = sessionStorage.getItem('userDetl');
      const emp_no = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).empno : 0;
      const result = await axioslogin.get(`/common/getempid/${emp_no}`)
      const { success, data } = result.data
      if (success === 1) {
        const { em_id } = data[0]
        const postdata = {
          emp_slno: em_id
        }
        try {
          const result = await axioslogin.post('/common/getModlRight', postdata)
          const { success, data } = await result.data
          if (success === 1) {
            const moduleDetl = await JSON.parse(data[0].module_slno)
            const moduleSlno = Object.values(moduleDetl)
            moduleSlno.map((val) => module_rights.push(val))
            const menus = navigation.filter((element, index, array) => {
              return module_rights.includes(element.slno)
            })
            setMenu(menus)
          }
        } catch (err) {
        }

      }
    }
    getModuleUserRight()
  }, [count])

  const empname = useSelector((state) => {
    return state.LoginUserData.empname
  })
  const section = useSelector((state) => {
    return state.LoginUserData.empdeptsec
  })

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: ActionTyps.APP_SIDEBAR_SHOW, sidebarShow: visible })
      }}
      style={{ backgroundColor: apsideBgclor }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            textTransform: "capitalize"
          }}>
            <Typography sx={{ fontWeight: 500, color: '#e0f7fa' }} >
              {empname.toLowerCase()}
            </Typography>
          </Box>

          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }} >
            <Typography sx={{ color: '#e0f7fa', fontSize: 11 }} >
              {section}
            </Typography>
          </Box>
        </Box>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={menu} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: ActionTyps.APP_SIDEBAR_SHOW, sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar >
  )
}

export default React.memo(AppSidebar)
