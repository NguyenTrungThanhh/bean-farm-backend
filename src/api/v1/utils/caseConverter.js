// Convert camelCase -> snake_case
function toSnakeCase(str) {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

function keysToSnake(obj) {
    if (Array.isArray(obj)) return obj.map(keysToSnake);
    if (obj !== null && obj.constructor === Object) {
        return Object.keys(obj).reduce((acc, key) => {
            acc[toSnakeCase(key)] = keysToSnake(obj[key]);
            return acc;
        }, {});
    }
    return obj;
}

module.exports = { keysToSnake };
