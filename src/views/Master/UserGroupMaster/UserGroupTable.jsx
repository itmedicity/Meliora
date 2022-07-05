import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CustomMaterialTable from 'src/views/Components/CustomMaterialTable'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { tableIcons } from 'src/views/Common/MaterialiCon';

const UserGroupTable = ({ count, geteditdata }) => {
    const [tabledata, setTabledata] = useState([])
    const colums = [
        {
            title: "SlNo", field: "user_grp_slno",
        },
        {
            title: "Group Name", field: "user_grp_name",
        },
        {
            title: "Status", field: "status",
        },
    ]
    useEffect(() => {
        const getUserGroup = async () => {
            const result = await axioslogin.get('/usergroup')
            const { success, data } = result.data;
            if (success === 1) {
                setTabledata(data);
            } else {
                warningNotify(" Error occured contact EDP")
            }
        }
        getUserGroup();
    }, [count])

    return (
        <CustomMaterialTable
            title="User Group Table"
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

export default memo(UserGroupTable)