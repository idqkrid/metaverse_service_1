import axios from 'axios';
import shortId from 'shortid';
import { all, delay, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';

import {
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,

  LOAD_NOTICES_FAILURE,
  LOAD_NOTICES_REQUEST,
  LOAD_NOTICES_SUCCESS,

  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,

  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,

  ADD_POST_NOTICE_FAILURE,
  ADD_POST_NOTICE_REQUEST,
  ADD_POST_NOTICE_SUCCESS,

  UPDATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,

  UPDATE_NOTICE_FAILURE,
  UPDATE_NOTICE_REQUEST,
  UPDATE_NOTICE_SUCCESS,

  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,

  REMOVE_NOTICE_FAILURE,
  REMOVE_NOTICE_REQUEST,
  REMOVE_NOTICE_SUCCESS,

  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,

  REMOVE_IMAGE_REQUEST,
  REMOVE_IMAGE_SUCCESS,
  REMOVE_IMAGE_FAILURE,

  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,

  UPDATE_COMMENT_FAILURE,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,

  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,

  LOAD_POSTS_MORE_REQUEST, // 더보기
  LOAD_POSTS_MORE_SUCCESS,
  LOAD_POSTS_MORE_FAILURE,

  LOAD_UPDATES_FAILURE,
  LOAD_UPDATES_REQUEST,
  LOAD_UPDATES_SUCCESS,

  ADD_POST_UPDATE_REQUEST,
  ADD_POST_UPDATE_SUCCESS,
  ADD_POST_UPDATE_FAILURE,

  UPDATE_UPDATE_FAILURE,
  UPDATE_UPDATE_REQUEST,
  UPDATE_UPDATE_SUCCESS,

  REMOVE_UPDATE_FAILURE,
  REMOVE_UPDATE_REQUEST,
  REMOVE_UPDATE_SUCCESS,

  LOAD_SEARCH_DATA_REQUEST,
  LOAD_SEARCH_DATA_SUCCESS,
  LOAD_SEARCH_DATA_FAILURE,

  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,

  ADD_META_REQUEST,
  ADD_META_SUCCESS,
  ADD_META_FAILURE,

  LOAD_META_REQUEST,
  LOAD_META_SUCCESS,
  LOAD_META_FAILURE,
} from '../reducers/post';

import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

// 게시글들 가져오기 (블로그)
function loadPostsAPI() {
  return axios.get(`/posts/blog`);
}

function* loadPosts() {
  try {
    const result = yield call(loadPostsAPI);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

// 특정 게시글 가져오기
function loadMorePostsAPI(lastId) {
  console.log('특정 게시글 가져오기!!');
  console.log(lastId);
  return axios.get(`/posts?lastId=${lastId || 0}`);
}

function* loadMorePosts(action) {
  try {
    const result = yield call(loadMorePostsAPI, action.lastId);
    console.log('결과 왔어요!!')
    console.log(result);
    yield put({
      type: LOAD_POSTS_MORE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_MORE_FAILURE,
      error: err.response.data,
    });
  }
}

// 특정 게시글 가져오기
function loadPostAPI(data) {
  return axios.get(`/post/${data}`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// 게시글 추가하기
function addPostAPI(data) {
  console.log('게시글 전송합니다.')
  console.log(data);
  return axios.post('/post', data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

// 이미지 미리보기 등록
function uploadImagesAPI(data) {
  return axios.post('/post/images', data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

// 게시글 수정하기
function updatePostAPI(data) {
  console.log('게시글 수정하기')
  
  for (const pair of data.group.entries()) {
    console.log(pair[0] + ', ' + pair[1]);
  }

  console.log(data);
  console.log(data.group);
  console.log(data.group.get('title'))
  console.log(data.group.get('content'))
  console.log(data.group.get('image'));
  console.log(data.PostId)

  return axios.patch(`/post/${data.PostId}`, {'title': data.group.get('title'), 'content': data.group.get('content'), 'image': data.group.get('image')});
}

function* updatePost(action) {
  try {
    const result = yield call(updatePostAPI, action.data);
    yield put({
      type: UPDATE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// 게시글내 이미지 삭제하기
function removeImageAPI(data) {
  console.log('게시글 내 이미지 삭제하기');
  console.log(data);
  return axios.delete(`/post/image/${data}`)
}

function* removeImage(action) {
  try {
    const result = yield call(removeImageAPI, action.data);
    yield put({
      type: REMOVE_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_IMAGE_FAILURE,
      error: err.response.data,
    });
  }
}


// 게시글 삭제하기
function removePostAPI(data) {
  console.log('saga 삭제하기')
  return axios.delete(`/post/${data}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// 댓글 추가하기
function addCommentAPI(data) {
  console.log('댓글 추가하기')
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    //yield delay(1000);
    console.log('댓글 추가하기 결과')
    console.log(result.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

// return axios.patch(`/post/${data.PostId}`, {'title': data.group.get('title'), 'content': data.group.get('content'), 'image': data.group.get('image')});
// 댓글 수정하기
function updateCommentAPI(data) {
  console.log('댓글 수정하기~~~~~~')
  console.log(data.content)
  console.log(data.commentId)
  console.log(data.postId);
  
  return axios.patch(`/post/${data.postId}/comment/${data.commentId}`, {'content': data.content});
}

function* updateComment(action) {
  try {
    const result = yield call(updateCommentAPI, action.data);
    //yield delay(1000);
    console.log('댓글 추가하기 결과')
    console.log(result.data);
    yield put({
      type: UPDATE_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UPDATE_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}



// 댓글 삭제하기
function removeCommentAPI(data) {
  console.log('댓글 삭제하기')
  console.log(data);
  console.log(data.postId);
  console.log(data.commentId);

  return axios.delete(`/post/${data.postId}/comment/${data.commentId}`);
}

function* removeComment(action) {
  try {
    const result = yield call(removeCommentAPI, action.data);
    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

// ADD_POST_NOTICE_REQUEST
// 공지사항 등록하기
function addNoticeAPI(data) {
  console.log('게시글 전송합니다.')
  console.log(data);
  return axios.post('/notice', data);
}

function* addNotice(action) {
  try {
    const result = yield call(addNoticeAPI, action.data);
    yield put({
      type: ADD_POST_NOTICE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_NOTICE_FAILURE,
      data: err.response.data,
    });
  }
}

// loadNotices
// 공지사항 조회하기
function loadNoticesAPI() {
  console.log('공지사항 조회하기.')
  return axios.get('/notice/all');
}

function* loadNotices() {
  try {
    const result = yield call(loadNoticesAPI);
    yield put({
      type: LOAD_NOTICES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_NOTICES_FAILURE,
      data: err.response.data,
    });
  }
}

// 공지사항 수정하기
function updateNoticeAPI(data) {
  console.log('공지사항 수정하기')
  
  for (const pair of data.group.entries()) {
    console.log(pair[0] + ', ' + pair[1]);
  }

  console.log(data);
  console.log(data.group);
  console.log(data.group.get('title'))
  console.log(data.group.get('content'))
  console.log(data.NoticeId)

  return axios.patch(`/notice/${data.NoticeId}`, {'title': data.group.get('title'), 'content': data.group.get('content')});
}

function* updateNotice(action) {
  try {
    const result = yield call(updateNoticeAPI, action.data);
    yield put({
      type: UPDATE_NOTICE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_NOTICE_FAILURE,
      error: err.response.data,
    });
  }
}

// 공지사항 삭제하기
function removeNoticeAPI(data) {
  console.log('공지사항 삭제하기')
  return axios.delete(`/notice/${data}`);
}

function* removeNotice(action) {
  try {
    const result = yield call(removeNoticeAPI, action.data);
    yield put({
      type: REMOVE_NOTICE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_NOTICE_FAILURE,
      error: err.response.data,
    });
  }
}

// 업데이트 추가
function addUpdateAPI(data) {
  console.log('업데이트 전송합니다.')
  console.log(data);
  return axios.post('/upost', data);
}

function* addUpdate(action) {
  try {
    const result = yield call(addUpdateAPI, action.data);
    yield put({
      type: ADD_POST_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_UPDATE_FAILURE,
      data: err.response.data,
    });
  }
}

// loadNotices
// 업데이트 조회하기
function loadUpdatesAPI() {
  console.log('업데이트 조회하기.')
  return axios.get('/upost/all');
}

function* loadUpdates() {
  try {
    const result = yield call(loadUpdatesAPI);
    console.log('결과값')
    console.log(result)
    yield put({
      type: LOAD_UPDATES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_UPDATES_FAILURE,
      data: err.response.data,
    });
  }
}

// 업데이트 수정하기
function updateUpdateAPI(data) {
  console.log('업데이트 수정하기')
  
  for (const pair of data.group.entries()) {
    console.log(pair[0] + ', ' + pair[1]);
  }

  console.log(data);
  console.log(data.group);
  console.log(data.group.get('title'))
  console.log(data.group.get('content'))
  console.log(data.UpdateId)

  return axios.patch(`/upost/${data.UpdateId}`, {'title': data.group.get('title'), 'content': data.group.get('content')});
}

function* updateUpdate(action) {
  try {
    const result = yield call(updateUpdateAPI, action.data);
    yield put({
      type: UPDATE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// 공지사항 삭제하기
function removeUpdateAPI(data) {
  console.log('공지사항 삭제하기')
  return axios.delete(`/upost/${data}`);
}

function* removeUpdate(action) {
  try {
    const result = yield call(removeUpdateAPI, action.data);
    yield put({
      type: REMOVE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// 검색 데이터 가져오기
function loadSearchDataAPI(querydata) {
  console.log('검색 데이터 가져오기!!');
  console.log(querydata);
  return axios.get(`/notice?query=${querydata || ''}`);
  //   return axios.get(`/posts?lastId=${lastId || 0}`);
}

function* loadSearchData(action) {
  try {
    const result = yield call(loadSearchDataAPI, action.querydata);
    console.log(result);
    yield put({
      type: LOAD_SEARCH_DATA_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_SEARCH_DATA_FAILURE,
      error: err.response.data,
    });
  }
}

// 문의하기 (메일 전송하기)
function sendEmailAPI(data) {
  console.log('메일 전송하기')
  console.log(data)
  return axios.post('/mail', data);
}

function* sendEmail(action) {
  try {
    const result = yield call(sendEmailAPI, action.data);
    yield delay(1000);
    yield put({ // 서버로부터 사용자 정보를 받아 올 거예요
      type: SEND_EMAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SEND_EMAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// 메타버스 생성
function addMetaAPI(data) {
  console.log('메타버스 생성')
  return axios.post(`/meta`, data);
}

function* addMeta(action) {
  try {
    const result = yield call(addMetaAPI, action.data);
    //yield delay(1000);
    console.log('메타버스 생성')
    console.log(result.data);
    yield put({
      type: ADD_META_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_META_FAILURE,
      data: err.response.data,
    });
  }
}

// 스페이스 가져오기
function loadMetaAPI() {
  return axios.get(`/meta`);
}

function* loadMeta() {
  try {
    const result = yield call(loadMetaAPI);
    yield put({
      type: LOAD_META_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_META_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadMeta() {
  yield takeLatest(LOAD_META_REQUEST, loadMeta);
}

function* watchAddMeta() {
  yield takeLatest(ADD_META_REQUEST, addMeta);
}

function* watchUpdatePost() {
  yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchuploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchRemoveImage() {
  yield takeLatest(REMOVE_IMAGE_REQUEST, removeImage);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchRemoveComment() {
  yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment)
}

function* watchUpdateComment() {
  yield takeLatest(UPDATE_COMMENT_REQUEST, updateComment);
}

function* watchLoadMorePost() {
  yield throttle(5000, LOAD_POSTS_MORE_REQUEST, loadMorePosts);
}

function* watchAddPostNotice() {
  yield takeLatest(ADD_POST_NOTICE_REQUEST, addNotice)
}

function* watchLoadNotices() {
  yield throttle(5000, LOAD_NOTICES_REQUEST, loadNotices);
}

function* watchUpdateNotice() {
  yield takeLatest(UPDATE_NOTICE_REQUEST,updateNotice)
}

function* watchRemoveNotice() {
  yield takeLatest(REMOVE_NOTICE_REQUEST,removeNotice)
}

// 업데이트
function* watchAddPostUpdate() {
  yield takeLatest(ADD_POST_UPDATE_REQUEST, addUpdate)
}

function* watchLoadUpdates() {
  yield throttle(5000, LOAD_UPDATES_REQUEST, loadUpdates);
}

function* watchUpdateUpdate() {
  yield takeLatest(UPDATE_UPDATE_REQUEST,updateUpdate)
}

function* watchRemoveUpdate() {
  yield takeLatest(REMOVE_UPDATE_REQUEST,removeUpdate)
}

// 검색
function* watchLoadSearch() {
  yield throttle(5000, LOAD_SEARCH_DATA_REQUEST, loadSearchData);
}

function* watchSendEmail() {
  yield takeLatest(SEND_EMAIL_REQUEST , sendEmail);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadMeta),
    fork(watchAddMeta),
    fork(watchSendEmail),
    fork(watchLoadSearch),
    fork(watchRemoveUpdate),
    fork(watchUpdateUpdate),
    fork(watchLoadUpdates),
    fork(watchAddPostUpdate),
    fork(watchRemoveNotice),
    fork(watchUpdateNotice),
    fork(watchLoadNotices),
    fork(watchAddPostNotice),
    fork(watchLoadMorePost),
    fork(watchUpdateComment),
    fork(watchRemoveComment),
    fork(watchAddComment),
    fork(watchuploadImages),
    fork(watchLoadPosts),
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchUpdatePost),
    fork(watchRemovePost),
    fork(watchRemoveImage),
  ]);
}