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
    // nuevo estado que sea sólo para un producto
    product: {},
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

    // ELIMINAR PRODUCTO
    const deleteProduct = async (id) => {
        const token = JSON.parse(localStorage.getItem('token'))
        const res = await axios.delete(`${API_URL}/products/id/${id}`, {
            headers: {
                authorization: token,
            },
        })
        // queremos que lo elimine también del array de productos
        // para que conste en la base de datos y visualmente
        // el producto tampoco aparezca
        dispatch({
            type: 'DELETE_PRODUCT',
            payload: res.data.response,
        })
    }

    // CREAR PRODUCTO
    const createProduct = async (product) => {
        const token = JSON.parse(localStorage.getItem('token'))
        // le pasamos el product a crear
        const res = await axios.post(`${API_URL}/products`, product, {
            headers: { authorization: token },
        })
        dispatch({
            type: 'CREATE_PRODUCT',
            payload: res.data,
        })
        return res
    }

    // GET PRODUCT BY ID
    // recibe el ID por parámetro
    const getProductById = async (id) => {
        // y le pasamos el ID de la tarea
        const res = await axios.get(`${API_URL}/products/id/${id}`)
        dispatch({
            type: 'GET_PRODUCT_BY_ID',
            payload: res.data,
        })
    }

    // EDITAR PRODUCTO
    // recibe el ID por parámetro
    const editProduct = async (product, id) => {
        const token = JSON.parse(localStorage.getItem('token'))
        // y le pasamos el _id del producto 
        // pasamos product editado
        const res = await axios.put(`${API_URL}/products/${id}`, product, {
            headers: { authorization: token },
        })
        dispatch({
            type: 'EDIT_PRODUCT',
            payload: res.data,
        })
        return res
    }


    // exportamos
    return (
        <ProductsContext.Provider
            value={{
                // primero los estados
                products: state.products,
                product: state.product,
                cart: state.cart,
                // después los métodos
                getProducts,
                addCart,
                clearCart,
                deleteProduct,
                createProduct,
                getProductById,
                editProduct,
            }}
        >
            {children}
        </ProductsContext.Provider>
    )

}

export const ProductsContext = createContext(initialState)