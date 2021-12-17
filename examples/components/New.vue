<template>
  <NewFormPanel
    title="新建"
    v-model="isShowDetailModal"
    :data="newForm"
    :config="newConfig"
    @sumbit="sumbit"
    @cancel="cancel"
  >
  </NewFormPanel>
</template>
<script>
import NewFormPanel from "../../packages/new/newForm.vue"

export default {
  name: "NewForm",
  components: { NewFormPanel },
  props: {
    config: {
      type: Object,
      default: () => {},
      require: true,
    },
  },
  data() {
    return {
      isShowDetailModal: false,
      newForm: {
        name: "动态",
        cityId: null,
        areaId: null,
        address: null,
        contact: null,
        phone: null,
        email: null,
        status: null,
        switchKey: true,
        isUniformprice: null,
      },
      newConfig: [
        {
          row: [
            {
              label: "商户名称",
              type: "input",
              // extendType: "password", // 取值范围[text、password、textarea、url、email、date、number、tel]
              key: "name",
              props: {
                // 扩展属性
                // disabled: true, // 设置输入框为禁用状态
              },
              span: 8,
            },
            {
              label: "测试滑块",
              type: "switch",
              // extendType: "password", // 取值范围[text、password、textarea、url、email、date、number、tel]
              key: "switchKey",
              props: {
                // 扩展属性
                // disabled: true, // 设置输入框为禁用状态
              },
              span: 8,
            },
            {
              label: "商户统一定价",
              type: "select",
              key: "isUniformprice",
              options: [
                { value: "0", label: "否" },
                { value: "1", label: "是" },
              ],
              span: 8,
              control: {
                handle: (form) => {
                  return form.switchKey === true
                },
              },
            },
            {
              label: "商户状态",
              type: "select",
              key: "status",
              props: {
                // disabled: true, //是否禁用
              },
              options: [
                { value: "0", label: "否" },
                { value: "1", label: "是" },
              ],
              span: 8,
              control: {
                handle: (form) => {
                  return form.switchKey === true
                },
              },
            },
          ],
        },
        {
          row: [
            {
              label: "附件上传",
              action: "/posts",
              type: "upload",
              uploadtitle: "点击上传",
              formate: ["jpg", "jpeg", "png"],
              control: {
                error: (file, fileList) => {
                  console.log(file)
                  console.log(fileList)
                },
                success: (file, fileList) => {
                  console.log(file)
                  console.log(fileList)
                },
                formateError: (file, fileList) => {
                  console.log(file, fileList)
                },
              },
            },
          ],
        },
        // {
        //   row: [
        //     {
        //       label: "电子邮件",
        //       type: "input",
        //       key: "email",
        //       span: 8,
        //     },
        //     {
        //       label: "手机号码",
        //       type: "input",
        //       key: "phone",
        //       span: 8,
        //     },
        //     {
        //       label: "商户联系人",
        //       type: "input",
        //       key: "contact",
        //       span: 8,
        //     },
        //   ],
        // },
        // {
        //   row: [
        //     {
        //       label: "所属城市/区县",
        //       type: "cascader",
        //       // key: ["cityId", "areaId"],
        //       key: "cityId",
        //       rule: [
        //         {
        //           type: "array",
        //           required: true,
        //           message: "请输入所属城市/区县",
        //           trigger: "blur",
        //         },
        //       ],
        //       props: {
        //         //disabled: true, //是否禁用
        //       },
        //       options: [
        //         {
        //           children: [
        //             {
        //               label: "上海市市本级",
        //               value: "319900",
        //             },
        //           ],
        //           label: "上海市",
        //           value: "310000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "北京市市本级",
        //               value: "119900",
        //             },
        //           ],
        //           label: "北京市",
        //           value: "110000",
        //         },
        //         {
        //           children: [
        //             {
        //               children: [
        //                 {
        //                   label: "和平区",
        //                   value: "210102",
        //                 },
        //                 {
        //                   label: "铁西区",
        //                   value: "210106",
        //                 },
        //               ],
        //               label: "沈阳市",
        //               value: "210100",
        //             },
        //             {
        //               label: "大连市",
        //               value: "210200",
        //             },
        //             {
        //               label: "鞍山市",
        //               value: "210300",
        //             },
        //             {
        //               label: "抚顺市",
        //               value: "210400",
        //             },
        //             {
        //               label: "本溪市",
        //               value: "210500",
        //             },
        //             {
        //               label: "丹东市",
        //               value: "210600",
        //             },
        //             {
        //               label: "锦州市",
        //               value: "210700",
        //             },
        //             {
        //               label: "营口市",
        //               value: "210800",
        //             },
        //             {
        //               label: "阜新市",
        //               value: "210900",
        //             },
        //             {
        //               label: "辽阳市",
        //               value: "211000",
        //             },
        //             {
        //               label: "盘锦市",
        //               value: "211100",
        //             },
        //             {
        //               label: "铁岭市",
        //               value: "211200",
        //             },
        //             {
        //               label: "朝阳市",
        //               value: "211300",
        //             },
        //             {
        //               label: "葫芦岛市",
        //               value: "211400",
        //             },
        //             {
        //               label: "省本级",
        //               value: "219900",
        //             },
        //           ],
        //           label: "辽宁省",
        //           value: "210000",
        //         },
        //       ],
        //       span: 12,
        //     },
        //     {
        //       label: "商户地址",
        //       type: "input",
        //       key: "address",
        //       rule: [
        //         { required: true, message: "请输入地址", trigger: "blur" },
        //       ],
        //       span: 12,
        //     },
        //   ],
        // },
      ],
    }
  },
  methods: {
    showModal() {
      this.isShowDetailModal = true
    },
    cancel() {
      this.isShowDetailModal = false
    },
    sumbit(params) {
      console.log("save", params)
      this.isShowDetailModal = false
    },
  },
}
</script>
