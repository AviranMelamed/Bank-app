import React, { Component } from 'react';


    class Transaction extends Component {
        render(){
            const t = this.props.t
            return (
                <div>
                    
                <div>amount: {t.amount} vendor: {t.vendor} category: {t.category} <button onClick={() => {this.props.removeTransaction(t._id)}} >Delete</button></div>
                </div>
            )
        }
    }
export default Transaction