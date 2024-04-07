import React, {useRef, useState , useCallback, useEffect} from 'react';
import styles from './styles.module.css';

/* router */
import Router from 'next/router';

/* redux */
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import {
  ADD_COMMENT_REQUEST,
  REMOVE_COMMENT_REQUEST,
  UPDATE_COMMENT_REQUEST,
} from '../../../reducers/post';

import Pagination from '../BlogCommentPagination'


const BlogComment = ({ post }) => {
  const userCommentRef = useRef(null);
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const [isEditing, setIsEditing] = useState("true");
  const { updateCommentDone } = useSelector((state) => state.post);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerpage, setPostsPerpage] = useState(8);

  const lastPostIndex = currentPage * postsPerpage;
  const firstPostIndex = lastPostIndex - postsPerpage;

  const currentPosts = post.Comments?.slice(firstPostIndex, lastPostIndex);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [commentContent, setCommentContent] = useState("");

  console.log(updateCommentDone);

  if (updateCommentDone) {
    Router.reload();
  }

  // 댓글 작성
  const addPost = useCallback(() => {
    if (!userCommentRef.current.value) return;
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        content: userCommentRef.current.value,
        postId: post.id,
        userId: id,
      },
    });

    userCommentRef.current.value = "";
  }, []);

  const handleDelete = (id) => {
    dispatch({
      type: REMOVE_COMMENT_REQUEST,
      data: { postId: post.id, commentId: id },
    });
  };

  const handleUpdate = (id) => {
    setEditingCommentId(id);
    setIsEditing("true");
  };

  const handleChancel = (id) => {
    setEditingCommentId(null);
    setIsEditing("true");
  };

  const handleInputChange = useCallback((e) => {
    e.preventDefault();
    setCommentContent(e.target.value);
  }, []);

  const handleSend = (id) => {
    dispatch({
      type: UPDATE_COMMENT_REQUEST,
      data: { content: commentContent, postId: post.id, commentId: id },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div>
          <span>{post.Comments ? post?.Comments.length : 0}</span> 리뷰
        </div>
        <div className={styles.text}>
          <p>리뷰</p>
        </div>
        <div>
          {currentPosts?.map((comment, index) => (
            <div key={index} className={styles.parents}>
              <div className={styles.commentButton}>
                <div
                  className={styles.commentButtonU}
                  onClick={() => handleUpdate(comment.id)}
                >
                  수정
                </div>
                <div
                  className={styles.commentButtonD}
                  onClick={() => handleDelete(comment.id)}
                >
                  삭제
                </div>
              </div>
              <h4>닉네임: {comment.User.nickname}</h4>
              {editingCommentId !== comment.id && isEditing === "true" ? (
                <div>내용 : {comment.content}</div>
              ) : (
                <div>
                  <input
                    type="text"
                    value={commentContent}
                    placeholder={comment.content}
                    onChange={handleInputChange}
                  />
                  <button onClick={() => handleSend(comment.id)}>전송</button>
                  <button onClick={() => handleChancel(comment.id)}>
                    취소
                  </button>
                </div>
              )}
              <span className={styles.date}>
                작성날짜 : {comment.createdAt}
              </span>
            </div>
          ))}
        </div>
        <div>
          <Pagination
            totalPosts={post.Comments}
            postsPerPage={postsPerpage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className={styles.commentbox}>
          <div className={styles.content}>
            <h4>리뷰 작성하기 </h4>
            <div>
              <input
                className={styles.commentinputInput}
                type="text"
                placeholder="리뷰를 입력해주세요."
                ref={userCommentRef}
              />
              <div className={styles.buttons}>
                <button
                  type="submit"
                  className={`${styles.button} ${styles.abled}`}
                  onClick={addPost}
                >
                  전송
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogComment;