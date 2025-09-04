const { getAllNews, getNewsBySlug } = require('../../../../../src/api/v1/services/tinTuc.service');

const handlerGetAllNews = async (req, res) => {
    try {
        const allNews = await getAllNews();

        const filteredNews = allNews.map((item) => ({
            name: item.name,
            slug: item.slug,
            content: item.content,
            date: item.date,
            image: item.image,
        }));

        res.json({ success: true, news: filteredNews });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const handlerGetNewsBySlug = async (req, res) => {
    const { slug } = req.params;

    try {
        if (!slug) {
            return res.status(400).json({ success: false, message: 'Slug is required.' });
        }

        const news = await getNewsBySlug(slug); // Trả về 1 object duy nhất

        if (!news) {
            return res.status(404).json({ success: false, message: 'News not found.' });
        }

        // Trả về object đã lọc
        const filteredNews = {
            name: news.name,
            slug: news.slug,
            content: news.content,
            date: news.date,
            image: news.image,
        };

        res.status(200).json({ success: true, news: filteredNews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    handlerGetAllNews,
    handlerGetNewsBySlug,
};
