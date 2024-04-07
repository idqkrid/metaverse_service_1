import React, {useState, useCallback, useEffect} from 'react';
import styles from './styles.module.css';


/* axios */
import axios from 'axios';

/* router */
import { useRouter } from 'next/router';

/* reducers */
import { LOAD_POST_REQUEST } from '../../../../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../../../../reducers/user';
import wrapper from '../../../../store/configureStore.js';

/* redux */
import { END } from 'redux-saga';
import { useSelector, useDispatch } from 'react-redux';

import BlogImpormationHeader from '../../../../components/BlogScrean/BlogImpormation/BlogHeader';
import FooterMain from '../../../../components/MainScreen/FooterMain';
import BlogImages from '../../../../components/BlogScrean/BlogImages';

import CommentForm from '../../../../components/BlogScrean/BlogComment';

import {
  REMOVE_POST_REQUEST,
} from '../../../../reducers/post';

const CaseStudy = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const { singlePost, removePostLoading  } = useSelector((state) => state.post);
  // const { id } = router.query;
  // const userId = useSelector((state) => state.user);

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_MY_INFO_REQUEST,
  //   });
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_POST_REQUEST,
  //     data: context.params.id,
  //   });
  // }, [dispatch]);

  // // 수정
  // const onEditPost = useCallback((e) => {
  //   e.preventDefault();
  //   router.replace(`/Blog/CaseStudy/Edit/${id}`)
  // });

  // // 삭제
  // const deleteButton = useCallback((e) => {
  //   e.preventDefault();
  //   console.log('삭제하기')
  //   dispatch({
  //     type: REMOVE_POST_REQUEST,
  //     data: id,
  //   });
  // })

  // 목록보기
  const onDetailPost = useCallback((e) => {
    e.preventDefault();
    router.replace(`/Blog/MoreDetail`);
  });

  useEffect(() => {
    if (removePostLoading) {
      router.replace(`/Blog/MoreDetail`);
    } else {
    }
  });

  return (
    <div className={styles.header}>
      <BlogImpormationHeader />
      {/* <div className={styles.content2}>
        <div className={styles.content2Head}>
          <div className={styles.content2HeadContext1}>
            <div>(제목) {singlePost?.title}</div>
          </div>
          {(singlePost?.User.id === userId?.me.id) ? 
            <>
              <div className={styles.detailButton} onClick={onDetailPost}>목록보기</div>
              <div className={styles.editButton} onClick={onEditPost}>수정</div>
              <div className={styles.deleteButton} onClick={deleteButton}>삭제</div>
            </>
            :
            <>
              <div className={styles.detailButton} onClick={onDetailPost}>목록보기</div>
            </>
          }
        </div>
        <div className={styles.content2Body}>
          <div className={styles.imageSpace}>
            {singlePost?.Images[0] && <BlogImages images={singlePost?.Images}/>}
          </div>
          <div className={styles.contextSpace}>
            <span>
              (내용) {singlePost?.content}
            </span>
          </div>
        </div>
        <div className={styles.commentSpace}>
          {singlePost ? <CommentForm post={singlePost} /> : <div>포스트가 없습니다.</div>}
        </div>
      </div> */}
      <FooterMain />
    </div>
  );
}

// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
//   const cookie = context.req ? context.req.headers.cookie : '';
//   console.log(context);
//   axios.defaults.headers.Cookie = '';
//   if (context.req && cookie) {
//     axios.defaults.headers.Cookie = cookie;
//   }
//   context.store.dispatch({
//     type: LOAD_MY_INFO_REQUEST,
//   });
//   context.store.dispatch({
//     type: LOAD_POST_REQUEST,
//     data: context.params.id,
//   });
//   context.store.dispatch(END);
//   await context.store.sagaTask.toPromise();
//   return { props: {} };
// });

export default CaseStudy;
