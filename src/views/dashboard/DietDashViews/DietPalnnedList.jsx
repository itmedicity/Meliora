import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { useHistory } from 'react-router-dom';
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain';
import { Box } from '@mui/system'
import { getDietPlanned } from 'src/redux/actions/DietPlannedList.action';

const DietPalnnedList = () => {

    //for routing
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDietPlanned())
    }, [dispatch])

    const dietPlannedList = useSelector((state) => {
        return state.setDietPlaned.plannedList
    })

    //data setting in table
    const [column] = useState([
        { headerName: "Sl No", field: "dietpt_slno", autoHeight: true, wrapText: true, width: 120 },
        { headerName: "Ip No", field: "ip_no", filter: "true", autoHeight: true, wrapText: true, width: 200 },
        { headerName: "Pt No", field: "pt_no", filter: "true", autoHeight: true, wrapText: true, width: 200 },
        { headerName: "Pateint Name", field: "ptc_ptname", filter: "true", autoHeight: true, wrapText: true, width: 280 },
        { headerName: "Ip Date", field: "ipd_date", autoHeight: true, wrapText: true, width: 190 },
        { headerName: "Sex", field: "ptc_sex", width: 100, autoHeight: true, wrapText: true },
        { headerName: "Nursing Station", field: "nsc_desc", filter: "true", autoHeight: true, wrapText: true, width: 200 },
        { headerName: "Room", field: "rmc_desc", autoHeight: true, wrapText: true, width: 200 },
        { headerName: "Doctor Name", field: "doc_name", filter: "true", autoHeight: true, wrapText: true, width: 250 },
        { headerName: "Diet Name", field: "diet_name", filter: "true", autoHeight: true, wrapText: true, width: 200 },
        { headerName: "Diet status", field: "plan", filter: "true", autoHeight: true, wrapText: true, width: 250 },
        { headerName: "Planned date", field: "plan_date", filter: "true", autoHeight: true, wrapText: true, width: 190 }
    ])



    //Close function
    const backToSetting = useCallback(() => {
        history.push(`/Home`)
    }, [history])


    return (
        <CardCloseOnly
            title='Diet Planned List'
            close={backToSetting}
        >
            <Box sx={{ p: 1 }}>
                <CusAgGridForMain
                    columnDefs={column}
                    tableData={dietPlannedList}
                />
            </Box>
        </CardCloseOnly>
    )
}

export default memo(DietPalnnedList)