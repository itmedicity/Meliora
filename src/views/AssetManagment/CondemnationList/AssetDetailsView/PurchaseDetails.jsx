import React, { memo, useCallback, useState } from 'react'
import TextComponent from 'src/views/Components/TextComponent'
import { Box } from '@mui/joy'
import { format } from 'date-fns'
import FileView from '../../AssetFileView/FileView'
import { getFilesFromZip } from 'src/api/FileViewsFn'

const PurchaseDetails = ({ AssetDetails }) => {

  const { asset_am_grn_date, asset_am_grn_no, spare_am_grn_no, spare_am_grn_date, asset_am_bill_no, spare_am_bill_no, asset_am_bill_date, spare_am_bill_date,
    asset_supplier_name, spare_supplier_name, asset_bill_amount, spare_bill_amount, asset_am_bill_mast_slno, spare_am_bill_mast_slno, asset_am_bill_image,
    spare_am_bill_image
  } = AssetDetails

  const billStat = asset_am_bill_image !== null ? asset_am_bill_image : spare_am_bill_image

  const [imageshowFlag, setImageShowFlag] = useState(0)
  const [imagearray, setImageArry] = useState([])
  const [imageshow, setImageShow] = useState(false)

  const formattedDate =
    asset_am_grn_date || spare_am_grn_date
      ? format(new Date(asset_am_grn_date || spare_am_grn_date), 'dd-MMM-yyyy')
      : '';
  const formatedBillDate =
    asset_am_bill_date || spare_am_bill_date
      ? format(new Date(asset_am_bill_date || spare_am_bill_date), 'dd-MMM-yyyy')
      : '';

  const ViewBillImage = async () => {
    const billNo = spare_am_bill_mast_slno !== null
      ? spare_am_bill_mast_slno
      : asset_am_bill_mast_slno;
    setImageShowFlag(1);
    setImageShow(true);
    const images = await getFilesFromZip('/AssetFileUpload/BillMasterImageView', billNo);
    setImageArry(images);
  };

  const handleClose = useCallback(() => {
    setImageShowFlag(0)
    setImageShow(false)
  }, [])
  return (
    <Box>
      {imageshowFlag === 1 ? <FileView open={imageshow} handleClose={handleClose}
        images={imagearray} /> : null}
      <Box sx={{ mb: 1.5 }}>
        <TextComponent
          text={"GRN DETAILS"}
          sx={{
            flex: 1,
            fontWeight: 500,
            color: 'black',
            fontSize: 15,
          }}
        />
        <Box sx={{ flex: 1, display: 'flex' }} >
          <Box sx={{ width: 500, pt: 1 }}>
            <Box sx={{ display: 'flex', }}>
              <TextComponent
                text={"GRN No"}
                sx={{
                  fontWeight: 600,
                  color: '#727B8C',

                  width: 150

                }}
              />
              <Box sx={{ flex: 1, color: 'black', fontWeight: 600 }}>
                : {asset_am_grn_no || spare_am_grn_no || ''}
              </Box>


            </Box>
            <Box sx={{ display: 'flex', pt: .5 }}>
              <TextComponent
                text={"GRN date"}
                sx={{
                  fontWeight: 600,
                  color: '#727B8C',

                  width: 150

                }}
              />
              <Box sx={{ flex: 1, color: 'black', fontWeight: 600 }}>
                : {formattedDate || ''}
              </Box>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
          </Box>
        </Box>
      </Box>
      <Box sx={{ mb: 1.5 }}>
        <TextComponent
          text={"BILL DETAILS"}
          sx={{
            flex: 1,
            fontWeight: 500,
            color: 'black',
            fontSize: 15,
          }}
        />
        <Box sx={{ flex: 1, display: 'flex' }} >
          <Box sx={{ width: 500, pt: 1 }}>
            <Box sx={{ display: 'flex', }}>
              <TextComponent
                text={"Bill No"}
                sx={{
                  fontWeight: 600,
                  color: '#727B8C',
                  width: 150

                }}
              />
              <Box sx={{ flex: 1, color: 'black', fontWeight: 600 }}>
                : {asset_am_bill_no || spare_am_bill_no || ''}
              </Box>

            </Box>
            <Box sx={{ display: 'flex', pt: .5 }}>
              <TextComponent
                text={"Bill date"}
                sx={{
                  fontWeight: 600,
                  color: '#727B8C',
                  width: 150

                }}
              />
              <Box sx={{ flex: 1, color: 'black', fontWeight: 600 }}>
                : {formatedBillDate || ''}
              </Box>

            </Box>
            <Box sx={{ display: 'flex', pt: .5 }}>
              <TextComponent
                text={"Supplier"}
                sx={{
                  fontWeight: 600,
                  color: '#727B8C',
                  width: 150

                }}
              />
              <Box sx={{ flex: 1, color: 'black', fontWeight: 600 }}>
                : {asset_supplier_name || spare_supplier_name || ''}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', pt: .5 }}>
              <TextComponent
                text={"Item Value"}
                sx={{
                  fontWeight: 600,
                  color: '#727B8C',
                  width: 150

                }}
              />
              <Box sx={{ flex: 1, color: 'black', fontWeight: 600 }}>
                : {asset_bill_amount || spare_bill_amount || ''}
              </Box>

            </Box>
            <Box sx={{ display: 'flex', pt: .5 }}>
              <Box sx={{ width: 160 }}></Box>
              <Box sx={{ flex: 1 }}>
                {
                  billStat === 1 ?
                    <Box
                      sx={{
                        bgcolor: '#7AB75E',
                        width: 120,
                        textAlign: 'center',
                        borderRadius: 4,
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer',
                        py: .3,
                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.6)',
                        transform: 'translateZ(0)',
                        transition: 'transform 0.2s ease',
                        '&:hover': {
                          boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.4), -3px -3px 6px rgba(255, 255, 255, 0.7)',
                        }
                      }}
                      onClick={ViewBillImage}
                    >
                      Attached Bill
                    </Box>
                    : null
                }
              </Box>

            </Box>

          </Box>
          <Box sx={{ flexGrow: 1 }}>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default memo(PurchaseDetails)