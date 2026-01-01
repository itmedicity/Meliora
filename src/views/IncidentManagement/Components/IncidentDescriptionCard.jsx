import { Box, Skeleton } from '@mui/joy'
import React, { memo } from 'react'
import IncidentTextComponent from './IncidentTextComponent'
import { FaRegNewspaper } from "react-icons/fa";
import CardHeader from './CardHeader';

const IncidentDescriptionCard = ({ description, text, isEditing }) => {
    return (
        <Box sx={{
            width: '100%',
            minHeight: 100,
            bgcolor: 'white',
            p: 2,
            mt: 1,
            // border: '1.5px solid #d8dde2ff',
            borderRadius: 5
        }}>
            <CardHeader icon={FaRegNewspaper} text={text} />
            {
                !isEditing ? <Box>
                    <Skeleton variant="text" width="90%" height={26} />
                    <Skeleton variant="text" width="50%" height={16} />
                </Box> : <IncidentTextComponent
                    text={description}
                    color={'#403d3dff'} size={14} weight={400} />
            }

        </Box>
    )
}

export default memo(IncidentDescriptionCard)