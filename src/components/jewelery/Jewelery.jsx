import React, {useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NEXT_PUBLIC_BASE_API from '../../api/apiSlice';
import Styles from '../mens/men.module.scss'
import Loader from '../Loader';
const Jewelery = () => {
    const [jewelerydata, setJeweleryData] = useState([]);
    const [loading,setLoading]=useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const response = await fetch(NEXT_PUBLIC_BASE_API);
                const data = await response.json();
                const filterData = data.filter(item => item.category === "jewelery");
                setJeweleryData(filterData);
                setLoading(false)
            } catch (error) {
                console.log(error, "Fetching data in Jewelery");
                setLoading(false)

            }
        }
        fetchingData()
    }, [])



    const handlerDetailsPage = (id) => {
        navigate(`../product/${id}`)
    }

    return (
      <>
      {loading ? (
<Loader/>
      ):(

        <ul className={Styles.cards}>
        {jewelerydata.map((product) => (
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

export default Jewelery