import { axiosellider, axioslogin } from "src/views/Axios/Axios";
import { warningNotify } from "src/views/Common/CommonCode";
import imageCompression from 'browser-image-compression';
import { useState, useCallback, useMemo } from "react";
import JSZip from "jszip";
import { isWithinInterval, startOfYesterday, endOfYesterday, format } from "date-fns";
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
        if (handleRateLimitError(error)) return [];
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


// fetching Incident Files 
export const useIncidentFiles = () => {
    const [loadingFiles, setLoadingFiles] = useState(false);

    const fetchIncidentFiles = useCallback(async (url) => {
        if (!url) {
            warningNotify(" No URL provided to fetchIncidentFiles");
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
            if (handleRateLimitError(error)) return [];

            console.error('Error fetching or processing files:', error);
            warningNotify("Error fetching files");
            return [];
        } finally {
            setLoadingFiles(false);
        }
    }, []);

    return { fetchIncidentFiles, loadingFiles };
};


//  Fixed version for fetching approval previews
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
            if (handleRateLimitError(error)) return [];
            console.error('Error fetching or processing images:', error);
            warningNotify("Error in fetching Approvals");
            return [];
        } finally {
            setLoadingApprovals(false);
        }
    }, []);

    return { FetchAllHigLevelApprovals, loadingapprovals };
};


// fetch all action detail for the registerd incident 
export const useLevelActionDetails = () => {
    const [loadingactionsreviewdetail, setLoadingActionReviewDetail] = useState(false);

    const FetchAllActionReviewDetails = useCallback(async (id) => {
        try {
            setLoadingActionReviewDetail(true);
            const response = await axioslogin.post(`/incidentMaster/getallincactionreview`, {
                inc_register_slno: id
            });
            const { success, message, data } = response.data;
            if (success !== 2) return warningNotify(message)
            return data;
        } catch (error) {
            if (handleRateLimitError(error)) return [];
            console.error('Error fetching or processing images:', error);
            warningNotify("Error in fetching Approvals");
            return [];
        } finally {
            setLoadingActionReviewDetail(false);
        }
    }, []);

    return { FetchAllActionReviewDetails, loadingactionsreviewdetail };
};



export const handleRateLimitError = (error) => {
    if (error?.response?.status === 429) {
        const message =
            error.response?.data?.message ||
            "Too many requests. Please wait and try again.";
        warningNotify(message);
        return true; //  tells caller: “Rate limit error handled”
    }
    return false; // not a rate-limit error
};




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


export const useFileUpload = (allowedTypes = []) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);

    const validateFile = (file) => {
        if (allowedTypes.length === 0) return true;
        return allowedTypes.includes(file.type);
    };

    /** Select + validate + preview */
    const handleFileSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);

        const validFiles = selectedFiles.filter(validateFile);
        const invalidFiles = selectedFiles.filter(f => !validateFile(f));

        if (invalidFiles.length > 0) {
            warningNotify("Only PNG, JPG, JPEG and PDF files are allowed");
        }

        // Prevent duplicates
        const uniqueFiles = validFiles.filter(
            file => !uploadedFiles.some(f => f.name === file.name)
        );

        if (uniqueFiles.length === 0) return;

        setUploadedFiles(prev => [...prev, ...uniqueFiles]);

        const newPreviews = uniqueFiles.map(file => ({
            name: file.name,
            url: URL.createObjectURL(file),
            type: file.type
        }));

        setPreviewUrls(prev => [...prev, ...newPreviews]);
    };

    /** Remove file + preview */
    const handleRemoveFile = (name) => {
        setUploadedFiles(prev => prev.filter(file => file.name !== name));
        setPreviewUrls(prev => prev.filter(img => img.name !== name));
    };

    return {
        uploadedFiles,
        previewUrls,
        handleFileSelect,
        handleRemoveFile,
        setUploadedFiles,
        setPreviewUrls
    };
};


