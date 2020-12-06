const mongoose = require('mongoose');

const PaidSchema = new mongoose.Schema({
    order: String,
    user: String,
    streamId: String,
    status: String
    }
    , {timestamps: true}
 );

const Paid = mongoose.model('Paid', PaidSchema);

module.exports = Paid;