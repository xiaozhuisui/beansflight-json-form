<!--
 * @Date: 2022-01-06 16:36:37
 * @LastEditors: 追随
 * @LastEditTime: 2022-01-09 17:28:49
-->
<template>
  <DatePicker
    format="yyyy-MM-dd"
    clearable
    placement="bottom-end"
    :placeholder="config.placeholder"
    :type="datePickerType"
    :options="options"
  >
  </DatePicker>
</template>
<script>
import { DatePicker } from "view-design"
export default {
  name: "DatePickerItem",
  components: {
    DatePicker,
  },
  props: ["config", "rule"],
  computed: {
    datePickerType() {
      return this.config.extendType || "date"
    },
    options() {
      const {
        config: { props = {} },
      } = this
      if ("disabledDate" in props) {
        return {
          disabledDate: props["disabledDate"],
        }
      }
      return null
    },
  },
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
