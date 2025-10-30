import { Box, Input, IconButton, Menu, MenuItem, Typography } from '@mui/joy'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { Virtuoso } from 'react-virtuoso'
import { getSparesInstock } from 'src/api/AssetApis'
import CloseIcon from '@mui/icons-material/Close'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'

const SpareInStock = () => {
  const [spareList, setSpareList] = useState([])
  const [filters, setFilters] = useState({
    spareNo: '',
    category: '',
    itemName: ''
  })
  const [anchorElSpareNo, setAnchorElSpareNo] = useState(null)
  const [anchorElCategory, setAnchorElCategory] = useState(null)
  const [anchorElItemName, setAnchorElItemName] = useState(null)

  const empDept = useSelector(state => state.LoginUserData.empdept)

  const postData = useMemo(
    () => ({
      spareCustodainDept: empDept === 0 ? null : empDept === null ? null : empDept
    }),
    [empDept]
  )

  const { data: SparesInStock } = useQuery({
    queryKey: ['getSparesinstocks', postData],
    queryFn: () => getSparesInstock(postData)
  })

  const spareInstock = useMemo(() => SparesInStock, [SparesInStock])

  useEffect(() => {
    if (spareInstock && spareInstock.length > 0) {
      setSpareList(spareInstock)
    } else {
      setSpareList([])
    }
  }, [spareInstock])

  const handleFilterChange = (e, field) => {
    const value = e.target.value
    setFilters(prevFilters => ({
      ...prevFilters,
      [field]: value
    }))
  }

  const handleMenuOpen = (event, menuType) => {
    if (menuType === 'spareNo') {
      setAnchorElSpareNo(event.currentTarget)
    } else if (menuType === 'category') {
      setAnchorElCategory(event.currentTarget)
    } else if (menuType === 'itemName') {
      setAnchorElItemName(event.currentTarget)
    }
  }

  const handleMenuClose = menuType => {
    if (menuType === 'spareNo') {
      setAnchorElSpareNo(null)
    } else if (menuType === 'category') {
      setAnchorElCategory(null)
    } else if (menuType === 'itemName') {
      setAnchorElItemName(null)
    }
    setFilters({
      spareNo: '',
      category: '',
      itemName: ''
    })
  }

  // const filteredSpareList = useMemo(() => {
  //     return spareList.filter((item) => {
  //         const fullSpareNo = `${item.spare_asset_no}/${item.spare_asset_no_only.toString().padStart(6, '0')}`;
  //         return (
  //             fullSpareNo.toLowerCase().includes(filters.spareNo.toLowerCase()) &&
  //             item.category_name.toLowerCase().includes(filters.category.toLowerCase()) &&
  //             item.item_name.toLowerCase().includes(filters.itemName.toLowerCase())
  //         );
  //     });
  // }, [spareList, filters]);

  const filteredSpareList = useMemo(() => {
    return spareList.filter(item => {
      const fullSpareNo = `${item?.spare_asset_no || ''}/${(item?.spare_asset_no_only || 0)
        .toString()
        .padStart(6, '0')}`
      return (
        fullSpareNo.toLowerCase().includes(filters.spareNo.toLowerCase()) &&
        (item?.category_name || '').toLowerCase().includes(filters.category.toLowerCase()) &&
        (item?.item_name || '').toLowerCase().includes(filters.itemName.toLowerCase())
      )
    })
  }, [spareList, filters])

  return (
    <Box sx={{ flex: 1, p: 1 }}>
      <Box
        sx={{
          height: 40,
          display: 'flex',
          borderBottom: 1,
          borderTop: 1,
          borderColor: 'lightgray',
          bgcolor: 'white',
          flex: 1
        }}
      >
        <Box sx={{ width: 50, fontWeight: 600, color: 'black', fontSize: 12, pt: 1, pl: 1 }}>#</Box>
        <Box sx={{ width: 140, display: 'flex' }}>
          <IconButton onClick={e => handleMenuOpen(e, 'spareNo')}>
            <FilterListOutlinedIcon sx={{ p: 0.2, color: 'grey', cursor: 'pointer', width: 20, height: 20 }} />
          </IconButton>
          <Typography sx={{ pt: 1, fontWeight: 600, color: 'black', fontSize: 14 }}>Spare No.</Typography>
          <Menu
            anchorEl={anchorElSpareNo}
            open={Boolean(anchorElSpareNo)}
            sx={{ zIndex: 1301, padding: 2, border: 1, borderColor: '#055CAA' }}
            placement="top"
          >
            <Box sx={{ flex: 1, display: 'flex', cursor: 'pointer', px: 0.5 }}>
              <Typography sx={{ flex: 1 }}>Spare No</Typography>
              <CloseIcon onClick={() => handleMenuClose('spareNo')} />
            </Box>
            <MenuItem sx={{ padding: 0, border: 0, borderColor: 'white' }}>
              <Input
                placeholder="Search Spare No."
                value={filters.spareNo}
                onChange={e => handleFilterChange(e, 'spareNo')}
              />
            </MenuItem>
          </Menu>
        </Box>

        <Box sx={{ flex: 2, display: 'flex' }}>
          <IconButton onClick={e => handleMenuOpen(e, 'category')}>
            <FilterListOutlinedIcon sx={{ p: 0.2, color: 'grey', cursor: 'pointer', width: 20, height: 20 }} />
          </IconButton>
          <Typography sx={{ pt: 1, fontWeight: 600, color: 'black', fontSize: 14 }}>Category</Typography>
          <Menu
            anchorEl={anchorElCategory}
            open={Boolean(anchorElCategory)}
            sx={{ zIndex: 1301, padding: 2, border: 1, borderColor: '#055CAA' }}
            placement="top"
          >
            <Box sx={{ flex: 1, display: 'flex', cursor: 'pointer', px: 0.5 }}>
              <Typography sx={{ flex: 1 }}>Category</Typography>
              <CloseIcon onClick={() => handleMenuClose('category')} />
            </Box>
            <MenuItem sx={{ padding: 0, border: 0, borderColor: 'white' }}>
              <Input
                placeholder="Search Category"
                value={filters.category}
                onChange={e => handleFilterChange(e, 'category')}
                sx={{ width: '100%' }}
              />
            </MenuItem>
          </Menu>
        </Box>
        <Box sx={{ flex: 4, display: 'flex' }}>
          <IconButton onClick={e => handleMenuOpen(e, 'itemName')}>
            <FilterListOutlinedIcon sx={{ p: 0.2, color: 'grey', cursor: 'pointer', width: 20, height: 20 }} />
          </IconButton>
          <Typography sx={{ pt: 1, fontWeight: 600, color: 'black', fontSize: 14 }}>Item Name</Typography>

          <Menu
            anchorEl={anchorElItemName}
            open={Boolean(anchorElItemName)}
            onClose={() => handleMenuClose('itemName')}
            sx={{ zIndex: 1301, padding: 2, border: 1, borderColor: '#055CAA' }}
            placement="top"
          >
            <Box sx={{ flex: 1, display: 'flex', cursor: 'pointer', px: 0.5 }}>
              <Typography sx={{ flex: 1 }}>Item Name</Typography>
              <CloseIcon onClick={() => handleMenuClose('itemName')} />
            </Box>
            <MenuItem sx={{ padding: 0, border: 0, borderColor: 'white' }}>
              <Input
                placeholder="Search Item Name"
                value={filters.itemName}
                onChange={e => handleFilterChange(e, 'itemName')}
                sx={{ width: '100%' }}
              />
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box sx={{ overflow: 'auto', flex: 1 }}>
        <Virtuoso
          style={{ height: '74vh' }}
          totalCount={filteredSpareList.length}
          itemContent={index => {
            const val = filteredSpareList[index]
            return (
              <Box
                key={val.am_spare_item_map_slno}
                sx={{
                  borderBottom: 1,
                  borderColor: '#D3D3D3',
                  py: 0.5,
                  mb: 0.5,
                  flex: 1,
                  display: 'flex'
                }}
              >
                <Box sx={{ width: 50, pl: 1, fontWeight: 400, color: 'black', fontSize: 12 }}>{index + 1}</Box>
                <Box sx={{ width: 150, pl: 1.5, fontWeight: 400, color: 'black', fontSize: 14 }}>
                  {val.spare_asset_no + '/' + val.spare_asset_no_only.toString().padStart(6, '0')}
                </Box>
                <Box sx={{ flex: 2, pl: 0.5, fontWeight: 400, color: 'black', fontSize: 14 }}>
                  {val.category_name || '-'}
                </Box>
                <Box sx={{ flex: 4, pl: 1, fontWeight: 400, color: 'black', fontSize: 14 }}>{val.item_name || '-'}</Box>
              </Box>
            )
          }}
        />
      </Box>
    </Box>
  )
}

export default memo(SpareInStock)
