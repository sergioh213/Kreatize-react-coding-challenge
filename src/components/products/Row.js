import React, { Component } from 'react';
import styles from './row.css'
import { connect } from 'react-redux';
import { saveComment, removeProduct } from '../../redux/actions.js'

const mapStateToProps = state => {
    return {}
}

class Row extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editable: true
        }

        this.eraseContent = this.eraseContent.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    eraseContent(e) {
        if (e.target.innerText == "Add a comment") {
            e.target.innerText = ""
        }
    }
    handleChange(e, item) {
        var comment = e.target.innerText
        if (comment || comment=="") {
            this.props.dispatch(saveComment(item, comment));
        }
    }
    render() {
        if (!this.props.product) {
            return null
        }
        return (
            <div>
                {/* -----  GRID ROW  ----- */}
                <div className={styles.row}>
                    <div className={styles.grid_body}>
                        <div className={styles.grid_div}>{this.props.i+1}</div>
                        <div className={styles.grid_div}>{this.props.product.name}</div>
                        <div className={styles.grid_comment}
                            contentEditable={this.state.editable}
                            onClick={(e) => this.eraseContent(e)}
                            onBlur={(e) => this.handleChange(e, this.props.product)} >
                            { (!this.props.product.comment || this.props.product.comment==="") ?
                                "Add a comment" :
                                 this.props.product.comment
                             }
                        </div>
                        <div className={styles.grid_num}>{this.props.product.price + " €"}</div>
                        <div className={styles.grid_num}>{this.props.product.tax_percentage + "%"}</div>
                        <div className={styles.grid_num}>{this.props.product.totalPrice + " €"}</div>
                    </div>
                </div>

                {/* -----  REMOVE PRODUCT BUTTON  ----- */}
                <div className={styles.cross_wrapper}>
                    <i className="fas fa-times"
                        onClick={() => this.props.dispatch(removeProduct(this.props.product))}
                        ></i>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Row);
