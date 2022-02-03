<template>
  <EditFormPanel
    title="编辑"
    v-model="isShowDetailModal"
    displayed="model"
    :data="edit"
    :label-width="150"
    :config="editConfig"
    @sumbit="sumbit"
    @cancel="cancel"
  >
    <!-- <template #footer>
      <div>底部按钮布局</div>
    </template> -->
    <template v-slot:footer="data">
      <div>底部按钮布局</div>
      <div>{{ data }}</div>
    </template>
  </EditFormPanel>
</template>
<script>
import EditFormPanel from "../../packages/edit/editForm.vue"
// import { casitems } from "../../packages/libs/conversion-cascader";
export default {
  name: "EditForm",
  components: { EditFormPanel },
  props: {
    config: {
      type: Object,
      default: () => {},
      require: true,
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      addTarget: false,
      isShowDetailModal: false,
      edit: {},
      editConfig: [
        {
          row: [
            {
              label: "商户名称",
              type: "input",
              // extendType: "textarea", // 取值范围[text、password、textarea、url、email、date、number、tel]
              key: "name",
              props: {
                // 扩展属性
                // disabled: true, // 设置输入框为禁用状态
                // maxlength: Number 最大长度
              },
              control: {
                hiddenOption: (form) => {
                  return form.isUniformprice === "0"
                },
                // 回调函数
                change: (val) => console.log("回调函数", val),
              },
              // control: {
              //   on: {
              //     change: (event) => {
              //       console.log(event)
              //     },
              //   },
              //   // 组件联动
              //   hiddenOption: (form) => {
              //     return form.isUniformprice === "0"
              //   },
              //   // 组件enum
              //   // 时间格式化
              // },
              rule: [
                {
                  required: true,
                  message: "商户名称不能为空",
                  trigger: "blur",
                },
              ],
              span: 24,
            },
            {
              label: "商户统一定价",
              type: "select",
              key: "isUniformprice",
              // options: [
              //   //   { value: "0", label: "否" },
              //   //   { value: "1", label: "是" },
              // ],
              options: () => {
                return [
                  { value: "0", label: "否:统一定价" },
                  { value: "1", label: "是: 是统一订单" },
                ]
              },
              span: 8,
              control: {
                on: {
                  change: (event) => {
                    console.log(event)
                  },
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
              // options: [
              //   { value: "0", label: "否" },
              //   { value: "1", label: "是" },
              // ],
              options: () => {
                return [
                  { value: "0", label: "否:商户状态" },
                  { value: "1", label: "是:商户状态" },
                ]
              },
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
        {
          row: [
            {
              label: "switch滑块",
              type: "switch",
              key: "switchkey",
              props: {
                // disabled: true, // 设置输入框为禁用状态
              },
              span: 8,
            },
          ],
        },
        {
          row: [
            {
              label: "支付渠道",
              type: "checkbox",
              key: "payType",
              rule: [
                {
                  type: "array",
                  required: true,
                  message: "支付渠道不能为空",
                  trigger: "blur",
                },
              ],
              options: [
                { value: "1", label: "去医院支付" },
                { value: "2", label: "医保账户支付" },
                { value: "3", label: "支付宝支付" },
                { value: "4", label: "工行支付" },
                { value: "5", label: "银联支付" },
                { value: "6", label: "微信支付" },
                { value: "7", label: "银联快捷支付" },
                { value: "8", label: "江南银行微信支付" },
                { value: "9", label: "江南银行支付宝支付" },
              ],
              span: 24,
              control: {
                hiddenOption: (form) => {
                  // 组件联动
                  return form.switchkey === true
                },
              },
            },
          ],
        },
        // {
        //   row: [
        //     {
        //       label: "所属城市/区县",
        //       type: "cascader",
        //       // key: ["cityId", "areaId"],
        //       // key: "cityId",
        //       key: "city_area",
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
        //               label: "湖南省长沙市",
        //               value: "430100",
        //             },
        //             {
        //               label: "湖南省株洲市",
        //               value: "430200",
        //             },
        //             {
        //               label: "湖南省湘潭市",
        //               value: "430300",
        //             },
        //             {
        //               label: "湖南省衡阳市",
        //               value: "430400",
        //             },
        //             {
        //               label: "湖南省邵阳市",
        //               value: "430500",
        //             },
        //             {
        //               label: "湖南省岳阳市",
        //               value: "430600",
        //             },
        //             {
        //               label: "湖南省常德市",
        //               value: "430700",
        //             },
        //             {
        //               label: "湖南省张家界市",
        //               value: "430800",
        //             },
        //             {
        //               label: "湖南省益阳市",
        //               value: "430900",
        //             },
        //             {
        //               label: "湖南省郴州市",
        //               value: "431000",
        //             },
        //             {
        //               label: "湖南省永州市",
        //               value: "431100",
        //             },
        //             {
        //               label: "湖南省怀化市",
        //               value: "431200",
        //             },
        //             {
        //               label: "湖南省娄底市",
        //               value: "431300",
        //             },
        //             {
        //               label: "湖南省湘西土家族苗族自治州",
        //               value: "433100",
        //             },
        //             {
        //               label: "湖南省省本级",
        //               value: "439900",
        //             },
        //           ],
        //           label: "湖南省",
        //           value: "430000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "广州市",
        //               value: "440100",
        //             },
        //             {
        //               label: "广东省韶关市",
        //               value: "440200",
        //             },
        //             {
        //               label: "广东省深圳市",
        //               value: "440300",
        //             },
        //             {
        //               label: "广东省珠海市",
        //               value: "440400",
        //             },
        //             {
        //               label: "广东省汕头市",
        //               value: "440500",
        //             },
        //             {
        //               label: "广东省佛山市",
        //               value: "440600",
        //             },
        //             {
        //               label: "广东省江门市",
        //               value: "440700",
        //             },
        //             {
        //               label: "广东省湛江市",
        //               value: "440800",
        //             },
        //             {
        //               label: "广东省茂名市",
        //               value: "440900",
        //             },
        //             {
        //               label: "广东省肇庆市",
        //               value: "441200",
        //             },
        //             {
        //               label: "广东省惠州市",
        //               value: "441300",
        //             },
        //             {
        //               label: "广东省梅州市",
        //               value: "441400",
        //             },
        //             {
        //               label: "广东省汕尾市",
        //               value: "441500",
        //             },
        //             {
        //               label: "广东省河源市",
        //               value: "441600",
        //             },
        //             {
        //               label: "广东省阳江市",
        //               value: "441700",
        //             },
        //             {
        //               label: "清远市",
        //               value: "441800",
        //             },
        //             {
        //               label: "广东省东莞市",
        //               value: "441900",
        //             },
        //             {
        //               label: "广东省中山市",
        //               value: "442000",
        //             },
        //             {
        //               label: "广东省潮州市",
        //               value: "445100",
        //             },
        //             {
        //               label: "广东省揭阳市",
        //               value: "445200",
        //             },
        //             {
        //               label: "广东省云浮市",
        //               value: "445300",
        //             },
        //             {
        //               label: "广东省省本级",
        //               value: "449900",
        //             },
        //           ],
        //           label: "广东省",
        //           value: "440000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "贵阳市",
        //               value: "520100",
        //             },
        //             {
        //               label: "贵州省六盘水市",
        //               value: "520200",
        //             },
        //             {
        //               label: "遵义市",
        //               value: "520300",
        //             },
        //             {
        //               label: "贵州省安顺市",
        //               value: "520400",
        //             },
        //             {
        //               label: "贵州省毕节市",
        //               value: "520500",
        //             },
        //             {
        //               label: "贵州省铜仁市",
        //               value: "520600",
        //             },
        //             {
        //               label: "铜仁地区",
        //               value: "522200",
        //             },
        //             {
        //               label: "黔西南布依族苗族自治州",
        //               value: "522300",
        //             },
        //             {
        //               label: "毕节地区",
        //               value: "522400",
        //             },
        //             {
        //               label: "贵州省黔东南苗族侗族自治州",
        //               value: "522600",
        //             },
        //             {
        //               label: "贵州省黔南布依族苗族自治州",
        //               value: "522700",
        //             },
        //             {
        //               label: "贵州省贵安新区",
        //               value: "527000",
        //             },
        //             {
        //               label: "贵州省省本级",
        //               value: "529900",
        //             },
        //           ],
        //           label: "贵州省",
        //           value: "520000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "云南省昆明市",
        //               value: "530100",
        //             },
        //             {
        //               label: "云南省玉溪市",
        //               value: "530400",
        //             },
        //             {
        //               label: "云南省保山市",
        //               value: "530500",
        //             },
        //             {
        //               label: "云南省昭通市",
        //               value: "530600",
        //             },
        //             {
        //               label: "云南省丽江市",
        //               value: "530700",
        //             },
        //             {
        //               label: "云南省普洱市",
        //               value: "530800",
        //             },
        //             {
        //               label: "云南省临沧市",
        //               value: "530900",
        //             },
        //             {
        //               label: "楚雄彝族自治州",
        //               value: "532300",
        //             },
        //             {
        //               label: "云南省红河哈尼族彝族自治州",
        //               value: "532500",
        //             },
        //             {
        //               label: "云南省文山壮族苗族自治州",
        //               value: "532600",
        //             },
        //             {
        //               label: "云南省西双版纳傣族自治州",
        //               value: "532800",
        //             },
        //             {
        //               label: "云南省大理白族自治州",
        //               value: "532900",
        //             },
        //             {
        //               label: "云南省德宏傣族景颇族自治州",
        //               value: "533100",
        //             },
        //             {
        //               label: "云南省怒江傈僳族自治州",
        //               value: "533300",
        //             },
        //             {
        //               label: "云南省迪庆藏族自治州",
        //               value: "533400",
        //             },
        //             {
        //               label: "云南省省本级",
        //               value: "539900",
        //             },
        //           ],
        //           label: "云南省",
        //           value: "530000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "拉萨市",
        //               value: "540100",
        //             },
        //             {
        //               label: "山南地区",
        //               value: "542200",
        //             },
        //             {
        //               label: "那曲地区",
        //               value: "542400",
        //             },
        //             {
        //               label: "阿里地区",
        //               value: "542500",
        //             },
        //             {
        //               label: "林芝地区",
        //               value: "542600",
        //             },
        //             {
        //               label: "西藏自治区区本级",
        //               value: "549900",
        //             },
        //           ],
        //           label: "西藏自治区",
        //           value: "540000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "常州市",
        //               value: "320400",
        //             },
        //             {
        //               label: "苏州市",
        //               value: "320500",
        //             },
        //             {
        //               label: "南通市",
        //               value: "320600",
        //             },
        //             {
        //               label: "连云港市",
        //               value: "320700",
        //             },
        //             {
        //               label: "淮安市",
        //               value: "320800",
        //             },
        //             {
        //               label: "盐城市",
        //               value: "320900",
        //             },
        //             {
        //               label: "扬州市",
        //               value: "321000",
        //             },
        //             {
        //               label: "镇江市",
        //               value: "321100",
        //             },
        //             {
        //               label: "泰州市",
        //               value: "321200",
        //             },
        //             {
        //               label: "宿迁市",
        //               value: "321300",
        //             },
        //             {
        //               label: "南京市",
        //               value: "320100",
        //             },
        //             {
        //               label: "无锡市",
        //               value: "320200",
        //             },
        //             {
        //               label: "徐州市",
        //               value: "320300",
        //             },
        //           ],
        //           label: "江苏省",
        //           value: "320000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "陕西省西安市",
        //               value: "610100",
        //             },
        //             {
        //               label: "陕西省铜川市",
        //               value: "610200",
        //             },
        //             {
        //               label: "陕西省宝鸡市",
        //               value: "610300",
        //             },
        //             {
        //               label: "陕西省咸阳市",
        //               value: "610400",
        //             },
        //             {
        //               label: "陕西省渭南市",
        //               value: "610500",
        //             },
        //             {
        //               label: "陕西省延安市",
        //               value: "610600",
        //             },
        //             {
        //               label: "陕西省汉中市",
        //               value: "610700",
        //             },
        //             {
        //               label: "陕西省榆林市",
        //               value: "610800",
        //             },
        //             {
        //               label: "陕西省安康市",
        //               value: "610900",
        //             },
        //             {
        //               label: "陕西省商洛市",
        //               value: "611000",
        //             },
        //             {
        //               label: "陕西省杨凌示范区",
        //               value: "611100",
        //             },
        //             {
        //               label: "陕西省省本级",
        //               value: "619900",
        //             },
        //           ],
        //           label: "陕西省",
        //           value: "610000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "甘肃省兰州市",
        //               value: "620100",
        //             },
        //             {
        //               label: "甘肃省嘉峪关市",
        //               value: "620200",
        //             },
        //             {
        //               label: "甘肃省金昌市",
        //               value: "620300",
        //             },
        //             {
        //               label: "甘肃省白银市",
        //               value: "620400",
        //             },
        //             {
        //               label: "甘肃省天水市",
        //               value: "620500",
        //             },
        //             {
        //               label: "甘肃省武威市",
        //               value: "620600",
        //             },
        //             {
        //               label: "甘肃省张掖市",
        //               value: "620700",
        //             },
        //             {
        //               label: "甘肃省平凉市",
        //               value: "620800",
        //             },
        //             {
        //               label: "甘肃省酒泉市",
        //               value: "620900",
        //             },
        //             {
        //               label: "甘肃省庆阳市",
        //               value: "621000",
        //             },
        //             {
        //               label: "甘肃省定西市",
        //               value: "621100",
        //             },
        //             {
        //               label: "甘肃省陇南市",
        //               value: "621200",
        //             },
        //             {
        //               label: "甘肃省临夏回族自治州",
        //               value: "622900",
        //             },
        //             {
        //               label: "甘肃省甘南藏族自治州",
        //               value: "623000",
        //             },
        //             {
        //               label: "甘肃省甘肃矿区",
        //               value: "627000",
        //             },
        //             {
        //               label: "甘肃省省本级",
        //               value: "629900",
        //             },
        //           ],
        //           label: "甘肃省",
        //           value: "620000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "西宁市",
        //               value: "630100",
        //             },
        //             {
        //               label: "海东地区",
        //               value: "632100",
        //             },
        //             {
        //               label: "海北藏族自治州",
        //               value: "632200",
        //             },
        //             {
        //               label: "黄南藏族自治州",
        //               value: "632300",
        //             },
        //             {
        //               label: "海南藏族自治州",
        //               value: "632500",
        //             },
        //             {
        //               label: "果洛藏族自治州",
        //               value: "632600",
        //             },
        //             {
        //               label: "玉树藏族自治州",
        //               value: "632700",
        //             },
        //             {
        //               label: "海西蒙古族藏族自治州",
        //               value: "632800",
        //             },
        //             {
        //               label: "青海省省本级",
        //               value: "639900",
        //             },
        //           ],
        //           label: "青海省",
        //           value: "630000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "银川市",
        //               value: "640100",
        //             },
        //             {
        //               label: "石嘴山市",
        //               value: "640200",
        //             },
        //             {
        //               label: "吴忠市",
        //               value: "640300",
        //             },
        //             {
        //               label: "固原市",
        //               value: "640400",
        //             },
        //             {
        //               label: "中卫市",
        //               value: "640500",
        //             },
        //             {
        //               label: "宁夏回族自治区区本级",
        //               value: "649900",
        //             },
        //           ],
        //           label: "宁夏回族自治区",
        //           value: "640000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "新疆维吾尔自治区乌鲁木齐市",
        //               value: "650100",
        //             },
        //             {
        //               label: "新疆维吾尔自治区克拉玛依市",
        //               value: "650200",
        //             },
        //             {
        //               label: "新疆维吾尔自治区吐鲁番地区",
        //               value: "652100",
        //             },
        //             {
        //               label: "新疆维吾尔自治区哈密地区",
        //               value: "652200",
        //             },
        //             {
        //               label: "新疆维吾尔自治区昌吉回族自治州",
        //               value: "652300",
        //             },
        //             {
        //               label: "博尔塔拉蒙古自治州",
        //               value: "652700",
        //             },
        //             {
        //               label: "新疆维吾尔自治区巴音郭楞蒙古自治州",
        //               value: "652800",
        //             },
        //             {
        //               label: "新疆维吾尔自治区阿克苏地区",
        //               value: "652900",
        //             },
        //             {
        //               label: "新疆维吾尔自治区克孜勒苏柯尔克孜自治州",
        //               value: "653000",
        //             },
        //             {
        //               label: "新疆维吾尔自治区喀什地区",
        //               value: "653100",
        //             },
        //             {
        //               label: "新疆维吾尔自治区和田地区",
        //               value: "653200",
        //             },
        //             {
        //               label: "新疆维吾尔自治区伊犁哈萨克自治州",
        //               value: "654000",
        //             },
        //             {
        //               label: "新疆维吾尔自治区塔城地区",
        //               value: "654200",
        //             },
        //             {
        //               label: "新疆维吾尔自治区阿勒泰地区",
        //               value: "654300",
        //             },
        //             {
        //               label: "自治区直辖县级行政单位",
        //               value: "659000",
        //             },
        //             {
        //               label: "新疆维吾尔自治区区本级",
        //               value: "659900",
        //             },
        //           ],
        //           label: "新疆维吾尔自治区",
        //           value: "650000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "新疆生产建设兵团本级",
        //               value: "669900",
        //             },
        //             {
        //               label: "农四师",
        //               value: "660400",
        //             },
        //             {
        //               label: "农五师",
        //               value: "660500",
        //             },
        //             {
        //               label: "农六师",
        //               value: "660600",
        //             },
        //             {
        //               label: "农七师",
        //               value: "660700",
        //             },
        //             {
        //               label: "农一师",
        //               value: "660100",
        //             },
        //             {
        //               label: "农二师",
        //               value: "660200",
        //             },
        //             {
        //               label: "农三师",
        //               value: "660300",
        //             },
        //             {
        //               label: "农八师",
        //               value: "660800",
        //             },
        //             {
        //               label: "农九师",
        //               value: "660900",
        //             },
        //             {
        //               label: "农十师",
        //               value: "661000",
        //             },
        //             {
        //               label: "建工师",
        //               value: "661100",
        //             },
        //             {
        //               label: "农十二师",
        //               value: "661200",
        //             },
        //             {
        //               label: "农十三师",
        //               value: "661300",
        //             },
        //             {
        //               label: "农十四师",
        //               value: "661400",
        //             },
        //           ],
        //           label: "新疆生产建设兵团",
        //           value: "660000",
        //         },
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
        //               label: "天津市市本级",
        //               value: "129900",
        //             },
        //           ],
        //           label: "天津市",
        //           value: "120000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "河北省石家庄市",
        //               value: "130100",
        //             },
        //             {
        //               label: "河北省唐山市",
        //               value: "130200",
        //             },
        //             {
        //               label: "河北省秦皇岛市",
        //               value: "130300",
        //             },
        //             {
        //               label: "河北省邯郸市",
        //               value: "130400",
        //             },
        //             {
        //               label: "河北省邢台市",
        //               value: "130500",
        //             },
        //             {
        //               label: "河北省保定市",
        //               value: "130600",
        //             },
        //             {
        //               label: "河北省张家口市",
        //               value: "130700",
        //             },
        //             {
        //               label: "河北省承德市",
        //               value: "130800",
        //             },
        //             {
        //               label: "河北省沧州市",
        //               value: "130900",
        //             },
        //             {
        //               label: "河北省廊坊市",
        //               value: "131000",
        //             },
        //             {
        //               label: "河北省衡水市",
        //               value: "131100",
        //             },
        //             {
        //               label: "河北省省本级",
        //               value: "139900",
        //             },
        //           ],
        //           label: "河北省",
        //           value: "130000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "山西省太原市",
        //               value: "140100",
        //             },
        //             {
        //               label: "山西省大同市",
        //               value: "140200",
        //             },
        //             {
        //               label: "山西省阳泉市",
        //               value: "140300",
        //             },
        //             {
        //               label: "山西省长治市",
        //               value: "140400",
        //             },
        //             {
        //               label: "晋城市",
        //               value: "140500",
        //             },
        //             {
        //               label: "山西省朔州市",
        //               value: "140600",
        //             },
        //             {
        //               label: "山西省晋中市",
        //               value: "140700",
        //             },
        //             {
        //               label: "山西省运城市",
        //               value: "140800",
        //             },
        //             {
        //               label: "山西省忻州市",
        //               value: "140900",
        //             },
        //             {
        //               label: "山西省临汾市",
        //               value: "141000",
        //             },
        //             {
        //               label: "吕梁市",
        //               value: "141100",
        //             },
        //             {
        //               label: "山西省省本级",
        //               value: "149900",
        //             },
        //           ],
        //           label: "山西省",
        //           value: "140000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "内蒙古自治区呼和浩特市",
        //               value: "150100",
        //             },
        //             {
        //               label: "内蒙古自治区包头市",
        //               value: "150200",
        //             },
        //             {
        //               label: "内蒙古自治区乌海市",
        //               value: "150300",
        //             },
        //             {
        //               label: "内蒙古自治区赤峰市",
        //               value: "150400",
        //             },
        //             {
        //               label: "内蒙古自治区通辽市",
        //               value: "150500",
        //             },
        //             {
        //               label: "内蒙古自治区鄂尔多斯市",
        //               value: "150600",
        //             },
        //             {
        //               label: "内蒙古自治区呼伦贝尔市",
        //               value: "150700",
        //             },
        //             {
        //               label: "内蒙古自治区巴彦淖尔市",
        //               value: "150800",
        //             },
        //             {
        //               label: "内蒙古自治区乌兰察布市",
        //               value: "150900",
        //             },
        //             {
        //               label: "内蒙古自治区兴安盟",
        //               value: "152200",
        //             },
        //             {
        //               label: "内蒙古自治区锡林郭勒盟",
        //               value: "152500",
        //             },
        //             {
        //               label: "内蒙古自治区阿拉善盟",
        //               value: "152900",
        //             },
        //             {
        //               label: "满洲里市",
        //               value: "153000",
        //             },
        //             {
        //               label: "二连浩特市",
        //               value: "153100",
        //             },
        //             {
        //               label: "内蒙古自治区区本级",
        //               value: "159900",
        //             },
        //           ],
        //           label: "内蒙古自治区",
        //           value: "150000",
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
        //         {
        //           children: [
        //             {
        //               label: "吉林省省本级",
        //               value: "229900",
        //             },
        //             {
        //               label: "长春市",
        //               value: "220100",
        //             },
        //             {
        //               label: "吉林市",
        //               value: "220200",
        //             },
        //             {
        //               label: "四平市",
        //               value: "220300",
        //             },
        //             {
        //               label: "辽源市",
        //               value: "220400",
        //             },
        //             {
        //               label: "通化市",
        //               value: "220500",
        //             },
        //             {
        //               label: "白山市",
        //               value: "220600",
        //             },
        //             {
        //               label: "松原市",
        //               value: "220700",
        //             },
        //             {
        //               label: "白城市",
        //               value: "220800",
        //             },
        //             {
        //               label: "长白山管委会",
        //               value: "222200",
        //             },
        //             {
        //               label: "延边朝鲜族自治州",
        //               value: "222400",
        //             },
        //           ],
        //           label: "吉林省",
        //           value: "220000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "佳木斯市",
        //               value: "230800",
        //             },
        //             {
        //               label: "黑龙江省七台河市",
        //               value: "230900",
        //             },
        //             {
        //               label: "牡丹江市",
        //               value: "231000",
        //             },
        //             {
        //               label: "黑龙江省黑河市",
        //               value: "231100",
        //             },
        //             {
        //               label: "绥化市",
        //               value: "231200",
        //             },
        //             {
        //               label: "黑龙江省大兴安岭地区",
        //               value: "232700",
        //             },
        //             {
        //               label: "黑龙江省省森工地区",
        //               value: "232800",
        //             },
        //             {
        //               label: "省农垦总局",
        //               value: "232900",
        //             },
        //             {
        //               label: "黑龙江省省本级",
        //               value: "239900",
        //             },
        //             {
        //               label: "黑龙江省哈尔滨市",
        //               value: "230100",
        //             },
        //             {
        //               label: "齐齐哈尔市",
        //               value: "230200",
        //             },
        //             {
        //               label: "黑龙江省鸡西市",
        //               value: "230300",
        //             },
        //             {
        //               label: "黑龙江省鹤岗市",
        //               value: "230400",
        //             },
        //             {
        //               label: "黑龙江省双鸭山市",
        //               value: "230500",
        //             },
        //             {
        //               label: "大庆市",
        //               value: "230600",
        //             },
        //             {
        //               label: "黑龙江省伊春市",
        //               value: "230700",
        //             },
        //           ],
        //           label: "黑龙江省",
        //           value: "230000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "浙江省杭州市",
        //               value: "330100",
        //             },
        //             {
        //               label: "浙江省宁波市",
        //               value: "330200",
        //             },
        //             {
        //               label: "浙江省温州市",
        //               value: "330300",
        //             },
        //             {
        //               label: "浙江省嘉兴市",
        //               value: "330400",
        //             },
        //             {
        //               label: "浙江省湖州市",
        //               value: "330500",
        //             },
        //             {
        //               label: "浙江省绍兴市",
        //               value: "330600",
        //             },
        //             {
        //               label: "浙江省金华市",
        //               value: "330700",
        //             },
        //             {
        //               label: "浙江省衢州市",
        //               value: "330800",
        //             },
        //             {
        //               label: "浙江省舟山市",
        //               value: "330900",
        //             },
        //             {
        //               label: "浙江省台州市",
        //               value: "331000",
        //             },
        //             {
        //               label: "浙江省丽水市",
        //               value: "331100",
        //             },
        //             {
        //               label: "浙江省省本级",
        //               value: "339900",
        //             },
        //           ],
        //           label: "浙江省",
        //           value: "330000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "安徽省合肥市",
        //               value: "340100",
        //             },
        //             {
        //               label: "芜湖市",
        //               value: "340200",
        //             },
        //             {
        //               label: "蚌埠市",
        //               value: "340300",
        //             },
        //             {
        //               label: "安徽省淮南市",
        //               value: "340400",
        //             },
        //             {
        //               label: "马鞍山市",
        //               value: "340500",
        //             },
        //             {
        //               label: "安徽省淮北市",
        //               value: "340600",
        //             },
        //             {
        //               label: "安徽省铜陵市",
        //               value: "340700",
        //             },
        //             {
        //               label: "安庆市",
        //               value: "340800",
        //             },
        //             {
        //               label: "黄山市",
        //               value: "341000",
        //             },
        //             {
        //               label: "滁州市",
        //               value: "341100",
        //             },
        //             {
        //               label: "安徽省阜阳市",
        //               value: "341200",
        //             },
        //             {
        //               label: "安徽省宿州市",
        //               value: "341300",
        //             },
        //             {
        //               label: "巢湖市",
        //               value: "341400",
        //             },
        //             {
        //               label: "六安市",
        //               value: "341500",
        //             },
        //             {
        //               label: "安徽省亳州市",
        //               value: "341600",
        //             },
        //             {
        //               label: "安徽省池州市",
        //               value: "341700",
        //             },
        //             {
        //               label: "安徽省宣城市",
        //               value: "341800",
        //             },
        //             {
        //               label: "安徽省省本级",
        //               value: "349900",
        //             },
        //           ],
        //           label: "安徽省",
        //           value: "340000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "福州市",
        //               value: "350100",
        //             },
        //             {
        //               label: "厦门市",
        //               value: "350200",
        //             },
        //             {
        //               label: "莆田市",
        //               value: "350300",
        //             },
        //             {
        //               label: "三明市",
        //               value: "350400",
        //             },
        //             {
        //               label: "泉州市",
        //               value: "350500",
        //             },
        //             {
        //               label: "漳州市",
        //               value: "350600",
        //             },
        //             {
        //               label: "南平市",
        //               value: "350700",
        //             },
        //             {
        //               label: "龙岩市",
        //               value: "350800",
        //             },
        //             {
        //               label: "宁德市",
        //               value: "350900",
        //             },
        //             {
        //               label: "福建省省本级",
        //               value: "359900",
        //             },
        //           ],
        //           label: "福建省",
        //           value: "350000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "江西省南昌市",
        //               value: "360100",
        //             },
        //             {
        //               label: "江西省景德镇市",
        //               value: "360200",
        //             },
        //             {
        //               label: "江西省萍乡市",
        //               value: "360300",
        //             },
        //             {
        //               label: "江西省九江市",
        //               value: "360400",
        //             },
        //             {
        //               label: "江西省新余市",
        //               value: "360500",
        //             },
        //             {
        //               label: "江西省鹰潭市",
        //               value: "360600",
        //             },
        //             {
        //               label: "江西省赣州市",
        //               value: "360700",
        //             },
        //             {
        //               label: "江西省吉安市",
        //               value: "360800",
        //             },
        //             {
        //               label: "江西省宜春市",
        //               value: "360900",
        //             },
        //             {
        //               label: "江西省抚州市",
        //               value: "361000",
        //             },
        //             {
        //               label: "江西省上饶市",
        //               value: "361100",
        //             },
        //             {
        //               label: "江西省省本级",
        //               value: "369900",
        //             },
        //           ],
        //           label: "江西省",
        //           value: "360000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "广西壮族自治区南宁市",
        //               value: "450100",
        //             },
        //             {
        //               label: "广西壮族自治区柳州市",
        //               value: "450200",
        //             },
        //             {
        //               label: "广西壮族自治区桂林市",
        //               value: "450300",
        //             },
        //             {
        //               label: "广西壮族自治区梧州市",
        //               value: "450400",
        //             },
        //             {
        //               label: "广西壮族自治区北海市",
        //               value: "450500",
        //             },
        //             {
        //               label: "广西壮族自治区防城港市",
        //               value: "450600",
        //             },
        //             {
        //               label: "广西壮族自治区钦州市",
        //               value: "450700",
        //             },
        //             {
        //               label: "广西壮族自治区贵港市",
        //               value: "450800",
        //             },
        //             {
        //               label: "广西壮族自治区玉林市",
        //               value: "450900",
        //             },
        //             {
        //               label: "广西壮族自治区百色市",
        //               value: "451000",
        //             },
        //             {
        //               label: "广西壮族自治区贺州市",
        //               value: "451100",
        //             },
        //             {
        //               label: "广西壮族自治区河池市",
        //               value: "451200",
        //             },
        //             {
        //               label: "广西壮族自治区来宾市",
        //               value: "451300",
        //             },
        //             {
        //               label: "广西壮族自治区崇左市",
        //               value: "451400",
        //             },
        //             {
        //               label: "广西壮族自治区区本级",
        //               value: "459900",
        //             },
        //           ],
        //           label: "广西壮族自治区",
        //           value: "450000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "海口市",
        //               value: "460100",
        //             },
        //             {
        //               label: "三亚市",
        //               value: "460200",
        //             },
        //             {
        //               label: "洋浦经济开发区",
        //               value: "462000",
        //             },
        //             {
        //               label: "省农垦",
        //               value: "462100",
        //             },
        //             {
        //               label: "省直辖县级行政单位",
        //               value: "469000",
        //             },
        //             {
        //               label: "海南省省本级",
        //               value: "469900",
        //             },
        //           ],
        //           label: "海南省",
        //           value: "460000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "重庆市市本级",
        //               value: "509900",
        //             },
        //           ],
        //           label: "重庆",
        //           value: "500000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "四川省资阳市",
        //               value: "512000",
        //             },
        //             {
        //               label: "四川省阿坝藏族羌族自治州",
        //               value: "513200",
        //             },
        //             {
        //               label: "四川省甘孜藏族自治州",
        //               value: "513300",
        //             },
        //             {
        //               label: "四川省凉山彝族自治州",
        //               value: "513400",
        //             },
        //             {
        //               label: "四川省省本级",
        //               value: "519900",
        //             },
        //             {
        //               label: "成都市",
        //               value: "510100",
        //             },
        //             {
        //               label: "四川省自贡市",
        //               value: "510300",
        //             },
        //             {
        //               label: "攀枝花市",
        //               value: "510400",
        //             },
        //             {
        //               label: "四川省泸州市",
        //               value: "510500",
        //             },
        //             {
        //               label: "四川省德阳市",
        //               value: "510600",
        //             },
        //             {
        //               label: "四川省绵阳市",
        //               value: "510700",
        //             },
        //             {
        //               label: "四川省广元市",
        //               value: "510800",
        //             },
        //             {
        //               label: "四川省遂宁市",
        //               value: "510900",
        //             },
        //             {
        //               label: "内江市",
        //               value: "511000",
        //             },
        //             {
        //               label: "乐山市",
        //               value: "511100",
        //             },
        //             {
        //               label: "四川省南充市",
        //               value: "511300",
        //             },
        //             {
        //               label: "四川省眉山市",
        //               value: "511400",
        //             },
        //             {
        //               label: "四川省宜宾市",
        //               value: "511500",
        //             },
        //             {
        //               label: "四川省广安市",
        //               value: "511600",
        //             },
        //             {
        //               label: "四川省达州市",
        //               value: "511700",
        //             },
        //             {
        //               label: "四川省雅安市",
        //               value: "511800",
        //             },
        //             {
        //               label: "四川省巴中市",
        //               value: "511900",
        //             },
        //           ],
        //           label: "四川省",
        //           value: "510000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "山东省济南市",
        //               value: "370100",
        //             },
        //             {
        //               label: "山东省青岛市",
        //               value: "370200",
        //             },
        //             {
        //               label: "山东省淄博市",
        //               value: "370300",
        //             },
        //             {
        //               label: "山东省枣庄市",
        //               value: "370400",
        //             },
        //             {
        //               label: "山东省东营市",
        //               value: "370500",
        //             },
        //             {
        //               label: "山东省烟台市",
        //               value: "370600",
        //             },
        //             {
        //               label: "山东省潍坊市",
        //               value: "370700",
        //             },
        //             {
        //               label: "山东省济宁市",
        //               value: "370800",
        //             },
        //             {
        //               label: "山东省泰安市",
        //               value: "370900",
        //             },
        //             {
        //               label: "山东省威海市",
        //               value: "371000",
        //             },
        //             {
        //               label: "山东省日照市",
        //               value: "371100",
        //             },
        //             {
        //               label: "山东省莱芜市",
        //               value: "371200",
        //             },
        //             {
        //               label: "山东省临沂市",
        //               value: "371300",
        //             },
        //             {
        //               label: "山东省德州市",
        //               value: "371400",
        //             },
        //             {
        //               label: "山东省聊城市",
        //               value: "371500",
        //             },
        //             {
        //               label: "山东省滨州市",
        //               value: "371600",
        //             },
        //             {
        //               label: "山东省菏泽市",
        //               value: "371700",
        //             },
        //             {
        //               label: "山东省省本级",
        //               value: "379900",
        //             },
        //           ],
        //           label: "山东省",
        //           value: "370000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "郑州市",
        //               value: "410100",
        //             },
        //             {
        //               label: "开封",
        //               value: "410200",
        //             },
        //             {
        //               label: "洛阳市",
        //               value: "410300",
        //             },
        //             {
        //               label: "平顶山市",
        //               value: "410400",
        //             },
        //             {
        //               label: "安阳市",
        //               value: "410500",
        //             },
        //             {
        //               label: "鹤壁",
        //               value: "410600",
        //             },
        //             {
        //               label: "新乡市",
        //               value: "410700",
        //             },
        //             {
        //               label: "焦作市",
        //               value: "410800",
        //             },
        //             {
        //               label: "濮阳市",
        //               value: "410900",
        //             },
        //             {
        //               label: "许昌",
        //               value: "411000",
        //             },
        //             {
        //               label: "漯河",
        //               value: "411100",
        //             },
        //             {
        //               label: "三门峡市",
        //               value: "411200",
        //             },
        //             {
        //               label: "南阳",
        //               value: "411300",
        //             },
        //             {
        //               label: "商丘市",
        //               value: "411400",
        //             },
        //             {
        //               label: "信阳市",
        //               value: "411500",
        //             },
        //             {
        //               label: "周口市",
        //               value: "411600",
        //             },
        //             {
        //               label: "驻马店",
        //               value: "411700",
        //             },
        //             {
        //               label: "济源市",
        //               value: "411800",
        //             },
        //             {
        //               label: "河南省省直",
        //               value: "419900",
        //             },
        //           ],
        //           label: "河南省",
        //           value: "410000",
        //         },
        //         {
        //           children: [
        //             {
        //               label: "湖北省省本级",
        //               value: "429900",
        //             },
        //             {
        //               label: "武汉市",
        //               value: "420100",
        //             },
        //             {
        //               label: "黄石市",
        //               value: "420200",
        //             },
        //             {
        //               label: "十堰市",
        //               value: "420300",
        //             },
        //             {
        //               label: "湖北省宜昌市",
        //               value: "420500",
        //             },
        //             {
        //               label: "襄樊市",
        //               value: "420600",
        //             },
        //             {
        //               label: "湖北省鄂州市",
        //               value: "420700",
        //             },
        //             {
        //               label: "荆门市",
        //               value: "420800",
        //             },
        //             {
        //               label: "孝感市",
        //               value: "420900",
        //             },
        //             {
        //               label: "湖北省荆州市",
        //               value: "421000",
        //             },
        //             {
        //               label: "湖北省黄冈市",
        //               value: "421100",
        //             },
        //             {
        //               label: "咸宁市",
        //               value: "421200",
        //             },
        //             {
        //               label: "湖北省随州市",
        //               value: "421300",
        //             },
        //             {
        //               label: "湖北省恩施土家族苗族自治州",
        //               value: "422800",
        //             },
        //             {
        //               label: "省直辖县级行政单位",
        //               value: "429000",
        //             },
        //           ],
        //           label: "湖北省",
        //           value: "420000",
        //         },
        //       ],
        //       span: 12,
        //     },
        //   ],
        // },
      ],
    }
  },
  methods: {
    showModalDeit(detail) {
      this.edit = detail
      this.isShowDetailModal = true
      // setTimeout(() => {
      this.editConfig[0].row[1].options = [
        { value: "0", label: "否" },
        { value: "1", label: "是" },
      ]
      // }, 5000)
    },
    cancel() {
      this.isShowDetailModal = false
      this.$emit("cancel")
    },
    sumbit(params) {
      console.log("Edit-button-save", JSON.stringify(params))
      this.isShowDetailModal = false
    },
  },
  watch: {
    value: {
      handler(val) {
        this.edit = val
      },
      deep: true,
    },
  },
}
</script>
