import React, { useEffect, useCallback } from 'react';
import styles from '../../CustomerSupportBody/styles.module.css';

import { LOAD_NOTICES_REQUEST } from '../../../../../reducers/post';

// redux
import { useSelector, useDispatch } from 'react-redux';

import Router from 'next/router';

const CustomerSupportBodyNoticesData = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { noticesPosts, hasMorePosts, loadPostsLoading, loadNoticesDone } = useSelector((state) => state.post);
  
  useEffect(() => {
    dispatch({
      type: LOAD_NOTICES_REQUEST,
    });

  }, [dispatch]);

  const handleClick = useCallback((id) => {
    Router.push(`/CustomerSupport/CustomerSupportNotice/CaseStudy/Detail/${id}`);
  })

  return (
    <div>
       {noticesPosts.map((item, index) => (
                  <div key={index} className={styles.modelDetail}>
                      <a onClick={() => handleClick(`${item.id}`)}>
                          {item.title}
                      </a>
                  </div>
        ))}
    </div>
  )
}

export default CustomerSupportBodyNoticesData;