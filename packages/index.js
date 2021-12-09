import QueryPanel from './queryPanel/query.vue';
import TablesPanel from './tablesPanel/tables.vue';
import EditFormPanel from './edit/editForm.vue';
import DetailFormPanel from './detail/detailForm.vue';

const comps = [QueryPanel, TablesPanel, EditFormPanel, DetailFormPanel];
export default (Vue) => {
  // 注册组件
  comps.forEach((comp) => {
    Vue.component(comp.name, comp);
  });
};
