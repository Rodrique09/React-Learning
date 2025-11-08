import axios from 'axios';
import { useState } from 'react';
import { formatMoney } from '../../utils/money';
import CheckmarkIcon from '../../assets/images/icons/checkmark.png';
export function Product({ product, loadCart }) {

    const [quantity, setQuantity] = useState(1);
    const [showAddedMessage, setShowAddedMessage] = useState(false);

    const addToCart = async () => {
        await axios.post('/api/cart-items', {
            productId: product.id,
            quantity
        });
        await loadCart();
        setShowAddedMessage(true);

        setTimeout(()=>{
            setShowAddedMessage(false);
        },2000)

    }

    const selectQuantity = (event) => {
        const quantitySelected = Number(event.target.value)
        setQuantity(quantitySelected);
    }

    // Import all product images
    const productImages = import.meta.glob('../../assets/images/products/*.{jpg,png,jpeg}', {
        eager: true,
        import: 'default'
    });

    // Import all rating images
    const ratingImages = import.meta.glob('../../assets/images/ratings/*.png', {
        eager: true,
        import: 'default'
    });

    // Helper function to get the correct image path
    const getProductImage = (imagePath) => {
        // Convert the path from products.js to match the import.meta.glob pattern
        const fileName = imagePath.split('/').pop(); // Get just the filename
        const fullPath = `../../assets/images/products/${fileName}`;
        return productImages[fullPath];
    };

    const getRatingImage = (stars) => {
        const rating = stars * 10;
        const fullPath = `../../assets/images/ratings/rating-${rating}.png`;
        return ratingImages[fullPath];
    };
    return (
        <div className="product-container"
            data-testid = "product-container">
            <div className="product-image-container">
                <img className="product-image"
                    data-testid = "product-image"
                    src={getProductImage(product.image)} />
            </div>

            <div className="product-name limit-text-to-2-lines">
                {product.name}
            </div>

            <div className="product-rating-container">
                <img className="product-rating-stars"
                    data-testid="product-rating-stars"
                    src={getRatingImage(product.rating.stars)} />
                <div className="product-rating-count link-primary">
                    {product.rating.count}
                </div>
            </div>

            <div className="product-price">
                {formatMoney(product.priceCents)}
            </div>

            <div className="product-quantity-container">
                <select value={quantity} onChange={selectQuantity}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart" style={{
                opacity: showAddedMessage ? 1 : 0,
            }}>
                <img src={CheckmarkIcon} />
                Added
            </div>

            <button className="add-to-cart-button button-primary"
            data-testid="add-to-cart-button"
                onClick={addToCart}>
                Add to Cart
            </button>
        </div >
    )
}