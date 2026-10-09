
import React, { memo } from 'react'
import CardMaster from '../Components/CardMaster'
import TextFieldCustom from '../Components/TextFieldCustom'
import { Box, Checkbox, Sheet, Table } from '@mui/joy'

const DietOrderSearch = ({ dietdetail, setDietdetail, dietcrct, slno }) => {
  return (
    <CardMaster title="Diet Menu">
      <Box sx={{ width: '100%', pl: 1, pt: 1, pr: 1, pb: 1 }}>
        <Box sx={{ pl: 1, pt: 1, pr: 1, pb: 1 }}>
          <Box
            sx={{
              width: '100%',
              pl: 1,
              pt: 0.5,
              pr: 1,
              pb: 0.5,
              display: 'flex',
              flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' }
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
              flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' }
            }}
          >
            <Sheet
              variant="outlined"
              sx={{
                height: 400,
                overflow: 'auto',
              }}
            >
              <Table
                stickyHeader
                size="sm"
                hoverRow
                sx={{ minWidth: 100 }}
              >
                <thead>
                  <tr>
                    <th style={{ width: 70 }}>Type Description</th>
                    <th style={{ width: 70 }}>Items</th>
                  </tr>
                </thead>

                <tbody>
                  {dietcrct?.map((val) => (
                    <React.Fragment key={val.type_slno}>
                      <tr>
                        <td >
                          {val.type_desc}
                        </td>
                        <td></td>
                      </tr>

                      {slno?.map((value) => (
                        <tr key={value.type_slno}>
                          <td style={{ width: 250, }}>
                            {value.item_name}
                          </td>
                          <td style={{ width: 250, }}>
                            <Checkbox
                              name="check"
                              color="primary"
                              size="sm"
                            />
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            </Sheet>

          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(DietOrderSearch)
