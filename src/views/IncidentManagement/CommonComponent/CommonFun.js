import { axiosellider, axioslogin } from "src/views/Axios/Axios";
import { warningNotify } from "src/views/Common/CommonCode";
import imageCompression from 'browser-image-compression';
import { useState, useCallback } from "react";
import { format } from "date-fns";
import JSZip from "jszip";

// GET DETAIL BASED ON MRD NUMBER
export const getFamilyDetails = async (mrdnumber) => {
    try {
        let uppercasetext = mrdnumber?.toUpperCase().trim();

        if (!uppercasetext) {
            warningNotify('Please Enter MRD Number');
            return null;
        }
        const result = await axiosellider.get(`/admission/patientInfo/${uppercasetext}`);
        const { success, data } = result.data;
        if (success === 1) {
            return data;
        } else {
            warningNotify("Please Enter Correct MRD Number!");
            return null;
        }
    } catch (error) {
        warningNotify("Something went wrong while fetching details. Please try again.");
        return null;
    }
};

// image compression
export const handleImageUpload = async (imageFile) => {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    };
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
};


//  Fetch incident files
// export const useIncidentFiles = () => {
//     const [loadingFiles, setLoadingFiles] = useState(false);
//     const fetchIncidentFiles = useCallback(async (id) => {
//         try {
//             setLoadingFiles(true);
//             const results = await axioslogin.get(`/incidentMaster/getincidentfile/${id}`);
//             const { data, success } = results?.data ?? {};
//             return success === 1 ? data : [];
//         } catch (error) {
//             warningNotify("Error in Fetching Files");
//             return [];
//         } finally {
//             setLoadingFiles(false);
//         }
//     }, []);

//     return { fetchIncidentFiles, loadingFiles };
// };



//incidentNormalizer.js
export const normalizeIncidentData = (incidentData) => {

    if (!incidentData) return {};

    // Patient data
    const patientDetail = {
        PTC_PTNAME: incidentData?.inc_pt_name,
        PTN_YEARAGE: incidentData?.inc_pt_age,
        PTC_SEX: incidentData?.inc_pt_gender,
        PTC_MOBILE: incidentData?.inc_pt_mobile,
        address: incidentData?.inc_pt_address,
        PT_NO: incidentData?.mrd_no
    };

    // Staff data
    const staffDetails = {
        em_no: incidentData?.emp_user_name,
        em_name: incidentData?.emp_name,
        emp_age: incidentData?.emp_age,
        em_gender: incidentData?.emp_gender,
        em_mobile: incidentData?.emp_mob,
        email: incidentData?.emp_email,
        emp_desig: incidentData?.emp_desig,
        emp_dept: incidentData?.emp_dept,
        sect_name: incidentData?.emp_dept_sec,
        address: incidentData?.emp_address,
        em_doj: incidentData?.emp_joining_date
    };

    // Visitor data
    const visitorDetail = {
        visitor_name: incidentData?.inc_visitor_name,
        visitor_age: incidentData?.inc_visitor_age,
        visitor_gender: incidentData?.inc_visitor_gender,
        visitor_mobile: incidentData?.inc_visitor_mobile,
        visitor_address: incidentData?.inc_visitor_address,
        purpose: incidentData?.inc_visit_purpose
    };

    // Asset/Property data
    const normalizeAssetDetails = (item) => {
        if (Array.isArray(item?.asset_details) && item.asset_details.length > 0) {
            return item.asset_details;
        }

        if (item?.asset_item_slno || item?.item_name || item?.item_location) {
            return [{
                asset_item_slno: item.asset_item_slno,
                item_name: item.item_name,
                item_location: item.item_location,
                manufacture_slno: item.manufacture_slno,
                custodian_dept_slno: item.custodian_dept_slno,
                inc_is_asset: item.inc_is_asset
            }];
        }

        return [];
    };

    const propertyDetail = normalizeAssetDetails(incidentData)?.map((asset) => ({
        assetSlno: asset?.asset_item_slno,
        item_name: asset?.item_name,
        location: asset?.item_location,
        am_manufacture_no: asset?.manufacture_slno,
        custodianDept: asset?.custodian_dept_slno,
        isAsset: asset?.inc_is_asset,
    }));

    return {
        patientDetail,
        staffDetails,
        visitorDetail,
        propertyDetail
    };
};

// Group Incident Based on the Initator ,Initator Detail and asset . For Avoiding Duplicates and Grouping them
export const groupIncidents = (rows = []) => {
    const grouped = rows?.reduce((acc, row) => {
        const id = row.inc_register_slno;

        if (!acc[id]) {
            acc[id] = {
                ...row,
                asset_details: [], // initialize empty
                nature_of_inc: JSON.parse(row.nature_of_inc || "[]"),
            };
        }

        //  Use spread instead of push (immutability)
        if (row.asset_item_slno) {
            acc[id] = {
                ...acc[id],
                asset_details: [
                    ...acc[id].asset_details,
                    {
                        inc_is_asset: row.inc_is_asset,
                        asset_item_slno: row.asset_item_slno,
                        custodian_dept_slno: row.custodian_dept_slno,
                        item_name: row.item_name,
                        item_location: row.item_location,
                        manufacture_slno: row.manufacture_slno,
                    },
                ],
            };
        }

        return acc;
    }, {});

    return Object.values(grouped);
};




// handle Image View 
export const handleImageClick = (file, setSelectedImage, setOpenModal) => {
    setSelectedImage(file);
    setOpenModal(true);
};


// common code for setting data format of our own 
export const formatDateTime = (date, dateFormat = "dd/MM/yyyy hh:mm:ss a") => {
    if (!date) return "--";
    try {
        return format(new Date(date), dateFormat);
    } catch (error) {
        return "--";
    }
};



