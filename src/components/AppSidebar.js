import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
// import { AppSidebarNav } from './AppSidebarNav'
// import SimpleBar from 'simplebar-react'
// import 'simplebar/dist/simplebar.min.css'
// import { ActionTyps } from 'src/redux/constants/action.type'
import { getMenuSlno } from 'src/views/Constant/Constant'
import CmTransactions from '../Menus/CmTransactions'
import { axioslogin } from 'src/views/Axios/Axios'
// import DietTransactions from '../Menus/DietTransactions'
import RmTransactions from '../Menus/RmTransaction'
import TaskTransaction from 'src/Menus/TaskTransaction'
import AmTransactions from 'src/Menus/AmTransaction'
import ITTransactions from 'src/Menus/ItTransaction'
import CrmNewTransaction from 'src/Menus/CrmNewTransaction'
import QualityTransactions from 'src/Menus/QualityTransaction'
import DailyCensusTransactions from 'src/Menus/CensusTransaction'
import IncidentTransactions from 'src/Menus/IncidentTransaction'
import FeedbackTransactions from 'src/Menus/FeddbackTransaction'
import { getDefaultCompany } from 'src/api/CommonApiCRF'
import { useQuery } from 'react-query'
import NotificationTransaction from 'src/Menus/NotificationTransaction'
import AmsTransaction from 'src/Menus/AmsTransaction'
import { CgClose } from 'react-icons/cg'

// --------------------------

// import AspectRatio from '@mui/joy/AspectRatio'
import Box from '@mui/joy/Box'
import Drawer from '@mui/joy/Drawer'
// import Button from '@mui/joy/Button'
// import Card from '@mui/joy/Card'
// import CardContent from '@mui/joy/CardContent'
// import Checkbox from '@mui/joy/Checkbox'
// import DialogTitle from '@mui/joy/DialogTitle'
import DialogContent from '@mui/joy/DialogContent'
// import ModalClose from '@mui/joy/ModalClose'
import Divider from '@mui/joy/Divider'
// import FormControl from '@mui/joy/FormControl'
// import FormLabel from '@mui/joy/FormLabel'
// import FormHelperText from '@mui/joy/FormHelperText'
// import List from '@mui/joy/List'
// import ListItem from '@mui/joy/ListItem'
import Stack from '@mui/joy/Stack'
// import RadioGroup from '@mui/joy/RadioGroup'
// import Radio from '@mui/joy/Radio'
import Sheet from '@mui/joy/Sheet'
// import Switch from '@mui/joy/Switch'
import Typography from '@mui/joy/Typography'
// import TuneIcon from '@mui/icons-material/TuneRounded'
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
// import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded'
// import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded'
// import HotelRoundedIcon from '@mui/icons-material/HotelRounded'
// import Done from '@mui/icons-material/Done'

// import { IoReturnDownBack } from 'react-icons/io5'
import { IconButton, Tooltip } from '@mui/joy'
import MLogoIcon from 'src/assets/MLogoIcon'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'

// import { HiHome } from 'react-icons/hi2'
import { HiTicket } from 'react-icons/hi2'
import { RiDashboardHorizontalFill } from 'react-icons/ri'
// import { MdDevicesOther } from 'react-icons/md'
import { TbDeviceImacCog } from 'react-icons/tb'
import { FcGenealogy } from 'react-icons/fc'
import { FcComboChart } from 'react-icons/fc'
import { FcEngineering } from 'react-icons/fc'
import { FcMultipleDevices } from 'react-icons/fc'
import { FcInspection } from 'react-icons/fc'
import { FcBullish } from 'react-icons/fc'
import { MdRoomPreferences } from 'react-icons/md'
import { FcAdvertising } from 'react-icons/fc'
import { GiMedicines } from 'react-icons/gi'
import { VscSignOut } from 'react-icons/vsc'

import TMCHLogo from '../assets/Svg/tmch_logo.svg'

