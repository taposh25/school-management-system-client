import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import image_1 from "../../../assets/image1.jpg";
import image_2 from "../../../assets/image2.jpg";
import image_3 from "../../../assets/image3.jpg";

const Banner = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      interval={10000}
      showThumbs={false}
      showStatus={false}
    >
      <div>
        <img src={image_1} alt="Banner 1" />
      </div>
      <div>
        <img src={image_2} alt="Banner 2" />
      </div>
      <div>
        <img src={image_3} alt="Banner 3" />
      </div>
    </Carousel>
  );
};

export default Banner;
