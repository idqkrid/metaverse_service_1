import produce from '../utils/produce';

export const initialState = {
  mainPosts: [],
  noticesPosts: [],
  updatesPosts: [],
  searchDatas: [],
  singlePost: null,
  metaRooms: [],
  imagePaths: [],
  hasMorePosts: true,
  loadPostsLoading: false, // 게시글 정보 로딩중
  loadPostsDone: false,
  loadPostsError: null,
  loadPostsMoreLoading: false, // 특정 게시글 정보 로딩중
  loadPostsMoreDone: false,
  loadPostsMoreError: null,
  loadPostLoading: false, // 상세 게시글 로딩중
  loadPostDone: false,
  loadPostError: null,
  loadNoticesLoading: false, // 공지사항 게시글 로딩중
  loadNoticesDone: false,
  loadNoticesError: null,
  loadUpdatesLoading: false, // 업데이트 게시글 로딩중
  loadUpdatesDone: false,
  loadUpdatesError: null,
  updatePostLoading: false, // 게시글 수정 로딩중
  updatePostDone: false,
  updatePostError: null,
  removePostLoading: false, // 게시글 삭제 로딩중
  removePostDone: false,
  removePostError: null,
  addPostLoading: false, // 게시글 추가 로딩중
  addPostDone: false,
  addPostError: null,
  addNoticeLoading: false, // 공지사항 추가 로딩중
  addNoticeDone: false,
  addNoticeError: null,
  addUpdateLoading: false, // 업데이트 추가 로딩중
  addUpdateDone: false,
  addUpdateError: null,
  updateNoticeLoading: false, // 공지사항 수정 로딩중
  updateNoticeDone: false,
  updateNoticeError: null,
  updateUpdateLoading: false, // 업데이트 수정 로딩중
  updateUpdateDone: false,
  updateUpdateError: null,
  removeNoticeLoading: false, // 공지사항 삭제 로딩중
  removeNoticeDone: false,
  removeNoticeError: null,
  removeUpdateLoading: false, // 업데이트 삭제 로딩중
  removeUpdateDone: false,
  removeUpdateError: null,
  uploadImagesLoading: false, // 이미지 업로드 로딩중
  uploadImagesDone: false,
  uploadImagesError: null,
  removeImageLoading: false, // 이미지 삭제 로디중
  removeImageDone: false,
  removeImageError: null,
  addCommentLoading: false, // 리뷰 추가 로딩중
  addCommentDone: false,
  addCommentError: null,
  updateCommentLoading: false, // 리뷰 수정 로딩중
  updateCommentDone: false,
  updateCommentError: null,
  removeCommentLoading: false, // 리뷰 삭제 로딩중
  removeCommentDone: false,
  removeCommentError: null,
  loadSearchDataLoading: false, // 검색 로딩중
  loadSearchDataDone: false,
  loadSearchDataError: null,
  sendEmailLoading: false, // 메일 보내는 중
  sendEmailDone: false,
  sendEmailError: null,
  addMetaLoading: false, // 메타버스 생성 로딩중
  addMetaDone: false,
  addMetaError: false,
  loadMetaLoading: false, // 메타버스 로딩중
  loadMetaDone: false,
  loadMetaError: null,
};

export const ADD_META_REQUEST = 'ADD_META_REQUEST';
export const ADD_META_SUCCESS = 'ADD_META_SUCCESS';
export const ADD_META_FAILURE = 'ADD_META_FAILURE';

export const LOAD_META_REQUEST = 'LOAD_META_REQUEST';
export const LOAD_META_SUCCESS = 'LOAD_META_SUCCESS';
export const LOAD_META_FAILURE = 'LOAD_META_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const SEND_EMAIL_REQUEST = 'SEND_EMAIL_REQUEST';
export const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS';
export const SEND_EMAIL_FAILURE = 'SEND_EMAIL_FAILURE';

