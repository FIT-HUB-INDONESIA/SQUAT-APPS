class DateConverter {
    /**
     * Converts a human-readable date string to an epoch timestamp.
     * @param {string} dateString - The date string in the format "DD-MM-YYYY HH:mm:ss GMT±HH:MM".
     * @returns {number} The epoch timestamp in milliseconds.
     * @throws {Error} If the date string format is invalid.
     */
    static humanReadableToEpoch(dateString) {
        const parts = dateString.match(
            /(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2}):(\d{2}) GMT([+-]\d{2}):(\d{2})/
        );

        if (!parts) {
            throw new Error(
                "Invalid date format. Expected format: DD-MM-YYYY HH:mm:ss GMT±HH:MM"
            );
        }

        const [, day, month, year, hours, minutes, seconds, tzHour, tzMinute] =
            parts;
        const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${tzHour}:${tzMinute}`;

        return new Date(isoString).getTime();
    }

    /**
     * Converts a GMT date string to UTC format.
     * @param {string} gmtString - The date string in the format "YYYY-MM-DD HH:mm:ss GMT±HH:MM".
     * @returns {string} The UTC formatted date string.
     */
    static convertToUTC(gmtString) {
        const date = new Date(gmtString);

        return date.toISOString();
    }
}

export default DateConverter;
