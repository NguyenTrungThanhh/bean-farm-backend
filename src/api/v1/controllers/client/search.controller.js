const { searchTinTuc } = require('../../../../../src/api/v1/services/search.service');

const handlerSearchTinTuc = async (req, res) => {
    const { keyword } = req.query;

    try {
        if (!keyword) return res.status(400).json({ success: false, message: 'Keyword is required.' });

        const results = await searchTinTuc(keyword);

        res.status(200).json({ success: true, results });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    handlerSearchTinTuc,
};
