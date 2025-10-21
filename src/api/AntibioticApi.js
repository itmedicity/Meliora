import { axiosellider, axioslogin } from "src/views/Axios/Axios"


    export const getAntibioticPatientDetailz = async () => {
        return axioslogin.get(`/amsAntibiotic/getAntibioticPatientDetails`).then((res) => {
            const { success, data } = res.data           
            if (success === 2) {
                return data
            }
            else{
                 return []
            }
        })
    }
    export const getPatientMicrobiologyResult = async (mrd_no) => {        
        return axiosellider.get(`/amsAntibiotic/getMicrobiologyTest/${mrd_no}`).then((res) => {
            const { success, data } = res.data 
               if (success === 1) {
                return data
            }
            else{
                 return []
            }
        })
    }
    
    export const getPatientAllAntibioticList = async (PostData) => {  
            return axioslogin.post("/amsAntibiotic/getPatientAntibioticList",PostData).then((res) => {
            const { success, data } = res.data   
             if (success === 2) {
                return data
            }
            else{
                 return []
            }
        })
    }


        export const getRestrictedAntibiotics = async () => {
        return axioslogin.get(`/amsAntibiotic/getRestrictedAntibiotics`).then((res) => {
            const { success, data } = res.data           
            if (success === 2) {
                return data
            }
            else{
                 return []
            }
        })
    }


    export const getAllAntibioticCount= async (searchallAntibiotic) => {
    return axioslogin.post('/amsAntibiotic/getAllAntibioticCount', searchallAntibiotic).then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}


    export const getRestrictedAntibioticCount= async (searchRestrictedAntibiotic) => {
    return axioslogin.post('/amsAntibiotic/getRestrictedAntibioticCount', searchRestrictedAntibiotic).then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}

    export const getTotUnRestrictedAntibioticCount= async (searchResAndUnresAntibiotic) => {               
    return axioslogin.post('/amsAntibiotic/getTotUnRestrictedAntibioticCount', searchResAndUnresAntibiotic).then((res) => {
        const { success, data } = res.data        
        if (success === 2) {
            return data
        }
    })
    
}

    export const getTotRestrictedAntibioticCount= async (searchResAndUnresAntibiotic) => {
    return axioslogin.post('/amsAntibiotic/getTotRestrictedAntibioticCount', searchResAndUnresAntibiotic).then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}
    

    export const getTotAntibioticToday= async (todayRange) => {
    return axioslogin.post('/amsAntibiotic/getTotAntibiotics', todayRange).then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}

        export const getTotAntibioticWeek= async (weekRange) => {
    return axioslogin.post('/amsAntibiotic/getTotAntibiotics', weekRange).then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}
        export const getTotAntibioticMonth= async (monthRange) => {
    return axioslogin.post('/amsAntibiotic/getTotAntibiotics', monthRange).then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}
        export const getTotAntibioticYear= async (yearRange) => {
    return axioslogin.post('/amsAntibiotic/getTotAntibiotics', yearRange).then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}