import axios from "axios";
import uuid from "uuid";

export const FETCH_POSTS = "FETCH_POSTS";
export const CREATE_POSTS = "CREATE_POSTS";
export const FETCH_POST = "FETCH_POST";
export const DELETE_POST = "DELETE_POST";
export const EDIT_POST = "EDIT_POST";
export const VOTE_FOR_POST = "VOTE_FOR_POST";
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FILTER_CATEGORY = "FILTER_CATEGORY ";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const FETCH_COMMENTS = "FETCH_COMMENTS";
export const FETCH_COMMENT = "FETCH_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const VOTE_FOR_COMMENT = "VOTE_FOR_COMMENT";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const SORT_FOR_POSTS = "SORT_FOR_POSTS ";

const ROOT_URL = "http://localhost:3001";
const AUTH = { headers: { Authorization: "Its me!" } };
axios.defaults.headers.common["Authorization"] = AUTH;

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts`);
  return dispatch => {
    request.then(({ data }) => {
      dispatch({ type: FETCH_POSTS, payload: data });
    });
  };
}

export function createPosts(values) {
  const { title, body, author, category } = values;

  const data = {
    id: uuid.v4(),
    timestamp: Date.now(),
    title,
    author,
    category,
    body
  };
  const request = axios.post(`${ROOT_URL}/posts`, data);
  return dispatch => {
    request.then(response => {
      dispatch({
        type: CREATE_POSTS,
        payload: response.data
      });
    });
  };
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}`);
  return dispatch => {
    request.then(({ data }) => {
      dispatch({ type: FETCH_POST, payload: data });
    });
  };
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}`);
  return dispatch => {
    request.then(response => {
      callback();
      dispatch({ type: DELETE_POST, payload: response.data });
    });
  };
}

export function editPost(id, updates) {
  const request = axios.put(`${ROOT_URL}/posts/${id}`, updates);
  return dispatch => {
    request.then(response => {
      dispatch({ type: EDIT_POST, payload: updates });
    });
  };
}

export function voteForPost(id, vote) {
  const request = axios.post(`${ROOT_URL}/posts/${id}`, { option: vote });
  return dispatch => {
    request.then(({ data }) => {
      dispatch({ type: VOTE_FOR_POST, payload: data });
    });
  };
}

//= ====Categories====//
export function fetchCategories() {
  const request = axios.get(`${ROOT_URL}/categories`);
  return dispatch => {
    request.then(({ data }) => {
      dispatch({ type: FETCH_CATEGORIES, payload: data });
    });
  };
}

export function postsByCategory(category) {
  const request = axios.get(`${ROOT_URL}/${category}/posts`);
  return dispatch => {
    request.then(({ data }) => {
      dispatch({ type: FETCH_POSTS, payload: data });
    });
  };
}

//= ====Comments===//
export function fetchComments(postId) {
  const request = axios.get(`${ROOT_URL}/posts/${postId}/comments`);
  return dispatch => {
    request.then(({ data }) => {
      dispatch({ type: FETCH_COMMENTS, payload: data });
    });
  };
}

export function fetchComment(id) {
  const request = axios.get(`${ROOT_URL}/comments/${id}`);
  return dispatch => {
    request.then(({ data }) => {
      dispatch({ type: FETCH_COMMENT, payload: data });
    });
  };
}

export function createComment(values, parentId) {
  const { author, body } = values;

  const data = {
    id: uuid.v4(),
    parentId,
    timestamp: Date.now(),
    author,
    body
  };
  const request = axios.post(`${ROOT_URL}/comments`, data);
  return dispatch => {
    request.then(response => {
      dispatch({
        type: CREATE_COMMENT,
        payload: response.data
      });
    });
  };
}

export function deleteComment(id, callback) {
  const request = axios.delete(`${ROOT_URL}/comments/${id}`);
  return dispatch => {
    request.then(({ id }) => {
      dispatch({ type: DELETE_COMMENT, payload: id });
      callback();
    });
  };
}

export function editComment(id, updates) {
  const request = axios.put(`${ROOT_URL}/comments/${id}`, updates);
  return dispatch => {
    request.then(response => {
      dispatch({ type: EDIT_COMMENT, payload: id, updates });
    });
  };
}
export function voteForComment(id, vote) {
  const request = axios.post(`${ROOT_URL}/comments/${id}`, { option: vote });
  return dispatch => {
    request.then(({ data }) => {
      dispatch({ type: VOTE_FOR_COMMENT, payload: data });
    });
  };
}
export function sortForPosts(method) {
  return {
    type: SORT_FOR_POSTS,
    payload: method
  };
}
