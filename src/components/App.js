import React, { Component } from 'react';
import styles from './app.css'
import axios from '../axios'
import Products from './products/Products'
import Row from './products/Row'
import Order from './products/Order'
import { connect } from 'react-redux';
import { getProducts } from '../redux/actions.js'

const mapStateToProps = state => {
    return {
        products: state.products,
        cartList: state.cartList,
        totalBruttoAmount: state.totalBruttoAmount,
        total19tax: state.total19tax,
        total7tax: state.total7tax,
        totalNettoAmount: state.totalNettoAmount
    }
}

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showProducts: false,
            showOrder: false
        }

        this.toggleShowProducts = this.toggleShowProducts.bind(this)
        this.toggleShowOrder = this.toggleShowOrder.bind(this)
        this.hideModals = this.hideModals.bind(this)
    }
    componentDidMount() {
        this.props.dispatch(getProducts());
    }
    hideModals() {
        this.setState({ showProducts: false, showOrder: false })
    }
    toggleShowProducts() {
        this.setState({ showProducts: !this.state.showProducts })
    }
    toggleShowOrder() {
        this.setState({ showOrder: !this.state.showOrder })
    }
    render() {
        if (!this.props.products) {
            return null
        }
        return (
            <div className={styles.app}>
                <div className={styles.card}>
                    <div className={styles.header}>Shopping Basket</div>
                    <div className={styles.content_box}>

                        {/* -----  GRID STRUCTURE  ----- */}
                        <div className={styles.row}>
                            <div className={styles.grid_top}>
                                <div className={styles.grid_div}>#</div>
                                <div className={styles.grid_div}>Name</div>
                                <div className={styles.grid_div}>Comments</div>
                                <div className={styles.grid_div}>Price</div>
                                <div className={styles.grid_div}>Tax</div>
                                <div className={styles.grid_div}>Total Item</div>
                            </div>
                        </div>

                        {/* -----  ROWS FOR EACH PRODUCT IN THE CART  ----- */}
                        { this.props.cartList.map((product, i, array) => {
                            return (
                                <Row key={product.id} product={product} i={i} />
                            )
                        })}

                        <div id={styles.btn_wrapper}>
                            <div
                                className={styles.add_product}
                                onClick={ this.toggleShowProducts }
                            >Add New Product</div>
                        </div>

                        {/* -----  TOTAL AMOUNTS BOXES  ----- */}
                        <div id={styles.total_wrapper}>
                            <div id={styles.total_grid}>
                                <div className={styles.total_grid_top}>
                                    <div className={styles.grid_div}>Total Brutto</div>
                                    <div className={styles.grid_num}>{(this.props.totalBruttoAmount || 0) + " €"}</div>
                                </div>
                                <div className={styles.total_grid_body}>
                                    <div className={styles.grid_div}>Tax 19%</div>
                                    <div className={styles.grid_num}>{(this.props.total19tax || 0) + " €"}</div>
                                </div>
                                <div className={styles.total_grid_body}>
                                    <div className={styles.grid_div}>Tax 7%</div>
                                    <div className={styles.grid_num}>{(this.props.total7tax || 0) + " €"}</div>
                                </div>
                                <div className={styles.total_grid_body}>
                                    <div className={styles.grid_div}>Total Netto</div>
                                    <div className={styles.grid_num}>{(this.props.totalNettoAmount || 0) + " €"}</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.btn_order_wrapper}>
                            <button className={styles.order_button}
                                onClick={this.toggleShowOrder}
                            >Order</button>
                        </div>
                    </div>
                </div>

                {/* -----  DIM BACKGROUND AND LIST OF PRODUCTS  ----- */}
                { (this.state.showProducts || this.state.showOrder) &&
                    <div className={styles.background}
                        onClick={ this.hideModals }
                    ></div>
                }
                { this.state.showProducts &&
                    <Products
                        toggleShowProducts={this.toggleShowProducts}
                    />
                }
                { this.state.showOrder &&
                    <Order
                        toggleShowOrder={this.toggleShowOrder}
                    />
                }
            </div>
        );
    }
}

export default connect(mapStateToProps)(App);
