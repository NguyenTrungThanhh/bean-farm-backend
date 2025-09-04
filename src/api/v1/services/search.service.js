const TinTucModel = require('../../../../src/api/v1/models/tinTuc.model');

const searchTinTuc = async (keyword) => {
    return await TinTucModel.find({
        name: { $regex: keyword, $options: 'i' },
    }).select('name slug image date');
};

module.exports = { searchTinTuc };
