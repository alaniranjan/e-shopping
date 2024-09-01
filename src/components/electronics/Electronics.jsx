import React,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import NEXT_PUBLIC_BASE_API from '../../api/apiSlice';
import Styles from '../mens/men.module.scss'
import Loader from '../Loader';

const Electronics = () => {
    const [electronics,setElectronics]=useState([]);
    const [loading,setLoading]=useState(true)
    const navigate=useNavigate();


   useEffect(()=>{
    const fetchElectronics =  async ()=>{
        try {
            const response = await fetch(NEXT_PUBLIC_BASE_API);
            const data = await response.json();
            const filteredData = data.filter((item)=>item.category === "electronics");  
            setElectronics(filteredData);
            setLoading(false)
            
        } catch (error) {
            console.log(error,"Error feching clothing data")
            setLoading(false)
            
        }
    }
    fetchElectronics();
   },[])
 

const handlerDetailsPage =(id)=>{
      navigate(`../product/${id}`)

}

  return (
    <>
    {loading ? (
<Loader/>
    ):(

    <ul className={Styles.cards}>
    {electronics.map((product) => (
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

export default Electronics