import React, { useState, memo, useCallback } from 'react'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import PdfviewNas from './PdfviewNas'
import { axioslogin } from '../Axios/Axios'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/joy'
import JSZip from 'jszip'

const ManualList = () => {
  const history = useNavigate()
  const [pdfDis, setPdfDis] = useState(0)
  const [uploadedImages, setUploadedImages] = useState([])
  const [imageshowFlag, setImageShowFlag] = useState(0)

  // const employeeGuide = () => {
  //   setPdfDis(1)
  //   setUploadedImages([])
  //   const getImage = async () => {
  //     try {
  //       const result = await axioslogin.get(`/newCRFRegisterImages/EmployeeGuide`, {
  //         responseType: 'blob'
  //       });

  //       const contentType = result.headers['content-type'] || '';
  //       if (contentType?.includes('application/json')) {
  //         return;
  //       } else {
  //         const zip = await JSZip.loadAsync(result.data);
  //         const imageEntries = Object.entries(zip.files).filter(
  //           ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
  //         );

  //         const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
  //           const originalBlob = await fileObj.async('blob');
  //           let mimeType = '';
  //           if (filename.endsWith('.pdf')) {
  //             mimeType = 'application/pdf';
  //           } else if (filename.endsWith('.png')) {
  //             mimeType = 'image/png';
  //           } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
  //             mimeType = 'image/jpeg';
  //           } else {
  //             mimeType = 'application/octet-stream'; // fallback
  //           }
  //           // Recreate blob with correct type
  //           const blobWithType = new Blob([originalBlob], { type: mimeType });
  //           // Create URL from new blob
  //           const url = URL.createObjectURL(blobWithType);
  //           return { imageName: filename, url, blob: blobWithType };
  //         });
  //         const images = await Promise.all(imagePromises);
  //         setUploadedImages(images)
  //         setImageShowFlag(1)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching or processing images:', error);
  //       setUploadedImages([])
  //     }
  //   }
  //   getImage()
  // }
  // const sradhapolicy = () => {
  //   setPdfDis(3)
  //   setUploadedImages([])
  //   const getImage = async () => {
  //     try {
  //       const result = await axioslogin.get(`/newCRFRegisterImages/SoundAlike`, {
  //         responseType: 'blob'
  //       });

  //       const contentType = result.headers['content-type'] || '';
  //       if (contentType?.includes('application/json')) {
  //         return;
  //       } else {
  //         const zip = await JSZip.loadAsync(result.data);
  //         const imageEntries = Object.entries(zip.files).filter(
  //           ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
  //         );

  //         const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
  //           const originalBlob = await fileObj.async('blob');
  //           let mimeType = '';
  //           if (filename.endsWith('.pdf')) {
  //             mimeType = 'application/pdf';
  //           } else if (filename.endsWith('.png')) {
  //             mimeType = 'image/png';
  //           } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
  //             mimeType = 'image/jpeg';
  //           } else {
  //             mimeType = 'application/octet-stream'; // fallback
  //           }
  //           // Recreate blob with correct type
  //           const blobWithType = new Blob([originalBlob], { type: mimeType });
  //           // Create URL from new blob
  //           const url = URL.createObjectURL(blobWithType);
  //           return { imageName: filename, url, blob: blobWithType };
  //         });
  //         const images = await Promise.all(imagePromises);
  //         setUploadedImages(images)
  //         setImageShowFlag(1)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching or processing images:', error);
  //       setUploadedImages([])
  //     }
  //   }
  //   getImage()
  // }
  // const safety = () => {
  //   setPdfDis(4)
  //   setUploadedImages([])
  //   const getImage = async () => {
  //     try {
  //       const result = await axioslogin.get(`/newCRFRegisterImages/SradhaPolicy`, {
  //         responseType: 'blob'
  //       });

  //       const contentType = result.headers['content-type'] || '';
  //       if (contentType?.includes('application/json')) {
  //         return;
  //       } else {
  //         const zip = await JSZip.loadAsync(result.data);
  //         const imageEntries = Object.entries(zip.files).filter(
  //           ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
  //         );

  //         const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
  //           const originalBlob = await fileObj.async('blob');
  //           let mimeType = '';
  //           if (filename.endsWith('.pdf')) {
  //             mimeType = 'application/pdf';
  //           } else if (filename.endsWith('.png')) {
  //             mimeType = 'image/png';
  //           } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
  //             mimeType = 'image/jpeg';
  //           } else {
  //             mimeType = 'application/octet-stream'; // fallback
  //           }
  //           // Recreate blob with correct type
  //           const blobWithType = new Blob([originalBlob], { type: mimeType });
  //           // Create URL from new blob
  //           const url = URL.createObjectURL(blobWithType);
  //           return { imageName: filename, url, blob: blobWithType };
  //         });
  //         const images = await Promise.all(imagePromises);
  //         setUploadedImages(images)
  //         setImageShowFlag(1)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching or processing images:', error);
  //       setUploadedImages([])
  //     }
  //   }
  //   getImage()
  // }
  // const meddef = () => {
  //   setPdfDis(5)
  //   setUploadedImages([])
  //   const getImage = async () => {
  //     try {
  //       const result = await axioslogin.get(`/newCRFRegisterImages/MSDS`, {
  //         responseType: 'blob'
  //       });

  //       const contentType = result.headers['content-type'] || '';
  //       if (contentType?.includes('application/json')) {
  //         return;
  //       } else {
  //         const zip = await JSZip.loadAsync(result.data);
  //         const imageEntries = Object.entries(zip.files).filter(
  //           ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
  //         );

  //         const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
  //           const originalBlob = await fileObj.async('blob');
  //           let mimeType = '';
  //           if (filename.endsWith('.pdf')) {
  //             mimeType = 'application/pdf';
  //           } else if (filename.endsWith('.png')) {
  //             mimeType = 'image/png';
  //           } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
  //             mimeType = 'image/jpeg';
  //           } else {
  //             mimeType = 'application/octet-stream'; // fallback
  //           }
  //           // Recreate blob with correct type
  //           const blobWithType = new Blob([originalBlob], { type: mimeType });
  //           // Create URL from new blob
  //           const url = URL.createObjectURL(blobWithType);
  //           return { imageName: filename, url, blob: blobWithType };
  //         });
  //         const images = await Promise.all(imagePromises);
  //         setUploadedImages(images)
  //         setImageShowFlag(1)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching or processing images:', error);
  //       setUploadedImages([])
  //     }
  //   }
  //   getImage()
  // }
  // const Abbreviation = () => {
  //   setPdfDis(6)
  //   setUploadedImages([])
  //   const getImage = async () => {
  //     try {
  //       const result = await axioslogin.get(`/newCRFRegisterImages/MEDF`, {
  //         responseType: 'blob'
  //       });

  //       const contentType = result.headers['content-type'] || '';
  //       if (contentType?.includes('application/json')) {
  //         return;
  //       } else {
  //         const zip = await JSZip.loadAsync(result.data);
  //         const imageEntries = Object.entries(zip.files).filter(
  //           ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
  //         );

  //         const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
  //           const originalBlob = await fileObj.async('blob');
  //           let mimeType = '';
  //           if (filename.endsWith('.pdf')) {
  //             mimeType = 'application/pdf';
  //           } else if (filename.endsWith('.png')) {
  //             mimeType = 'image/png';
  //           } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
  //             mimeType = 'image/jpeg';
  //           } else {
  //             mimeType = 'application/octet-stream'; // fallback
  //           }
  //           // Recreate blob with correct type
  //           const blobWithType = new Blob([originalBlob], { type: mimeType });
  //           // Create URL from new blob
  //           const url = URL.createObjectURL(blobWithType);
  //           return { imageName: filename, url, blob: blobWithType };
  //         });
  //         const images = await Promise.all(imagePromises);
  //         setUploadedImages(images)
  //         setImageShowFlag(1)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching or processing images:', error);
  //       setUploadedImages([])
  //     }
  //   }
  //   getImage()
  // }
  // const Fridge = () => {
  //   setPdfDis(7)
  //   setUploadedImages([])
  //   const getImage = async () => {
  //     try {
  //       const result = await axioslogin.get(`/newCRFRegisterImages/Abbreviation`, {
  //         responseType: 'blob'
  //       });

  //       const contentType = result.headers['content-type'] || '';
  //       if (contentType?.includes('application/json')) {
  //         return;
  //       } else {
  //         const zip = await JSZip.loadAsync(result.data);
  //         const imageEntries = Object.entries(zip.files).filter(
  //           ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
  //         );

  //         const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
  //           const originalBlob = await fileObj.async('blob');
  //           let mimeType = '';
  //           if (filename.endsWith('.pdf')) {
  //             mimeType = 'application/pdf';
  //           } else if (filename.endsWith('.png')) {
  //             mimeType = 'image/png';
  //           } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
  //             mimeType = 'image/jpeg';
  //           } else {
  //             mimeType = 'application/octet-stream'; // fallback
  //           }
  //           // Recreate blob with correct type
  //           const blobWithType = new Blob([originalBlob], { type: mimeType });
  //           // Create URL from new blob
  //           const url = URL.createObjectURL(blobWithType);
  //           return { imageName: filename, url, blob: blobWithType };
  //         });
  //         const images = await Promise.all(imagePromises);
  //         setUploadedImages(images)
  //         setImageShowFlag(1)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching or processing images:', error);
  //       setUploadedImages([])
  //     }
  //   }
  //   getImage()
  // }
  // const High = () => {
  //   setPdfDis(8)
  //   setUploadedImages([])
  //   const getImage = async () => {
  //     try {
  //       const result = await axioslogin.get(`/newCRFRegisterImages/Fridge`, {
  //         responseType: 'blob'
  //       });

  //       const contentType = result.headers['content-type'] || '';
  //       if (contentType?.includes('application/json')) {
  //         return;
  //       } else {
  //         const zip = await JSZip.loadAsync(result.data);
  //         const imageEntries = Object.entries(zip.files).filter(
  //           ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
  //         );

  //         const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
  //           const originalBlob = await fileObj.async('blob');
  //           let mimeType = '';
  //           if (filename.endsWith('.pdf')) {
  //             mimeType = 'application/pdf';
  //           } else if (filename.endsWith('.png')) {
  //             mimeType = 'image/png';
  //           } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
  //             mimeType = 'image/jpeg';
  //           } else {
  //             mimeType = 'application/octet-stream'; // fallback
  //           }
  //           // Recreate blob with correct type
  //           const blobWithType = new Blob([originalBlob], { type: mimeType });
  //           // Create URL from new blob
  //           const url = URL.createObjectURL(blobWithType);
  //           return { imageName: filename, url, blob: blobWithType };
  //         });
  //         const images = await Promise.all(imagePromises);
  //         setUploadedImages(images)
  //         setImageShowFlag(1)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching or processing images:', error);
  //       setUploadedImages([])
  //     }
  //   }
  //   getImage()
  // }
  // const Alike = () => {
  //   setPdfDis(9)
  //   setUploadedImages([])
  //   const getImage = async () => {
  //     try {
  //       const result = await axioslogin.get(`/newCRFRegisterImages/HighRisk`, {
  //         responseType: 'blob'
  //       });

  //       const contentType = result.headers['content-type'] || '';
  //       if (contentType?.includes('application/json')) {
  //         return;
  //       } else {
  //         const zip = await JSZip.loadAsync(result.data);
  //         const imageEntries = Object.entries(zip.files).filter(
  //           ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
  //         );

  //         const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
  //           const originalBlob = await fileObj.async('blob');
  //           let mimeType = '';
  //           if (filename.endsWith('.pdf')) {
  //             mimeType = 'application/pdf';
  //           } else if (filename.endsWith('.png')) {
  //             mimeType = 'image/png';
  //           } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
  //             mimeType = 'image/jpeg';
  //           } else {
  //             mimeType = 'application/octet-stream'; // fallback
  //           }
  //           // Recreate blob with correct type
  //           const blobWithType = new Blob([originalBlob], { type: mimeType });
  //           // Create URL from new blob
  //           const url = URL.createObjectURL(blobWithType);
  //           return { imageName: filename, url, blob: blobWithType };
  //         });
  //         const images = await Promise.all(imagePromises);
  //         setUploadedImages(images)
  //         setImageShowFlag(1)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching or processing images:', error);
  //       setUploadedImages([])
  //     }
  //   }
  //   getImage()
  // }
  // const Psychotropic = () => {
  //   setPdfDis(10)
  //   setUploadedImages([])
  //   const getImage = async () => {
  //     try {
  //       const result = await axioslogin.get(`/newCRFRegisterImages/LookAlike`, {
  //         responseType: 'blob'
  //       });

  //       const contentType = result.headers['content-type'] || '';
  //       if (contentType?.includes('application/json')) {
  //         return;
  //       } else {
  //         const zip = await JSZip.loadAsync(result.data);
  //         const imageEntries = Object.entries(zip.files).filter(
  //           ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
  //         );

  //         const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
  //           const originalBlob = await fileObj.async('blob');
  //           let mimeType = '';
  //           if (filename.endsWith('.pdf')) {
  //             mimeType = 'application/pdf';
  //           } else if (filename.endsWith('.png')) {
  //             mimeType = 'image/png';
  //           } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
  //             mimeType = 'image/jpeg';
  //           } else {
  //             mimeType = 'application/octet-stream'; // fallback
  //           }
  //           // Recreate blob with correct type
  //           const blobWithType = new Blob([originalBlob], { type: mimeType });
  //           // Create URL from new blob
  //           const url = URL.createObjectURL(blobWithType);
  //           return { imageName: filename, url, blob: blobWithType };
  //         });
  //         const images = await Promise.all(imagePromises);
  //         setUploadedImages(images)
  //         setImageShowFlag(1)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching or processing images:', error);
  //       setUploadedImages([])
  //     }
  //   }
  //   getImage()
  // }
  // const Sound = () => {
  //   setPdfDis(11)
  //   setUploadedImages([])
  //   const getImage = async () => {
  //     try {
  //       const result = await axioslogin.get(`/newCRFRegisterImages/Psychotropic`, {
  //         responseType: 'blob'
  //       });

  //       const contentType = result.headers['content-type'] || '';
  //       if (contentType?.includes('application/json')) {
  //         return;
  //       } else {
  //         const zip = await JSZip.loadAsync(result.data);
  //         const imageEntries = Object.entries(zip.files).filter(
  //           ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
  //         );

  //         const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
  //           const originalBlob = await fileObj.async('blob');
  //           let mimeType = '';
  //           if (filename.endsWith('.pdf')) {
  //             mimeType = 'application/pdf';
  //           } else if (filename.endsWith('.png')) {
  //             mimeType = 'image/png';
  //           } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
  //             mimeType = 'image/jpeg';
  //           } else {
  //             mimeType = 'application/octet-stream'; // fallback
  //           }
  //           // Recreate blob with correct type
  //           const blobWithType = new Blob([originalBlob], { type: mimeType });
  //           // Create URL from new blob
  //           const url = URL.createObjectURL(blobWithType);
  //           return { imageName: filename, url, blob: blobWithType };
  //         });
  //         const images = await Promise.all(imagePromises);
  //         setUploadedImages(images)
  //         setImageShowFlag(1)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching or processing images:', error);
  //       setUploadedImages([])
  //     }
  //   }
  //   getImage()
  // }
  // const Hospital = () => {
  //   setPdfDis(12)
  //   setUploadedImages([])
  //   const getImage = async () => {
  //     try {
  //       const result = await axioslogin.get(`/newCRFRegisterImages/crfNabhImageGet`, {
  //         responseType: 'blob'
  //       });

  //       const contentType = result.headers['content-type'] || '';
  //       if (contentType?.includes('application/json')) {
  //         return;
  //       } else {
  //         const zip = await JSZip.loadAsync(result.data);
  //         const imageEntries = Object.entries(zip.files).filter(
  //           ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
  //         );

  //         const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
  //           const originalBlob = await fileObj.async('blob');
  //           let mimeType = '';
  //           if (filename.endsWith('.pdf')) {
  //             mimeType = 'application/pdf';
  //           } else if (filename.endsWith('.png')) {
  //             mimeType = 'image/png';
  //           } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
  //             mimeType = 'image/jpeg';
  //           } else {
  //             mimeType = 'application/octet-stream'; // fallback
  //           }
  //           // Recreate blob with correct type
  //           const blobWithType = new Blob([originalBlob], { type: mimeType });
  //           // Create URL from new blob
  //           const url = URL.createObjectURL(blobWithType);
  //           return { imageName: filename, url, blob: blobWithType };
  //         });
  //         const images = await Promise.all(imagePromises);
  //         setUploadedImages(images)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching or processing images:', error);
  //       setUploadedImages([])
  //     }
  //   }
  //   getImage()
  // }
  // const Standard = () => {
  //   setPdfDis(13)
  //   setUploadedImages([])
  //   const getImage = async () => {
  //     try {
  //       const result = await axioslogin.get(`/newCRFRegisterImages/crfNabhGuidImageGet`, {
  //         responseType: 'blob'
  //       });

  //       const contentType = result.headers['content-type'] || '';
  //       if (contentType?.includes('application/json')) {
  //         return;
  //       } else {
  //         const zip = await JSZip.loadAsync(result.data);
  //         const imageEntries = Object.entries(zip.files).filter(
  //           ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
  //         );
  //         const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
  //           const originalBlob = await fileObj.async('blob');
  //           let mimeType = '';
  //           if (filename.endsWith('.pdf')) {
  //             mimeType = 'application/pdf';
  //           } else if (filename.endsWith('.png')) {
  //             mimeType = 'image/png';
  //           } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
  //             mimeType = 'image/jpeg';
  //           } else {
  //             mimeType = 'application/octet-stream'; // fallback
  //           }
  //           // Recreate blob with correct type
  //           const blobWithType = new Blob([originalBlob], { type: mimeType });
  //           // Create URL from new blob
  //           const url = URL.createObjectURL(blobWithType);
  //           return { imageName: filename, url, blob: blobWithType };
  //         });
  //         const images = await Promise.all(imagePromises);
  //         setUploadedImages(images)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching or processing images:', error);
  //       setUploadedImages([])
  //     }
  //   }
  //   getImage()
  // }
  const fetchImages = async (endpoint, pdfDisplayValue) => {
    setPdfDis(pdfDisplayValue);
    setUploadedImages([]);

    try {
      const result = await axioslogin.get(endpoint, { responseType: 'blob' });
      const contentType = result.headers['content-type'] || '';

      if (contentType.includes('application/json')) return;

      const zip = await JSZip.loadAsync(result.data);
      const imageEntries = Object.entries(zip.files).filter(
        ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
      );

      const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
        const originalBlob = await fileObj.async('blob');
        let mimeType = '';

        if (filename.endsWith('.pdf')) mimeType = 'application/pdf';
        else if (filename.endsWith('.png')) mimeType = 'image/png';
        else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) mimeType = 'image/jpeg';
        else mimeType = 'application/octet-stream'; // fallback

        const blobWithType = new Blob([originalBlob], { type: mimeType });
        const url = URL.createObjectURL(blobWithType);
        return { imageName: filename, url, blob: blobWithType };
      });

      const images = await Promise.all(imagePromises);
      setUploadedImages(images);
      setImageShowFlag(1);

    } catch (error) {
      console.error('Error fetching or processing images:', error);
      setUploadedImages([]);
    }
  };
  const employeeGuide = () => fetchImages('/newCRFRegisterImages/EmployeeGuide', 1);
  const sradhapolicy = () => fetchImages('/newCRFRegisterImages/SradhaPolicy', 2);
  const safety = () => fetchImages('/newCRFRegisterImages/MSDS', 3);
  const meddef = () => fetchImages('/newCRFRegisterImages/MEDF', 4);
  const Abbreviation = () => fetchImages('/newCRFRegisterImages/Abbreviation', 5);
  const Fridge = () => fetchImages('/newCRFRegisterImages/Fridge', 6);
  const High = () => fetchImages('/newCRFRegisterImages/HighRisk', 7);
  const Alike = () => fetchImages('/newCRFRegisterImages/LookAlike', 8);
  const Psychotropic = () => fetchImages('/newCRFRegisterImages/Psychotropic', 9);
  const Sound = () => fetchImages('/newCRFRegisterImages/SoundAlike', 10);
  const Hospital = () => fetchImages('/newCRFRegisterImages/crfNabhImageGet', 11);
  const Standard = () => fetchImages('/newCRFRegisterImages/crfNabhGuidImageGet', 12);

  // SoundAlike
  //  Psychotropic
  const backToSettings = useCallback(() => {
    history(`/Home/Manual`)
    setPdfDis(0)
  }, [history])

  return (
    <CardCloseOnly title="Documents" close={backToSettings}>
      {pdfDis === 0 ? (
        <Box sx={{ width: '100%', p: 2, maxHeight: '75vh', overflowY: 'auto' }}>
          <Typography
            variant="h6"
            sx={{ fontFamily: 'Roboto', mb: 2, textTransform: 'capitalize' }}
          >
            NABH Guidelines
          </Typography>

          {/* Button Helper to keep design consistent */}
          {[
            { label: 'Employee Guide', action: employeeGuide },
            { label: 'Sound Alike Drugs', action: Sound },
            { label: 'Sradha Antibiotic Policy', action: sradhapolicy },
            { label: 'MSDS Handbook_E1', action: safety },
            { label: 'MEDF', action: meddef },
            { label: 'Abbreviation', action: Abbreviation },
            { label: 'Fridge Medicines', action: Fridge },
            { label: 'High Risk Drugs', action: High },
            { label: 'Look Alike', action: Alike },
            { label: 'Psychotropic Drugs', action: Psychotropic },
            { label: 'Hospital Manual', action: Hospital },
            { label: 'Standard Treatment Guideline', action: Standard },
          ].map((item, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                sx={{
                  textTransform: 'capitalize',
                  fontSize: 14,
                  fontFamily: 'Roboto',
                  justifyContent: 'flex-start',
                  px: 2,
                  py: 1.2,
                  borderRadius: 2,
                }}
                onClick={item.action}
              >
                <Typography level="body-sm" sx={{ color: 'var( --true-blue-600)' }}>{item.label}</Typography>
              </Button>
            </Box>
          ))}
        </Box>
      ) : (
        <PdfviewNas pdfDis={pdfDis} uploadedImages={uploadedImages} setImageShowFlag={setImageShowFlag} imageshowFlag={imageshowFlag} />
      )}
    </CardCloseOnly>

  )
}

export default memo(ManualList)
