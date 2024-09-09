// Creamos el componente EditProductModal, 
// que recibirá por props la propiedad visible y el método setVisible.
// La función onFinish mostrará los valores del formulario 
// y cerrará el modal.
import { Button, Modal, Form, InputNumber, Input } from 'antd'
import { useContext, useEffect } from 'react'

const EditProductModal = ({ visible, setVisible }) => {

    // cuando se ejecute la función onFinish 
    // ejecuta la función editProduct
    const { product, editProduct } = useContext(ProductsContext)

    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue(product)
    }, [product])

    const onFinish = (values) => {
        // console.log(values)
        editProduct(values, product._id)
        setVisible(false)
    }
    return (
        <Modal title="Edit Product" open={visible} footer={[]}>
            {/* 
            pasamos form para obtener la instancial de formulario actual 
            */}
            <Form onFinish={onFinish} form={form}>
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
        </Modal >
    )
}

export default EditProductModal