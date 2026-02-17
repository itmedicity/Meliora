// Converts a time string like "09:30 am" or "06:00 pm"
// into total minutes from midnight (0–1440)
const toMinutes = (timeStr) => {

    // Split "09:30 am" → ["09:30", "am"]
    const [time, meridian] = timeStr.trim().split(' ')

    // Split "09:30" → [9, 30]
    let [h, m] = time.split(':').map(Number)

    // If PM and not 12 PM, convert to 24-hour format
    // Example: 6 pm → 18
    if (meridian.toLowerCase() === 'pm' && h !== 12) h += 12

    // If 12 AM, convert to 0 hours (midnight)
    if (meridian.toLowerCase() === 'am' && h === 12) h = 0

    // Convert hours + minutes into total minutes
    // Example: 09:30 → (9 * 60) + 30 = 570
    return h * 60 + m
}


// Checks whether a meal time falls inside a given time range
// mealTime  : "09:30 am - 10:30 am"
// range     : "05:00 am - 10:30 am"
const isTimeInRange = (mealTime, range) => {

    // Split range into start & end
    // "05:00 am  - 10:30 am" → ["05:00 am", "10:30 am"]
    const [rangeStart, rangeEnd] = range.split('-').map(t => t.trim())

    // Extract only the START time of the meal
    // "09:30 am - 10:30 am" → "09:30 am"
    const mealStart = toMinutes(mealTime.split('-')[0].trim())

    // Convert range start & end to minutes
    const start = toMinutes(rangeStart)
    const end = toMinutes(rangeEnd)

    // NORMAL CASE (same-day range)
    // Example: 05:00 am → 10:30 am
    if (start <= end) {
        return mealStart >= start && mealStart <= end
    }

    // OVERNIGHT CASE (crosses midnight)
    // Example: 06:30 pm → 05:00 am
    return mealStart >= start || mealStart <= end
}



const toDateTime = (time) => {
    if (!time) return null
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
    return `${today} ${time}:00` // YYYY-MM-DD HH:mm:ss
}



const assignDietToBed = (bed, diets) => {
    if (!diets?.length) return null
    const hash = Number(bed.fb_bd_code) % diets.length
    return diets[hash]
}

// Export helpers
module.exports = { isTimeInRange, toMinutes, toDateTime, assignDietToBed }
