import { FormControl, MenuItem, Select } from '@mui/material';
import React, { Fragment, memo, useCallback } from 'react'
import { useSelector } from 'react-redux';
import { axioslogin } from '../Axios/Axios';

const QIEquipmentSelect = ({ equipment, setEquipment, setProcedureList, setProcName, setequipName }) => {

    const equipList = useSelector((state) => state.getEquipmentList.EquipmentList)

    const EquipmentChange = useCallback((e) => {
        setEquipment(e.target.value);
        const equip = e.target.value
        const getProcedures = async (equip) => {
            const result = await axioslogin.get(`/equipMast/procedure/${equip}`)
            return result.data
        }
        getProcedures(equip).then((val) => {
            const { success, data } = val
            if (success === 1) {
                const proc = JSON?.parse(data[0]?.procedure_names)
                setProcedureList(proc);
                setProcName(0)
            } else {
                setProcedureList([])
                setProcName(0)
            }
        })
        // setExistFlag(1)
    }, [setProcedureList, setEquipment, setProcName]);

    return (
        <Fragment>
            <FormControl fullWidth
                style={{ backgroundColor: 'white' }}
            >
                <Select
                    size="small" fullWidth
                    style={{ height: 32, fontSize: 14, backgroundColor: 'white' }}
                    defaultValue={0}
                    value={equipment}
                    onChange={(e, { props }) => {
                        EquipmentChange(e);
                        setequipName(props.children)
                    }}
                >
                    <MenuItem disabled value={0}>-Select Equipment-</MenuItem>
                    {
                        equipList?.map((val, index) => (
                            <MenuItem key={index} value={val.equip_no}>
                                {val.equip_name}
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Fragment >
    )
}

export default memo(QIEquipmentSelect)