<template>
  <Col :span="config.span || 8">
    <FormItem :label="`${config.label}`" :prop="config.key">
      <DatePicker
        v-model="data[config.key]"
        :readonly="readOnly"
        format="yyyy-MM-dd"
        :type="datePickerType"
        :placeholder="config.placeholder"
        clearable
      />
    </FormItem>
  </Col>
</template>
<script>
import { DatePicker, FormItem } from "view-design";
export default {
  name: "FormDatepickerItem",
  components: {
    DatePicker,
    FormItem,
  },
  props: {
    config: {
      type: Object,
      default: () => {},
    },
    data: {
      type: Object,
      default: () => {},
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      validate: null,
    };
  },
  computed: {
    datePickerType() {
      return this.config.extendType || "date";
    },
  },
  methods: {
    initValidate(val) {
      // console.log(val);
    },
  },
  watch: {
    config: {
      handler(val) {
        if (val.rule) this.initValidate(JSON.parse(JSON.stringify(val)));
      },
      deep: true,
    },
  },
};
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
