import { axioslogin } from 'src/views/Axios/Axios'

export const getFloorData = async () => {
    return axioslogin.get('/roomnewcreation/view').then(res => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}

export const getSubFloorData = async () => {
    return axioslogin.get('subRoomMaster/view').then(res => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}
