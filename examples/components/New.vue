<template>
  <NewFormPanel
    title="新建"
    v-model="isShowModal"
    :data="newForm"
    :config="newConfig"
    :label-width="170"
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
      isShowModal: false,
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
              span: 12,
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
              span: 12,
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
        {
          row: [
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
                disabled: true, //是否禁用
              },
              options: [
                { value: "0", label: "否" },
                { value: "1", label: "是" },
              ],
              span: 8,
              control: {
                hiddenOption: (form) => {
                  return form.isUniformprice === "0"
                },
                change: (val) => {
                  console.log("商户状态->回调函数", val)
                },
              },
            },
          ],
        },
      ],
    }
  },
  methods: {
    showModal() {
      this.isShowModal = true
    },
    cancel() {
      this.isShowModal = false
    },
    sumbit(params) {
      console.log("save", params)
      this.isShowModal = false
    },
  },
}
</script>
