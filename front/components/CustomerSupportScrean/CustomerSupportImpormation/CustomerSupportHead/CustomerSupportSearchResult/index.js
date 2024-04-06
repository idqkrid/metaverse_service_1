import React from 'react';
import styles from './styles.module.css';

const CustomerSupportSearchResult = ({ result }) => {
  return (
    <div className={styles.textTitle}>
      <div className={styles.textContent1}>
        {result?.source === 'search'
          ?
          <>
            (공지사항)
          </>
          :
          <>
            (업데이트 소식)
          </>
        }
      </div>
      <div className={styles.textContent3}>
        {result?.title
          ?
          <>
            제목: {result?.title}
          </>
          :
          <>
          </>
        }
      </div>
    </div>
  )
}

export default CustomerSupportSearchResult;