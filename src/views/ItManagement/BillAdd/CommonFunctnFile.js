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
                getMonthlyBillDataOtherTarr(searchYear).then((valuee) => {
                    const { data } = valuee
                    const otherListYear = [...resultListYear, ...data]
                    resultListYear = otherListYear
                    setYearData(resultListYear)
                })
            })
        })
    })
}

export const gettingArrayListFirstYear = async (firstyearBillSearch, setfirstYear) => {

    const getMonthlyBillDatatMonthTarr = async (firstyearBillSearch) => {
        const result = await axioslogin.post('/ItBillVieww/getMonthlyTariffYear', firstyearBillSearch);
        return result.data
    }
    const getMonthlyBillDataQuarterTarr = async () => {
        const result = await axioslogin.post('/ItBillVieww/getQuarterlyTariffYear', firstyearBillSearch);
        return result.data
    }
    const getMonthlyBillDataYearrTarr = async () => {
        const result = await axioslogin.post('/ItBillVieww/getYearlyTariffYear', firstyearBillSearch);
        return result.data
    }
    const getMonthlyBillDataOtherrTarr = async () => {
        const result = await axioslogin.post('/ItBillVieww/getOtherTariffYear', firstyearBillSearch);
        return result.data
    }
    var resultListFirstYear = []
    getMonthlyBillDatatMonthTarr(firstyearBillSearch).then((val) => {
        const { data } = val
        resultListFirstYear = [...resultListFirstYear, ...data]
        getMonthlyBillDataQuarterTarr(firstyearBillSearch).then((value) => {
            const { data } = value
            const quaterListFirstYear = [...resultListFirstYear, ...data]
            resultListFirstYear = quaterListFirstYear
            getMonthlyBillDataYearrTarr(firstyearBillSearch).then((valu) => {
                const { data } = valu
                const yearListfirstYear = [...resultListFirstYear, ...data]
                resultListFirstYear = yearListfirstYear
                getMonthlyBillDataOtherrTarr(firstyearBillSearch).then((valu) => {
                    const { data } = valu
                    const otherListFirstYear = [...resultListFirstYear, ...data]
                    resultListFirstYear = otherListFirstYear
                    setfirstYear(resultListFirstYear)
                })
            })
        })
    })
}

export const gettingArrayListSecondYear = async (secondyearBillSearch, setsecondYear) => {
    const getMonthlyBillDatatMonthlyTarr = async (secondyearBillSearch) => {
        const result = await axioslogin.post('/ItBillVieww/getMonthlyTariffYear', secondyearBillSearch);
        return result.data
    }
    const getMonthlyBillDataQuarterlyTarr = async () => {
        const result = await axioslogin.post('/ItBillVieww/getQuarterlyTariffYear', secondyearBillSearch);
        return result.data
    }
    const getMonthlyBillDataYearlyTarr = async () => {
        const result = await axioslogin.post('/ItBillVieww/getYearlyTariffYear', secondyearBillSearch);
        return result.data
    }
    const getMonthlyBillDataOtherlyTarr = async () => {
        const result = await axioslogin.post('/ItBillVieww/getOtherTariffYear', secondyearBillSearch);
        return result.data
    }
    var resultListSecondYear = []
    getMonthlyBillDatatMonthlyTarr(secondyearBillSearch).then((val) => {
        const { data } = val
        resultListSecondYear = [...resultListSecondYear, ...data]
        getMonthlyBillDataQuarterlyTarr(secondyearBillSearch).then((value) => {
            const { data } = value
            const quaterListSecondYear = [...resultListSecondYear, ...data]
            resultListSecondYear = quaterListSecondYear
            getMonthlyBillDataYearlyTarr(secondyearBillSearch).then((valu) => {
                const { data } = valu
                const yearListSecondYear = [...resultListSecondYear, ...data]
                resultListSecondYear = yearListSecondYear
                getMonthlyBillDataOtherlyTarr(secondyearBillSearch).then((valu) => {
                    const { data } = valu
                    const otherListSecondYear = [...resultListSecondYear, ...data]
                    resultListSecondYear = otherListSecondYear
                    setsecondYear(resultListSecondYear)

                })
            })
        })
    })

}