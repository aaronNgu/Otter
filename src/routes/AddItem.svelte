<script>
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
	let rotation = 0;
</script>

<form
	method="post"
	action="?/add_todo"
	use:enhance={() => {
		return async ({ result, update }) => {
			rotation += 90;
			update();
		};
	}}
	class="w-full flex content-center"
>
	<!-- svelte-ignore a11y-autofocus -->
	<input
		type="text"
		name="name"
		value=""
		autofocus
		class="w-full bg-transparent px-3 py-1 border-2 border-black rounded shadow focus:shadow-lg"
	/>
	<br />
	<button class="ml-2">
		<Icon
			icon="material-symbols:add"
			style="font-size: 32px; transform: rotate({rotation}deg); transition: transform 0.6s ease;"
		/>
	</button>
</form>
