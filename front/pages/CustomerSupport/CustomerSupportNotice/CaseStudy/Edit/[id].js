import React, {useState, useEffect, useCallback, useRef} from 'react';
import styles from './styles.module.css';

/* Router */
import Router from 'next/router';

/* axios */
import axios from 'axios';

/* router */
import { useRouter } from 'next/router';

/* reducers */
import { LOAD_NOTICES_REQUEST, UPDATE_NOTICE_REQUEST } from '../../../../../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../../../../../reducers/user';
import wrapper from '../../../../../store/configureStore.js';

/* redux */
import { END } from 'redux-saga';
import { useSelector, useDispatch } from 'react-redux';

import CustomerSupportHead from '../../../../../components/CustomerSupportScrean/CustomerSupportImpormation/CustomerSupportHead';

const CaseStudy = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { mainPosts, updateNoticeDone, noticesPosts } = useSelector((state) => state.post);
  const me = useSelector((state) => state.user.me?.id);
  const { id } = router.query;

  const [contents, setContents] = useState(noticesPosts[0]?.content);
  const [title, setTitle] = useState(noticesPosts[0]?.title);


  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: LOAD_NOTICES_REQUEST,
      data: context.params.id,
    });
  }, [dispatch]);

  const handleChange = useCallback((e) => {
    setContents(e.target.value); // textarea의 값이 변경될 때마다 contents state 업데이트
  });

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  });


  const onChangePost = useCallback((e) => {
    e.preventDefault();

    if (!contents || !contents.trim()) {
      return alert('게시글 내용을 작성하세요.');
    }
    if (!title || !title.trim()) {
      return alert('게시글 제목을 작성하세요.');
    }

    const formData = new FormData();

    formData.append('content', contents);
    formData.append('title', title);

    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }


    dispatch({
      type: UPDATE_NOTICE_REQUEST,
      data: {
        NoticeId: id,
        group: formData,
      },
    });
  });

  useEffect(() => {
    if (updateNoticeDone) {
      Router.replace(`/CustomerSupport/CustomerSupportNotice/CaseStudy/Detail/${id}`)
    } else {

    }
  })

  return (
    <div className={styles.header}>
      <CustomerSupportHead />
      <div className={styles.content2}>
        <div className={styles.content2Head}>
          <div className={styles.content2HeadContext1}>
            <h2>[수정] 화면</h2>
          </div>
        </div>
        <div className={styles.board_wrap}>
            <div className={styles.board_write_wrap}>
                <div className={styles.board_write}>
                    <div className={styles.title}>
                      <input className={styles.titleInput} type="text" value={title} onChange={onChangeTitle}></input>
                    </div>
                    <div className={styles.cont}>
                      <textarea placeholder="내용 입력해주세요" name="contents" value={contents} onChange={handleChange}></textarea>
                    </div>
                  </div>
                <div className={styles.bt_wrap}>
                  <button className={styles.buttonWrap} onClick={onChangePost}>수정</button>
                </div>
            </div>
        </div>
      </div>
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
    type: LOAD_NOTICES_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  return { props: {} };
});

export default CaseStudy;
