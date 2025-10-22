import { Box, Modal, ModalDialog, Chip, IconButton, Typography, } from '@mui/joy'
import React, { memo, useCallback } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import TextComponent from 'src/views/Components/TextComponent'
import DetailsTab from './DetailsTab'
import PurchaseDetails from './PurchaseDetails'
import WarrentyGaurenteeDetails from './WarrentyGaurenteeDetails'
import AmcCmcDetails from './AmcCmcDetails'
import PmDetails from './PmDetails'
import LeaseDetailsinCondem from './LeaseDetailsinCondem'
import ServiceDetailsCondemnation from './ServiceDetailsCondemnation'

const AssetDetailsModal = ({ AssetOpenModal, AssetDetails, setAssetOpenModal, setAssetModalFlag, }) => {

  const { cat_asset_name, cat_spare_name, item_asset_name, item_asset_no, item_asset_no_only, item_spare_name, spare_asset_no, spare_asset_no_only,
    category_name, item_name
  } = AssetDetails

  const spareAssetNo = spare_asset_no ?? item_asset_no ?? "Not Found";
  const formatNumber = (num) =>
    num != null ? String(num).padStart(6, '0') : "Not Found";
  const FormatedNo = formatNumber(spare_asset_no_only ?? item_asset_no_only);


  const CloseModal = useCallback(() => {
    setAssetModalFlag(0)
    setAssetOpenModal(true)
  }, [setAssetModalFlag, setAssetOpenModal])


  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={AssetOpenModal}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
      <ModalDialog variant="outlined" sx={{ width: '95vw', p: 0, overflow: 'auto', height: '95vh' }}>
        <Box sx={{ flex: 1, }}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1
            }}
          >
            <Typography level="title-md" fontWeight={600}>
              Item Details
            </Typography>
            <IconButton
              onClick={CloseModal}
              sx={{
                color: '#555',
                backgroundColor: '#ffffff',
                border: '1px solid #ccc',
                boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                  color: '#000'
                },
                p: 1
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ flex: 1, border: 1, py: 1, borderColor: '#efefef', mx: 1, mt: .5, bgcolor: '#fbfcfe', display: 'flex', height: 110 }}>
            <Box sx={{ flex: 1, }}>
              <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                <TextComponent
                  text={item_asset_no !== null ? "Asset Number" : "Spare Number"}
                  sx={{ pl: 2, pt: .4, fontWeight: 600, fontSize: 14, width: 170 }}
                />
                <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500, fontSize: 16 }}>
                  {spareAssetNo}/{FormatedNo}
                </Chip>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', my: .5 }}>
                <TextComponent
                  text="Category"
                  sx={{ pl: 2, fontWeight: 600, pt: .4, fontSize: 14, width: 170 }}
                />
                <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500, fontSize: 14 }}>{cat_asset_name || cat_spare_name || category_name}</Chip>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', my: .5 }}>
                <TextComponent
                  text="  Item Name"
                  sx={{ pl: 2, fontWeight: 600, pt: .4, fontSize: 14, width: 170 }}
                />
                <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500, fontSize: 14 }}>{item_asset_name || item_spare_name || item_name}</Chip>
              </Box>
            </Box>
          </Box >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: .5, border: 1, borderColor: '#efefef', my: .5, mx: 1, pl: 2 }}>

            <DetailsTab AssetDetails={AssetDetails} />
            <PurchaseDetails AssetDetails={AssetDetails} />
            <WarrentyGaurenteeDetails AssetDetails={AssetDetails} />
            {item_asset_no !== null ?
              <AmcCmcDetails AssetDetails={AssetDetails} />
              : null}
            {item_asset_no !== null ?
              <PmDetails AssetDetails={AssetDetails} />
              : null}
            {item_asset_no !== null ?
              <LeaseDetailsinCondem AssetDetails={AssetDetails} />
              : null}
            <ServiceDetailsCondemnation AssetDetails={AssetDetails} />

          </Box>
        </Box>
      </ModalDialog>
    </Modal>
  )
}

export default memo(AssetDetailsModal)
