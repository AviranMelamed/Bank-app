import React, { Component } from 'react';
import Transaction from './Transaction'



    class Transactions extends Component {
        render(){
            let transaction = this.props.transaction
            return (<div>
                {transaction.map(t =><Transaction removeTransaction={this.props.removeTransaction} t={t} />  )}
                </div>
                
            )
        }
    }
export default Transactions