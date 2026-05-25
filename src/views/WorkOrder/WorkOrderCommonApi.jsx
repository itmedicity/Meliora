import { format } from "date-fns";
import { axioslogin } from "../Axios/Axios"


// export const getWorkOrderData = async (level_no) => {
//     try {
//         const res = await axioslogin.get('/workOrder/getWorkOrderDetails', {
//             params: { level_no },
//         });
//         const { success, data } = res.data;

//         return success === 1 && Array.isArray(data) && data.length > 0
//             ? data
//             : [];
//     } catch (error) {
//         console.error('Error fetching work order data:', error);
//         return [];
//     }
// };

export const getWorkOrderData = async (level_no) => {
    try {
        const res = await axioslogin.get('/workOrder/getWorkOrderDetails', {
            params: { level_no },
        });

        const { success, data } = res.data;

        return success === 1 && Array.isArray(data) && data.length > 0
            ? data.map((val) => ({
                bom_regno: val.bom_regno,
                bom_req_date: val.bom_req_date,
                create_date: val.create_date,
                create_user: val.create_user,
                edit_date: val.edit_date,
                edit_user: val.edit_user,
                // it_supplier_name: val.it_supplier_name,
                it_supplier_name: val.it_supplier_name
                    ? val.it_supplier_name.charAt(0).toUpperCase() + val.it_supplier_name.slice(1).toLowerCase()
                    : '',
                req_dept: val.req_dept,
                sec_name: val.sec_name,
                slno: val.slno,
                vendor_desc: val.vendor_desc,
                vendor_slno: val.vendor_slno,
                wo_current_level: val.wo_current_level,
                wo_current_level_review_status: val.wo_current_level_review_status,
                wo_date: format(new Date(val.wo_date), "yyyy-MM-dd"),
                wo_fromdate: val.wo_fromdate,
                wo_number: val.wo_number,
                wo_slno: val.wo_slno,
                wo_todate: val.wo_todate,
                wo_type: val.wo_type === 1 ? "Annual Maintanance Contract" : val.wo_type === 2 ? "Comprehensive Maintanance Contract" : val.wo_type === 3 ? "Rate Contract" : "-"
            }))
            : [];

    } catch (error) {
        console.error('Error fetching work order data:', error);
        return [];
    }
};


export const getmaterialDetails = async (wo_slno) => {
    try {
        const res = await axioslogin.get(`/workOrder/getmaterialData/${wo_slno}`);
        const { success, data } = res.data;

        return success === 1 && Array.isArray(data) && data.length > 0
            ? data
            : [];
    } catch (error) {
        console.error('Error fetching material details:', error);
        return [];
    }
};

export const getLastWOnumber = async () => {
    const result = await axioslogin.get(`/workOrder/getLastWoNumber`);
    const { success, data } = result.data;
    if (!success === 1 && Array.isArray(data) && data.length > 0) return [];
    return data

}

export const getApprovedWo = async (empid) => {
    try {
        const res = await axioslogin.get('/workOrder/getApprovedWo', {
            params: { empid },
        });

        const { success, data } = res.data;

        if (success === 1 && Array.isArray(data) && data.length > 0) {
            return data.map((val) => ({
                // em_name: val.em_name,
                em_name: val.em_name
                    ? val.em_name.charAt(0).toUpperCase() + val.em_name.slice(1).toLowerCase()
                    : '',
                // it_supplier_name: val.it_supplier_name,
                it_supplier_name: val.it_supplier_name
                    ? val.it_supplier_name.charAt(0).toUpperCase() + val.it_supplier_name.slice(1).toLowerCase()
                    : '',
                slno: val.slno,
                vendor_slno: val.vendor_slno,
                wo_appproval_level_no: val.wo_appproval_level_no,
                wo_approval_date: val.wo_approval_date,
                wo_approval_level_name: val.wo_approval_level_name,
                wo_approval_remark: val.wo_approval_remark,
                wo_approval_user: val.wo_approval_user,
                wo_level_review_state: val.wo_level_review_state,
                wo_no: val.wo_no,
                bom_regno: val.bom_regno,
                company_name: val.company_name,
                company_slno: val.company_slno,
                approval_date: format(
                    new Date(val.wo_approval_date),
                    'dd-MM-yyyy'
                ),
                wo_fromdate: val.wo_fromdate,
                wo_todate: val.wo_todate,
                req_dept: val.req_dept,
                sec_name: val.sec_name,
                crfdata: `CRF/${val.company_name ?? '-'} / ${val.bom_regno ?? '-'}`
            }));
        }

        return [];
    } catch (error) {
        console.error('Error fetching approved work orders:', error);
        return [];
    }
};


export const getCrfItem = async (req_slno) => {
    try {
        const res = await axioslogin.get(`/workOrder/getCrfItem/${req_slno}`);
        const { success, data } = res.data;

        return success === 1 && Array.isArray(data) && data.length > 0
            ? data
            : [];
    } catch (error) {
        console.error('Error fetching CRF items:', error);
        return [];
    }
};

