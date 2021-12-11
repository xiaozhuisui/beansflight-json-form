<template>
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
</template>
<script>
import { Divider, Row } from "view-design";
import FormSelectItem from "../componemts/FormSelectItem.vue";
import FormDatepickerItem from "../componemts/FormDatePickerItem.vue";
import FormCheckboxItem from "../componemts/FormCheckboxItem.vue";
import FormRadioItem from "../componemts/FormRadioItem.vue";
import FormSwitchItem from "../componemts/FormSwitchItem.vue";
import FormInputItem from "./FormInputItem.vue";
import FormCascaderItem from "./FormCascaderItem.vue";
import ModelPanel from "../componemts/ModelItem.vue";
import { titleCase } from "../libs/lib";
import { componentsMap } from "../mappings/formMapping.js";

export default {
  name: "DetailFormPanel",
  inheritAttrs: false,
  components: {
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
    };
  },
  computed: {
    configForm() {
      return this.config.map((item) => this.formateItem(item));
    },
  },
  methods: {
    formateItem(item) {
      const { row, splitLine, lineTitle } = item;
      row.map((column) => {
        let type = column.type || "input";
        let def = componentsMap[titleCase(type)];
        column.tag = def.component;
        column.props = Object.assign({}, def.props, column.props);
        return column;
      });
      return { splitLine, row, lineTitle };
    },
  },
  watch: {
    // data(val) {
    //   console.log("详情页面赋值", this.formData);
    //   this.formData = JSON.parse(JSON.stringify(val));
    // },
    data: {
      // console.log("详情页面赋值", this.formData);
      // this.formData = JSON.parse(JSON.stringify(val));
      handler(val) {
        console.log("详情页面赋值", this.formData);
        this.formData = JSON.parse(JSON.stringify(val));
      },
      deep: true,
    },
  },
};
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
