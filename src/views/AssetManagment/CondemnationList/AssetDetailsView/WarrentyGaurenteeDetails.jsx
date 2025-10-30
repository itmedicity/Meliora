import { Box, CssVarsProvider, Table } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import TextComponent from 'src/views/Components/TextComponent';

const WarrentyGaurenteeDetails = ({ AssetDetails }) => {

  const { am_item_map_slno, am_spare_item_map_slno } = AssetDetails


  const [tableData, setTableData] = useState([]);
  const { data: AssetWarGar = [] } = useQuery(
    ['getAllWarGarInAssets'],
    async () => {
      const result = await axioslogin.get(`/ItemMapDetails/WarentGarantInsertOrNot/${am_item_map_slno}`);
      return result.data?.data || [];
    },
    { enabled: !!am_item_map_slno }
  );

  const { data: SpareWarGar = [] } = useQuery(
    ['getAllWarGarInSpares'],
    async () => {
      const result = await axioslogin.get(`/ItemMapDetails/WarentGarantInsertOrNotSpare/${am_spare_item_map_slno}`);
      return result.data?.data || [];
    },
    { enabled: !!am_spare_item_map_slno }

  );
  useEffect(() => {
    setTableData((prevData) => {
      const newData =
        AssetWarGar.length > 0 ? AssetWarGar :
          SpareWarGar.length > 0 ? SpareWarGar : [];

      return JSON.stringify(prevData) !== JSON.stringify(newData) ? newData : prevData;
    });
  }, [AssetWarGar, SpareWarGar]);


  return (
    <Box sx={{ mb: 1.5 }}>
      <TextComponent
        text={"WARRANTY GAURANTEE DETAILS"}
        sx={{
          flex: 1,
          fontWeight: 500,
          color: 'black',
          fontSize: 15,
        }}
      />

      <Box sx={{ flex: 1, pr: 1, pt: .5 }} >
        <CssVarsProvider>
          <Table stickyHeader size="sm" variant="outlined"
            sx={{
              flex: 1,
              borderRadius: 0,

            }}>
            <thead>
              <tr>
                <th style={{ width: 40, textAlign: 'center' }}>#</th>
                <th style={{ width: 85 }}>Wrnty/Gnty </th>
                <th style={{ width: 90 }}>From Date</th>
                <th style={{ width: 90 }}>To Date</th>
                <th style={{ width: 130 }}>Toll-Free No.</th>
                <th style={{ width: 100 }}>Ph No. 1</th>
                <th style={{ width: 100 }}>Ph No. 2</th>
                <th style={{ flexGrow: 1 }}>Address</th>
                <th style={{ flexGrow: 1 }}>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.length > 0 ? (
                tableData.map((val, index) => (
                  <tr key={index} >
                    <td style={{ textAlign: 'center' }}>{index + 1}</td>
                    <td>{val.warrenty_status === 1 ? 'Warranty' : 'Guarantee'}</td>
                    <td>{val.from_date}</td>
                    <td>{val.to_date}</td>
                    <td>{val.troll_free || '-'}</td>
                    <td>{val.ph_one || '-'}</td>
                    <td>{val.ph_two || '-'}</td>
                    <td>{val.address || '-'}</td>
                    <td style={{ minHeight: 20, maxHeight: 100 }}>{val.remarks || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '50px' }}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </CssVarsProvider>
      </Box>
    </Box>
  )
}

export default memo(WarrentyGaurenteeDetails)