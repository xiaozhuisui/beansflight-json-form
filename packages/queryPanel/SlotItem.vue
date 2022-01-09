<!--
 * @Date: 2022-01-07 17:44:58
 * @LastEditors: 追随
 * @LastEditTime: 2022-01-09 16:48:19
-->
<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
import props from "../common/comPros"
export default {
  name: "InputItem",
  props,
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
