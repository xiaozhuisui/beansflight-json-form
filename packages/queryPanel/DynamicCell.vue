<!--
 * @Date: 2022-01-06 16:36:37
 * @LastEditors: 追随
 * @LastEditTime: 2022-01-08 01:18:40
-->
<script>
import CascaderItem from "./CascaderItem.vue"
import SelectItem from "./SelectItem.vue"
import InputItem from "./InputItem.vue"
import DatePickerItem from "./DatePickerItem.vue"
import SlotItem from "./SlotItem.vue"
export default {
  name: "DynamicItem",
  components: {
    CascaderItem,
    SelectItem,
    InputItem,
    DatePickerItem,
    SlotItem,
  },
  props: {
    config: Object,
    rule: Object,
  },
  render(h) {
    const { config, rule } = this
    const Comp = config.tag
    return h(
      Comp,
      {
        on: this.$listeners,
        attrs: { ...this.$attrs, ...config.attrs },
        props: {
          config,
          rule,
        },
      },
      this.$slots.default
    )
  },
}
</script>
