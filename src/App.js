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
    const indexTransaction = this.state.transaction.findIndex(t => t._id === id)
    let t = [...this.state.transaction]
    t.splice(indexTransaction, 1)
    this.setState({
      transaction: t
    }, () => this.calculateSum(this.state.transaction))
    axios.delete(`http://localhost:4000/transaction/${id}`).then((response) => {
      console.log(response)
    })
  }

  newTransaction = (a) => {
    const transactions = [...this.state.transaction]
    transactions.push(a)
    this.setState({
      transaction: transactions
    }, () => this.calculateSum(this.state.transaction))
    axios.post('http://localhost:4000/transaction', a).then((response) => {
      console.log(response)
    }, () => this.getTransactions())
  }
  getTransactions = () => axios.get('http://localhost:4000/transactions')

  componentDidMount = async () => {
    const transactions = await this.getTransactions()
    this.setState({ transaction: transactions.data })

  }

  calculateSum = () => {

    let sum = 0
    this.state.transaction.forEach(t => sum += t.amount)
    return sum
  }
  calculateCategory = (category) => {
    let sum = 0 
    let filter = this.state.transaction.filter(t => t.category === category)
    filter.forEach(a => sum += a.amount)
    return(sum)
    
  }

  render() {
    return (
      <div>
        <div><Operations newTransaction={this.newTransaction} transactions={this.state.transaction} /></div>
        <div><Transactions removeTransaction={this.removeTransaction} transaction={this.state.transaction} /></div>
        
          <h4>Total Balance :{this.calculateSum()}</h4>
       
          <h3>Total sum of categories:</h3>
          <div>Clothes: {this.calculateCategory("Clothes")}</div>
          <div>Car: {this.calculateCategory("Car")}</div>
          <div>Supermarket: {this.calculateCategory("Supermarket")}</div>
          <div>Clubs: {this.calculateCategory("Clubs")}</div>
      </div >
    );
  }
}



export default App;
