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


        default:
            return state
    }
}
export default products
