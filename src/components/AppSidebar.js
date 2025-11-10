import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { getMenuSlno } from 'src/views/Constant/Constant'
import CmTransactions from '../Menus/CmTransactions'
import { axioslogin } from 'src/views/Axios/Axios'
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
import NotificationTransaction from 'src/Menus/NotificationTransaction'
import AmsTransaction from 'src/Menus/AmsTransaction'
import WorkOrder from 'src/Menus/WorkOrder'
// import LabResultTransaction from 'src/Menus/LabResultTransaction'
import { CgClose } from 'react-icons/cg'
// --------------------------
import Box from '@mui/joy/Box'
import Drawer from '@mui/joy/Drawer'
import DialogContent from '@mui/joy/DialogContent'
import Divider from '@mui/joy/Divider'
import Stack from '@mui/joy/Stack'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import { IconButton, Tooltip } from '@mui/joy'
import MLogoIcon from 'src/assets/MLogoIcon'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { HiTicket } from 'react-icons/hi2'
import { RiDashboardHorizontalFill } from 'react-icons/ri'
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
import { FaBedPulse } from "react-icons/fa6";
import TMCHLogo from '../assets/Svg/tmch_logo.svg'
import { useQuery } from '@tanstack/react-query'
import IcuTransaction from 'src/Menus/IcuTransaction'
// import { FaSyringe } from "react-icons/fa6";
import { MdPattern } from "react-icons/md";
import TMCHLogo from '../assets/Svg/tmch_logo.svg'
import { useQuery } from '@tanstack/react-query'
import DeviceCredentialTransactions from 'src/Menus/DeviceCredentialTransactions'

