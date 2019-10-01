import { writable } from "svelte/store";

export const initStore = () => ({
  posts: []
});

const store = initStore();
const postStore = writable(store);

export default postStore;
