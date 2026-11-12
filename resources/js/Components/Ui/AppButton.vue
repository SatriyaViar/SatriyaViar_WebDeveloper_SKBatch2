<script setup>
defineProps({
  variant: { type: String, default: 'primary', validator: (value) => ['primary', 'inverse', 'secondary'].includes(value) },
  compact: Boolean,
  disabled: Boolean,
  type: { type: String, default: 'button' },
})
</script>

<template>
  <button :type="type" :disabled="disabled" :class="['app-button', `app-button--${variant}`, { 'app-button--compact': compact }]">
    <slot />
  </button>
</template>
