import { useState, useEffect } from 'react'
import axios from 'axios'
import { CheckoutHeader } from './CheckoutHeader'
import './CheckoutPage.css'
import OrderSummary from './OrderSummary'
import PaymentSummary from './PaymentSummary'

export const CheckoutPage = ({ cart }) => {

    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null); //object to hold payment summary details

    useEffect(() => {
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            .then((response) => {
                setDeliveryOptions(response.data);
            });
        axios.get('/api/payment-summary')
            .then((response) => {
                setPaymentSummary(response.data);
            });
    }, []);

    return (
        <>
            <title>Checkout Page</title>
            <CheckoutHeader />
            <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />
            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
                    <PaymentSummary paymentSummary={paymentSummary} />
                </div>
            </div>
        </>
    )
}