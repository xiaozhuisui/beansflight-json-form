<template>
  <div>
    <div v-show="displayed === 'model'">
      <ModelPanel v-bind="$attrs" v-on="$listeners" @cance-modal="cancel">
        <Form
          ref="form"
          v-bind="$attrs"
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
            <DynamicCell
              v-for="(col, index) in row.row"
              :key="index"
              :config="col"
              :data="formData"
              :isShow="col._ifShow"
              v-on="col.control"
            ></DynamicCell>
          </Row>
        </Form>
        <template v-if="!$slots.footer">
          <Row class="code-row-bg" justify="end" type="flex">
            <Button @click="cancel" style="margin-right: 10px">取消</Button>
            <Button @click="save" type="primary">保存</Button>
          </Row>
        </template>
        <Row class="code-row-bg" justify="end" type="flex">
          <slot name="footer"></slot>
        </Row>
      </ModelPanel>
    </div>
    <Card class="smart-query-card" v-show="displayed === 'panel'">
      <Form
        ref="form"
        v-bind="$attrs"
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
          <DynamicCell
            v-for="(col, index) in row.row"
            :key="index"
            :config="col"
            :data="formData"
            :isShow="col._ifShow"
            v-on="col.control"
          ></DynamicCell>
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
    </Card>
  </div>
</template>
<script>
import { Card, Form, Row, Button, Divider } from "view-design"
import ModelPanel from "../fields/ModelItem.vue"
import { componentsMap } from "../mappings/formEditMapping"
import { titleCase, isFunc, isObj } from "../libs/lib"
import DynamicCell from "./DynamicCell.vue"

export default {
  name: "EditFormPanel",
  inheritAttrs: false,
  components: {
    Card,
    Form,
    Row,
    Divider,
    Button,
    ModelPanel,
    DynamicCell,
  },
  props: {
    displayed: {
      // 组件展现形式 model:弹窗 panel: 平面
      type: String,
      default: () => "model",
    },
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
      formData: {},
    }
  },
  computed: {
    // 配置初始化
    configForm() {
      return this.config.map((item) => this.formateItem(item, this.formData))
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
            if (
              Object.keys(column.control).find((key) => key === "hiddenOption")
            ) {
              const {
                control: { hiddenOption },
              } = column
              column._ifShow = isFunc(hiddenOption) ? hiddenOption(form) : true
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
          let emitForm = JSON.parse(JSON.stringify(this.formData))
          this.$emit("sumbit", emitForm)
        } else {
          this.$Message.error("参数验证错误，请仔细填写表单数据!")
        }
      })
    },
  },
  watch: {
    data: {
      handler(val) {
        this.$refs["form"] && this.$refs["form"].resetFields()
        this.formData = JSON.parse(JSON.stringify(val))
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
