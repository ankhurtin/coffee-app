<script lang="ts">
  import { fade, blur } from "svelte/transition";
  import type { CoffeeItem } from "src/types/api";
  import API from "src/api/api";

  export let data: CoffeeItem;

  async function getRandomImageUrl() {
    const blob = await API.getRandomCoffeeImage();
    return URL.createObjectURL(blob);
  }

  const { origin, blend_name: blendName, variety, notes, intensifier } = data;
  const notesList = notes.split(",");
</script>

<article transition:fade class="card">
  <div class="card__img">
    <div class="card__intensifier">{intensifier}</div>
    {#await getRandomImageUrl()}
      <span>...loading</span>
    {:then url}
      <img transition:blur src={url} alt="" class="card__imgEl" />
    {:catch}
      <span>error</span>
    {/await}
  </div>
  <div class="card__origin">{origin}</div>
  <div class="card__name">{blendName}</div>
  <div class="card__variety">{variety}</div>
  <ul class="card__notes">
    {#each notesList as note}
      <li class="card__note">{note}</li>
    {/each}
  </ul>
</article>

<style lang="less">
  .card {
    width: 320px;
    height: 480px;
    border: 2px solid black;
    & img {
      width: 100%;
    }

    &__notes {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: scroll;
      padding-right: 15px;
      padding-bottom: 15px;
    }

    &__note {
      margin-right: 5px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
