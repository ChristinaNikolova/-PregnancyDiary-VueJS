<script setup>
import { ref } from 'vue';

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

function onInput($event) {
  const { value } = $event.target;
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
</template>

<style scoped>
.form-wrapper {
    position: relative;
}

.label {
    position: absolute;
    left: 14px;
    top: 10px;
}

.label-small {
    font-size: 12px;
    top: 2px;
}

.input {
    width: 80%;
    height: 6vh;
    background-color: var(--clr-creme);
    border: 1px solid var(--clr-black);
    font-size: 16px;
    font-weight: 500;
    font-family: var(--font-family);
    padding: 18px 14px;
    margin-bottom: 20px;
}

.input-small{
    padding-bottom: 6px;
}
</style>
