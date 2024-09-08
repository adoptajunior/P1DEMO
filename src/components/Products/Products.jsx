// Componente encargo de pintar los productos
// HOOKS
import { useContext, useEffect } from 'react'
import { ProductsContext } from '../../context/ProductsContext/ProductsState'
const Products = () => {
    const { getProducts, products, addCart, cart } = useContext(ProductsContext)
    useEffect(() => {
        // al cargar por primera vez los productos...
        getProducts()
    }, [])
    // cada vez que cart cambie se guarda en localStorage
    // así evitamos perder la info en caso de refresco /
    // o pérdida del estado
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    // el products && es una forma de asegurarnos que sólo se renderice
    // y mapee si ha recibido resultados
    return (
        <>
            {
                products &&
                products.map((product) => (
                    <div key={product._id}>
                        <span>{product.name} </span>
                        <span>{product.price.toFixed(2)}</span>
                        {/* botón que añade los productos al carrito */}
                        <button onClick={() => addCart(product)}>Add Cart</button>
                    </div>
                ))
            }
        </>
    )
}
export default Products
