import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify } from 'src/views/Common/CommonCode';

export const MonthlyReportView = async (searchDatas, qitype, setviewData, setsearchFlag) => {
    const getEndoscopyData = async (searchDatas) => {
        const result = await axioslogin.post('/qiendoscopy/view', searchDatas);
        return result.data
    }
    const getEmergencyData = async (searchDatas) => {
        const result = await axioslogin.post('/qiemergency/viewList', searchDatas);
        return result.data
    }
    if (qitype === 1) {
        getEndoscopyData(searchDatas).then((val) => {
            const { success, data, message } = val
            if (success === 1) {
                setviewData(data)
                setsearchFlag(1)
            }
            else if (success === 2) {
                infoNotify(message)
                setsearchFlag(0)
            }
        })
    }
    else if (qitype === 2) {
        getEmergencyData(searchDatas).then((val) => {
            const { success, data, message } = val
            if (success === 1) {
                setviewData(data)
                setsearchFlag(1)
                // if (reportSelect === 2) {
                //     setReturnflag(1)
                // } else {
                //     setReturnflag(0)
                // }
            }
            else if (success === 2) {
                infoNotify(message)
                setsearchFlag(0)
            }

        })
    }
}
