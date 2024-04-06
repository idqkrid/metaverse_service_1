import React, { useEffect } from 'react';
import styles from './styles.module.css';

/* router */
import { useRouter } from 'next/router';

/* reducers */
import { LOAD_MY_INFO_REQUEST } from '../../../../reducers/user';
import { LOAD_NOTICES_REQUEST } from '../../../../reducers/post';

// redux
import { useSelector, useDispatch } from 'react-redux';

// next
import wrapper from '../../../../store/configureStore'
import { END } from 'redux-saga';

/* axios */
import axios from 'axios';

import Link from 'next/link';

import CustomerSupportBodyNoticesData from '../CustomerSupportBody/CustomerSupportBodyNoticesData';
import CustomerSupportBodyUpdateData from '../CustomerSupportBody/CustomerSupportBodyUpdateData';

const CustomerSupportBody = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, loadNoticesDone } = useSelector((state) => state.post);

  const isEqualToMe = mainPosts.every(post => post.User.id === me?.id);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, [dispatch])

  useEffect(() => {
    dispatch({
      type: LOAD_NOTICES_REQUEST,
    });

  }, [dispatch]);

  const handleClick = (id) => {
    router.push(`/CustomerSupport/CustomerSupportNotice/CaseStudy/Detail/${id}`)
  }

  return (
    <div className={styles.body}>
      <div className={styles.leftBody}>
      </div>
      <div className={styles.centerBody}>
        <div className={styles.centerContent1Body}>
          <img className={styles.customerImage} src="/images/customerSupport.avif" />
          <div className={styles.centerContent2Body}>
            <span>
              ZEP 고객지원 페이지에 오신 것을 환영합니다! 🙂<br />
              궁금한 사항은 아래의 검색바 혹은 우측 상단의 검색 🔍을 눌러 키워드를 입력해 보세요.
            </span>
          </div>
        </div>
        <div className={styles.centerContent3Body}>
          <div className={styles.centerContent3BodyContent1}>
            <div>
              <h2>공지사항</h2>
            </div>
            <div className={styles.centerContent3BodyContent1Text1}>
            <CustomerSupportBodyNoticesData />
            </div>
            <div className={styles.centerContent3BodyContent1Button1}>
              <Link href="/CustomerSupport/CustomerSupportNotice">
                <a>공지사항 전체보기</a>
              </Link>
            </div>
          </div>
          <div className={styles.centerContent3BodyContent2}>
            <div>
              <h2>업데이트 소식</h2>
            </div>
            <div className={styles.centerContent3BodyContent1Text2}>
            <CustomerSupportBodyUpdateData />
            </div>
            <div className={styles.centerContent3BodyContent1Button2}>
              <Link href="/CustomerSupport/CustomerSupportUpdate">
                <a>업데이트 소식 전체보기</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightBody}></div>
    </div>
  )
}

export default CustomerSupportBody;