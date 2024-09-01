import { MdClose } from "react-icons/md";
import "./Search.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Search = ({ setShowSearch }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const navigate = useNavigate();

  const handlerCloseSearch = () => {
    setShowSearch(false);
  };

  useEffect(() => {
    // Fetch data from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  const productDetailHandler = (id) => {
    navigate(`/product/${id}`);  
    handlerCloseSearch(); 
  };
  const productDetail = (id) => {
    navigate(`/`);
   
  };

  return (
    <div className="search-model">
      <div className="form-field">
        <input
          type="text"
          autoFocus
          placeholder="Search for products"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <MdClose className="close-btn" onClick={productDetail} />
      </div>
      <div className="search-result-content">
        {filteredProducts.length > 0 ? (
          <div className="search-result">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="search-result-item"
                onClick={() => productDetailHandler(product.id)}
              >
                <div className="img-container">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="prod-details">
                  <span className="name">{product.title}</span>
                  <span className="desc">₹{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-products-found">No products found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
