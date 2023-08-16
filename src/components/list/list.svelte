<script lang="ts">
  import { catalogStore } from "src/store/catalog";
  import { afterUpdate, onMount, tick } from "svelte";

  import Card from "src/components/card/card.svelte";
  import CardSkeleton from "src/components/card/card-skeleton.svelte";
  import CircleButton from "src/components/circle-button/circle-button.svelte";

  let isLoading = false;
  let container: HTMLDivElement | null;

  async function addRandomCoffee() {
    isLoading = true;
    await catalogStore.add();
    isLoading = false;
  }

  async function scrollToBottom() {
    await tick();
    if (container) {
      window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    }
  }

  onMount(() => {
    addRandomCoffee();
  });

  afterUpdate(() => {
    scrollToBottom();
  });
</script>

<div bind:this={container} class="container">
  <div class="list">
    <section class="list__items">
      {#each $catalogStore as card}
        <li class="list__item">
          <Card data={card} />
        </li>
      {/each}
      {#if isLoading}
        <CardSkeleton />
      {/if}
    </section>
    <div class="list__controls">
      <CircleButton loading={isLoading} on:click={addRandomCoffee}>
        {#if isLoading}
          <i class="bi bi-three-dots" />
        {:else}
          <i class="bi bi-plus-lg" />
        {/if}
      </CircleButton>
    </div>
  </div>
</div>

<style lang="less">
  .list {
    &__items {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 14px;
      padding-bottom: 120px;
    }

    &__controls {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      padding-bottom: 14px;
    }
  }
</style>
