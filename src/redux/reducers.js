export default function(state = {}, action) {
    if (action.type == 'ADD_PRODUCT') {
        var clone = state.products
        clone.map(product => {
            if (product.id === action.item.id) {
                product.inCart = true
            }
        })
        var newCartList = [action.item, ...state.cartList]
        var totalBruttoAmount = 0
        var total19tax = 0
        var total7tax = 0

        newCartList.forEach(item => {
            totalBruttoAmount = Number((item.price + totalBruttoAmount).toFixed(2))
            if (item.tax_percentage == 19) {
                total19tax = Number((item.totalTax + total19tax).toFixed(2))
            } else if (item.tax_percentage == 7) {
                total7tax = Number((item.totalTax + total7tax).toFixed(2))
            }
        })
        state = {
            ...state,
            cartList: newCartList,
            products: clone,
            totalBruttoAmount: totalBruttoAmount,
            total19tax: total19tax,
            total7tax: total7tax,
            totalNettoAmount: Number((totalBruttoAmount + total19tax + total7tax).toFixed(2))
        }
    }
    if (action.type == 'RECEIVE_PRODUCTS') {
        var clone = action.products
        clone.map(item => {
            item.totalPrice = Number(((item.price * (item.tax_percentage/100)) + item.price).toFixed(2))
            item.totalTax = Number((item.price * (item.tax_percentage/100)).toFixed(2))
        })
        state = {
            ...state,
            products: clone,
            cartList: []
        }
    }
    if (action.type == 'REMOVE_PRODUCT') {
        var clone = state.products
        clone.map(product => {
            if (product.id === action.item.id) {
                product.inCart = false
            }
        })
        var newCartList = state.cartList.filter(product => product.id != action.item.id )
        var totalBruttoAmount = 0
        var total19tax = 0
        var total7tax = 0
        newCartList.forEach(item => {
            totalBruttoAmount = Number((totalBruttoAmount + item.price).toFixed(2))
            if (item.tax_percentage == 19) {
                total19tax = Number((total19tax + item.totalTax).toFixed(2))
            } else if (item.tax_percentage == 7) {
                total7tax = Number((total7tax + item.totalTax).toFixed(2))
            }
        })
        state = {
            ...state,
            cartList: newCartList,
            products: clone,
            totalBruttoAmount: totalBruttoAmount,
            total19tax: total19tax,
            total7tax: total7tax,
            totalNettoAmount: Number((totalBruttoAmount + total19tax + total7tax).toFixed(2))
        }
    }
    if (action.type == 'SAVE_COMMENT') {
        var clone = state.cartList
        clone.map(product => {
            if (action.item.id == product.id) {
                product.comment = action.comment
            }
        })
        state = {
            ...state,
            cartList: clone
        }
    }
    return state;
}

// dispatch // action // reducer
