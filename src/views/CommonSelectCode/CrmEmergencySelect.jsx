import React, { useEffect, memo, useState, Fragment } from 'react'
import { axioslogin } from '../Axios/Axios';
import { Box, CssVarsProvider, Option, Select } from '@mui/joy';

const CrmEmergencySelect = ({ value, setValue }) => {
    const [crmEmerList, setCrmEmrList] = useState([])

    useEffect(() => {
        const getCrmEmergncyLIst = async () => {
            const result = await axioslogin.get('/crmEmergncyType/CrmEmerListSelect');
            const { success, data } = result.data
            if (success === 2) {
                setCrmEmrList(data)
            }
            else {
                setCrmEmrList([])
            }
        }
        getCrmEmergncyLIst()
    }, [])

    return (
        <Fragment>
            <CssVarsProvider>
                <Select
                    sx={{ height: 25, p: 0, m: 0, lineHeight: 1.200, fontSize: 13, pl: 1 }}
                    slotProps={{
                        listbox: { placement: 'bottom-start' },
                    }}
                    placeholder="Select Emergency Type"
                    value={value}
                    onChange={(e, newValue) => setValue(newValue)}
                >
                    {crmEmerList?.map((val) => (
                        <Option key={val.emergency_slno} value={val.emergency_slno} label={val.emer_type_name}>
                            {val.emer_type_name}
                        </Option>
                    ))}
                </Select>
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(CrmEmergencySelect)