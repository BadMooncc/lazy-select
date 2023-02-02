import lazySelect from './lazy-select.vue'

const install = (_vue) => {
  if (install.installed) return;
  _vue.component('lazy-select', lazySelect);
};

lazySelect._version = '1.0.0'
lazySelect.install = install

export default lazySelect