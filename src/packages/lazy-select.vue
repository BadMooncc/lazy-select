<template>
  <div class="lazy-select">
    <el-select
      :value-key="nodeKey"
      @remove-tag="handleRemove"
      :collapse-tags="collapseTags"
      multiple
      :placeholder="placeholder"
      :disabled="disabled"
      @change="changeValue"
      v-model="value_">
      <el-option style="height: auto;padding: 0;" value="" key="lazy-select">
        <el-tree
          ref="tree"
          style="padding: 5px 0;"
          :node-key="nodeKey"
          :accordion="accordion"
          :indent="indent"
          :empty-text="emptyText"
          :checkStrictly="true"
          :icon-class="iconClass"
          :check-on-click-node="checkOnClickNode"
          :lazy="lazy"
          :load="load"
          :props="{
            label: 'label',
            disabled: 'disabled',
            children: 'children',
            isLeaf: 'isLeaf',
            ...props
          }"
          @check-change="handleCheckChange"
          show-checkbox
          :default-checked-keys="defaultChecked">
        </el-tree>
      </el-option>
      <el-option
        style="display: none"
        v-for="item in value"
        :key="item[nodeKey]"
        :value="item"
        :label="item[props.label]"
      />
    </el-select>
  </div>
</template>
<script>

export default {
  name: 'lazy-select',
  props: {
    lazy: {
      type: Boolean,
      default: true
    },
    collapseTags: Boolean,
    load: Function,
    placeholder: String,
    multiple: {
      type: Boolean,
      default: true
    },
    checkOnClickNode: {
      type: Boolean,
      default: false
    },
    indent: {
      type: Number,
      default: 16
    },
    emptyText: String,
    accordion: {
      type: Boolean,
      default: false
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
    iconClass: String,
    value: {
      type: Array,
      default: () => [  ]
    },
    props: {
      type: Object,
      default:() => ({
        label: 'label',
        value: 'id'
      })
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    defaultChecked() {
      return this.value_.map(item => item[this.nodeKey])
    }
  },
  data() {
    return {
      type: '',
      value_: []
    }
  },
  created() {
    this.value_ = JSON.parse(JSON.stringify(this.value))
  },
  methods: {
    changeValue() {
      this.$emit('input', this.value_)
    },
    handleRemove() {
      this.type = 'remove'
      this.$refs.tree.setCheckedKeys(this.value_.map(item => item[this.nodeKey]))
      this.$emit('input', this.value_)
    },
    handleCheckChange(val, checked) {
      // 单选
      if (!this.multiple) {
        if (checked) {
          this.value_ = [ val ]
          this.$refs.tree.setCheckedKeys([ this.value_[0][this.nodeKey] ])
        } else if (!checked && !this.$refs.tree.getCheckedNodes().length) {
          this.$refs.tree.setCheckedKeys([])
          this.value_ = []
        }
        this.$emit('input', this.value_)
        return
      }
      // d多选
      if (this.value_.length > this.$refs.tree.getCheckedNodes().length && checked) {
        this.value_ = this.$refs.tree.getCheckedNodes()
      } else if (checked) {
        this.value_.push(val)
      } else if (!checked && this.type !== 'remove') {
        let currencIndex = ''
        this.value_.forEach((item, index) => {
          if (item[this.nodeKey] === val[this.nodeKey]) currencIndex = index
        })
        this.value_.splice(currencIndex, 1)
      }
      this.type = ''
      this.$emit('input', this.value_)
    }
  }
}
</script>
