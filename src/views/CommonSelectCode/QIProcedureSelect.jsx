import { FormControl, MenuItem, Select } from '@mui/material';
import React, { Fragment, memo, useCallback } from 'react'

const QIProcedureSelect = ({ procName, setProcName, procedureList, setProcNamedisplay }) => {

    const ProcedureChange = useCallback((e) => {
        setProcName(e.target.value);
    }, [setProcName]);

    return (
        <Fragment>
            <FormControl fullWidth
                style={{ backgroundColor: 'white' }}
            >
                <Select
                    size="small" fullWidth
                    style={{ height: 32, fontSize: 14, backgroundColor: 'white' }}
                    defaultValue={0}
                    value={procName}
                    onChange={(e, { props }) => {
                        ProcedureChange(e);
                        setProcNamedisplay(props.children)
                    }}
                >
                    <MenuItem disabled value={0}>-Select Procedure-</MenuItem>
                    {
                        procedureList?.map((val, index) => (
                            <MenuItem key={index} value={val.PD_CODE}>
                                {val.PDC_DESC}
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Fragment >
    )
}

export default memo(QIProcedureSelect)