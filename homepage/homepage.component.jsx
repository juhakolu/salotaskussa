//Pääkomponentti etusivulle
import React from "react";
import "./homepage.style.css";
import TopImage from "../../components/top-image/top-image.component";
// import Salontori from "../../assets/pictures/salontori_kevat.jpg";
// import Salontori from "../../assets/pictures/salontori_kevat_big.png";
import Kansikuva from "../../assets/pictures/kansikuva.jpg";
import HomeContent from "../../components/home-content/home-content.component"

const HomePage = () => {
  return (
    <>
      <TopImage picUrl={Kansikuva} />
      <HomeContent />
    </>
  );
};

export default HomePage;
