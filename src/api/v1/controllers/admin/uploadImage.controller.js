const uploadImage = async (req, res) => {
    try {
        if (!req.file || !req.file.path) {
            return res.status(400).json({
                success: false,
                message: 'Không có file được upload',
            });
        }

        // Cloudinary sẽ trả về req.file.path là URL ảnh
        const imageUrl = req.file.path;

        res.status(200).json({
            uploaded: true,
            url: imageUrl,
            default: imageUrl, // CKEditor yêu cầu field `default`
        });
    } catch (err) {
        console.error('Lỗi upload ảnh:', err);
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi upload ảnh',
        });
    }
};

module.exports = uploadImage;
