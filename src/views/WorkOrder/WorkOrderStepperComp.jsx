import React, { memo } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled, keyframes } from '@mui/material/styles';
import WorkOrderTextComp from './AddDetails/WorkOrderTextComp';
import AssignmentIcon from '@mui/icons-material/Assignment'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import EngineeringIcon from '@mui/icons-material/Engineering'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import GavelIcon from '@mui/icons-material/Gavel'
import PaymentsIcon from '@mui/icons-material/Payments'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'

const waveAura = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(103, 58, 183, 0.4);
  }
  70% {
    box-shadow: 0 0 12px 8px rgba(103, 58, 183, 0.2);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(103, 58, 183, 0);
  }
`;

const ColoredConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
        backgroundColor: '#982ed1ff',
    },
    [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
        backgroundColor: '#982ed1ff',
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: theme.palette.mode === 'dark' ? '#444' : '#ccc',
        borderRadius: 1,
    },
}));

function WorkOrderStepperComp({ currentstep }) {

    const steps =
        [
            'Work Order Details',
            'Material/Item Description',
            'Installation/Labor Charge',
            'Adding Retenial Details',
            'Work Order Terms & Conditions',
            'Work Order Payment Terms & Conditions',
            'Invoice/Billing Terms & Conditions'
        ];

    const stepIcons = {
        1: <AssignmentIcon />,              // Work Order Details
        2: <Inventory2Icon />,              // Material / Item Description
        3: <EngineeringIcon />,             // Installation / Labor Charge
        4: <AssignmentTurnedInIcon />,       // Retenial Details
        5: <GavelIcon />,                   // Work Order T&C
        6: <PaymentsIcon />,                // Payment T&C
        7: <ReceiptLongIcon />              // Invoice / Billing T&C
    }

    const CustomStepIcon = (props) => {
        const { active, completed, className, icon } = props;

        return (
            <Box
                className={className}
                sx={{
                    backgroundColor: active || completed ? '#982ed1ff' : '#ccc',
                    zIndex: 1,
                    color: '#fff',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    borderRadius: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    animation: active ? `${waveAura} 1.8s infinite ease-in-out` : 'none',
                }}
            >
                {stepIcons[icon]}
            </Box>
        );
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper
                alternativeLabel
                activeStep={currentstep}
                connector={<ColoredConnector />}
            >
                {steps.map((label, index) => {
                    const isCompleted = currentstep === index + 1 || currentstep > index;

                    return (
                        <Step key={label}>
                            <StepLabel StepIconComponent={CustomStepIcon}>
                                <WorkOrderTextComp
                                    text={`STEP ${index + 1}`}
                                    color={'#403d3dff'}
                                    size={8}
                                    weight={400}
                                />
                                <WorkOrderTextComp
                                    text={label}
                                    color={'#403d3dff'}
                                    size={12}
                                    weight={600}
                                />
                                <WorkOrderTextComp
                                    text={isCompleted ? 'Completed' : 'Pending'}
                                    color={isCompleted ? '#187a0bff' : '#dab313ff'}
                                    size={8}
                                    weight={600}
                                />
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    );
}

export default memo(WorkOrderStepperComp) 