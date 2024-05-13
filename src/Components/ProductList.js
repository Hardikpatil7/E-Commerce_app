import React, { useState } from 'react';
import { Table, Button, Space, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../Actions/ProductActions';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ProductForm from './ProductForm';
import ProductView from './ProductView';
import { useNavigate } from 'react-router-dom';
import './Product.css';

const ProductList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector(state => state.products);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formKey, setFormKey] = useState(0);

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    const handleEdit = (product) => {
        setIsModalVisible(true);
        setSelectedProduct(product);
    };

    const handleView = (product) => {
        setSelectedProduct(product);
        navigate(`/details/${product.id}`)
    };

    const handleAdd = () => {
        setIsModalVisible(true);
        setSelectedProduct(null);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setFormKey(prevKey => prevKey + 1);
    };

    const calculateDiscountPercentage = (price, discountPrice) => {
        if (!price || !discountPrice) return 0;
        const discountPercentage = ((price - discountPrice) / price) * 100;
        return Math.round(discountPercentage);
    };

    const columns = [
        {
            title: 'Name',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            render: (text, record) => <a onClick={() => handleView(record)}>{text}</a>,
        },
        {
            title: 'Category',
            width: 100,
            dataIndex: 'category',
            key: 'category',
            fixed: 'left',
            render: (text, record) => <a onClick={() => handleView(record)}>{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 150,
            render: (text, record) => <a onClick={() => handleView(record)}>{text}</a>,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            width: 100,
            render: (text, record) => <a onClick={() => handleView(record)}> <img src={text} alt="product" style={{ width: '50px' }} /></a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 50,
            render: (text, record) => <a onClick={() => handleView(record)}>{text}</a>,
        },
        {
            title: 'Discount Price',
            dataIndex: 'discountPrice',
            key: 'discountPrice',
            width: 50,
            render: (text, record) => <a onClick={() => handleView(record)}>{text}</a>,
        },
        {
            title: 'Discount Percentage',
            dataIndex: 'discountPercentage',
            key: 'discountPercentage',
            width: 50,
            render: (text, record) => <a onClick={() => handleView(record)}>{calculateDiscountPercentage(record.price, record.discountPrice) + '%'}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'center',
            width: 150,
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger>
                        Delete
                    </Button>
                    <Button icon={<ExclamationCircleOutlined />} onClick={() => handleView(record)}>
                        Details
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="product-list-container">
            <div className="product-list-header">
                <h1 className='product-header'>Product List</h1>
            </div>
            <div className="add-product-button">
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Add Product</Button>
            </div>
            <div>
                <Table dataSource={products} columns={columns} rowKey="id" />
            </div>
            <Modal
                title={selectedProduct ? 'Edit Product' : 'Add Product'}
                open={isModalVisible}
                onCancel={closeModal}
                footer={null}
            >
                {
                    isModalVisible ? (
                        <ProductForm key={formKey} initialValues={selectedProduct} isEdit={!!selectedProduct} closeModal={closeModal} />
                    ) : (
                        <ProductView />
                    )
                }
            </Modal>
        </div>
    );
}

export default ProductList;
