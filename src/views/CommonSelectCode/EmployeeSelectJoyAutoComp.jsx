import React, { useEffect, memo, useState, Fragment, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/';

const EmployeeSelectJoyAutoComp = ({ employee, setEmployee }) => {
    const empnameselect = useSelector((state) => state.getDepartSecemployee.departsecempList || []);
    const [employees, setEmployees] = useState([]);
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (empnameselect.length > 0) {
            setEmployees(empnameselect);
        }
    }, [empnameselect]);

    useEffect(() => {
        if (employee !== 0) {
            const selectedEmployee = employees.find((emp) => emp.em_id === employee);
            setValue(selectedEmployee || null);
        } else {
            setValue(null);
        }
    }, [employee, employees]);

    const Onclick = useCallback((newValue) => {
        if (newValue !== null) {
            setValue(newValue);
            setEmployee(newValue.em_id);
        } else {
            setEmployee(0);
        }
    }, [setEmployee]);

    return (
        <Fragment>
            <CssVarsProvider>
                <Autocomplete
                    sx={{ width: '100%' }}
                    value={value} // Bind the correct employee object to `value`
                    placeholder="Select Employee"
                    clearOnBlur
                    style={{ minHeight: 36, fontWeight: 400, fontSize: 15 }}
                    onChange={(event, newValue) => {
                        Onclick(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    loading={employees.length === 0}
                    loadingText="Loading..."
                    freeSolo
                    isOptionEqualToValue={(option, value) => option.em_id === value?.em_id}
                    getOptionLabel={(option) => option.em_name || ''}
                    options={employees}
                />
            </CssVarsProvider>
        </Fragment>
    );
};

export default memo(EmployeeSelectJoyAutoComp);














// import React, { useEffect, memo, useState, Fragment, useCallback } from 'react'
// import { useSelector } from 'react-redux'
// import Autocomplete from '@mui/joy/Autocomplete';
// import { CssVarsProvider } from '@mui/joy/';

// const EmployeeSelectJoyAutoComp = ({ employee, setEmployee }) => {

//     const empnameselect = useSelector((state) => { return state.getDepartSecemployee.departsecempList || 0 })
//     const [employees, setemployees] = useState([{ em_id: 0, em_name: '' }]);
//     const [value, setValue] = useState(employees[0]);
//     const [inputValue, setInputValue] = useState('');

//     console.log("employee", employee);


//     useEffect(() => {
//         if (empnameselect.length > 0) {
//             setemployees(empnameselect);
//         }
//     }, [empnameselect]);
//     const Onclick = useCallback((value) => {
//         if (value !== null) {

//             setValue(value)
//             setEmployee(value.em_id)
//         }
//         else {
//             setEmployee(0)
//         }
//         return
//     }, [setEmployee])
//     return (
//         <Fragment >
//             <CssVarsProvider>
//                 <Autocomplete
//                     sx={{
//                         width: '100%',

//                     }}
//                     value={employee !== 0 ? employee : employee === 0 ? employees : value}
//                     placeholder="Select Employee"
//                     clearOnBlur
//                     style={{ minHeight: 36, fontWeight: 400, fontSize: 15 }}
//                     onChange={(event, newValue) => {
//                         setValue(newValue);
//                         Onclick(newValue);
//                     }}
//                     inputValue={inputValue}
//                     onInputChange={(event, newInputValue) => {
//                         setInputValue(newInputValue);
//                     }}
//                     loading={true}
//                     loadingText="Loading..."
//                     freeSolo
//                     isOptionEqualToValue={(option, value) => option.em_id === value.em_id}
//                     getOptionLabel={(option) => option.em_name || ''}
//                     options={employees}
//                 />
//             </CssVarsProvider>
//         </Fragment>
//     )
// }

// export default memo(EmployeeSelectJoyAutoComp)