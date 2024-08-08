const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesSchema = new Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  date: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;

