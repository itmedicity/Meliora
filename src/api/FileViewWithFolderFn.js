import JSZip from 'jszip';
import { axioslogin } from 'src/views/Axios/Axios';

/**
 * Fetch ZIP files from backend and unzip them in-browser.
 * Stores extracted file blobs and preview URLs in React state.
 */
export const fetchFilesFromZipWithFolder = async (
  apiEndpoint,
  dataArray,
  setFilesState,
  idKeys = ['id', 'detailId']
) => {
  try {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      setFilesState({});
      return;
    }

    const requests = dataArray.map(async (row) => {
      const postData = idKeys.reduce((acc, key) => {
        acc[key] = row[key] || null;
        return acc;
      }, {});

      try {
        const response = await axioslogin.post(apiEndpoint, postData, {
          responseType: 'blob',
        });

        const contentType = response.headers['content-type'] || '';

        // No ZIP returned
        if (contentType.includes('application/json')) {
          return { [postData.detailId]: [] };
        }

        // Load and extract ZIP
        const zip = await JSZip.loadAsync(response.data);

        const fileEntries = Object.entries(zip.files).filter(([filename]) =>
          /\.(jpe?g|png|gif|bmp|webp|pdf)$/i.test(filename)
        );

        const filePromises = fileEntries.map(async ([filename, fileObj]) => {
          const originalBlob = await fileObj.async('blob');

          const mimeType = filename.endsWith('.pdf')
            ? 'application/pdf'
            : filename.match(/\.png$/i)
            ? 'image/png'
            : filename.match(/\.jpe?g$/i)
            ? 'image/jpeg'
            : 'application/octet-stream';

          const blobWithType = new Blob([originalBlob], { type: mimeType });
          const url = URL.createObjectURL(blobWithType);

          return { imageName: filename, url, blob: blobWithType };
        });

        const files = await Promise.all(filePromises);
        return { [postData.detailId]: files };
      } catch (error) {    
        return { [postData.detailId]: [] };
      }
    });

    const resultsArray = await Promise.all(requests);
    const filesMap = resultsArray.reduce((acc, curr) => ({ ...acc, ...curr }), {});


    setFilesState(filesMap);
  } catch (err) {  
    setFilesState({});
  }
};
