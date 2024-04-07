import React, { useEffect, useState, useCallback } from 'react';
import styles from './styles.module.css';

import CustomerSupportText from '../CustomerSupportChoice2/CustomerSupportText'

/* router */
import { useRouter } from 'next/router';

/* reducers */
import { LOAD_MY_INFO_REQUEST } from '../../../../reducers/user';
import { LOAD_UPDATES_REQUEST } from '../../../../reducers/post';

// redux
import { useSelector, useDispatch } from 'react-redux';

// next
import wrapper from '../../../../store/configureStore'
import { END } from 'redux-saga';

/* axios */
import axios from 'axios';


const CustomerSupportBody = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, loadUpdatesDone, updatesPosts } = useSelector((state) => state.post);

  const isEqualToMe = updatesPosts.every(post => post.User.id === me?.id);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, [dispatch])

  useEffect(() => {
    dispatch({
      type: LOAD_UPDATES_REQUEST,
    });

  }, [dispatch]);

  useEffect(() => {
    if (loadUpdatesDone) {
      router.reload();
    }
  }, [])

  const addPostButton = useCallback((e) => {
    e.preventDefault();
    router.push('/CustomerSupport/CustomerSupportUpdate/Add');
  })

  return (
    <div className={styles.body}>
      <div className={styles.leftBody}>
      </div>
      <div className={styles.centerBody}>
        <div className={styles.centerContent1Body}>
          <div className={styles.centerContent2Body}>
            <span>
              ZEP의 업데이트 정보 등 다양한 소식을 알려 드립니다.
            </span>
          </div>
          {isEqualToMe ?
            <div className={styles.addButton} onClick={addPostButton}>업데이트 소식 등록</div>
            :
            <>
            </>
          }
        </div>
        <div className={styles.centerContent3Body}>
          {updatesPosts.map((update, index) =>
            <CustomerSupportText key={update.id} update={update}/>
          )}
        </div>
      </div>
      <div className={styles.rightBody}></div>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  console.log(context);
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_UPDATES_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  return { props: {} };
});

export default CustomerSupportBody;