<template>
  <Card class="smart-query-card">
    <!-- 查询框 -->
    <Row
      class="smart-query-form-row"
      :gutter="row.gutter || 18"
      v-for="(row, index) in configItems"
      :key="index"
    >
      <component
        :is="col.tag"
        v-for="(col, index) in row"
        :key="index"
        :rule="model"
        :config="col"
      >
      </component>
    </Row>
    <!-- 底部按钮 -->
    <Row class="smart-query-form-row">
      <ButtonGroup class="btn-wrapper">
        <Button @click="queryAction" icon="ios-search" type="primary"
          >查询
        </Button>
        <Button @click="resetAction" icon="md-refresh" type="default"
          >重置
        </Button>
      </ButtonGroup>
    </Row>
  </Card>
</template>
<script>
import { Row, Card, ButtonGroup, Button } from "view-design";
import CascaderItem from "./CascaderItem.vue";
import SelectItem from "./SelectItem.vue";
import InputItem from "./InputItem.vue";
import DatePickerItem from "./DatePickerItem.vue";
import { titleCase } from "../libs/lib";
import { componentsMap } from "../mappings";
export default {
  name: "QueryPanel",
  components: {
    CascaderItem,
    SelectItem,
    InputItem,
    DatePickerItem,
    Row,
    Card,
    ButtonGroup,
    Button,
  },
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    model() {
      return this.config.formModel;
    },
    configItems() {
      return this.config.formItems.map((item) =>
        this.formatItem(item, this.config.formModel)
      );
    },
  },
  methods: {
    formatItem(config, form) {
      const { row } = config;
      row.map((column) => {
        let type = column.type || "input";
        let def = componentsMap[titleCase(type)];
        column.tag = def.component;
        column.props = Object.assign({}, def.props, column.props);
        return column;
      });
      // 表单控件的类型
      // let type = item.type || "text";
      // // 对应到组件映射表
      // // let def = ElementMapping[type];
      // item.tag = def.component;
      // item.props = Object.assign({}, def.props, item.props);
      // // 获取动态 props
      // if (isFunction(item.getProps)) {
      //   Object.assign(item.props, item.getProps(form));
      // }
      // // 条件渲染
      // item._ifRender = isFunction(item.ifRender) ? !!item.ifRender(form) : true;
      // // 防止表单提交时存在多余 key
      // if (!item._ifRender) {
      //   delete form[item.key];
      // }
      return row;
    },
    queryAction() {
      this.$emit("query", this.config.formModel);
    },
    resetAction() {
      Object.keys(this.config.formModel).forEach((key) =>
        Array.isArray(this.config.formModel[key])
          ? (this.config.formModel[key] = [])
          : (this.config.formModel[key] = null)
      );
      this.$emit("reset");
    },
  },
};
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
