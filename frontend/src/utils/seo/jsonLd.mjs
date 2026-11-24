/** Serialize JSON-LD without allowing text to close the containing script. */
export const serializeJsonLd = value => JSON.stringify(value).replace(/</g, '\\u003c');
