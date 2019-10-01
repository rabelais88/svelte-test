import { writable } from "svelte/store";

export const initStore = () => ({
  user: {
    name: "noname",
    age: 24
  }
});

const store = initStore();
const userStore = writable(store);

export default userStore;
