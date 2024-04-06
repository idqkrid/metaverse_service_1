import React, {useState} from 'react';
import styles from './styles.module.css';

/* react-slick */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const images = [
  "/images/sliderImage1.PNG",
  "/images/sliderImage2.PNG",
  "/images/sliderImage3.PNG",
  "/images/sliderImage4.PNG",
  "/images/sliderImage5.PNG",
  "/images/sliderImage6.PNG",
];


const BodyContentOne = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    centerPadding: "60px",
    centerMode: true,
    slidesToScroll: 1,
    autoplay: true,
    afterChange: (currentSlide) => setCurrentPage(currentSlide + 1)
  }
  return (
    <div className={styles.header}>
      <Slider className={styles.carousel} {...settings}>
        {images.map((image, index) => (
          <div key={index} className={styles.wrap}>
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </Slider>
      <div className={styles.paging}>
        <span className={styles.customPaging}>
          <span className={styles.currentPage}>
            {/* 숫자 앞에 0 붙이기 */}
            {currentPage.toString().padStart(2, "0")}
          </span>
          /
          <span className={styles.totalPage}>
            {images.length.toString().padStart(2, "0")}
          </span>
        </span>
      </div>
    </div>
  )
}

export default BodyContentOne;