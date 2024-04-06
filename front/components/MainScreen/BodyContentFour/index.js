import React, {useCallback, useState} from 'react';
import styles from './styles.module.css';

import Router from 'next/router';

const BodyContentFour = () => {

  const InquireButton = useCallback((e) => {
    e.preventDefault();

    Router.push('/Inquire')
  })

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <div>?</div>
        <h2>ZEP으로 무엇을 할 수 있나요?</h2>
      </div>
      <div className={styles.body}>
        <div className={styles.bodyOne}>
          <div className={styles.bodyContent1}>
            <div>
              <h3>오피스, 강의실 등 상시 공간</h3>
              <p>원격으로도 실제 공간에 함께 있는 것처럼 <br /> 
              자연스럽게 소통할 수 있습니다.</p>
            </div>
            <img src="/images/body1.avif" />
          </div>
          <div className={styles.bodyContent2}>
            <div>
              <h3>쉽고 재밌는 비대면 행사</h3>
              <p>실제 행사처럼 생생한 이벤트를 <br />              
              공간 제약 없이 개최할 수 있습니다.</p>
            </div>
            <img src="/images/body2.avif" />
          </div>
        </div>
        <div className={styles.bodyTwo}>
          <div className={styles.bodyContent1}>
            <div>
              <h3>인터랙티브한 컨텐츠 제작</h3>
              <p>여러 분야에 스토리와 퀴즈, 게임 등의 <br />
              인터랙티브 요소를 접목시킬 수 있습니다.
              </p>
            </div>
            <img src="/images/body3.avif" />
          </div>
          <div className={styles.bodyContent2}>
            <div>
              <h3>재미있어지는 교육</h3>
              <p>유튜브, 이미지 등 미디어와, 퀴즈, NPC 등을 통해 <br />
              학습을 재미있고 효과적으로 만들 수 있습니다.
              </p>
            </div>
            <img src="/images/body4.avif" />
          </div>
        </div>
      </div>
      <div className={styles.button} onClick={InquireButton}>
        도입 문의하기
      </div>
    </div>
  )
}

export default BodyContentFour;

