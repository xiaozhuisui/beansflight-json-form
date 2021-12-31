<template>
  <Card class="smart-query-card">
    <!-- 查询框 -->
    <Row
      class="smart-query-form-row"
      :gutter="row.gutter || 18"
      v-for="(row, index) in configItems"
      v-if="showRow(index)"
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
      <template v-if="btnPostion">
        <Col span="6" style="margin-left: 50px">
          <Button
            @click="queryAction"
            icon="ios-search"
            type="primary"
            style="margin-left: 5px"
            >查询
          </Button>
          <Button
            @click="resetAction"
            icon="md-refresh"
            type="default"
            style="margin-left: 10px"
            >重置
          </Button>
        </Col>
      </template>
    </Row>
    <!-- 底部按钮 -->
    <template v-if="!btnPostion">
      <Row class="smart-query-form-row">
        <ButtonGroup class="btn-wrapper">
          <template v-if="showMoreQyery">
            <Button
              @click="conFlag = !conFlag"
              :icon="conFlag ? 'ios-arrow-up' : 'ios-arrow-down'"
              type="default"
              >{{ conFlag ? "隐藏" : "展开" }}
            </Button>
          </template>
          <Button
            @click="queryAction"
            icon="ios-search"
            type="primary"
            style="margin-left: 5px"
            >查询
          </Button>
          <Button
            @click="resetAction"
            icon="md-refresh"
            type="default"
            style="margin-left: 5px"
            >重置
          </Button>
        </ButtonGroup>
      </Row>
    </template>
  </Card>
</template>
<script>
import { Row, Card, ButtonGroup, Button } from "view-design"
import CascaderItem from "./CascaderItem.vue"
import SelectItem from "./SelectItem.vue"
import InputItem from "./InputItem.vue"
import DatePickerItem from "./DatePickerItem.vue"
import { titleCase } from "../libs/lib"
import { componentsMap } from "../mappings"
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
  data() {
    return {
      conFlag: false, // 默认收起
      showMoreQyery: false,
    }
  },
  computed: {
    model() {
      return this.config.formModel
    },
    btnPostion() {
      return this.config.btnGroup === "inline" ? true : false
    },
    configItems() {
      return this.config.formItems.map((item) =>
        this.formatItem(
          item,
          this.config.formItems.length,
          this.config.formModel
        )
      )
    },
  },
  methods: {
    showRow(rowIndex) {
      if (rowIndex <= 0) {
        return true
      } else {
        return this.conFlag
      }
    },
    formatItem(config, rowLength, form) {
      const { row } = config
      if (rowLength > 1) {
        this.showMoreQyery = true
      } else {
        this.showMoreQyery = false
      }
      row.map((column) => {
        let type = column.type || "input"
        let def = componentsMap[titleCase(type)]
        column.tag = def.component
        column.props = Object.assign({}, def.props, column.props)
        return column
      })
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
      return row
    },
    queryAction() {
      this.$emit("query", this.config.formModel)
    },
    resetAction() {
      Object.keys(this.config.formModel).forEach((key) =>
        Array.isArray(this.config.formModel[key])
          ? (this.config.formModel[key] = [])
          : (this.config.formModel[key] = null)
      )
      this.$emit("reset")
    },
  },
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
