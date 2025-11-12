import React, { memo, useState } from 'react'
import { Box, Button, Input, } from '@mui/joy/'
import Table from '@mui/joy/Table'
import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search';



const PswdMasterTable = ({ rowSelect, tabledata, }) => {

  const [filterText, setFilterText] = useState("");

  const filteredData = tabledata.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  return (
    <Box sx={{ width: '100%', }}>
      <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <Input
          autoComplete="off"
          label="Search"
          variant="outlined"
          placeholder="Type here..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          startDecorator={
            <Button variant="soft" color="neutral">
              <SearchIcon /> Search
            </Button>
          }
          sx={{ width: 300, mr: .5 }}
        />
      </Box>


      {filteredData.length !== 0 ? (
        <Box
          sx={{

            height: '35vh',       // container height
            overflowX: 'auto',     // scroll only inside here
            display: 'block',     // ensures table doesn't escape
            maxWidth: '100%',
          }}
        >
          <Table
            padding="none"
            stickyHeader
            borderAxis="both"
            sx={{
              tableLayout: "fixed",
              "& th": { whiteSpace: "nowrap" },

            }}
          >
            <thead>
              <tr>
                <th style={{ width: 50 }}>SlNo</th>
                <th style={{ width: 50 }}>Action</th>
                <th style={{ width: 150 }}>Asset No.</th>
                <th style={{ width: 'auto' }}>Category</th>
                <th style={{ width: 'auto' }}>Group</th>
                <th style={{ width: 160 }}>IP Number</th>
                <th style={{ width: 'auto' }}>Device Name</th>
                <th style={{ width: 'auto' }}>Port</th>
                <th style={{ width: 'auto' }}>User Name</th>
                <th style={{ width: 'auto' }}>Password</th>
                <th style={{ width: 'auto' }}>Remarks</th>
                <th style={{ width: 'auto' }}>Describtion</th>
                <th style={{ width: 'auto' }}>Location</th>
                <th style={{ width: 500 }}>Device Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((val, index) => {
                return (
                  <tr key={index}>
                    <td> {index + 1}</td>
                    <td>
                      <EditIcon sx={{ cursor: 'pointer' }} size={6} onClick={() => rowSelect(val)} />
                    </td>
                    <td> {val.pswd_mast_asset_no || 'not given'}</td>
                    <td> {val.category_name || 'not given'}</td>
                    <td> {val.group_name || 'not given'}</td>
                    <td> {val.psw_detail_ip_num || 'not given'}</td>
                    <td> {val.item_name || 'not given'}</td>
                    <td> {val.psw_detail_port || 'not given'}</td>
                    <td> {val.psw_detail_username || 'not given'}</td>
                    <td> {val.psw_detail_password || 'not given'}</td>
                    <td> {val.psw_detail_remarks || 'not given'}</td>
                    <td> {val.pswd_detail_description || 'not given'}</td>
                    <td> {val.sec_name || 'not given'}</td>
                    <td> {val.pswd_mast_description || 'not given'}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', mt: 15, fontWeight: 700, fontSize: 30, color: '#C7C8CB' }}>
          No data under section
        </Box>
      )}
    </Box>
  )
}
export default memo(PswdMasterTable)
