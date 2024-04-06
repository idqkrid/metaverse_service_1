import React, {useState, useCallback} from 'react';
import styles from './styles.module.css';

const texts = [
  { 'title':  'ZEP 내 동시 접속 가능 인원은 몇 명까지 가능한가요?', 'context': '생성된 스페이스에 동시 접속 가능한 인원은 최대 15만 명입니다. 단, 500명이상이 접속할 경우 500명 단위로 스페이스에 채널이 나누어지게 됩니다. 프리미엄 스페이스 이용 시 채널 최대 인원 상향 및 하향 조정이 가능합니다.' },
  { 'title':  'ZEP은 유료인가요?', 'context': 'ZEP은 2023년 7월 21일부터 최대 동시 접속자 구간에 따른 스페이스 단위의 새로운 요금제를 적용했습니다. 자세한 내용은 가격 페이지를 참고해주세요. (최대 동시 접속자 20명까지는 무료로 이용 가능합니다.)' },
  { 'title':  '화면 공유 상황에서 공유자의 얼굴과 음성이 같이 나올 수 있을까요?', 'context': 'PC 화면과 시스템 오디오, 공유자의 오디오(마이크)/비디오(카메라)를 모두 송출할 수 있습니다.' },
  { 'title' : '맵 구축을 하고 싶은데 비용이 궁금합니다.원하는 컨셉의 맵을 제작해주실 수 있나요? ', 'context': '도입 문의 페이지(https://tally.so/r/3jP62x?ref=home) 로 문의해 주시길 바랍니다.' },
];

const BodyContentSeven = () => {
  const [isVisibleList, setIsVisibleList] = useState(Array(texts.length).fill(false));

  const toggleText = useCallback((index) => {
    const updatedVisibleList = [...isVisibleList];
    updatedVisibleList[index] = !updatedVisibleList[index];
    setIsVisibleList(updatedVisibleList);
  }, [isVisibleList]);

  return (
    <div className={styles.header}>
      <div>
        <h2>자주 묻는 질문</h2>
      </div>
      <div className={styles.landingFQA}>
        {texts.map((item, index) => (
          <div className={styles.landingFQA1} key={index} onClick={() => toggleText(index)}>
            <div>Q</div>
            <span className={styles.FAQTitle}>{item.title}</span>
            {isVisibleList[index] ? (
              <span className={styles.FAQContext}>{item.context}</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BodyContentSeven;