export const LOAD_SEARCH_DATA_REQUEST = 'LOAD_SEARCH_DATA_REQUEST';
export const LOAD_SEARCH_DATA_SUCCESS = 'LOAD_SEARCH_DATA_SUCCESS';
export const LOAD_SEARCH_DATA_FAILURE = 'LOAD_SEARCH_DATA_FAILURE';

export const LOAD_NOTICES_FAILURE = 'LOAD_NOTICES_FAILURE';
export const LOAD_NOTICES_REQUEST = 'LOAD_NOTICES_REQUEST';
export const LOAD_NOTICES_SUCCESS = 'LOAD_NOTICES_SUCCESS';

export const UPDATE_NOTICE_FAILURE = 'UPDATE_NOTICE_FAILURE';
export const UPDATE_NOTICE_REQUEST = 'UPDATE_NOTICE_REQUEST';
export const UPDATE_NOTICE_SUCCESS = 'UPDATE_NOTICE_SUCCESS';

export const REMOVE_NOTICE_FAILURE = 'REMOVE_NOTICE_FAILURE';
export const REMOVE_NOTICE_REQUEST = 'REMOVE_NOTICE_REQUEST';
export const REMOVE_NOTICE_SUCCESS = 'REMOVE_NOTICE_SUCCESS';

export const LOAD_UPDATES_FAILURE = 'LOAD_UPDATES_FAILURE';
export const LOAD_UPDATES_REQUEST = 'LOAD_UPDATES_REQUEST';
export const LOAD_UPDATES_SUCCESS = 'LOAD_UPDATES_SUCCESS';

export const UPDATE_UPDATE_FAILURE = 'UPDATE_UPDATE_FAILURE';
export const UPDATE_UPDATE_REQUEST = 'UPDATE_UPDATE_REQUEST';
export const UPDATE_UPDATE_SUCCESS = 'UPDATE_UPDATE_SUCCESS';

export const REMOVE_UPDATE_FAILURE = 'REMOVE_UPDATE_FAILURE';
export const REMOVE_UPDATE_REQUEST = 'REMOVE_UPDATE_REQUEST';
export const REMOVE_UPDATE_SUCCESS = 'REMOVE_UPDATE_SUCCESS';

export const LOAD_POSTS_MORE_REQUEST = 'LOAD_POSTS_MORE_REQUEST';
export const LOAD_POSTS_MORE_SUCCESS = 'LOAD_POSTS_MORE_SUCCESS';
export const LOAD_POSTS_MORE_FAILURE = 'LOAD_POSTS_MORE_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_POST_NOTICE_REQUEST = 'ADD_POST_NOTICE_REQUEST';
export const ADD_POST_NOTICE_SUCCESS = 'ADD_POST_NOTICE_SUCCESS';
export const ADD_POST_NOTICE_FAILURE = 'ADD_POST_NOTICE_FAILURE';

export const ADD_POST_UPDATE_REQUEST = 'ADD_POST_UPDATE_REQUEST';
export const ADD_POST_UPDATE_SUCCESS = 'ADD_POST_UPDATE_SUCCESS';
export const ADD_POST_UPDATE_FAILURE = 'ADD_POST_UPDATE_FAILURE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

// removeImageLoading

