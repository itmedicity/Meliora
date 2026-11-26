import moment from 'moment'

export const columns = [
    { key: "SLNO", label: "Sl No", width: 65, align: "center", group: "general", tooltipMl: "ക്രമ നമ്പർ" },
    { key: "PTNO", label: "Patient / OP No", width: 140, align: "center", group: "general", tooltipMl: "രോഗിയുടെ ഒപി നമ്പർ (Patient OP No)" },
    { key: "PATIENT_NAME", label: "Patient Name", width: 220, align: "left", group: "general", tooltipMl: "രോഗിയുടെ പേര് (Patient Name)" },
    { key: "SPECIALITY_NAME", label: "Department / Speciality", width: 200, align: "left", group: "general", tooltipMl: "ചികിത്സാ വിഭാഗം (Speciality / Department)" },
    { key: "DOCTOR", label: "Doctor Name", width: 220, align: "left", group: "general", tooltipMl: "ചികിത്സിക്കുന്ന ഡോക്ടറുടെ പേര് (Doctor Name)" },
    { key: "VISITDATE", label: "Visit Date & Time", width: 180, align: "center", group: "timestamp", tooltipMl: "ഒപി രജിസ്ട്രേഷൻ / വിസിറ്റ് സമയം" },
    { key: "CONSULTSTART_TIME", label: "Consultation Start Time", width: 190, align: "center", group: "timestamp", tooltipMl: "ഡോക്ടർ പരിശോധന ആരംഭിച്ച സമയം" },
    { key: "WAITING_TIME", label: "Waiting Time (HH:mm:ss)", width: 190, align: "center", group: "tat", tooltipMl: "വിസിറ്റ് മുതൽ കൺസൾട്ടേഷൻ ആരംഭം വരെയുള്ള സമയം" },
    { key: "WAITING_MINUTES", label: "Waiting Time (Mins)", width: 160, align: "center", group: "tat", tooltipMl: "ആകെ കാത്തിരിപ്പ് സമയം മിനിറ്റിൽ" },
]

export const formatCellValue = (val, isTat) => {
    if (val === null || val === undefined || val === '') return '-'
    if (isTat && (val === '::' || String(val).trim() === '::')) return '-'
    return String(val)
}

// Calculate the average waiting time taken by patients to see the doctor
export const calculateAverageWaitingTime = (records) => {
    if (!records || !Array.isArray(records) || records.length === 0) {
        return {
            hasData: false,
            count: 0,
            avgMinutes: 0,
            avgSeconds: 0,
            formattedHHMMSS: '-',
            displayString: '-',
            level: 'neutral'
        }
    }

    let totalSeconds = 0
    let validCount = 0

    records.forEach(row => {
        const vDate = row.VISITDATE
        const cStart = row.CONSULTSTART_TIME

        let seconds = null
        if (vDate && cStart && vDate !== '-' && cStart !== '-') {
            const start = moment(vDate, 'DD/MM/YYYY HH:mm:ss')
            const end = moment(cStart, 'DD/MM/YYYY HH:mm:ss')
            if (start.isValid() && end.isValid()) {
                const diff = end.diff(start, 'seconds')
                if (diff >= 0) {
                    seconds = diff
                }
            }
        }

        if (seconds === null && row.WAITING_MINUTES !== null && row.WAITING_MINUTES !== undefined && !isNaN(row.WAITING_MINUTES)) {
            const mins = Number(row.WAITING_MINUTES)
            if (mins >= 0) {
                seconds = Math.round(mins * 60)
            }
        }

        if (seconds !== null) {
            totalSeconds += seconds
            validCount++
        }
    })

    if (validCount === 0) {
        return {
            hasData: false,
            count: 0,
            avgMinutes: 0,
            avgSeconds: 0,
            formattedHHMMSS: '-',
            displayString: '-',
            level: 'neutral'
        }
    }

    const avgSeconds = Math.round(totalSeconds / validCount)
    const hours = Math.floor(avgSeconds / 3600)
    const minutes = Math.floor((avgSeconds % 3600) / 60)
    const remainingSec = avgSeconds % 60

    const formattedHHMMSS = `${hours < 10 ? '0' : ''}${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSec).padStart(2, '0')}`

    let displayString = ''
    if (hours > 0) {
        displayString = `${hours} hr ${minutes} min`
    } else if (minutes > 0) {
        displayString = remainingSec > 0 ? `${minutes} min ${remainingSec} sec` : `${minutes} min`
    } else {
        displayString = `${remainingSec} sec`
    }

    const avgMinutes = Number((avgSeconds / 60).toFixed(1))
    // If average time is <= 26 minutes then optimal (green), above 26 minutes is danger (red)
    const level = avgMinutes <= 26 ? 'optimal' : 'danger'

    return {
        hasData: true,
        count: validCount,
        avgMinutes,
        avgSeconds,
        formattedHHMMSS,
        displayString,
        level
    }
}
