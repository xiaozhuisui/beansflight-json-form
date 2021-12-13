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
import Detail from "./Detail.vue";
import Edit from "./Edit.vue";
import New from "./New.vue";
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
                options: [
                  {
                    label: "开通",
                    value: "1",
                  },
                  {
                    label: "不开通",
                    value: "0",
                  },
                ],
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
                    const disabledDay = date.getDate();
                    return disabledDay === 15;
                  },
                },
              },
            ],
          },
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
                options: [
                  {
                    label: "开通",
                    value: "1",
                  },
                  {
                    label: "不开通",
                    value: "0",
                  },
                ],
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
                    const disabledDay = date.getDate();
                    return disabledDay === 15;
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
              this.$refs.editForm.showNewModal();
            },
          },
        ],
      },
      queryForm: {
        pageNum: 1,
        pageSize: 20,
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
          {
            title: "swtich",
            minWidth: 200,
            key: "switch_key",
            type: "switch",
          },
          // {
          //   title: "商户编号",
          //   key: "code",
          //   minWidth: 100,
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
            title: "电子邮件",
            key: "email",
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
                  this.$refs.detailForm.showModal(row);
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
                  this.$refs.editForm.showModalDeit(row);
                },
              },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.mockDatas();
    }, 2000);
  },
  methods: {
    mockDatas() {
      this.mainTable.data = [
        {
          id: "7D5DB3EA7DDD4457903059E39ED93C49",
          code: "2016EA",
          name: "商户C",
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
        },
        {
          id: "CE9A9B889AFD45B09DC91C17B6A50081",
          code: "21AEFD",
          name: "颐瑞和药房",
          cityName: "大连市",
          cityId: "210200",
          areaId: null,
          address: "石油大街2号",
          contact: "鲍帅",
          phone: "13889229646",
          email: null,
          status: "0",
          payType: ["1"],
          roleType: "2",
          switch_key: false,
          createDate: "2021-03-09 14:25:11",
          modifyDate: "2021-03-09 14:25:11",
          isUniformprice: "0",
          departmentId: null,
        },
        {
          id: "8A04ED9881D64E53BF0A033646545937",
          code: "20534C",
          name: "河南测试商户",
          cityName: "郑州市",
          cityId: "410100",
          areaId: null,
          address: "郑州",
          contact: "河南商户",
          phone: "15534234523",
          switch_key: false,
          email: null,
          status: "1",
          payType: ["3", "5"],
          roleType: "5",
          createDate: "2020-11-19 10:26:09",
          modifyDate: "2020-11-19 10:26:09",
          isUniformprice: "1",
          departmentId: null,
        },
        {
          id: "A6F2042B82234231B521EB652D8DF955",
          code: "2076A9",
          name: "测试商户2",
          cityName: "湖南省邵阳市",
          cityId: "430500",
          areaId: null,
          address: "沈阳市",
          contact: "测试商户人2",
          phone: "15115115115",
          email: null,
          status: "1",
          payType: ["5"],
          switch_key: true,
          roleType: "7",
          createDate: "2020-11-09 09:24:00",
          modifyDate: "2020-11-09 09:24:00",
          isUniformprice: "0",
          departmentId: null,
        },
        {
          id: "03DC04D2CC214F448DC04EF8D84A4EB4",
          code: "20717A",
          name: "商户A",
          cityName: "广州市",
          cityId: "440100",
          areaId: null,
          address: "沈阳市和平区",
          contact: "刘哈哈A",
          phone: "13012345678",
          email: null,
          status: "0",
          payType: ["6"],
          switch_key: false,
          roleType: "8",
          createDate: "2020-08-14 13:40:10",
          modifyDate: "2020-08-14 13:40:10",
          isUniformprice: "0",
          departmentId: null,
        },
        {
          id: "FE9B617480D24745A3E513D31002A5D7",
          code: "20BCF4",
          name: "3334564564",
          cityName: "贵州省六盘水市",
          cityId: "520200",
          areaId: null,
          address: "新秀街2号东软软件园A2楼",
          contact: "33453",
          phone: "13800000000",
          email: "jiangtao1020@gmail.com",
          status: "1",
          payType: ["8"],
          switch_key: true,
          roleType: "1",
          createDate: "2020-11-25 10:35:14",
          modifyDate: "2020-11-25 10:35:14",
          isUniformprice: "0",
          departmentId: null,
        },
      ];
    },
    query(params) {
      console.log("query", params);
    },
    reset() {
      console.log("reset");
    },
    newInfoForm() {
      this.$refs.newForm.showModal();
    },
    async batchDelete(rows) {
      console.log("batchDelete:", rows);
    },
    async exportAll() {
      console.log("exportAll");
    },
    async batchExport() {
      console.log("batchExport");
    },
    changeMainTablePagePageNum(pageNum) {
      console.log("changeMainTablePagePageNum:", pageNum);
    },
    changeMainTablePagePageSize(pageSize) {
      console.log("changeMainTablePagePageSize:", pageSize);
    },
    onRowClick(rowParams) {
      // console.log(rowParams);
    },
  },
};
</script>
