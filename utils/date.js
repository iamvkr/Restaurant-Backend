export default function formatDateTime(date) {
    // Ensure the input is a Date object
    if (!(date instanceof Date)) {
        return "Invalid date format";
    }

    // Get the day, month, year, hours, minutes, and AM/PM
    let day = date.getDate().toString().padStart(2, '0'); // Ensure 2 digits
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure 2 digits

    // Determine AM/PM and adjust the hours for 12-hour format
    let period = hours >= 12 ? 'p.m' : 'a.m';
    hours = hours % 12;
    hours = hours ? hours : 12; // If 0 hours, set it to 12 for 12-hour format

    // Return formatted date string
    return `${day}/${month}/${year} - ${hours}:${minutes} ${period}`;
}
