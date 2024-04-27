import { axioslogin } from "src/views/Axios/Axios";


export const gettingArrayList = async (monthBillSearch, setmonthINyearData) => {

    const getMonthlyBillAmountMoTarr = async (monthBillSearch) => {
        const result = await axioslogin.post('/ItBillVieww/getMonthlyTariffBillAmount', monthBillSearch);
        return result.data
    }
    const getMonthlyBillAmountQuaTarr = async () => {
        const result = await axioslogin.post('/ItBillVieww/getQuarterlyTariffBillAmount', monthBillSearch);
        return result.data
    }
    const getMonthlyBillAmountYearTarr = async () => {
        const result = await axioslogin.post('/ItBillVieww/getYearlyTariffBillAmount', monthBillSearch);
        return result.data
    }
    const getMonthlyBillAmountOtherTarr = async () => {
        const result = await axioslogin.post('/ItBillVieww/getOtherTariffBillAmount', monthBillSearch);
        return result.data
    }

    var resultList = []
    getMonthlyBillAmountMoTarr(monthBillSearch).then((val) => {
        const { data } = val
        resultList = [...resultList, ...data]
        getMonthlyBillAmountQuaTarr(monthBillSearch).then((value) => {
            const { data } = value
            const quaterList = [...resultList, ...data]
            resultList = quaterList
            getMonthlyBillAmountYearTarr(monthBillSearch).then((valu) => {
                const { data } = valu
                const yearList = [...resultList, ...data]
                resultList = yearList
                getMonthlyBillAmountOtherTarr(monthBillSearch).then((valuee) => {
                    const { data } = valuee
                    const otherList = [...resultList, ...data]
                    resultList = otherList
                    setmonthINyearData(resultList)

                })
            })
        })
    })
}

export const gettingArrayListYearly = async (searchYear, setYearData) => {

    const getMonthlyBillDatatMoTarr = async (searchYear) => {
        const result = await axioslogin.post('/ItBillVieww/getMonthlyTariffYear', searchYear);
        return result.data
    }
    const getMonthlyBillDataQuaTarr = async () => {
        const result = await axioslogin.post('/ItBillVieww/getQuarterlyTariffYear', searchYear);
        return result.data
    }
    const getMonthlyBillDataYearTarr = async () => {
        const result = await axioslogin.post('/ItBillVieww/getYearlyTariffYear', searchYear);
        return result.data
    }
    const getMonthlyBillDataOtherTarr = async () => {
        const result = await axioslogin.post('/ItBillVieww/getOtherTariffYear', searchYear);
        return result.data
    }

    var resultListYear = []
    getMonthlyBillDatatMoTarr(searchYear).then((val) => {
        const { data } = val
        resultListYear = [...resultListYear, ...data]
        getMonthlyBillDataQuaTarr(searchYear).then((value) => {
            const { data } = value
            const quaterListYear = [...resultListYear, ...data]
            resultListYear = quaterListYear
            getMonthlyBillDataYearTarr(searchYear).then((valu) => {
                const { data } = valu
                const yearListYear = [...resultListYear, ...data]
                resultListYear = yearListYear
                getMonthlyBillDataOtherTarr(searchYear).then((valu) => {
                    const { data } = valu
                    const otherListYear = [...resultListYear, ...data]
                    resultListYear = otherListYear
                    setYearData(resultListYear)

                })
            })
        })
    })

}