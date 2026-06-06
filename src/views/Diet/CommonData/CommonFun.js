import { axioslogin } from "src/views/Axios/Axios";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import snowLogo from "../../../assets/images/logo.png";
import { DIET_STATUS, getPatientStatus, MEAL_ITEMS, PATIENT_STATUS, PATIENT_STATUS_TO_CODE } from "./Common";
import { warningNotify } from "src/views/Common/CommonCode";
import { format, isSameDay, isValid, parseISO } from 'date-fns';
import JSZip from "jszip";


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



export const PrintFoodPreparationPdf = async (batchList = []) => {

    const snowBase64 = await getBase64Image(snowLogo)

    const today = format(new Date(), "dd MMM yyyy, hh:mm a")

    const content = []

    // ==========================================
    // HEADER
    // ==========================================
    content.push(
        {
            text: "FOOD PREPARATION BATCH REPORT",
            alignment: "center",
            bold: true,
            fontSize: 15,
            margin: [0, 5, 0, 8]
        },
        {
            text: `Generated On : ${today}`,
            alignment: "right",
            fontSize: 9,
            margin: [0, 0, 0, 15]
        }
    )

    // ==========================================
    // BATCH LOOP
    // ==========================================
    batchList?.forEach((batch, batchIndex) => {

        // ------------------------------------------
        // BATCH HEADER
        // ------------------------------------------
        content.push({
            table: {
                widths: ['25%', '25%', '50%'],
                body: [
                    [
                        {
                            text: `Batch ID : ${batch.batch_id}`,
                            bold: true,
                            fontSize: 10,
                            fillColor: '#eeeeee'
                        },
                        {
                            text: `Meal Type : ${batch.meal_type}`,
                            bold: true,
                            fontSize: 10,
                            fillColor: '#eeeeee'
                        },
                        {
                            text: `Prepared By : ${batch.prepared_by_name || '-'}`,
                            bold: true,
                            fontSize: 10,
                            fillColor: '#eeeeee'
                        }
                    ]
                ]
            },
            layout: 'lightHorizontalLines',
            margin: [0, 5, 0, 5]
        })

        // ------------------------------------------
        // BATCH DETAILS
        // ------------------------------------------
        content.push({
            columns: [
                {
                    width: '50%',
                    text: `Production Date : ${batch.production_date || '-'}`,
                    fontSize: 9
                },
                {
                    width: '50%',
                    text: `Cancelled By : ${batch.Cancelled_by_name || '-'}`,
                    fontSize: 9
                }
            ],
            margin: [0, 0, 0, 3]
        })

        content.push({
            text: `Remark : ${batch.remark || '-'}`,
            fontSize: 9,
            margin: [0, 0, 0, 8]
        })

        // ------------------------------------------
        // ITEM TABLE
        // ------------------------------------------
        const itemTableBody = [
            [
                {
                    text: 'Sl.No',
                    bold: true,
                    fontSize: 10,
                    fillColor: '#d9d9d9'
                },
                {
                    text: 'Item Name',
                    bold: true,
                    fontSize: 10,
                    fillColor: '#d9d9d9'
                },
                {
                    text: 'Quantity',
                    bold: true,
                    fontSize: 10,
                    fillColor: '#d9d9d9'
                }
            ],

            ...(batch.items || []).map((item, index) => ([
                {
                    text: index + 1,
                    fontSize: 9
                },
                {
                    text: item.item_name || '-',
                    fontSize: 9
                },
                {
                    text: item.qty || 0,
                    fontSize: 9,
                    alignment: 'center'
                }
            ]))
        ]

        content.push({
            style: 'tableStyle',
            table: {
                headerRows: 1,
                widths: [50, '*', 80],
                body: itemTableBody
            },
            layout: {
                fillColor: (rowIndex) => {
                    return rowIndex === 0 ? '#f1f1f1' : null
                }
            },
            margin: [0, 0, 0, 15]
        })

        // ------------------------------------------
        // SEPARATOR
        // ------------------------------------------
        if (batchIndex !== batchList.length - 1) {
            content.push({
                canvas: [
                    {
                        type: 'line',
                        x1: 0,
                        y1: 5,
                        x2: 515,
                        y2: 5,
                        lineWidth: 1,
                        lineColor: '#cccccc'
                    }
                ],
                margin: [0, 5, 0, 10]
            })
        }

    })

    // ==========================================
    // PDF DOCUMENT
    // ==========================================
    const docDefinition = {

        pageMargins: [40, 80, 40, 40],

        header: {
            margin: [20, 15, 20, 0],
            columns: [
                {
                    image: 'snow',
                    fit: [90, 90]
                }
            ]
        },

        footer: (currentPage, pageCount) => ({
            alignment: 'center',
            fontSize: 9,
            margin: [0, 10, 0, 0],
            text: `${currentPage} of ${pageCount}`
        }),

        content,

        styles: {
            tableStyle: {
                margin: [0, 5, 0, 10]
            }
        },

        images: {
            snow: snowBase64
        }
    }

    pdfMake.createPdf(docDefinition).open()
}


