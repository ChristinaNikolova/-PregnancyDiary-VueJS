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

<!-- todo extract the CSS -->
<!-- todo extract button -->
<style scoped>
.form-wrapper {
  position: relative;
  width: 100%;
  text-align: center;
}

.label {
  position: absolute;
  left: 11%;
  top: 16px;
}

.label-small {
  font-size: 14px;
  top: 2px;
}

.form-input-wrapper{
  position: relative;
}

.input {
  width: 80%;
  height: 4.5vh;
  background-color: var(--clr-creme);
  border: 1px solid var(--clr-black);
  font-size: 16px;
  font-weight: 500;
  font-family: var(--font-family);
  padding: 18px 14px;

}

.input-small{
  padding-bottom: 6px;
}
</style>
