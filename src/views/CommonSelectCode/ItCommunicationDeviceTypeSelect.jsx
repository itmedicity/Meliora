import React, { memo,  useEffect,  } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { ActionTyps } from 'src/redux/constants/action.type';
// import Autocomplete from '@mui/joy/Autocomplete';
// import { CssVarsProvider } from '@mui/joy/'
import { FormControl, MenuItem, Select } from '@mui/material';
import { getDeviceType } from 'src/redux/actions/ItCommunicationdevice.action';



const ItCommunicationDeviceTypeSelect = ({  value, setValue   }) => {
    const dispatch = useDispatch()
  const deviceType = useSelector((state) => {
    return state.getDeviceType.deviceTypeList || 0
  })
  useEffect(() => {
    dispatch(getDeviceType())
  }, [dispatch])
  
    return (
        // <Fragment >
        //     <CssVarsProvider>
        //         <Autocomplete
        //             sx={{
        //                 "--Input-minHeight": "29px"
        //             }}
        //             value={deviceType === 0 ? deviceTypeCommunication : value}
        //             placeholder="select communication device type"
        //             clearOnBlur
        //             onChange={(event, newValue) => {
        //                 setValue(newValue);
        //             }}
        //             inputValue={inputValue}
        //             onInputChange={(event, newInputValue) => {
        //                 setInputValue(newInputValue);
        //             }}
        //             loading={true}
        //             loadingText="Loading..."
        //             freeSolo
        //             // renderInput={(params) => (<Input size="sm" placeholder="Small"  {...params} />)}
        //             isOptionEqualToValue={(option, value) => option.device_type_name === value.device_type_name}
        //             getOptionLabel={option => option.device_type_name || ''}
        //             options={deviceTypeCommunication}
        //         />
        //     </CssVarsProvider>
        // </Fragment>
        <FormControl fullWidth size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
         Select Device type
          </MenuItem>
          {deviceType &&
            deviceType.map((val, index) => {
              return (
                <MenuItem key={index}  value={val.device_type_slno}>
                  {val.device_type_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    );
  }

export default memo(ItCommunicationDeviceTypeSelect)