import JSZip from 'jszip'
import { axioslogin } from 'src/views/Axios/Axios'

/**
 * Generic file fetcher and extractor for ZIP blobs.
 *
 * @param {string} apiUrl - The API endpoint to fetch from (without ID).
 * @param {number|string} id - The ID or parameter to append to the endpoint.
 * @returns {Promise<Array<{ imageName: string, url: string, blob: Blob }>>}
 *
 * Example:
 *   getFilesFromZip('/complaintFileUpload/uploadFile/getComplaintFile', 101)
 */
export const getFilesFromZip = async (apiUrl, id) => {
  try {
    const result = await axioslogin.get(`${apiUrl}/${id}`, {
      responseType: 'blob',
    });

    const contentType = result.headers['content-type'] || '';
    if (contentType.includes('application/json')) {
      // No files found
      return [];
    }

    // Load ZIP content
    const zip = await JSZip.loadAsync(result.data);

    // Extract supported file types
    const fileEntries = Object.entries(zip.files).filter(([filename]) =>
      /\.(jpe?g|png|gif|pdf)$/i.test(filename)
    );

    // Convert ZIP entries to usable blobs
    const filePromises = fileEntries.map(async ([filename, fileObj]) => {
      const originalBlob = await fileObj.async('blob');

      let mimeType = '';
      if (filename.endsWith('.pdf')) mimeType = 'application/pdf';
      else if (filename.endsWith('.png')) mimeType = 'image/png';
      else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) mimeType = 'image/jpeg';
      else mimeType = 'application/octet-stream';

      const blobWithType = new Blob([originalBlob], { type: mimeType });
      const url = URL.createObjectURL(blobWithType);

      return { imageName: filename, url, blob: blobWithType };
    });

    return await Promise.all(filePromises);
  } catch (error) {

    return [];
  }
};
