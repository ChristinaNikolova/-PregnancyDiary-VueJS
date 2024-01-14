<script setup>
import generateUniqueId from '../../../utils/helpers/generateUniqueId';

const props = defineProps({
  collection: {
    type: Array,
    default: () => [],
  },
  updateLink: {
    type: String,
    default: '/',
  },
  showDetails: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['onDeleteHandler']);
</script>

<template>
  <table v-if="props.collection.length" class="table">
    <thead class="table-head">
      <tr class="table-head-row">
        <th v-for="(key, value) in props.collection[0]" :key="key + generateUniqueId.getUniqueId()" class="table-head-row-name">
          <template v-if="value !== 'id'">
            {{ value }}
          </template>
        </th>
        <th />
        <th />
      </tr>
    </thead>
    <tbody class="table-body">
      <tr v-for="c in props.collection" :key="c.id" class="table-body-row">
        <td v-for="(key, value) in c" :key="c[key] + generateUniqueId.getUniqueId()" class="table-body-row-name">
          <template v-if="value !== 'id'">
            <router-link v-if="value === 'title'" :to="`/blog/${c.id}`">
              {{ key }}
            </router-link>
            <template v-else>
              {{ key }}
            </template>
          </template>
        </td>
        <td class="table-body-row-button">
          <button type="button" class="btn btn-secondary">
            <router-link :to="`${props.updateLink}/${c.id}`">
              Update
            </router-link>
          </button>
        </td>
        <td class="table-body-row-button">
          <button type="button" class="btn btn-primary" @click="emit('onDeleteHandler', $event, c.id)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style  scoped>
.table {
  margin: 0 auto;
  width: 100%;
}

.table-head-row {
  font-size: 22px;
  text-align: left;
  height: 4vh;
}

.table-body-row {
  height: 6vh;
}

.table-body-row-name {
  text-align: left;
  font-size: 18px;
}

.table-body-row-name a:hover {
  color: var(--clr-brown);
  font-weight: 500;
}
</style>
