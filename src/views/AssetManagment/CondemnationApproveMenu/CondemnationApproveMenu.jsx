import { CircularProgress, Paper } from '@mui/material'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { getCondemnationApprovalRights } from 'src/api/AssetApis'
import CondemnationListTab from './CondemnationListTab'

const CondemnationApproveMenu = () => {
  const empid = useSelector(state => state.LoginUserData.empid)
  const empdept = useSelector(state => {
    return state.LoginUserData.empdept
  })
  const postEmp = useMemo(() => ({ empid }), [empid])

  const { data: menuRightsEmp = [], isLoading } = useQuery({
    queryKey: ['getCondemnationApprveRights', postEmp],
    queryFn: () => getCondemnationApprovalRights(postEmp)
  })

  const [menuRightsList, setMenuRightsList] = useState(null)

  useEffect(() => {
    if (menuRightsEmp.length > 0) {
      setMenuRightsList(menuRightsEmp[0])
    }
  }, [menuRightsEmp])

  return (
    <Paper sx={{ borderRadius: 0, height: '90vh' }}>
      {isLoading ? (
        <CircularProgress />
      ) : menuRightsList ? (
        <CondemnationListTab menuRightsList={menuRightsList} empid={empid} empdept={empdept} />
      ) : (
        <div></div>
      )}
    </Paper>
  )
}

export default memo(CondemnationApproveMenu)
