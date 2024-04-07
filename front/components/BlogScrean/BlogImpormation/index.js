import React, { useEffect, useCallback } from 'react';
import styles from './styles.module.css';


import BlogCardForm from '../BlogCardForm'

/* reducers */
import { LOAD_MY_INFO_REQUEST } from '../../../reducers/user';
import { LOAD_POSTS_REQUEST } from '../../../reducers/post';

/* router */
import { useRouter } from 'next/router';

// redux
import { useSelector, useDispatch } from 'react-redux';

// next
import wrapper from '../../../store/configureStore'
import { END } from 'redux-saga';

/* axios */
import axios from 'axios';
import BlogImpormationHeader from './BlogHeader';
import FooterMain from '../../../components/MainScreen/FooterMain';


const BlogImpormation = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
  const router = useRouter();

  const isEqualToMe = mainPosts.every(post => post.User.id === me?.id);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, [dispatch]);

  const addPostButton = useCallback((e) => {
    e.preventDefault();
    if (me) {
      router.push("/Blog/Add");
    } else {
    }
  });

  const moreDetailButton = useCallback((e) => {
    e.preventDefault();

    router.push("/Blog/MoreDetail");
  });

  return (
    <div className={styles.header}>
      <BlogImpormationHeader />
      <div className={styles.content2}>
        <div className={styles.content2Head}>
          <div className={styles.content2HeadContext1}>
            <h2>성공사례</h2>
          </div>

          {isEqualToMe ? (
            <>
              <div className={styles.moreDetail} onClick={moreDetailButton}>
                더보기
              </div>
              <div className={styles.addDetail} onClick={addPostButton}>
                게시글 등록
              </div>
            </>
          ) : (
            <>
              <div className={styles.moreDetail} onClick={moreDetailButton}>
                더보기
              </div>
            </>
          )}
        </div>
        <div className={styles.content2Body}>
          {mainPosts.map((post, index) =>
            index === 0 ? (
              <div className={styles.content2BodyContext1}>
                <BlogCardForm key={post.id} post={post} />
              </div>
            ) : index === 1 ? (
              <div className={styles.content2BodyContext2}>
                <BlogCardForm key={post.id} post={post} />
              </div>
            ) : index === 2 ? (
              <div className={styles.content2BodyContext3}>
                <BlogCardForm key={post.id} post={post} />
              </div>
            ) : index === 3 ? (
              <div className={styles.content2BodyContext4}>
                <BlogCardForm key={post.id} post={post} />
              </div>
            ) : null
          )}
        </div>
      </div>
      <div className={styles.content3}></div>
      <div className={styles.content4}></div>
      <FooterMain />
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  })

  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  })

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
})


export default BlogImpormation;