export const PrintDietStatusPdf = async (dietList = []) => {

    const snowBase64 = await getBase64Image(snowLogo);

    const today = format(
        new Date(),
        "dd MMM yyyy, hh:mm a"
    );

    const tableBody = [

        [
            {
                text: "Sl.No",
                bold: true,
                fontSize: 8,
                fillColor: "#d9d9d9",
                alignment: "center"
            },
            {
                text: "Patient",
                bold: true,
                fontSize: 8,
                fillColor: "#d9d9d9"
            },
            {
                text: "MRD No",
                bold: true,
                fontSize: 8,
                fillColor: "#d9d9d9"
            },
            {
                text: "Diet",
                bold: true,
                fontSize: 8,
                fillColor: "#d9d9d9"
            },
            {
                text: "Doctor",
                bold: true,
                fontSize: 8,
                fillColor: "#d9d9d9"
            },
            {
                text: "Bed",
                bold: true,
                fontSize: 8,
                fillColor: "#d9d9d9"
            },
            {
                text: "Nursing Station",
                bold: true,
                fontSize: 8,
                fillColor: "#d9d9d9"
            },
            {
                text: "Status",
                bold: true,
                fontSize: 8,
                fillColor: "#d9d9d9",
                alignment: "center"
            }
        ],

        ...dietList.map((item, index) => ([
            {
                text: index + 1,
                fontSize: 7,
                alignment: "center"
            },
            {
                text: item.patient_name || "-",
                fontSize: 7
            },
            {
                text: item.patient_id || "-",
                fontSize: 7
            },
            {
                text: item.diet_name || "-",
                fontSize: 7
            },
            {
                text: item.doctor_name || "-",
                fontSize: 7
            },
            {
                text: item.fb_bdc_no || "-",
                fontSize: 7,
                alignment: "center"
            },
            {
                text: item.fb_ns_name || "-",
                fontSize: 7
            },
            {
                text: item.assignment_status || "-",
                fontSize: 7,
                alignment: "center"
            }
        ]))
    ];

    const docDefinition = {

        pageOrientation: "landscape",

        pageMargins: [20, 70, 20, 30],

        defaultStyle: {
            fontSize: 7
        },

        header: {
            margin: [20, 10, 20, 0],
            columns: [
                {
                    image: "snow",
                    fit: [80, 80]
                }
            ]
        },

        footer: (currentPage, pageCount) => ({
            alignment: "center",
            fontSize: 8,
            margin: [0, 5, 0, 0],
            text: `${currentPage} of ${pageCount}`
        }),

        content: [

            {
                text: "DIET STATUS REPORT",
                alignment: "center",
                bold: true,
                fontSize: 14,
                margin: [0, 0, 0, 8]
            },

            {
                text: `Generated On : ${today}`,
                alignment: "right",
                fontSize: 8,
                margin: [0, 0, 0, 10]
            },

            {
                table: {
                    headerRows: 1,
                    widths: [
                        25,   // SlNo
                        90,   // Patient
                        75,   // MRD
                        70,   // Diet
                        "*",  // Doctor
                        45,   // Bed
                        80,   // Nursing Station
                        60    // Status
                    ],
                    body: tableBody
                },

                layout: {
                    fillColor: (rowIndex) =>
                        rowIndex === 0 ? "#f1f1f1" : null,

                    hLineWidth: () => 0.5,
                    vLineWidth: () => 0.5,

                    paddingTop: () => 3,
                    paddingBottom: () => 3,
                    paddingLeft: () => 4,
                    paddingRight: () => 4
                }
            }

        ],

        images: {
            snow: snowBase64
        }
    };

    pdfMake.createPdf(docDefinition).open();
};


export const formatDietPayload = (schedule, template_id, created_by) => {
    // Final array that will be sent to backend (INSERT + UPDATE mixed)
    const result = [];
    // Loop through each day (1–7)
    Object.entries(schedule).forEach(([day, times]) => {
        // Loop through each diet type (Breakfast, Lunch, Dinner, etc.)
        Object.entries(times).forEach(([type_id, foods]) => {
            // Loop through each food item inside that type
            foods?.forEach((food) => {
                result.push({
                    // If exists → UPDATE, if null → INSERT
                    template_food_id: food.template_food_id || null,
                    template_id: template_id,
                    week_day: Number(day),
                    type_id: Number(type_id),
                    item_id: food.item_id,
                    quantity: Number(food.qty),
                    unit_id: food.measure,
                    created_by: created_by
                });

            });

        });

    });

    // Return final formatted payload
    return result;
};


// Arranging the data into what we want Formate llike
export const formatTemplateFoodToSchedule = (TemplateFood = []) => {

    // Final structured object for UI (week → type → foods)
    const schedule = {};
    // Loop through each item from API
    TemplateFood?.forEach((item) => {
        const { week_day, type_id } = item;
        // Create day if not exists
        if (!schedule[week_day]) {
            schedule[week_day] = {};
        }
        // Create type inside day if not exists
        if (!schedule[week_day][type_id]) {
            schedule[week_day][type_id] = [];
        }
        // Push formatted food item
        schedule[week_day][type_id].push({
            ...item,
            //  Map backend → frontend fields
            itemtype: item.group_name,
            qty: item.quantity,
            measure: item.unit_id,
            //  Flag to identify existing records
            isExisting: true
        });

    });

    return schedule;
};


// Reduce Array to Batches and Send to Backend properly
export const processInBatches = async (dataArray, batchSize, asyncCallback) => {
    // Validate input: must be an array
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
        return;
    }
    // Loop through the array in steps of batchSize
    for (let i = 0; i < dataArray.length; i += batchSize) {
        // Take a slice of the array as the current batch
        const batch = dataArray.slice(i, i + batchSize);
        // Execute the provided async function for the batch
        // This allows flexibility (API call, processing, etc.)
        await asyncCallback(batch, i);
    }
};


//  Helper: Find the original item from API data using identifiers
const findOriginalItem = (originalSchedule, item) => {
    //  Step 1: Get data for the specific week day
    const dayData = originalSchedule[item.week_day]
    //  If no data exists for this day, return null
    if (!dayData) return null
    //  Step 2: Get data for the specific type (Breakfast/Lunch/etc.)
    const typeData = dayData[item.type_id]
    //  If no data exists for this type, return null
    if (!typeData) return null
    //  Step 3: Find the exact item using unique template_food_id
    return typeData?.find(
        x => x.template_food_id === item.template_food_id
    )
}

// Get only changed items
//  Function: Filter and return ONLY changed items
export const getChangedItems = (payload, originalSchedule) => {

    return payload.filter(item => {
        //  Skip new items (they belong to INSERT, not UPDATE)
        if (!item?.template_food_id) return false
        //  Find the original version of this item from API data
        const original = findOriginalItem(originalSchedule, item)
        // If original item not found, skip
        if (!original) return false
        //  Compare fields to detect changes
        // If ANY field is different → mark as changed
        return (
            Number(original.item_id) !== Number(item.item_id) ||
            Number(original.quantity) !== Number(item.quantity) ||
            Number(original.unit_id) !== Number(item.unit_id) ||
            Number(original.type_id) !== Number(item.type_id) ||
            Number(original.week_day) !== Number(item.week_day)
        )
    })
}

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

export const applyColumnToAll = (
    field,
    checked,
    allPartyType,
    prices,
    setPrices,
    setApplyState
) => {

    if (!allPartyType?.length) return;

    const firstId = allPartyType[0]?.party_type_id;
    const firstValue = prices?.[firstId]?.[field];
    if (checked && !firstValue) {
        return warningNotify(`Enter ${field} for first row`);
    }
    setPrices(prev => {
        const updated = { ...prev };
        allPartyType?.forEach(party => {
            const id = party?.party_type_id;
            updated[id] = {
                ...updated?.[id],
                [field]: checked ? firstValue : ""
            };

        });
        return updated;
    });
    setApplyState(checked);
};


