import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../cart/cartSlice';
import { addProductToWishlist, removeProductFromWishlist } from '../../cart/wishlistSlice';
import { addedToCartToast } from '../../utils/todoCats';
import DisplayToast from '../../utils/DisplayTosty';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from '../../components/prifile/Profile.jsx';
import './ProductDetail.scss';
import { FaRegHeart } from 'react-icons/fa';
import Styles from '../../components/mens/men.module.scss';
import Loader from "../../components/Loader.jsx";

const NEXT_PUBLIC_BASE_API = 'https://fakestoreapi.com/products';

const ProductsDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const { isLoggedIn, modalOpen } = useSelector((state) => state.auth);
  const wishlist = useSelector((state) => state.wishlist.products);
  const cart = useSelector((state) => state.cart.cart);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productDetailData = async () => {
      try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API}/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
        setIsInWishlist(wishlist.some((item) => item.id === data.id));
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data', error);
      }
    };
    productDetailData();

  }, [id, wishlist]);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await fetch(NEXT_PUBLIC_BASE_API);
        const data = await response.json();
        if (product) {
          const filteredProducts = data.filter(
            (item) => item.category === product.category && item.id !== product.id
          );
          setSimilarProducts(filteredProducts);
        }
      } catch (error) {
        console.error('Error fetching similar products', error);
      }
    };
    fetchSimilarProducts();
  }, [product]);

  const cartHandler = (product) => {
    if (isLoggedIn) {
      dispatch(addProduct({ ...product, quantity: 1 }));
      toast.success(addedToCartToast);
    } else {
      toast.error('You must be logged in to add items to the cart.');
      dispatch(updateModal(true));
    }
  };

  const wishlistHandler = (product) => {
    if (isLoggedIn) {
      if (isInWishlist) {
        dispatch(removeProductFromWishlist(product.id));
        toast.success('Removed from wishlist!');
      } else {
        dispatch(addProductToWishlist(product));
        toast.success('Added to wishlist!');
      }
      setIsInWishlist(!isInWishlist);
    } else {
      toast.error('You must be logged in to add items to the wishlist.');
      dispatch(updateModal(true));
    }
  };

  const productDetailsHandler = (id) => {
    navigate(`../product/${id}`);
    setLoading(true);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
          <div className="productDetailsContaine">
  <div className="productDetailsLeft">
    <img src={product.image} alt={product.title} />
  </div>
  <div className="productDetailsRight">
    <h1>{product.title}</h1>
    <div className="priceContainer">
      <span className="discountedPrice">₹{product.price}</span>
    </div>
    <p className="description">{product.description}</p>
    <div className="sizeContainer">
     
    </div>
    <div className="buttoncontainer">
      <button onClick={() => cartHandler(product)}>ADD TO CART</button>
      <button onClick={() => wishlistHandler(product)}>
        <FaRegHeart style={{ color: isInWishlist ? 'red' : 'black' }} /> ADD TO WISHLIST
      </button>
    </div>
  </div>
</div>

          </div>
          <div style={{ marginTop: "60px", marginLeft: "30px" }}>
            <h1>Similar Products</h1>
            <ul className={Styles.cards} style={{ marginTop: "10px" }}>
              {similarProducts.map((product) => (
                <li key={product.id} className={Styles.card} onClick={() => productDetailsHandler(product.id)}>
                  <div className={Styles.cardImageWrapper}>
                    <img src={product.image} alt={product.title} className={Styles.cardImage} />
                  </div>
                  <div className={Styles.cardContent}>
                    <h3 className={Styles.cardTitle}>{product.title}</h3>
                    <p className={Styles.cardPrice}>₹ {product.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <ToastContainer />
      <DisplayToast />
      {modalOpen && <Profile />}
    </>
  );
};

export default ProductsDetails;
