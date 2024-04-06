import React from 'react';
import styles from './styles.module.css';

const BodyContentFive = () => {
  return (
    <div>
      <div className={styles.header}>
      <div className={styles.body}>
        <div className={styles.bodyOne}>
          <div className={styles.bodyContent1}>
            <div className={styles.title}>?</div>
            <div>
              <h2>왜ZEP을 <br />
                써야하나요?</h2>
              <p>수많은 메타버스 중 왜 <br />
                ZEP이어야만 할까요?</p>
            </div>
          </div>
          <div className={styles.bodyContent2}>
            <div>
              <h3>비대면 소통이 즐거워집니다</h3>
              <p>따라가기, 돌아다니기, 줄서기, 앉기, 점프 등              
               다양한 공간 기반의 인터랙션이 가능 합니다.</p>
            </div>
            <img src="/images/bodyFive1.png" />
            </div>
        </div>
        <div className={styles.bodyTwo}>  
          <div className={styles.bodyContent3}>
            <div>
              <h3>최대 15만 명 동시 접속이 가능합니다</h3>
              <p>500명 단위로 자동으로 채널이 나눠지며, <br />              
              최대 300개의 채널이 개설됩니다.</p>
            </div>
            <img src="/images/bodyFive2.png" />
          </div>
          <div className={styles.bodyContent4}>
            <div>
              <h3>쉽고 가볍습니다</h3>
              <p>클릭 한 번으로 설치, 가입 없이 입장이 가능합니다.</p>
            </div>
            <img src="/images/bodyFive3.png" />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default BodyContentFive;