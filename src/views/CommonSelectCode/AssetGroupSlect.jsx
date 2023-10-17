import React, { useEffect, memo, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'
import { getAmSubGroupList } from 'src/redux/actions/AmSubGroupList.action';


const AssetGroupSlect = ({ group, setGroup, setName }) => {
    const dispatch = useDispatch();
    const assetGrps = useSelector((state) => state.getGroup?.AssetGroupList)
    const [grps, setGrps] = useState([{ group_slno: 0, group_name: '' }])
    const [value, setValue] = useState(grps[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (group !== 0) {
            let newObj = assetGrps?.find((e) => e.group_slno === group)
            setValue(newObj)
        }
    }, [group, assetGrps])

    useEffect(() => {
        if (value !== null) {
            dispatch(getAmSubGroupList(value.group_slno))
            setGroup(value.group_slno)
            setName(value.group_name)
        } else {
            dispatch(getAmSubGroupList(0))
            setGroup(0)
            setName('')
        }
        return
    }, [value, setGroup, dispatch, setName])


    useEffect(() => {
        assetGrps.length > 0 && setGrps(assetGrps)
    }, [assetGrps])


    return (
        <Fragment >
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px"
                    }}
                    value={group === 0 ? grps : value}
                    placeholder="Select Group"
                    clearOnBlur
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    loading={true}
                    loadingText="Loading..."
                    freeSolo
                    // renderInput={(params) => (<Input size="sm" placeholder="Small"  {...params} />)}
                    isOptionEqualToValue={(option, value) => option.group_name === value.group_name}
                    getOptionLabel={option => option.group_name || ''}
                    options={grps}
                />
            </CssVarsProvider>
        </Fragment>
    )
}






























//   const dispatch = useDispatch()
//   const group = useSelector((state) => {
//     return state.getGroup.AssetGroupList || 0
//   })
//   useEffect(() => {
//     dispatch(getGroup())
//   }, [dispatch])
//   return (
//     <Box>
//       <FormControl fullWidth size="small">
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={value}
//           onChange={(e, { props }) => {
//             setValue(e.target.value)
//             setName(props.name)
//           }}
//           size="small"
//           fullWidth
//           variant="outlined"
//           sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
//         >
//           <MenuItem value={0} disabled>
//             Select Group
//           </MenuItem>
//           {group &&
//             group.map((val, index) => {
//               return (
//                 <MenuItem key={index} name={val.group_name} value={val.group_slno}>
//                   {val.group_name}
//                 </MenuItem>
//               )
//             })}
//         </Select>
//       </FormControl>
//     </Box>
//   )
// }

export default memo(AssetGroupSlect)
