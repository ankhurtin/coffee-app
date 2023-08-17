<script lang="ts">
  import ThreeDotsIcon from 'svelte-bootstrap-icons/lib/ThreeDots.svelte';

  export let loading: boolean;
</script>

<button on:click class="circle-button" class:_loading={loading}>
  {#if loading}
    <ThreeDotsIcon width={32} height={32} />
  {:else}
    <slot />
  {/if}
</button>

<style lang="less" scoped>
  @import 'src/assets/styles/variables.less';

  .circle-button {
    width: 100px;
    height: 100px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;
    border: none;
    background-color: @white;
    transition: @transition;

    @media @xs {
      width: 80px;
      height: 80px;
    }

    &._loading {
      opacity: 0.5;
      pointer-events: none;
    }

    @media @hover {
      &:hover {
        background-color: @black;
        color: @white;
      }
    }
  }
</style>
