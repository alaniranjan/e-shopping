import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeProduct, clearCart, incrementQuantity, decrementQuantity } from '../../cart/cartSlice';
import { removedFromCartToast, clearProducts } from '../../utils/todoCats';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DisplayToast from '../../utils/DisplayTosty';
import EmptyCart from '../../assets/empty.png';
import './Carts.scss';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearHandler = () => {
    dispatch(clearCart());
    toast.error(clearProducts);
  };

  const productDetailHandler = (id) => {
    navigate(`../product/${id}`);
  };

  const handlerRemove = (id) => {
    dispatch(removeProduct(id));
    toast.error(removedFromCartToast);
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  console.log("Cart Items:", cartItems);

  return (
    <>
      <div className='mainContainer'>
        {cartItems.length > 0 ? (
          <>
            <div className="cartHeader">
              <h2>Review Cart</h2>
              <span>{cartItems.length} ITEMS</span>
              <button className="clearButton" onClick={clearHandler}>Remove All</button>
            </div>
            {cartItems.map((product) => (
              <div key={product.id} className="cartItem">
                <div className="cartItemImage" onClick={() => productDetailHandler(product.id)}>
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="cartItemDetails">
                  <p>{product.title}</p>
                  <span>{product.weight || `x ${product.quantity}`}</span>
                  <div className="cartItemPrice">
                    <span className="discountedPrice">₹ {product.price}</span>
                    {product.originalPrice && (
                      <span className="originalPrice">₹ {product.originalPrice}</span>
                    )}
                  </div>
                  <div className="cartItemActions">
                    <button onClick={() => handleDecrement(product.id)}>-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => handleIncrement(product.id)}>+</button>
                    <button onClick={() => handlerRemove(product.id)} className="removeButton">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="emptyCartContainer">
            <img src={EmptyCart} alt="Empty Cart" />
            <Link to={"/"}>
              <button className='cartbutton'>Start Shopping</button>
            </Link>
          </div>
        )}
      </div>
      <ToastContainer />
      <DisplayToast />
    </>
  );
};

export default Cart;
