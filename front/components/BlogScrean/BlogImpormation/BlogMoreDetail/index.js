import React, { useEffect, useCallback, useRef } from 'react';
import styles from './styles.module.css';

import BlogImpormationHeader from '../BlogHeader';
import FooterMain from '../../../../components/MainScreen/FooterMain';

import { LOAD_POSTS_MORE_REQUEST } from '../../../../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../../../../reducers/user';

// redux
import { useSelector, useDispatch } from 'react-redux';

// next
import wrapper from '../../../../store/configureStore'
import { END } from 'redux-saga';
import axios from 'axios';

import BlogCardForm from '../../BlogCardForm'


const BlogMoreDetail = () => {
  const dispatch = useDispatch();
  const topRef = useRef(null);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);

  useEffect(() => {
    // 페이지가 마운트될 때 스크롤 위치를 맨 위로 이동
    topRef.current.scrollIntoView({ behavior: 'smooth' });
}, []);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, [dispatch])

  useEffect(() => {
    // 블로그 데이터 가져오기
    console.log('보내기!!!')
  
    dispatch({
      type: LOAD_POSTS_MORE_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    function onScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          console.log('들어옴!!')
          console.log(lastId)
          console.log(mainPosts.length)
          console.log(hasMorePosts)
          console.log(loadPostsLoading)

          dispatch({
            type: LOAD_POSTS_MORE_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);

  return (
    <div ref={topRef}>
      <BlogImpormationHeader />
      <div className={styles.title1}>
        <div>CATEGORY</div>
        <div>
          <h1>성공사례</h1>
        </div>
        <div className={styles.title1Content4}>ZEP 고객사의 성공 사례와 비즈니스 인사이트를 확인하세요.</div>
      </div>
      <div className={styles.content1}>
        <div className={styles.gridContainer}>
          {mainPosts.map((post) => <BlogCardForm key={post.id} post={post} />)}
        </div>
      </div>
      <FooterMain />
    </div>
  )
}

export default BlogMoreDetail;