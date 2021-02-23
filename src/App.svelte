<script lang="ts">
  import { CompoundType } from './models/compound';
  import { tweened } from 'svelte/motion';
  import { linear } from 'svelte/easing';
  import parse from './logic/parseCompound';

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

<main>
  <h1>Nomenclinator</h1>

  <form>
    <input class="text" type="text" bind:value={input} />
    <input
      class="button"
      on:click|preventDefault={setOutput}
      type="submit"
      value="Go!"
    />
  </form>

  <div class="out-container">
    <div class="title-container">
      <b>JSON:</b>
      <button class="show-json" on:click={toggleShowJSON}>
        <div style="transform: rotate({$rotation}deg)">&#8250;</div>
      </button>
    </div>
    <div class="out">
      <div class="json-container">
        {#if showJSON}
          <pre>
          {JSON.stringify(out, undefined, 2)}
        </pre>
        {/if}
      </div>
      <br />
      <b>Compound Type</b>: {CompoundType[out.compoundType]}
    </div>
  </div>
</main>

<style type="text/scss">
  $color-bg: #222831;
  $color-fg: #eeeeee;
  $color-1: #393e46;
  $color-2: #00adb5;

  $font-stack: Arial, Ubuntu, Helvetica, sans-serif;

  :global(body) {
    background-color: $color-bg;
  }

  main {
    width: 85%;
    margin: 5% auto;
    font-family: $font-stack;
    text-align: center;
    color: $color-fg;
  }

  form {
    display: flex;
    justify-content: space-evenly;

    * {
      border: $color-2 solid 1px;
      border-radius: 5px;
      background-color: $color-1;
      color: $color-fg;
      padding: 0.5em;
    }

    .text {
      margin-right: 1em;
      flex-grow: 5;
    }
    .button {
      margin-left: 1em;
      flex-grow: 1;
    }
  }

  .out-container {
    text-align: left;
    margin: 5em auto;
    background-color: $color-1;
    padding: 2em;
    border: $color-2 solid 1px;
    border-radius: 5px;
    overflow: auto;

    .out {
      min-width: 250px;
    }

    .json-container {
      font-family: monospace;
      margin: 1em;
      background-color: $color-bg;
      padding: 1em;
      border: $color-2 solid 1px;
      border-radius: 5px;
    }

    .title-container {
      display: flex;
      justify-content: space-between;
      min-width: 100px;

      .show-json {
        border: none;
        font-weight: bolder;
        font-size: larger;
        color: $color-fg;
        background-color: $color-bg;
        width: 1.25em;
        height: 1.25em;
        border-radius: 5px;
      }
    }
  }

  h1 {
    color: $color-2;
  }
</style>
