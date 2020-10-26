const mongoose = require(`mongoose`)
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/TransactionDB', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })


const TransactionSchema = new Schema ({
    amount: Number,
    vendor: String,
    category: String,
    id: Number
})

const TransactionSchem = mongoose.model("Transaction", TransactionSchema)
module.exports = TransactionSchem