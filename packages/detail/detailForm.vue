<template>
  <div>
    <div v-show="displayed === 'model'">
      <ModelPanel v-bind="$attrs" v-on="$listeners">
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
            :readOnly="col.props.readOnly"
          >
          </component>
        </Row>
      </ModelPanel>
    </div>
    <Card class="smart-query-card" v-show="displayed === 'panel'">
      <ModelPanel v-bind="$attrs" v-on="$listeners">
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
            :readOnly="col.props.readOnly"
          >
          </component>
        </Row>
        <Row class="code-row-bg" justify="end" type="flex">
          <slot name="footer" :data="formData"></slot>
        </Row>
      </ModelPanel>
    </Card>
  </div>
</template>
<script>
import { Card, Divider, Row } from "view-design"
import FormSelectItem from "../fields/FormSelectItem.vue"
import FormDatepickerItem from "../fields/FormDatePickerItem.vue"
import FormCheckboxItem from "../fields/FormCheckboxItem.vue"
import FormRadioItem from "../fields/FormRadioItem.vue"
import FormSwitchItem from "../fields/FormSwitchItem.vue"
import FormInputItem from "./FormInputItem.vue"
import FormCascaderItem from "./FormCascaderItem.vue"
import ModelPanel from "../fields/ModelItem.vue"
import { titleCase } from "../libs/lib"
import { componentsMap } from "../mappings/formMapping.js"

export default {
  name: "DetailFormPanel",
  inheritAttrs: false,
  components: {
    Card,
    Row,
    Divider,
    ModelPanel,
    FormInputItem,
    FormSelectItem,
    FormCascaderItem,
    FormDatepickerItem,
    FormCheckboxItem,
    FormRadioItem,
    FormSwitchItem,
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
    configForm() {
      return this.config.map((item) => this.formateItem(item))
    },
  },
  methods: {
    formateItem(item) {
      const { row, splitLine, lineTitle } = item
      row.map((column) => {
        let type = column.type || "input"
        let def = componentsMap[titleCase(type)]
        column.tag = def.component
        column.props = Object.assign({}, def.props, column.props)
        return column
      })
      return { splitLine, row, lineTitle }
    },
  },
  watch: {
    data: {
      handler(val) {
        console.log("详情页面赋值", this.formData)
        this.formData = JSON.parse(JSON.stringify(val))
      },
      deep: true,
    },
  },
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
