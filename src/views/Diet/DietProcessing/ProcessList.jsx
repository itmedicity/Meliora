import { Box } from '@mui/joy';
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DietMasterHeader from 'src/views/Master/DietMasters/DietComponent/DietMasterHeader'
import DietWiseProcessing from './DietWiseProcessing';
import ProcessCompletedList from './ProcessCompletedList';
import { warningNotify } from 'src/views/Common/CommonCode';
import { ProcessedList } from '../CommonData/Common';
import { useDietNames } from '../CommonData/UseQuery';

const ProcessList = () => {


    const navigate = useNavigate();
    const { data: DietName = [] } = useDietNames();


    const [selectedDiets, setSelectedDiets] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [selectedDietTimes, setSelectedDietTimes] = useState({});
    const [processedRows, setProcessedRows] = useState({});
    const [newpatientcount, setNewPatientCount] = useState(520); // NUMBER

    // Function to GoBack
    const hanldeGoBack = useCallback(() => {
        navigate('/Home/Settings')
    }, [navigate]);

    /* Function used for tracking which time have already processed only 
        use
    */
    const HandleDIetProcessing = useCallback(() => {
        // No diet selected
        if (!selectedDietTimes || Object.keys(selectedDietTimes).length === 0) {
            return warningNotify("Select Diet Before Processing");
        }
        // Diet selected but no time selected
        const hasAnyTime = Object.values(selectedDietTimes).some(
            times => Array.isArray(times) && times.length > 0
        );
        if (!hasAnyTime) {
            return warningNotify("Select Diet Time!");
        }
        setProcessing(true)
        setTimeout(() => {
            setProcessing(false)

            // mark selected rows as processed
            setProcessedRows(prev => {
                const updated = { ...prev }
                Object.entries(selectedDietTimes).forEach(([diet, times]) => {
                    times.forEach(time => {
                        updated[`${diet.toUpperCase()}|${time}`] = true
                    })
                })
                return updated
            })
        }, 2000)
    }, [selectedDietTimes])


    /**
     * function to handle New patient Orders fo diet
     * 
     * Using of Set for Unique 
     * Set is used to avoid duplicate diet names when the same diet appears in multiple rows.
     * 
     */
    const handleNewPatientOrder = useCallback(() => {
        const dietSet = new Set()   // to store unique diet names
        const timeMap = {}          // to store which meals each diet has

        ProcessedList.forEach(row => {
            if (row.new_Count !== null) {       // only consider rows with new patients
                const dietKey = row.diet_name.toUpperCase()
                dietSet.add(dietKey)            // add diet to the set
                if (!timeMap[dietKey]) timeMap[dietKey] = []
                timeMap[dietKey].push(row.type) // store the meal type
            }
        })

        setSelectedDiets(Array.from(dietSet)) // update state with all diets
        setSelectedDietTimes(timeMap)         // update state with meal types per diet
        setNewPatientCount(0)                 // reset new patient count

    }, [])


    // this is Dummy this only work when new Patient Comes under the Diet
    useEffect(() => {
        const interval = setInterval(() => {
            setNewPatientCount((prev) => prev + Math.floor(Math.random() * 5 + 1));
        }, 20000);
        return () => clearInterval(interval);
    }, []);

    const allDietNames = DietName?.map(d => d.diet_name);
    const isAllSelected =
        allDietNames.length > 0 &&
        selectedDiets.length === allDietNames.length

    return (
        <Box sx={{
            width: '100%',
            minHeight: '80%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Box sx={{
                width: '100%',
                minHeight: '80%',
                borderRadius: 5,
                border: '1px solid #9822c365',
            }}>

                {/* HEADER */}
                <DietMasterHeader
                    onClose={hanldeGoBack}
                    name="DIET PROCESS LIST"
                />

                <Box sx={{ p: 1 }}>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        gap: 2
                    }}>
                        <Box sx={{ width: '45%', boxShadow: "md" }}>
                            <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <DietWiseProcessing
                                    handleProcessing={HandleDIetProcessing}
                                    setSelectedDiets={setSelectedDiets}
                                    selectedDiets={selectedDiets}
                                    selectedDietTimes={selectedDietTimes}
                                    setSelectedDietTimes={setSelectedDietTimes}
                                    handleNewPatientOrder={handleNewPatientOrder}
                                    newpatientcount={newpatientcount}
                                    isAllSelected={isAllSelected}
                                    allDietNames={allDietNames}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ width: '55%', boxShadow: "md" }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ProcessCompletedList
                                    setProcessing={setProcessing}
                                    handleProcessing={HandleDIetProcessing}
                                    selectedDietTimes={selectedDietTimes}
                                    processing={processing}
                                    selectedDiets={selectedDiets}
                                    processedRows={processedRows}
                                    setProcessedRows={setProcessedRows}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ProcessList