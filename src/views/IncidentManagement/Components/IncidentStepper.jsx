import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled, keyframes } from '@mui/material/styles';

import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ImageIcon from '@mui/icons-material/Image';

import IncidentTextComponent from './IncidentTextComponent';

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

function IncidentStepper({ currentstep, Images = [], IncidentEditing }) {
    const hasImages = Images.length > 0;

    const steps = hasImages
        ? [
            'Incident Related To',
            'Adding Details',
            'Nature of Incident Added',
            'Adding Description',
            'Upload Files',
            IncidentEditing ? 'Updation Completed' : 'Registration Completed',
        ]
        : [
            'Incident Related To',
            'Adding Details',
            'Nature of Incident Added',
            'Adding Description',
            IncidentEditing ? 'Updation Completed' : 'Registration Completed',
        ];

    const stepIcons = {
        1: <AssignmentIcon />,
        2: <PersonAddAlt1Icon />,
        3: <AddTaskIcon />,
        4: <DescriptionIcon />,
        5: hasImages ? <ImageIcon /> : <CheckCircleIcon />,
        6: <CheckCircleIcon />
    };

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
                                <IncidentTextComponent
                                    text={`STEP ${index + 1}`}
                                    color={'#403d3dff'}
                                    size={8}
                                    weight={400}
                                />
                                <IncidentTextComponent
                                    text={label}
                                    color={'#403d3dff'}
                                    size={12}
                                    weight={600}
                                />
                                <IncidentTextComponent
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

export default IncidentStepper;
