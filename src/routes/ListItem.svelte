<script>
	import { enhance } from '$app/forms';
	import ItemInput from './ItemInput.svelte';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	/**
	 * @type {{ id: any; name: any; }}
	 */
	export let item;
	export let loading = false;
	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<li class="flex flex-col m-2">
	<div class="flex justify-center">
		<form
			method="POST"
			action="?/update_todo"
			use:enhance={() => {
				return async ({ update }) => {
					update({ reset: false });
				};
			}}
			class="w-full"
		>
			<input name="id" value={item.id} type="hidden" />
			<ItemInput name={item.name} />
		</form>
		<form
			method="POST"
			action="?/delete_todo"
			use:enhance={() => {
				loading = true;
				return async ({ result, update }) => {
					loading = false;
					if (result.type == 'success') {
						dispatch('delete_todo', {
							id: result.data?.id
						});
					}
					update();
				};
			}}
			class="flex ml-2"
		>
			<input name="id" value={item.id} type="hidden" />
			{#if loading}
				<p class="px-2">...</p>
			{:else}
				<button>
					<Icon icon="material-symbols:delete-outline" style="font-size: 32px" />
				</button>
			{/if}
		</form>
	</div>
	{#if !!form?.error_msg && form?.id == item.id}
		<p class="text-error">
			{form?.error_msg || ''}
		</p>
	{/if}
</li>
