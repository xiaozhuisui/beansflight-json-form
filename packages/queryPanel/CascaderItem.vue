<!--
 * @Date: 2022-01-08 01:27:49
 * @LastEditors: 追随
 * @LastEditTime: 2022-01-09 17:14:37
-->
<template>
  <Cascader
    v-model="rule[config.key]"
    :data="config.options"
    clearable
    change-on-select
    filterable
    :placeholder="config.placeholder"
    trigger="hover"
    @on-change="change"
  >
  </Cascader>
</template>
<script>
import props from "../common/comPros"
import { Cascader } from "view-design"
export default {
  name: "CascaderItem",
  components: {
    Cascader,
  },
  props,
  methods: {
    change(...arges) {
      this.$emit("change", { ...arges })
    },
  },
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
