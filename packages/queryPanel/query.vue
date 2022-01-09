<template>
  <Card class="smart-query-card">
    <!-- 查询框 -->
    <Form :rules="config.rules" :model="model" ref="formRef" :label-width="100">
      <Row
        :gutter="row.gutter || 18"
        v-for="(row, index) in configItems"
        v-show="showRow(index)"
        :key="index"
      >
        <Col v-for="(col, index) in row" :key="index" :span="col.span || 6">
          <Form-item
            :label="col.label"
            :rules="config.rules[col.key]"
            :prop="col.key"
            show-message
          >
            <DynamicItem :rule="model" v-on="col.control" :config="col"
              ><slot :name="col.key" v-if="col.type === 'slot'"></slot
            ></DynamicItem>
          </Form-item>
        </Col>

        <template v-if="btnPostion">
          <Col span="6">
            <Button
              @click="queryAction"
              icon="ios-search"
              type="primary"
              style="margin-left: 5px"
              >查询
            </Button>
            <Button
              icon="md-refresh"
              type="default"
              style="margin-left: 10px"
              htmlType="reset"
              @click="resetAction"
              >重置
            </Button>
          </Col>
        </template>
      </Row>
      <!-- 底部按钮 -->
      <template v-if="!btnPostion">
        <Form-item>
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
                style="margin-left: 5px"
                >查询
              </Button>
              <Button
                @click="resetAction"
                icon="md-refresh"
                type="default"
                style="margin-left: 5px"
                htmlType="reset"
                >重置
              </Button>
            </ButtonGroup>
          </Row>
        </Form-item>
      </template>
    </Form>
  </Card>
</template>
<script>
import {
  Row,
  Card,
  ButtonGroup,
  Button,
  Form,
  FormItem,
  Col,
} from "view-design"
import { titleCase } from "../libs/lib"
import { componentsMap } from "../mappings"
import DynamicItem from "./DynamicCell"
export default {
  name: "QueryPanel",
  components: {
    Row,
    Card,
    ButtonGroup,
    Button,
    DynamicItem,
    Form,
    FormItem,
    Col,
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
      console.log(
        this.config.formItems.map((item) =>
          this.formatItem(
            item,
            this.config.formItems.length,
            this.config.formModel
          )
        )
      )
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
    formatItem(config, rowLength) {
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
      this.$refs["formRef"].validate((validate) => console.log(validate))
      // this.$emit("query", this.config.formModel)
    },
    resetAction() {
      // Object.keys(this.config.formModel).forEach((key) =>
      //   Array.isArray(this.config.formModel[key])
      //     ? (this.config.formModel[key] = [])
      //     : (this.config.formModel[key] = null)
      // )
      this.$refs.formRef.resetFields()
      this.$emit("reset")
    },
  },
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
