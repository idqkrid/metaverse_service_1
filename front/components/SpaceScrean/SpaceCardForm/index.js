import React, { useState, useCallback, useEffect } from 'react';
import styles from '../SpaceCardForm/styles.module.css';
import Link from 'next/link';

/* Router */
import Router from 'next/router';

const SpaceCardForm = ({ post }) => {

  const blogCardFormClick = useCallback((e) => {
    e.preventDefault();
    console.log('클릭합니다!');

    

    if (post) {
      Router.push(`/Meta/${post.title}`);
    }
  }, [post])

  return (
    <div className={styles.card} onClick={blogCardFormClick}>
      <div className={styles.cover}>
        {/* {post.Images[0] && <img role="presentation" src={`http://localhost:3065/${post.Images[0]?.src}`} alt={post.Images[0]?.src} />} */}
        <img src='/images/metaMap.PNG' alt='' />
      </div> 
      <div className={styles.meta}>
        <div className={styles.userInfo}>
          <div className={styles.title}>{post.title}</div>
        </div>
        <div>
          <div className={styles.avatar}>{post.User.nickname[0]}</div>
          <div className={styles.nickName}>{post.User.nickname}</div>
        </div>
      </div>
    </div>
  )
}

export default SpaceCardForm;