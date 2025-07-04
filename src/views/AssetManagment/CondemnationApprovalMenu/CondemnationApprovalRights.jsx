import React, { memo, useEffect, useMemo, useState } from 'react'
import { Box } from '@mui/joy'
import InchargeTab from './InchargeCondemnationMenu/InchargeTab'
import HodTab from './HodCondemnationMenu.jsx/HodTab'
import GenStoreTab from './GeneralStoreMenu/GenStoreTab'
import GmOprTab from './GmOprationMenu/GmOprTab'
import AccountsTab from './AccountsMenu/AccountsTab'
import MaterialManagementTab from './MaterialMangementMenu/MaterialManagementTab'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { getEmployeeuserrightsMenu } from 'src/api/TicketApi'

const CondemnationApprovalRights = () => {
  const empid = useSelector(state => state.LoginUserData.empid)
  const [menurights, setMenurights] = useState([])

  const menuListData = useMemo(
    () => [
      { slno: 260, name: 'Condemnation Incharge Approval', component: InchargeTab },
      { slno: 261, name: 'Condemnation HOD Approval', component: HodTab },
      { slno: 262, name: 'Condemnation GM Operations Approval', component: GmOprTab },
      { slno: 263, name: 'Condemnation Accounts Approval', component: AccountsTab },
      { slno: 264, name: 'Condemnation General Store Approval', component: GenStoreTab },
      {
        slno: 265,
        name: 'Condemnation Materials Management Approval',
        component: MaterialManagementTab
      }
    ],
    []
  )

  const postEmp = useMemo(() => ({ empid }), [empid])

  const { data: menuRightsEmployee = [] } = useQuery({
    queryKey: ['getEmployeeuserrightsMenu', postEmp],
    queryFn: () => getEmployeeuserrightsMenu(postEmp)
  })

  useEffect(() => {
    if (menuRightsEmployee.length > 0) {
      const filteredMenus = menuListData.filter(menu => menuRightsEmployee.some(val => menu.slno === val.menu_slno))

      setMenurights(filteredMenus)
    }
  }, [menuRightsEmployee, menuListData])

  return (
    <Box>
      <Box sx={{ flex: 1 }}>
        {menurights.map(({ slno, component: Component }) => (
          <Component key={slno} menurights={menurights} />
        ))}
      </Box>
    </Box>
  )
}
export default memo(CondemnationApprovalRights)
