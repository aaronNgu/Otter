<script>
	import { fly } from 'svelte/transition';
	import { sineOut } from 'svelte/easing';
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
	in:fly={{ duration: 1000, easing: sineOut }}
	class="w-full bg-transparent px-3 py-1 border-2 border-black rounded shadow focus:shadow-lg"
/>
