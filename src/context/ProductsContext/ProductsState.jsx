import { createContext, useReducer } from "react";
import axios from "axios";
import ProductsReducer from "./ProductsReducer"

// 42:00 guardar carrito en localStorage (lo recuperamos)
const cart = JSON.parse(localStorage.getItem('cart'))

// --- 1
const initialState = {
    products: [],
    // también puede ser:
    // cart : cart || [],
    cart: cart ? cart : [],
}

// para poder reutilizarla
const API_URL = 'http://localhost:3001'

// --- 2
export const ProductsProvider = ({ children }) => {
    // state corresponde a los estados iniciales que tenemos
    // en ProductsReducer.jsx > products: action.payload
    // el dispatch serán los reducers que tengamos en el fichero
    const [state, dispatch] = useReducer(ProductsReducer, initialState)

    // PRIMER MÉTODO - TRAER TODOS LOS PRODUCTOS
    // llamada a la API
    const getProducts = async () => {
        // que se corresponda como lo tengamos en la base de datos!
        const res = await axios.get(API_URL + '/products/getAll')
        dispatch({
            type: 'GET_PRODUCTS',
            // respuesta que mandamos por el payload
            payload: res.data,
        })
        return res
    }

    // nueva acción para cargar los productos
    const addCart = (product) => {
        dispatch({
            type: 'ADD_CART',
            payload: product,
        })
    }

    // guardamos carrito y actualizamos initialState
    const cart = JSON.parse(localStorage.getItem('cart'))
    // recupera cart de localStorage
    // y añadimos arriba en initialState la parte de cart (TERNARIO)

    // LIMPIAMOS CARRITO
    // actualizando valores del proveedor
    const clearCart = () => {
        dispatch({
            type: 'CLEAR_CART',
        })
    }
    return (
        <ProductsContext.Provider
            value={{
                products: state.products,
                cart: state.cart,
                getProducts,
                addCart,
                clearCart,
            }}
        >
            {children}
        </ProductsContext.Provider>
    )

    // exportamos
    return (
        <ProductsContext.Provider
            value={{
                // primero los estados
                products: state.products,
                cart: state.cart,
                // después el método
                getProducts,
                addCart,
            }}
        >
            {children}
        </ProductsContext.Provider>
    )

}

export const ProductsContext = createContext(initialState)