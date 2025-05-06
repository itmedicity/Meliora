import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { ActionTyps } from 'src/redux/constants/action.type'
import { getMenuSlno } from 'src/views/Constant/Constant'
import CmTransactions from '../Menus/CmTransactions'
import { CNavGroup, CNavItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilHouse } from '@coreui/icons'
import { axioslogin } from 'src/views/Axios/Axios'
import { apsideBgclor } from 'src/color/Color'
// import DietTransactions from '../Menus/DietTransactions'
import RmTransactions from '../Menus/RmTransaction'
// import NurseStation from '../Menus/NurseStation'
// import WeWorkTransact from '../Menus/WeWorkTransact'
// import CrmTransactions from '../Menus/CrmTransactions'
// import TimeEscalations from '../Menus/EscalationUtility'
// import HallBookingTrans from 'src/Menus/HallBookingTrans'
import { Box, Typography } from '@mui/material'
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


const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.changeState.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.changeState.sidebarShow)
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
 

  const [count, setCount] = useState(0)
  const [menu, setMenu] = useState([])

  const { data: companyData, isLoading: isCompLoading, error: compError } = useQuery({
    queryKey: 'getdefaultCompany',
    queryFn: () => getDefaultCompany(),
    staleTime: Infinity
  });
  const company = useMemo(() => companyData, [companyData]);
  //for name change in the crm menus 
  useEffect(() => {
    if (companyData) {
      // Dynamically update the name fields in CrmNewTransaction
      const updatedCrmNewTransaction = CrmNewTransaction?.map(item => {
        switch (item.men_slno) {
          case 190:
            item.name = company?.incharge_name ? company?.incharge_name : 'Incharge Approval';
            break;
          case 191:
            item.name = company?.hod_name ? company?.hod_name : 'HOD Approval';
            break;
          case 192:
            item.name = company?.dms_name ? company?.dms_name : 'DMS Approval';
            break;
          case 193:
            item.name = company?.ms_name ? company?.ms_name : 'MS Approval';
            break;
          case 194:
            item.name = company?.mo_name ? company?.mo_name : "CRF Documentation";
            break;
          case 195:
            item.name = company?.smo_name ? company?.smo_name : "CRF Verification";
            break;
          case 196:
            item.name = company?.gmo_name ? company?.gmo_name : 'GM Operations Approval';
            break;
          case 197:
            item.name = company?.md_name ? company?.md_name : 'MD Approval';
            break;
          case 198:
            item.name = company?.ed_name ? company?.ed_name : 'ED Approval';
            break;
          case 253:
            item.name = company?.managing_director ? company?.managing_director : 'Managing Director Approval';
            break;
          default:
            break;
        }
        return item;
      });

      setCrmNewTransact(updatedCrmNewTransaction); // Set the updated array
    }
  }, [companyData]); // Re-run when companyData changes

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
    // {
    //   slno: 11,
    //   component: CNavGroup,
    //   name: 'Nursing Station',
    //   items: nurseStation
    // },
    //Complaint Management System Menu Start from Here
    {
      slno: 2,
      component: CNavGroup,
      name: 'Ticket Management',
      items: cmtransact
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
      component: CNavGroup,
      name: 'Central Request management',
      items: crmnewtransact
    },

    //Room Management System Menu Start from Here
    {
      slno: 5,
      component: CNavGroup,
      name: 'Room Management',
      items: rmtransact
    },
    //Asset Management System Menu Start from Here
    {
      slno: 4,
      component: CNavGroup,
      name: 'Asset Management',
      items: amtransact
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
      component: CNavGroup,
      name: 'Task Management',
      items: tasktransact
    },
    {
      slno: 18,
      component: CNavGroup,
      name: 'Information Technology',
      items: itmanagement
    },
    {
      slno: 9,
      component: CNavGroup,
      name: 'Quality Indicator',
      items: qualityTransact
    },

    {
      slno: 19,
      component: CNavGroup,
      name: 'Daily Census',
      items: censusTransact
    },
    {
      slno: 20,
      component: CNavGroup,
      name: 'Incident Management',
      items: incidentTransact
    },
    {
      slno: 8,
      component: CNavGroup,
      name: 'Feedback Management',
      items: feedbackTransact
    },
    {
      slno: 24,
      component: CNavGroup,
      name: 'Notification',
      items: NotificationTransact
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
        // const newNurseStation = NurseStation.filter(val => menuSlnoAry.includes(val.men_slno));
        // setNurseStation(newNurseStation)
        const newCmTransaction = CmTransactions.filter(val => menuSlnoAry.includes(val.men_slno));
        setCmTransact(newCmTransaction)
        // const newCrmTransaction = CrmTransactions.filter(val => menuSlnoAry.includes(val.men_slno));
        // setCrmTransact(newCrmTransaction)
        const newCrmNewTransaction = CrmNewTransaction.filter(val => menuSlnoAry.includes(val.men_slno));
        setCrmNewTransact(newCrmNewTransaction)
        // const newDietTransaction = DietTransactions.filter(val => menuSlnoAry.includes(val.men_slno));
        // setDietTransact(newDietTransaction)
        const newRmTransaction = RmTransactions.filter(val => menuSlnoAry.includes(val.men_slno));
        setRmTransact(newRmTransaction)
        const newAmTransaction = AmTransactions.filter(val => menuSlnoAry.includes(val.men_slno));
        setAmTransact(newAmTransaction)
        // const weworkTransact = WeWorkTransact.filter(val => menuSlnoAry.includes(val.men_slno));
        // setweworktransact(weworkTransact)
        // const escalationTransact = TimeEscalations.filter(val => menuSlnoAry.includes(val.men_slno));
        // setescalation(escalationTransact)
        // const hallBookingTransact = HallBookingTrans.filter(val => menuSlnoAry.includes(val.men_slno));
        // setHallBooking(hallBookingTransact)
        const TaskManageTransact = TaskTransaction.filter(val => menuSlnoAry.includes(val.men_slno));
        setTaskTransact(TaskManageTransact)
        const ItManageTransact = ITTransactions.filter(val => menuSlnoAry.includes(val.men_slno));
        setItManagement(ItManageTransact)
        const QualityIndTransact = QualityTransactions.filter(val => menuSlnoAry.includes(val.men_slno));
        setQualityTransact(QualityIndTransact)
        const DailyCensusTransact = DailyCensusTransactions.filter(val => menuSlnoAry.includes(val.men_slno));
        setCensusTransact(DailyCensusTransact)
        const IncidentTransact = IncidentTransactions.filter(val => menuSlnoAry.includes(val.men_slno));
        setIncidentTransact(IncidentTransact)

        const FeedbackTransact = FeedbackTransactions.filter(val => menuSlnoAry.includes(val.men_slno));
        setFeedbackTransact(FeedbackTransact)

        const NotificationTransact = NotificationTransaction.filter(val => menuSlnoAry.includes(val.men_slno));
        setNotificationTransact(NotificationTransact)
        

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
  if (isCompLoading) return <p>Loading...</p>;
  if (compError) return <p>Error occurred.</p>;
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
