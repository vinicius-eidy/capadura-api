export function transformKeysToCamelCase(data: any): any {
    if (Array.isArray(data)) {
        return data.map((item) => transformKeysToCamelCase(item));
    } else if (data !== null && typeof data === "object" && !(data instanceof Date)) {
        return Object.keys(data).reduce((result: any, key: string) => {
            const camelCaseKey = snakeToCamelCase(key);
            result[camelCaseKey] = transformKeysToCamelCase(data[key]);
            return result;
        }, {});
    }
    return data;
}

function snakeToCamelCase(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}