export const TransformCommonIncidentLevels = (apiData) => {
    if (!apiData || apiData.length === 0) return [];

    const jsonLevels = JSON.parse(apiData[0].levels);
    const jsonSections = JSON.parse(apiData[0].sections);
    // Group levels by section
    const grouped = jsonSections.map(section => {
        const levelsInSection = jsonLevels
            .filter(level => level?.section_slno === section?.section_id)
            .sort((a, b) => a?.level_priority - b?.level_priority); // ensure order

        return {
            section_id: section?.section_id,
            mandatory: section?.mandatory,
            levels: levelsInSection
        };
    });
    return grouped;
};




// export const TransforIncidentLevels = (apiData) => {
//     if (!apiData || apiData.length === 0) return [];
//     const jsonLevels = JSON.parse(apiData[0].levels);
//     return jsonLevels;
// };


export const TransforIncidentLevels = (apiData) => {
    if (!apiData || apiData.length === 0) return [];

    return apiData.map(item => {
        const levels = item.levels ? JSON.parse(item.levels) : [];

        const transformedLevels = levels.map(level => ({
            ...level,
            currLevel: Number(level.level_no),       // current level number
            LevelSlno: Number(level.detail_slno),   // detail_slno
            LevelName: level.level_name,            // level name
            dep_id: item.dep_id,                     // department
            sec_id: item.sec_id                      // section
        }));

        return {
            dep_id: item.dep_id,
            sec_id: item.sec_id,
            levels: transformedLevels
        };
    });
};



export const useIncidentStats = (incidents = []) => {

    return useMemo(() => {
        if (!incidents || incidents.length === 0) {
            return {
                totalCount: 0,
                newCount: 0,
                processingCount: 0,
                closedCount: 0,
                yesterdayTotal: 0,
                yesterdayNew: 0,
                yesterdayProcessing: 0,
                yesterdayClosed: 0,
            };
        }

        const start = startOfYesterday();
        const end = endOfYesterday();

        const parseDate = (d) => new Date(d);

        const isYesterday = (item) => item?.create_date &&
            isWithinInterval(parseDate(item?.create_date), { start, end });

        const totalCount = incidents.length;

        const newFilter = (d) => d.inc_current_level === 0 && d.inc_current_level_review_state === null;
        const processingFilter = (d) => d.inc_current_level !== 0 && d.inc_current_level_review_state !== null && d.inc_all_approved === 0;
        const closedFilter = (d) => d.inc_all_approved === 1;

        const newCount = incidents.filter(newFilter).length;
        const processingCount = incidents.filter(processingFilter).length;
        const closedCount = incidents.filter(closedFilter).length;

        // Yesterday Counts
        const yesterdayIncidents = incidents.filter(isYesterday);

        const yesterdayTotal = yesterdayIncidents.length;
        const yesterdayNew = yesterdayIncidents.filter(newFilter).length;
        const yesterdayProcessing = yesterdayIncidents.filter(processingFilter).length;
        const yesterdayClosed = yesterdayIncidents.filter(closedFilter).length;

        return {
            totalCount,
            newCount,
            processingCount,
            closedCount,
            yesterdayTotal,
            yesterdayNew,
            yesterdayProcessing,
            yesterdayClosed,
        };

    }, [incidents]);
};





// @IncidentListCard.js
export const useIncidentCardHandlers = ({
    fetchIncidentFiles,
    FetchAllHigLevelApprovals,
    FetchAllActionReviewDetails
}) => {

    const GetAllLevelItems = useCallback(async (levelSlno) => {
        try {
            const { data } = await axioslogin.post("/incidentMaster/getlevelitems", { level_slno: levelSlno });
            if (data?.success !== 2) return warningNotify(data?.message);
            return data?.data;
        } catch (err) {
            warningNotify(err?.message ?? "Something went wrong");
        }
    }, []);

    const fetchAllData = useCallback(async (id, status, levelSlno) => {
        const filesReq = status === 1
            ? fetchIncidentFiles(`/incidentMaster/getincidentfile/${id}`)
            : Promise.resolve([]);

        const [
            files,
            approvalDetail,
            levelActionDetail,
            levelItems,
        ] = await Promise.all([
            filesReq,
            FetchAllHigLevelApprovals(id),
            FetchAllActionReviewDetails(id),
            GetAllLevelItems(levelSlno),
        ]);

        return { files, approvalDetail, levelActionDetail, levelItems };
    }, []);

    return { fetchAllData };
};
