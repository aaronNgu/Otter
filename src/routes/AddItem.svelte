<script>
	import { enhance } from '$app/forms';
</script>

<form
	method="post"
	action="?/add_todo"
	use:enhance={() => {
		return async ({ result, update }) => {
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
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
		</svg>
	</button>
</form>
