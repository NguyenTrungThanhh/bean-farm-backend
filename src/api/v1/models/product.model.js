const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, unique: true, index: true },
        brand: { type: String, default: '' },
        sku: { type: String, default: null },

        category: { type: String, required: true }, // vd: "Rau củ quả"
        subCategory: { type: String, default: null }, // vd: "Rau ăn lá"

        status: { type: String, enum: ['in_stock', 'out_of_stock'], default: 'in_stock' },
        stockQuantity: { type: Number, default: 0 },

        priceOrigin: { type: Number, required: true },
        priceCurrent: { type: Number, required: true },
        discountAmount: { type: Number, default: 0 },

        image: { type: String, required: true },
        images: [{ type: String }],

        descriptionSub: { type: String, default: '' },
        descriptionMain: { type: String, default: '' },
    },
    { timestamps: true },
);

productSchema.pre('save', function (next) {
    if (!this.slug || this.isModified('name')) {
        this.slug = slugify(this.name, {
            lower: true,
            strict: true,
            locale: 'vi',
        });
    }
    next();
});

module.exports = mongoose.model('Product', productSchema);