// export const organizeBatchData = (batchFoodDetail = []) => {

//     if (!batchFoodDetail?.length) return [];

//     const grouped = {};

//     batchFoodDetail.forEach(item => {

//         const typeId = item.type_slno;
//         const type_desc = item.type_desc;

//         if (!grouped[typeId]) {
//             grouped[typeId] = {
//                 type_id: typeId,
//                 type_desc: type_desc,
//                 items: []
//             };
//         }

//         grouped[typeId].items.push({
//             item_id: item.item_id,
//             item_name: item.item_name,
//             required_qty: item.total_qty
//         });

//     });

//     return Object.values(grouped);
// };

export const organizeBatchData = (
    batchFoodDetail = []
) => {

    if (!batchFoodDetail?.length) return [];

    const grouped = {};

    batchFoodDetail.forEach(item => {

        const typeId = item.type_slno;

        if (!grouped[typeId]) {

            grouped[typeId] = {

                type_id: typeId,

                type_desc: item.type_desc,

                items: [],

                order_ids: new Set()
            };
        }

        // ADD ITEM
        grouped[typeId].items.push({

            item_id: item.item_id,

            item_name: item.item_name,

            required_qty: item.total_qty
        });

        // ADD ORDER ID
        grouped[typeId].order_ids.add(
            item.canteen_order_id
        );
    });

    // CONVERT SET TO ARRAY
    return Object.values(grouped).map(batch => ({

        ...batch,

        order_ids: [...batch.order_ids]
    }));
};

export const formatPatientDietData = (data = []) => {

    return Object.values(
        data.reduce((acc, item) => {

            // UNIQUE KEY
            const key = item.ip_no;

            // CREATE PATIENT ONLY ONCE
            if (!acc[key]) {
                acc[key] = {
                    dietpt_slno: item.dietpt_slno,
                    ip_no: item.ip_no,
                    pt_no: item.pt_no,
                    ptc_ptname: item.ptc_ptname,
                    ptc_sex: item.ptc_sex,
                    ipd_date: item.ipd_date,
                    doc_name: item.doc_name,
                    fb_bdc_no: item.fb_bdc_no,
                    fb_bd_code: item.bd_code,
                    fb_rmc_desc: item.fb_rmc_desc,
                    fb_rtc_desc: item.fb_rtc_desc,
                    fb_ns_name: item.fb_ns_name,
                    do_code: item.do_code,

                    // STORE ALL DIETS HERE
                    diet_history: []
                };
            }

            // ADD DIET ONLY IF PLAN EXISTS
            if (item.plan_id) {
                acc[key].diet_history.push({
                    plan_id: item.plan_id,
                    diet_status: item.diet_status,
                    diet_id: item.diet_id,
                    diet_name: item.diet_name,
                    dietitian_id: item.dietitian_id,
                    Dietecian_name: item.Dietecian_name,
                    template_id: item.template_id,
                    template_name: item.template_name,
                    is_consultation: item.is_consultation,
                    calories_per_day: item.calories_per_day,
                    protein_per_day: item.protein_per_day,
                    description: item.description,
                    effective_from: item.effective_from,
                    effective_to: item.effective_to
                });
            }

            return acc;

        }, {})
    );
};




// export const transformRates = (ratesObj) => {
//     if (!ratesObj || typeof ratesObj !== "object") return [];
//     return Object.entries(ratesObj)?.map(([partyId, rate]) => ({
//         party_type_id: Number(partyId),
//         price: Number(rate?.price ?? 0),
//         gst_rate: Number(rate?.gst_rate ?? 0),
//         discount: Number(rate?.discount ?? 0),
//         discount_rate: Number(rate?.discount_rate ?? 0)
//     }));
// };

export const transformRates = (ratesObj) => {

    if (!ratesObj || typeof ratesObj !== "object") {
        return [];
    }

    return Object.entries(ratesObj).map(([partyId, rate]) => ({

        price_id: rate?.price_id || null,

        party_type_id: Number(partyId),

        price: Number(rate?.price ?? 0),

        gst_rate: Number(rate?.gst_rate ?? 0),

        discount: Number(rate?.discount ?? 0),

        discount_rate: Number(rate?.discount_rate ?? 0)

    }));
};




export const groupByDayAndType = (
    templateData = [],
    orderItems = [],
    scheduleDetails = []
) => {

    const dayMap = {
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
        7: "Sunday"
    };

    // Current weekday (1-7)
    const todayWeekDay = format(new Date(), "i");

    return templateData?.reduce((acc, item) => {

        const dayKey = dayMap[item?.week_day] || "Unknown";
        const type = item?.type_desc;

        // create day object
        if (!acc[dayKey]) {
            acc[dayKey] = {};
        }

        // create type object only once
        if (!acc[dayKey][type]) {

            // Match today's schedule detail only
            const matchedSchedule = scheduleDetails.find((sch) => {
                const sameType =
                    sch?.type_desc === item?.type_desc;
                const sameDate =
                    sch?.process_date &&
                    isSameDay(
                        new Date(sch.process_date),
                        new Date()
                    );
                const sameWeekDay =
                    String(item?.week_day) === String(todayWeekDay);

                return (
                    sameType &&
                    sameDate &&
                    sameWeekDay
                );
            });

            acc[dayKey][type] = {
                type_status: matchedSchedule?.schedule_status || null,
                patient_diet_id: matchedSchedule?.patient_diet_id || null,
                process_date: matchedSchedule?.process_date || null,
                items: []
            };
        }

        // Existing food order matching logic
        const matchedOrder = orderItems.find((ord) => {

            const sameItem =
                ord?.item_name?.trim()?.toLowerCase() ===
                item?.item_name?.trim()?.toLowerCase();

            const sameType =
                ord?.type_desc === item?.type_desc;

            const sameWeekDay =
                String(item?.week_day) === String(todayWeekDay);

            const sameDate =
                ord?.order_date &&
                isSameDay(
                    new Date(ord.order_date),
                    new Date()
                );

            return (
                sameItem &&
                sameType &&
                sameWeekDay &&
                sameDate
            );
        });

        // push item
        acc[dayKey][type].items.push({
            ...item,
            order_status: matchedOrder?.order_status || null,
            isOrdered: !!matchedOrder,
            order_id: matchedOrder?.order_id || null
        });

        return acc;

    }, {});
};


