import { axioslogin } from "src/views/Axios/Axios";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { format } from "date-fns";
import snowLogo from "../../../assets/images/logo.png";
import { DIET_STATUS, getPatientStatus, MEAL_ITEMS, PATIENT_STATUS, PATIENT_STATUS_TO_CODE } from "./Common";


pdfMake.vfs = pdfFonts.vfs;





export const getBase64Image = (imgPath) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            const reader = new FileReader();
            reader.onloadend = function () {
                resolve(reader.result);
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.onerror = reject;
        xhr.open("GET", imgPath);
        xhr.responseType = "blob";
        xhr.send();
    });
};



export const PrintFoodPreparationPdf = async (foodList = []) => {
    const snowBase64 = await getBase64Image(snowLogo)

    const today = format(new Date(), "dd MMM yyyy, hh:mm a")

    const tableBody = [
        [
            { text: "Sl.No", bold: true, fontSize: 10 },
            { text: "Item Name", bold: true, fontSize: 10 },
            { text: "Qty", bold: true, fontSize: 10 } // merged column
        ],
        ...foodList.map((item, index) => ([
            { text: index + 1, fontSize: 9 },
            { text: item.Item_name, fontSize: 9 },
            {
                text: `${item.Count} ${item.unit}`,
                fontSize: 9
            }
        ]))
    ]

    const docDefinition = {
        pageMargins: [40, 80, 40, 40],

        header: {
            margin: [20, 20, 20, 0],
            columns: [
                {
                    image: "snow",
                    fit: [90, 90]
                }
            ]
        },

        footer: (currentPage, pageCount) => ({
            alignment: "center",
            fontSize: 9,
            margin: [0, 10, 0, 0],
            text: `${currentPage} of ${pageCount}`
        }),

        content: [
            {
                text: "FOOD FOR PREPARATION",
                alignment: "center",
                bold: true,
                fontSize: 12,
                margin: [0, 5, 0, 5]
            },
            {
                text: `Generated On : ${today}`,
                alignment: "right",
                fontSize: 9,
                margin: [0, 0, 0, 6]
            },
            {
                style: "tableExample",
                table: {
                    widths: [40, "*", 120], // adjusted widths
                    body: tableBody
                }
            }
        ],

        styles: {
            tableExample: {
                margin: [0, 5, 0, 15]
            }
        },

        images: {
            snow: snowBase64
        }
    }

    pdfMake.createPdf(docDefinition).open()
}


// only for pratice 

// export const generatePatientDietOrders = ({
//     count = 100,
//     diets = [],
//     nursingStations = [],
//     includeBystander = false
// }) => {
//     const data = []
//     const orderCounter = {}

//     const MEALS = ['Breakfast', 'Lunch', 'Dinner']

//     const MEAL_CODE = {
//         Breakfast: 'BF',
//         Lunch: 'LN',
//         Dinner: 'DN'
//     }

//     for (let i = 0; i < count; i++) {
//         const station = nursingStations[i % nursingStations.length]
//         const diet = diets[i % diets.length]

//         const ns_code = station?.fb_ns_code
//         const diet_name = diet?.diet_name
//         const gender = i % 2 === 0 ? 'F' : 'M'

//         if (!orderCounter[ns_code]) orderCounter[ns_code] = 1

//         /* STATUS */
//         const patient_status = getPatientStatus(i)
//         const patient_status_code =
//             PATIENT_STATUS_TO_CODE[patient_status]

//         let finalDietName = diet_name
//         let diet_status = DIET_STATUS.UNCHANGED

//         if (patient_status === PATIENT_STATUS.DIET_CHANGED) {
//             finalDietName =
//                 diets[(i + 1) % diets.length]?.diet_name
//             diet_status = DIET_STATUS.UPDATED
//         }

//         if (
//             patient_status === PATIENT_STATUS.DISCHARGED
//             // patient_status === PATIENT_STATUS.DECEASED
//         ) {
//             diet_status = DIET_STATUS.STOPPED
//         }

//         /* CREATE ONE OBJECT PER MEAL */
//         // MEALS.forEach(meal => {
//         //     data.push({
//         //         dietpt_slno: i + 1,
//         //         ip_no: `230000${1000 + i}`,
//         //         pt_no: `P-0000${1000 + i}`,
//         //         ptc_ptname: `PATIENT ${i + 1}`,
//         //         ptc_sex: gender,
//         //         ipd_status: i % 3 === 0 ? 'N' : 'Y',

