
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const receiptSchema = new Schema({

  date: {
  type: Date,
  required: true
  },
  purchases: {
    type: Array,
    required: true
  },
  owner: {
    type: String,
    required: true 
  },
  total: {
    type: Number,
    required: true
  }

});
var Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt
// module.exports = mongoose.model('Receipt', receiptSchema);

