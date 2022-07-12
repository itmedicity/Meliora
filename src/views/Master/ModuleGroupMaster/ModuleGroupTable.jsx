import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CustomMaterialTable from 'src/views/Components/CustomMaterialTable'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { tableIcons } from 'src/views/Common/MaterialiCon';

const ModuleGroupTable = ({ count, geteditdata }) => {
    const [tabledata, setTabledata] = useState([])
    const colums = [
        {
            title: "SlNo", field: "mod_grp_slno",
        },
        {
            title: "Module Group Name", field: "mod_grp_name",
        }
    ]
    /*** data get from module_group_mast to dispay data to table */
    useEffect(() => {
        const getmodule = async () => {
            const result = await axioslogin.get('/modulegroup')
            const { success, data } = result.data;
            if (success === 1) {
                setTabledata(data);
            } else {
                warningNotify(" Error occured contact EDP")
            }
        }
        getmodule();
    }, [count])

    return (
        <CustomMaterialTable
            title="Module Group Master"
            columns={colums}
            data={tabledata}
            icons={tableIcons}
            actions={[
                {
                    icon: () => <EditOutlinedIcon />,
                    tooltip: " Click here to Edit",
                    onClick: (e, data) => geteditdata(data)
                }
            ]}
        />
    )
}

export default memo(ModuleGroupTable)