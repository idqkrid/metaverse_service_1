import React, { useState, useCallback, useEffect, useRef } from 'react';
import styles from './styles.module.css';

/* axios */
import axios from 'axios';

/* router */
import { useRouter } from 'next/router';

/* reducers */
import { LOAD_POST_REQUEST } from '../../../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../../../reducers/user';
import wrapper from '../../../store/configureStore.js';

/* redux */
import { END } from 'redux-saga';
import { useSelector, useDispatch } from 'react-redux';

import BlogImpormationHeader from '../../../components/BlogScrean/BlogImpormation/BlogHeader';
import FooterMain from '../../../components/MainScreen/FooterMain';
import { backUrl } from "../config/config";

import {
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE,
  ADD_POST_REQUEST,
} from "../../../reducers/post";

const CaseStudy = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { imagePaths, addPostLoading, addPostDone } = useSelector(
    (state) => state.post
  );
  const me = useSelector((state) => state.user.me?.id);
  const imageInput = useRef();

  const [contents, setContents] = useState("");
  const [text, setText] = useState("");

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeText = useCallback((e) => {
    e.preventDefault();
    setContents(e.target.value); // textarea의 값이 변경될 때마다 contents state 업데이트
  });

  const onChangeTitle = useCallback((e) => {
    e.preventDefault();
    setText(e.target.value);
  });

  // 미리보기 이미지 등록
  const onChangeImages = useCallback((e) => {
    e.preventDefault();
    console.log("images", e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });

    console.log("이미지");
    console.log(imageFormData);

    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  // 게시글 추가
  const onAddPost = useCallback(
    (e) => {
      e.preventDefault();
      if (!contents || !contents.trim()) {
        return alert("게시글을 작성하세요.");
      }
      if (!text || !text.trim()) {
        return alert("게시글을 작성하세요.");
      }
      console.log("타이틀 내용");
      console.log(text);
      const formData = new FormData();
      imagePaths.forEach((p) => {
        formData.append("image", p);
      });
      formData.append("content", contents);
      formData.append("text", text);

      for (const pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      return dispatch({
        type: ADD_POST_REQUEST,
        data: formData,
      });
    },
    [contents, text, imagePaths]
  );

  // 미리보기 이미지 취소
  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch({
        type: REMOVE_IMAGE,
        data: index,
      });
    },
    []
  );

  useEffect(() => {
    if (addPostDone) {
      router.replace(`/Blog/MoreDetail`);
    } else {
    }
  });

  return (
    <div className={styles.header}>
      <BlogImpormationHeader />
      <div className={styles.content2}>
        <div className={styles.content2Head}>
          <div className={styles.content2HeadContext1}>
            <h2>성공사례</h2>
          </div>
        </div>
        <div className={styles.board_wrap}>
          <div className={styles.board_write_wrap}>
            <div className={styles.board_write}>
              <div className={styles.title}>
                <input
                  value={text}
                  onChange={onChangeTitle}
                  placeholder="제목을 입력해주세요"
                ></input>
              </div>
              <div className={styles.cont}>
                <textarea
                  placeholder="내용 입력해주세요"
                  value={contents}
                  onChange={onChangeText}
                ></textarea>
              </div>
              <div>
                <input
                  type="file"
                  name="image"
                  multiple
                  hidden
                  ref={imageInput}
                  onChange={onChangeImages}
                />
                <button
                  className={styles.buttonWrap}
                  onClick={onClickImageUpload}
                >
                  이미지 업로드
                </button>
              </div>
              <div>
                {imagePaths.map((v, i) => (
                  <div key={v} style={{ display: "inline-block" }}>
                    <img
                      src={`${backUrl}/${v}`}
                      style={{ width: "200px" }}
                      alt={v}
                    />
                    <div>
                      <button onClick={onRemoveImage(i)}>제거</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.bt_wrap}>
              <button
                className={styles.buttonWrap}
                type="primary"
                htmlType="submit"
                loading={addPostLoading}
                onClick={onAddPost}
              >
                등록
              </button>
            </div>
          </div>
        </div>
      </div>
      <FooterMain />
    </div>
  );
};

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

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  return { props: {} };
});

export default CaseStudy;