//         //         ns_code,
//         //         diet_name: finalDietName,

//         //         patient_status,
//         //         patient_status_code,
//         //         diet_status,

//         //         meal,
//         //         order_id: `${MEAL_CODE[meal]}-${ns_code}-${String(
//         //             orderCounter[ns_code]
//         //         ).padStart(4, '0')}`,

//         //         items:
//         //             MEAL_ITEMS[meal][
//         //             i % MEAL_ITEMS[meal].length
//         //             ]
//         //     })
//         // })

//         MEALS.forEach(meal => {
//             const baseObject = {
//                 dietpt_slno: i + 1,
//                 ip_no: `230000${1000 + i}`,
//                 pt_no: `P-0000${1000 + i}`,
//                 ptc_ptname: `PATIENT ${i + 1}`,
//                 ptc_sex: gender,
//                 ipd_status: i % 3 === 0 ? 'N' : 'Y',

//                 ns_code,
//                 diet_name: finalDietName,

//                 patient_status,
//                 patient_status_code,
//                 diet_status,

//                 meal,
//                 order_id: `${MEAL_CODE[meal]}-${ns_code}-${String(
//                     orderCounter[ns_code]
//                 ).padStart(4, '0')}`,

//                 items:
//                     MEAL_ITEMS[meal][
//                     i % MEAL_ITEMS[meal].length
//                     ],

//                 is_bystander: false   // DEFAULT
//             }

//             // Push normal patient
//             data.push(baseObject)

//             //  ADD BYSTANDER IF REQUIRED
//             if (includeBystander && i % 5 === 0) {
//                 // example condition: every 5th patient has bystander

//                 data.push({
//                     ...baseObject,
//                     diet_name: null,  //No diet
//                     order_id: `BS-${baseObject.order_id}`, // distinguish
//                     is_bystander: true
//                 })
//             }
//         })


//         orderCounter[ns_code]++
//     }

//     return data
// }

export const generatePatientDietOrders = ({
    count = 100,
    diets = [],
    nursingStations = [],
    includeBystander = false
}) => {

    const data = []
    const orderCounter = {}

    const MEALS = ['Breakfast', 'Lunch', 'Dinner']

    const MEAL_CODE = {
        Breakfast: 'BF',
        Lunch: 'LN',
        Dinner: 'DN'
    }

    // Safety check
    if (!diets.length || !nursingStations.length) {
        return []
    }

    for (let i = 0; i < count; i++) {

        const station = nursingStations[i % nursingStations.length]
        const diet = diets[i % diets.length]

        const ns_code = station?.fb_ns_code
        const diet_name = diet?.diet_name
        const gender = i % 2 === 0 ? 'F' : 'M'

        if (!orderCounter[ns_code]) {
            orderCounter[ns_code] = 1
        }

        /* ---------------- STATUS ---------------- */

        const patient_status = getPatientStatus(i)

        const patient_status_code =
            PATIENT_STATUS_TO_CODE[patient_status]

        let finalDietName = diet_name
        let diet_status = DIET_STATUS.UNCHANGED

        if (patient_status === PATIENT_STATUS.DIET_CHANGED) {
            finalDietName =
                diets[(i + 1) % diets.length]?.diet_name
            diet_status = DIET_STATUS.UPDATED
        }

        if (patient_status === PATIENT_STATUS.DISCHARGED) {
            diet_status = DIET_STATUS.STOPPED
        }

        /* ------------ CREATE PER MEAL ----------- */

        MEALS.forEach(meal => {

            const baseObject = {
                dietpt_slno: i + 1,
                ip_no: `230000${1000 + i}`,
                pt_no: `P-0000${1000 + i}`,
                ptc_ptname: `PATIENT ${i + 1}`,
                ptc_sex: gender,
                ipd_status: i % 3 === 0 ? 'N' : 'Y',

                ns_code,
                diet_name: finalDietName,

                patient_status,
                patient_status_code,
                diet_status,

                meal,
                order_id: `${MEAL_CODE[meal]}-${ns_code}-${String(
                    orderCounter[ns_code]
                ).padStart(4, '0')}`,

                items:
                    MEAL_ITEMS[meal][
                        i % MEAL_ITEMS[meal].length
                    ],

                is_bystander: false
            }

            // Push Patient
            data.push(baseObject)

            /* ------------ ADD BYSTANDER ------------ */
            // Every 5th patient: 5,10,15,20...

            if (includeBystander && (i + 1) % 5 === 0) {

                data.push({
                    ...baseObject,
                    diet_name: null,               // no diet
                    diet_status: null,             // optional clean
                    order_id: `BS-${baseObject.order_id}`,
                    is_bystander: true
                })
            }

        })

        orderCounter[ns_code]++
    }

    return data
}


