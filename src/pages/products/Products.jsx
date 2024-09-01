import React, { useState, useEffect } from 'react';
import NEXT_PUBLIC_BASE_API from '../../api/apiSlice';
import { useNavigate } from 'react-router-dom';
import './Products.css'; 
import Styles from "../../components/mens/men.module.scss";
import Loader from "../../components/Loader"; // Import the Loader component
import { CgLaptop } from 'react-icons/cg';

const Products = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true); // Add loading state

  const navigate = useNavigate();

  const handlerDetailsPage = (id) => {
    navigate(`../product/${id}`);
  };

  const handlerFilter = (e) => {
    setCategory(e.target.value);
  };

  const handlerSortFilter = (e) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await fetch(NEXT_PUBLIC_BASE_API);
        const result = await response.json();
        setData(result);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchProductsData();
    console.log(fetchProductsData,"data")
  }, []);

  // Filter the category products
  const filterData = category === "all" ? data : data.filter((product) => product.category === category);

  // Sort Filter data
  const sortFunction = {
    "a-to-z": (a, b) => a.title.localeCompare(b.title),
    "z-to-a": (a, b) => b.title.localeCompare(a.title),
    "high-price": (a, b) => b.price - a.price,
    "low-price": (a, b) => a.price - b.price,
  };

  const sortFilterData = [...filterData].sort(sortFunction[sort] || ((a, b) => 0));

  return (
    <>
      {loading ? (
        <Loader /> // Show loader while loading
      ) : (
        <>
          <label>Filter:</label>
          <select id="category" value={category} onChange={handlerFilter}>
            <option value="all">All</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </select>
          <br />
          <br />
          <label>Sort by:</label>
          <select id="sort" value={sort} onChange={handlerSortFilter}>
            <option value="default">Default</option>
            <option value="a-to-z">A-to-Z products</option>
            <option value="z-to-a">Z-to-A products</option>
            <option value="high-price">High-Price</option>
            <option value="low-price">Low-Price</option>
          </select>
          <ul className={Styles.cards}>
            {sortFilterData.map((product) => (
              <li key={product.id} className={Styles.card} onClick={() => handlerDetailsPage(product.id)}>
                <div className={Styles.cardImageWrapper}>
                  <img src={product.image} alt={product.title} className={Styles.cardImage} />
                </div>
                <div className={Styles.cardContent}>
                  <h3 className={Styles.cardTitle}>{product.title}</h3>
                  <p className={Styles.cardPrice}>₹ {product.price}</p>
                  {/* <p className={Styles.cardDescription}>{product.description.slice(0, 100)}</p> */}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Products;
