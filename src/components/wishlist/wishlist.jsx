import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeProductFromWishlist, clearWishlist } from '../../cart/wishlistSlice';
import './wishlist.scss';
import WishlistImg from '../../assets/wishlist.png';

const WishlistPage = () => {
    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.wishlist.wishlist);
    const navigate = useNavigate();
    console.log(wishlist,"data")

    const handleRemoveFromWishlist = (productId) => {
        dispatch(removeProductFromWishlist(productId));
    };

    const handleClearWishlist = () => {
        dispatch(clearWishlist());
    };

    const productDetailsHandler = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="wishlistContainer">
            {wishlist.length > 0 ? (
                <div className="wishlistContent">
                    <h2 className="wishlistHeader">My Wishlist</h2>
                    <button 
                        onClick={handleClearWishlist} 
                        className="clearWishlistButton"
                    >
                        Clear Wishlist
                    </button>
                    <ul className="wishlistItems">
                        {wishlist.map(item => (
                            <li key={item.id} className="wishlistItem">
                                <div className="wishlistItemDetails">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        onClick={() => productDetailsHandler(item.id)} 
                                        className="wishlistItemImage" 
                                    />
                                    <div className="wishlistItemInfo">
                                        <h3>{item.name}</h3>
                                        {/* <p>{item.description}</p> */}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleRemoveFromWishlist(item.id)} 
                                    className="removeButton"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="emptyWishlistContainer">
                    <img src={WishlistImg} alt="Empty Wishlist" className="emptyWishlistImage" />
                    <Link to={"/"}>
                        <button className='startShoppingButton'>Start Shopping</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
