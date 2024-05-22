import React, { memo } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useSelector } from 'react-redux'

const SupplierSelectMaster = ({ supplier, setSupplier }) => {
    const SupplierList = useSelector((state) => state.setSupplierSelect?.SupplierSelectList)

    return (
        <Box sx={{ mt: 1 }} >
            <FormControl fullWidth size="small"  >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    size="small"
                    fullWidth
                    variant='outlined'
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                >
                    <MenuItem value={0} disabled  >Select Supplier</MenuItem>
                    {
                        SupplierList && SupplierList.map((val, index) => {
                            return <MenuItem key={index} value={val.it_supplier_slno}>{val.it_supplier_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(SupplierSelectMaster)




// import React, { useEffect, memo, useState, Fragment } from 'react'
// import { useSelector } from 'react-redux'
// import Autocomplete from '@mui/joy/Autocomplete';
// import { CssVarsProvider } from '@mui/joy/'
// import { useDispatch } from 'react-redux'

// const SupplierSelectMaster = ({ supplier, setSupplier }) => {
//     const dispatch = useDispatch();
//     const SupplierList = useSelector((state) => state.setSupplierSelect?.SupplierSelectList)

//     const [models, setModels] = useState([{ it_supplier_slno: 0, it_supplier_name: '' }])
//     const [value, setValue] = useState(models[0]);
//     const [inputValue, setInputValue] = useState('');

//     useEffect(() => {
//         if (location !== 0) {
//             let newObj = DeptSecArry?.find((e) => e.sec_id === location)
//             dispatch(getRoomBasedOnDeptSec(location))
//             setValue(newObj)
//         }
//     }, [location, DeptSecArry, dispatch])

//     useEffect(() => {
//         if (value !== null) {
//             setLocation(value.sec_id)
//             if (value.sec_id !== 0) {
//                 dispatch(getRoomBasedOnDeptSec(value.sec_id))
//             }
//         } else {
//             setLocation(0)
//         }
//         return
//     }, [value, setLocation, dispatch])

//     useEffect(() => {
//         SupplierList.length > 0 && setDeptSections(SupplierList)
//     }, [SupplierList])




//     return (
//         <Fragment >
//             <CssVarsProvider>
//                 <Autocomplete
//                     sx={{
//                         "--Input-minHeight": "29px"
//                     }}
//                     value={supplier === 0 ? models : value}
//                     placeholder="Select Supplier"
//                     clearOnBlur
//                     onChange={(event, newValue) => {
//                         setValue(newValue);
//                     }}
//                     inputValue={inputValue}
//                     onInputChange={(event, newInputValue) => {
//                         setInputValue(newInputValue);
//                     }}
//                     loading={true}
//                     loadingText="Loading..."
//                     freeSolo
//                     // renderInput={(params) => (<Input size="sm" placeholder="Small"  {...params} />)}
//                     isOptionEqualToValue={(option, value) => option.it_supplier_name === value.it_supplier_name}
//                     getOptionLabel={option => option.it_supplier_name || ''}
//                     options={models}
//                 />
//             </CssVarsProvider>
//         </Fragment>
//     )
// }

// export default memo(SupplierSelectMaster)