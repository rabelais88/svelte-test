import _cloneDeep from "lodash/cloneDeep";
import { fetchArticles } from "../api";
import stores from "./index";
const postStore = stores.post;

export const getPosts = async () => {
  const raw = await fetchArticles();
  const posts = raw.map((p, idx) => ({ ...p, index: idx }));
  postStore.update(s => ({ ...s, posts }));
};

export const deletePost = postIndex => {
  postStore.update(s => {
    let filteredPosts = _cloneDeep(s.posts);
    filteredPosts.splice(postIndex, 1);
    filteredPosts = filteredPosts.map((fp, idx) => ({ ...fp, index: idx }));
    return { ...s, posts: filteredPosts };
  });
};
