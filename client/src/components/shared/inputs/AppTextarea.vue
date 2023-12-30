<script setup>
import { ref } from 'vue';
import ClientError from '../errors/ClientError.vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    default: '',
  },
  label: {
    type: String,
    required: true,
    default: '',
  },
  rows: {
    type: String,
    required: true,
    default: '',
  },
  errors: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(['update:modelValue']);
const small = ref(false);

function onInput(e) {
  const { value } = e.target;
  emit('update:modelValue', value);
};

function onFocus() {
  small.value = true;
}

function onBlur(e) {
  if (!e.target.value) {
    small.value = false;
  }
}
</script>

<template>
  <div class="form-wrapper">
    <label :class="small ? 'label label-small' : 'label'" :for="props.name">{{ props.label }}</label>
    <div class="form-input-wrapper">
      <textarea
        :id="props.name"
        :class="small ? 'input textarea input-small' : 'input textarea'"
        :name="props.name"
        :rows="props.rows"
        :value="props.modelValue"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
      <ClientError v-for="error of props.errors" :key="error.$uid" :error="error.$message" />
    </div>
  </div>
</template>