const AppSidebar = ({ collapsed, setCollapsed }) => {
  const navigation = useNavigate()
  const [openMenuIndex, setOpenMenuIndex] = useState(null)

  // const [open, setOpen] = useState(true)
  // const [type, setType] = useState('Guesthouse')
  // const [amenities, setAmenities] = useState([0, 6])

  // const dispatch = useDispatch()
  // const unfoldable = useSelector(state => state.changeState.sidebarUnfoldable)
  // const sidebarShow = useSelector(state => state.changeState.sidebarShow)
  // const [nurseStation, setNurseStation] = useState()
  const [cmtransact, setCmTransact] = useState()
  // const [crmtransact, setCrmTransact] = useState()
  const [crmnewtransact, setCrmNewTransact] = useState()
  // const [diettransact, setDietTransact] = useState()
  const [rmtransact, setRmTransact] = useState()
  const [amtransact, setAmTransact] = useState()
  // const [weworktransact, setweworktransact] = useState()
  // const [escalation, setescalation] = useState()
  // const [hallbooking, setHallBooking] = useState()
  const [tasktransact, setTaskTransact] = useState()
  const [itmanagement, setItManagement] = useState()
  const [qualityTransact, setQualityTransact] = useState()
  const [censusTransact, setCensusTransact] = useState()
  const [incidentTransact, setIncidentTransact] = useState()
  const [feedbackTransact, setFeedbackTransact] = useState()
  const [NotificationTransact, setNotificationTransact] = useState()
  const [AmsTransact, setAmsTransact] = useState()

  const [count, setCount] = useState(0)
  const [setMenu] = useState([])

  const {
    data: companyData,
    isLoading: isCompLoading,
    error: compError,
  } = useQuery({
    queryKey: 'getdefaultCompany',
    queryFn: () => getDefaultCompany(),
    staleTime: Infinity,
  })
  const company = useMemo(() => companyData, [companyData])
  //for name change in the crm menus
  useEffect(() => {
    if (companyData) {
      // Dynamically update the name fields in CrmNewTransaction
      const updatedCrmNewTransaction = CrmNewTransaction?.map(item => {
        switch (item.men_slno) {
          case 190:
            item.name = company?.incharge_name ? company?.incharge_name : 'Incharge Approval'
            break
          case 191:
            item.name = company?.hod_name ? company?.hod_name : 'HOD Approval'
            break
          case 192:
            item.name = company?.dms_name ? company?.dms_name : 'DMS Approval'
            break
          case 193:
            item.name = company?.ms_name ? company?.ms_name : 'MS Approval'
            break
          case 194:
            item.name = company?.mo_name ? company?.mo_name : 'CRF Documentation'
            break
          case 195:
            item.name = company?.smo_name ? company?.smo_name : 'CRF Verification'
            break
          case 196:
            item.name = company?.gmo_name ? company?.gmo_name : 'GM Operations Approval'
            break
          case 197:
            item.name = company?.md_name ? company?.md_name : 'MD Approval'
            break
          case 198:
            item.name = company?.ed_name ? company?.ed_name : 'ED Approval'
            break
          case 253:
            item.name = company?.managing_director
              ? company?.managing_director
              : 'Managing Director Approval'
            break
          default:
            break
        }
        return item
      })

      setCrmNewTransact(updatedCrmNewTransaction) // Set the updated array
    }
  }, [companyData]) // Re-run when companyData changes

  //Side bar menus array
  const navigationMenus = [
    //Home Menu
    // {
    //   slno: 1,
    //   // component: CNavItem,
    //   name: 'Home',
    //   to: '/Home',
    //   route: '/Home',
    //   icon: <HiHome color="var(--true-blue-800)" />,
    //   // icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
    // },
    //Nursing Station Menu
    // {
    //   slno: 11,
    //   component: CNavGroup,
    //   name: 'Nursing Station',
    //   items: nurseStation
    // },
    //Complaint Management System Menu Start from Here
    {
      slno: 2,
      // component: CNavGroup,
      name: 'Ticket Management',
      items: cmtransact,
      route: '/ComplaintManagement',
      icon: <HiTicket color="var(--true-blue-800)" />,
    },
    //Request Management System Menu Start from Here
    // {
    //   slno: 3,
    //   component: CNavGroup,
    //   name: 'Request management',
    //   items: crmtransact
    // },

    {
      slno: 15,
      // component: CNavGroup,
      name: 'Central Request management',
      items: crmnewtransact,
      route: '/Home',
      icon: <RiDashboardHorizontalFill color="var(--true-blue-800)" />,
    },

    //Room Management System Menu Start from Here
    {
      slno: 5,
      // component: CNavGroup,
      name: 'Room Management',
      items: rmtransact,
      route: '/Home',
      icon: <MdRoomPreferences color="var(--true-blue-800)" />,
    },
    //Asset Management System Menu Start from Here
    {
      slno: 4,
      // component: CNavGroup,
      name: 'Asset Management',
      items: amtransact,
      route: '/Home',
      icon: <TbDeviceImacCog color="var(--true-blue-800)" />,
    },
    // //Diet Management Menus
    // {
    //   slno: 7,
    //   component: CNavGroup,
    //   name: 'Diet Management',
    //   items: diettransact
    // },
    //We  Work Menu Start from Here
    // {
    //   slno: 6,
    //   component: CNavGroup,
    //   name: 'We Work',
    //   items: weworktransact
    // },
    // {
    //   slno: 15,
    //   component: CNavGroup,
    //   name: 'Escalation',
    //   items: escalation
    // },
    // {
    //   slno: 16,
    //   component: CNavGroup,
    //   name: 'Hall Booking',
    //   items: hallbooking
    // },

    {
      slno: 17,
      // component: CNavGroup,
      name: 'Task Management',
      items: tasktransact,
      route: '/Home',
      icon: <FcGenealogy />,
    },
    {
      slno: 18,
      // component: CNavGroup,
      name: 'Information Technology',
      items: itmanagement,
      route: '/Home',
      icon: <FcComboChart />,
    },
    {
      slno: 9,
      // component: CNavGroup,
      name: 'Quality Indicator',
      items: qualityTransact,
      route: '/Home',
      icon: <FcEngineering />,
    },

    {
      slno: 19,
      // component: CNavGroup,
      name: 'Daily Census',
      items: censusTransact,
      route: '/Home',
      icon: <FcMultipleDevices />,
    },
    {
      slno: 20,
      // component: CNavGroup,
      name: 'Incident Management',
      items: incidentTransact,
      route: '/Home',
      icon: <FcInspection />,
    },
    {
      slno: 8,
      // component: CNavGroup,
      name: 'Feedback Management',
      items: feedbackTransact,
      route: '/Home',
      icon: <FcBullish />,
    },
    {
      slno: 24,
      // component: CNavGroup,
      name: 'Notification',
      items: NotificationTransact,
      route: '/Home',
      icon: <FcAdvertising />,
    },
    {
      slno: 25,
      // component: CNavGroup,
      name: 'Ams',
      items: AmsTransact,
      route: '/Home',
      icon: <GiMedicines color="var(--true-blue-800)" />,
    },
  ]

  useEffect(() => {
    /*** get menus based on user rights */
    getMenuSlno().then(val => {
      const resultLength = Object.keys(val[0])?.length ?? 0
      if (resultLength > 0) {
        const menuRitSlno = val[0]
        const menuSlnoAry = menuRitSlno.map(menu => {
          return menu.menu_slno
        })
        /*** check menus array and getMenuSlno array and returnuser rights given menus */
        // const newNurseStation = NurseStation.filter(val => menuSlnoAry.includes(val.men_slno));
        // setNurseStation(newNurseStation)
        const newCmTransaction = CmTransactions.filter(val => menuSlnoAry.includes(val.men_slno))
        setCmTransact(newCmTransaction)
        // const newCrmTransaction = CrmTransactions.filter(val => menuSlnoAry.includes(val.men_slno));
        // setCrmTransact(newCrmTransaction)
        const newCrmNewTransaction = CrmNewTransaction.filter(val =>
          menuSlnoAry.includes(val.men_slno)
        )
        setCrmNewTransact(newCrmNewTransaction)
        // const newDietTransaction = DietTransactions.filter(val => menuSlnoAry.includes(val.men_slno));
        // setDietTransact(newDietTransaction)
        const newRmTransaction = RmTransactions.filter(val => menuSlnoAry.includes(val.men_slno))
        setRmTransact(newRmTransaction)
        const newAmTransaction = AmTransactions.filter(val => menuSlnoAry.includes(val.men_slno))
        setAmTransact(newAmTransaction)
        // const weworkTransact = WeWorkTransact.filter(val => menuSlnoAry.includes(val.men_slno));
        // setweworktransact(weworkTransact)
        // const escalationTransact = TimeEscalations.filter(val => menuSlnoAry.includes(val.men_slno));
        // setescalation(escalationTransact)
        // const hallBookingTransact = HallBookingTrans.filter(val => menuSlnoAry.includes(val.men_slno));
        // setHallBooking(hallBookingTransact)
        const TaskManageTransact = TaskTransaction.filter(val => menuSlnoAry.includes(val.men_slno))
        setTaskTransact(TaskManageTransact)
        const ItManageTransact = ITTransactions.filter(val => menuSlnoAry.includes(val.men_slno))
        setItManagement(ItManageTransact)
        const QualityIndTransact = QualityTransactions.filter(val =>
          menuSlnoAry.includes(val.men_slno)
        )
        setQualityTransact(QualityIndTransact)
        const DailyCensusTransact = DailyCensusTransactions.filter(val =>
          menuSlnoAry.includes(val.men_slno)
        )
        setCensusTransact(DailyCensusTransact)
        const IncidentTransact = IncidentTransactions.filter(val =>
          menuSlnoAry.includes(val.men_slno)
        )
        setIncidentTransact(IncidentTransact)
        const FeedbackTransact = FeedbackTransactions.filter(val =>
          menuSlnoAry.includes(val.men_slno)
        )
        setFeedbackTransact(FeedbackTransact)
        const NotificationTransact = NotificationTransaction.filter(val =>
          menuSlnoAry.includes(val.men_slno)
        )
        setNotificationTransact(NotificationTransact)

        const AmsTransact = AmsTransaction.filter(val => menuSlnoAry.includes(val.men_slno))
        setAmsTransact(AmsTransact)

        setCount(1)
      }
    })

    const module_rights = []
    /***get modules based on login user's rights */
    const getModuleUserRight = async () => {
      const userinfo = localStorage.getItem('app_auth')
      const emp_no = userinfo ? atob(JSON.parse(localStorage.getItem('app_auth'))?.authEmpNo) : 0
      const result = await axioslogin.get(`/common/getempid/${emp_no}`)
      const { success, data } = result.data
      if (success === 1) {
        const { em_id } = data[0]
        const postdata = {
          emp_slno: em_id,
        }
        try {
          const result = await axioslogin.post('/common/getModlRight', postdata)
          const { success, data } = await result.data
          if (success === 1) {
            const moduleDetl = await JSON.parse(data[0].module_slno)
            const moduleSlno = Object.values(moduleDetl)
            moduleSlno.map(val => module_rights.push(val))
            const menus = navigationMenus.filter(element => {
              return module_rights.includes(element.slno)
            })
            setMenu(menus)
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
    getModuleUserRight()
  }, [count])

  const empname = useSelector(state => {
    return state.LoginUserData.empname
  })
  const section = useSelector(state => {
    return state.LoginUserData.empdeptsec
  })
  if (isCompLoading) return <p>Loading...</p>
  if (compError) return <p>Error occurred.</p>

  // ----------------------

  const handleMenuClick = index => {
    if (openMenuIndex === index) {
      setOpenMenuIndex(null) // collapse if already open
    } else {
      setOpenMenuIndex(index) // open the clicked one
    }
  }

  return (
    // <CSidebar
    //   position="fixed"
    //   unfoldable={unfoldable}
    //   visible={sidebarShow}
    //   onVisibleChange={(visible) => {
    //     dispatch({ type: ActionTyps.APP_SIDEBAR_SHOW, sidebarShow: visible })
    //   }}
    //   style={{ backgroundColor: apsideBgclor }}
    // >
    //   <CSidebarBrand className="d-none d-md-flex" to="/">
    //     <Box>
    //       <Box sx={{
    //         display: 'flex',
    //         justifyContent: 'space-between',
    //         textTransform: "capitalize"
    //       }}>
    //         <Typography sx={{ fontWeight: 500, color: '#e0f7fa' }} >
    //           {empname.toLowerCase()}
    //         </Typography>
    //       </Box>

    //       <Box sx={{
    //         display: 'flex',
    //         justifyContent: 'space-between',
    //       }} >
    //         <Typography sx={{ color: '#e0f7fa', fontSize: 11 }} >
    //           {section}
    //         </Typography>
    //       </Box>
    //     </Box>
    //   </CSidebarBrand>
    //   <CSidebarNav>
    //     <SimpleBar>
    //       <AppSidebarNav items={menu} />
    //     </SimpleBar>
    //   </CSidebarNav>
    //   <CSidebarToggler
    //     className="d-none d-lg-flex"
    //     onClick={() => dispatch({ type: ActionTyps.APP_SIDEBAR_SHOW, sidebarUnfoldable: !unfoldable })}
    //   />
    // </CSidebar >
    // <Box>App Sidebar</Box>
    <>
      {/* <Box
        sx={{
          display: 'flex',
          backgroundColor: 'red',
          flexGrow: 1,
          // width: 800,
        }}
      >
        sdfsdfsdfds
      </Box> */}
      <Drawer
        size="md"
        variant="plain"
        hideBackdrop
        open={collapsed}
        onClose={() => setCollapsed(!collapsed)}
        slotProps={{
          content: {
            sx: {
              width: 'var(--drawer-width)',
              flexShrink: 0,
              bgcolor: 'transparent',
              p: { md: 3, sm: 0 },
              boxShadow: 'none',
            },
          },
        }}
      >
        <Sheet
          sx={{
            borderRadius: 'lg',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            height: '100%',
            overflow: 'auto',
            border: '1.8px solid',
            borderColor: 'var(--royal-purple-400)',
            backgroundColor: '#fff',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 2, alignItems: 'center' }}>
              <MLogoIcon width={50} height={50} />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: 16,
                    lineHeight: 1.2,
                    color: 'var(--royal-purple-300)',
                    fontFamily: 'var(--roboto-font)',
                  }}
                >
                  {empname
                    ?.toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 15,
                    color: 'var(--royal-purple-300)',
                    fontFamily: 'var(--roboto-font)',
                  }}
                >
                  {section
                    ?.toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </Typography>
              </Box>
            </Box>

            <IconButton variant="outlined" onClick={() => setCollapsed(!collapsed)}>
              <CgClose size={20} />
            </IconButton>
          </Box>
          {/* <ModalClose /> */}
          <Divider sx={{ mt: 'auto', bgcolor: 'var(--royal-purple-400)' }} />
          <DialogContent sx={{ gap: 2 }}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0.1, // make it subtle
                zIndex: 1,
              }}
            >
              <img src={TMCHLogo} alt="logo" width={300} height={300} />
            </Box>
            {/* Menu list content here */}
            {/* <MLogoIcon width={50} height={50} /> */}
            {navigationMenus.map((item, index) => (
              <Fragment key={index}>
                {/* <CssVarsProvider> */}
                <MenuItem onClick={() => handleMenuClick(index)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    disableTypography={true}
                    sx={{
                      color: 'var(--dark-gray)',
                      fontFamily: 'var(--roboto-font)',
                      fontWeight: 400,
                      fontSize: 14.5,
                    }}
                  >
                    {item.name}
                  </ListItemText>
                </MenuItem>

                {openMenuIndex === index &&
                  item.items &&
                  item.items.map((subItem, subIndex) => (
                    <MenuItem
                      key={subIndex}
                      sx={{ pl: 5 }} // indent submenu
                      onClick={() => {
                        navigation(subItem.to)
                        setCollapsed(!collapsed)
                        setOpenMenuIndex(null)
                      }}
                    >
                      <ListItemIcon sx={{ color: 'var(--rose-pink-300)' }}>
                        {subItem.icon}
                      </ListItemIcon>
                      <ListItemText
                        disableTypography={true}
                        sx={{
                          color: 'var(--light-gray)',
                          fontFamily: 'var(--roboto-font)',
                          fontWeight: 400,
                          fontSize: 13.5,
                        }}
                      >
                        {subItem.name}
                      </ListItemText>
                    </MenuItem>
                  ))}
                {/* </CssVarsProvider> */}
              </Fragment>
            ))}
          </DialogContent>

          <Divider sx={{ mt: 'auto', bgcolor: 'var(--royal-purple-400)' }} />
          <Stack direction="row" useFlexGap spacing={1} sx={{ justifyContent: 'space-between' }}>
            <Box></Box>
            <Tooltip
              title="Exit from the Application"
              arrow
              placement="right"
              variant="outlined"
              color="danger"
            >
              <IconButton
                variant="outlined"
                sx={{ color: 'var(--rose-pink-400)' }}
                onClick={() => {}}
              >
                <VscSignOut size={20} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Sheet>
      </Drawer>
    </>
  )
}

export default memo(AppSidebar)
