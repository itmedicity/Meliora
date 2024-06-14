import { axioslogin } from "src/views/Axios/Axios";


export const QiMarkedPatientsList = async (viewdata, qitype, setqiMarkedList, setqiFlag) => {
    const getEndoscopyPatients = async (viewdata) => {
        const result = await axioslogin.post('/qiendoscopy/view', viewdata)
        return result.data
    }
    if (qitype === 1) {
        getEndoscopyPatients(viewdata).then((val) => {
            const { success, data } = val
            if (success === 1) {
                setqiMarkedList(data)
                setqiFlag(1)
            }
            else {
                setqiFlag(0)
            }
        })
    }
    else if (qitype === 2) {

    }
}