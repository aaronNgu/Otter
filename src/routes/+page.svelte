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
	 * @param {{ detail: { new_todo: import("@prisma/client/runtime/library").GetResult<{ id: number; name: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null; }, any> & {}; }; }} event
	 */
	function add_todo(event) {
		todos = [...todos, event.detail.new_todo];
	}

	/**
	 * @param {{ detail: { id: number  }; }} event
	 */
	function delete_todo(event) {
		todos = todos.filter((todo) => todo.id != event.detail.id);
	}
	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Todo list" />
</svelte:head>

<section>
	<ul class="flex flex-col w-96 px-5">
		{#each todos as todo}
			<ListItem item={todo} on:delete_todo={delete_todo} {form} />
		{/each}
		{#if addLoadingState}
			<p class="px-3">Loading...</p>
		{/if}
		<AddItem bind:loading={addLoadingState} on:add_todo={add_todo} {form} />
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
