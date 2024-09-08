// COMPONENTE PARA PINTAR PRODUCTOS QUE ESTÉN EN EL CARRITO
import { useContext, useEffect } from 'react'
import { ProductsContext } from '../../context/ProductsContext/ProductsState'
import { OrdersContext } from '../../context/OrdersContext/OrdersState'

const Cart = () => {
    const { cart, clearCart } = useContext(ProductsContext)
    const { createOrder } = useContext(OrdersContext)
    // cada vez que cambie cart actualizamos localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    if (cart.length <= 0) {
        return <span>No tienes ningún producto añadido</span>
    }

    const createNewOrder = () => {
        createOrder(cart)
        clearCart
    }

    const cartItem = cart.map((cartItem, i) => {
        return (
            <div className="cart" key={i}>
                <span>{cartItem.name}</span>
                <span>{cartItem.price.toFixed(2)} €</span>
            </div>
        )
    })
    return (
        // comenta que no le gusta esto, pero lo dejamos así
        // 47:00 
        <>
            {cartItem}
            <button onClick={() => clearCart()}>
                Clear cart
            </button>
            <button onClick={() => createNewOrder()}>
                Create Order
            </button>
        </>
    )
}
export default Cart