// GROUP BATCH DATA BY BATCH + ITEM
// RESULT:
// [
//   {
//     batch_id: 1,
//     meal_type: "BREAKFAST",
//     items: [
//       { item_id: 119, item_name: "AL FAHAM CHICKEN", total_qty: 1 },
//       { item_id: 104, item_name: "BEEF CURREY", total_qty: 1 },
//       { item_id: 113, item_name: "LEMON JUICE", total_qty: 1 }
//     ]
//   }
// ]


// export const groupMealItems = (data = []) => {

//     if (!data?.length) return [];

//     const itemMap = new Map();

//     data.forEach(row => {

//         const {
//             batch_id,
//             meal_type,
//             item_id,
//             item_name,
//             ordered_qty,
//             production_date,
//             kitchen_item_status
//         } = row;

//         // UNIQUE KEY
//         const key = `${meal_type}_${item_id}`;

//         // CREATE ITEM
//         if (!itemMap.has(key)) {

//             itemMap.set(key, {
//                 batch_ids: [],
//                 meal_type,
//                 production_date,
//                 item_id,
//                 item_name,
//                 kitchen_item_status,
//                 total_qty: 0
//             });
//         }

//         const existingItem = itemMap.get(key);

//         // ADD UNIQUE BATCH ID
//         if (!existingItem.batch_ids.includes(batch_id)) {
//             existingItem.batch_ids.push(batch_id);
//         }

//         // ADD TOTAL QTY
//         existingItem.total_qty += Number(ordered_qty || 0);
//     });

//     return Array.from(itemMap.values());
// };


export const groupMealItems = (data = []) => {
    const grouped = {};

    data.forEach(row => {
        const id = row.batch_id;

        if (!grouped[id]) {
            grouped[id] = {
                batch_id: row.batch_id,
                meal_type: row.meal_type,
                kitchen_status: row.kitchen_status,
                production_date: row.production_date,
                prepared_by: row.prepared_by,
                prepared_by_name: row.prepared_by_name,
                remark: row.remark,
                Cancelled_by_name: row.Cancelled_by_name,
                items: []
            };
        }

        grouped[id].items.push({
            item_id: row.item_id,
            item_name: row.item_name,
            qty: row.ordered_qty,
            status: row.kitchen_item_status
        });
    });

    return Object.values(grouped);
};

export const getStatusColor = (status) => {
    switch (status) {
        case "SERVED":
            return "success";
        case "CANCELLED":
            return "danger";
        default:
            return "warning"; // PENDING
    }
};


export const groupByPlanId = (data = []) => {
    const map = new Map();

    data?.forEach(item => {
        const key = item.plan_id;

        if (!map.has(key)) {
            map.set(key, {
                plan_id: item.plan_id,
                patient_id: item.patient_id,
                admission_id: item.admission_id,
                diet_id: item.diet_id,
                diet_name: item.diet_name,
                fb_ptc_name: item.fb_ptc_name,
                types: []
            });
        }

        // push type_id uniquely
        const existing = map.get(key);
        if (!existing.types.includes(item.type_id)) {
            existing.types.push(item.type_id);
        }
    });

    return Array.from(map.values());
};


export const getTypeStatus = (typeData = {}) => {

    const status = typeData?.type_status;

    if (status === "CANCELLED") return "CANCELLED";
    if (status === "SERVED") return "SERVED";

    return "PENDING";
};

// used for the safe parsing detail
export const getSafeFormattedDate = (
    inputDate,
    outputFormat = 'yyyy-MM-dd'
) => {
    try {
        let dateObj;
        // Handle Date object
        if (inputDate instanceof Date) {
            dateObj = inputDate;
        }
        // Handle string input
        else if (typeof inputDate === 'string') {
            dateObj = parseISO(inputDate);
        }
        // Fallback to current date
        else {
            dateObj = new Date();
        }
        // Validate
        if (!isValid(dateObj)) {
            dateObj = new Date();
        }
        return format(dateObj, outputFormat);
    } catch (error) {
        // Final fallback
        return format(new Date(), outputFormat);
    }
};

// format the diet data suitable for formatting
export const groupByDiet = (data) =>
    Object.values(
        data?.reduce((acc, item) => {
            acc[item.diet_id] ??= {
                diet_id: item.diet_id,
                diet_name: item.diet_name,
                template_id: item.template_id,
                template_name: item.template_name,
                types: []
            };

            acc[item.diet_id].types.push(item);
            return acc;
        }, {})
    );

// really compliced 

// not using
export const buildDietBatchPayload = (
    selectedDietTimes,
    todate,
    empId,
    dietList,
    isAllSelected
) => {
    const production_date = format(new Date(todate), 'yyyy-MM-dd HH:mm:ss');

    // diet_id -> diet_name map
    const dietMap = Object.fromEntries(dietList.map(d => [d.diet_id, d.diet_name]));

    // get unique type_ids
    const types = [...new Set(Object.values(selectedDietTimes).flat())];

    // all diet names for remark
    const allDietNames = Object.keys(selectedDietTimes)
        .map(id => dietMap[id])
        .filter(Boolean)
        .join(' + ');

    // build batch with type_id + diet_ids
    const batch = types.map(type_id => {
        // find all diet_ids that include this type
        const dietIdsForType = Object.entries(selectedDietTimes)
            .filter(([, times]) => times.includes(type_id))
            .map(([dietId]) => Number(dietId));

        // get names for remark
        const matchedDietNames = dietIdsForType.map(id => dietMap[id]).filter(Boolean);

        const remark = isAllSelected
            ? `${allDietNames} Batch`
            : `${matchedDietNames.join(' + ')} Type ${type_id} Batch`;

        return {
            type_id,
            diet_ids: dietIdsForType,  // <-- diet_ids included here
            production_date,
            processed_by: empId,
            is_active: 1,
            remark,
            processed_at: production_date
        };
    });

    return batch;
};




export const getDietProductionItems = (data = [], selectedDiets = []) => {
    if (!Array.isArray(data) || !Array.isArray(selectedDiets)) return [{ message: "No patients under this diet" }];

    const numericSelectedDiets = selectedDiets.map(Number);

    const filteredData = data.filter(d => numericSelectedDiets.includes(Number(d?.diet_id)));

    // If nothing matches, return a placeholder object
    if (filteredData.length === 0) {
        return [{ message: "No patients under this diet" }];
    }

    return filteredData;
};



