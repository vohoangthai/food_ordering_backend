const mongoose = require('mongoose')
const productSchema = new mongoose. Schema (
    {
name: { type: String, required: true, unique: true },
image: { type: String},
type: { type: String, required: true },
price: { type: Number, required: true },
description: { type: String, required: true },
ingredients: {type: Array},
selled: { type: Number ,default: 0}},
{
timestamps: true,
}
);
const Product = mongoose.model('product', productSchema);
module.exports = Product;