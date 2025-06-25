import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { CssVarsProvider, Tooltip } from '@mui/joy/'
import Table from '@mui/joy/Table'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Paper } from '@mui/material'
import TmDepartmentSelect from 'src/views/CommonSelectCode/TmDepartmentSelect'
import ReplayIcon from '@mui/icons-material/Replay'
import SearchIcon from '@mui/icons-material/Search'
import TmDeptSectionSelect from 'src/views/CommonSelectCode/TmDeptSectionSelect'
import { useDispatch } from 'react-redux'
import { getDepartment } from 'src/redux/actions/Department.action'
import { infoNotify } from 'src/views/Common/CommonCode'

const PswdMasterTable = ({ rowSelect, tabledata, setTabledata, searchData }) => {
  const [departments, setDepartments] = useState(0)
  const [deptsecs, setDeptSecs] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDepartment())
  }, [dispatch])

  const searchdept = useCallback(() => {
    if (deptsecs === 0) {
      setTabledata(searchData)
    } else {
      if (searchData.length !== 0) {
        const newData = searchData.filter((val) => val.pswd_mast_location === deptsecs)
        setTabledata(newData)
      } else {
        infoNotify('No data found')
      }
    }
  }, [searchData, deptsecs, setTabledata])
  const refresh = useCallback(() => {
    setTabledata(searchData)
    setDepartments(0)
    setDeptSecs(0)
  }, [searchData, setTabledata])

  return (
    <Fragment>
      <Box sx={{ flex: 1, display: 'flex', mt: 1 }}>
        <Box sx={{ flex: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Box sx={{ flex: 2.5 }}></Box>
          <Box
            sx={{
              flex: 3,
              display: 'flex',
              pt: 1,
              fontWeight: 500,
              fontSize: 18,
              color: '#C7C8CB',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <TmDepartmentSelect department={departments} setDepartment={setDepartments} />
            </Box>
            <Box sx={{ flex: 1, pl: 0.5 }}>
              <TmDeptSectionSelect deptsec={deptsecs} setDeptSec={setDeptSecs} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flex: 1, pt: 1, pl: 1 }}>
            <Tooltip title="search" placement="bottom">
              <Box sx={{ border: 1, borderRadius: 7, color: '#055C9D', cursor: 'pointer' }}>
                {' '}
                <SearchIcon sx={{ color: '#055C9D' }} onClick={searchdept} />
              </Box>
            </Tooltip>
            <Tooltip title="refresh" placement="bottom">
              <Box
                sx={{ ml: 0.5, border: 1, borderRadius: 7, color: '#055C9D', cursor: 'pointer' }}
              >
                {' '}
                <ReplayIcon sx={{ color: '#055C9D' }} onClick={refresh} />
              </Box>
            </Tooltip>
          </Box>
        </Box>
        <Box sx={{ flex: 1 }}></Box>
      </Box>
      {tabledata.length !== 0 ? (
        <Paper
          variant="outlined"
          sx={{ maxHeight: '100%', maxWidth: '100%', overflow: 'auto', m: 1 }}
        >
          <CssVarsProvider>
            <Table padding={'none'} stickyHeader hoverRow>
              <thead>
                <tr>
                  <th style={{ width: 60 }}>Action</th>
                  <th style={{ width: 50 }}>SlNo</th>
                  <th style={{ width: 100 }}>Asset No.</th>
                  <th style={{ width: 150 }}>Category</th>
                  <th style={{ width: 150 }}>Group</th>
                  <th style={{ width: 500 }}>Device Name</th>
                  <th style={{ width: 200 }}>Location</th>
                  <th style={{ width: 250 }}>Device Description</th>
                </tr>
              </thead>
              <tbody>
                {tabledata?.map((val, index) => {
                  return (
                    <tr
                      key={index}
                      // sx={{
                      //     '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                      //     minHeight: 5
                      // }}
                    >
                      <td>
                        <EditIcon
                          sx={{ cursor: 'pointer' }}
                          size={6}
                          onClick={() => rowSelect(val)}
                        />
                      </td>
                      <td> {index + 1}</td>
                      <td> {val.pswd_mast_asset_no || 'not given'}</td>
                      <td> {val.pswd_mast_categry_name || 'not given'}</td>
                      <td> {val.pswd_mast_group_name || 'not given'}</td>
                      <td> {val.pswd_mast_item_name || 'not given'}</td>
                      <td> {val.pswd_mast_location_name || 'not given'}</td>
                      <td> {val.pswd_mast_description || 'not given'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </CssVarsProvider>
        </Paper>
      ) : (
        <Box sx={{ textAlign: 'center', mt: 15, fontWeight: 700, fontSize: 30, color: '#C7C8CB' }}>
          No data under section
        </Box>
      )}
    </Fragment>
  )
}

export default memo(PswdMasterTable)
