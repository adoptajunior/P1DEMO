// FORMULARIO CREACIÓN DE PRODUCTOS
// usamos librería antd
import { Button, Form, InputNumber, Input } from 'antd'

import { useContext } from 'react'
import { ProductsContext } from '../../context/ProductsContext/ProductsState'

const CreateProduct = () => {
    // actualizamos el componente CreateProduct para que 
    // cuando se ejecute la función onFinish 
    // ejecute la función createProduct
    const { createProduct } = useContext(ProductsContext)
    // const onFinish = (values) => console.log(values)
    const onFinish = (values) => createProduct(values)
    return (
        <Form onFinish={onFinish}>
            <Form.Item label="Product Name" name="name">
                <Input placeholder="Product name" />
            </Form.Item>
            <Form.Item label="Price">
                <Form.Item name="price" noStyle>
                    <InputNumber />
                </Form.Item>
                <span className="ant-form-text"> €</span>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
export default CreateProduct