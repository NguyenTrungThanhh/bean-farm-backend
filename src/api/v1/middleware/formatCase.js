const { keysToSnake, keysToCamel } = require('../../../../src/api/v1/utils/caseConverter');

function caseFormatter(req, res, next) {
    // Chuyển body từ snake_case -> camelCase trước khi xử lý
    if (req.body) {
        req.body = keysToCamel(req.body);
    }

    // Override res.json để convert ngược lại camelCase -> snake_case
    const oldJson = res.json;
    res.json = function (data) {
        return oldJson.call(this, keysToSnake(data));
    };

    next();
}

module.exports = caseFormatter;
