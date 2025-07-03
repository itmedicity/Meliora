import React, { useEffect, memo, useState, useMemo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import { CssVarsProvider, IconButton, Input, Menu, MenuItem, Typography } from '@mui/joy/'
import Table from '@mui/joy/Table'
import { Box } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { format } from 'date-fns'
import CloseIcon from '@mui/icons-material/Close'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'

const AmcCmcAddedTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])
  const [filters, setFilters] = useState({
    suppplier: '',
    amcmc: '',
    frmDate: '',
    toDate: '',
  })

  useEffect(() => {
    const getAMCCMC = async () => {
      const result = await axioslogin.get('ItemMapDetails/AmcCmcview')
      const { success, data } = result.data
      if (success === 2) {
        setTabledata(data)
      } else {
        warningNotify('error occured')
      }
    }
    getAMCCMC()
  }, [count])

  const handleFilterChange = (e, field) => {
    const value = e.target.value
    setFilters(prevFilters => ({
      ...prevFilters,
      [field]: value,
    }))
  }

  const [anchorEl, setAnchorEl] = useState({
    suppplier: null,
    amcmc: null,
    frmDate: null,
    toDate: null,
  })

  const handleMenuOpen = (event, menuType) => {
    setAnchorEl(prev => ({ ...prev, [menuType]: event.currentTarget }))
  }

  const handleMenuClose = menuType => {
    setAnchorEl(prev => ({ ...prev, [menuType]: null }))
    setFilters(prevFilters => ({ ...prevFilters, [menuType]: '' }))
  }

  const filteredAssetListInstock = useMemo(() => {
    return tabledata.filter(item => {
      return (
        item.it_supplier_name.toLowerCase().includes(filters.suppplier.toLowerCase()) &&
        item.status.toLowerCase().includes(filters.amcmc.toLowerCase()) &&
        item.from_date.toLowerCase().includes(filters.frmDate.toLowerCase()) &&
        item.to_date.toLowerCase().includes(filters.toDate.toLowerCase())
      )
    })
  }, [tabledata, filters])

  return (
    <Box
      sx={{
        minHeight: 225,
        maxHeight: 250,
        overflow: 'auto',
        border: 1,
        borderColor: 'lightgrey',
      }}
    >
      <CssVarsProvider>
        <Table stickyHeader size="sm">
          <thead>
            <tr>
              <th style={{ width: 50 }}>
                <IconButton sx={{ fontSize: 13, color: 'black' }}>Action</IconButton>{' '}
              </th>
              <th style={{ width: 55 }}>
                <IconButton sx={{ fontSize: 13, color: 'black' }}>Sl No</IconButton>{' '}
              </th>
              {['suppplier', 'amcmc', 'frmDate', 'toDate'].map(field => (
                <th key={field} style={{ width: field === 'suppplier' ? 450 : 100 }}>
                  <Menu
                    placement="top-start"
                    anchorEl={anchorEl[field]}
                    open={Boolean(anchorEl[field])}
                    sx={{
                      zIndex: 1301,
                      padding: 2,
                      border: 1,
                      borderColor: '#055CAA',
                    }}
                  >
                    <Box sx={{ display: 'flex', cursor: 'pointer', px: 0.5 }}>
                      <Typography sx={{ flex: 1 }}>
                        {field === 'suppplier'
                          ? 'Supplier'
                          : field === 'amcmc'
                          ? 'AMC/CMC'
                          : field === 'frmDate'
                          ? 'From Date'
                          : 'To Date'}
                      </Typography>
                      <CloseIcon onClick={() => handleMenuClose(field)} />
                    </Box>
                    <MenuItem sx={{ padding: 0, border: 0, borderColor: 'white' }}>
                      <Input
                        placeholder={`Search ${
                          field === 'suppplier'
                            ? 'Supplier'
                            : field === 'amcmc'
                            ? 'AMC/CMC'
                            : field === 'frmDate'
                            ? 'From Date'
                            : 'To Date'
                        }`}
                        value={filters[field]}
                        onChange={e => handleFilterChange(e, field)}
                      />
                    </MenuItem>
                  </Menu>

                  <IconButton onClick={e => handleMenuOpen(e, field)}>
                    <Box sx={{ display: 'flex' }}>
                      <FilterListOutlinedIcon
                        sx={{ py: 0.2, color: 'grey', cursor: 'pointer', width: 20, height: 20 }}
                      />
                      <Typography sx={{ fontSize: 13, color: 'black' }}>
                        {field === 'suppplier'
                          ? 'Supplier'
                          : field === 'amcmc'
                          ? 'AMC/CMC'
                          : field === 'frmDate'
                          ? 'From Date'
                          : 'To Date'}
                      </Typography>
                    </Box>
                  </IconButton>
                </th>
              ))}
              <th style={{ width: 50 }}>
                <IconButton sx={{ fontSize: 13, color: 'black' }}>Status</IconButton>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAssetListInstock.map((val, index) => (
              <tr key={index}>
                <td>
                  <EditIcon
                    size={6}
                    onClick={() => rowSelect(val)}
                    sx={{ cursor: 'pointer', ml: 1 }}
                  />
                </td>
                <td> {val.amccmc_slno}</td>
                <td style={{ paddingLeft: 11 }}>&nbsp; {val.it_supplier_name}</td>
                <td style={{ paddingLeft: 22 }}>{val.status}</td>
                <td style={{ paddingLeft: 20 }}>
                  {val.from_date ? format(new Date(val.from_date), 'dd-MM-yyyy') : ''}
                </td>
                <td style={{ paddingLeft: 20 }}>
                  {val.to_date ? format(new Date(val.to_date), 'dd-MM-yyyy') : ''}
                </td>
                <td style={{ paddingLeft: 20 }}>{val.amccmc_status === 1 ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(AmcCmcAddedTable)
