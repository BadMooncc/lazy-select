<template>
  <lazy-select
    :props="{
      label: 'deptName',
      value: 'id'
    }"
    :loading="loading"
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
<style>

</style>