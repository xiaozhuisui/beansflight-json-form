<template>
  <Col :span="config.span || 6">
    <label class="query-form-label">{{ config.label }} :</label>
    <Select
      class="query-form-element"
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
  </Col>
</template>
<script>
import props from "../common/comPros"
import { Col, Select, Option } from "view-design"
export default {
  name: "SelectItem",
  components: {
    Col,
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
