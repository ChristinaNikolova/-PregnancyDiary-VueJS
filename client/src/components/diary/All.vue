<script setup>
import { onMounted, ref } from 'vue';
import diariesService from '../../services/diaries';
import Single from './Single.vue';

const diaries = ref([]);
onMounted(() => {
  diariesService
    .all()
    .then(res => diaries.value = res)
    .catch(err => console.error(err));
});
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
    <ul class="all-diaries-ul">
      <Single v-for="d in diaries" :key="d.id" :diary="d" />
    </ul>
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
</style>
