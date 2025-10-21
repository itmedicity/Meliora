import { Box, Table } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import React, { memo, useEffect, useMemo, useState } from 'react'
import { getallSpareUnderAsset, getSpecification } from 'src/api/AssetApis';
import TextComponent from 'src/views/Components/TextComponent';

const DetailsTab = ({ AssetDetails }) => {

  const { am_item_map_slno, asset_am_manufacture_no, asset_am_asset_old_no, spare_am_asset_old_no, spare_am_manufacture_no } = AssetDetails

  const [specificationTabledata, setspecificationTabledata] = useState([])
  const [spareDetails, setSpareDetails] = useState([])

  const { data: specificationDetailsData } = useQuery({
    queryKey: ['getAssetSpecification'],
    queryFn: () => getSpecification(am_item_map_slno),
    enabled: am_item_map_slno !== undefined,
  });
  const specificationDetails = useMemo(() => specificationDetailsData, [specificationDetailsData])
  useEffect(() => {
    setspecificationTabledata(specificationDetails || []);
  }, [specificationDetails]);

  const { data: allSpareUnderAssetData } = useQuery({
    queryKey: ['getSpareUnderAssett'],
    queryFn: () => getallSpareUnderAsset(am_item_map_slno),
  });

  const allSpareUnderAsset = useMemo(() => allSpareUnderAssetData, [allSpareUnderAssetData])

  useEffect(() => {
    setSpareDetails(allSpareUnderAsset || []);
  }, [allSpareUnderAsset]);


  return (
    <Box>
      <Box sx={{ mb: 1. }}>
        <TextComponent
          text={"DETAILS"}
          sx={{
            flex: 1,
            fontWeight: 500,
            color: 'black',
            fontSize: 15,
            pt: 1.5
          }}
        />
        <Box sx={{ flex: 1, display: 'flex' }} >
          <Box sx={{ width: 500 }}>
            <Box sx={{ display: 'flex', }}>
              <TextComponent
                text={"Manufacture Slno"}
                sx={{
                  fontWeight: 600,
                  color: '#727B8C',
                  pt: 1,
                  width: 150

                }}
              />
              <Box sx={{ flex: 1, pt: 1, color: 'black', fontWeight: 600 }}>
                : {asset_am_manufacture_no || spare_am_manufacture_no || ''}
              </Box>

            </Box>
            <Box sx={{ display: 'flex', pt: .5 }}>
              <TextComponent
                text={"Asset Old No."}
                sx={{
                  fontWeight: 600,
                  color: '#727B8C',
                  width: 150

                }}
              />
              <Box sx={{ flex: 1, color: 'black', fontWeight: 600 }}>
                : {asset_am_asset_old_no || spare_am_asset_old_no || ''}
              </Box>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
          </Box>
        </Box>
      </Box>
      {am_item_map_slno !== undefined ?
        <Box sx={{ mb: 1.5 }}>
          <TextComponent
            text={"SPECIFICATIONS"}
            sx={{
              fontWeight: 500,
              color: 'black',
              fontSize: 15,
              py: .5
            }}
          />

          {specificationTabledata.length > 0 ?
            <Table stickyHeader size='sm' borderAxis='none' >
              <tbody>
                {specificationTabledata && specificationTabledata.map((val, index) => {
                  return <tr
                    key={index}
                    style={{
                      maxHeight: 60,
                      minHeight: 2,
                    }}
                  >
                    <td style={{ width: 20 }}> {index + 1}.</td>
                    <td> {val.specifications}</td>
                  </tr>
                })}
              </tbody>
            </Table>
            : null
          }
        </Box> : null}

      {spareDetails.length > 0 ?
        <Box sx={{ mb: 1.5 }}>
          <TextComponent
            text={"SPARE PARTS"}
            sx={{
              fontWeight: 500,
              color: 'black',
              fontSize: 15,
              py: .5
            }}
          />

          <Table stickyHeader size='sm' borderAxis='none'>
            <tbody>
              {spareDetails && spareDetails.map((val, index) => {
                const formattedSlno = val.spare_asset_no_only !== undefined ? val.spare_asset_no_only.toString().padStart(6, '0') : 0;
                return <tr
                  key={index}
                  style={{
                    maxHeight: 60,
                    minHeight: 2,
                  }}
                >
                  <td style={{ width: 20 }}> {index + 1}.</td>
                  <td style={{ width: 100 }}> {val.spare_asset_no}/{formattedSlno}</td>
                  <td>  {val.item_name}</td>
                </tr>
              })}
            </tbody>
          </Table>

        </Box>
        : null}

    </Box >
  )
}

export default memo(DetailsTab)