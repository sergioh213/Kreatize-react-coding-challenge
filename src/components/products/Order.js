import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './products.css'

const mapStateToProps = state => {
    return {
        cartList: state.cartList,
        totalNettoAmount: state.totalNettoAmount
    }
}

class Order extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    render() {
        // If there is an invalid order
        if (this.props.cartList.length <= 0) {
            return (
                <div className={styles.modal}>
                    <div className={styles.header}>
                        <div className={styles.header_text}>You can't place this order</div>
                        <div className={styles.close_x} onClick={ this.props.toggleShowOrder }>x</div>
                    </div>
                    <div className={styles.content_box}>
                        <div className={styles.final_message}>Please select the items you want to order</div>
                    </div>
                </div>
            )
        }
        // If order is valid
        return (
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.header_text}>Order Successfully Placed</div>
                    <div className={styles.close_x} onClick={ this.props.toggleShowOrder }>x</div>
                </div>
                <div className={styles.content_box}>
                    <div className={styles.final_message}>{"Your total: " + this.props.totalNettoAmount + " €"}</div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Order);
