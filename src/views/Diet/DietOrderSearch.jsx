import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Table from '@mui/material/Table'
import { Box } from '@mui/system'
import React, { memo } from 'react'
import CardMaster from '../Components/CardMaster'
// import CusCheckBox from '../Components/CusCheckBox'
import TextFieldCustom from '../Components/TextFieldCustom'
import { Checkbox } from '@mui/material'
const DietOrderSearch = ({ dietdetail, setDietdetail, dietcrct, slno }) => {
  return (
    <CardMaster title="Diet Menu">
      <Box sx={{ width: '100%', pl: 1, pt: 1, pr: 1, pb: 1 }}>
        <Paper square elevation={3} sx={{ pl: 1, pt: 1, pr: 1, pb: 1 }}>
          <Box
            sx={{
              width: '100%',
              pl: 1,
              pt: 0.5,
              pr: 1,
              pb: 0.5,
              display: 'flex',
              flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' },
            }}
          >
            <Box sx={{ width: '20%', pr: 1, mt: 1 }}>
              <TextFieldCustom
                placeholder="Patient Name"
                size="sm"
                //  value={ptc_ptname}
                disabled
              />
            </Box>
            <Box sx={{ width: '20%', pr: 1, mt: 1 }}>
              <TextFieldCustom
                placeholder="Diet"
                size="sm"
                // value={diet_name}
                disabled
              />
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              pl: 1,
              pt: 0.5,
              pr: 1,
              pb: 0.5,
              // background: "blue",
              display: 'flex',
              flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' },
            }}
          >
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table sx={{ minWidth: 100 }} size="small" stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: 70 }}>Type Description </TableCell>
                    <TableCell sx={{ width: 70 }}>Items</TableCell>
                    {/* <TableCell sx={{ width: 100 }} >Actions</TableCell> */}
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                                    {
                                        dietdetail && dietdetail.map((val, index) => {
                                            return <TableRow key={val.type_slno}>
                                                <TableCell sx={{ width: 300, bgcolor: "yellow" }} >{val.type_desc}</TableCell>
                                                <TableCell sx={{ bgcolor: "cyan" }}>{val.item_name}
                                                    <CusCheckBox />
                                                </TableCell>



                                            </TableRow>
                                        })
                                    }
                                </TableBody> */}
                <TableBody>
                  {dietcrct &&
                    dietcrct.map((val, index) => {
                      return (
                        <TableRow key={val.type_slno}>
                          <TableCell sx={{ borderbottom: '1px solid #ddd' }}>
                            {val.type_desc}
                          </TableCell>
                          {slno &&
                            slno.map((value, index) => {
                              return (
                                <TableRow key={value.type_slno}>
                                  <TableCell sx={{ width: 250, borderbottom: '1px solid #ddd' }}>
                                    {value.item_name}
                                  </TableCell>
                                  <TableCell sx={{ borderbottom: '1px solid #ddd', width: 250 }}>
                                    <Checkbox
                                      name="check"
                                      color="primary"
                                      //  checked={value.check === 1 ? true : select.check}
                                      className="py-0 px-5"

                                      // onChange={(e) => {
                                      //     updateSelect(e)
                                      //     getOttime(e.target.checked)
                                      // }}
                                    />
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Box>
    </CardMaster>
  )
}

export default memo(DietOrderSearch)
