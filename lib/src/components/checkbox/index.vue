<template>
  <div :class="classList">
    <label>
      <input
        ref="input"
        type="checkbox"
        :name="name"
        :value="value"
        :checked="isChecked"
        :autofocus="autofocus"
        :readonly="readonly"
        :disabled="disabled"
        @change="onChange"
        @click="$emit('click', $event)"
        @focus="onFocus"
        @blur="onBlur"
      >
      <div class="common-checkbox-box">
        <transition>
          <svg-icon v-if="checkedIcon && isChecked" :name="checkedIcon" class="checked-indicator-icon" />
          <span v-else-if="isChecked" class="checked-indicator" />
        </transition>
      </div>
      <span v-if="$slots.default" class="common-checkbox-label">
        <slot />
      </span>
    </label>
  </div>
</template>

<script>
import mixinFocusBlur from '../../mixins/focus-blur'

export default {
  mixins: [mixinFocusBlur],
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    name: String,
    checkedIcon: String,
    modelValue: [Boolean, Array],
    value: [String, Number],
    autofocus: Boolean,
    readonly: Boolean,
    disabled: Boolean
  },
  computed: {
    classList () {
      let string = 'common-checkbox'
      if (this.isChecked) string += ' common-checkbox-checked'
      if (this.isFocused) string += ' common-checkbox-focused'
      if (this.disabled) string += ' common-checkbox-disabled'
      return string
    },
    multiple () {
      return Array.isArray(this.modelValue)
    },
    isChecked () {
      return this.multiple ? this.modelValue.includes(this.value) : this.modelValue
    }
  },
  methods: {
    onChange (e) {
      if (this.multiple) {
        const value = e.target.checked
          ? [...this.modelValue, e.target.value]
          : this.modelValue.filter(val => val !== e.target.value)
        this.$emit('change', value)
        return
      }
      this.$emit('change', e.target.checked)
    }
  }
}
</script>

<style lang="scss" src="./index.scss" />
