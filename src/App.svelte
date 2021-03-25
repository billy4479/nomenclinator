<script lang="ts">
  import { CompoundType } from './models/compound';
  import { tweened } from 'svelte/motion';
  import { linear } from 'svelte/easing';
  import parse from './logic/parseCompound';
  import './tailwind.css';

  let input = '';
  let showJSON = false;

  let out = parse('H2O');

  function setOutput(): void {
    out = parse(input);
  }

  function toggleShowJSON() {
    rotation.update((val) => {
      if (val === 180) return 90;
      return 180;
    });
    showJSON = !showJSON;
  }

  const rotation = tweened(180, { duration: 100, easing: linear });
</script>

<main class="mt-10 text-white w-4/5 max-w-3xl m-auto text-center m-5">
  <h1 class="text-blue-400 text-6xl m-1">Nomenclinator</h1>

  <form class="mt-10">
    <input
      class="bg-gray-800 border-2 border-blue-400 rounded px-3 py-2 outline-none focus:ring"
      type="text"
      bind:value={input}
    />
    <input
      class="m-3 px-3 py-2 bg-gray-700 border-2 border-blue-400 rounded outline-none focus:ring"
      on:click|preventDefault={setOutput}
      type="submit"
      value="Go!"
    />
  </form>

  <div class="text-left border rounded border-blue-400 p-5">
    <div class="flex justify-between">
      <b>JSON:</b>
      <button
        class="w-7 h-7 border rounded border-blue-400 bg-gray-700 pt-1 outline-none"
        on:click={toggleShowJSON}
      >
        <div style="transform: rotate({$rotation}deg)">&#8250;</div>
      </button>
    </div>
    <div>
      {#if showJSON}
        <pre
          class="bg-gray-700 p-5 rounded m-3 my-5">
          {JSON.stringify(out, undefined, 2)}
        </pre>
      {/if}
    </div>
    <b>Compound Type</b>: {CompoundType[out.compoundType]}
  </div>
</main>

<style>
  :global(body) {
    @apply bg-gray-800;
  }
</style>
