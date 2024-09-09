// modificación del estado
// coloca el valor devuelto por la API
// en la propiedad products
const products = (state, action) => {
    switch (action.type) {

        case 'GET_PRODUCTS':
            return {
                // trae el valor inicial de lo que tengamos
                // ProductsState.jsx > products: []
                ...state,
                products: action.payload,
            }
        case 'ADD_CART':
            return {
                // copia íntegra de lo que haya en ese momento
                // del estado inicial
                ...state,
                // sobreescribimos cart (con los productos que vengan)
                // se van sumando, por eso ...state.cart
                cart: [action.payload, ...state.cart],
            }
        // case de limpiar carrito
        case 'CLEAR_CART':
            return {
                ...state,
                cart: [],
            }
        // case eliminar producto
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(
                    (product) => product._id !== action.payload._id
                ),
            }
        // case crear producto
        case 'CREATE_PRODUCT':
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        // producto por ID
        case 'GET_PRODUCT_BY_ID':
            return {
                ...state,
                product: action.payload,
            }
        // editar producto
        case 'EDIT_PRODUCT':
            return {
                ...state,
                products: state.products.map((product) => {
                    if (product._id === action.payload.product._id) {
                        product = action.payload.product
                    }
                    return product
                }),
            }

        default:
            return state
    }
}
export default products
