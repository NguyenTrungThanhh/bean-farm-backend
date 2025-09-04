const TinTucModel = require('../../../../src/api/v1/models/tinTuc.model');

const getAllNews = async () => {
    return await TinTucModel.find({}).sort({ createdAt: -1 });
};

const getNewsBySlug = async (slug) => {
    return await TinTucModel.findOne({ slug });
};

const addNews = async (data) => {
    return await TinTucModel.create(data);
};

const deleteNews = async (id) => {
    return await TinTucModel.findByIdAndDelete(id);
};

module.exports = {
    getAllNews,
    getNewsBySlug,
    addNews,
    deleteNews,
};
