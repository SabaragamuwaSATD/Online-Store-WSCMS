import { Link } from 'react-router-dom';
import { Carousel, CarouselItem, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

import React from 'react'

const ProductCarousel = () => {
    const {data: products, isLoading, error } = useGetTopProductsQuery();


  return (
    isLoading ? <Loader/> : error ? (<Message variant='danger'>{error}</Message>
    ) : (
        <div className=" justify-content-center align-items-center" style={{ minHeight: '10px' }}>
            <Carousel pause='hover' className='custom-carousel'>
                {products.map(product => (
                    <CarouselItem key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid/>
                            <Carousel.Caption className='carousel-caption'>
                                <h2>{product.name} (Rs.{product.price})</h2>
                            </Carousel.Caption>
                        </Link>
                    </CarouselItem>
                ))}
            </Carousel>
        </div>
    )
  )
}

export default ProductCarousel