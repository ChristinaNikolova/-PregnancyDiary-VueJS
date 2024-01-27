<script setup>
import { onMounted, ref } from 'vue';
import diariesService from '../../services/diaries';

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
      text="dieary"
    />
    <h2 class="section-title">
      My Diaries
    </h2>
  </section>
</template>

<style scoped>

</style>
