import { Box } from '@mui/joy';
import React, { memo, useMemo, useState } from 'react'
import KotItemHeader from '../KotItemList/KotItemHeader';
import PettyCashTab from './PettycashComponents/PettyCashTab';
import PettyCashTables from './PettycashComponents/PettyCashTables';
import { useEmployeePettyCashDetails } from '../CommonData/UseQuery';
import EmployeeSearch from './PettycashComponents/EmployeeSearch';

const PettycashDetail = () => {
    const [activetab, setActiveTab] = useState("ISSUED");

    const { data: EmployeePettyCash = [] } = useEmployeePettyCashDetails();

    console.log({
        EmployeePettyCash
    });



    const FilteredEmployeePettyDetails = useMemo(() => {
        return EmployeePettyCash && Array.isArray(EmployeePettyCash) ?
            EmployeePettyCash?.filter(item => item?.petty_cash_status === activetab) : []
    }, [EmployeePettyCash, activetab])

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <KotItemHeader name="USER PETTY CASH" />

            <Box sx={{
                // // bgcolor: 'red',
                // height: 40
            }}>
                <EmployeeSearch />
            </Box>

            <PettyCashTab
                activeTab={activetab}
                setActiveTab={setActiveTab}
            />
            <PettyCashTables
                activetab={activetab}
                tabledata={FilteredEmployeePettyDetails}
            />

        </Box>
    )
}

export default memo(PettycashDetail);