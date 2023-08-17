<script lang="ts">
  import { catalogStore } from 'src/store/catalog';
  import { onDestroy, onMount, tick } from 'svelte';

  import PlusIcon from 'svelte-bootstrap-icons/lib/Plus.svelte';
  import Card from 'src/components/CoffeeCard/CoffeeCard.svelte';
  import CardSkeleton from 'src/components/CoffeeCard/CoffeCardSkeleton.svelte';
  import CircleButton from 'src/components/CircleButton/CircleButton.svelte';

  let isLoading = false;
  let interval = null;
  const timeout = 30000;

  $: if ($catalogStore && $catalogStore.length > 1) {
    scrollToBottom();
  }

  async function addRandomCoffee() {
    if (interval) interval.reset();

    try {
      isLoading = true;
      await catalogStore.add();
      isLoading = false;
    } catch (error) {
      console.error(error);
      isLoading = false;
    }
  }

  async function scrollToBottom() {
    await tick();
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
  }

  function resettableInterval(fn: () => void, ms: number) {
    let interval = setInterval(fn, ms);

    return {
      reset: () => {
        clearInterval(interval);
        interval = setInterval(fn, ms);
      },
      clear: () => clearInterval(interval)
    };
  }

  onMount(async () => {
    await addRandomCoffee();
    interval = resettableInterval(addRandomCoffee, timeout);
  });

  onDestroy(() => {
    interval.clear();
  });
</script>

<div class="container">
  <div class="list">
    <ul class="list__items">
      {#each $catalogStore as card}
        <li class="list__item">
          <Card data={card} />
        </li>
      {/each}
      {#if isLoading}
        <li class="list__item">
          <CardSkeleton />
        </li>
      {/if}
    </ul>
    <div class="list__controls">
      <CircleButton loading={isLoading} on:click={addRandomCoffee}>
        <PlusIcon width={48} height={48} />
      </CircleButton>
    </div>
  </div>
</div>

<style lang="less">
  @import 'src/assets/styles/variables.less';

  .list {
    width: 100%;
    &__items {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 320px);
      grid-gap: 14px;
      padding-top: 14px;
      padding-bottom: 120px;

      @media @md {
        grid-template-columns: repeat(2, 1fr);
      }

      @media @xs {
        display: block;
      }
    }

    &__item {
      width: 100%;

      @media @xs {
        width: 304px;
        margin: 0 auto;
        margin-bottom: 14px;
      }
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
