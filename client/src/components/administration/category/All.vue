<script setup>
import { onMounted, ref } from 'vue';
import categoriesService from '../../../services/categories';
import AppTable from '../../shared/table/AppTable.vue';
import AppList from '../../shared/table/AppList.vue';
import Loading from '../../shared/Loading.vue';

const title = 'Total categories';
const categories = ref([]);

onMounted(() => {
  loadCategories();
});

function onDeleteHandler(e, id) {
  categoriesService
    .deleteById(id)
    .then(() => loadCategories())
    .catch(err => console.error(err));
}

function loadCategories() {
  categoriesService
    .all()
    .then(res => categories.value = res)
    .catch(err => console.error(err));
}
</script>

<template>
  <AppList v-if="categories.length" element="categories" :is-element="!!categories.length">
    <template #title>
      <AppTitle
        :title="`${title} : ${categories.length}`"
        image="/images/martha-brook-blog-post-brilliant-gifts-for-pregnant-women-pregnant-woman-sitting-on-bed-banner-1500x550.webp"
        text="administration-image"
      />
    </template>
    <template #table>
      <AppTable
        :collection="categories"
        update-link="/administration/category/update"
        @on-delete-handler="onDeleteHandler"
      />
    </template>
  </AppList>
  <Loading v-else />
</template>
