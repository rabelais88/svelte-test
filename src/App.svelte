<svelte:options immutable/>

<script>
//   import Button from "./Button.svelte";
  import PostItem from "./components/postItem.svelte";
  import _padStart from "lodash/padStart";
  import _cloneDeep from "lodash/cloneDeep";
  import stores from "./store";
  import { onDestroy, onMount } from "svelte";
  import { getPosts } from "./store/postActions";
  const { user, post } = stores;

  // let svgcomponent = null;
  let testValue = 123;
  let myname = "";
  // reactive handling - watch and recalculated if any related values change
  $: paddedValue = _padStart(testValue, 5, "0");
  $: {
    if (testValue === 124) alert("wowy! first interaction!");
  } // multiline

  onMount(() => {
    console.log("app.svelte mounted!");
    //   console.log(svgcomponent);
  });

  const onAdd = () => {
    testValue += 1;
  };

  const onNameChange = e => {
    myname = e.target.value;
  };

  const onLoadPosts = () => {
    console.log("loading posts");
    getPosts();
  };

  let stored = null;
  let posts = [];

  const unsubscribeUserStore = user.subscribe(us => {
    stored = us; // confusing. values inside function are also traced?
  });
  const unsubscribePostStore = post.subscribe(ps => {
    posts = ps.posts || [];
  });

  const onUserNameChange = e =>
    user.update(s => {
      const newS = _cloneDeep(s);
      newS.user.name = e.target.value; // svelte 3 doesn't support namespace
      return newS;
    });

  onDestroy(() => {
    console.log("app.svelte destroyed");
    unsubscribeUserStore();
    unsubscribePostStore();
  });
</script>

<style>
  main {
    font-family: sans-serif;
    text-align: center;
  }
</style>

<main>
  <p>padded value: {paddedValue}</p>
  <input type="text" value={myname} on:input={onNameChange}/>
  <input type="text" bind:value={myname} />
  <p>your name is {myname}</p>
  <hr />
  <p>this value is preserved in store</p>
  <p>{JSON.stringify(stored)}</p>
  <input type="text" value={stored.user.name} on:input={onUserNameChange}/>
  <!-- <svg bind:this={svgcomponent}></svg> -->
  {#if posts.length < 1}
    <p>post not loaded yet</p>
    <button on:click={onLoadPosts}>load posts</button>
  {/if}
  <div>
    <p>post length: {posts.length}</p>
    <!-- bug exists on iterating over stored data-->
    {#each posts as postItem}
      <PostItem
        title={postItem.title}
        id={postItem.id}
        userId={postItem.userId}
        index={postItem.index}
      />
    {/each}
  </div>
</main>