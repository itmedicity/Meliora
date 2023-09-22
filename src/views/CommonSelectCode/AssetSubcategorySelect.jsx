import React ,{ useEffect, memo,useState ,Fragment}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionTyps } from 'src/redux/constants/action.type';
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'

const AssetSubcategorySelect = ({subcategory, category,setSubcategory, setName }) => {
  const dispatch = useDispatch();

  const { FETCH_ASSET_SUBCATEGORY } = ActionTyps;
  const assetSubcat = useSelector((state) => state.getAmSubcategory.SubcategoryList)
  const [subcats, setSubcats] = useState([{ subcategory_slno: 0, subcategory_name: '' }])

  const [value, setValue] = useState(subcats[0]);
  const [inputValue, setInputValue] = useState('');   
  useEffect(() => {
      if (value !== null) {
          dispatch({ type: FETCH_ASSET_SUBCATEGORY, payload: value.subcategory_slno })
           setSubcategory(value.subcategory_slno)
          setName(value.subcategory_name)
      } else {
          dispatch({ type: FETCH_ASSET_SUBCATEGORY, payload: 0 })
          setSubcategory(0)
          setName('')
      }
      return
  }, [value, FETCH_ASSET_SUBCATEGORY, dispatch, setSubcategory, setName])


  useEffect(() => {
    assetSubcat.length > 0 && setSubcats(assetSubcat)
        }, [assetSubcat])

 
  return (

    <Fragment >
    <CssVarsProvider>
        <Autocomplete
            sx={{
                "--Input-minHeight": "29px"
                  }}
                  value={subcategory === 0 ||category===0? subcats : value}
            placeholder="Select Subcategory"
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
            isOptionEqualToValue={(option, value) => option.subcategory_name === value.subcategory_name}
            getOptionLabel={option => option.subcategory_name || ''}
            options={subcats}
        />
    </CssVarsProvider>
    </Fragment>  
  )
}

export default memo(AssetSubcategorySelect)

























//   const dispatch = useDispatch()
//   const subcategory = useSelector((state) => {
//     return state.getAmSubcategory.SubcategoryList || 0
//   })
//   useEffect(() => {
//     dispatch(getAmSubcategory(category))
//   }, [dispatch, category])
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
//             Select Subcategory
//           </MenuItem>
//           {subcategory &&
//             subcategory.map((val, index) => {
//               return (
//                 <MenuItem key={index} name={val.subcategory_name} value={val.subcategory_slno}>
//                   {val.subcategory_name}
//                 </MenuItem>
//               )
//             })}
//         </Select>
//       </FormControl>
//     </Box>
//   )
// }

