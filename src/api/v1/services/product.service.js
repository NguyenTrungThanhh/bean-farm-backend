const ProductModel = require('../../../../src/api/v1/models/product.model');

const getAllProducts = async () => {
    return await ProductModel.find({}).sort({ createdAt: -1 });
};

const addProduct = async (data) => {
    return await ProductModel.create(data);
};

const deleteProduct = async (id) => {
    return await ProductModel.findByIdAndDelete(id);
};

module.exports = {
    getAllProducts,
    addProduct,
    deleteProduct,
};
