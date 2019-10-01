<svelte:options immutable/>
<script>
  import { deletePost } from "../store/postActions";
  export let userId = "";
  export let id = "";
  export let title = "";
  export let completed = "";
  export let index = -1;
  const onDeletePost = () => {
    console.log("deleting post...", index);
    deletePost(index);
  };
</script>
<style>
  .post-item {
    border: solid 1px black;
  }
</style>
<div class="post-item">
  <p>id: {id}</p>
  <p>userId: {userId}</p>
  <p>title: {title}</p>
  <button on:click={onDeletePost}>delete this</button>
</div>