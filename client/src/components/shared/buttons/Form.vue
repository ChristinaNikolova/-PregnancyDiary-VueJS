<script setup>
const props = defineProps({
  formName: {
    type: String,
    default: 'Create',
  },
  isDisabled: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['onCancelFormHandler']);
</script>

<template>
  <div class="form-buttons-wrapper">
    <button :disabled="props.isDisabled" type="submit" class="btn btn-primary">
      {{ props.formName }}
    </button>
    <button type="button" class="btn btn-secondary" @click="emit('onCancelFormHandler')">
      Cancel
    </button>
  </div>
</template>

<style scoped>
.form-buttons-wrapper {
  display: flex;
  gap: 18px;
}
</style>
