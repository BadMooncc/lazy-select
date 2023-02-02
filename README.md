## lazy-select懒加载选择器组件

由于element-ui组件的级联选择器采用懒加载方案回显特别复杂，所以自行二次封装了懒加载的级联选择器组件
### 安装
```html
npm i lazy-select -S
```
##### 全局引入
```html
<script>
import lazySelect from 'lazy-select'

Vue.use(lazySelect)
</script>
```

#### 普通引入
```html
<script>
import lazySelect from 'lazy-select'
export default {
  components: {
    lazySelect
  }
}
</script>
```
### 基本用法

```html
<template>
  <lazy-select
    :props="{
      label: 'deptName',
      value: 'id'
    }"
    lazy
    node-key="id"
    :load="lazyLoad"
    v-model="demo">
  </lazy-select>
</template>
<script>
let id = 1
export default {
  name: 'lazy-select-demo',
  data() {
    return {
      demo: [ { id: 5, deptName: '部门5' }, { id: 2, deptName: '书院2' } ],
    }
  },
  methods: {
    lazyLoad(node, resolve) {
      setTimeout(() => {
        let  arr = []
        arr.push({ id: id, deptName: `部门${id}`, isLeaf: true })
        id += 1
        arr.push({ id: id, deptName: `书院${id}` })
        id += 1
        resolve(arr)
      }, 300);
    },
  }
}
</script>
```

### Attributes
| 参数                  | 说明                                               | 类型                        | 可选值  | 默认值   |
| --------------------- | ---------------------------------------- | --------------------------- | ---- | ----- |
| empty-text            | 内容为空的时候展示的文本                           | String                      | —    | —     |
| node-key              | 每个下拉节点选项用来作为唯一标识的属性              | String                      | —    | —     |
| props                 | 配置选项，具体看下表                               | object                      | —    | —     |
| value(v-model)  | 默认值                        | array                       | —    | —     |
| lazy                  | 是否懒加载子节点，需与 load 方法结合使用           | boolean                     | —    | false |
| load                  | 加载子树数据的方法，仅当 lazy 属性为true 时生效    | function(node, resolve)     | —    | —     |
| indent                  | 相邻级节点间的水平缩进，单位为像素    | number	     | —    | 16     |
| icon-class                  | 自定义树节点的图标    | string     | —    | —     |
| accordion                  | 是否每次只打开一个同级树节点展开    | boolean     | —    | false    |
| check-on-click-node                  | 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。    | boolean     | —    | false    |


### props
| 参数       | 说明                | 类型     | 可选值  | 默认值  |
| -------- | ----------------- | ------ | ---- | ---- |
| label    | 指定节点标签为节点对象的某个属性值 | string, function(data, node) | —    | —    |
| children | 指定子树为节点对象的某个属性值 | string | —    | —    |
| disabled | 指定节点选择框是否禁用为节点对象的某个属性值 | boolean, function(data, node) | —    | —    |
| isLeaf | 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效 | boolean, function(data, node) | —    | —    |
