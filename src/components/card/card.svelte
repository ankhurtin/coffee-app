<script lang="ts">
  import { fade, blur } from "svelte/transition";
  import type { CoffeeItem } from "src/types/api";
  import API from "src/api/api";

  import Tag from "src/components/tag/tag.svelte";

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
      <div class="card__img-placeholder">
        <!-- <i class="bi bi-card-image" /> -->
      </div>
    {:then url}
      <img transition:blur src={url} alt="" class="card__imgEl" />
    {:catch}
      <span>Oops, something went wrong...</span>
    {/await}
  </div>
  <div class="card__content">
    <div class="card__origin">{origin}</div>
    <div class="card__name">{blendName}</div>
    <div class="card__variety">{variety}</div>
    <ul class="card__notes">
      {#each notesList as note}
        <li class="card__note">
          <Tag>{note}</Tag>
        </li>
      {/each}
    </ul>
  </div>
</article>

<style lang="less" scoped>
  @import "src/assets/styles/variables.less";
  @import "src/assets/styles/mixins.less";
  .card {
    width: 320px;
    min-height: 480px;
    border-radius: @border-radius;
    background-color: @black;
    color: @white;
    overflow: hidden;
    &__img {
      width: 100%;
      height: 320px;
      position: relative;
    }

    &__img-placeholder {
      background-color: @grey-light;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 32px;
      .skeleton-line();
    }

    &__intensifier {
      position: absolute;
      right: 14px;
      top: 14px;
      z-index: 1;
      background-color: @bg-grey;
      padding: 4px 8px;
      border-radius: @border-radius;
    }

    &__content {
      padding: 14px;
    }

    &__origin {
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 8px;
    }

    &__name {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 8px;
    }

    &__variety {
      font-size: 14px;
    }

    &__notes {
      width: auto;
      display: flex;
      flex-wrap: nowrap;
      overflow-x: scroll;
      padding: 14px;
      margin-right: -14px;
      margin-left: -14px;
    }

    &__note {
      margin-right: 5px;
      display: inline-flex;
      flex-shrink: 0;
      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
