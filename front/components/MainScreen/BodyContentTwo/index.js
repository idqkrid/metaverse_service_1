import React, {useCallback, useState} from 'react';
import styles from './styles.module.css';

import Router from 'next/router';

/* react-slick */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const images = {
  "행사": [
    "/images/sliderImage1.PNG",
    "/images/sliderImage1.PNG",
    "/images/sliderImage1.PNG",
    "/images/sliderImage1.PNG",
    "/images/sliderImage1.PNG"
  ],
  "오피스": [
    "/images/sliderImage2.PNG",
    "/images/sliderImage2.PNG",
    "/images/sliderImage2.PNG",
    "/images/sliderImage2.PNG",
    "/images/sliderImage2.PNG"
  ],
  "교육": [
    "/images/sliderImage3.PNG",
    "/images/sliderImage3.PNG",
    "/images/sliderImage3.PNG",
    "/images/sliderImage3.PNG",
    "/images/sliderImage3.PNG"
  ],
  "관광": [
    "/images/sliderImage4.PNG",
    "/images/sliderImage4.PNG",
    "/images/sliderImage4.PNG",
    "/images/sliderImage4.PNG",
    "/images/sliderImage4.PNG"
  ],
  "게임": [
    "/images/sliderImage5.PNG",
    "/images/sliderImage5.PNG",
    "/images/sliderImage5.PNG",
    "/images/sliderImage5.PNG",
    "/images/sliderImage5.PNG"
  ],
  "크립토": [
    "/images/sliderImage6.PNG",
    "/images/sliderImage6.PNG",
    "/images/sliderImage6.PNG",
    "/images/sliderImage6.PNG",
    "/images/sliderImage6.PNG"
  ],
};

const BodyContentTwo = () => {
  const [currentSlide, setCurrentSlide] = useState("행사")

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    centerPadding: "60px",
    centerMode: true,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    dotsClass: "slick-dots slick-thumb",
    afterChange: (index) => setCurrentSlide(index + 1),
  }

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const spaceButton = useCallback((e) => {
    e.preventDefault();

    Router.push('/Space')
  })

  return (
    <div className={styles.header}>
      <h2>ZEP 공간을 지금 바로 체험해보세요</h2>
      <div className={styles.categoryCheck}>
        {["행사", "오피스", "교육", "관광", "게임", "크립토"].map((page) => (
          <button
            key={page}
            className={page === currentSlide ? `${styles.categoryButton} ${styles.categoryButtonActive}` : styles.categoryButton}
            onClick={() => handleDotClick(page)}>{page}
          </button>
        ))}
      </div>
      <Slider className={styles.carousel} {...settings} initialSlide={currentSlide - 1}>
        {images[currentSlide]?.map((image, index) => (
          <div key={index} className={styles.wrap}>
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </Slider>
      <div className={styles.moreSpace} onClick={spaceButton}>
        스페이스 더보기
      </div>
    </div>
  );
}

export default BodyContentTwo;