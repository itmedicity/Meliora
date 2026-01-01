import { Box, Button, Textarea, Typography } from '@mui/joy'
import React, { memo, useCallback } from 'react'
import RenderField from './Components/RenderField'
import CusCheckBox from '../Components/CusCheckBox'
import CustomPaperTitle from '../Components/CustomPaperTitle'
import Inputcomponent from '../TaskManagement/TaskComponents/Inputcomponent'
import moment from 'moment'

const PatientIncidentForm = () => {
    const updateOnchangeState = useCallback((e) => {
        // handle change logic here
        console.log(e);

    }, [])


    const updateEmergency = useCallback((e) => {
        console.log(e);

    }, [])

    const patientFields = [
        {
            heading: 'Name of Patient',
            name: 'patientName',
            type: 'text',
            datetype: false
        },
        {
            heading: 'Ip Number',
            name: 'ipNumber',
            type: 'text',
            datetype: false
        },
        {
            heading: 'Op Number',
            name: 'opNumber',
            type: 'text',
            datetype: false
        },
        {
            heading: 'Ward',
            name: 'ward',
            type: 'text',
            datetype: false
        },
        {
            heading: 'Age',
            name: 'age',
            type: 'text',
            datetype: false
        },

        {
            heading: 'Gender',
            name: 'gender2',
            type: 'text',
            datetype: false
        }, {
            heading: 'Date of Admission',
            name: 'admissionDate',
            type: 'date',
            datetype: true
        },
        {
            heading: 'Date of Discharge',
            name: 'dischargeDate',
            type: 'date',
            datetype: true
        },
    ];

    const NatureofIncident = [
        "Clinical",
        "Non Clinical",
        "Drug",
        "Violence", "Fire",
        "Security", "Equipment", "Accident", "Work Related ||| Health", "Infection Related", "Others"
    ]


    const ReportingStaffDetail = [
        {
            heading: 'Name of the Incident Reporting Staff',
            name: 'staffname',
            type: 'text',
            datetype: false
        },
        {
            heading: 'Employee ID No',
            name: 'empid',
            type: 'text',
            datetype: false
        },
        {
            heading: 'Designation',
            name: 'designation',
            type: 'text',
            datetype: false
        },
        {
            heading: 'Department',
            name: 'department',
            type: 'text',
            datetype: false
        },
        {
            heading: 'Signature',
            name: 'sign',
            type: 'text',
            datetype: false
        }
    ];

    // const IncidentDetail = [
    //     "Incident Occured Date and Time",
    //     "Incident Form issued On",
    //     "Incident Occured Location"
    // ]


    // const employeeFields = [
    //     'Employyee Id (if incident happens to employee)',
    //     'Designation',
    //     'Department'
    // ]

    return (
        <Box sx={{
            width: '100%',
            p: 1
        }}>

            {/* Incident Details  */}

            <Box sx={{
                width: '100%',
                px: 1,
                py: 3,
                borderRadius: 5,
                boxShadow: '0 2px 4px 0 rgba(185, 177, 177, 0.2), 0 6px 20px 0 rgba(180, 177, 177, 0.19)',
                mb:1
            }}>
                <Typography sx={{ fontSize: 20, fontWeight: 800, color: 'grey' }}>
                    Incident Details
                </Typography>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        gap: 1,
                        flexGrow: 1,
                        flexWrap: 'wrap',
                    }}>

                    <Box sx={{ flex: 1, mx: 3, mt: 2.5 }}>
                        <Box sx={{ display: 'flex' }}>
                            <CustomPaperTitle heading=" Incident Occured Date and Time" />
                            <Typography sx={{ color: '#003B73', fontWeight: 600, fontSize: 12 }}>
                                <span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                            </Typography>
                        </Box>
                        <>
                            <Inputcomponent
                                type="datetime-local"
                                name="tm_task_due_date"
                                // value={tm_task_due_date}
                                slotProps={{
                                    input: {
                                        min: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                                        // max: moment(new Date(dueDateProject)).format('YYYY-MM-DD HH:mm:ss')
                                    }
                                }}
                                onchange={updateOnchangeState}
                            />
                        </>
                    </Box>

                    <Box sx={{ flex: 1, mx: 3, mt: 2.5 }}>
                        <Box sx={{ display: 'flex' }}>
                            <CustomPaperTitle heading="Incident Form issued On" />
                            <Typography sx={{ color: '#003B73', fontWeight: 600, fontSize: 12 }}>
                                <span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                            </Typography>
                        </Box>
                        <>
                            <Inputcomponent
                                type="datetime-local"
                                name="tm_task_due_date"
                                // value={tm_task_due_date}
                                slotProps={{
                                    input: {
                                        min: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                                        // max: moment(new Date(dueDateProject)).format('YYYY-MM-DD HH:mm:ss')
                                    }
                                }}
                                onchange={updateOnchangeState}
                            />
                        </>
                    </Box>


                    <Box sx={{ flex: 1, mx: 3, mt: 2.5 }}>
                        <RenderField
                            type={'text'}
                            heading={'Incident Occured Location'}
                            name={'location'}
                            datetype={false}
                            handleChange={updateOnchangeState}
                        />
                    </Box>
                </Box>
            </Box>

            {/* Patinet Details */}

            <Box sx={{
                width: '100%',
                px: 1,
                py: 3,
                borderRadius: 5,
                boxShadow: '0 2px 4px 0 rgba(185, 177, 177, 0.2), 0 6px 20px 0 rgba(180, 177, 177, 0.19)'
            }}>
                <Typography sx={{ fontSize: 20, fontWeight: 800, color: 'grey' }}>
                    Patient Details
                </Typography>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        gap: 1,
                        flexGrow: 1,
                        flexWrap: 'wrap',
                    }}>
                    {patientFields.map((field, idx) =>
                        <Box key={idx} sx={{ width: '24%' }}>
                            <RenderField
                                type={field.type}
                                heading={field.heading}
                                name={field.name}
                                datetype={field.datetype}
                                handleChange={updateOnchangeState}
                            />
                        </Box>
                    )}
                </Box>
            </Box>

            {/* Nature of Incident */}

            <Box sx={{
                width: '100%',
                px: 1,
                py: 1,
                borderRadius: 5,
                boxShadow: '0 2px 4px 0 rgba(185, 177, 177, 0.2), 0 6px 20px 0 rgba(180, 177, 177, 0.19)',
                mt: 2
            }}>
                <Typography sx={{ fontSize: 20, fontWeight: 800, mt: 2, color: 'grey' }}>
                    Nature of  Incident
                </Typography>

                <Box sx={{ p: 0.5, pt: 1, display: 'flex', flexWrap: 'wrap' }}>
                    {NatureofIncident.map((field, idx) =>
                        <Box key={idx} sx={{ width: '24%' }}>
                            <CusCheckBox
                                variant="outlined"
                                color="neutral"
                                size="md"
                                name={field}
                                label={field}
                                // value={emergency}
                                onCheked={updateEmergency}
                            // checked={emergency}
                            />
                        </Box>
                    )}
                </Box>
            </Box>

            {/* Reporting staff Details */}
            <Box sx={{
                width: '100%',
                px: 1,
                py: 1,
                borderRadius: 5,
                boxShadow: '0 2px 4px 0 rgba(185, 177, 177, 0.2), 0 6px 20px 0 rgba(180, 177, 177, 0.19)',
                mt: 3
            }}>
                <Typography sx={{ fontSize: 20, fontWeight: 800, mt: 2, color: 'grey' }}>
                    Reporting Staff Details
                </Typography>

                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        gap: 1,
                        flexGrow: 1,
                        flexWrap: 'wrap',
                        mb: 2
                    }}>
                    {ReportingStaffDetail.map((field, idx) =>
                        <Box key={idx} sx={{ width: '19%' }}>
                            <RenderField
                                type={field.type}
                                heading={field.heading}
                                name={field.name}
                                datetype={field.datetype}
                                handleChange={updateOnchangeState}
                            />
                        </Box>
                    )}
                </Box>
                {/* Description of Incident Filled by the Employee */}
                <Box sx={{ flex: 1.5 }}>
                    <Box sx={{}}>
                        <CustomPaperTitle heading="Description of Incident ( Filled by the Employee )" />
                    </Box>
                    <Box sx={{ pt: 0.5 }}>
                        <Textarea
                            type="text"
                            size="sm"
                            sx={{ bgcolor: 'white', height: 100 }}
                            minRows={1}
                            maxRows={1}
                            style={{ width: '100%' }}
                            placeholder="type here ..."
                            name="remarks"
                            // value={remarks || ''}
                            onChange={updateOnchangeState}
                        />
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                display: 'flex',
                gap: 1,
                mt: 1
            }}>
                <Button>Register Incident</Button>
                <Button>Cancel</Button>
            </Box>

        </Box >
    )
}

export default memo(PatientIncidentForm)
