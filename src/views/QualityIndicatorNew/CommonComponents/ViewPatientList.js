
import { axioslogin } from "src/views/Axios/Axios";

export const ViewPatientsListAll = async (viewdata, qitype, setpatientlist) => {
    const getEndoscopyData = async (viewdata) => {
        const result = await axioslogin.post('/qiendoscopy/viewList', viewdata);
        return result.data
    }
    const getEmergencyData = async (viewdata) => {
        const result = await axioslogin.post('/qiemergency/viewList', viewdata);
        return result.data
    }
    const getDialysisData = async (viewdata) => {
        const result = await axioslogin.post('/qidialysis/viewList', viewdata);
        return result.data
    }
    if (qitype === 1) {
        getEndoscopyData(viewdata).then((val) => {
            const { success, data } = val
            if (success === 1) {
                setpatientlist(data)
            }
        })
    }
    else if (qitype === 2) {
        getEmergencyData(viewdata).then((val) => {
            const { success, data } = val
            if (success === 1) {
                setpatientlist(data)
            }

        })
    }
    else if (qitype === 3) {
        getDialysisData(viewdata).then((val) => {
            const { success, data } = val
            if (success === 1) {
                setpatientlist(data)
            }

        })
    }
}