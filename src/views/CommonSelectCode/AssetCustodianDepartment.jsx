import { Autocomplete, CssVarsProvider } from '@mui/joy';
import React, { memo, useCallback, useEffect, useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import { getCustodianDept } from 'src/api/AssetApis';

const AssetCustodianDepartment = ({ custoDian, setCustodian, setcustodianAllDetails }) => {

    const defaultCustodian = useMemo(() => ({
        am_custodian_slno: 0,
        am_custodian_dept_slno: 0,
        am_custodian_name: '',
        am_custdn_asset_no_first: '',
        am_custdn_asset_no_second: '',
        am_custodian_deptsec_slno: 0,
        sec_name: '',
    }), []);

    const [custoDianX, setCustodianX] = useState([defaultCustodian]);
    const [value, setValue] = useState(defaultCustodian);
    const [inputValue, setInputValue] = useState('');


    const { data: custodianArray = [] } = useQuery({
        queryKey: ['getCustodianDept'],
        queryFn: getCustodianDept,
    });


    useEffect(() => {
        if (custoDian !== 0 && custodianArray.length > 0) {
            const selectedCustodian = custodianArray.find((e) => e.am_custodian_slno === custoDian) || defaultCustodian;
            setValue(selectedCustodian);
        }
    }, [custoDian, custodianArray, defaultCustodian]);

    useEffect(() => {
        if (custodianArray.length > 0) {
            setCustodianX(custodianArray);
        }
    }, [custodianArray]);


    const handleOnChange = useCallback(
        (newValue) => {
            if (newValue) {
                setValue(newValue);
                setcustodianAllDetails(newValue);
                setCustodian(newValue.am_custodian_slno);
            } else {
                setValue(defaultCustodian);
                setCustodian(0);
            }
        },
        [setCustodian, setcustodianAllDetails, defaultCustodian]
    );

    const Options = useMemo(() => custoDianX, [custoDianX]);

    return (
        <CssVarsProvider>
            <Autocomplete
                sx={{
                    "--Input-minHeight": "32px",
                }}
                value={value}
                placeholder="Select custodian"
                clearOnBlur
                onChange={(event, newValue) => handleOnChange(newValue)}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                loading={custodianArray.length === 0}
                loadingText="Loading..."
                freeSolo
                isOptionEqualToValue={(option, value) => option.am_custodian_slno === value.am_custodian_slno}
                getOptionLabel={(option) => option.am_custodian_name || ''}
                options={Options}
            />
        </CssVarsProvider>
    );
};

export default memo(AssetCustodianDepartment);

