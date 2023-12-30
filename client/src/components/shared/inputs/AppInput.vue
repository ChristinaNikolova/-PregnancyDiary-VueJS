<script setup>
import { onUpdated, ref } from 'vue';

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
  type: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    required: true,
    default: '',
  },
  errors: {
    type: Array,
    default: () => [],
  },
  isReadonly: {
    Type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue']);
const small = ref(false);

onUpdated(() => {
  if (props.modelValue) {
    small.value = true;
  }
});

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
      <input
        :id="props.name"
        :class="small ? 'input input-small' : 'input'"
        :name="props.name"
        :type="props.type"
        :readonly="props.isReadonly"
        :value="props.modelValue"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      >
      <ClientError v-for="error of props.errors" :key="error.$uid" :error="error.$message" />
    </div>
  </div>
</template>
