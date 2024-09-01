import React, { useEffect, useState } from 'react';
import NEXT_PUBLIC_BASE_API from '../../api/apiSlice';
import { useNavigate } from 'react-router-dom';
import Styles from './men.module.scss';
import Loader from '../Loader';

const Mens = () => {
  const [mensClothing, setMensClothing] = useState([]);
  const [loading,setLoading]=useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMensClothing = async () => {
      try {
        const response = await fetch(NEXT_PUBLIC_BASE_API);
        const data = await response.json();
        const filteredData = data.filter(item => item.category === "men's clothing");
        setMensClothing(filteredData);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching men's clothing data", error);
        setLoading(false)

      }
    };

    fetchMensClothing();
  }, []);

  const handlerDetailsPage = (id) => {
    navigate(`../product/${id}`);
  };

  return (
    <>
    {loading?(
      <Loader/>
    ):(

    <ul className={Styles.cards}>
      {mensClothing.map((product) => (
        <li key={product.id} className={Styles.card} onClick={() => handlerDetailsPage(product.id)}>
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
    )}
    </>
  );
};

export default Mens;
