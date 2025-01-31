import { faker } from "@faker-js/faker";

/**
 * Generates a random Indonesian phone number
 * @returns {string} A phone number string starting with "8"
 */
export const generatePhoneNumber = () => {
    const additionalDigits = Array.from({ length: 8 }, () =>
        faker.number.int({ min: 0, max: 9 })
    ).join("");

    return `8${additionalDigits}`;
};

export default { generatePhoneNumber };
