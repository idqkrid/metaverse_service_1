import React, { useState, useCallback, useEffect } from 'react';
import styles from "../SpaceCardForm/styles.module.css";

/* Router */
import Router from "next/router";

const SpaceCardForm = ({ post }) => {
  const blogCardFormClick = useCallback(
    (e) => {
      e.preventDefault();

      if (post) {
        Router.push(`/Meta/${post.title}`);
      }
    },
    [post]
  );

  return (
    <div className={styles.card} onClick={blogCardFormClick}>
      <div className={styles.cover}>
        <img src="/images/metaMap.PNG" alt="" />
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
  );
};

export default SpaceCardForm;