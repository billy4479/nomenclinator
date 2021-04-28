<script lang="ts">
  import CompoundType from './models/compoundType';
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
    showJSON = !showJSON;
  }
</script>

<main class="mt-10 w-4/5 max-w-6xl m-auto text-center m-5">
  <h1 class="text-blue-600 text-4xl m-1 md:text-6xl">Nomenclinator</h1>

  <form class="mt-7 flex justify-center">
    <input
      class="shadow border border-gray-100 rounded px-3 py-2 my-3 flex-grow placeholder-gray-500 focus:ring"
      type="text"
      placeholder="Enter a compound..."
      bind:value={input}
    />
    <input
      class="m-3 mr-0 px-3 py-2 shadow rounded focus:ring"
      on:click|preventDefault={setOutput}
      type="submit"
      value="Go!"
    />
  </form>

  <div class="text-left rounded shadow p-5 mb-10">
    <b>Compound Type</b>: {CompoundType[out.compoundType]}

    <div class="mt-5">
      <div class="flex justify-between">
        <b
          >JSON
          <small>(roba da nerd)</small>
          :</b
        >
        <button
          class="rounded shadow py-1 px-2 focus:ring"
          on:click={toggleShowJSON}
        >
          {#if showJSON}
            Hide
          {:else}
            Show
          {/if}
        </button>
      </div>
      <div>
        {#if showJSON}
          <pre
            class="bg-gray-100 shadow p-5 rounded m-3 my-5 overflow-auto text-gray-900">
            {JSON.stringify(out, undefined, 2)}
          </pre>
        {/if}
      </div>
    </div>
  </div>
</main>

<footer>&copy; Giacomo Ellero 2021 <br /> Made with ❤️</footer>

<style>
  main {
    min-height: calc(100vh - 120px);
    min-width: 300px;
  }
  footer {
    text-align: center;
  }
</style>
