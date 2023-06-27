<script>
	import { enhance } from '$app/forms';
	import ItemInput from './ItemInput.svelte';
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
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	</form>
</li>
