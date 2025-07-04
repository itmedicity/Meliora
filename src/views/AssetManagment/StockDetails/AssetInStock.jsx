import { Box, Input, IconButton, Menu, MenuItem, Typography } from '@mui/joy'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { Virtuoso } from 'react-virtuoso'
import { getAssetInstock } from 'src/api/AssetApis'
import CloseIcon from '@mui/icons-material/Close'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'

const AssetInStock = () => {
  const [assetListInstock, setAssetListInstock] = useState([])
  const [filters, setFilters] = useState({
    AssetNo: '',
    category: '',
    itemName: ''
  })
  const [anchorElAssetNo, setAnchorElAssetNo] = useState(null)
  const [anchorElCategory, setAnchorElCategory] = useState(null)
  const [anchorElItemName, setAnchorElItemName] = useState(null)

  const empDeptId = useSelector(state => {
    return state.LoginUserData.empdept
  })

  const postData = useMemo(() => {
    return {
      am_custodian_dept_slno: empDeptId,
      item_dept_slno: empDeptId
    }
  }, [empDeptId])

  const { data: spareData } = useQuery({
    queryKey: ['getAssetsInstock', postData],
    queryFn: () => getAssetInstock(postData)
  })

  const AssetInstock = useMemo(() => spareData, [spareData])

  useEffect(() => {
    if (AssetInstock && AssetInstock.length > 0) {
      setAssetListInstock(AssetInstock)
    } else {
      setAssetListInstock([])
    }
  }, [AssetInstock])

  const handleFilterChange = (e, field) => {
    const value = e.target.value
    setFilters(prevFilters => ({
      ...prevFilters,
      [field]: value
    }))
  }

  const handleMenuOpen = (event, menuType) => {
    if (menuType === 'AssetNo') {
      setAnchorElAssetNo(event.currentTarget)
    } else if (menuType === 'category') {
      setAnchorElCategory(event.currentTarget)
    } else if (menuType === 'itemName') {
      setAnchorElItemName(event.currentTarget)
    }
  }

  const handleMenuClose = menuType => {
    if (menuType === 'AssetNo') {
      setAnchorElAssetNo(null)
    } else if (menuType === 'category') {
      setAnchorElCategory(null)
    } else if (menuType === 'itemName') {
      setAnchorElItemName(null)
    }
    setFilters({
      AssetNo: '',
      category: '',
      itemName: ''
    })
  }
  const filteredAssetListInstock = useMemo(() => {
    return assetListInstock.filter(item => {
      const fullAssetNo = `${item?.item_asset_no || ''}/${(item?.item_asset_no_only || 0).toString().padStart(6, '0')}`
      return (
        fullAssetNo.toLowerCase().includes(filters.AssetNo.toLowerCase()) &&
        (item?.category_name || '').toLowerCase().includes(filters.category.toLowerCase()) &&
        (item?.item_name || '').toLowerCase().includes(filters.itemName.toLowerCase())
      )
    })
  }, [assetListInstock, filters])

  // const filteredAssetListInstock = useMemo(() => {
  //     return assetListInstock.filter((item) => {
  //         const fullAssetNo = `${item.item_asset_no}/${item.item_asset_no_only.toString().padStart(6, '0')}`;
  //         return (
  //             fullAssetNo.toLowerCase().includes(filters.AssetNo.toLowerCase()) &&
  //             item.category_name.toLowerCase().includes(filters.category.toLowerCase()) &&
  //             item.item_name.toLowerCase().includes(filters.itemName.toLowerCase())
  //         );
  //     });
  // }, [assetListInstock, filters]);

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
          <IconButton onClick={e => handleMenuOpen(e, 'AssetNo')}>
            <FilterListOutlinedIcon sx={{ p: 0.2, color: 'grey', cursor: 'pointer', width: 20, height: 20 }} />
          </IconButton>
          <Typography sx={{ pt: 1, fontWeight: 600, color: 'black', fontSize: 14 }}>Asset No.</Typography>
          <Menu
            anchorEl={anchorElAssetNo}
            open={Boolean(anchorElAssetNo)}
            sx={{ zIndex: 1301, padding: 2, border: 1, borderColor: '#055CAA' }}
            placement="top"
          >
            <Box sx={{ flex: 1, display: 'flex', cursor: 'pointer', px: 0.5 }}>
              <Typography sx={{ flex: 1 }}>Asset No</Typography>
              <CloseIcon onClick={() => handleMenuClose('AssetNo')} />
            </Box>
            <MenuItem sx={{ padding: 0, border: 0, borderColor: 'white' }}>
              <Input
                placeholder="Search Asset No."
                value={filters.AssetNo}
                onChange={e => handleFilterChange(e, 'AssetNo')}
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
          totalCount={filteredAssetListInstock.length}
          itemContent={index => {
            const val = filteredAssetListInstock[index]
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
                  {val.item_asset_no + '/' + val.item_asset_no_only.toString().padStart(6, '0')}
                </Box>
                <Box sx={{ flex: 2, fontWeight: 400, color: 'black', fontSize: 14, pl: 0.5 }}>
                  {val.category_name || '-'}
                </Box>
                <Box sx={{ flex: 4, fontWeight: 400, color: 'black', fontSize: 14, pl: 1 }}>{val.item_name || '-'}</Box>
              </Box>
            )
          }}
        />
      </Box>
    </Box>
  )
}

export default memo(AssetInStock)
