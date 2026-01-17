import React from 'react';
import { Box } from '@mui/material';
import { TiArrowForwardOutline } from 'react-icons/ti';
import IncidentTextComponent from './IncidentTextComponent'; // Assuming you have this component
import { textAreaStyle } from '../CommonComponent/CommonCode';


const ReviewInput = ({ title, review, setReview }) => {



    return (
        <Box sx={{ mt: 1 }}>
            {/* Heading with arrow */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.4 }}>
                <TiArrowForwardOutline style={{ color: 'var(--rose-pink-400)', fontSize: 18 }} />
                <IncidentTextComponent text={title} size={14} weight={600} color="black" />
            </Box>

            {/* Textarea */}
            <textarea
                placeholder="Enter here"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={4}
                style={textAreaStyle}
                onFocus={(e) => {
                    e.target.style.outline = 'none';
                    e.target.style.boxShadow = 'none';
                    e.target.style.border = '1.5px solid #d8dde2ff';
                }}
                onBlur={(e) => {
                    e.target.style.border = '1.5px solid #d8dde2ff';
                }}
            />
        </Box>
    );
};

export default ReviewInput;
