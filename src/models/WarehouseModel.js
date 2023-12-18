const mongoose = require('mongoose')
const warehouseSchema = new mongoose.Schema(
    {
        name: { type: String, unique: true},
        weight: { type: Number},
    },
    {
        timestamps: true
    }
);
const Warehouse = mongoose.model("warehouse", warehouseSchema);
module.exports = Warehouse;