import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'
import { textAreaStyle } from '../CommonComponent/CommonCode';

const CommonDetailContainer = ({
    commondetail,
    setCommonDetail,
}) => {

    const maxLength = 150;

    const handleChange = (e) => {
        const value = e.target.value;
        // restrict to 150 chars
        if (value.length <= maxLength) {
            setCommonDetail(value);
        }
    };

    return (
        <Box sx={{ position: 'relative', width: '100%' }}>
            <textarea
                placeholder="Enter text here"
                value={commondetail}
                onChange={handleChange}
                rows={4}
                maxLength={maxLength}
                style={{ ...textAreaStyle, width: '100%', paddingBottom: '20px' }}
                onFocus={(e) => {
                    e.target.style.outline = 'none';
                    e.target.style.boxShadow = 'none';
                    e.target.style.border = '1.5px solid #d8dde2ff';
                }}
                onBlur={(e) => {
                    e.target.style.border = '1.5px solid #d8dde2ff';
                }}
            />

            {/* Character Count */}
            <Typography
                level="body-xs"
                sx={{
                    position: 'absolute',
                    bottom: 14,
                    right: 8,
                    color: '#888'
                }}
            >
                {commondetail?.length} / {maxLength}
            </Typography>
        </Box>
    )
}

export default memo(CommonDetailContainer);