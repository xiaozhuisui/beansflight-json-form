<!--
 * @Date: 2022-01-06 16:36:37
 * @LastEditors: 追随
 * @LastEditTime: 2022-01-09 17:28:40
-->
<template>
  <Input clearable :placeholder="config.placeholder" />
</template>
<script>
import props from "../common/comPros"
import { Input } from "view-design"
export default {
  name: "InputItem",
  components: {
    Input,
  },
  props,
  mounted() {
    console.log(this.rule)
  },
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
