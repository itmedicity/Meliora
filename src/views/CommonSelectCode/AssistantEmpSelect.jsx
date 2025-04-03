import { Autocomplete } from '@mui/joy';
import React, { useEffect, memo, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAssistantemployee } from 'src/redux/actions/AssistantEmp.action'

const AssistantEmpSelect = ({ postdata, setValue }) => {


    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const assistantemp = useSelector((state) => {
        return state.getAssistantemployee.assistantempList || 0
    })
    const [employees, setemployees] = useState([{ em_id: 0, em_name: '' }]);
    const [selectedValues, setSelectedValues] = useState([]);

    useEffect(() => {
        dispatch(getAssistantemployee(postdata))
    }, [dispatch, postdata])

    const Onclick = useCallback((values) => {
        if (values !== null) {
            const empArray = values.map((value) => value.em_id);
            setSelectedValues(values);
            setValue(empArray);
        } else {
            setSelectedValues([]);
        }
    }, [setSelectedValues, setValue]);

    useEffect(() => {
        if (assistantemp.length > 0) {
            setemployees(assistantemp);
        }
    }, [assistantemp]);

    return (
        <Autocomplete
            placeholder="Add Assignee"
            sx={{
                width: '100%',
                minHeight: 35,
                bgcolor: 'transparent'
            }}
            multiple

            value={selectedValues}
            clearOnBlur
            onChange={(_, newValue) => {
                Onclick(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => {
                setInputValue(newInputValue);
            }}
            loading={true}
            loadingText="Loading..."
            freeSolo
            isOptionEqualToValue={(option, value) => option.em_id === value.em_id}
            getOptionLabel={(option) => option.em_name || ''}
            options={employees}

        />

    )
}




//     const assistantemp = useSelector((state) => {
//         return state.getAssistantemployee.assistantempList || 0
//     })
//     useEffect(() => {
//         dispatch(getAssistantemployee(postdata))
//     }, [dispatch, postdata])

//     const handleChange = (e) => {
//         const {
//             target: { value }
//         } = e;
//         setValue(
//             // On autofill we get a the stringified value.
//             typeof value === "string" ? value.split(",") : value
//         );
//     };

//     return (
//         <Box >
//             <FormControl fullWidth size="small"  >
//                 <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={value}
//                     onChange={handleChange}
//                     size="small"
//                     fullWidth
//                     multiple
//                     variant='outlined'
//                     sx={{ height: 30, p: 0, m: 0, lineHeight: 1.200 }}
//                 >
//                     <MenuItem value={0} disabled  >Select Employee</MenuItem>
//                     {
//                         assistantemp && assistantemp.map((val, index) => {
//                             return <MenuItem key={index} value={val.em_id}>{val.em_name}</MenuItem>
//                         })
//                     }
//                 </Select>
//             </FormControl>
//         </Box>
//     )
// }
export default memo(AssistantEmpSelect)