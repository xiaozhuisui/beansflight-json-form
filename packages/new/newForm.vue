<template>
  <ModelPanel v-bind="$attrs" v-on="$listeners" @cance-modal="cancel">
    <Form
      ref="form"
      :label-width="130"
      :model="formData"
      :rules="rules"
      :label-colon="true"
    >
      <Row :gutter="16" v-for="(row, index) in configForm" :key="index">
        <!-- 分割线 -->
        <template v-if="row.splitLine">
          <Divider orientation="left">{{ row.lineTitle || "" }}</Divider>
        </template>
        <!-- 行内容 -->
        <component
          :is="col.tag"
          v-for="(col, index) in row.row"
          :key="index"
          :config="col"
          :data="formData"
          :isShow="col._ifShow"
        >
        </component>
      </Row>
    </Form>
    <template v-if="!$slots.footer">
      <Row class="code-row-bg" justify="end" type="flex">
        <Button @click="cancel" style="margin-right: 10px">取消</Button>
        <Button @click="save" type="primary">保存</Button>
      </Row>
    </template>
    <Row class="code-row-bg" justify="end" type="flex">
      <slot name="footer" :data="formData"></slot>
    </Row>
  </ModelPanel>
</template>
<script>
import { Form, Row, Button, Divider } from "view-design"
import ModelPanel from "../fields/ModelItem.vue"
import FormUploadItem from "../fields/FormUploadItem"
import FormSelectItem from "../fields/FormSelectItem.vue"
import FormDatepickerItem from "../fields/FormDatePickerItem.vue"
import FormCheckboxItem from "../fields/FormCheckboxItem.vue"
import FormSwitchItem from "../fields/FormSwitchItem.vue"
import FormRadioItem from "../fields/FormRadioItem.vue"
import FormInputItem from "./FormInputItem.vue"
import FormCascaderItem from "./FormCascaderItem.vue"
import { componentsMap } from "../mappings/formEditMapping"
import { titleCase, isFunc, isObj } from "../libs/lib"

export default {
  name: "NewFormPanel",
  inheritAttrs: false,
  components: {
    Form,
    Row,
    Divider,
    Button,
    ModelPanel,
    FormInputItem,
    FormSelectItem,
    FormCascaderItem,
    FormDatepickerItem,
    FormCheckboxItem,
    FormRadioItem,
    FormSwitchItem,
    FormUploadItem,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
      require: true,
    },
    config: {
      type: Array,
      default: () => [],
      require: true,
    },
  },
  data() {
    return {
      formData_deep: { ...this.data },
    }
  },
  computed: {
    formData() {
      // console.log("计算属性开始监听formData", this.data);
      return this.data
    },
    // 配置初始化
    configForm() {
      return this.config.map((item) => this.formateItem(item, this.data))
    },
    // 必填项验证
    rules() {
      const row = this.config
      const rules = {}
      row.forEach((i) => {
        const { row } = i
        row.forEach((item) => {
          rules[item.key] = item.rule || []
        })
      })
      return rules
    },
  },
  methods: {
    formateItem(item, form) {
      const { row, splitLine, lineTitle } = item
      row.map((column) => {
        let type = column.type || "input"
        let def = componentsMap[titleCase(type)]
        column.tag = def.component
        column.props = Object.assign({}, def.props, column.props)
        if (isObj(form) && form.hasOwnProperty(column.key)) {
          if ("control" in column) {
            if (Object.keys(column.control).find((key) => key === "handle")) {
              const {
                control: { handle },
              } = column
              column._ifShow = isFunc(handle) ? handle(form) : true
            }
          }
        }
        return column
      })
      return { splitLine, row, lineTitle }
    },
    cancel() {
      this.$refs.form.resetFields()
      this.$emit("cancel")
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let emitForm = JSON.parse(JSON.stringify(this.data))
          this.$refs["form"].resetFields()
          this.$emit("sumbit", emitForm)
        } else {
          this.$Message.error("参数验证错误，请仔细填写表单数据!")
        }
      })
    },
  },
  watch: {
    formData: {
      handler(val) {
        this.config.map((item) => this.formateItem(item, val))
      },
      deep: true,
    },
  },
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
