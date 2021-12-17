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
      @newAction="newInfoForm"
      @batchDeleteAction="batchDelete"
      @allExportAction="exportAll"
      @batchExportAction="batchExport"
      :columns="mainTable.columnArray"
      :value="mainTable.data"
      :loading="mainTable.loading"
      :pageNumber="queryForm.pageNum"
      :pageSize="queryForm.pageSize"
      :pageTotal="mainTablePage.total"
      @onChangePageNum="changeMainTablePagePageNum"
      @onChangePageSize="changeMainTablePagePageSize"
      @on-row-click="onRowClick"
    ></table-panel>
    <Detail ref="detailForm"></Detail>
    <Edit ref="editForm" @cancel="mockDatas"></Edit>
    <New ref="newForm" @cancel="mockDatas"></New>
  </div>
</template>

<script>
import Detail from "./Detail.vue"
import Edit from "./Edit.vue"
import New from "./New.vue"
export default {
  name: "HelloWorld",
  components: {
    Detail,
    Edit,
    New,
  },
  data() {
    return {
      formConfig: {
        // 输出值
        formModel: {
          cascVal: [], // 级联
          selOptions: null, // 下拉框
          inputVal: null, // 输入框
          datePickerVal: null, // DatePicker
        },
        // item项目
        formItems: [
          {
            row: [
              {
                label: "省市区级联", // 描述
                key: "cascVal", // 表单字段
                type: "cascader", // 组件类型
                placeholder: "请选择城市/区县(可搜索）", // 占位符
                span: 6, // 24栏布局占比
                props: {
                  a: "ddf",
                  b: "ccc",
                },
                options: [
                  {
                    value: "beijing",
                    label: "北京",
                    children: [
                      {
                        value: "gugong",
                        label: "故宫",
                      },
                      {
                        value: "tiantan",
                        label: "天坛",
                      },
                      {
                        value: "wangfujing",
                        label: "王府井",
                      },
                    ],
                  },
                ],
              },
              {
                label: "下拉框",
                key: "selOptions",
                type: "select",
                span: 6,
                options: [],
              },
              {
                label: "输入框",
                key: "inputVal",
                placeholder: "占位符",
                type: "Input", // 输入框
                // extendType:  // 扩展属性
                span: 6,
              },
              {
                label: "datePciekr",
                key: "datePickerVal",
                placeholder: "占位符",
                type: "datePicker", // 输入框
                extendType: "daterange", // extendType取值范围: [date: 单选daterange:时间段、 year：年份、month：月份选择]
                span: 6,
                props: {
                  disabledDate: (date) => {
                    const disabledDay = date.getDate()
                    return disabledDay === 15
                  },
                },
              },
            ],
          },
        ],
      },
      panelConfig: {
        show: true, // 是否显示顶部默认 新建、批量删除、导出全部、批量导出按钮
        options: [
          {
            title: "逗逗飞新建", // 按钮标题
            type: "primary", // 按钮主题
            icon: "md-add", // 按钮图标
            click: () => {
              this.$refs.editForm.showNewModal()
            },
          },
        ],
      },
      queryForm: {
        pageNum: 1,
        pageSize: 10,
      },
      mainTablePage: {
        total: 0,
      },
      mainTable: {
        // 加载中
        loading: false,
        // 表格数据
        data: [],
        // 表格列
        columnArray: [
          // {
          //   title: "swtich",
          //   minWidth: 200,
          //   key: "switch_key",
          //   type: "switch",
          // },
          {
            title: "商户名称",
            key: "name",
            minWidth: 120,
          },
          {
            title: "地址",
            key: "address",
            minWidth: 150,
          },
          {
            title: "商户联系人",
            key: "contact",
            minWidth: 120,
          },
          {
            title: "手机号码",
            key: "phone",
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
            title: "createDate",
            key: "createDate",
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
    }
  },
  mounted() {
    setTimeout(() => {
      this.mockDatas()
    }, 2000)
    setTimeout(() => {
      this.formConfig.formItems[0].row[1].options = [
        {
          label: "启用",
          value: "1",
        },
        {
          label: "未启用",
          value: "0",
        },
      ]
    }, 5000)
    setTimeout(() => {
      this.queryForm.pageSize = 20
    }, 10000)
  },
  methods: {
    mockDatas() {
      ;[...Array(5).keys()].forEach((i) => {
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
          createDate: "2020-12-11 10:57:55",
          modifyDate: "2020-12-11 10:57:55",
          isUniformprice: "1",
          departmentId: null,
        })
      })
    },
    query(params) {
      console.log("query", params)
    },
    reset() {
      console.log("reset")
    },
    newInfoForm() {
      this.$refs.newForm.showModal()
    },
    async batchDelete(rows) {
      console.log("batchDelete:", rows)
    },
    async exportAll() {
      console.log("exportAll")
    },
    async batchExport() {
      console.log("batchExport")
    },
    changeMainTablePagePageNum(pageNum) {
      console.log("changeMainTablePagePageNum:", pageNum)
    },
    changeMainTablePagePageSize(pageSize) {
      console.log("changeMainTablePagePageSize:", pageSize)
    },
    onRowClick(rowParams) {
      // console.log(rowParams);
    },
  },
}
</script>