// Utility function to determine food status
export const getFoodStatus = (pt, isAssigned) => {

    // 1. Cancelled condition
    if (
        pt.patient_status_code === "X" ||
        pt.diet_status === "STOPPED"
    ) {
        return {
            foodStatus: "Discharged",
            checkStatus: true,
            color: 'red',
            bgcolor: '#ffdfdf'
        };
    }

    // 2. Assigned condition
    if (isAssigned) {
        return {
            foodStatus: "Out for Delivery",
            checkStatus: true,
            color: 'green',
            bgcolor: '#d3fbce'
        };
    }

    // 3. Default condition
    return {
        foodStatus: "Pending",
        checkStatus: false,
        color: 'orange',
        bgcolor: '#f9f9f9'
    };
};


export const DietFoodFetching = async () => {
    try {
        const result = await axioslogin.get('/kotitem/get/kotitem')
        const { success, data } = result.data
        if (success === 1 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error In Fetching Detail:", error?.message || error);
        return [];
    }
};



export const DietItemType = async () => {
    try {
        const result = await axioslogin.get('/itemgrp/getitem')
        const { success, data } = result.data
        if (success === 1 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error In Fetching Item Type Detail:", error?.message || error);
        return [];
    }
};



export const GetAllRoomTypeDetail = async () => {
    try {
        const result = await axioslogin.get('/kotitem/room/getallroomtype')
        const { success, data } = result.data

        if (success === 1 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error In Fetching Item Type Detail:", error?.message || error);
        return [];
    }
};

export const GetAllDietRoomCategoryDetail = async () => {
    try {
        const result = await axioslogin.get('/kotitem/getalldietroom')
        const { success, data } = result.data

        if (success === 1 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error In Fetching Item Type Detail:", error?.message || error);
        return [];
    }
};



export const getAllDietTime = async () => {
    try {
        const result = await axioslogin.get('/ratelist/diettype')
        const { success, data } = result.data

        if (success === 1 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error In Fetching Item Type Detail:", error?.message || error);
        return [];
    }
};


// export const getAllDietItems = async () => {
//     try {
//         const result = await axioslogin.get(`/dietmenudtl/item/${group}`)
//         const { success, data } = result.data

//         if (success === 1 && Array.isArray(data) && data.length > 0) {
//             return data;
//         }
//         return [];
//     } catch (error) {
//         console.error("Error In Fetching Item Type Detail:", error?.message || error);
//         return [];
//     }
// };




export const getDietName = async () => {
    try {
        const result = await axioslogin.get('/ratelist/diet')
        const { success, data } = result.data
        if (success === 1) {
            return data;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error In Fetching Diets:", error?.message || error);
        return [];
    }

}

export const getDietDeliveryTime = async () => {
    try {
        const result = await axioslogin.get('/kotitem/getalldietdelivery')
        const { success, data } = result.data
        if (success === 1) {
            return data;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error In Fetching Diets:", error?.message || error);
        return [];
    }

}


export const getallNurseStationMaster = async () => {
    try {
        const res = await axioslogin.get('/feedback/getallnursestation');
        const { success, data } = res.data;

        if (success === 0) {
            // No data found
            return [];
        }

        if (success === 2) {
            return data || [];
        }

        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error fetching all nurse stations:", error);
        return [];
    }
};




export const getallNurseStationBedDetail = async (code) => {
    if (!code) return;
    try {
        const res = await axioslogin.post('/kotitem/getnsbeds', {
            NS_CODE: code
        });
        const { success, data } = res.data;

        if (success === 1) {
            // No data found
            return [];
        }

        if (success === 2) {
            return data || [];
        }

        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error fetching all nurse stations Bed Detail:", error);
        return [];
    }
};


export const getAllEmployyeName = async () => {
    try {
        const res = await axioslogin.get('/common/empname');
        const { success, data } = res.data;

        if (success === 0) {
            // No data found
            return [];
        }

        if (success === 1) {
            return data || [];
        }

        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error fetching all nurse stations Bed Detail:", error);
        return [];
    }
};

export const normalizeFloor = (name = "") =>
    name?.trim().replace(/\s+/g, " ");