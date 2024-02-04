<script setup>
import { onMounted, ref } from 'vue';
import diariesService from '../../services/diaries';
import Single from './Single.vue';

const diaries = ref([]);
onMounted(() => {
  loadDiaries();
});

function loadDiaries() {
  diariesService
    .all()
    .then(res => diaries.value = res)
    .catch(err => console.error(err));
}
</script>

<template>
  <section class="all-diaries">
    <Jumbo
      image="/images/oakdene-designs-notebooks-personalised-pregnancy-journal-28607459033159.webp"
      text="diary"
    />
    <h2 class="section-title">
      My Diaries
    </h2>
    <ul v-if="diaries.length" class="all-diaries-ul">
      <Single
        v-for="d in diaries"
        :key="d.id"
        :diary="d"
        @finish="loadDiaries"
      />
    </ul>
    <template v-else>
      <button type="button" class="btn btn-primary">
        <router-link to="/diary/create">
          Create diary
        </router-link>
      </button>
      <Empty element="diaries" />
      <Jumbo
        image="/images/web3-woman-pregnant-light-spiritual-shutterstock_1466000780.webp"
        text="pregnant-woman"
      />
    </template>
  </section>
</template>

<style scoped>
.all-diaries-ul {
  display: flex;
  flex-direction: column;
  gap: 80px;
  justify-content: center;
  align-items: center;
}

.all-diaries button {
  margin-top: 40px;
  margin-bottom: 40px;
}
.all-diaries button a {
  color: var(--clr-white);
}
</style>
