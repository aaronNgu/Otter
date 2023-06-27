<script>
	import AddItem from './AddItem.svelte';
	export let data;
	import ListItem from './ListItem.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Todo list" />
</svelte:head>

<section>
	<ul class="flex flex-col w-96">
		{#each data.todos as todo}
			<ListItem item={todo} />
		{/each}
		<li class="flex justify-center m-3">
			<AddItem />
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
