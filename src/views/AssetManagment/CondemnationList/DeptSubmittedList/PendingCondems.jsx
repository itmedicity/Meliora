import { Box, CircularProgress, Table, Chip } from '@mui/joy';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import React, { memo } from 'react'
import { taskColor } from 'src/color/Color';
import { getStatusInfo } from '../CondemStatus';
import FormattedDate from 'src/views/Components/FormattedDate';

const PendingCondems = memo(({ condemStatusPending = [], loadingPending, editForm, viewForm, }) => {


  return (
    <Box sx={{ width: '100%', height: '74vh', }}>
      {loadingPending ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '74vh' }}>
          <CircularProgress size="lg" />
        </Box>
      ) : condemStatusPending.length === 0 ? (
        <Box
          sx={{
            fontSize: 26,
            fontWeight: 600,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '65vh',
            width: '100%',
            textAlign: 'center',
            color: 'lightgrey',
            borderRadius: 2
          }}
        >
          Empty List
        </Box>
      ) : (
        <Table stickyHeader size="sm" sx={{ borderRadius: 2, }} borderAxis="both">
          <thead>
            <tr>
              <th style={{ textAlign: 'center', width: 10 }}>
                Serial No.
              </th>
              <th style={{ textAlign: 'center', width: 10 }}>
                Action
              </th>
              <th style={{ textAlign: 'center', width: 20 }}>
                Status
              </th>
              <th style={{ textAlign: 'center', width: 22 }}>
                Form Number
              </th>
              <th style={{ textAlign: 'center', width: 15 }}>
                Registered Date
              </th>
              <th style={{ textAlign: 'center', width: 10 }}>
                Asset Count
              </th>
              <th style={{ textAlign: 'center', width: 10 }}>
                Spare Count
              </th>
            </tr>
          </thead>
          <tbody>
            {condemStatusPending?.map((val, index) => {
              const { text, bgcolor } = getStatusInfo(val);
              return (
                <tr key={index}>
                  <td style={{ textAlign: 'center' }}>{index + 1}</td>
                  <td style={{ textAlign: 'center' }}>
                    {val.inch_level_acknowledge === 0 && val.hod_level_acknowledge === 0 ? (
                      <Chip

                        startDecorator={<DriveFileRenameOutlineIcon sx={{ color: taskColor.darkPurple, mt: 0.1 }} />}
                        sx={{
                          border: 1,
                          color: taskColor.darkPurple,
                          textAlign: 'center',
                          fontWeight: 700,
                          cursor: 'pointer',
                          fontSize: 13,
                          px: 2
                        }}
                        onClick={() => editForm(val)}
                      >
                        Edit
                      </Chip>

                    ) : (

                      <Chip
                        sx={{
                          border: 1,
                          color: taskColor.darkPurple,
                          textAlign: 'center',
                          fontWeight: 700,
                          cursor: 'pointer',
                          fontSize: 13,
                          px: 2
                        }}
                        onClick={() => viewForm(val)}
                      >
                        View
                      </Chip>

                    )}
                  </td>
                  <td>
                    <Box
                      sx={{
                        bgcolor,
                        color: 'black',
                        fontWeight: 600,
                        display: 'flex',
                        justifyContent: 'center',
                        py: 0.3
                      }}
                    >
                      {text}
                    </Box>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {val.condem_form_prefix}/{val.condem_form_no}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <FormattedDate date={val.reg_date} />

                  </td>
                  <td style={{ textAlign: 'center' }}>{val.count_of_asset || '-'}</td>
                  <td style={{ textAlign: 'center' }}>{val.count_of_spare || '-'}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      )}
    </Box>
  );
});

export default memo(PendingCondems);
