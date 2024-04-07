import React, {useState, useEffect, useCallback, useRef} from 'react';
import styles from './styles.module.css';

/* Router */
import Router from 'next/router';

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
import { backUrl } from "../../../../config/config";

import {
  UPDATE_POST_REQUEST,
  REMOVE_IMAGE,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE_REQUEST,
} from "../../../../reducers/post";

const CaseStudy = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    singlePost,
    updatePostDone,
    imagePaths,
    addPostLoading,
    addPostDone,
  } = useSelector((state) => state.post);
  const me = useSelector((state) => state.user.me?.id);
  const { id } = router.query;
  const imageInput = useRef();

  const [contents, setContents] = useState(singlePost?.content);
  const [title, setTitle] = useState(singlePost?.title);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
      data: context.params.id,
    });
  }, [dispatch]);

  const handleChange = useCallback((e) => {
    setContents(e.target.value); // textarea의 값이 변경될 때마다 contents state 업데이트
  });

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  });

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangePost = useCallback((e) => {
    e.preventDefault();

    if (!contents || !contents.trim()) {
      return alert("게시글 내용을 작성하세요.");
    }
    if (!title || !title.trim()) {
      return alert("게시글 제목을 작성하세요.");
    }

    const formData = new FormData();

    if (imagePaths) {
      imagePaths.forEach((p) => {
        formData.append("image", p);
      });
    }

    if (singlePost?.Images) {
      singlePost?.Images.forEach((p) => {
        formData.append("image", p);
      });
    }

    if (imagePaths && singlePost?.Images) {
      imagePaths.forEach((p) => {
        formData.append("image", p);
      });

      singlePost.Images.forEach((p) => {
        formData.append("image", p);
      });
    }

    formData.append("content", contents);
    formData.append("title", title);

    for (const pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    dispatch({
      type: UPDATE_POST_REQUEST,
      data: {
        PostId: id,
        group: formData,
      },
    });
  });

  const onChangeImages = useCallback((e) => {
    e.preventDefault();
    console.log("images", e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });

    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onRemoveImageNew = useCallback(
    (index) => () => {
      console.log(index);

      dispatch({
        type: REMOVE_IMAGE,
        data: index,
      });
    },
    []
  );

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch({
        type: REMOVE_IMAGE_REQUEST, // 기존 이미지 삭제
        data: index,
      });
    },
    []
  );

  useEffect(() => {
    if (updatePostDone) {
      Router.replace(`/Blog/CaseStudy/Detail/${id}`);
    } else {
    }
  });

  return (
    <div className={styles.header}>
      <BlogImpormationHeader />
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
                <input
                  className={styles.titleInput}
                  type="text"
                  value={title}
                  onChange={onChangeTitle}
                ></input>
              </div>
              <div className={styles.cont}>
                <textarea
                  placeholder="내용 입력해주세요"
                  name="contents"
                  value={contents}
                  onChange={handleChange}
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
              <div className={styles.imageSpace}>
                {imagePaths.map((v, i) => (
                  <div key={v} style={{ display: "inline-block" }}>
                    <img src={`${v}`} style={{ width: "200px" }} alt={v} />
                    <div>
                      <button
                        className={styles.buttonWrap}
                        onClick={onRemoveImageNew(i)}
                      >
                        제거
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.imageSpace}>
                {singlePost?.Images.map((v, i) => (
                  <div key={v} style={{ display: "inline-block" }}>
                    <img src={`${v.src}`} style={{ width: "200px" }} alt={v} />
                    <div>
                      <button
                        className={styles.buttonWrap}
                        onClick={onRemoveImage(v.id)}
                      >
                        제거
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.bt_wrap}>
              <button className={styles.buttonWrap} onClick={onChangePost}>
                수정
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
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  return { props: {} };
});

export default CaseStudy;
