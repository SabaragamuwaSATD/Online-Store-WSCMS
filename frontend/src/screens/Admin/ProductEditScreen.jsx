import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { 
  useUpdateProductMutation, 
  useGetProductDetailsQuery, 
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';


const ProductEditScreen = () => {
    const { id: productId } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInstoke, setCountInStoke] = useState(0);
    const [description, setDescription] = useState('');

    const { 
        data:product, 
        isLoading, 
        refetch, 
        error,
    } = useGetProductDetailsQuery(productId);

    const [updateProduct, {isLoading: loadingUpdate}] = useUpdateProductMutation();

    const [uploadProductImage, {isLoading: loadingUpload }] = useUploadProductImageMutation();

    const navigate = useNavigate();

    useEffect(() => {
      if(product) {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStoke(product.countInstoke);
        setDescription(product.description);

      }
    }, [product]);

    const submitHandler = async (e) => {
      e.preventDefault();
      const updatedProduct = {
        productId,
        name,
        price,
        image,
        brand,
        category,
        countInstoke,
        description,
      };

      const result = await updateProduct(updatedProduct);

      if(result.error){
        toast.error(result.error);
      }else{
        toast.success('Product updated');
        navigate('/admin/productlist');
      }
    };

    const uploadFileHandler = async (e) => {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      try {
        const res = await uploadProductImage(formData).unwrap();
        toast.success(res.message);
        setImage(res.image);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Back
      </Link>
       <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader/>}

        { isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
          
          <Form onSubmit={submitHandler}>

            <FormGroup controlId='name' className='my-2'>
              <FormLabel>Name</FormLabel>
              <FormControl
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}>
              </FormControl>
            </FormGroup>
              
            <FormGroup controlId='price' className='my-2'>
              <FormLabel>Price</FormLabel>
                <FormControl
                  type='number'
                  placeholder='Enter price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}>
              </FormControl>
            </FormGroup>

            <FormGroup controlId='image' className='my-2'>
              <FormLabel>Image</FormLabel>
              <FormControl
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage }></FormControl>
              <FormControl
                type='file'
                label='Choose file'
                onChange={uploadFileHandler}></FormControl>
            </FormGroup>
            {loadingUpload && <Loader/>}

            <FormGroup controlId='brand' className='my-2'>
              <FormLabel>Brand</FormLabel>
                <FormControl
                  type='text'
                  placeholder='Enter brand'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}>
              </FormControl>
            </FormGroup>

            <FormGroup controlId='countInstoke' className='my-2'>
              <FormLabel>Count In Stock</FormLabel>
                <FormControl
                  type='number'
                  placeholder='Enter count'
                  value={countInstoke}
                  onChange={(e) => setCountInStoke(e.target.value)}>
              </FormControl>
            </FormGroup>

            <FormGroup controlId='category' className='my-2'>
              <FormLabel>Category</FormLabel>
                <FormControl
                  type='text'
                  placeholder='Enter category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}>
              </FormControl>
            </FormGroup>

            <FormGroup controlId='description' className='my-2'>
              <FormLabel>Description</FormLabel>
                <FormControl
                  type='text'
                  placeholder='Enter description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}>
              </FormControl>
            </FormGroup>

            <Button
            type='submit'
            variant='primary'
            className='my-2'
            >Update</Button>

          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen