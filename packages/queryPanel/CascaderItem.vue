<template>
  <Col :span="config.span || 6">
    <label class="query-form-label">{{ config.label }} :</label>
    <Cascader
      v-model="rule[config.key]"
      :data="config.options"
      clearable
      change-on-select
      filterable
      :placeholder="config.placeholder"
      class="query-form-element"
      trigger="hover"
    >
    </Cascader>
  </Col>
</template>
<script>
import props from "../common/comPros";
import { Col, Cascader } from "view-design";
export default {
  name: "CascaderItem",
  components: {
    Col,
    Cascader,
  },
  props,
};
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
