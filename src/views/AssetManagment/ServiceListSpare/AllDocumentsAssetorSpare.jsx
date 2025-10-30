import { Box } from '@mui/joy'
import React from 'react'
import TextComponent from 'src/views/Components/TextComponent'

const AllDocumentsAssetorSpare = () => {
  return (
    <Box
      sx={{
        mt: 0.5,
        flexGrow: 1,
        overflowY: 'auto',
        maxHeight: 'calc(90vh - 230px)'
      }}
    >
      <Box sx={{ flex: 1, border: 1, borderRadius: 3, borderColor: '#EBEFFB', p: 1, mb: 0.5 }}>
        <TextComponent text={'PURCHASE BILLS'} sx={{ color: 'black', fontWeight: 500, pl: 0.5 }}></TextComponent>
      </Box>
      <Box sx={{ flex: 1, border: 1, borderRadius: 3, borderColor: '#EBEFFB', p: 1, mb: 0.5 }}>
        <TextComponent text={' AMC/CMC'} sx={{ color: 'black', fontWeight: 500, pl: 0.5 }}></TextComponent>
      </Box>
      <Box sx={{ flex: 1, border: 1, borderRadius: 3, borderColor: '#EBEFFB', p: 1, mb: 0.5 }}>
        <TextComponent text={'LEASE'} sx={{ color: 'black', fontWeight: 500, pl: 0.5 }}></TextComponent>
      </Box>
      <Box sx={{ flex: 1, border: 1, borderRadius: 3, borderColor: '#EBEFFB', p: 1, mb: 0.5 }}>
        <TextComponent text={'WARRENTY/GUARANTEE'} sx={{ color: 'black', fontWeight: 500, pl: 0.5 }}></TextComponent>
      </Box>
      <Box sx={{ flex: 1, border: 1, borderRadius: 3, borderColor: '#EBEFFB', p: 1, mb: 0.5 }}>
        <TextComponent text={'SERVICED'} sx={{ color: 'black', fontWeight: 500, pl: 0.5 }}></TextComponent>
      </Box>
    </Box>
  )
}

export default memo(AllDocumentsAssetorSpare)
