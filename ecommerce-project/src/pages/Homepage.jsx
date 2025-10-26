import './HomePage.css';
import { Header } from '../components/Header.jsx';
import CheckmarkIcon from '../assets/images/icons/checkmark.png';
import { products } from '../../starting-code/data/products.js';

// Import all product images
const productImages = import.meta.glob('../assets/images/products/*.{jpg,png,jpeg}', {
    eager: true,
    import: 'default'
});

// Import all rating images
const ratingImages = import.meta.glob('../assets/images/ratings/*.png', {
    eager: true,
    import: 'default'
});

// Helper function to get the correct image path
const getProductImage = (imagePath) => {
    // Convert the path from products.js to match the import.meta.glob pattern
    const fileName = imagePath.split('/').pop(); // Get just the filename
    const fullPath = `../assets/images/products/${fileName}`;
    return productImages[fullPath];
};

const getRatingImage = (stars) => {
    const rating = stars * 10;
    const fullPath = `../assets/images/ratings/rating-${rating}.png`;
    return ratingImages[fullPath];
};


export const HomePage = () => {

    fetch('http://localhost:3000/api/products')
        .then((response) => {
            return response.json()
        }).then((data) => (
            console.log(data)
        ));

    return (
        <>
            <title>Home Page</title>
            <Header />
            <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
            <div className="home-page">
                <div className="products-grid">

                    {
                        products.map((product) => {
                            return (
                                <div key={product.id} className="product-container">
                                    <div className="product-image-container">
                                        <img className="product-image"
                                            src={getProductImage(product.image)} />
                                    </div>

                                    <div className="product-name limit-text-to-2-lines">
                                        {product.name}
                                    </div>

                                    <div className="product-rating-container">
                                        <img className="product-rating-stars"
                                            src={getRatingImage(product.rating.stars)} />
                                        <div className="product-rating-count link-primary">
                                            {product.rating.count}
                                        </div>
                                    </div>

                                    <div className="product-price">
                                        ${(product.priceCents / 100).toFixed(2)}
                                    </div>

                                    <div className="product-quantity-container">
                                        <select>
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

                                    <div className="added-to-cart">
                                        <img src={CheckmarkIcon} />
                                        Added
                                    </div>

                                    <button className="add-to-cart-button button-primary">
                                        Add to Cart
                                    </button>
                                </div>
                            )
                        })}
                </div>
            </div>
        </>
    )
};