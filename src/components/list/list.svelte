<script lang="ts">
  import { catalogStore } from "src/store/catalog";
  import Card from "src/components/card/card.svelte";
  import { onMount } from "svelte";

  let isLoading = false;

  async function addRandomCoffee() {
    isLoading = true;
    await catalogStore.add();
    isLoading = false;
  }

  onMount(() => {
    addRandomCoffee();
  });
</script>

<div class="container">
  <section class="list">
    {#each $catalogStore as card}
      <li class="list__item">
        <Card data={card} />
      </li>
    {/each}
  </section>
  <button on:click={addRandomCoffee}>{isLoading ? "...loading" : "Add new"}</button>
</div>

<style lang="less">
  .list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 15px;
  }
</style>
