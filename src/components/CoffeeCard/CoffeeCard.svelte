<script lang="ts">
  import API from 'src/api/api';
  import { type CoffeeItem } from 'src/types/catalog.t';
  import { blur, fade } from 'svelte/transition';

  import Tag from 'src/components/Tag/Tag.svelte';
  import ExclamationOctagonIcon from 'svelte-bootstrap-icons/lib/ExclamationOctagon.svelte';

  export let data: CoffeeItem;

  async function getRandomImageUrl() {
    const blob = await API.getRandomCoffeeImage();
    return URL.createObjectURL(blob);
  }

  const { origin, blendName, variety, notes, intensifier } = data;
</script>

<article transition:fade class="card">
  <div class="card__img">
    <div class="card__intensifier">{intensifier}</div>
    {#await getRandomImageUrl()}
      <div class="card__img-placeholder" />
    {:then url}
      <img transition:blur src={url} alt="" class="card__img-el" />
    {:catch}
      <div class="card__error-img">
        <span class="card__error-img-text">Oops, something went wrong...</span>
        <ExclamationOctagonIcon />
      </div>
    {/await}
  </div>
  <div class="card__content">
    <div class="card__origin">{origin}</div>
    <div class="card__name">{blendName}</div>
    <div class="card__variety">{variety}</div>
    <ul class="card__notes">
      {#each notes as note}
        <li class="card__note">
          <Tag>{note}</Tag>
        </li>
      {/each}
    </ul>
  </div>
</article>

<style lang="less" scoped>
  @import 'src/assets/styles/variables.less';
  @import 'src/assets/styles/mixins.less';
  .card {
    width: 100%;
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

    &__img-el {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
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

    &__error-img {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: 24px;
    }

    &__error-img-text {
      text-align: center;
      margin-bottom: 8px;
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
      &::-webkit-scrollbar {
        display: none;
      }
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
