import React, { useEffect, useState } from 'react';
import Flickity from 'react-flickity-component';
import 'flickity/css/flickity.css'; // Ensure you have the Flickity CSS file
import Mens from '../../components/mens/Mens';
import Women from '../../components/womens/Women';
import Jewelery from '../../components/jewelery/Jewelery';
import Loader from '../../components/Loader';

const Home = () => {
  const [loading,setLoading]=useState(true)




  const images = [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1483181994834-aba9fd1e251a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1483181957632-8bda974cbc91?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const flickityOptions = {
    wrapAround: true,
    autoPlay: 5000,
    pauseAutoPlayOnHover: false,
    imagesLoaded: true,
    pageDots:true,
   
  };


  useEffect(() => {
    const imagePromises = images.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
      });
    });

    Promise.all(imagePromises).then(() => setLoading(false));
  }, []);

  return (
    <>
   

      <Flickity className={'carousel'} options={flickityOptions}>
        {images.map((image, index) => (
          <div
            className="carousel-cell"
            key={index}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100vh', // or any other height you prefer
            }}
          
          >
            {/* Optional caption or content inside the slide */}
            {/* <span style={{background:"white",border:"1px solid",width:"30px"}}>{index + 1}</span> */}
          </div>
        ))}
      </Flickity>
  
    
{loading ? (
<Loader/>
):(

 <div style={{marginTop:"100px" , marginLeft:"20px"}}>
  <center style={{marginBottom:"30px", textDecoration:"underline"}}>NEW SALE</center>
      <Women />
  <center style={{marginBottom:"30px", textDecoration:"underline"}}>MEN'S</center>
      <Mens />
  <center style={{marginBottom:"30px", textDecoration:"underline"}}>JEWELERY</center>
  <Jewelery/>


 </div>
)}
    </>
  );
};

export default Home;
