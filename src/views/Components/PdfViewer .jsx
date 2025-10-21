// import React from 'react'
// import { RPConfig, RPProvider, RPDefaultLayout, RPPages } from '@pdf-viewer/react';

// const PdfViewer = ({ src }) => {

//     return (
//         <RPConfig>
//             <RPProvider src={src}>
//                 <RPDefaultLayout style={{ height: '800px', }} slots={{
//                     downloadTool: false,
//                     printTool: false,
//                     openFileTool: false,
//                 }}>
//                     <RPPages />
//                 </RPDefaultLayout>
//             </RPProvider>
//         </RPConfig>)
// }

// export default PdfViewer

// import { Box, Button } from '@mui/joy';
// import React, { useRef } from 'react';
// import { PDFViewer } from 'react-view-pdf';
// import { useReactToPrint } from 'react-to-print';

// const PdfViewer = ({ src }) => {
//     const componentRef = useRef();

//     const handlePrint = useReactToPrint({
//         content: () => componentRef.current,
//         documentTitle: 'PDF‑Document',
//         copyStyles: true,
//     });

//     return (
//         <Box sx={{ position: 'relative', height: '700px' }}>
//             <Box ref={componentRef} sx={{ height: '100%' }}>
//                 <PDFViewer url={src} style={{ width: '100%', height: '800px', }} />
//             </Box>
//             <Button
//                 variant="solid"
//                 onClick={handlePrint}
//                 sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
//             >
//                 Print
//             </Button>
//         </Box>
//     )
// }

// export default PdfViewer


// import React from "react";
// import { ReactIPdfViewerLite } from "react-ipdf-viewer-lite";

// function PdfViewer({ src }) {
//     return (
//         <div style={{ width: "100%", height: "700px" }}>
//             <ReactIPdfViewerLite src={src} theme="light" />
//         </div>
//     );
// }

// export default PdfViewer;

// import React from 'react';
// import FileViewer from 'react-file-viewer';

// const MyFileViewer = ({ src }) => (
//          const componentRef = useRef();

//     const handlePrint = useReactToPrint({
//         content: () => componentRef.current,
//          documentTitle: 'PDF‑Document',
//         copyStyles: true,
//      });


//       <Box sx={{ position: 'relative', height: '700px' }}>
//              <Box ref={componentRef} sx={{ height: '100%' }}>
//     <FileViewer
//         fileType="pdf"
//         filePath={src}
//         onError={(e) => console.error('Error loading file:', e)}
// />
//                  </Box>
//              <Button
//                  variant="solid"
//                  onClick={handlePrint}
//                  sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
//              >
//                  Print
//              </Button>
//          </Box>
// );

// export default MyFileViewer;




import { Box, IconButton } from '@mui/joy';
import React, { useRef } from 'react';
import FileViewer from 'react-file-viewer';
import { useReactToPrint } from 'react-to-print';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline, IoPrintOutline } from "react-icons/io5";


const PdfViewer = ({ src }) => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'PDF‑Document',
        copyStyles: true,
    });
    return (
        // <Box
        //     sx={{
        //         position: 'relative',
        //         display: 'flex',
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //         height: '100%',
        //     }}
        // >
        //     <Box ref={componentRef} sx={{ height: '100%', width: '100%' }}>
        //         <FileViewer
        //             fileType="pdf"
        //             filePath={src}
        //             onError={(e) => console.error('Error loading file:', e)}
        //             sx={{}}
        //         />
        //     </Box>
        //     <Button
        //         variant="plain"
        //         onClick={handlePrint}
        //         sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
        //     >
        //         <IoPrintOutline />
        //     </Button>
        // </Box>

        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            {/* Overlayed Navigation Bar */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    borderRadius: 1,
                    boxShadow: 1,
                    zIndex: 10,
                    padding: '4px 8px',
                }}
            >
                <IconButton >
                    <IoArrowBackCircleOutline />
                </IconButton>
                <IconButton>
                    <IoArrowForwardCircleOutline />
                </IconButton>
                <IconButton onClick={handlePrint}>
                    <IoPrintOutline />
                </IconButton>
            </Box>

            {/* Your PDF Viewer */}
            <Box ref={componentRef} sx={{ width: '100%', height: '100%', }}>
                <FileViewer fileType="pdf" filePath={src} onError={(e) => console.error(e)} sx={{ mt: 7 }} />
            </Box>
        </Box>


    )
}

export default PdfViewer


