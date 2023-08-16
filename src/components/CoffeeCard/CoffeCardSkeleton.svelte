<article class="card-skeleton">
  <div class="card-skeleton__img">
    <div class="card-skeleton__intensifier" />
    <div class="card-skeleton__img-placeholder" />
  </div>
  <div class="card-skeleton__content">
    <div class="card-skeleton__origin" />
    <div class="card-skeleton__name" />
    <div class="card-skeleton__variety" />
    <ul class="card-skeleton__notes">
      {#each [1, 2, 3, 4, 5] as note}
        <li class="card-skeleton__note" />
      {/each}
    </ul>
  </div>
</article>

<style lang="less" scoped>
  @import "src/assets/styles/variables.less";
  @import "src/assets/styles/mixins.less";

  .card-skeleton {
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
      width: 46px;
      height: 26px;
      border-radius: @border-radius;
    }

    &__content {
      padding: 14px;
    }

    &__origin {
      width: 120px;
      height: 16px;
      margin-bottom: 8px;
    }

    &__name {
      width: 180px;
      height: 20px;
      margin-bottom: 8px;
    }

    &__variety {
      width: 100px;
      height: 16px;
    }

    &__origin,
    &__name,
    &__variety,
    &__note {
      border-radius: @border-radius;
      .skeleton-line();
    }

    &__notes {
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      padding: 14px 0;
    }

    &__note {
      margin-right: 5px;
      display: inline-flex;
      flex-shrink: 0;
      width: 62px;
      height: 26px;
      background-color: @grey-light;
      border-radius: @border-radius;
      flex-shrink: 0;
      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
