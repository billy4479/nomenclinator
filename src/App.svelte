<script lang="ts">
  import Compound from './models/compound';

  import PeriodicTable from './models/periodicTable';

  console.log(Compound.parse('H2O'));
</script>

<main>
  <h1>Nomenclinator</h1>
</main>

<style type="text/scss">
  $color-bg: #222831;
  $color-fg: #eeeeee;
  $color-1: #393e46;
  $color-2: #00adb5;

  $font-stack: Arial, Ubuntu, Helvetica, sans-serif;

  :global(body) {
    background-color: $color-bg;
    width: 85%;
    margin: 5% auto;
    font-family: $font-stack;
    text-align: center;
  }

  h1 {
    color: $color-2;
  }
</style>