export const REMOVE_IMAGE_REQUEST = 'REMOVE_IMAGE_REQUEST';
export const REMOVE_IMAGE_SUCCESS = 'REMOVE_IMAGE_SUCCESS';
export const REMOVE_IMAGE_FAILURE = 'REMOVE_IMAGE_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const UPDATAE_COMMENT_REQUEST = 'UPDATAE_COMMENT_REQUEST';
export const UPDATAE_COMMENT_SUCCESS = 'UPDATAE_COMMENT_SUCCESS';
export const UPDATAE_COMMENT_FAILURE = 'UPDATAE_COMMENT_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const UPDATE_COMMENT_REQUEST = 'UPDATE_COMMENT_REQUEST';
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
export const UPDATE_COMMENT_FAILURE = 'UPDATE_COMMENT_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
  case REMOVE_IMAGE_REQUEST:
    draft.loadPostLoading = true;
    draft.loadPostDone = false;
    draft.loadPostError = null;
    break;
  case REMOVE_IMAGE_SUCCESS:
    draft.loadPostLoading = false;
    draft.loadPostDone = true;
    draft.singlePost.Images = draft.singlePost.Images.filter((v) => v.id !== action.data.ImageId);
    break;
  case REMOVE_IMAGE_FAILURE:
    draft.loadPostLoading = false;
    draft.loadPostError = action.error;
    break;
  case LOAD_POST_REQUEST:
    draft.loadPostLoading = true;
    draft.loadPostDone = false;
    draft.loadPostError = null;
    break;
  case LOAD_POST_SUCCESS:
    draft.loadPostLoading = false;
    draft.loadPostDone = true;
    draft.singlePost = action.data;
    break;
  case LOAD_POST_FAILURE:
    draft.loadPostLoading = false;
    draft.loadPostError = action.error;
    break;
  case LOAD_POSTS_REQUEST:
    draft.loadPostsLoading = true;
    draft.loadPostsDone = false;
    draft.loadPostsError = null;
    break;
  case LOAD_POSTS_SUCCESS:
    draft.loadPostsLoading = false;
    draft.loadPostsDone = true;
    draft.mainPosts = draft.mainPosts.concat(action.data);
    draft.hasMorePosts = action.data.length === 10;
    break;
  case LOAD_POSTS_FAILURE:
    draft.loadPostsLoading = false;
    draft.loadPostsError = action.error;
    break;
  case LOAD_SEARCH_DATA_REQUEST:
    draft.loadSearchDataLoading = true;
    draft.loadSearchDataDone = false;
    draft.loadSearchDataError = null;
    break;
  case LOAD_SEARCH_DATA_SUCCESS:
    draft.loadSearchDataLoading = false;
    draft.loadSearchDataDone = true;
    draft.searchDatas = draft.searchDatas.concat(action.data);
    break;
  case LOAD_SEARCH_DATA_FAILURE:
    draft.loadSearchDataLoading = false;
    draft.loadSearchDataError = action.error;
    break;
  case LOAD_NOTICES_REQUEST:
    draft.loadNoticesLoading = true;
    draft.loadNoticesDone = false;
    draft.loadNoticesError = null;
    break;
  case LOAD_NOTICES_SUCCESS:
    draft.loadNoticesLoading = false;
    draft.loadNoticesDone = true;
    draft.noticesPosts = draft.noticesPosts.concat(action.data);
    draft.hasMorePosts = action.data.length === 10;
    break;
  case LOAD_NOTICES_FAILURE:
    draft.loadNoticesLoading = false;
    draft.loadNoticesError = action.error;
    break;
  case LOAD_UPDATES_REQUEST:
    draft.loadUpdatesLoading = true;
    draft.loadUpdatesDone = false;
    draft.loadUpdatesError = null;
    break;
  case LOAD_UPDATES_SUCCESS:
    draft.loadUpdatesLoading = false;
    draft.loadUpdatesDone = true;
    draft.updatesPosts = draft.updatesPosts.concat(action.data);
    draft.hasMorePosts = action.data.length === 10;
    break;
  case LOAD_UPDATES_FAILURE:
    draft.loadUpdatesLoading = false;
    draft.loadUpdatesError = action.error;
    break;
  case LOAD_POSTS_MORE_REQUEST:
    draft.loadPostsMoreLoading = true;
    draft.loadPostsMoreDone = false;
    draft.loadPostsMoreError = null;
    break;
  case LOAD_POSTS_MORE_SUCCESS:
    draft.loadPostsMoreLoading = false;
    draft.loadPostsMoreDone = true;
    draft.mainPosts = draft.mainPosts.concat(action.data);
    draft.hasMorePosts = action.data.length === 8;
    break;
  case LOAD_POSTS_MORE_FAILURE:
    draft.loadPostsMoreLoading = false;
    draft.loadPostsError = action.error;
    break;
  case ADD_POST_REQUEST:
    draft.addPostLoading = true;
    draft.addPostDone = false;
    draft.addPostError = null;
    break;
  case ADD_POST_SUCCESS:
    draft.addPostLoading = false;
    draft.addPostDone = true;
    draft.imagePaths = [];
    break;
  case ADD_POST_FAILURE:
    draft.addPostLoading = false;
    draft.addPostError = action.error;
    break;
  case ADD_POST_NOTICE_REQUEST:
    draft.addNoticeLoading = true;
    draft.addNoticeDone = false;
    draft.addNoticeError = null;
    break;
  case ADD_POST_NOTICE_SUCCESS:
    draft.addNoticeLoading = false;
    draft.addNoticeDone = true;
    break;
  case ADD_POST_NOTICE_FAILURE:
    draft.addNoticeLoading = false;
    draft.addNoticeError = action.error;
    break;
  case ADD_POST_UPDATE_REQUEST:
    draft.addUpdateLoading = true;
    draft.addUpdateDone = false;
    draft.addUpdateError = null;
    break;
  case ADD_POST_UPDATE_SUCCESS:
    draft.addUpdateLoading = false;
    draft.addUpdateDone = true;
    break;
  case ADD_POST_UPDATE_FAILURE:
    draft.addUpdateLoading = false;
    draft.addUpdateError = action.error;
    break;
  case REMOVE_IMAGE:
    draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
    break;
  case UPLOAD_IMAGES_REQUEST:
    draft.uploadImagesLoading = true;
    draft.uploadImagesDone = false;
    draft.uploadImagesError = null;
    break;
  case UPLOAD_IMAGES_SUCCESS:
    draft.imagePaths = action.data;
    draft.uploadImagesLoading = false;
    draft.uploadImagesDone = true;
    break;
  case UPLOAD_IMAGES_FAILURE:
    draft.uploadImagesLoading = false;
    draft.uploadImagesError = action.error;
    break;
  case UPDATE_POST_REQUEST:
    draft.updatePostLoading = true;
    draft.updatePostDone = false;
    draft.updatePostError = null;
    break;
  case UPDATE_POST_SUCCESS:
    draft.updatePostLoading = false;
    draft.updatePostDone = true;
    break;
  case UPDATE_POST_FAILURE:
    draft.updatePostLoading = false;
    draft.updatePostError = action.error;
    break;
  case UPDATE_NOTICE_REQUEST:
    draft.updateNoticeLoading = true;
    draft.updateNoticeDone = false;
    draft.updateNoticeError = null;
    break;
  case UPDATE_NOTICE_SUCCESS:
    draft.updateNoticeLoading = false;
    draft.updateNoticeDone = true;
    break;
  case UPDATE_NOTICE_FAILURE:
    draft.updateNoticeLoading = false;
    draft.updateNoticeError = action.error;
    break;
  case UPDATE_UPDATE_REQUEST:
    draft.updateUpdateLoading = true;
    draft.updateUpdateDone = false;
    draft.updateUpdateError = null;
    break;
  case UPDATE_UPDATE_SUCCESS:
    draft.updateUpdateLoading = false;
    draft.updateUpdateDone = true;
    break;
  case UPDATE_UPDATE_FAILURE:
    draft.updateUpdateLoading = false;
    draft.updateUpdateError = action.error;
    break;
  case REMOVE_POST_REQUEST:
    draft.removePostLoading = true;
    draft.removePostDone = false;
    draft.removePostError = null;
    break;
  case REMOVE_POST_SUCCESS:
    draft.removePostLoading = false;
    draft.removePostDone = true;
    break;
  case REMOVE_POST_FAILURE:
    draft.removePostLoading = false;
    draft.removePostError = action.error;
    break;
  case REMOVE_NOTICE_REQUEST:
    draft.removeNoticeLoading = true;
    draft.removeNoticeDone = false;
    draft.removeNoticeError = null;
    break;
  case REMOVE_NOTICE_SUCCESS:
    draft.removeNoticeLoading = false;
    draft.removeNoticeDone = true;
    break;
  case REMOVE_NOTICE_FAILURE:
    draft.removeNoticeLoading = false;
    draft.removeNoticeError = action.error;
    break;
  case REMOVE_UPDATE_REQUEST:
    draft.removeUpdateLoading = true;
    draft.removeUpdateDone = false;
    draft.removeUpdateError = null;
    break;
  case REMOVE_UPDATE_SUCCESS:
    draft.removeUpdateLoading = false;
    draft.removeUpdateDone = true;
    break;
  case REMOVE_UPDATE_FAILURE:
    draft.removeUpdateLoading = false;
    draft.removeUpdateError = action.error;
    break;
  case ADD_COMMENT_REQUEST:
    draft.addCommentLoading = true;
    draft.addCommentDone = false;
    draft.addCommentError = null;
    break;
  case ADD_COMMENT_SUCCESS: {
    draft.singlePost.Comments.unshift(action.data);
    draft.addCommentLoading = false;
    draft.addCommentDone = true;
    break;
  }
  case ADD_COMMENT_FAILURE:
    draft.addCommentLoading = false;
    draft.addCommentError = action.error;
    break;
  case ADD_META_REQUEST:
    draft.addMetaLoading = true;
    draft.addMetaDone = false;
    draft.addMetaError = null;
    break;
  case ADD_META_SUCCESS: {
    draft.metaRooms.unshift(action.data);
    draft.addMetaLoading = false;
    draft.addMetaDone = true;
    break;
  }
  case ADD_META_FAILURE:
    draft.addMetaLoading = false;
    draft.addMetaError = action.error;
    break;
  case LOAD_META_REQUEST:
    draft.loadMetaLoading = true;
    draft.loadMetaDone = false;
    draft.loadMetaError = null;
    break;
  case LOAD_META_SUCCESS:
    draft.loadMetaLoading = false;
    draft.loadMetaDone = true;
    draft.metaRooms = action.data;
    break;
  case LOAD_META_FAILURE:
    draft.loadMetaLoading = false;
    draft.loadMetaError = action.error;
    break;

  case REMOVE_COMMENT_REQUEST:
    draft.removeCommentLoading = true;
    draft.removeCommentDone = false;
    draft.removeCommentError = null;
    break;
  case REMOVE_COMMENT_SUCCESS: {
    draft.singlePost.Comments = draft.singlePost.Comments.filter((v) => v.id !== action.data.CommentId);
    draft.removeCommentLoading = false;
    draft.removeCommentDone = true;
    break;
  }
  case REMOVE_COMMENT_FAILURE:
    draft.removeCommentLoading = false;
    draft.removeCommentError = action.error;
    break;
  case UPDATE_COMMENT_REQUEST:
    draft.updateCommentLoading = true;
    draft.updateCommentDone = false;
    draft.updateCommentError = null;
    break;
  case UPDATE_COMMENT_SUCCESS: {
    draft.updateCommentLoading = false;
    draft.updateCommentDone = true;
    break;
  }
  case UPDATE_COMMENT_FAILURE:
    draft.updateCommentLoading = false;
    draft.updateCommentError = action.error;
    break;
  case SEND_EMAIL_REQUEST:
    draft.sendEmailLoading = true;
    draft.sendEmailDone = false;
    draft.sendEmailError = null;
    break;
  case SEND_EMAIL_SUCCESS: {
    draft.sendEmailLoading = false;
    draft.sendEmailDone = true;
    break;
  }
  case SEND_EMAIL_FAILURE:
    draft.sendEmailLoading = false;
    draft.sendEmailError = action.error;
    break;
  default:
    break;
  }
});

export default reducer;