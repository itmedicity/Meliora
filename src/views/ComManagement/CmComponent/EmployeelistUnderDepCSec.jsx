import React, { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Autocomplete } from '@mui/joy';

const EmployeelistUnderDepCSec = ({ value, setValue }) => {
    const [inputValue, setInputValue] = useState('');
    const empnameselect = useSelector((state) => state.getDepartSecemployee.departsecempList || []);
    const [employees, setEmployees] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);

    // Handle selection and update the selected values and IDs
    const Onclick = useCallback((values) => {
        if (values !== null) {
            const empArray = values.map((value) => value.em_id);
            setSelectedValues(values); // Set selected employee objects
            setValue(empArray); // Update the parent with employee IDs
        } else {
            setSelectedValues([]); // Clear the selection
        }
    }, [setSelectedValues, setValue]);

    useEffect(() => {
        if (empnameselect.length > 0) {
            setEmployees(empnameselect);
        }
    }, [empnameselect]);

    // Set the selected employees when the `value` (array of em_id) changes
    useEffect(() => {
        if (value.length > 0 && employees.length > 0) {
            const selectedEmps = employees.filter(emp => value.includes(emp.em_id));
            setSelectedValues(selectedEmps); // Set selected employee objects
        } else {
            setSelectedValues([]); // Clear if no value or no employees
        }
    }, [value, employees]);

    return (
        <Autocomplete
            placeholder="Serviced Employees"
            multiple
            style={{ minHeight: 35 }}
            value={selectedValues} // Bind to the selected employee objects
            clearOnBlur
            onChange={(_, newValue) => {
                Onclick(newValue); // Handle selection changes
            }}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => {
                setInputValue(newInputValue);
            }}
            loading={employees.length === 0} // Show loading when no employees available
            loadingText="Loading..."
            freeSolo
            isOptionEqualToValue={(option, value) => option.em_id === value?.em_id}
            getOptionLabel={(option) => option.em_name || ''}
            options={employees} // Pass the list of employees
        />
    );
};

// const EmployeelistUnderDepCSec = ({ value, setValue }) => {
//     const [inputValue, setInputValue] = useState('');
//     const empnameselect = useSelector((state) => state.getDepartSecemployee.departsecempList || []);
//     const [employees, setEmployees] = useState([]);
//     const [selectedValues, setSelectedValues] = useState([]);

//     const Onclick = useCallback((values) => {
//         if (values) {
//             const empArray = values.map((value) => value.em_id);
//             setSelectedValues(values);
//             setValue(empArray);
//         } else {
//             setSelectedValues([]);
//         }
//     }, [setSelectedValues, setValue]);

//     useEffect(() => {
//         if (empnameselect && empnameselect.length > 0) {
//             setEmployees(empnameselect);
//         }
//     }, [empnameselect]);

//     useEffect(() => {
//         if (value && value.length > 0 && employees.length > 0) {
//             const selectedEmps = employees.filter(emp => value.includes(emp.em_id));
//             setSelectedValues(selectedEmps);
//         } else {
//             setSelectedValues([]);
//         }
//     }, [value, employees]);

//     return (
//         <Autocomplete
//             placeholder="Serviced Employees"
//             multiple
//             style={{ minHeight: 35 }}
//             value={selectedValues}
//             clearOnBlur
//             onChange={(_, newValue) => {
//                 Onclick(newValue);
//             }}
//             inputValue={inputValue}
//             onInputChange={(_, newInputValue) => {
//                 setInputValue(newInputValue);
//             }}
//             loading={employees.length === 0}
//             loadingText="Loading..."
//             freeSolo
//             isOptionEqualToValue={(option, value) => option.em_id === value?.em_id}
//             getOptionLabel={(option) => option.em_name || ''}
//             options={employees}
//         />
//     );
// };


export default memo(EmployeelistUnderDepCSec);




