import axios from 'axios';
import { useEffect,useState } from 'react';
import './HomePage.css';
import { Header } from '../../components/Header.jsx';
import ProductsGrid from './ProductsGrid';
// We don't need this static data import anymore since we are fetching
// the data using useState and useEffect
// import { products } from '../../starting-code/data/products.js';

export const HomePage = ({cart}) => {
    
    const [products, setProducts] = useState([]);

    // We used fetch() before, but to made the code less complex for now, we are using axios 
    // directly here

    // Also we need to use useEffect to avoid infinite loop of requests
    useEffect(() => {
        const getHomeData = async () => {
                  const response = await axios.get('/api/products')
            setProducts(response.data);
        };
        getHomeData();
    },[]); // [] is an empty array of dependencies,
    // so this effect runs only once when the component mounts

    return (
        <>
            <title>Home Page</title>
            <Header cart={cart}/>
            <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
            <div className="home-page">
            <ProductsGrid products={products}/>
            </div>
        </>
    )
};