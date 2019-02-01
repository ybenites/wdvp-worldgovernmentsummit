<template lang="html">
  <div class="border-menu">
    <div class="idva-menu-left">
      <div>
        THE FUTURE OF
      </div>
      <div>
        GOVERNMENT
      </div>
    </div>
    <div class="idva-menu-right">
      <img src="~images/logo-IDVA2.png" width="200"  alt="">
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.border-menu {
    border-top: 1px solid #333;
    border-bottom: 1px solid #333;
    margin: 15px 0;
    padding: 10px 0;
    @include clearfix;
    .idva-menu-left {
        display: inline-block;
        vertical-align: middle;
        margin-right: -4px;
        width: 30%;
    }
    .idva-menu-right {
        display: inline-block;
        vertical-align: middle;
        width: 70%;
        margin-right: -4px;
        text-align: right;
        img {
            max-width: 100%;
            margin: 0 auto;
            vertical-align: middle;
            height: auto;
        }
    }
}
</style>
