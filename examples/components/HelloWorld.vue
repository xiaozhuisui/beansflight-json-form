<template>
  <div>
    <query-panel
      :config="formConfig"
      @query="query"
      @reset="reset"
    ></query-panel>
    <table-panel
      border
      ref="mainTable"
      :panelConfig="panelConfig"
      :columns="mainTable.columnArray"
      :value="mainTable.data"
      :loading="mainTable.loading"
      :pageNumber="formConfig.formModel.pageNum"
      :pageSize="formConfig.formModel.pageSize"
      :pageTotal="mainTable.total"
      @newAction="newAction"
      @batchDeleteAction="batchDeleteAction"
      @allExportAction="allExportAction"
      @batchExportAction="batchExportAction"
      :multi="true"
    ></table-panel>
    <Detail ref="detailForm"></Detail>
    <Edit ref="editForm"></Edit>
    <New ref="newForm"></New>
    <form-panel
      :data="panelData"
      :label-width="100"
      :config="panelConfig2"
    ></form-panel>
  </div>
</template>

<script>
import Detail from "./Detail"
import Edit from "./Edit"
import New from "./New"
import FormPanel from "../../packages/form/form"
const options = {
  pageNum: 1,
  pageSize: 10,
}
export default {
  name: "HelloWorld",
  components: {
    Detail,
    Edit,
    New,
    FormPanel,
  },
  data() {
    return {
      formOptions: [],
      formConfig: {
        // 输出值
        formModel: {
          cascVal: [], // 级联
          selOptions: null, // 下拉框
          inputVal: null, // 输入框
          datePickerVal: ["2022-04-21", "2022-05-21"], // DatePicker
          ...options,
        },
        // item项目
        formItems: [
          {
            row: [
              // {
              //   label: "省市区级联", // 描述
              //   key: "cascVal", // 表单字段
              //   type: "cascader", // 组件类型
              //   placeholder: "请选择城市/区县(可搜索）", // 占位符
              //   span: 6, // 24栏布局占比
              //   props: {
              //     a: "ddf",
              //     b: "ccc",
              //   },
              //   options: [
              //     {
              //       value: "beijing",
              //       label: "北京",
              //       children: [
              //         {
              //           value: "gugong",
              //           label: "故宫",
              //         },
              //         {
              //           value: "tiantan",
              //           label: "天坛",
              //         },
              //         {
              //           value: "wangfujing",
              //           label: "王府井",
              //         },
              //       ],
              //     },
              //   ],
              //   control: {
              //     // 回调函数
              //     // change: (val) => console.log("回调函数", val),
              //   },
              // },
              {
                label: "下拉框",
                key: "selOptions",
                type: "select",
                span: 6,
                // options: [
                //   {
                //     value: "01",
                //     label: "是",
                //   },
                //   {
                //     value: "02",
                //     label: "否",
                //   },
                // ],
                options: () => {
                  // return [
                  //   {
                  //     value: "01",
                  //     label: "是",
                  //   },
                  //   {
                  //     value: "02",
                  //     label: "否",
                  //   },
                  // ]
                  return this.formOptions
                },
                control: {
                  // 回调函数
                  // change: (val) => console.log("回调函数", val),
                },
              },
              // {
              //   label: "输入框",
              //   key: "inputVal",
              //   placeholder: "占位符",
              //   type: "Input", // 输入框
              //   // extendType:  // 扩展属性
              //   control: {},
              //   span: 6,
              // },
              // {
              //   label: "datePciekr",
              //   key: "datePickerVal",
              //   placeholder: "占位符",
              //   type: "datePicker", // 输入框
              //   extendType: "daterange", // extendType取值范围: [date: 单选daterange:时间段、 year：年份、month：月份选择]
              //   span: 6,
              //   props: {
              //     disabledDate: (date) => {
              //       const disabledDay = date.getDate()
              //       return disabledDay === 15
              //     },
              //   },
              // },
            ],
          },
        ],
        // 操作按钮的位置
        btnGroup: "inline",
      },
      panelConfig: {
        splitLine: true,
        lineTitle: "人员参保信息",
        show: true, // 是否显示顶部默认 新建、批量删除、导出全部、批量导出按钮
        defBtns: [0, 2, 3], // 默认按钮时
        options: [
          {
            title: "逗逗飞新建", // 按钮标题
            type: "primary", // 按钮主题
            icon: "md-add", // 按钮图标
            click: () => {
              this.$refs.newForm.showModal()
            },
          },
        ],
      },
      mainTable: {
        // 加载中
        loading: false,
        total: 0,
        // 表格数据
        data: [],
        // 表格列
        columnArray: [
          {
            title: "swtich",
            minWidth: 200,
            key: "switch_key",
            type: "switch",
          },
          {
            title: "商户名称",
            key: "name",
            minWidth: 120,
          },
          {
            title: "商户状态",
            key: "status",
            minWidth: 120,
            type: "eunm",
            enumKey: "STATUS",
          },
          {
            title: "modifyDate",
            key: "modifyDate",
            formate: "YYYY-MM-DD",
            minWidth: 140,
          },
          {
            title: "操作",
            align: "right",
            fixed: "right",
            width: 150,
            type: "handle",
            options: [
              {
                title: "查看",
                type: "info",
                onClick: (row) => {
                  this.$refs.detailForm.showModal(row)
                },
              },
              {
                title: "编辑",
                directives: [
                  {
                    // name: "privilege",
                    value: "agency-info-list-update",
                  },
                ],
                onClick: (row) => {
                  this.$refs.editForm.showModalDeit(row)
                },
              },
            ],
          },
        ],
      },
      panelData: {},
      panelConfig2: [
        {
          row: [
            {
              label: "textArea",
              type: "input",
              extendType: "textarea", // 取值范围[text、password、textarea、url、email、date、number、tel]
              key: "input_textArea",
              props: {
                // 扩展属性
                disabled: true, // 设置输入框为禁用状态
                border: false, // 不显示边框
                bottom: 1,
              },
              control: {
                // 组件联动
                hiddenOption: (form) => {
                  // return form.isUniformprice === "1"
                },
              },
              // span: 12,
            },
            // {
            //   label: "商户统一定价",
            //   type: "input",
            //   key: "isUniformprice",
            //   control: {
            //     // 组件enum
            //     enumOption: {
            //       type: "STATUS",
            //     },
            //   },
            //   span: 8,
            // },
            // {
            //   label: "修改时间",
            //   type: "input",
            //   key: "modifyDate",
            //   control: {
            //     // 时间格式化
            //     formatOption: {
            //       format: "YYYY-MM-DD",
            //     },
            //   },
            //   span: 8,
            // },
          ],
        },
      ],
    }
  },
  mounted() {
    this.mockDatas()
    // console.log("mounted被执行")
    // setTimeout(() => {
    //   this.formConfig.formModel.datePickerVal = ["2021-12-21", "2022-01-21"]
    // }, 2000)
    setTimeout(() => {
      this.formOptions = [
        {
          value: "01",
          label: "是",
        },
        {
          value: "02",
          label: "否",
        },
      ]
      console.log("赋值完成")
    }, 4000)
    setTimeout(() => {
      this.formOptions = [
        {
          value: "02",
          label: "否",
        },
        {
          value: "01",
          label: "是",
        },
      ]
      console.log("第二次赋值完成")
    }, 8000)
  },
  methods: {
    newAction() {
      console.log("新建事件")
    },
    batchDeleteAction() {
      console.log("batchDeleteAction")
    },
    allExportAction() {
      console.log("导出全部")
    },
    batchExportAction(row) {
      console.log("批量导出", row)
    },
    reset() {
      console.log("执行重置")
      console.log(this.formConfig.formModel)
    },
    mockDatas() {
      ;[...Array(2).keys()].forEach((i) => {
        this.mainTable.data.push({
          id: "7D5DB3EA7DDD4457903059E39ED93C49",
          code: "2016EA",
          name: `${i}+商户C`,
          cityName: "和平区",
          cityId: "210100",
          areaId: "210102",
          address: "文化路",
          contact: "李四",
          phone: "18945678945",
          email: null,
          status: "1",
          payType: ["1", "2"],
          roleType: "1",
          switch_key: true,
          createDate: "",
          modifyDate: "2020-12-11 10:57:55",
          input_textArea:
            "符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用符合责任一保障范围费用",
          // modifyDate: "",
          isUniformprice: "0",
          departmentId: null,
        })
      })
      setTimeout(() => {
        this.panelData = this.mainTable.data[0]
      }, 5000)
      setTimeout(() => {
        this.panelData.isUniformprice = "1"
      }, 10000)
    },
    query(val) {
      console.log("query被调用:", val)
    },
  },
}
</script>
