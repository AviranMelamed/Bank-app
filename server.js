const express = require(`express`)
const app = express()
const bodyParser = require(`body-parser`)
const TransactionScheme = require(`./model/TransactionSchem`)
const path = require(`path`)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

app.get(`/transactions`, function(req, res) {
    TransactionScheme.find().exec(function(err, Transactions) {
        res.send(Transactions)
    })
    
})
app.post(`/transaction`, function(req, res) {
        const postNewTransaction = req.body
        const newT = TransactionScheme(postNewTransaction)
        newT.save()
        res.send(newT)     

})

app.delete(`/transaction/:id`, async function(req, res) {
    const id = req.params.id
    await TransactionScheme.findByIdAndDelete({_id: id})
    res.send(id)
})


const port = 4000
app.listen(port, function() {
    console.log(`port ${port} is running`)
})