const AppSidebar = ({ collapsed, setCollapsed }) => {
  const navigation = useNavigate()
  const [openMenuIndex, setOpenMenuIndex] = useState(null)
  const [cmtransact, setCmTransact] = useState()
  const [crmnewtransact, setCrmNewTransact] = useState()
  const [rmtransact, setRmTransact] = useState()
  const [amtransact, setAmTransact] = useState()
  const [tasktransact, setTaskTransact] = useState()
  const [itmanagement, setItManagement] = useState()
  const [qualityTransact, setQualityTransact] = useState()
  const [censusTransact, setCensusTransact] = useState()
  const [incidentTransact, setIncidentTransact] = useState()
  const [feedbackTransact, setFeedbackTransact] = useState()
  const [NotificationTransact, setNotificationTransact] = useState()
  const [AmsTransact, setAmsTransact] = useState()
  const [Workorder, setWorkOrder] = useState()
  const [icuTransact, setIcuTransact] = useState()
  // const [labresultTransact, setLabResultTransact] = useState()
  const [deviceCredentials, setDeviceCredentials] = useState()
 const [count, setCount] = useState(0)
  const [menu, setMenu] = useState([])

  const {
    data: companyData,
    isLoading: isCompLoading,
    error: compError
  } = useQuery({
    queryKey: 'getdefaultCompany',
    queryFn: () => getDefaultCompany(),
    staleTime: Infinity
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
            item.name = company?.managing_director ? company?.managing_director : 'Managing Director Approval'
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
    //Complaint Management System Menu Start from Here
    {
      slno: 2,
      // component: CNavGroup,
      name: 'Ticket Management',
      items: cmtransact,
      route: '/ComplaintManagement',
      icon: <HiTicket color="var(--true-blue-800)" />
    },
    {
      slno: 15,
      // component: CNavGroup,
      name: 'Central Request management',
      items: crmnewtransact,
      route: '/Home',
      icon: <RiDashboardHorizontalFill color="var(--true-blue-800)" />
    },
    {
      slno: 5,
      // component: CNavGroup,
      name: 'Room Management',
      items: rmtransact,
      route: '/Home',
      icon: <MdRoomPreferences color="var(--true-blue-800)" />
    },
    //Asset Management System Menu Start from Here
    {
      slno: 4,
      // component: CNavGroup,
      name: 'Asset Management',
      items: amtransact,
      route: '/Home',
      icon: <TbDeviceImacCog color="var(--true-blue-800)" />
    },
    {
      slno: 17,
      // component: CNavGroup,
      name: 'Task Management',
      items: tasktransact,
      route: '/Home',
      icon: <FcGenealogy />
    },
    {
      slno: 18,
      // component: CNavGroup,
      name: 'Information Technology',
      items: itmanagement,
      route: '/Home',
      icon: <FcComboChart />
    },
    {
      slno: 9,
      // component: CNavGroup,
      name: 'Quality Indicator',
      items: qualityTransact,
      route: '/Home',
      icon: <FcEngineering />
    },

    {
      slno: 19,
      // component: CNavGroup,
      name: 'Daily Census',
      items: censusTransact,
      route: '/Home',
      icon: <FcMultipleDevices />
    },
    {
      slno: 20,
      // component: CNavGroup,
      name: 'Incident Management',
      items: incidentTransact,
      route: '/Home',
      icon: <FcInspection />
    },
    {
      slno: 8,
      // component: CNavGroup,
      name: 'Feedback Management',
      items: feedbackTransact,
      route: '/Home',
      icon: <FcBullish />
    },
    {
      slno: 24,
      // component: CNavGroup,
      name: 'Notification',
      items: NotificationTransact,
      route: '/Home',
      icon: <FcAdvertising />
    },
    {
      slno: 25,
      // component: CNavGroup,
      name: 'Ams',
      items: AmsTransact,
      route: '/Home',
      icon: <GiMedicines color="var(--true-blue-800)" />
    },
    {
      slno: 26,
      // component: CNavGroup,
      name: 'Work Order',
      items: Workorder,
      route: '/Home',
      icon: <GiMedicines />
    },
    {
      slno: 27,
      name: 'ICU Bed',
      items: icuTransact,
      route: '/IcuDashboard',
      icon: <FaBedPulse color="var(--true-blue-800)" />
    },
    // {
    //   slno: 28,
    //   name: 'Lab Results',
    //   items: labresultTransact,
    //   route: '/IcuDashboard',
    //   icon: <FaSyringe color="var(--true-blue-800)" />
    // }
        {
      slno: 29,
      name: 'Device Credentials',
      items: deviceCredentials,
      route: '/Home',
      icon: <MdPattern />
    }
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
        const newCmTransaction = CmTransactions.filter(val => menuSlnoAry.includes(val.men_slno))
        setCmTransact(newCmTransaction)
        const newCrmNewTransaction = CrmNewTransaction.filter(val => menuSlnoAry.includes(val.men_slno))
        setCrmNewTransact(newCrmNewTransaction)
        const newRmTransaction = RmTransactions.filter(val => menuSlnoAry.includes(val.men_slno))
        setRmTransact(newRmTransaction)
        const newAmTransaction = AmTransactions.filter(val => menuSlnoAry.includes(val.men_slno))
        setAmTransact(newAmTransaction)
        const TaskManageTransact = TaskTransaction.filter(val => menuSlnoAry.includes(val.men_slno))
        setTaskTransact(TaskManageTransact)
        const ItManageTransact = ITTransactions.filter(val => menuSlnoAry.includes(val.men_slno))
        setItManagement(ItManageTransact)
        const QualityIndTransact = QualityTransactions.filter(val => menuSlnoAry.includes(val.men_slno))
        setQualityTransact(QualityIndTransact)
        const DailyCensusTransact = DailyCensusTransactions.filter(val => menuSlnoAry.includes(val.men_slno))
        setCensusTransact(DailyCensusTransact)
        const IncidentTransact = IncidentTransactions.filter(val => menuSlnoAry.includes(val.men_slno))
        setIncidentTransact(IncidentTransact)
        const FeedbackTransact = FeedbackTransactions.filter(val => menuSlnoAry.includes(val.men_slno))
        setFeedbackTransact(FeedbackTransact)
        const NotificationTransact = NotificationTransaction.filter(val => menuSlnoAry.includes(val.men_slno))
        setNotificationTransact(NotificationTransact)
        const AmsTransact = AmsTransaction.filter(val => menuSlnoAry.includes(val.men_slno))
        setAmsTransact(AmsTransact)
        const WorkOrders = WorkOrder.filter(val => menuSlnoAry.includes(val.men_slno))
        setWorkOrder(WorkOrders)

        const DeviceCredentialTransact = DeviceCredentialTransactions.filter(val => menuSlnoAry.includes(val.men_slno))
        setDeviceCredentials(DeviceCredentialTransact)
        

        setCount(1)
        const IcuTrans = IcuTransaction.filter(val => menuSlnoAry.includes(val.men_slno))
        setIcuTransact(IcuTrans)
        // const LabResultTrans = LabResultTransaction.filter(val => menuSlnoAry.includes(val.men_slno))
        // setLabResultTransact(LabResultTrans)
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
          emp_slno: em_id
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
          // console.log(err)
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
    <>
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
              boxShadow: 'none'
            }
          }
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
            backgroundColor: '#fff'
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
                    fontFamily: 'var(--roboto-font)'
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
                    fontFamily: 'var(--roboto-font)'
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
                zIndex: 0
              }}
            >
              <img src={TMCHLogo} alt="logo" width={300} height={300} />
            </Box>
            {/* Menu list content here */}
            {/* <MLogoIcon width={50} height={50} /> */}
            {menu.map((item, index) => (
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
                      fontSize: 14.5
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
                      <ListItemIcon sx={{ color: 'var(--rose-pink-300)' }}>{subItem.icon}</ListItemIcon>
                      <ListItemText
                        disableTypography={true}
                        sx={{
                          color: 'var(--light-gray)',
                          fontFamily: 'var(--roboto-font)',
                          fontWeight: 400,
                          fontSize: 13.5
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
            <Tooltip title="Exit from the Application" arrow placement="right" variant="outlined" color="danger">
              <IconButton variant="outlined" sx={{ color: 'var(--rose-pink-400)' }} onClick={() => { }}>
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
