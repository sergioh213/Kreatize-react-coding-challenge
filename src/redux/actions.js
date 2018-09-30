import axios from '../axios'

export function addProduct(item) {
    return {
        type: 'ADD_PRODUCT',
        item
    }
}
export function removeProduct(item) {
    return {
        type: 'REMOVE_PRODUCT',
        item
    }
}
export function getProducts() {
    return axios.get("./assets/products.json").then(({ data }) => {
        return {
            type: 'RECEIVE_PRODUCTS',
            products: data
        }
    })
}
export function saveComment(item, comment) {
    return {
        type: 'SAVE_COMMENT',
        item,
        comment
    }
}
