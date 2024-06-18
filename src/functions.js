export const fetchNews = async()=>{
    const res = await fetch('http://localhost:5500/getArticles');

    const news = await res.json();
    return news;
}

export const fetchPublishers = async()=>{
    const res = await fetch('http://localhost:5500/getPublishers');

    const Publishers = await res.json();
    return Publishers;
}

// Function to add a duration to a GMT time
export const addDurationToTime = (time, duration) => {
    const date = new Date(time);

    // Add the duration to the parsed time
    if (duration.days) {
        date.setUTCDate(date.getUTCDate() + duration.days);
    }
    if (duration.hours) {
        date.setUTCHours(date.getUTCHours() + duration.hours);
    }
    if (duration.minutes) {
        date.setUTCMinutes(date.getUTCMinutes() + duration.minutes);
    }
    if (duration.seconds) {
        date.setUTCSeconds(date.getUTCSeconds() + duration.seconds);
    }

    // Return the resulting GMT time in ISO format
    return date.toISOString();
};


export const convertToISOFormat = (dateString) => {
    // Parse the date string into components
    const parts = dateString.split(' ');
    const day = parseInt(parts[1], 10); // Day of the month
    const monthStr = parts[2]; // Month name
    const year = parseInt(parts[3], 10); // Year
    const time = parts[4]; // Time in HH:mm:ss format

    // Convert month name to month index (0-indexed in JavaScript Date object)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthIndex = months.indexOf(monthStr);

    // Parse the time into hours, minutes, and seconds
    const timeParts = time.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);

    // Create a new Date object in UTC/GMT
    const gmtDate = new Date(Date.UTC(year, monthIndex, day, hours, minutes, seconds));

    // Format the Date object to ISO string format
    const isoString = gmtDate.toISOString();

    return isoString;
};