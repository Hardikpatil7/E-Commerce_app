import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addProduct, editProduct } from '../Actions/ProductActions';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Button, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './Product.css';

const ProductForm = ({ initialValues, isEdit, closeModal }) => {

    const dispatch = useDispatch();

    const handleImageUpload = (file, form) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            form.setFieldValue('image', event.target.result);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = (values, actions) => {
        const product = { id: uuidv4(), ...values };
        if (!values.name || !values.image) {
            actions.setSubmitting(false);
            return;
        }
        console.log("product", product);
        if (isEdit) {
            dispatch(editProduct(product));
        } else if (product) {
            dispatch(addProduct(product));
        }
        closeModal(false);
    };

    return (
        <div className="product-form-container">
            <Formik
                initialValues={initialValues || {
                    name: '',
                    category: '',
                    description: '',
                    image: '',
                    price: '',
                    discountPrice: '',
                }}
                onSubmit={onSubmit}>
                {({ values, setFieldValue }) => (
                    <Form>
                        <label htmlFor="Name">Name</label>
                        <Field name="name" type="text" as={Input} />
                        <ErrorMessage name="name" />

                        <label htmlFor="Category">Category</label>
                        <Field name="category" type="text" as={Input} />
                        <ErrorMessage name="category" />

                        <label htmlFor="Description">Description</label>
                        <Field name="description" type="text" as={Input} />
                        <ErrorMessage name="description" />

                        <label htmlFor="Image">Image</label>
                        <Field name="image">
                            {({ form, field }) => (
                                <Upload
                                    accept="image/*"
                                    maxCount={1}
                                    fileList={values?.image ? [{ uid: 'image', name: 'Uploaded Image' }] : []}
                                    customRequest={({ file }) => handleImageUpload(file, form, setFieldValue)}
                                >
                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                </Upload>
                            )}
                        </Field>
                        <ErrorMessage name="image" />

                        <label htmlFor="Price">Price</label>
                        <Field name="price" type="text" as={Input} />
                        <ErrorMessage name="price" />

                        <label htmlFor="Discount Price">Discount Price</label>
                        <Field name="discountPrice" type="text" as={Input} />
                        <ErrorMessage name="discountPrice" />

                        <div className='form-btn'>
                            <button className='btn-submit' type="submit">Submit</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default ProductForm;