// export const useIncidentFiles = () => {
//     const [loadingFiles, setLoadingImages] = useState(false);

//     const fetchIncidentFiles = useCallback(async (id) => {
//         try {
//             setLoadingImages(true);
//             const result = await axioslogin.get(`/incidentMaster/getincidentfile/${id}`, {
//                 responseType: 'blob'
//             });

//             const contentType = result.headers['content-type'] || '';
//             if (contentType.includes('application/json')) {
//                 warningNotify("No image data found.");
//                 return [];
//             }

//             const zip = await JSZip.loadAsync(result.data);

//             const imageEntries = Object.entries(zip.files).filter(
//                 ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
//             );

//             const imagePromises = imageEntries?.map(async ([filename, fileObj]) => {
//                 const originalBlob = await fileObj.async('blob');

//                 let mimeType = '';
//                 if (filename.endsWith('.pdf')) {
//                     mimeType = 'application/pdf';
//                 } else if (filename.endsWith('.png')) {
//                     mimeType = 'image/png';
//                 } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
//                     mimeType = 'image/jpeg';
//                 } else {
//                     mimeType = 'application/octet-stream';
//                 }

//                 const blobWithType = new Blob([originalBlob], { type: mimeType });
//                 const url = URL.createObjectURL(blobWithType);
//                 return { imageName: filename, url, blob: blobWithType };
//             });

//             const images = await Promise.all(imagePromises);
//             return images;

//         } catch (error) {
//             console.error('Error fetching or processing images:', error);
//             warningNotify("Error in fetching images//....");
//             return [];
//         } finally {
//             setLoadingImages(false);
//         }
//     }, []);

//     return { fetchIncidentFiles, loadingFiles };
// };


export const useIncidentFiles = () => {
    const [loadingFiles, setLoadingFiles] = useState(false);

    const fetchIncidentFiles = useCallback(async (url) => {
        if (!url) {
            console.warn("❗ No URL provided to fetchIncidentFiles");
            return [];
        }

        try {
            setLoadingFiles(true);

            const result = await axioslogin.get(url, { responseType: 'blob' });

            const contentType = result.headers['content-type'] || '';
            if (contentType.includes('application/json')) {
                warningNotify("No file data found.");
                return [];
            }

            const zip = await JSZip.loadAsync(result.data);

            const validFiles = Object.entries(zip.files).filter(
                ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
            );

            const filePromises = validFiles.map(async ([filename, fileObj]) => {
                const originalBlob = await fileObj.async('blob');

                let mimeType = 'application/octet-stream';
                if (filename.endsWith('.pdf')) mimeType = 'application/pdf';
                else if (filename.endsWith('.png')) mimeType = 'image/png';
                else if (/\.(jpg|jpeg)$/i.test(filename)) mimeType = 'image/jpeg';

                const blobWithType = new Blob([originalBlob], { type: mimeType });
                const url = URL.createObjectURL(blobWithType);
                return { imageName: filename, url, blob: blobWithType };
            });

            return await Promise.all(filePromises);

        } catch (error) {
            console.error('Error fetching or processing files:', error);
            warningNotify("Error fetching files");
            return [];
        } finally {
            setLoadingFiles(false);
        }
    }, []);

    return { fetchIncidentFiles, loadingFiles };
};


//  Fixed version
export const useHighLevelApprovals = () => {
    const [loadingapprovals, setLoadingApprovals] = useState(false);

    const FetchAllHigLevelApprovals = useCallback(async (id) => {
        try {
            setLoadingApprovals(true);
            const response = await axioslogin.post(`/incidentMaster/gethighlevelreview`, {
                inc_register_slno: id
            });
            const { success, message, data } = response.data;
            if (success !== 2) return warningNotify(message)
            return data;
        } catch (error) {
            console.error('Error fetching or processing images:', error);
            warningNotify("Error in fetching Approvals");
            return [];
        } finally {
            setLoadingApprovals(false);
        }
    }, []);

    return { FetchAllHigLevelApprovals, loadingapprovals };
};


// export const getAllDepartmentRequestedAction = () => {
//     const [loadingactions, setLoadingActions] = useState(false);

//     const FetchAllHigLevelApprovals = useCallback(async (id) => {
//         try {
//             setLoadingActions(true);
//             const response = await axioslogin.post(`/incidentMaster/getalldepartmentaction`, {
//                 inc_register_slno: id
//             });
//             const { success, message, data } = response.data;
//             if (success !== 2) return warningNotify(message)
//             return data;
//         } catch (error) {
//             console.error('Error fetching or processing images:', error);
//             warningNotify("Error in fetching Approvals");
//             return [];
//         } finally {
//             setLoadingActions(false);
//         }
//     }, []);

//     return { FetchAllHigLevelApprovals, loadingactions };
// };



export const processFishboneData = (data) => {
    // Helper to collect unique non-empty values
    const collect = (key) =>
        data
            .map((item) => item[key])
            .filter((v) => v && v.trim() !== "")
            .map((v) => v.trim());
    return [
        {
            top: {
                category: "MATERIAL",
                causes: collect("inc_material"),
            },
            bottom: {
                category: "MILIEU",
                causes: collect("inc_milieu"),
            },
        },
        {
            top: {
                category: "MACHINE",
                causes: collect("inc_machine"),
            },
            bottom: {
                category: "METHOD",
                causes: collect("inc_method"),
            },
        },
        {
            top: {
                category: "MAN",
                causes: collect("inc_man"),
            },
            bottom: {
                category: "MEASUREMENT",
                causes: collect("inc_measurement"),
            },
        },
    ];
}


