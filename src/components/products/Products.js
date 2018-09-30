import React, { Component } from 'react';
import styles from './products.css'
import { connect } from 'react-redux';
import { addProduct } from '../../redux/actions.js'

const mapStateToProps = state => {
    return {
        products: state.products,
        cartList: state.cartList
    }
}
class Products extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    render() {
        if (!this.props) {
            return null
        }
        return (
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.header_text}>Choose Products</div>
                    <div className={styles.close_x} onClick={ this.props.toggleShowProducts }>x</div>
                </div>

                {/* -----  GRID STRUCTURE  ----- */}
                <div className={styles.content_box}>
                    <div className={styles.row}>
                        <div className={styles.grid_top}>
                            <div className={styles.grid_div}>#</div>
                            <div className={styles.grid_div}>Name</div>
                            <div className={styles.grid_div}>Price</div>
                            <div className={styles.grid_div}>Tax</div>
                            <div className={styles.grid_div}>Total Item</div>
                        </div>
                    </div>

                    {/* -----  ROWS FOR EACH PRODUCT AVAILABLE TO CHOOSE  ----- */}
                    { this.props.products.map((product, i) => {
                        if (!product.inCart) {
                            return (
                                <div key={product.name}>
                                    <div className={styles.row}>
                                        <div className={styles.grid_body} >
                                            <div className={styles.grid_div}>{i+1}</div>
                                            <div className={styles.grid_div}>{product.name}</div>
                                            <div className={styles.grid_num}>{product.price + " €"}</div>
                                            <div className={styles.grid_num}>{product.tax_percentage + "%"}</div>
                                            <div className={styles.grid_num}>{product.totalPrice + " €"}</div>
                                        </div>
                                    </div>
                                    <button
                                        className={styles.btn}
                                        onClick={() => this.props.dispatch(addProduct(product))}
                                    >Add</button>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Products);
