<script setup>
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
  errors: {
    type: Array,
    required: () => [],
  },
  collection: {
    type: Array,
    required: () => [],
  },
});
const emit = defineEmits(['update:modelValue']);

function onChange($event) {
  const { value } = $event.target;
  emit('update:modelValue', value);
};
</script>

<template>
  <div class="form-wrapper">
    <label class="label label-small" :for="props.name">{{ props.label }}</label>
    <div class="form-input-wrapper">
      <select
        :id="props.name"
        class="input input-small"
        :name="props.name"
        :value="props.modelValue"
        @change="onChange"
      >
        <option disabled value="">
          Please relect {{ props.name }}
        </option>
        <option v-for="c in props.collection" :key="c.id ? c.id : c" :value="c.id ? c.id : c">
          {{ c.name ? c.name : c }}
        </option>
      </select>
      <ClientError v-for="error of props.errors" :key="error.$uid" :error="error.$message" />
    </div>
  </div>
</template>
