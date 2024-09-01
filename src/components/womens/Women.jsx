import React, { useEffect, useState } from 'react'
import styles from './Women.module.scss'
import NEXT_PUBLIC_BASE_API from '../../api/apiSlice';
import { useNavigate } from 'react-router-dom';
import Styles from '../mens/men.module.scss';
import Loader from '../Loader';

const Women = () => {
const [womenClothing,setWomensClothing]=useState([]);
const [loading,setLoading]=useState(true)
const navigate = useNavigate();
useEffect(()=>{
 const fetchWomenData=async()=>{
    try {
        const response = await fetch(NEXT_PUBLIC_BASE_API);
        const data = await response.json();
        const filteredData = data.filter(item => item.category === "women's clothing");
        setWomensClothing(filteredData)  
        setLoading(false)
    } catch (error) {
        console.log("Eror fetching men's clothing data")
        setLoading(false)

    }
 }
 fetchWomenData();
},[])

const handlerDetailsPage=(id)=>{
  navigate(`../product/${id}`)
}

  return (
    <>
    {loading ?(
      <Loader/>
    ):(

    <ul className={Styles.cards}>
      {womenClothing.map((product) => (
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
    )}
    </>
  )
}

export default Women