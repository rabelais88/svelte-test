export const fetchArticles = async () => {
  const raw = await fetch("https://jsonplaceholder.typicode.com/todos");
  const res = await raw.json();
  return res;
};
