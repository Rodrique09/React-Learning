import { formatMoney } from "../../utils/money";
import axios from 'axios';
import { useState } from 'react';
const CartItemDetails = ({ cartItem, loadCart }) => {

    const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const deleteCartItem = (async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    })

    const updateQuantity = async () => {
        // Switch between true and false for isUpdatingQuantity.
        if (isUpdatingQuantity) {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: Number(quantity)
            });
            await loadCart();
            setIsUpdatingQuantity(false);
        } else {
            setIsUpdatingQuantity(true);
        }
    };

    const updateQuantityInput = (event) => {
        setQuantity(event.target.value);
    }

    const updateByKeys = (event) => {
        if(event.key === 'Enter'){
            updateQuantity();
        }
        if(event.key === 'Escape'){
            setQuantity(cartItem.quantity);
            setIsUpdatingQuantity(false);
        }
    }
    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity: {isUpdatingQuantity ?
                            <input className="set-quantity" type="text" value={quantity} onChange={updateQuantityInput} onKeyDown={updateByKeys}/> :
                            <span className="quantity-label">{cartItem.quantity}</span>
                        }
                    </span>
                    <span className="update-quantity-link link-primary" onClick={updateQuantity}>
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div>
        </>
    )
}

export default CartItemDetails;