import React from 'react';
import { RiMenu2Fill } from "react-icons/ri";
import styles from './Navbar.module.scss';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  const cartItem = useSelector((data) => data.cart?.cart);
  const { isLoggedIn, username } = useSelector((state) => state.auth);
  
  return (
    <>
      <header className={styles.header}>
        <nav>
          <div className={styles.logo}>
            <Link to="/">N Shopping</Link>
          </div>
          <ul className={styles.menu}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/mens">Men's</Link></li>
            <li><Link to="/women">Women's</Link></li>
            <li><Link to="/jewelery">Jewelery</Link></li>
            <li><Link to="/electronics">Electronics</Link></li>
            <li><Link to="/search"><FiSearch className={styles.icons}/></Link></li>
            <li><Link to="/wishlist"><FaRegHeart className={styles.icons}/></Link></li>
            <li><Link to="/profile"><CiUser className={styles.icons}/>{isLoggedIn && ` ${username.charAt(0).toUpperCase()}`}</Link></li>
            <li>
              <Link to="/cart">
                <div className={styles.cart}>
                  <PiShoppingCartSimpleBold />
                  <span>{cartItem ? cartItem.length : 0}</span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;
