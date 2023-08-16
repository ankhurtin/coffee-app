<script lang="ts">
  export let loading: boolean;
</script>

<button on:click class="circle-button" class:_loading={loading}><slot /></button>

<style lang="less" scoped>
  @import "src/assets/styles/variables.less";

  .circle-button {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;
    border: none;
    background-color: @white;
    transition: @transition;

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
