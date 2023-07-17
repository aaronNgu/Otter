<script>
	import AddItem from './AddItem.svelte';
	export let data;
	import ListItem from './ListItem.svelte';
	$: ({ todos } = data);

	/**
	 * @type {boolean}
	 */
	let addLoadingState;

	/**
	 * @param {{ detail: { new_todo: { name: string; id: number }; }; }} event
	 */
	function add_todo(event) {
		todos = [...todos, event.detail.new_todo];
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Todo list" />
</svelte:head>

<section>
	<ul class="flex flex-col w-96 px-5">
		{#each todos as todo}
			<ListItem item={todo} />
		{/each}
		{#if addLoadingState}
			<p class="px-3">Loading...</p>
		{/if}
		<li class="flex justify-center m-3">
			<AddItem bind:loading={addLoadingState} on:add_todo={add_todo} />
		</li>
	</ul>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 0.6;
	}
</style>
