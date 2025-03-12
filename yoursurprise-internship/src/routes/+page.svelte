<script>
    import { onMount } from 'svelte';

    /**
     * @type {any[]}
     */
    let posts = [];
    let isLoading = true;
    /**
     * @type {unknown}
     */
    let error = null;
   
    onMount(async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      // @ts-ignore
      posts = data.filter(post => post.userId === 8);
    } catch (err) {
      // @ts-ignore
      error = err.message;
    } finally {
      isLoading = false;
    }
  });

</script>

<div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-2xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Posts by User 8</h1>
  
      {#if isLoading}
        <div class="text-center py-8">
          <p class="text-gray-600">Loading posts...</p>
        </div>
      {:else if error}
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
          <p>Error: {error}</p>
        </div>
      {:else}
        <div class="space-y-6">
          {#each posts as post}
            <div class="bg-white shadow-md rounded-lg p-6">
              <h2 class="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
              <p class="text-gray-600">{post.body}</p>
              <div class="mt-4 flex items-center space-x-4">
                <button class="text-gray-500 hover:text-blue-500">
                  <span class="sr-only">Like</span>
                  ❤️
                </button>
                <button class="text-gray-500 hover:text-green-500">
                  <span class="sr-only">Repost</span>
                  🔄
                </button>
                <button class="text-gray-500 hover:text-purple-500">
                  <span class="sr-only">Share</span>
                  📤
                </button>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>