<script>
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let rotation = 0;
	export let loading = false;
	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<li class="flex flex-col justify-center m-2">
	<form
		method="post"
		action="?/add_todo"
		use:enhance={() => {
			loading = true;
			const rotateCross = async () => {
				while (loading) {
					rotation += 180;
					await new Promise((resolve) => setTimeout(resolve, 1 * 250));
				}
			};
			rotateCross();
			return async ({ result, update }) => {
				loading = false;
				rotation += 90;
				if (result.type == 'success') {
					dispatch('add_todo', {
						new_todo: result.data?.new_todo
					});
				}
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
	{#if !!form?.error_msg && form?.id == 0}
		<p class="text-error">
			{form?.error_msg || ''}
		</p>
	{/if}
</li>
