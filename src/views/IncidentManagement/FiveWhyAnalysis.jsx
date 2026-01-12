import React, { useState } from 'react';
import {
    Box,
    Typography,
    Sheet,
    // Button
} from '@mui/joy';
import IncidentTextComponent from './Components/IncidentTextComponent';
import { textAreaStyleFivewhy } from './CommonComponent/CommonCode';

const FiveWhyAnalysis = () => {
    
    const [problem, setProblem] = useState('');
    const [whys, setWhys] = useState(['', '', '', '', '']);
    const [solution, setSolution] = useState('');
    // const [participants, setParticipants] = useState([
    //     { name: '', department: '', signature: '' }
    // ]);

    const handleWhyChange = (index, value) => {
        const newWhys = [...whys];
        newWhys[index] = value;
        setWhys(newWhys);
    };

    // const handleParticipantChange = (index, field, value) => {
    //     const updated = [...participants];
    //     updated[index][field] = value;
    //     setParticipants(updated);
    // };

    // const addParticipant = () => {
    //     setParticipants([
    //         ...participants,
    //         { name: '', department: '', signature: '' }
    //     ]);
    // };

    return (
        <Sheet
           
            sx={{
                width: '100%',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
        >
            {/* Define Problem */}
            <Box
                sx={{
                    border: '1px solid black',
                    width: 'fit-content',
                    px: 2,
                    py: 1,
                }}>
                  <IncidentTextComponent text="Define the Problem" color="#74359c" size={14} weight={700} />
            </Box>
           
 <textarea
             placeholder="Enter text here"
             value={problem}
                 onChange={(e) => setProblem(e.target.value)}
             rows={4}
             style={textAreaStyleFivewhy}
             onFocus={(e) => {
                 e.target.style.outline = 'none';
                 e.target.style.boxShadow = 'none';
                 e.target.style.border = '1.5px solid #d8dde2ff';
             }}
             onBlur={(e) => {
                  e.target.style.border = '1.5px solid #d8dde2ff';
             }}/>
            <Typography level="title-md" sx={{ mt: 2 }}>
                Why this is happening??
            </Typography>

            {/* 5 WHYs with horizontal arrows */}
            {whys?.map((why, index) => (
                <Box key={index} sx={{ ml: index * 2, position: 'relative', mt: 0.2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {/* WHY Label */}
                        <Typography
                            level="body-sm"
                            sx={{
                                border: '1px solid black',
                                px: 1,
                                py: 0.5,
                                fontWeight: 'bold',
                                minWidth: 40,
                                textAlign: 'center'
                            }}
                        >
                            WHY
                        </Typography>

                        {/* Horizontal Arrow */}
                        <Box
                            sx={{
                                width: 24,
                                height: 2,
                                backgroundColor: 'black',
                                position: 'relative'
                            }}
                        >
                            <Box
                                sx={{
                                    content: '""',
                                    position: 'absolute',
                                    right: -5,
                                    top: -4,
                                    width: 0,
                                    height: 0,
                                    borderTop: '5px solid transparent',
                                    borderBottom: '5px solid transparent',
                                    borderLeft: '8px solid black'
                                }}
                            />
                        </Box>
                                <textarea
             placeholder="Enter text here"
             value={why}
              onChange={(e) => handleWhyChange(index, e.target.value)}
             rows={4}
             style={textAreaStyleFivewhy}
             onFocus={(e) => {
                 e.target.style.outline = 'none';
                 e.target.style.boxShadow = 'none';
                 e.target.style.border = '1.5px solid #d8dde2ff';
             }}
             onBlur={(e) => {
                  e.target.style.border = '1.5px solid #d8dde2ff';
             }}/>
                        {/* <Input
                            fullWidth
                            variant="outlined"
                            placeholder={`Enter reason for WHY ${index + 1}`}
                            value={why}
                            onChange={(e) => handleWhyChange(index, e.target.value)}
                            sx={{ flex: 1 }}
                        /> */}
                    </Box>
                </Box>
            ))}

            {/* Solution Box */}
            <Box sx={{ mt: 3 }}>
                <Box
                    sx={{
                        border: '2px solid black',
                        width: 'fit-content',
                        px: 2,
                        py: 0.5,
                        mb: 1
                    }}
                >
                    <Typography level="title-md">Solution</Typography>
                </Box>
                

                 <textarea
             placeholder="Enter text here"
             value={solution}
                  onChange={(e) => setSolution(e.target.value)}
             rows={4}
             style={textAreaStyleFivewhy}
             onFocus={(e) => {
                 e.target.style.outline = 'none';
                 e.target.style.boxShadow = 'none';
                 e.target.style.border = '1.5px solid #d8dde2ff';
             }}
             onBlur={(e) => {
                  e.target.style.border = '1.5px solid #d8dde2ff';
             }}/>
            </Box>       
        </Sheet>
    );
};

export default FiveWhyAnalysis;



//  <Box sx={{ mt: 4 }}>
//                 <Typography level="title-md" sx={{ mb: 1 }}>
//                     Participants
//                 </Typography>

             
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         gap: 1,
//                         fontWeight: 'bold',
//                         borderBottom: '1px solid black',
//                         pb: 1
//                     }}
//                 >
//                     <Box sx={{ width: 40 }}>Sl</Box>
//                     <Box sx={{ flex: 1 }}>Participant Name</Box>
//                     <Box sx={{ flex: 1 }}>Department</Box>
//                     <Box sx={{ flex: 1 }}>Signature</Box>
//                 </Box>

              
//                 {participants.map((p, idx) => (
//                     <Box
//                         key={idx}
//                         sx={{
//                             display: 'flex',
//                             gap: 1,
//                             alignItems: 'center',
//                             borderBottom: '1px solid #ccc',
//                             py: 1
//                         }}
//                     >
//                         <Box sx={{ width: 40 }}>{idx + 1}</Box>
//                         <Input
//                             size="sm"
//                             sx={{ flex: 1 }}
//                             value={p.name}
//                             onChange={(e) => handleParticipantChange(idx, 'name', e.target.value)}
//                         />
//                         <Input
//                             size="sm"
//                             sx={{ flex: 1 }}
//                             value={p.department}
//                             onChange={(e) => handleParticipantChange(idx, 'department', e.target.value)}
//                         />
//                         <Input
//                             size="sm"
//                             sx={{ flex: 1 }}
//                             value={p.signature}
//                             onChange={(e) => handleParticipantChange(idx, 'signature', e.target.value)}
//                         />
//                     </Box>
//                 ))}

//                 <Button
//                     size="sm"
//                     variant="outlined"
//                     onClick={addParticipant}
//                     sx={{ mt: 2 }}
//                 >
//                     Add Participant
//                 </Button>
//             </Box>