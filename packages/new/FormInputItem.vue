<template>
  <Col :span="config.span || 8">
    <FormItem
      :label="`${config.label}`"
      :prop="config.key"
      v-if="isShow"
      :style="{
        marginBottom: config.props.bottom ? `${config.props.bottom}px` : '10px',
      }"
    >
      <Input
        v-model="data[config.key]"
        :readonly="readOnly"
        :type="inputType"
        :disabled="disabled"
        :maxlength="inputType !== 'textarea' ? maxLength : null"
        :autosize="inputType === 'textarea'"
      />
    </FormItem>
  </Col>
</template>
<script>
import { Col, FormItem, Input } from "view-design"
export default {
  name: "FormInputItem",
  components: {
    Col,
    FormItem,
    Input,
  },
  props: {
    isShow: {
      type: Boolean,
      default: true,
    },
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
  computed: {
    inputType() {
      const { extendType = "text" } = this.config
      return extendType
    },

    disabled() {
      const { props = {} } = this.config
      if ("disabled" in props) {
        return props["disabled"]
      }
      return false
    },
    maxLength() {
      const { props = {} } = this.config
      if ("maxlength" in props) {
        return props["maxlength"]
      }
      return null
    },
  },
  methods: {},
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
