const { getAllProducts, addProduct, deleteProduct } = require('../../../../../src/api/v1/services/product.service');

const handlerGetAllProducts = async (req, res) => {
    try {
        const allProducts = await getAllProducts();
        res.json({ success: true, products: allProducts });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// const handlerAddNews = async (req, res) => {
//     try {
//         console.log('Body nhận được:', req.body);
//         console.log('Files nhận được:', req.file);

//         const { name, category, date, content } = req.body;

//         if (!name || !category || !date || !content) {
//             return res.status(400).json({ success: false, message: 'Thiếu trường bắt buộc' });
//         }

//         const imageUrl = req.file?.path || ''; // dùng Multer: req.file chứ không phải req.files

//         const TinTucData = {
//             name,
//             category,
//             date,
//             content, // HTML từ CKEditor
//             image: imageUrl,
//         };

//         const newTinTuc = await addNews(TinTucData);
//         res.json({ success: true, message: 'Thêm tin tức thành công', news: newTinTuc });
//     } catch (error) {
//         console.error('Lỗi backend:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// const handlerDeleteNews = async (req, res) => {
//     const { id } = req.params;
//     try {
//         await deleteNews(id);
//         res.json({ success: true, message: 'Xóa tin tức thành công' });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };

module.exports = {
    handlerGetAllProducts,
    // handlerAddNews,
    // handlerDeleteNews,
};