export const summarizePatients = (
    activeData = [],
    scheduledData = []
) => {

    // get processed plan_ids from scheduled data
    const processedPlanIds = new Set(
        scheduledData?.map(d => d.plan_id)
    );

    // total unique patients
    const totalPatients = new Set(
        activeData?.map(d => d.patient_id)
    ).size;

    // patients per diet (unique patients per diet)
    const patientsPerDiet = {};

    activeData?.forEach(d => {
        if (!patientsPerDiet[d.diet_id]) {
            patientsPerDiet[d.diet_id] = new Set();
        }
        patientsPerDiet[d.diet_id]?.add(d.patient_id);
    });

    // convert Set count
    Object.keys(patientsPerDiet)?.forEach(key => {
        patientsPerDiet[key] = patientsPerDiet[key].size;
    });

    // new patients (plan_id not in scheduled)
    const newPatients = activeData.filter(
        d => !processedPlanIds.has(d.plan_id)
    );

    const newPatientCount = new Set(
        newPatients.map(d => d.patient_id)
    ).size;

    return {
        totalPatients,
        patientsPerDiet,
        newPatientCount,
        newPatients
    };
};


export const filterUnprocessedItems = (itemDetail = [], processedPlanIds = new Set()) => {
    return itemDetail?.filter(item => !processedPlanIds.has(item.plan_id));
};

// not using 
export const getProcessedPlanIds = (batchDetail = []) => {
    const parsedBatch = batchDetail.map(item => ({
        ...item,
        plan_ids: item.plan_ids
            ? item.plan_ids.split(',').map(Number)
            : []
    }));

    return new Set(
        parsedBatch.flatMap(b => b.plan_ids)
    );
};


//not using
export const getProcessedPlanIdsByType = (batchDetail = []) => {
    const map = {};

    batchDetail?.forEach(batch => {
        const typeId = batch.type_id;

        if (!map[typeId]) {
            map[typeId] = new Set();
        }

        if (batch.plan_ids) {
            batch.plan_ids.split(',').forEach(id => {
                map[typeId].add(Number(id));
            });
        }
    });

    return map;
};


export const filterUnprocessedItemsByType = (
    items,
    scheduledPatient,
    selectedDietTimes
) => {
    if (!Array.isArray(items)) return [];

    // Create a Set for fast lookup
    const existingSet = new Set(
        (scheduledPatient || [])?.map(
            item => `${item.plan_id}_${item.type_id}`
        )
    );

    return items.filter(item => {

        //  1. Check selected types
        const selectedTypes = selectedDietTimes[item.diet_id] || [];
        if (!selectedTypes.includes(item.type_id)) return false;

        //  2. Check if already exists
        const key = `${item.plan_id}_${item.type_id}`;

        if (existingSet.has(key)) {
            return false; //  already scheduled
        }

        return true; //  allow insert
    });
};


/*#############################USE QUERY API CALL USED HERE ####################################*/



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


export const getAllItemMasterDetail = async () => {
    try {
        const result = await axioslogin.get('/fooditemmast/getall')
        const { success, data } = result.data
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error In Fetching Detail:", error?.message || error);
        return [];
    }
};




export const getFullDetailofItem = async () => {
    try {
        const result = await axioslogin.get('/fooditemmast/item-full-detail')
        const { success, data } = result.data
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error In Fetching Detail:", error?.message || error);
        return [];
    }
};

export const getFoodandBeverage = async () => {
    try {
        const result = await axioslogin.get('/fooditemmast/get-food-bev')
        const { success, data } = result.data
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }


        return [];
    } catch (error) {
        console.error("Error In Fetching Detail:", error?.message || error);
        return [];
    }
};

