import React, { useContext, useEffect } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { ProductsContext } from '../../context/ProductsContext/ProductsState'

const Admin = () => {
    const { getProducts, products } = useContext(ProductsContext)
    useEffect(() => {
        getProducts()
    }, [])
    return (<>
        {products ? (products.map((product) => (
            <div key={product._id}>
                <span>{product.name} </span>
                <span>{product.price.toFixed(2)}</span>
                <button onClick={() => console.log('eliminar producto id:', product._id)}>
                    <DeleteOutlined />
                </button>
            </div>))
        ) : (
            <span>Loading...</span>
        )}
    </>
    )
}

export default Admin