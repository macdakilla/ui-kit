<template>
  <component
    :is="tagName"
    :class="classList"
    :role="role"
    :to="to"
    :href="href"
    :target="href ? target : false"
    :rel="href ? rel : false"
    :disabled="disabled"
    @click="click"
  >
    <slot>Button</slot>
  </component>
</template>

<script>
import { bem } from '../../helpers'
// Nuxt detection for nuxt-link / router-link tag
let isNuxt = false
try {
  // eslint-disable-next-line no-unused-vars
  isNuxt = !!require('@/nuxt.config').default
} catch (e) {}

export default {
  props: {
    // Button mode for custom styles
    variant: {
      type: String,
      default: 'default'
    },
    // Button size for custom styles
    size: {
      type: String,
      default: 'default'
    },
    // Disabled state
    disabled: Boolean,

    // "href" attribute value (for "a" tag only)
    href: String,

    // "to" attribute value (for "nuxt-link"/"router-link" tag only)
    to: [String, Object],

    // "target" attribute value (for "a" tag only)
    target: {
      type: String,
      default: '_self'
    },

    // tag component if not attribute href and to
    tag: {
      type: String,
      default: 'button'
    },

    // "rel" attribute value (for "a" tag only)
    rel: {
      type: String,
      default: 'nofollow'
    }
  },
  computed: {
    tagName () {
      if (this.href) return 'a'
      if (this.to) return isNuxt ? 'nuxt-link' : 'router-link'
      return this.tag
    },
    role () {
      return this.to || this.href ? 'link' : 'button'
    },
    classList () {
      // custom type and size classnames
      const classList = [bem('common-button', this.variant), `common-button-size-${this.size}`]
      if (this.disabled) {
        classList.push('disabled')
      }
      return classList
    }
  },
  methods: {
    click (e) {
      if (this.disabled) {
        return
      }
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" src="./index.scss" />