export const getAllDietTemplateFood = async (diet) => {
    try {
        const result = await axioslogin.post('/templatefood/getall', {
            template_id: diet
        });
        // Safe destructuring
        const success = result?.data?.success;
        const data = result?.data?.data;
        //  Always return array
        if (success === 2 && Array.isArray(data)) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error In Fetching Detail:", error?.message || error);
        return []; // NEVER undefined
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


export const getAllItemAlias = async () => {
    try {
        const result = await axioslogin.get('/itemalias/getall')
        const { success, data } = result.data
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error In Fetching Item Alias detail:", error?.message || error);
        return [];
    }
};



export const getAllDietician = async () => {
    try {
        const result = await axioslogin.get('/patientdietplan/getdietecian')
        const { success, data } = result.data
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error In Fetching Item Alias detail:", error?.message || error);
        return [];
    }
};

export const getAllProcessListDetail = async (processlistdate) => {
    try {
        //  Check if date exists
        if (!processlistdate) {
            warningNotify("Please select a valid date");
            return [];
        }
        // Ensure correct format (fallback handled inside)
        const formattedDate = getSafeFormattedDate(processlistdate);
        const result = await axioslogin.post('/patientdietplan/getprocesslist', {
            date: formattedDate
        });
        const { success, data } = result.data;
        if (success === 2 && Array.isArray(data)) {
            return data;
        }
        // Optional message from backend
        if (success === 1) {
            warningNotify("No data found for selected date");
        }
        return [];
    } catch (error) {
        console.error("Error In Fetching Process List:", error?.message || error);
        warningNotify("Something went wrong while fetching data");
        return [];
    }
};


export const getAllConsultationRequiured = async () => {
    try {

        const result = await axioslogin.get('/patientdietplan/get-consultation');
        const { success, data } = result.data;
        if (success === 2 && Array.isArray(data)) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error In Fetching Process List:", error?.message || error);
        warningNotify("Something went wrong while fetching data");
        return [];
    }
};

export const getAllProductionBatchDetail = async (processlistdate) => {
    try {
        //  Check if date exists
        if (!processlistdate) {
            warningNotify("Please select a valid date");
            return [];
        }
        // Ensure correct format (fallback handled inside)
        const formattedDate = getSafeFormattedDate(processlistdate, 'yyyy-MM-dd');
        const result = await axioslogin.post('/dietbatch/batch/getall', {
            date: formattedDate
        });
        const { success, data } = result.data;
        if (success === 2 && Array.isArray(data)) {
            return data;
        }
        // Optional message from backend
        if (success === 0) {
            warningNotify("No data found for selected date");
        }
        return [];
    } catch (error) {
        console.error("Error In Fetching Process List:", error?.message || error);
        warningNotify("Something went wrong while fetching data");
        return [];
    }
};


export const getAllBatchProductionItemDetail = async (processlistdate) => {
    try {
        //  Check if date exists
        if (!processlistdate) {
            warningNotify("Please select a valid date");
            return [];
        }
        // Ensure correct format (fallback handled inside)
        const formattedDate = getSafeFormattedDate(processlistdate, 'yyyy-MM-dd');
        const result = await axioslogin.post('/dietbatch/batch/item/getall', {
            date: formattedDate
        });
        const { success, data } = result.data;

        // Optional message from backend
        if (success === 0) {
            warningNotify("No data found for selected date");
        }

        if (success === 2 && Array.isArray(data)) {
            return data;
        }

        return [];
    } catch (error) {
        warningNotify("Something went wrong while fetching data");
        return [];
    }
};

export const getAllPatientDietPlan = async (nscode) => {
    if (!nscode) return warningNotify("Nursing Station Id Missing");
    try {
        const res = await axioslogin.post('/patientdietplan/getall', {
            ns_code: nscode
        });
        const { success, data } = res.data;
        if (success === 1) {
            return [];
        }
        if (success === 2) {
            return data || [];
        }
        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error In getting All Patient Diet Plan:", error?.message || error);
        return [];
    }
};

export const getLoggedStaffNsStation = async (empsecid) => {
    if (!empsecid) {
        console.warn("Error in Fetching Detail")
        return
    };
    try {
        const res = await axioslogin.post('/patientdietplan/get-emp-nsstation', {
            empsecid: Number(empsecid)
        });
        const { success, data } = res.data;
        if (success !== 2) {
            return [];
        }
        return data || [];
    } catch (error) {
        console.error("Error In getting All Patient Diet Plan:", error?.message || error);
        return [];
    }
};

export const getAllActivePatientDietDetail = async (date) => {
    if (!date) return warningNotify("Date is Missign Missing");
    try {
        const res = await axioslogin.post('/patientdietplan/fetchallactivepatient', {
            date: date
        });
        const { success, data } = res.data;
        if (success === 1) {
            return [];
        }
        if (success === 2) {
            return data || [];
        }
        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error In getting All Patient Diet Plan:", error?.message || error);
        return [];
    }
};

export const getAllDietFoodDetail = async (plan_id) => {
    if (!plan_id) return warningNotify("Plan Id is Missing");
    try {
        const res = await axioslogin.post('/patientdietplan/gettemplatefoodstatus', {
            plan_id: plan_id
        });
        const { success, data } = res.data;
        if (success === 1) {
            return [];
        }
        if (success === 2) {
            return data || [];
        }
        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error In getting All Patient Diet Plan:", error?.message || error);
        return [];
    }
};

export const getPatienPlanFoodDetail = async (plan_id) => {
    if (!plan_id) return warningNotify("Patient Id Missing");
    try {
        const res = await axioslogin.post('/dietschedule/schedule/processfood', {
            plan_id: plan_id
        });
        const { success, data } = res.data;

        if (success === 2) return data || [];

        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error In getting All Patient Diet Plan:", error?.message || error);
        return [];
    }
};


export const getPatientMealTypeDetail = async (date) => {
    if (!date) return warningNotify("Date is Missign Missing");
    try {
        const res = await axioslogin.post('/patientdietplan/ptmeal-type', {
            date: date
        });
        const { success, data } = res.data;
        if (success === 1) {
            return [];
        }
        if (success === 2) {
            return data || [];
        }
        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error In getting All Patient Diet Plan:", error?.message || error);
        return [];
    }
};


export const getAllPatientDietScheduled = async (date) => {
    if (!date) return warningNotify("Date is Missign Missing");
    try {
        const res = await axioslogin.post('/dietschedule/getall/schedule', {
            date: date
        });
        const { success, data } = res.data;
        if (success === 1) {
            return [];
        }
        if (success === 2) {
            return data || [];
        }
        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error In getting All Patient Diet Plan:", error?.message || error);
        return [];
    }
};


export const getPatientTemplateFoodDetail = async (plan_id, type_id, batch_id) => {
    if (!plan_id || !type_id || !batch_id) return warningNotify("Id is Missign!");
    try {
        const res = await axioslogin.post('/fooddietorder/new-patient-oreder', {
            plan_id: plan_id,
            type_id: type_id,
            batch_id: batch_id
        });
        const { success, data } = res.data;

        if (success === 1) {
            return data ?? [];
        }

        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error In getting All Patient Food Detail:", error?.message || error);
        return [];
    }
};

export const getAllCancelledFoodDetail = async (plan_id, type_id, batch_id) => {
    if (!plan_id || !type_id || !batch_id) return warningNotify("Id is Missign!");
    try {
        const res = await axioslogin.post('/fooddietorder/cancelled-patient-oreder', {
            plan_id: plan_id,
            type_id: type_id,
            batch_id: batch_id
        });
        const { success, data } = res.data;

        if (success === 1) {
            return data ?? [];
        }

        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error In getting All Patient Food Detail:", error?.message || error);
        return [];
    }
};

export const getAllOrderItemDetails = async (memoOrder) => {

    if (!memoOrder) return warningNotify("Order Id is Missings");
    try {
        const res = await axioslogin.post('/canteenorder/get', {
            canteen_order_id: memoOrder
        });
        const { success, data } = res.data;

        if (success === 1) {
            return data ?? [];
        }
        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error In Fetching Canteen Foods", error?.message || error);
        return [];
    }
};


export const getAllPatientExtraOrdres = async (admissionId, Status) => {

    if (!admissionId) return warningNotify("Admission Id is Missings");
    if (Status === "") return warningNotify("Order Status is Missing Id is Missings");
    try {
        const res = await axioslogin.post('/patientExtraOrder/get', {
            admission_id: admissionId,
            order_status: Status
        });
        const { success, data } = res.data;

        if (success === 1) {
            return data ?? [];
        }
        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error In Fetching Canteen Foods", error?.message || error);
        return [];
    }
};


export const getCurrentActivePatient = async (bdcode) => {

    if (!bdcode) return warningNotify("Bed Id is Missings");
    try {
        const res = await axioslogin.post('/canteenorder/getActivePatient', {
            bd_code: bdcode
        });
        const { success, data } = res.data;

        if (success === 1) {
            return data ?? [];
        }
        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error In Fetching Canteen Foods", error?.message || error);
        return [];
    }
};

export const getCustomerPreviousOrder = async (admission_Id, party_type_id) => {

    if (!admission_Id || !party_type_id) return warningNotify("Required Id is Missings");
    try {
        const res = await axioslogin.post('/canteenorder/canteenorders', {
            admission_Id: admission_Id,
            party_type_id: party_type_id
        });
        const { success, data } = res.data;

        if (success === 1) {
            return data ?? [];
        }
        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error In Fetching Canteen Foods", error?.message || error);
        return [];
    }
};


export const getCustomerExtraOrders = async (patient_id) => {

    if (!patient_id) return warningNotify("Patient  Id is Missings");
    try {
        const res = await axioslogin.post('/canteenorder/extar/canteenorders', {
            patient_id: patient_id
        });
        const { success, data } = res.data;

        if (success === 1) {
            return data ?? [];
        }
        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error In Fetching Canteen Foods", error?.message || error);
        return [];
    }
};


export const getItemFileDetails = async (item_id) => {

    if (!item_id) {
        warningNotify("Item Id is Missing");
        return [];
    }

    try {
        //  IMPORTANT: get blob (ZIP)
        const res = await axioslogin.get(
            `/fooditemmast/files/${item_id}`,
            { responseType: 'blob' }
        );

        const contentType = res.headers['content-type'] || '';

        // If backend returned JSON (no files case)
        if (contentType.includes('application/json')) {
            return [];
        }

        //  Unzip
        const zip = await JSZip.loadAsync(res.data);

        const validFiles = Object.entries(zip.files).filter(
            ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
        );

        //  Convert to usable format
        const filePromises = validFiles.map(async ([filename, fileObj]) => {

            const blobData = await fileObj.async('blob');

            let mimeType = 'application/octet-stream';
            if (filename.endsWith('.pdf')) mimeType = 'application/pdf';
            else if (filename.endsWith('.png')) mimeType = 'image/png';
            else if (/\.(jpg|jpeg)$/i.test(filename)) mimeType = 'image/jpeg';

            const blob = new Blob([blobData], { type: mimeType });
            const url = URL.createObjectURL(blob);

            return {
                name: filename,
                url,
                blob
            };
        });

        //  FINAL READY DATA
        return await Promise.all(filePromises);

    } catch (error) {
        console.error("Error fetching item files:", error);
        warningNotify("Error fetching files");
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


export const getAllAllegrenceMaster = async () => {
    try {
        const result = await axioslogin.get('/allergen/getall')
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



export const getAllBillingCategory = async () => {
    try {
        const result = await axioslogin.get('/billingcategory/getall')
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


export const ActivebedDetail = async () => {
    try {
        const res = await axioslogin.get('/canteenorder/allactivebed');
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




export const getAllItemGroupMaster = async () => {
    try {
        const res = await axioslogin.get('/itemgrp/getallgroupdtl');
        const { success, data, message } = res.data;

        if (success === 0) {
            console.error("Error fetching Item Groups:", message);
            return [];
        }

        if (success === 1) {
            // No results found
            return [];
        }

        if (success === 2) {
            // Data returned successfully
            return data || [];
        }

        // Fallback for any unexpected success code
        return [];
    } catch (error) {
        console.error("Error fetching Item Groups:", error);
        return [];
    }
};


export const getAllItemCatgoryMaster = async () => {
    try {
        const res = await axioslogin.get('/itemcategory/fetchalldata');
        const { success, data, message } = res.data;
        if (success === 0) {
            console.error("Error fetching Item Groups:", message);
            return [];
        }
        if (success === 1) {
            return [];
        }

        if (success === 2) {
            return data || [];
        }

        // Fallback for any unexpected success code
        return [];
    } catch (error) {
        console.error("Error fetching Item Groups:", error);
        return [];
    }
};

export const getAllItemCatgoryMasterById = async (id) => {
    if (!id) return warningNotify("Parent Id Missing")
    try {
        const res = await axioslogin.post('/itemcategory/fetchdatabyid', { item_group_id: id });
        const { success, data, message } = res.data;
        if (success === 0) {
            console.error("Error fetching Item Groups:", message);
            return [];
        }
        if (success === 1) {
            return [];
        }

        if (success === 2) {
            return data || [];
        }

        // Fallback for any unexpected success code
        return [];
    } catch (error) {
        console.error("Error fetching Item Groups:", error);
        return [];
    }
};

export const getAllOrderPartyType = async () => {
    try {
        const res = await axioslogin.get('/orderparty/getallordertype');
        const { success, data, message } = res.data;
        if (success === 0) {
            console.error("Error fetching Order Type:", message);
            return [];
        }
        if (success === 1) {
            return [];
        }

        if (success === 2) {
            return data || [];
        }

        // Fallback for any unexpected success code
        return [];
    } catch (error) {
        console.error("Error fetching Order Type:", error);
        return [];
    }
};

export const getAllPendingKotList = async () => {
    try {
        const res = await axioslogin.get('/productionbatch/getkotlist');
        const { success, data, message } = res.data;
        if (success === 0) {
            console.error("Error fetching Order Type:", message);
            return [];
        }
        if (success === 1) {
            return data || [];
        }

        // Fallback for any unexpected success code
        return [];
    } catch (error) {
        console.error("Error fetching Order Type:", error);
        return [];
    }
};

export const getAllDietSpeciality = async () => {
    try {
        const res = await axioslogin.get('/dietspeciality/getallordertype');
        const { success, data, message } = res.data;
        if (success === 0) {
            console.error("Error Fetching Diet Speciality:", message);
            return [];
        }
        if (success === 1) {
            return [];
        }

        if (success === 2) {
            return data || [];
        }

        // Fallback for any unexpected success code
        return [];
    } catch (error) {
        console.error("Error fetching Diet Speciality:", error);
        return [];
    }
};



export const getAllUnitMaster = async () => {
    try {
        const res = await axioslogin.get('/unitmaster/getall');
        const { success, data, message } = res.data;
        if (success === 0) {
            console.error("Error Fetching Diet Speciality:", message);
            return [];
        }
        if (success === 1) {
            return [];
        }

        if (success === 2) {
            return data || [];
        }

        // Fallback for any unexpected success code
        return [];
    } catch (error) {
        console.error("Error fetching Diet Speciality:", error);
        return [];
    }
};


export const getAllPateintDietMaster = async () => {
    try {
        const res = await axioslogin.get('/dietmaster/patient/getallpatientdiet');
        const { success, data, message } = res.data;
        if (success === 0) {
            console.error("Error Fetching Diet Speciality:", message);
            return [];
        }
        if (success === 1) {
            return [];
        }

        if (success === 2) {
            return data || [];
        }

        // Fallback for any unexpected success code
        return [];
    } catch (error) {
        console.error("Error fetching Diet Speciality:", error);
        return [];
    }
};


export const getCurrentAssignedFoodDetail = async () => {
    try {
        const res = await axioslogin.get('/dietdelivery/getcurrent');
        const { success, data, message } = res.data;
        if (success === 0) {
            console.error("Error Fetching Diet Speciality:", message);
            return [];
        }
        if (success === 1) {
            return data || [];
        }
        // Fallback for any unexpected success code
        return [];
    } catch (error) {
        console.error("Error fetching Diet Speciality:", error);
        return [];
    }
};

export const getAllItemType = async () => {
    try {
        const res = await axioslogin.get('/dietitemtype/getall');
        const { success, data, message } = res.data;
        if (success === 0) {
            console.error("Error Fetching Item Type", message);
            return [];
        }
        if (success === 1) {
            return [];
        }

        if (success === 2) {
            return data || [];
        }

        // Fallback for any unexpected success code
        return [];
    } catch (error) {
        console.error("Error fetching Diet Speciality:", error);
        return [];
    }
};

export const getAllDietPriceMaster = async (id) => {
    try {
        const res = await axioslogin.post('/dietprice/getall', {
            diet_id: id
        });
        const { success, data, message } = res.data;
        if (success === 0) {
            console.error("Error Fetching Item Type", message);
            return [];
        }
        if (success === 1) {
            return [];
        }

        if (success === 2) {
            return data || [];
        }

        // Fallback for any unexpected success code
        return [];
    } catch (error) {
        console.error("Error fetching Diet Speciality:", error);
        return [];
    }
};

export const getAllDietTemplate = async () => {
    try {
        const res = await axioslogin.get('/diettemplate/getall');
        const { success, data, message } = res.data;
        if (success === 0) {
            console.error("Error Fetching Diet Speciality:", message);
            return [];
        }
        if (success === 1) {
            return [];
        }

        if (success === 2) {
            return data || [];
        }

        // Fallback for any unexpected success code
        return [];
    } catch (error) {
        console.error("Error fetching Diet Speciality:", error);
        return [];
    }
};



export const getAllNsActivePatients = async (nscode) => {
    if (!nscode) return warningNotify("Nursing Station Id Missing");
    try {
        const res = await axioslogin.post('/patientdietplan/activepatient', {
            ns_code: nscode
        });
        const { success, data } = res.data;
        if (success === 1) {
            return [];
        }
        if (success === 2) {
            return data || [];
        }
        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error In getting All Patient Diet Plan:", error?.message || error);
        return [];
    }
};

export const getAllNursingStationPatients = async (nscode) => {
    if (!nscode) return warningNotify("Nursing Station Id Missing");
    try {
        const res = await axioslogin.post('/canteenorder/activepatient', {
            ns_code: nscode
        });
        const { success, data } = res.data;
        if (success === 1) {
            return data || [];
        }

        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error In getting All Patient Diet Plan:", error?.message || error);
        return [];
    }
};

export const getBatchItemDetail = async (selectedRows) => {
    if (!selectedRows || selectedRows?.length === 0) return;
    try {
        const res = await axioslogin.post('/canteenorder/getbatchitemdetail', {
            canteenIds: selectedRows
        });
        const { success, data } = res.data;
        if (success === 1) {
            return data || [];
        }
        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error In getting All Patient Diet Plan:", error?.message || error);
        return [];
    }
};

export const getProductionMaping = async () => {
    try {
        const res = await axioslogin.get('/productionbatch/getprodutionmaping',);
        const { success, data } = res.data;
        if (success === 1) {
            return data || [];
        }
        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error In getting All Patient Diet Plan:", error?.message || error);
        return [];
    }
};

export const getAllCanteenOrderStatus = async () => {
    try {
        const res = await axioslogin.get('/productionbatch/getallorderstatus',);
        const { success, data } = res.data;
        if (success === 1) {
            return data || [];
        }
        // fallback for any other success code
        return [];
    } catch (error) {
        console.error("Error In getting All Patient Diet Plan:", error?.message || error);
        return [];
    }
};

export const getAllCanteenOrders = async (status) => {
    try {
        const res = await axioslogin.post('/canteenorder/list', {
            status
        });
        // check response exists
        if (!res || !res.data) {
            console.error("Invalid API response");
            return [];
        }
        const { success, data, message } = res.data;
        //  backend error
        if (success === 0) {
            console.error("API Error:", message);
            return [];
        }
        //  no data case
        if (success === 1) {
            return [];
        }
        if (success === 2) {
            return Array.isArray(data) ? data : [];
        }
        //  unknown success code
        console.warn("Unknown success code:", success);
        return [];

    } catch (error) {
        console.error("Unexpected Error:", error.message);
        return [];
    }
};





export const getAllItemFileDetails = async () => {

    try {

        const res = await axioslogin.get(
            `/fooditemmast/allfiles`,
            { responseType: 'blob' }
        );

        const contentType = res.headers['content-type'] || '';

        if (contentType.includes('application/json')) {
            return [];
        }

        const zip = await JSZip.loadAsync(res.data);

        const files = Object.entries(zip.files).filter(
            ([filename, file]) =>
                !file.dir && /\.(jpe?g|png|gif|pdf)$/i.test(filename)
        );

        const filePromises = files.map(async ([filename, fileObj]) => {

            const blobData = await fileObj.async('blob');

            let mimeType = 'application/octet-stream';

            if (filename.endsWith('.pdf')) {
                mimeType = 'application/pdf';
            } else if (filename.endsWith('.png')) {
                mimeType = 'image/png';
            } else if (/\.(jpg|jpeg)$/i.test(filename)) {
                mimeType = 'image/jpeg';
            }

            const blob = new Blob([blobData], { type: mimeType });

            const url = URL.createObjectURL(blob);


            const [item_id, file_name] = filename.split("/");

            return {
                item_id,        //  folder name
                name: file_name,
                url,
                blob,
                fullPath: filename // includes folder structure
            };
        });

        return await Promise.all(filePromises);

    } catch (error) {
        console.error("Error fetching all item files:", error);
        warningNotify("Error fetching all files");
        return [];
    }
};



export const getAllHighlightTypes = async () => {
    try {
        const result = await axioslogin.get(
            '/highlight/highlight-type'
        );
        const { success, data } = result.data;
        if (success === 1) {
            return data || [];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error Fetching Highlight Types:", error);
        warningNotify("Error Fetching Highlight Types");
        return [];
    }
};


export const getAllHighlightMappings = async () => {
    try {
        const result = await axioslogin.get(
            '/highlightmaping/item-highlight'
        );
        const { success, data } = result.data;
        if (success === 1) {
            return data || [];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error Fetching Highlight Mapping:", error);
        warningNotify("Error Fetching Highlight Mapping");
        return [];
    }
};