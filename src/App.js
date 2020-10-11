import React, { Component } from 'react';
import axios from 'axios';
import Operations from './components/operations'
import Transactions from './components/Transactions'
import './App.css';


class App extends Component {

  constructor() {
    super()
    this.state = {
      transaction: [],
      Balance: 0
    }
  }

  removeTransaction = (id) => {
    let idTransaction = this.state.transaction.findIndex(t => t._id === id)
    console.log(idTransaction)
    let t = [...this.state.transaction]
    t.splice(idTransaction, 1)
    this.setState({
      transaction: t
    })
    axios.delete(`http://localhost:4000/transaction/${id}`).then((response) => {
      console.log(response)
    })
  }

  newTransaction = (a) => {
    let transactions = [...this.state.transaction]
    transactions.push(a)
    this.setState({
      transaction: transactions
    }, () => this.calculateSum(this.state.transaction))
    axios.post('http://localhost:4000/transaction', a).then((response) => {
      console.log(response)
    }, () => this.getTransactions())
  }
 
  getTransactions = () => {
    axios.get('http://localhost:4000/transactions').then((response) => { 
      this.setState({
        transaction: response.data
      }, () => this.calculateSum(this.state.transaction))
    })
  }
  componentDidMount() {
    this.getTransactions()

  }

  calculateSum = (trans) => {
    let sum = 0
    for (let t of trans) {
      sum += t.amount
    }
    this.setState({
      Balance: sum
    })
  }

  render() {
    return (
      <div>
        <div><Transactions removeTransaction={this.removeTransaction} transaction={this.state.transaction} /></div>
        <div><Operations newTransaction={this.newTransaction} transactions={this.state.transaction} /></div>
        <div>Balance :{this.state.Balance}</div>
      </div >
    );
  }
}



export default App;
