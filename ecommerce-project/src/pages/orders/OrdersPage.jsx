import { useState, useEffect, Fragment } from 'react';
import './OrdersPage.css'
import { Header } from '../../components/Header'
import axios from 'axios';
import { OrdersGrid } from './OrdersGrid';


export const OrdersPage = ({ cart , loadCart}) => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const fetchOrders = async () => {
        const response = await axios.get('/api/orders?expand=products')
                setOrders(response.data);
        }
        fetchOrders();
    }, [])
    return (
        <>
            <title>Orders Page</title>
            <Header cart={cart} />
            <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />
            <div className="orders-page">
                <div className="page-title">Your Orders</div>
                <OrdersGrid orders={orders} loadCart={loadCart}/>
            </div>
        </>
    )
}