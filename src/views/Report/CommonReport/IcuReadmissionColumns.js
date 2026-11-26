import moment from 'moment'

export const columns = [
    { key: "SLNO", label: "Sl No", width: 65, align: "center", group: "general", tooltipMl: "ക്രമ നമ്പർ" },
    { key: "IP_NO", label: "IP No", width: 120, align: "center", group: "general", tooltipMl: "ഇൻപേഷ്യന്റ് അഡ്മിഷൻ നമ്പർ (Inpatient Admission No)" },
    { key: "PT_NO", label: "Patient / OP No", width: 130, align: "center", group: "general", tooltipMl: "രോഗിയുടെ ആശുപത്രി നമ്പർ (Patient UHID / OP No)" },
    { key: "PTC_PTNAME", label: "Patient Name", width: 220, align: "left", group: "general", tooltipMl: "രോഗിയുടെ പേര് (Patient Name)" },
    { key: "DPC_DESC", label: "Department", width: 200, align: "left", group: "general", tooltipMl: "ചികിത്സാ വിഭാഗം (Department)" },
    { key: "DOC_NAME", label: "Doctor Name", width: 220, align: "left", group: "general", tooltipMl: "കൺസൾട്ടന്റ് ഡോക്ടറുടെ പേര് (Consultant Doctor Name)" },
    { key: "NSC_DESC", label: "Nurse Station / ICU", width: 190, align: "left", group: "general", tooltipMl: "നഴ്സ് സ്റ്റേഷൻ / ഐസിയു വാർഡ് (Nurse Station / ICU)" },
    { key: "BDC_NO", label: "Bed No", width: 100, align: "center", group: "general", tooltipMl: "ഐസിയു ബെഡ് നമ്പർ (ICU Bed No)" },
    { key: "ICU_ALLOCAT_TIME", label: "ICU Admission Time", width: 180, align: "center", group: "timestamp", tooltipMl: "ആദ്യം ഐസിയുവിൽ പ്രവേശിപ്പിച്ച സമയം (Initial ICU Occupancy Time)" },
    { key: "ICU_RELEASE_TIME", label: "ICU Transfer Out Time", width: 180, align: "center", group: "timestamp", tooltipMl: "ഐസിയുവിൽ നിന്ന് മാറ്റിയ സമയം (ICU Discharge / Release Time)" },
    { key: "READMIT_TIME", label: "ICU Readmission Time", width: 180, align: "center", group: "timestamp", tooltipMl: "വീണ്ടും ഐസിയുവിൽ പ്രവേശിപ്പിച്ച സമയം (Next ICU Readmission Time)" },
    { key: "HOURS_TO_READMIT", label: "Hours to Readmit", width: 160, align: "center", group: "tat", tooltipMl: "റീഅഡ്മിഷന് എടുത്ത സമയം മണിക്കൂറിൽ (Hours taken to readmit)" },
    { key: "READMIT_CATEGORY", label: "Readmission Window", width: 170, align: "center", group: "status", tooltipMl: "24 മണിക്കൂറിനകമോ 48 മണിക്കൂറിനകമോ ഉള്ള റീഅഡ്മിഷൻ" },
]

export const formatCellValue = (val, isTat) => {
    if (val === null || val === undefined || val === '') return '-'
    if (isTat && (val === '::' || String(val).trim() === '::')) return '-'
    return String(val)
}

// Helper to compute duration details from timestamps and hours value
export const computeReadmitDuration = (releaseTimeStr, readmitTimeStr, rawHours) => {
    let diffHours = null
    let diffMinutes = null

    if (releaseTimeStr && readmitTimeStr && releaseTimeStr !== '-' && readmitTimeStr !== '-') {
        const release = moment(releaseTimeStr, ['DD/MM/YYYY HH:mm', 'DD/MM/YYYY HH:mm:ss'])
        const readmit = moment(readmitTimeStr, ['DD/MM/YYYY HH:mm', 'DD/MM/YYYY HH:mm:ss'])
        if (release.isValid() && readmit.isValid()) {
            diffMinutes = readmit.diff(release, 'minutes')
            if (diffMinutes >= 0) {
                diffHours = Number((diffMinutes / 60).toFixed(2))
            }
        }
    }

    if (diffHours === null && rawHours !== null && rawHours !== undefined && !isNaN(rawHours)) {
        diffHours = Number(Number(rawHours).toFixed(2))
        diffMinutes = Math.round(diffHours * 60)
    }

    if (diffHours === null) {
        return {
            hours: null,
            displayString: '-',
            formattedHHMM: '-',
            minutes: null,
            category: '-'
        }
    }

    const wholeHours = Math.floor(diffHours)
    const mins = diffMinutes !== null ? diffMinutes % 60 : Math.round((diffHours % 1) * 60)
    const displayString = `${wholeHours}h ${mins}m (${diffHours} hrs)`
    const formattedHHMM = `${String(wholeHours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
    const category = diffHours <= 24 ? '≤ 24 Hours' : '24 - 48 Hours'

    return {
        hours: diffHours,
        displayString,
        formattedHHMM,
        minutes: diffMinutes,
        category
    }
}

// Calculate summary stats for ICU Readmissions within 48 hours
export const calculateIcuReadmissionStats = (records) => {
    if (!records || !Array.isArray(records) || records.length === 0) {
        return {
            hasData: false,
            count: 0,
            avgHours: 0,
            formattedAvgHours: '-',
            displayString: '-',
            minHours: 0,
            maxHours: 0,
            within24Count: 0,
            within24Pct: 0,
            between24And48Count: 0,
            between24And48Pct: 0,
            level: 'neutral'
        }
    }

    let totalHours = 0
    let validCount = 0
    let minHours = Infinity
    let maxHours = -Infinity
    let within24Count = 0
    let between24And48Count = 0

    records.forEach(row => {
        const hrs = row.HOURS_TO_READMIT_NUM
        if (hrs !== null && hrs !== undefined && !isNaN(hrs) && hrs >= 0) {
            totalHours += hrs
            validCount++
            if (hrs < minHours) minHours = hrs
            if (hrs > maxHours) maxHours = hrs
            if (hrs <= 24) {
                within24Count++
            } else {
                between24And48Count++
            }
        }
    })

    if (validCount === 0) {
        return {
            hasData: false,
            count: 0,
            avgHours: 0,
            formattedAvgHours: '-',
            displayString: '-',
            minHours: 0,
            maxHours: 0,
            within24Count: 0,
            within24Pct: 0,
            between24And48Count: 0,
            between24And48Pct: 0,
            level: 'neutral'
        }
    }

    const avgHours = Number((totalHours / validCount).toFixed(2))
    const avgWholeHours = Math.floor(avgHours)
    const avgRemainingMins = Math.round((avgHours % 1) * 60)
    const displayString = `${avgWholeHours}h ${avgRemainingMins}m`
    const formattedAvgHours = `${avgHours} hrs`

    const within24Pct = Math.round((within24Count / validCount) * 100)
    const between24And48Pct = Math.round((between24And48Count / validCount) * 100)

    // Higher count within 24 hours is more critical (danger), otherwise warning
    const level = within24Count > 0 ? 'danger' : 'warning'

    return {
        hasData: true,
        count: validCount,
        avgHours,
        formattedAvgHours,
        displayString,
        minHours: minHours === Infinity ? 0 : Number(minHours.toFixed(2)),
        maxHours: maxHours === -Infinity ? 0 : Number(maxHours.toFixed(2)),
        within24Count,
        within24Pct,
        between24And48Count,
        between24And48Pct,
        level
    }
}
