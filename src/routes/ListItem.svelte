<script>
	import { enhance } from '$app/forms';
	import ItemInput from './ItemInput.svelte';
	import Icon from '@iconify/svelte';
	/**
	 * @type {{ name: string; id: number }}
	 */
	export let item;
</script>

<li class="flex justify-center m-3">
	<form
		method="POST"
		action="?/update_todo"
		use:enhance={() => {
			return async ({ result, update }) => {
				update({ reset: false });
			};
		}}
		class="w-full"
	>
		<input name="id" value={item.id} type="hidden" />
		<ItemInput name={item.name} />
	</form>
	<form method="POST" action="?/delete_todo" use:enhance class="flex ml-2">
		<input name="id" value={item.id} type="hidden" />
		<button>
			<Icon icon="material-symbols:delete-outline" style="font-size: 32px" />
		</button>
	</form>
</li>
