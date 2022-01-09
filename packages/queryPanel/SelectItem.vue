<!--
 * @Date: 2022-01-08 01:27:10
 * @LastEditors: 追随
 * @LastEditTime: 2022-01-09 17:19:46
-->
<template>
  <Select
    clearable
    :placeholder="config.placeholder"
    filterable
    v-model="rule[config.key]"
    @on-change="change"
  >
    <Option
      v-for="(option, index) in config.options"
      :value="option.value"
      :key="index"
      >{{ option.label }}
    </Option>
  </Select>
</template>
<script>
import props from "../common/comPros"
import { Select, Option } from "view-design"
export default {
  name: "SelectItem",
  components: {
    Select,
    Option,
  },
  props,
  watch: {
    config: {
      handler(val) {
        // console.log(val);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    change(event) {
      this.$emit("change", event)
    },
  },
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
