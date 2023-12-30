<script setup>
import { onMounted, ref } from 'vue';
import categoriesService from '../../../services/categories';

const categories = ref([]);

onMounted(() => {
  categoriesService
    .all()
    .then(res => categories.value = res)
    .catch(err => console.error(err));
});
</script>

<template>
  <section class="all-categories">
    <Jumbo image="/images/martha-brook-blog-post-brilliant-gifts-for-pregnant-women-pregnant-woman-sitting-on-bed-banner-1500x550.webp" text="administration-image" />
    <h2 class="section-title all-categories-title">
      All Categories
    </h2>
    <table class="all-categories-table">
      <thead class="all-categories-table-head">
        <tr class="all-categories-table-head-row">
          <th>Name</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody class="all-categories-table-body">
        <tr v-for="c in categories" :key="c.id" class="all-categories-table-body-row">
          <td class="all-categories-table-body-row-name">
            {{ c.name }}
          </td>
          <td class="all-categories-table-body-row-button">
            <button type="button" class="btn btn-secondary">
              Update
            </button>
          </td>
          <td class="all-categories-table-body-row-button">
            <button type="button" class="btn btn-primary">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<!-- todo extract title css -->
<style scoped>
.all-categories {
  position: relative;
  text-align: center;
  margin-bottom: 30px;
}

.all-categories::after {
  position: absolute;
  content: '';
  width: 100%;
  left: 0%;
  bottom: -34px;
  border-bottom: 1.5px solid var(--clr-grey);
}

.all-categories-table {
  margin: 0 auto;
  width: 70%;
}

.all-categories-table-head-row {
  font-size: 22px;
  text-align: left;
  height: 4vh;
}

.all-categories-table-body-row {
  height: 6vh;
}

.all-categories-table-body-row-name {
  text-align: left;
  font-size: 18px;
}
</style>
