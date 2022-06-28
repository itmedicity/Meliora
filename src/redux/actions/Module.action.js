import { axioslogin } from "src/views/Axios/Axios"


export const getmodule = () => async (dispatch) => {
    const result = await axioslogin.get('/modulemaster')
    const { success, data } = result.data
    console.log(data);
}