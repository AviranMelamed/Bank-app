
import React, { Component } from 'react';
  


    class Operations extends Component {
          constructor(){
        super()
        this.state = {
            
            amount: "",
            vendor: "",
            category: ""
            
        }
    }

    amount = (event) => {
        this.setState({
            amount: parseInt(event.target.value),
            
        })
    }
    vendor = (event) => {
        this.setState({
            vendor: event.target.value
        })
    }
    category = (event) => {
        this.setState({
            category: event.target.value
        })
    }
    insertDeposit = () =>{
    this.props.newTransaction(this.state)
    }
    
    insertWithdraw = () => {
        let transaction = {...this.state}
        transaction.amount = -1 * transaction.amount
        this.props.newTransaction(transaction)
}
  
        render(){
            return (
            <div>
            <input value={this.state.vendor} onChange={this.vendor} id="name-input" />
            <input value={this.state.category} onChange={this.category} id="name-input" />
            <input value={this.state.amount} onChange={this.amount} id="name-input" placeholder="amount"/>

                <button onClick={this.insertDeposit}>Deposit</button>
                <button onClick={this.insertWithdraw}>Withdraw</button>                
            </div>
            )
        }
    }

    
export default Operations

