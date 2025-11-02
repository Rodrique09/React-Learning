import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import './HomePage.css';
import { Header } from '../../components/Header.jsx';
import ProductsGrid from './ProductsGrid';
// We don't need this static data import anymore since we are fetching
// the data using useState and useEffect
// import { products } from '../../starting-code/data/products.js';

export const HomePage = ({ cart, loadCart }) => {

    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
    // We used fetch() before, but to make the code less complex for now, we are using axios 
    // directly here

    // Also we need to use useEffect to avoid infinite loop of requests
    useEffect(() => {
        const getHomeData = async () => {
            const urlPath = search ? `/api/products?search=${search}` : '/api/products';
            const response = await axios.get(urlPath);
            setProducts(response.data);
        };
        getHomeData();
    }, [search]); 

    return (
        <>
            <title>Home Page</title>
            <Header cart={cart} />
            <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </>
    )
};