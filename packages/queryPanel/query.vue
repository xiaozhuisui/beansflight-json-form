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
      <DynamicItem
        v-for="(col, index) in row"
        :key="index"
        :rule="model"
        v-on="col.control"
        :config="col"
      ></DynamicItem>
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
import { titleCase } from "../libs/lib"
import { componentsMap } from "../mappings"
import DynamicItem from "./DynamicCell"
const dayJS = require("dayjs")
export default {
  name: "QueryPanel",
  components: {
    Row,
    Card,
    ButtonGroup,
    Button,
    DynamicItem,
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
      return row
    },
    queryAction() {
      // 如果包含日历组件 则需要将出参处理掉 再返回给调用端
      const formItems__cache = this.arrayOptions()

      const dataPickerItem = formItems__cache.find(
        (i) => i.type === "datePicker"
      )
      if (dataPickerItem) {
        if (this.config.formModel[dataPickerItem.key]) {
          this.config.formModel[dataPickerItem.key][0] = dayJS(
            this.config.formModel[dataPickerItem.key][0]
          ).format("YYYY-MM-DD HH:mm:ss")

          this.config.formModel[dataPickerItem.key][1] = dayJS(
            this.config.formModel[dataPickerItem.key][1]
          ).format("YYYY-MM-DD HH:mm:ss")
        }
      }
      this.$emit("query", this.config.formModel)
    },
    resetAction() {
      Object.keys(this.config.formModel).forEach(
        (key) => (this.config.formModel[key] = null)
      )
      const formItems_cache = this.arrayOptions()
      formItems_cache.forEach((item) => {
        const { type, key } = item
        switch (type) {
          case "cascader":
            this.config.formModel[key] = []
            break
          case "datePicker":
            this.config.formModel[key] = null
            break
          default:
            break
        }
      })
      this.$emit("reset")
    },

    arrayOptions() {
      const { formItems } = this.config
      return formItems
        .map((item) => item.row)
        .reduce((prev, current) => prev.concat(current))
    },
  },
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
