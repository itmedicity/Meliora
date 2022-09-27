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
import { cilPuzzle, cilSpeedometer } from '@coreui/icons'
import CmUtilities from '../Menus/CmUtilities'
import { axioslogin } from 'src/views/Axios/Axios'
import { apsideBgclor } from 'src/color/Color'
import DietTransactions from '../Menus/DietTransactions'
import RmTransactions from '../Menus/RmTransaction'
import RmUtilities from '../Menus/RmUtilities'
import NurseStation from '../Menus/NurseStation'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.changeState.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.changeState.sidebarShow)
  const [nurseStation, setNurseStation] = useState()
  const [cmtransact, setCmTransact] = useState()
  const [cmutilities, setUtilities] = useState()
  const [diettransact, setDietTransact] = useState()
  const [rmtransact, setRmTransact] = useState()
  const [rmutilities, setRmUtilities] = useState()
  const [count, setCount] = useState(0)
  const [menu, setMenu] = useState([])

  //Side bar menus array
  const navigation = [
    {
      slno: 1,
      component: CNavItem,
      name: 'Home',
      to: '/Home',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />

    },
    {
      slno: 11,
      component: CNavGroup,
      name: 'Nursing Station',
      // icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: nurseStation
    },
    //Complaint Management System Menu Start from Here
    {
      slno: 2,
      component: CNavTitle,
      name: 'Complaint Management',
    },
    {
      slno: 2,
      component: CNavGroup,
      name: 'Transaction',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: cmtransact
    },
    {
      slno: 2,
      component: CNavGroup,
      name: 'Utilities',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: cmutilities
    },
    //Request Management System Menu Start from Here
    {
      slno: 3,
      component: CNavTitle,
      name: 'Central Request management',
    },
    //Room Management System Menu Start from Here
    {
      slno: 4,
      component: CNavTitle,
      name: 'Asset Management',
    },
    //Room Management System Menu Start from Here
    {
      slno: 5,
      component: CNavTitle,
      name: 'Room Management',
    },
    {
      slno: 5,
      component: CNavGroup,
      name: 'Transaction',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: rmtransact
    },
    {
      slno: 5,
      component: CNavGroup,
      name: 'Utilities',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: rmutilities
    },
    //Request Management System Menu Start from Here
    {
      slno: 7,
      component: CNavGroup,
      name: 'Diet Management',
      items: diettransact
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
        const newCmUtilities = CmUtilities.filter(val => menuSlnoAry.includes(val.men_slno));
        setUtilities(newCmUtilities)
        const newDietTransaction = DietTransactions.filter(val => menuSlnoAry.includes(val.men_slno));
        setDietTransact(newDietTransaction)
        const newRmTransaction = RmTransactions.filter(val => menuSlnoAry.includes(val.men_slno));
        setRmTransact(newRmTransaction)
        const newRmUtilities = RmUtilities.filter(val => menuSlnoAry.includes(val.men_slno));
        setRmUtilities(newRmUtilities)
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
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
