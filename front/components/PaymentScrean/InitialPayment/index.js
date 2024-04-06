import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import styles from '../InitialPayment/styles.module.css';

const InitialPayment = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const toggleOptions = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOptionsVisible(false);
  };

  return (
    <div className={styles.initialDevTitle}>
      <div className={styles.initialDev1}></div>
      <div className={styles.initialDev2}>
        <div className={styles.initialDevSamilTitle}>
          <div className={styles.title}> ✨ 적합한 플랜을 합리적인 가격으로 이용해보세요.</div>
        </div>
        <div className={styles.initialDevSamilContent}>
          <div className={styles.content}>
            <div className={styles.contentTitle}>최대 동시 접속자 수</div>
            <div className={styles.selectMenu}>
              <div className={styles.selectBtn} onClick={toggleOptions}>
                <sapn className={styles.selectText}>
                  {selectedOption ? selectedOption : '선택하세요'}
                </sapn>
              </div>
              {isOptionsVisible && (
                <ul className={styles.options}>
                  <li className={styles.option} onClick={() => handleOptionClick('Github1')}>
                    <span className={styles.optionText}>Github1</span>
                  </li>
                  <li className={styles.option} onClick={() => handleOptionClick('Github2')}>
                    <span className={styles.optionText}>Github2</span>
                  </li>
                  <li className={styles.option} onClick={() => handleOptionClick('Github3')}>
                    <span className={styles.optionText}>Github3</span>
                  </li>
                  <li className={styles.option} onClick={() => handleOptionClick('Github4')}>
                    <span className={styles.optionText}>Github4</span>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        
      </div>
      <div className={styles.initialDev3}></div>
    </div>
  )
}

export default InitialPayment;