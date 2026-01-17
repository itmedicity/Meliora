import { format } from "date-fns";
import { axioslogin } from "src/views/Axios/Axios";


export const getCRFDetails = async () => {
    try {
        const res = await axioslogin.get('/workOrder/getCRFDatas')
        const { success, data } = res.data

        if (success === 2) {
            return data?.map((val) => ({
                req_date: val.req_date
                    ? format(new Date(val.req_date), 'dd-MM-yyyy')
                    : '',
                request_deptsec_slno: val.request_deptsec_slno,
                expected_date: val.expected_date
                    ? format(new Date(val.expected_date), 'dd-MM-yyyy')
                    : '',
                req_slno: val.req_slno,
                work_order_status: val.work_order_status,
                company_slno: val.company_slno,
                sec_name: val.sec_name
                    ? val.sec_name.charAt(0).toUpperCase() + val.sec_name.slice(1).toLowerCase()
                    : "",
                company_name: val.company_name,
                crfNo: `CRF/${val.company_name}/${val.req_slno}` // ✅ searchable string
            }))
        }

        return []
    } catch (error) {
        console.error('CRF fetch error:', error)
        return []
    }
}


// export const getCRFDetails = async () => {
//     return axioslogin.get('/workOrder/getCRFDatas').then(res => {
//         const { success, data } = res.data;
//         if (success === 2) {
//             const datass = data?.map((val) => {
//                 return {
//                     req_date: format(new Date(val.req_date), 'dd-MM-yyyy'),
//                     request_deptsec_slno: val.request_deptsec_slno,
//                     expected_date: format(new Date(val.expected_date), 'dd-MM-yyyy'),
//                     req_slno: val.req_slno,
//                     work_order_status: val.work_order_status,
//                     company_slno: val.company_slno,
//                     sec_name: val.sec_name,
//                     company_name: val.company_name,
//                     crfNo: `CRF/${val.company_name}/${val.req_slno}`
//                 }
//             })
//             return datass
//         } else {
//             return [];
//         }
//     });
// };
