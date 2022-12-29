import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { useHistory } from 'react-router-dom';
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain';
import { Box } from '@mui/system'
import { getDietPlanPending } from 'src/redux/actions/DietPlanPending.action';

const DietPlanPendingList = () => {
    //for routing
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDietPlanPending())
    }, [dispatch])

    const dietPlanPending = useSelector((state) => {
        return state.setDietPlanPending.planPendingList
    })

    //data setting in table
    const [column] = useState([
        { headerName: "Sl No", field: "dietpt_slno", autoHeight: true, wrapText: true, width: 150 },
        { headerName: "Ip No", field: "ip_no", filter: "true", autoHeight: true, wrapText: true, width: 250 },
        { headerName: "Pt No", field: "pt_no", filter: "true", autoHeight: true, wrapText: true, width: 280 },
        { headerName: "Pateint Name", field: "ptc_ptname", filter: "true", autoHeight: true, wrapText: true, width: 280 },
        { headerName: "Ip Date", field: "ipd_date", filter: "true", autoHeight: true, wrapText: true, width: 280 },
        { headerName: "Sex", field: "ptc_sex", filter: "true", width: 200, autoHeight: true, wrapText: true },
        { headerName: "Nursing Station", field: "nsc_desc", filter: "true", autoHeight: true, wrapText: true, width: 200 },
        { headerName: "Room", field: "rmc_desc", autoHeight: true, wrapText: true, width: 200 },
        { headerName: "Doctor Name", field: "doc_name", filter: "true", autoHeight: true, wrapText: true, width: 250 },
    ])

    //Close function
    const backToSetting = useCallback(() => {
        history.push(`/Home`)
    }, [history])

    return (
        <CardCloseOnly
            title='Diet Plan Pending List'
            close={backToSetting}
        >
            <Box sx={{ p: 1 }}>
                <CusAgGridForMain
                    columnDefs={column}
                    tableData={dietPlanPending}
                />
            </Box>
        </CardCloseOnly>
    )
}

export default memo(DietPlanPendingList)