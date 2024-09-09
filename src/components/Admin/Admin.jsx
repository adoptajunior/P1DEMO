import React, { useContext, useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ProductsContext } from '../../context/ProductsContext/ProductsState'
import CreateProduct from '../Products/CreateProduct'

const Admin = () => {
    const { getProducts, products, deleteProduct, getProductById } = useContext(ProductsContext)

    useEffect(() => {
        getProducts()
    }, [])

    // booleano, si es visible muestra y si no no
    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = (id) => {
        // console.log(id)
        getProductById = useContext(ProductsContext)
        setIsModalVisible(true)
    }

    return (<>
        <CreateProduct />
        {products ? (products.map((product) => (
            <div key={product._id}>
                <span>{product.name} </span>
                <span>{product.price.toFixed(2)}</span>
                {/* 
                <button onClick={() => console.log('eliminar producto id:', product._id)}>
                <DeleteOutlined />
                </button> 
                */}
                <button onClick={() => deleteProduct(product._id)}>
                    <DeleteOutlined />
                </button>
                <button onClick={() => showModal(product._id)}>
                    <EditOutlined />
                </button>
            </div>))
        ) : (
            <span>Loading...</span>
        )}
        <EditProductModal
            visible={isModalVisible}
            setVisible={setIsModalVisible}
        />
    </>
    )
}

export default Admin