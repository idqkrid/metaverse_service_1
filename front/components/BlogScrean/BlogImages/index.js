import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

/* react-slick */
import Slider from "react-slick";
/* react-slick */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BlogImages = ({ images }) => {
  const [sliderData, setSliderData] = useState(images[0]);

  const handleClick = (index) => {
    console.log(index);
    const slider = images[index];
    setSliderData(slider);
  }

  return (
    <>
      <img className={styles.img} src={`http://localhost:3065/${sliderData.src}`} />
      <div className={styles.flex_row}>
        {
          images.map((data, index) =>
            <div className={styles.thumbnail}>
              <img key={index} src={`http://localhost:3065/${data.src}`}
              onClick={() => handleClick(index)} height="70" width="100" />
            </div>
          )
        }
      </div>
      {/* <Slider className={styles.carousel} {...settings}>
        {
          images.map((image, index) => (
          <div key={index} className={styles.wrap}>
            <img
              role="presentation"
              src={`http://localhost:3065/${image.src}`}
              alt={image.src}
            />
          </div>
        ))}
      </Slider> */}
    </>
  );
};

export default BlogImages;