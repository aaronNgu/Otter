<script>
	/**
	 * @type {string}
	 */
	export let name = '';
	export let ref = null;
</script>

<input
	type="text"
	name="name"
	bind:this={ref}
	value={name}
	class="w-full bg-transparent px-3 py-1 border-2 border-black rounded shadow focus:shadow-lg"
/>
