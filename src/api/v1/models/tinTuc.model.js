const mongoose = require('mongoose');
const slugify = require('slugify');

const tinTucSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, unique: true, index: true },
        category: { type: String, required: true },
        date: { type: String, required: true },

        // Dùng CKEditor → dùng chuỗi HTML
        content: { type: String, required: true },

        image: { type: String, required: true }, // thumbnail hoặc ảnh đại diện
    },
    { timestamps: true },
);

// Tự động sinh slug từ name
tinTucSchema.pre('save', function (next) {
    if (!this.slug || this.isModified('name')) {
        this.slug = slugify(this.name, {
            lower: true,
            strict: true,
            locale: 'vi',
        });
    }
    next();
});

module.exports = mongoose.model('TinTuc', tinTucSchema);
