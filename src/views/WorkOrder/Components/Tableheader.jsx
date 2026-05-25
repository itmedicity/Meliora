import { Box } from '@mui/joy';
import React, { memo, useMemo } from 'react';

const Tableheader = ({ columns = [] }) => {

    const HeaderCol = useMemo(() => {
        if (!Array.isArray(columns)) return null;

        return columns.map((col) => (
            <Box
                key={col.key}
                sx={{
                    flex: 1,
                    px: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: col.align || 'flex-start',
                    fontSize: 14,
                }}
            >
                {col.label}
            </Box>
        ));
    }, [columns]); // ✅ dependency added

    return (
        <Box
            sx={{
                display: 'flex',
                height: 44,
                fontWeight: 600,
                backgroundColor: '#E5D9F2',
                borderBottom: '1px solid var(--joy-palette-divider)',
                mt: 0.5,
            }}
        >
            {HeaderCol}
        </Box>
    );
};

export default memo(Tableheader);


// import { Box } from '@mui/joy';
// import React, { memo, useMemo } from 'react'

// const Tableheader = ({ columns }) => {
//     if (!Array.isArray(columns)) return <Box>Table Header</Box>;
//     const HeaderCol = useMemo(() => {
//         return columns.map((col) => (
//             <Box
//                 key={col.key}
//                 sx={{
//                     flex: 1,
//                     px: 1,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: col.align,
//                     fontSize: 14,
//                 }}
//             >
//                 {col.label}
//             </Box>
//         ))
//     })
//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 height: 44,
//                 fontWeight: 600,
//                 backgroundColor: "#E5D9F2",
//                 borderBottom: "1px solid var(--joy-palette-divider)",
//                 mt: 0.5,
//             }}
//         >
//             {HeaderCol}
//         </Box>
//     )
// }

// export default memo(Tableheader) 
